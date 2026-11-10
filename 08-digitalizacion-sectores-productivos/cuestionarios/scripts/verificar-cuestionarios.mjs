import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { extractQuizzesFromHtml } from '../packages/starlight-quiz/lib/manifest.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const routes = [
  ['ut1/negocio', '1a', 1],
  ['ut1/integracion', '1b', 1],
  ['ut2/tecnologias', '2a', 2],
  ['ut2/impacto', '2b', 2],
  ['ut3/servicios', '3a', 3],
  ['ut3/arquitectura', '3b', 3],
  ['mixtos/integracion', 'ma', null],
  ['mixtos/decisiones', 'mb', null],
];

function mdxFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = new URL(entry.name, dir);
    return entry.isDirectory() ? mdxFiles(new URL(`${entry.name}/`, dir))
      : entry.name.endsWith('.mdx') ? [path] : [];
  });
}
assert.equal(mdxFiles(new URL('src/content/docs/', root)).length, 9,
  'Solo deben publicarse ocho cuestionarios y la portada');

const ids = new Map();
const prompts = new Set();
const positions = [0, 0, 0, 0];
let longest = 0;
let shortest = 0;
for (const [route, prefix, unit] of routes) {
  const text = read(`src/content/docs/${route}.mdx`);
  const questions = [...text.matchAll(/<Quiz id="([^"]+)" title="([^"]+)">([\s\S]*?)<\/Quiz>/g)];
  const built = extractQuizzesFromHtml(read(`dist/${route}/index.html`), `/${route}/`);
  assert.equal(questions.length, 15, `${route}: 15 preguntas en MDX`);
  assert.equal(built.length, 15, `${route}: 15 preguntas compiladas`);
  assert.equal((text.match(/<QuizResults\s*\/>/g) ?? []).length, 1);
  const unitCounts = [0, 0, 0];
  let calculations = 0;
  for (const [index, [, id, title, body]] of questions.entries()) {
    assert.equal(id, `dig-${prefix}-${String(index + 1).padStart(2, '0')}`);
    assert.ok(!ids.has(id), `ID repetido: ${id}`);
    const prompt = body.split(/\n- \[/)[0].replace(/\s+/g, ' ').trim();
    assert.ok(!prompts.has(prompt), `${id}: enunciado duplicado`);
    prompts.add(prompt);
    const options = [...body.matchAll(/^- \[([ x])\] (.+)\n  > (.+)$/gm)];
    assert.equal(options.length, 4, `${id}: cuatro opciones explicadas`);
    assert.equal(options.filter((o) => o[1] === 'x').length, 1, `${id}: una correcta`);
    assert.equal(new Set(options.map((o) => o[2])).size, 4, `${id}: opciones distintas`);
    assert.ok(options.every((o) => o[3].length >= 40), `${id}: explicación insuficiente`);
    const reference = body.match(/Repasar: UT([123]) (.+)/);
    assert.ok(reference, `${id}: referencia al temario`);
    const sourceUnit = Number(reference[1]);
    if (unit) assert.equal(sourceUnit, unit, `${id}: referencia a su unidad`);
    unitCounts[sourceUnit - 1]++;
    const rendered = built.find((q) => q.id === id);
    assert.ok(rendered, `${id}: falta en HTML`);
    assert.equal(rendered.title, title);
    assert.equal(rendered.type, 'single');
    assert.equal(rendered.answers.length, 4);
    assert.equal(rendered.answers.filter((a) => a.correct).length, 1);
    assert.ok(rendered.answers.every((a) => a.feedback?.trim()), `${id}: feedback perdido`);
    assert.match(rendered.explanation, /Repasar: UT[123]/);
    const correct = options.findIndex((o) => o[1] === 'x');
    assert.equal(rendered.answers.find((a) => a.correct).text, options[correct][2]);
    positions[correct]++;
    const lengths = options.map((o) => o[2].length);
    if (lengths[correct] > Math.max(...lengths.filter((_, i) => i !== correct))) longest++;
    if (lengths[correct] < Math.min(...lengths.filter((_, i) => i !== correct))) shortest++;
    if (title.startsWith('Cálculo')) calculations++;
    ids.set(id, { body, prompt, answer: options[correct][2] });
  }
  if (!unit) assert.deepEqual(unitCounts, [5, 5, 5], `${route}: cinco por tema`);
  if (unit === 3) assert.equal(calculations, 3, `${route}: tres cálculos`);
  console.log(`${route}: 15 preguntas válidas; referencias ${unitCounts.join('/')}; HTML correcto.`);
}
assert.equal(ids.size, 120);
assert.equal(longest, 0, 'Ninguna correcta debe destacar como la única opción más larga');
assert.ok(shortest < 60, 'Evitar también convertir la correcta en la más corta por sistema');
assert.ok(positions.every((n) => n >= 25 && n <= 35), `Reparto de posiciones: ${positions}`);

// Tasas en centésimas de porcentaje: 3,28 % = 328 / 10.000.
const money = (amount) => Number(amount.replaceAll('.', '').replace(',', '.'));
const calculations = [
  ['dig-3a-13', () => 250000 * 328 / 10000, ['250.000', '3,28']],
  ['dig-3a-14', () => 500000 * 716 / 10000, ['500.000', '7,16']],
  ['dig-3a-15', () => 800000 * 151 / 10000, ['800.000', '1,51']],
  ['dig-3b-13', () => 1000000 * (716 - 151) / 10000, ['1.000.000', '7,16', '1,51']],
  ['dig-3b-14', () => 16400 * 10000 / 328, ['16.400', '3,28']],
  ['dig-3b-15', () => 400000 * (328 - 151) / 10000, ['400.000', '3,28', '1,51']],
  ['dig-mb-14', () => 600000 * 328 / 10000, ['600.000', '3,28']],
];
for (const [id, calculate, inputs] of calculations) {
  const question = ids.get(id);
  for (const input of inputs) assert.ok(question.prompt.includes(input), `${id}: base o tasa cambiada`);
  assert.match(question.answer, /^[\d.,]+ €\.$/);
  assert.equal(money(question.answer.replace(' €.', '')), calculate(), `${id}: resultado aritmético`);
  assert.match(question.body, /Correcta:.*[×/−]/, `${id}: falta explicar la operación`);
}

const home = read('dist/index.html');
assert.ok(home.includes('Cuestionarios de Digitalización'));
assert.ok(!home.includes('Acceso a Datos'));
for (const [route] of routes) assert.ok(home.includes(`href="/${route}/"`), `Falta enlace: ${route}`);
const config = read('astro.config.mjs');
assert.ok(config.includes("site: 'https://cuestionarios-digitalizacion.pages.dev'"));
assert.ok(home.includes('https://cuestionarios-digitalizacion.pages.dev/'));
assert.equal(JSON.parse(read('dist/quiz-manifest.json')).quizzes.length, 120);
console.log(`Total: 120 preguntas únicas, 480 opciones explicadas y 7 cálculos comprobados.`);
console.log(`Correcta única más larga: ${longest}; única más corta: ${shortest}; posiciones: ${positions.join('/')}.`);
