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
				{ label: 'Cuestionario completo · 18 preguntas', slug: 'index' },
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
