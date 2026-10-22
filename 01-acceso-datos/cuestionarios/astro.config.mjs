// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightQuiz from 'starlight-quiz';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Cuestionarios · Acceso a Datos',
			// Sitio en español sin prefijo /es/ en las URL
			locales: {
				root: { label: 'Español', lang: 'es' },
			},
			sidebar: [
				{ label: 'Inicio', slug: 'index' },
				{
					label: 'UT02-A · Ficheros (sin NIO)',
					items: [{ autogenerate: { directory: 'ut02a' } }],
				},
				{
					label: 'UT02-B · XML',
					items: [{ autogenerate: { directory: 'ut02b' } }],
				},
				{ label: 'Examen mixto', slug: 'examen-mixto' },
				{ label: 'Plantilla de preguntas', slug: 'plantilla' },
			],
			plugins: [
				starlightQuiz({
					// Valores por defecto para todos los <Quiz>; cada pregunta puede sobrescribirlos
					quizDefaults: {
						shuffle: true,
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
