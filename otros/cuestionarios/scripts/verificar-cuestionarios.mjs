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
// Identificadores y claves originales; las 18 preguntas comparten ahora una página.
const groups = [
  ['integracion', 'cbbd'],
  ['dispositivos', 'bddbc'],
  ['ia', 'bbbd'],
  ['recursos', 'dbdab'],
];
const expected = groups.flatMap(([prefix, key]) => [...key].map((correct, index) => ({
  id: `tec-${prefix}-${String(index + 1).padStart(2, '0')}`,
  correct,
})));
const pages = readdirSync(new URL('src/content/docs/', root)).sort();
assert.deepEqual(pages, ['index.mdx'], 'Solo debe publicarse un cuestionario');
const home = read('dist/index.html');
checkPublicUrl(home, '');
const ids = new Set();
let total = 0;
{
  const text = read('src/content/docs/index.mdx');
  const questions = [...text.matchAll(/<Quiz id="([^"]+)" title="([^"]+)">\n([\s\S]*?)<\/Quiz>/g)];
  const compiled = extractQuizzesFromHtml(home, '/');
  compiledQuizzes.push(...compiled);
  assert.equal(questions.length, 18, 'Un cuestionario con 18 preguntas');
  assert.equal(compiled.length, 18, '18 preguntas compiladas en la misma página');
  assert.equal((text.match(/<QuizResults\s*\/>/g) ?? []).length, 1);
  for (const [index, [, id, title, body]] of questions.entries()) {
    assert.equal(id, expected[index].id);
    assert.ok(!ids.has(id), `Identificador duplicado: ${id}`);
    ids.add(id);
    const options = [...body.matchAll(/^- \[([ x])\] (.+)$/gm)];
    assert.equal(options.length, 4, `${id}: cuatro opciones`);
    assert.equal(options.filter((option) => option[1] === 'x').length, 1);
    assert.equal(options.findIndex((option) => option[1] === 'x'), 'abcd'.indexOf(expected[index].correct), `${id}: solución de la imagen`);
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
  console.log('Cuestionario único: 18 preguntas y un solo bloque de resultados verificados.');
}
assert.equal(total, 18);
assert.equal(ids.size, 18);
assert.deepEqual(manifest.quizzes.toSorted((a, b) => a.id.localeCompare(b.id)),
  compiledQuizzes.toSorted((a, b) => a.id.localeCompare(b.id)), 'Manifiesto y HTML coinciden');
assert.doesNotMatch(home, /Acceso a Datos|ut02a|ut02b|cuestionarios-ad-2/);
for (const route of ['integracion-tecnologia', 'dispositivos-digitales', 'ia-educacion', 'recursos-redes-licencias']) {
  assert.ok(read('dist/_redirects').includes(`/${route}/ / 301`), `${route}: redirección a la página única`);
  assert.ok(!sitemap.includes(`/${route}/`), `${route}: no debe figurar como cuestionario separado`);
}
console.log('Total: 18 preguntas, 72 opciones y 18 respuestas correctas verificadas.');
