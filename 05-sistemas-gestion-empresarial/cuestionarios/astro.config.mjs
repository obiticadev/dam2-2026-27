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
					// Tests por temas: una correcta, cuatro opciones y nivel introductorio
					label: 'Práctica por temas',
					items: [
						{ label: 'UT1 · La empresa', items: [{ autogenerate: { directory: 'ut1' } }] },
						{ label: 'UT2 · Sistemas de gestión', items: [{ autogenerate: { directory: 'ut2' } }] },
						{ label: 'Repaso mixto · UT1 y UT2', slug: 'repaso-mixto' },
						{ label: 'Conceptos y siglas', slug: 'mapa-conceptos' },
					],
				},
				{
					// Patrón del cuestionario de Moodle: verdadera/falsa, «Todas las otras…», respuesta múltiple
					label: 'Estilo examen',
					badge: { text: 'Moodle', variant: 'tip' },
					items: [
						{ label: 'Nivel fácil', items: [
							{ label: 'Fácil · Test 1', slug: 'examen/facil-1' },
							{ label: 'Fácil · Test 2', slug: 'examen/facil-2' },
						] },
						{ label: 'Nivel medio', items: [
							{ label: 'Media · Test 1', slug: 'examen/media-1' },
							{ label: 'Media · Test 2', slug: 'examen/media-2' },
						] },
						{ label: 'Nivel difícil', items: [
							{ label: 'Difícil · Test 1', slug: 'examen/dificil-1' },
							{ label: 'Difícil · Test 2', slug: 'examen/dificil-2' },
						] },
						{ label: 'Mixtos · todos los niveles', items: [
							{ label: 'Mixto · Test 1', slug: 'examen/mixto-1' },
							{ label: 'Mixto · Test 2', slug: 'examen/mixto-2' },
						] },
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
