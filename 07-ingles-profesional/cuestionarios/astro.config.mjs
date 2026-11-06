// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightQuiz from 'starlight-quiz';

export default defineConfig({
  site: 'https://cuestionarios-ingles.pages.dev',
  integrations: [
    starlight({
      title: 'Cuestionarios · Inglés Profesional',
      locales: { root: { label: 'Español', lang: 'es' } },
      sidebar: [
        { label: 'Inicio', slug: 'index' },
        { label: 'Guía de estudio y alcance', slug: 'guia-estudio' },
        ...[
          ['Examen 1 · Simple y continuous', 'examen-1'],
          ['Examen 2 · Perfect y perfect continuous', 'examen-2'],
          ['Global · Los dos exámenes', 'global'],
        ].map(([label, directory]) => ({ label, items: [{ autogenerate: { directory } }] })),
      ],
      plugins: [starlightQuiz({ quizDefaults: {
        shuffle: true,
        shuffleQuestions: true,
        autoNumber: true,
        autoSubmit: false,
        showCorrect: true,
        disableAfterSubmit: true,
      } })],
    }),
  ],
});
