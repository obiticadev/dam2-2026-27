import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { groups, allTests } from '../data/banco.mjs';

const root = new URL('../', import.meta.url);
const docs = new URL('src/content/docs/', root);
export const sources = {
  1: 'ut01-la-empresa.md',
  2: 'ut02-sistemas-de-gestion-empresarial.md',
};
const sectionMaps = Object.fromEntries(Object.entries(sources).map(([unit, filename]) => {
  const text = readFileSync(new URL(`public/temario/${filename}`, root), 'utf8');
  const sections = new Map([...text.matchAll(/^#{2,6} (\d+(?:\.\d+)*)(?:\.)? (.+)$/gm)]
    .map(([, number, title]) => [number, title]));
  return [unit, sections];
}));

// Fija un reparto 5/5/5/5 en el MDX. No es un patrón visible: el plugin vuelve
// a barajar las opciones y las preguntas de cada intento en el navegador.
export function orderedOptions(question, index) {
  const options = question.options.filter(option => !option.correct);
  options.splice(index % 4, 0, question.options.find(option => option.correct));
  return options;
}

function write(relative, content) {
  const url = new URL(relative, docs);
  mkdirSync(new URL('./', url), { recursive: true });
  writeFileSync(url, content, 'utf8');
}

for (const [testIndex, test] of allTests.entries()) {
  const header = `---\ntitle: ${JSON.stringify(test.title)}\ndescription: ${JSON.stringify(test.description)}\nsidebar:\n  order: ${testIndex + 1}\n---\n\nimport { Quiz, QuizResults } from 'starlight-quiz/components';\n\n`;
  const intro = '**20 preguntas · cuatro opciones · una correcta · nivel inicial.** Piensa tu respuesta y pulsa **Corregir**. Después lee las cuatro explicaciones: incluyen significados, usos y diferencias entre conceptos. No necesitas consultar teoría para aprovechar la corrección.\n\n' +
    (test.unit ? 'Las preguntas y opciones se barajan. Marca tus dudas y vuelve a intentarlo más tarde.\n\n' : '**Selección de repaso:** cinco preguntas de UT1 y quince de UT2, tomadas de los bloques anteriores. El progreso de este repaso se guarda por separado. No es una ponderación oficial de examen.\n\n');
  const questions = test.questions.map((question, index) => {
    const unit = question.unit ?? test.unit;
    const title = sectionMaps[unit]?.get(question.section);
    if (!title) throw new Error(`Referencia inexistente: UT${unit} §${question.section}`);
    const options = orderedOptions(question, index).map(option =>
      `- [${option.correct ? 'x' : ' '}] ${option.text}\n  > ${option.correct ? 'Correcta. ' : ''}${option.explanation}`).join('\n');
    // Ningún título da la respuesta; el número visible lo gestiona el plugin.
    return `<Quiz id="${question.id}">\n${question.prompt}\n\n${options}\n\n---\n\n**Para situarlo:** UT${unit} §${question.section} · ${title}. [Temario de consulta opcional](/temario/${sources[unit]}).\n</Quiz>`;
  }).join('\n\n');
  write(`${test.slug}.mdx`, header + intro + questions + '\n\n<QuizResults />\n');
}

const terms = new Map();
for (const group of groups) {
  for (const question of group.questions) {
    for (const term of question.terms) {
      if (!terms.has(term)) terms.set(term, []);
      terms.get(term).push({ slug: group.slug, id: question.id, unit: group.unit, section: question.section });
    }
  }
}
const rows = [...terms.entries()].sort(([a], [b]) => a.localeCompare(b, 'es')).map(([term, references]) => {
  const links = references.map((ref, i) => `[Práctica ${i + 1}](/${ref.slug}/#${ref.id})`).join(' · ');
  return `| ${term} | ${links} |`;
});
write('mapa-conceptos.mdx', `---\ntitle: Mapa de conceptos y siglas\ndescription: Localiza en qué preguntas se aprende cada término.\n---\n\nEste índice lleva directamente a las preguntas que trabajan cada concepto, en su enunciado o en las explicaciones de sus opciones. **No es un listado de respuestas**: resuelve y lee la corrección para aprender su significado y su uso.\n\nSe incluyen los conceptos centrales de ambas unidades y aclaraciones de siglas técnicas citadas en ellas. Los nombres comerciales se usan como ejemplos, no como materia para memorizar rankings.\n\n| Concepto o sigla | Dónde practicarlo |\n|---|---|\n${rows.join('\n')}\n`);
writeFileSync(new URL('public/cobertura.json', root), JSON.stringify({
  uniqueQuestions: groups.reduce((sum, group) => sum + group.questions.length, 0),
  tests: allTests.map(test => ({ route: `/${test.slug}/`, count: test.questions.length })),
  concepts: Object.fromEntries(terms),
}, null, 2) + '\n');
console.log(`Generados ${allTests.length} test, 180 preguntas originales y ${terms.size} términos indexados.`);
