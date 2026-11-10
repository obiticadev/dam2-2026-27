// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// Fork local en packages/starlight-quiz: paginación, navegador, marcas y cronómetro
import starlightQuiz from 'starlight-quiz';

// https://astro.build/config
export default defineConfig({
	// URL pública en Cloudflare Pages: canónicas, Open Graph y sitemap
	site: 'https://cuestionarios-sge.pages.dev',
	integrations: [
		starlight({
			title: 'Cuestionarios · SGE',
			// Sitio en español sin prefijo /es/ en las URL
			locales: {
				root: { label: 'Español', lang: 'es' },
			},
			sidebar: [
				{ label: 'Inicio', slug: 'index' },
				{
					label: 'UT1 · La empresa',
					items: [{ autogenerate: { directory: 'ut1' } }],
				},
				{
					label: 'UT2 · Sistemas de gestión',
					items: [{ autogenerate: { directory: 'ut2' } }],
				},
				{
					label: 'Repaso',
					items: [
						{ label: 'Mixto · UT1 y UT2', slug: 'repaso-mixto' },
						{ label: 'Conceptos y siglas', slug: 'mapa-conceptos' },
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
