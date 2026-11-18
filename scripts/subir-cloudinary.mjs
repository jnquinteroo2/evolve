import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
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
const rutaMedios = path.join(raiz, 'src/data/medios.json');
const medios = JSON.parse(await readFile(rutaMedios, 'utf8'));
const maestros = path.join(raiz, '_medios');
const forzar = process.argv.includes('--forzar');

async function existe(publicId, tipo) {
  try {
    return await cloudinary.api.resource(publicId, { resource_type: tipo });
  } catch (e) {
    if (e?.error?.http_code === 404) return null;
    throw e;
  }
}

async function subir(archivo, publicId, tipo) {
  const previo = forzar ? null : await existe(publicId, tipo);
  if (previo) return { estado: 'ya estaba', r: previo };
  const r = await cloudinary.uploader.upload(archivo, { public_id: publicId, resource_type: tipo, overwrite: forzar, unique_filename: false, use_filename: false });
  return { estado: 'subida', r };
}

let subidas = 0;
let previas = 0;
for (const [slug, m] of Object.entries(medios)) {
  for (const foto of m.fotos) {
    const nombre = foto.publicId.split('/').pop();
    const archivo = path.join(maestros, slug, `${nombre}.jpg`);
    if (!existsSync(archivo)) throw new Error(`No existe ${archivo}; corre primero npm run fotos`);
    const { estado, r } = await subir(archivo, foto.publicId, 'image');
    foto.width = r.width;
    foto.height = r.height;
    estado === 'subida' ? subidas++ : previas++;
    console.log(`${estado.padEnd(9)} ${foto.publicId} ${r.width}x${r.height}`);
  }
  if (m.video) {
    const archivo = path.join(maestros, slug, 'video.mp4');
    const { estado, r } = await subir(archivo, m.video.publicId, 'video');
    m.video.width = r.width;
    m.video.height = r.height;
    estado === 'subida' ? subidas++ : previas++;
    console.log(`${estado.padEnd(9)} ${m.video.publicId} (video) ${r.width}x${r.height}`);
  }
}

await writeFile(rutaMedios, JSON.stringify(medios, null, 2) + '\n');
console.log(`\n${subidas} subidas, ${previas} ya estaban. medios.json actualizado.`);
