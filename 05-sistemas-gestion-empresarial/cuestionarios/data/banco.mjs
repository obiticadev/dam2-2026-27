import empresa from './ut1-empresa.mjs';
import decisiones from './ut1-decisiones.mjs';
import erp from './ut2-erp.mjs';
import tecnologia from './ut2-tecnologia.mjs';
import comercio from './ut2-comercio.mjs';
import datos from './ut2-datos.mjs';
import analitica from './ut2-analitica.mjs';
import crm from './ut2-crm.mjs';
import vocabulario from './ut2-vocabulario.mjs';

export const groups = [empresa, decisiones, erp, tecnologia, comercio, datos, analitica, crm, vocabulario];
for (const group of groups) {
  for (const [index, question] of group.questions.entries()) {
    question.id = `sge-v1-${group.slug.replace('/', '-')}-${String(index + 1).padStart(2, '0')}`;
  }
}

// Selección fija y documentada: no se presenta como veinte preguntas originales.
// Usa ids distintos para no mezclar el progreso del repaso con el de cada bloque.
const selection = [[0, 14], [0, 18], [1, 6], [1, 14], [1, 18], [2, 4], [2, 5],
  [2, 8], [2, 13], [3, 3], [3, 7], [4, 0], [4, 8], [4, 13], [5, 8],
  [5, 16], [6, 4], [6, 18], [7, 12], [8, 1]];
export const mixed = {
  slug: 'repaso-mixto', title: 'Repaso mixto · UT1 y UT2', unit: null,
  description: '20 preguntas seleccionadas del banco: cinco de UT1 y quince de UT2.',
  questions: selection.map(([g, i], index) => ({ ...groups[g].questions[i],
    sourceId: groups[g].questions[i].id, unit: groups[g].unit,
    id: `sge-v1-mixto-${String(index + 1).padStart(2, '0')}`,
  })),
};
export const allTests = [...groups, mixed];
