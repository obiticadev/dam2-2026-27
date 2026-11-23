import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { extractQuizzesFromHtml } from '../packages/starlight-quiz/lib/manifest.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
function checkXmlLayout(body, id) {
  const outsideBlocks = body.replace(/```[^\n]*\n[\s\S]*?```/g, '');
  // Una etiqueta al inicio del código en línea; los genéricos Java como `List<String>` no cuentan.
  assert.doesNotMatch(outsideBlocks, /`<\/?[A-Za-z][^`\n]*>/,
    `${id}: el XML debe ir en un bloque, no entre backticks en línea`);
  for (const [, xml] of body.matchAll(/```xml\n([\s\S]*?)```/g)) {
    for (const line of xml.split('\n')) {
      // A leaf such as <nombre>Eva</nombre> is fine. Nested elements,
      // siblings and consecutive closing tags must occupy separate lines.
      assert.doesNotMatch(line, /<[^!?/][^>]*>[\s\S]*<[^!?/][^>]*>|<\/[^>]+>\s*</,
        `${id}: XML compactado; mostrar cada nivel y cada hermano en su propia línea`);
    }
  }
}
// Regression examples for the layout guard itself.
assert.throws(() => checkXmlLayout('```xml\n<r><a>1</a><b/>\n</r>\n```', 'prueba'));
assert.throws(() => checkXmlLayout('```xml\n<r>\n<a>1</a></r>\n```', 'prueba'));
assert.throws(() => checkXmlLayout('XML: `<r/>`', 'prueba'));
checkXmlLayout('```xml\n<r>\n  <a>1</a>\n  <b/>\n</r>\n```', 'prueba');
checkXmlLayout('Devuelve `List<String>` y `Map<String, Integer>`', 'prueba');
assert.throws(() => checkXmlLayout('XML: `<cliente><nombre/></cliente>`', 'prueba'));
// [ruta, prefijo, ¿con código? (null = mixto), referencias de cada mitad en los mixtos]
const routes = [
  ['tema-2/ut02a/sin-codigo', 'an', false],
  ['tema-2/ut02a/con-codigo', 'ac', true],
  ['tema-2/ut02b/sin-codigo', 'bn', false],
  ['tema-2/ut02b/con-codigo', 'bc', true],
  ['tema-2/mixto', 'mn', null, [/Repasar: A §/, /Repasar: B §/]],
  ['tema-2/mixto-dificil', 'md', null, [/Repasar: A §/, /Repasar: B §/]],
  ['tema-3/3a/sin-codigo', 't3an', false],
  ['tema-3/3a/con-codigo', 't3ac', true],
  ['tema-3/3b/sin-codigo', 't3bn', false],
  ['tema-3/3b/con-codigo', 't3bc', true],
  ['tema-3/mixto', 't3mn', null, [/Repasar: 3A §/, /Repasar: 3B §/]],
  ['tema-3/mixto-dificil', 't3md', null, [/Repasar: 3A §/, /Repasar: 3B §/]],
  ['tema-3/3a/casos-sin-codigo', 't3arn', false],
  ['tema-3/3a/casos-con-codigo', 't3arc', true],
  ['tema-3/3b/casos-sin-codigo', 't3brn', false],
  ['tema-3/3b/casos-con-codigo', 't3brc', true],
  ['tema-3/casos-mixto', 't3rmn', null, [/Repasar: 3A §/, /Repasar: 3B §/]],
  ['tema-3/casos-mixto-dificil', 't3rmd', null, [/Repasar: 3A §/, /Repasar: 3B §/]],
  ['tema-4/orm/sin-codigo', 't4on', false],
  ['tema-4/orm/con-codigo', 't4oc', true],
  ['tema-4/hql/sin-codigo', 't4hn', false],
  ['tema-4/hql/con-codigo', 't4hc', true],
  ['tema-4/mixto', 't4mn', null, [/Repasar: 4[AB] §/, /Repasar: 4C §/]],
  ['tema-4/mixto-dificil', 't4md', null, [/Repasar: 4[AB] §/, /Repasar: 4C §/]],
];
function mdxFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = `${dir}/${entry.name}`;
    return entry.isDirectory() ? mdxFiles(path) : path.endsWith('.mdx') ? [path] : [];
  });
}
assert.equal(mdxFiles(fileURLToPath(new URL('src/content/docs', root))).length, routes.length + 1,
  'Deben publicarse los cuestionarios de la lista y la portada');

const ids = new Set();
let total = 0;
let longest = 0;
for (const [route, prefix, code, halves] of routes) {
  const text = read(`src/content/docs/${route}.mdx`);
  const questions = [...text.matchAll(/<Quiz id="([^"]+)" title="([^"]+)">([\s\S]*?)<\/Quiz>/g)];
  assert.equal(questions.length, 20, `${route}: deben ser 20 preguntas`);
  assert.equal((text.match(/<QuizResults\s*\/>/g) ?? []).length, 1);
  let codeQuestions = 0;
  const built = extractQuizzesFromHtml(read(`dist/${route}/index.html`), `/${route}/`);
  assert.equal(built.length, 20, `${route}: 20 preguntas en el HTML real`);
  for (const [index, [, id, title, body]] of questions.entries()) {
    assert.equal(id, `${prefix}-${String(index + 1).padStart(2, '0')}`);
    assert.ok(!ids.has(id), `ID repetido: ${id}`);
    ids.add(id);
    const options = [...body.matchAll(/^- \[([ x])\] (.+)\n  > (.+)$/gm)];
    assert.equal(options.length, 4, `${id}: cuatro opciones con explicación`);
    assert.equal(options.filter((o) => o[1] === 'x').length, 1, `${id}: una correcta`);
    assert.equal(new Set(options.map((o) => o[2])).size, 4, `${id}: opciones distintas`);
    assert.match(body, /Repasar: /, `${id}: referencia de estudio`);
    checkXmlLayout(body, id);
    const hasCode = /```(?:java|xml|sql|bash)/.test(body);
    if (hasCode) codeQuestions++;
    if (code === false) assert.ok(!hasCode, `${id}: no debe haber bloques de código`);
    const compiled = built.find((q) => q.id === id);
    assert.ok(compiled, `${id}: presente en el HTML`);
    assert.equal(compiled.type, 'single');
    assert.equal(compiled.answers.length, 4);
    assert.equal(compiled.answers.filter((a) => a.correct).length, 1);
    assert.ok(compiled.answers.every((a) => a.feedback?.trim()), `${id}: feedback renderizado`);
    assert.equal(compiled.title, title);
    const lengths = options.map((o) => o[2].replace(/[`*]/g, '').length);
    const correct = options.findIndex((o) => o[1] === 'x');
    if (lengths[correct] === Math.max(...lengths)
        && lengths.filter((n) => n === lengths[correct]).length === 1) longest++;
    total++;
  }
  if (code === true) assert.equal(codeQuestions, 20, `${route}: todas deben incluir código`);
  if (code === null) {
    assert.ok(codeQuestions > 0 && codeQuestions < 20, `${route}: mezcla de conceptos y código`);
    for (const half of halves) {
      assert.equal(questions.filter((q) => half.test(q[3])).length, 10, `${route}: 10 preguntas de ${half}`);
    }
  }
  console.log(`${route}: 20 preguntas válidas; ${codeQuestions} con código; HTML correcto.`);
}
assert.equal(total, routes.length * 20);
// Avisa de una pista editorial, no impone igualar artificialmente todos los textos.
assert.ok(longest < total / 2, 'La correcta es la más larga con demasiada frecuencia');
console.log(`Total: ${total}; ${ids.size} IDs únicos; ${total * 4} opciones explicadas.`);
console.log(`Correcta estrictamente más larga: ${longest}/${total} (métrica orientativa).`);

const home = read('dist/index.html');
for (const [route] of routes) assert.ok(home.includes(`href="/${route}/"`), `Falta enlace: ${route}`);
assert.ok(!home.includes('/ut02a/a1-file-filtros/'), 'La portada enlaza contenido archivado');
