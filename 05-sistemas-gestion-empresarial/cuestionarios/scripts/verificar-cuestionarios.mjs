import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { parse } from 'node-html-parser';
import { groups, examGroups, allTests, mixed } from '../data/banco.mjs';
import { extractQuizzesFromHtml } from '../packages/starlight-quiz/lib/manifest.ts';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const unique = groups.flatMap(group => group.questions);
assert.equal(unique.length, 180);
assert.equal(new Set(unique.map(question => question.prompt)).size, 180, 'Enunciados originales únicos');
assert.equal(allTests.length, 13);
const exam = examGroups.flatMap(group => group.questions);
assert.deepEqual(examGroups.map(group => group.questions.length), [15, 20, 15], 'Estilo examen: 15/20/15');
assert.equal(new Set([...unique, ...exam].map(question => question.prompt)).size, 230, 'Enunciados de examen únicos');
assert.equal(mixed.questions.filter(question => question.unit === 1).length, 5);
assert.equal(mixed.questions.filter(question => question.unit === 2).length, 15);

const required = ['RR. HH.', 'SI', 'TIC', 'I+D', 'DAFO', 'KPI', 'ERP', 'EPM', 'EOQ',
  'MRP', 'MRP II', 'ROI', 'LIMS', 'IaaS', 'PaaS', 'SaaS', 'CPD', 'JVM', 'IA', 'ML',
  'IoT', 'IIoT', 'CIM', 'CAD', 'CAM', 'CNC', 'CAPEX', 'OPEX', 'TCO', 'API', 'OCR',
  'PWA', 'SCM', 'SRM', 'B2B', 'B2C', 'SSOT', 'PIM', 'BI', 'OLTP', 'OLAP', 'DW',
  'ETL', 'CSF', 'DSS', 'FASMI', 'EIS', 'DM', 'CMI', 'BSC', 'CRM', 'BPR', 'SGBD',
  'ORM', 'SQL', 'REST', 'JSON', 'SOAP', 'XML', 'ODBC', 'JDBC', 'CSV', 'MSE', 'RMSE',
  'MAE', 'R²', 'F1', 'OEE', 'NPS', 'BOM', 'VPN', 'AWS'];
const concepts = new Set(unique.flatMap(question => question.terms));
for (const term of required) assert.ok(concepts.has(term), `Falta cubrir ${term}`);

const ids = new Set();
let rendered = 0;
let longest = 0;
const unitSources = {
  1: 'ut01-la-empresa.md',
  2: 'ut02-sistemas-de-gestion-empresarial.md',
};
for (const test of allTests) {
  const isExam = examGroups.includes(test);
  const count = test.questions.length;
  if (!isExam) assert.equal(count, 20, test.slug);
  const mdx = read(`src/content/docs/${test.slug}.mdx`);
  assert.equal((mdx.match(/<QuizResults\s*\/>/g) ?? []).length, 1);
  const html = read(`dist/${test.slug}/index.html`);
  const built = extractQuizzesFromHtml(html, `/${test.slug}/`);
  assert.equal(built.length, count, `${test.slug}: HTML compilado`);
  const distribution = [0, 0, 0, 0];
  let groupLongest = 0;
  for (const question of test.questions) {
    assert.ok(!ids.has(question.id), `ID repetido: ${question.id}`);
    ids.add(question.id);
    const compiled = built.find(entry => entry.id === question.id);
    assert.ok(compiled, question.id);
    const correctCount = question.options.filter(option => option.correct).length;
    assert.equal(compiled.type, correctCount > 1 ? 'multiple' : 'single');
    assert.ok(isExam || correctCount === 1, `${question.id}: respuesta múltiple fuera de examen`);
    assert.equal(compiled.answers.length, 4);
    assert.equal(compiled.answers.filter(option => option.correct).length, correctCount);
    assert.equal(new Set(compiled.answers.map(option => option.text)).size, 4);
    assert.ok(compiled.answers.every(option => option.feedback?.length > 30), `${question.id}: cuatro explicaciones`);
    const correctIndex = compiled.answers.findIndex(option => option.correct);
    if (correctCount === 1) distribution[correctIndex]++;
    assert.equal(compiled.answers[correctIndex].text, question.options.find(option => option.correct).text, `${question.id}: solución conservada`);
    for (const option of question.options) {
      const renderedOption = compiled.answers.find(answer => answer.text === option.text);
      assert.ok(renderedOption?.feedback.includes(option.explanation), `${question.id}: explicación íntegra`);
      assert.equal(renderedOption.correct, option.correct);
    }
    assert.ok(!compiled.question.includes('Para situarlo'), `${question.id}: referencia fuera del enunciado`);
    assert.ok(compiled.explanation?.includes('Para situarlo'), `${question.id}: referencia tras la corrección`);
    const lengths = question.options.map(option => option.text.length);
    if (correctCount === 1 && lengths[0] > Math.max(...lengths.slice(1))) groupLongest++;
    const unit = question.unit ?? test.unit;
    const source = read(`public/temario/${unitSources[unit]}`);
    assert.ok(source.split('\n').some(line => line.match(/^#{2,6} /) &&
      line.replace(/^#{2,6} /, '').startsWith(`${question.section}. `)), `${question.id}: apartado de fuente`);
    rendered++;
  }
  assert.ok(Math.max(...distribution) - Math.min(...distribution) <= 1, `${test.slug}: reparto de posiciones ${distribution}`);
  // Medida orientativa: no sustituye revisar que la redacción sea inequívoca.
  assert.ok(groupLongest <= count / 2, `${test.slug}: demasiadas correctas más largas (${groupLongest})`);
  if (test.unit) longest += groupLongest;
  console.log(`${test.slug}: ${count} preguntas, ${count * 4} explicaciones, posiciones ${distribution.join('/')}; correcta más larga: ${groupLongest}/${count}.`);
}
assert.equal(rendered, 250);
assert.equal(ids.size, 250);
assert.ok(longest <= unique.length * 0.35, `Correcta más larga: ${longest}/180`);

function htmlFiles(url) {
  return readdirSync(url, { withFileTypes: true }).flatMap(entry => {
    const child = new URL(entry.name, url);
    return entry.isDirectory() ? htmlFiles(new URL(`${entry.name}/`, url)) : entry.name.endsWith('.html') ? [child] : [];
  });
}
let checkedLinks = 0;
for (const file of htmlFiles(new URL('dist/', root))) {
  const html = readFileSync(file, 'utf8');
  assert.ok(!/cuestionarios-ad-2|Cuestionarios de Acceso a Datos|\/ut02[ab]\//.test(html), `Resto de AD en ${file}`);
  const doc = parse(html);
  for (const link of doc.querySelectorAll('a[href]')) {
    const href = link.getAttribute('href');
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const url = new URL(href, 'https://cuestionarios-sge.pages.dev');
    const path = decodeURIComponent(url.pathname).slice(1);
    const target = new URL(`dist/${path}${path.endsWith('/') || !path ? 'index.html' : ''}`, root);
    assert.ok(existsSync(target), `Enlace roto: ${href} en ${file}`);
    if (url.hash && target.pathname.endsWith('.html')) {
      const targetDoc = parse(readFileSync(target, 'utf8'));
      assert.ok(targetDoc.querySelectorAll('[id]').some(el => el.id === decodeURIComponent(url.hash.slice(1))), `Ancla rota: ${href}`);
    }
    checkedLinks++;
  }
}
const home = read('dist/index.html');
for (const test of allTests) assert.ok(home.includes(`href="/${test.slug}/"`), `Falta acceso a ${test.slug}`);
assert.match(home, /https:\/\/cuestionarios-sge\.pages\.dev/);
console.log(`OK: 180 preguntas únicas + 50 de estilo examen; 250 publicadas con repaso; 1000 opciones explicadas; ${required.length} siglas clave; ${checkedLinks} enlaces locales.`);
console.log(`Correcta estrictamente más larga en el banco original: ${longest}/180 (${(100 * longest / 180).toFixed(1)} %).`);
