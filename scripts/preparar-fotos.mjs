import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';

const raiz = process.cwd();
const seleccion = JSON.parse(await readFile(path.join(raiz, 'scripts/seleccion-fotos.json'), 'utf8'));
const maestros = path.join(raiz, '_medios');
const locales = path.join(raiz, 'public/fotos-local');
const medios = {};

const normalizar = (f) => (typeof f === 'number' ? { n: f, recorte: {} } : { recorte: {}, ...f });

async function procesar(entrada, slug, orden, recorte) {
  const nombre = String(orden).padStart(2, '0');
  const base = sharp(entrada).rotate();
  const meta = await base.metadata();
  const w = meta.autoOrient?.width ?? meta.width;
  const h = meta.autoOrient?.height ?? meta.height;
  const izq = Math.round(w * (recorte.izquierda ?? 0));
  const abajo = Math.round(h * (recorte.abajo ?? 0));
  const ancho = w - izq;
  const alto = h - abajo;
  const destinoMaestro = path.join(maestros, slug, `${nombre}.jpg`);
  await mkdir(path.dirname(destinoMaestro), { recursive: true });
  await sharp(entrada).rotate().extract({ left: izq, top: 0, width: ancho, height: alto }).jpeg({ quality: 92, mozjpeg: true }).toFile(destinoMaestro);
  await mkdir(path.join(locales, slug), { recursive: true });
  for (const ancho of [640, 1080, 1600]) {
    await sharp(destinoMaestro).resize({ width: ancho, withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(locales, slug, `${nombre}-${ancho}.webp`));
  }
  const blur = await sharp(destinoMaestro).resize(16).webp({ quality: 40 }).toBuffer();
  return {
    publicId: `evolve/propiedades/${slug}/fotos/${nombre}`,
    local: `/fotos-local/${slug}/${nombre}.webp`,
    width: ancho,
    height: alto,
    orden,
    blur: `data:image/webp;base64,${blur.toString('base64')}`,
  };
}

for (const [slug, cfg] of Object.entries(seleccion)) {
  const fuente = path.join(raiz, cfg.fuente);
  const fotos = [];
  if (cfg.video) {
    const video = path.join(fuente, cfg.video);
    for (const [i, t] of cfg.fotogramas.entries()) {
      const tmp = path.join(maestros, slug, `fotograma-${i + 1}.png`);
      await mkdir(path.dirname(tmp), { recursive: true });
      execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(t), '-i', video, '-frames:v', '1', tmp]);
      fotos.push(await procesar(tmp, slug, i + 1, {}));
    }
    const destinoVideo = path.join(maestros, slug, 'video.mp4');
    if (!existsSync(destinoVideo)) await copyFile(video, destinoVideo);
    const destinoVideoLocal = path.join(locales, slug, 'video.mp4');
    if (!existsSync(destinoVideoLocal)) await copyFile(video, destinoVideoLocal);
    const [w, h] = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', video]).toString().trim().split(',').map(Number);
    medios[slug] = { fotos, video: { publicId: `evolve/propiedades/${slug}/video`, local: `/fotos-local/${slug}/video.mp4`, width: w, height: h } };
    continue;
  }
  const archivos = (await readdir(fuente)).filter((f) => /\.jpe?g$/i.test(f)).sort();
  for (const [i, item] of cfg.fotos.map(normalizar).entries()) {
    fotos.push(await procesar(path.join(fuente, archivos[item.n - 1]), slug, i + 1, item.recorte));
  }
  medios[slug] = { fotos };
}

await writeFile(path.join(raiz, 'src/data/medios.json'), JSON.stringify(medios, null, 2) + '\n');
console.log(Object.entries(medios).map(([s, m]) => `${s}: ${m.fotos.length} fotos${m.video ? ' + video' : ''}`).join('\n'));
