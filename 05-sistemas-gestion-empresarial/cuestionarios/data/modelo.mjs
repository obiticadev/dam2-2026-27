// Cada opción contiene su propia explicación. La correcta se coloca primero
// SOLO en los datos; el generador reparte posiciones y el navegador las baraja.
export function q(section, terms, prompt, ...pairs) {
  if (pairs.length !== 4) throw new Error(`Se necesitan cuatro opciones: ${prompt}`);
  return {
    section, terms: terms.split(',').map(t => t.trim()), prompt,
    options: pairs.map((pair, index) => {
      const [text, explanation, ...rest] = pair.split(' :: ');
      if (!text || !explanation || rest.length) throw new Error(`Opción inválida: ${pair}`);
      return { text, explanation, correct: index === 0 };
    }),
  };
}

// Variante para los bloques de estilo examen: mezcla UT1 y UT2 y admite
// preguntas de respuesta múltiple. Las `correctas` primeras opciones son válidas.
export function qx(unit, section, terms, prompt, correctas, ...pairs) {
  const question = q(section, terms, prompt, ...pairs);
  question.options.forEach((option, index) => { option.correct = index < correctas; });
  return Object.assign(question, { unit, multiple: correctas > 1 });
}
