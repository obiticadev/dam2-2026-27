import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'node-html-parser';
import { extractQuizzesFromHtml } from '../packages/starlight-quiz/lib/manifest.ts';
import { banks } from '../contenido/bancos.mjs';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const guide = parse(read('dist/guia-estudio/index.html'));
const home = read('dist/index.html');
const ids = new Set();
const prompts = new Set();
const passages = new Set();
let total = 0;
let longest = 0;

assert.equal(banks.length, 9);
for (const group of ['examen-1', 'examen-2', 'global']) {
  assert.deepEqual(readdirSync(new URL(`src/content/docs/${group}/`, root)).sort(),
    ['grammar.mdx', 'reading.mdx', 'vocabulary.mdx']);
}
for (const bank of banks) {
  const route = `${bank.group}/${bank.skill}`;
  const source = read(`src/content/docs/${route}.mdx`);
  const html = read(`dist/${route}/index.html`);
  const built = extractQuizzesFromHtml(html, `/${route}/`);
  assert.equal(bank.questions.length, 15, route);
  assert.equal(built.length, 15, `${route}: preguntas en HTML`);
  assert.equal((source.match(/<QuizResults\s*\/>/g) ?? []).length, 1);
  assert.ok(home.includes(`href="/${route}/"`), `${route}: acceso desde portada`);
  for (const [index, question] of bank.questions.entries()) {
    const id = `ing-${bank.prefix}-${String(index + 1).padStart(2, '0')}`;
    assert.ok(!ids.has(id), `ID repetido: ${id}`);
    ids.add(id);
    const key = `${question.passage?.title ?? ''}:${question.prompt}`;
    assert.ok(!prompts.has(key), `Pregunta repetida: ${id}`);
    prompts.add(key);
    assert.equal(question.options.length, 4, id);
    assert.equal(new Set(question.options.map(o => o[0])).size, 4, `${id}: opciones distintas`);
    assert.ok(question.options.every(([text, feedback]) => text.trim() && feedback.trim()), id);
    const rendered = built.find(q => q.id === id);
    assert.ok(rendered, `${id}: compilada`);
    assert.equal(rendered.title, question.title);
    assert.equal(rendered.type, 'single');
    assert.equal(rendered.answers.length, 4, `${id}: opciones en HTML`);
    assert.equal(rendered.answers.filter(a => a.correct).length, 1, `${id}: una correcta`);
    assert.ok(rendered.answers.every(a => a.feedback?.trim()), `${id}: feedback en HTML`);
    const correct = rendered.answers.find(a => a.correct);
    // Comparación tolerante a comillas tipográficas y espacios HTML.
    const normalize = text => text.replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
    assert.equal(normalize(correct.text), normalize(question.options[0][0]), `${id}: clave conservada`);
    assert.ok(guide.querySelector(`[id="${question.anchor}"]`), `${id}: ancla ${question.anchor}`);
    assert.ok(source.includes(`](/guia-estudio/#${question.anchor})`), `${id}: repaso local`);
    if (bank.skill === 'reading') {
      assert.ok(question.passage?.text.length > 400, `${id}: lectura autocontenida`);
      assert.ok(rendered.question.includes(question.passage.title), `${id}: título de lectura presente`);
      const lastSentence = question.passage.text.split('.').filter(s => s.trim()).at(-1).trim();
      assert.ok(normalize(rendered.question).includes(normalize(lastSentence)), `${id}: texto completo dentro de pregunta`);
      passages.add(question.passage.title);
    } else {
      assert.ok(!question.passage, `${id}: no mezclar formato de reading`);
    }
    const lengths = question.options.map(([text]) => text.length);
    if (lengths[0] > Math.max(...lengths.slice(1))) longest++;
    total++;
  }
  if (bank.skill === 'reading') {
    const counts = new Map();
    for (const q of bank.questions) counts.set(q.passage.title, (counts.get(q.passage.title) ?? 0) + 1);
    assert.equal(counts.size, 3, `${route}: tres lecturas`);
    assert.deepEqual([...counts.values()], [5, 5, 5]);
  }
  console.log(`${route}: 15 preguntas, 60 opciones explicadas y HTML correcto.`);
}
assert.equal(total, 135);
assert.equal(passages.size, 9);

// Comprueba enlaces locales de las páginas de contenido, también sus fragmentos.
for (const route of ['', 'guia-estudio', ...banks.map(b => `${b.group}/${b.skill}`)]) {
  const doc = parse(read(`dist/${route ? `${route}/` : ''}index.html`));
  assert.equal(doc.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    `https://cuestionarios-ingles.pages.dev/${route ? `${route}/` : ''}`);
  for (const link of doc.querySelectorAll('main a[href]')) {
    const href = link.getAttribute('href');
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const url = new URL(href, 'https://cuestionarios-ingles.pages.dev');
    const target = parse(read(`dist${url.pathname}${url.pathname.endsWith('/') ? '' : '/'}index.html`));
    if (url.hash) assert.ok(target.querySelector(`[id="${decodeURIComponent(url.hash.slice(1))}"]`), `Enlace roto: ${href}`);
  }
}
console.log(`Total: ${total} preguntas únicas, ${ids.size} IDs, 540 opciones explicadas, ${passages.size} lecturas.`);
console.log(`Correcta estrictamente más larga: ${longest}/${total} (indicador editorial, no prueba semántica).`);
