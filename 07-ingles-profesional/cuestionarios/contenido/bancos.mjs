import { grammar1, grammar2, grammarGlobal } from './gramatica.mjs';
import { vocabulary1, vocabulary2, vocabularyGlobal } from './vocabulario.mjs';
import { reading1, reading2, readingGlobal } from './reading.mjs';

const groups = [
  {
    group: 'examen-1', prefix: 'e1',
    scope: 'Examen 1: present simple y present continuous. Frecuencia, rutinas y situaciones actuales. Vocabulario seleccionado como apoyo en la bóveda; Reading es práctica añadida, no una lectura oficial asignada al examen.',
    questions: [vocabulary1, grammar1, reading1],
    descriptions: [
      'Rutinas, colocaciones, frecuencia y expresiones de presente en contexto.',
      'Hábito frente a acción actual, formas, preguntas, ortografía y planes organizados.',
      'Tres lecturas sobre trabajo, desplazamientos y rutinas; detalles, referencias e inferencias.',
    ],
  },
  {
    group: 'examen-2', prefix: 'e2',
    scope: 'Examen 2: present perfect y present perfect continuous; past simple solo como contraste. Vocabulario seleccionado como apoyo y lecturas originales. La exposición de Halloween figura en la bóveda, pero no se evalúa con estos test escritos.',
    questions: [vocabulary2, grammar2, reading2],
    descriptions: [
      'For, since, just, already, yet, ever, never, lately y marcadores temporales.',
      'Resultado frente a actividad, participios, duración, estados y contraste con pasado terminado.',
      'Tres lecturas sobre avances, cambios de hábitos y aprendizaje; resultados y procesos.',
    ],
  },
  {
    group: 'global', prefix: 'gl',
    scope: 'Repaso de los dos exámenes: los cuatro tiempos del presente, vocabulario combinado y lectura integrada. Son preguntas nuevas, no una copia de las páginas por examen; el reparto es pedagógico, no una ponderación oficial.',
    questions: [vocabularyGlobal, grammarGlobal, readingGlobal],
    descriptions: [
      'Frecuencia, duración, rutinas, experiencias y expresiones temporales de ambos exámenes.',
      'Los cuatro tiempos mezclados: elegir por significado y contexto, no solo por una palabra pista.',
      'Tres lecturas integradas: prácticas profesionales, un club de lectura y un proyecto vecinal.',
    ],
  },
];

export const banks = groups.flatMap(g => ['vocabulary', 'grammar', 'reading'].map((skill, i) => {
  const section = { vocabulary: 'vocabulario', grammar: 'gramática', reading: 'reading' }[skill];
  const anchor = `${g.group}-${section}`;
  const label = { vocabulary: 'Vocabulary', grammar: 'Grammar', reading: 'Reading' }[skill];
  return {
    group: g.group, prefix: `${g.prefix}-${skill[0]}`, skill, label,
    order: i + 1, scope: g.scope, description: g.descriptions[i],
    questions: g.questions[i].map(q => ({ ...q, anchor, topic: `${g.group === 'global' ? 'Global' : g.group === 'examen-1' ? 'Examen 1' : 'Examen 2'} · ${label}` })),
  };
}));
