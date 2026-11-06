import { mkdirSync, writeFileSync } from 'node:fs';
import { banks } from '../contenido/bancos.mjs';

// Los MDX son reproducibles. Editar contenido/bancos.mjs, no las páginas generadas.
for (const bank of banks) {
  const dir = new URL(`../src/content/docs/${bank.group}/`, import.meta.url);
  mkdirSync(dir, { recursive: true });
  const questions = bank.questions.map((q, i) => {
    const id = `ing-${bank.prefix}-${String(i + 1).padStart(2, '0')}`;
    const options = q.options.map(([text, feedback], index) => ({ text, feedback, correct: index === 0 }));
    // Reparte también la posición original; el navegador las vuelve a barajar.
    const rotated = options.slice(i % 4).concat(options.slice(0, i % 4));
    const passage = q.passage ? `**Reading · ${q.passage.title}** (texto original de práctica)\n\n${q.passage.text.split('\n\n').map(p => `> ${p}`).join('\n>\n')}\n\n` : '';
    return `<Quiz id="${id}" title="${q.title}">\n${passage}${q.prompt}\n\n${rotated.map(o => `- [${o.correct ? 'x' : ' '}] ${o.text}\n  > ${o.correct ? 'Correcta: ' : ''}${o.feedback}`).join('\n')}\n\nRepasar: [${q.topic}](/guia-estudio/#${q.anchor}).\n</Quiz>`;
  }).join('\n\n');
  writeFileSync(new URL(`${bank.skill}.mdx`, dir), `---\ntitle: "${bank.label}"\ndescription: "${bank.description}"\nsidebar:\n  order: ${bank.order}\n---\n\nimport { Quiz, QuizResults } from 'starlight-quiz/components';\n\n**15 preguntas · nivel medio · cuatro opciones · una correcta.** ${bank.description}\n\n${bank.scope}\n\n[Consultar la guía antes de empezar](/guia-estudio/) o resolver primero y repasar después de corregir. En Reading, cada pregunta conserva su texto para poder barajarlas sin perder contexto.\n\n${questions}\n\n<QuizResults />\n`);
}
console.log(`Generados ${banks.length} cuestionarios y ${banks.reduce((n, b) => n + b.questions.length, 0)} preguntas.`);
