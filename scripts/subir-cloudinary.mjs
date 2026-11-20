import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

config({ path: '.env.local', quiet: true });

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('Faltan CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY o CLOUDINARY_API_SECRET en .env.local');
  process.exit(1);
}
cloudinary.config({ cloud_name: CLOUDINARY_CLOUD_NAME, api_key: CLOUDINARY_API_KEY, api_secret: CLOUDINARY_API_SECRET, secure: true });

const raiz = process.cwd();
const forzar = process.argv.includes('--forzar');
const archivosDe = async (dir, patron) => (await readdir(dir)).filter((f) => patron.test(f)).sort();
const slug = (nombre) => nombre.toLowerCase().trim().replace(/ /g, '-');

const tareas = [];
for (const carpeta of (await readdir(path.join(raiz, '_fotos-originales'))).filter((d) => !d.startsWith('.'))) {
  const dir = path.join(raiz, '_fotos-originales', carpeta);
  for (const f of await archivosDe(dir, /\.jpe?g$/i)) {
    tareas.push({ archivo: path.join(dir, f), publicId: `evolve/${slug(carpeta)}/${f.replace(/\.jpe?g$/i, '')}`, carpeta: `Evolve/${carpeta.trim()}`, tipo: 'image' });
  }
}
const otras = [
  ['_extraidas/07-casa-girardot', 'casa-girardot', 'Casa Girardot'],
  ['_extraidas/10-bodega-aepi', 'bodega-aepi', 'Bodega AEPI'],
];
for (const [origen, id, carpeta] of otras) {
  for (const f of await archivosDe(path.join(raiz, origen), /\.jpe?g$/i)) {
    tareas.push({ archivo: path.join(raiz, origen, f), publicId: `evolve/${id}/${f.replace(/\.jpe?g$/i, '')}`, carpeta: `Evolve/${carpeta}`, tipo: 'image' });
  }
}
tareas.push({ archivo: path.join(raiz, '_medios/casa-multifamiliar-suba/01.jpg'), publicId: 'evolve/casa-suba/fotograma', carpeta: 'Evolve/Casa Suba', tipo: 'image' });
tareas.push({ archivo: path.join(raiz, '_extraidas/12-casa-multifamiliar-bogota/01.mp4'), publicId: 'evolve/casa-suba/video', carpeta: 'Evolve/Casa Suba', tipo: 'video' });

async function existe(publicId, tipo) {
  try {
    return await cloudinary.api.resource(publicId, { resource_type: tipo });
  } catch (e) {
    if (e?.error?.http_code === 404) return null;
    throw e;
  }
}

const urls = {};
let subidas = 0;
let previas = 0;
for (const t of tareas) {
  const previo = forzar ? null : await existe(t.publicId, t.tipo);
  if (previo) {
    urls[t.publicId] = previo.secure_url;
    previas++;
    continue;
  }
  const r = await cloudinary.uploader.upload(t.archivo, {
    public_id: t.publicId,
    asset_folder: t.carpeta,
    tags: ['evolve', t.publicId.split('/')[1]],
    resource_type: t.tipo,
    overwrite: forzar,
    use_filename: false,
    unique_filename: false,
  });
  urls[t.publicId] = r.secure_url;
  subidas++;
  console.log(`subida ${t.carpeta} -> ${t.publicId}`);
}
const rutaMedios = path.join(raiz, 'src/data/medios.json');
const medios = JSON.parse(await readFile(rutaMedios, 'utf8'));
const idDe = (url) => url.replace(/^.*\/upload\/(v\d+\/)?/, '').replace(/\.\w+$/, '');
for (const m of Object.values(medios)) {
  for (const f of m.fotos) f.url = urls[idDe(f.url)] ?? f.url;
  if (m.video) m.video.url = urls[idDe(m.video.url)] ?? m.video.url;
}
await writeFile(rutaMedios, JSON.stringify(medios, null, 2) + '\n');
console.log(`\n${subidas} subidas, ${previas} ya estaban. medios.json actualizado con las URLs de Cloudinary.`);
