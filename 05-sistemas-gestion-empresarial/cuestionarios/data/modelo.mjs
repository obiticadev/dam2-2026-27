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
