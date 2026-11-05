// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// Fork local en packages/starlight-quiz: paginación, navegador, marcas y cronómetro
import starlightQuiz from 'starlight-quiz';

// https://astro.build/config
export default defineConfig({
	// Configurar SITE_URL cuando se conozca el dominio de despliegue.
	site: process.env.SITE_URL || undefined,
	integrations: [
		starlight({
			title: 'Cuestionarios · Python · Examen 2',
			// Sitio en español sin prefijo /es/ en las URL
			locales: {
				root: { label: 'Español', lang: 'es' },
			},
			sidebar: [
				{ label: 'Inicio', slug: 'index' },
				{
					label: 'UT03 · Simulacros de 20 preguntas',
					items: [
						{ label: '1 · Salidas y fundamentos', slug: 'py-examen-2/simulacro-1' },
						{ label: '2 · Errores y casos límite', slug: 'py-examen-2/simulacro-2' },
						{ label: '3 · Variantes y práctica RA3', slug: 'py-examen-2/simulacro-3' },
					],
				},
			],
			plugins: [
				starlightQuiz({
					// Valores por defecto para todos los <Quiz>; cada pregunta puede sobrescribirlos
					quizDefaults: {
						shuffle: true,
						// Orden aleatorio de las preguntas en cada intento (se mantiene al recargar)
						shuffleQuestions: true,
						autoNumber: true,
						autoSubmit: false,
						showCorrect: true,
						disableAfterSubmit: true,
					},
				}),
			],
		}),
	],
});
