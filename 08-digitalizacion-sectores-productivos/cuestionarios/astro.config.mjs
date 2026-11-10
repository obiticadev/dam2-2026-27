// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// Fork local en packages/starlight-quiz: paginación, navegador, marcas y cronómetro
import starlightQuiz from 'starlight-quiz';

// https://astro.build/config
export default defineConfig({
	// URL pública en Cloudflare Pages: canónicas, Open Graph y sitemap
	site: 'https://cuestionarios-digitalizacion.pages.dev',
	integrations: [
		starlight({
			title: 'Cuestionarios · Digitalización',
			// Sitio en español sin prefijo /es/ en las URL
			locales: {
				root: { label: 'Español', lang: 'es' },
			},
			sidebar: [
				{ label: 'Inicio', slug: 'index' },
				{
					label: 'UT1 · Digitalización e IT-OT',
					items: [{ autogenerate: { directory: 'ut1' } }],
				},
				{
					label: 'UT2 · Tecnologías habilitadoras',
					items: [{ autogenerate: { directory: 'ut2' } }],
				},
				{
					label: 'UT3 · Nube y sistemas conectados',
					items: [{ autogenerate: { directory: 'ut3' } }],
				},
				{
					label: 'Repaso mixto · 15 preguntas',
					items: [
						{ label: 'Mixto A · Integración', slug: 'mixtos/integracion' },
						{ label: 'Mixto B · Decisiones', slug: 'mixtos/decisiones' },
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
