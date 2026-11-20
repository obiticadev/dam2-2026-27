import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { extractQuizzesFromHtml } from '../packages/starlight-quiz/lib/manifest.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const site = 'https://cuestionarios-master.pages.dev';
const sitemap = read('dist/sitemap-0.xml');
const manifest = JSON.parse(read('dist/quiz-manifest.json'));
assert.equal(manifest.quizzes.length, 18, 'Manifiesto completo');
const compiledQuizzes = [];
function checkPublicUrl(html, route) {
  const url = `${site}/${route ? `${route}/` : ''}`;
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`), `${route || 'portada'}: URL canónica`);
  assert.ok(sitemap.includes(`<loc>${url}</loc>`), `${route || 'portada'}: sitemap`);
  assert.doesNotMatch(html, /cuestionarios-ad-2\.pages\.dev|localhost:4321/);
}
// Claves de las respuestas rojas, en el orden original de las cuatro imágenes.
const routes = [
  ['integracion-tecnologia', 'integracion', 'cbbd'],
  ['dispositivos-digitales', 'dispositivos', 'bddbc'],
  ['ia-educacion', 'ia', 'bbbd'],
  ['recursos-redes-licencias', 'recursos', 'dbdab'],
];
const pages = readdirSync(new URL('src/content/docs/', root)).sort();
assert.deepEqual(pages, ['index', ...routes.map(([route]) => route)].map((name) => `${name}.mdx`).sort());
const home = read('dist/index.html');
checkPublicUrl(home, '');
const ids = new Set();
let total = 0;
for (const [route, prefix, key] of routes) {
  const text = read(`src/content/docs/${route}.mdx`);
  const questions = [...text.matchAll(/<Quiz id="([^"]+)" title="([^"]+)">\n([\s\S]*?)<\/Quiz>/g)];
  const html = read(`dist/${route}/index.html`);
  checkPublicUrl(html, route);
  const compiled = extractQuizzesFromHtml(html, `/${route}/`);
  compiledQuizzes.push(...compiled);
  assert.equal(questions.length, key.length, `${route}: número de preguntas`);
  assert.equal(compiled.length, key.length, `${route}: preguntas compiladas`);
  assert.equal((text.match(/<QuizResults\s*\/>/g) ?? []).length, 1);
  for (const [index, [, id, title, body]] of questions.entries()) {
    assert.equal(id, `tec-${prefix}-${String(index + 1).padStart(2, '0')}`);
    assert.ok(!ids.has(id), `Identificador duplicado: ${id}`);
    ids.add(id);
    const options = [...body.matchAll(/^- \[([ x])\] (.+)$/gm)];
    assert.equal(options.length, 4, `${id}: cuatro opciones`);
    assert.equal(options.filter((option) => option[1] === 'x').length, 1);
    assert.equal(options.findIndex((option) => option[1] === 'x'), 'abcd'.indexOf(key[index]), `${id}: solución de la imagen`);
    assert.equal(new Set(options.map((option) => option[2])).size, 4);
    const built = compiled.find((question) => question.id === id);
    assert.ok(built, `${id}: presente en HTML`);
    assert.equal(built.type, 'single');
    assert.equal(built.title, title);
    assert.equal(built.question, body.split('\n\n')[0].trim());
    assert.deepEqual(built.answers.map(({ text, correct }) => ({ text, correct })),
      options.map((option) => ({ text: option[2], correct: option[1] === 'x' })));
    total++;
  }
  assert.ok(home.includes(`href="/${route}/"`), `${route}: enlace en portada`);
  console.log(`${route}: ${key.length} preguntas y soluciones verificadas en MDX y HTML.`);
}
assert.equal(total, 18);
assert.equal(ids.size, 18);
assert.deepEqual(manifest.quizzes.toSorted((a, b) => a.id.localeCompare(b.id)),
  compiledQuizzes.toSorted((a, b) => a.id.localeCompare(b.id)), 'Manifiesto y HTML coinciden');
assert.doesNotMatch(home, /Acceso a Datos|ut02a|ut02b|cuestionarios-ad-2/);
console.log('Total: 18 preguntas, 72 opciones y 18 respuestas correctas verificadas.');
