// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// Fork local en packages/starlight-quiz: paginación, navegador, marcas y cronómetro
import starlightQuiz from 'starlight-quiz';

// https://astro.build/config
export default defineConfig({
	// URL pública en Cloudflare Pages: canónicas, Open Graph y sitemap
	site: 'https://cuestionarios-ad-2.pages.dev',
	integrations: [
		starlight({
			title: 'Cuestionarios · Acceso a Datos',
			// Sitio en español sin prefijo /es/ en las URL
			locales: {
				root: { label: 'Español', lang: 'es' },
			},
			// Un bloque por tema: subtemas (sin código / con código) y sus mixtos
			sidebar: [
				{ label: 'Inicio', slug: 'index' },
				{
					label: 'Tema 2 · Ficheros y XML',
					items: [
						{ label: 'UT02-A · Ficheros (sin NIO)', items: [{ autogenerate: { directory: 'tema-2/ut02a' } }] },
						{ label: 'UT02-B · XML', items: [{ autogenerate: { directory: 'tema-2/ut02b' } }] },
						{
							label: 'Mixtos · 20 preguntas',
							items: [
								{ label: 'Normal', slug: 'tema-2/mixto' },
								{ label: 'Más difícil', slug: 'tema-2/mixto-dificil' },
							],
						},
					],
				},
				{
					label: 'Tema 3 · JDBC y SQLite',
					items: [
						{ label: '3A · Conectores JDBC', items: [{ autogenerate: { directory: 'tema-3/3a' } }] },
						{ label: '3B · SQLite', items: [{ autogenerate: { directory: 'tema-3/3b' } }] },
						{
							label: 'Mixtos · 20 preguntas',
							items: [
								{ label: 'Normal', slug: 'tema-3/mixto' },
								{ label: 'Más difícil', slug: 'tema-3/mixto-dificil' },
								{ label: 'Casos reales · Normal', slug: 'tema-3/casos-mixto' },
								{ label: 'Casos reales · Más difícil', slug: 'tema-3/casos-mixto-dificil' },
							],
						},
					],
				},
				{
					label: 'Tema 4 · Hibernate y HQL',
					items: [
						{ label: '4A–4B · ORM e Hibernate', items: [{ autogenerate: { directory: 'tema-4/orm' } }] },
						{ label: '4C · HQL y consultas', items: [{ autogenerate: { directory: 'tema-4/hql' } }] },
						{
							label: 'Mixtos · 20 preguntas',
							items: [
								{ label: 'Normal', slug: 'tema-4/mixto' },
								{ label: 'Más difícil', slug: 'tema-4/mixto-dificil' },
							],
						},
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
