// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightQuiz from 'starlight-quiz';

export default defineConfig({
	site: 'https://cuestionarios-master.pages.dev',
	integrations: [
		starlight({
			title: 'Cuestionarios · Tecnología educativa',
			locales: {
				root: { label: 'Español', lang: 'es' },
			},
			sidebar: [
				{ label: 'Inicio', slug: 'index' },
				{ label: 'Integración de la tecnología', slug: 'integracion-tecnologia' },
				{ label: 'Dispositivos y pizarras digitales', slug: 'dispositivos-digitales' },
				{ label: 'IA en la educación', slug: 'ia-educacion' },
				{ label: 'Recursos, redes y licencias', slug: 'recursos-redes-licencias' },
			],
			plugins: [
				starlightQuiz({
					quizDefaults: {
						shuffle: true,
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
