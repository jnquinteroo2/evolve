import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const [, , base = 'http://localhost:4173', salida = 'shots/lighthouse', ...rutas] = process.argv;
mkdirSync(salida, { recursive: true });
const filas = [];
for (const ruta of rutas.length ? rutas : ['/']) {
  const nombre = ruta === '/' ? 'inicio' : ruta.replace(/^\//, '').replace(/\//g, '_');
  const archivo = path.join(salida, `${nombre}.json`);
  execFileSync('npx', ['-y', 'lighthouse@13.6.0', base + ruta, '--quiet', '--output=json', `--output-path=${archivo}`, '--chrome-flags=--headless=new --no-first-run', '--only-categories=performance,accessibility,best-practices,seo'], { stdio: 'inherit' });
  const r = JSON.parse(readFileSync(archivo, 'utf8'));
  const c = r.categories;
  const a = r.audits;
  filas.push({ ruta, perf: Math.round(c.performance.score * 100), a11y: Math.round(c.accessibility.score * 100), bp: Math.round(c['best-practices'].score * 100), seo: Math.round(c.seo.score * 100), lcp: a['largest-contentful-paint'].displayValue, cls: a['cumulative-layout-shift'].displayValue, tbt: a['total-blocking-time'].displayValue });
}
console.table(filas);
writeFileSync(path.join(salida, 'resumen.json'), JSON.stringify(filas, null, 2));
