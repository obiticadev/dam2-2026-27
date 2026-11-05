import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'node-html-parser';
import { extractQuizzesFromHtml } from '../packages/starlight-quiz/lib/manifest.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const ids = new Set();
const home = read('dist/index.html');
let codeCount = 0;
let longest = 0;
const positions = [0, 0, 0, 0];
assert.equal(readdirSync(new URL('src/content/docs/py-examen-2/', root)).length, 3);
for (let n = 1; n <= 3; n++) {
  const route = `py-examen-2/simulacro-${n}`;
  const text = read(`src/content/docs/${route}.mdx`);
  const questions = [...text.matchAll(/<Quiz id="([^"]+)" title="([^"]+)">([\s\S]*?)<\/Quiz>/g)];
  assert.equal(questions.length, 20, `${route}: veinte preguntas`);
  assert.equal((text.match(/<QuizResults\s*\/>/g) ?? []).length, 1);
  const html = read(`dist/${route}/index.html`);
  const document = parse(html);
  const built = extractQuizzesFromHtml(html, `/${route}/`);
  assert.equal(built.length, 20, `${route}: veinte preguntas en el HTML`);
  for (const [index, [, id, title, body]] of questions.entries()) {
    assert.equal(id, `py2-s${n}-${String(index + 1).padStart(2, '0')}`);
    assert.ok(!ids.has(id), `ID repetido: ${id}`);
    ids.add(id);
    const options = [...body.matchAll(/^- \[([ x])\] (.+)\n  > (.+)$/gm)];
    assert.equal(options.length, 4, `${id}: cuatro opciones explicadas`);
    assert.equal(options.filter((o) => o[1] === 'x').length, 1);
    assert.equal(new Set(options.map((o) => o[2])).size, 4);
    assert.match(body, /Repasar: /);
    const blocks = [...body.matchAll(/```python\n([\s\S]*?)```/g)];
    if (blocks.length) codeCount++;
    // Expressive Code conserva el código original en el botón de copia.
    // Contrastar también este valor evita normalizar sin querer los espacios
    // en las preguntas donde la sangría es precisamente lo evaluado.
    const copiedBlocks = document.querySelector(`#${id}`).querySelectorAll('button[data-code]');
    assert.equal(copiedBlocks.length, blocks.length, `${id}: bloques publicados`);
    for (const [i, block] of blocks.entries()) {
      // Expressive Code transforma el comentario inicial de archivo en un
      // encabezado visual y lo excluye del contenido que se copia.
      assert.equal(copiedBlocks[i].getAttribute('data-code').replace(/\u007f/g, '\n'),
        block[1].replace(/^# archivo: [a-z_]+\.py\n/, '').replace(/\n$/, ''),
        `${id}: código y sangría preservados en HTML`);
    }
    const lines = blocks.flatMap((b) => b[1].split('\n').filter((line) => line.trim() && !line.startsWith('# archivo:')));
    assert.ok(lines.length <= 14, `${id}: fragmento demasiado largo para cálculo mental`);
    assert.ok(lines.every((line) => !line.includes('\t')), `${id}: no introducir tabuladores`);
    const compiled = built.find((q) => q.id === id);
    assert.ok(compiled, `${id}: presente en HTML`);
    assert.equal(compiled.type, 'single');
    assert.equal(compiled.title, title);
    assert.equal(compiled.answers.length, 4);
    assert.equal(compiled.answers.filter((a) => a.correct).length, 1);
    assert.ok(compiled.answers.every((a) => a.feedback?.trim()), `${id}: feedback renderizado`);
    const plain = (s) => s.replace(/`/g, '').replace(/\s+/g, ' ').trim();
    const marked = options.find((o) => o[1] === 'x');
    assert.equal(compiled.answers.find((a) => a.correct).text, plain(marked[2]), `${id}: se conserva la correcta`);
    const correct = options.indexOf(marked);
    positions[correct]++;
    const lengths = options.map((o) => plain(o[2]).length);
    if (lengths[correct] === Math.max(...lengths) && lengths.filter((v) => v === lengths[correct]).length === 1) longest++;
  }
  assert.ok(home.includes(`href="/${route}/"`), `${route}: enlace desde portada`);
  console.log(`${route}: 20 preguntas válidas en MDX y HTML.`);
}
assert.equal(ids.size, 60);
assert.equal(codeCount, 57);
assert.ok(longest < 30, 'Demasiadas correctas son la opción más larga');
assert.ok(positions.every((v) => v >= 10 && v <= 20), 'Revisar el reparto de respuestas correctas');
assert.match(home, /<title>Python · Segundo examen \| Cuestionarios · Python · Examen 2<\/title>/);
assert.doesNotMatch(home, /href="\/ut02[ab]\//);
console.log(`60 IDs únicos; 240 opciones explicadas; ${codeCount} preguntas con código.`);
console.log(`Correctas por posición: ${positions.join(', ')}; correcta más larga: ${longest}/60 (solo indicador editorial).`);
