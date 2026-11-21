import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { extractQuizzesFromHtml } from '../packages/starlight-quiz/lib/manifest.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const site = 'https://cuestionarios-master.pages.dev';
const sitemap = read('dist/sitemap-0.xml');
const manifest = JSON.parse(read('dist/quiz-manifest.json'));
assert.equal(manifest.quizzes.length, 31, 'Manifiesto completo');
const compiledQuizzes = [];
function checkPublicUrl(html, route) {
  const url = `${site}/${route ? `${route}/` : ''}`;
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`), `${route || 'portada'}: URL canónica`);
  assert.ok(sitemap.includes(`<loc>${url}</loc>`), `${route || 'portada'}: sitemap`);
  assert.doesNotMatch(html, /cuestionarios-ad-2\.pages\.dev|localhost:4321/);
}
// Identificadores y claves originales; todas las preguntas comparten una página.
const groups = [
  ['integracion', 'cbbd', [19, 20, 21, 22]],
  ['dispositivos', 'bddbc', [9, 10, 11, 12, 13]],
  ['ia', 'bbbd', [5, 6, 7, 8]],
  ['recursos', 'dbdab', [14, 15, 16, 17, 18]],
];
const expected = groups.flatMap(([prefix, key, pdfNumbers]) => [...key].map((correct, index) => ({
  id: `tec-${prefix}-${String(index + 1).padStart(2, '0')}`,
  correct,
  pdfNumber: pdfNumbers[index],
})));
const addedPdfNumbers = [1, 2, 3, 4, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const addedKey = 'cbdddbacbcbbb';
expected.push(...addedPdfNumbers.map((pdfNumber, index) => ({
  id: `tec-pdf-${String(pdfNumber).padStart(2, '0')}`,
  correct: addedKey[index],
  pdfNumber,
})));
assert.deepEqual(expected.map(({ pdfNumber }) => pdfNumber).toSorted((a, b) => a - b),
  Array.from({ length: 31 }, (_, index) => index + 1), 'Cada pregunta del PDF aparece una sola vez');
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
  assert.equal(questions.length, 31, 'Un cuestionario con 31 preguntas');
  assert.equal(compiled.length, 31, '31 preguntas compiladas en la misma página');
  assert.equal((text.match(/<QuizResults\s*\/>/g) ?? []).length, 1);
  for (const [index, [, id, title, body]] of questions.entries()) {
    assert.equal(id, expected[index].id);
    assert.ok(!ids.has(id), `Identificador duplicado: ${id}`);
    ids.add(id);
    const options = [...body.matchAll(/^- \[([ x])\] (.+)$/gm)];
    assert.equal(options.length, 4, `${id}: cuatro opciones`);
    assert.equal(options.filter((option) => option[1] === 'x').length, 1);
    assert.equal(options.findIndex((option) => option[1] === 'x'), 'abcd'.indexOf(expected[index].correct), `${id}: solución del PDF, pregunta ${expected[index].pdfNumber}`);
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
  assert.match(compiled.find(({ id }) => id === 'tec-pdf-23').explanation, /ambiguo.*YouTube/,
    'La pregunta 23 debe conservar la advertencia de ambigüedad');
  console.log('Cuestionario único: 31 preguntas y un solo bloque de resultados verificados.');
}
assert.equal(total, 31);
assert.equal(ids.size, 31);
assert.deepEqual(manifest.quizzes.toSorted((a, b) => a.id.localeCompare(b.id)),
  compiledQuizzes.toSorted((a, b) => a.id.localeCompare(b.id)), 'Manifiesto y HTML coinciden');
assert.doesNotMatch(home, /Acceso a Datos|ut02a|ut02b|cuestionarios-ad-2/);
for (const route of ['integracion-tecnologia', 'dispositivos-digitales', 'ia-educacion', 'recursos-redes-licencias']) {
  assert.ok(read('dist/_redirects').includes(`/${route}/ / 301`), `${route}: redirección a la página única`);
  assert.ok(!sitemap.includes(`/${route}/`), `${route}: no debe figurar como cuestionario separado`);
}
console.log('Total: 31 preguntas, 124 opciones y 31 claves de respuesta verificadas.');
