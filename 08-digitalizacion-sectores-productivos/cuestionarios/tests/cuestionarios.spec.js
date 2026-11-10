import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync(new URL('../dist/quiz-manifest.json', import.meta.url), 'utf8')).quizzes;
const routes = [...new Set(manifest.map((question) => question.page))].sort();
test.use({ baseURL: 'http://127.0.0.1:4321', viewport: { width: 1440, height: 1000 } });

for (const route of routes) {
  test(`${route}: corregir, recargar, marcar, terminar y reiniciar`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('dialog', (dialog) => dialog.accept());
    await page.goto(route);
    const questions = manifest.filter((question) => question.page === route);
    for (const [index, question] of questions.entries()) {
      await page.evaluate((id) => { location.hash = id; }, question.id);
      const quiz = page.locator(`#${question.id}`);
      await expect(quiz).toBeVisible();
      await expect(page.locator('sl-quiz:visible')).toHaveCount(1);
      // Un fallo deliberado y catorce aciertos comprueban ambos tipos de corrección.
      const answer = quiz.locator(index === 0
        ? 'input[type=radio]:not([data-correct=true])' : 'input[data-correct=true]').first();
      await answer.check();
      await quiz.locator('.sl-quiz-submit').click();
      await expect(answer).toBeDisabled();
      await expect(quiz.locator('.sl-quiz-answer-feedback:visible')).toHaveCount(4);
      if (index === 0) {
        await page.locator('.sl-quiz-pager-flag').click();
        await page.reload();
        await expect(page.locator('.sl-quiz-pager-flag')).toHaveAttribute('aria-pressed', 'true');
        await expect(quiz.locator('.sl-quiz-answer-feedback:visible')).toHaveCount(4);
        // Regresión: las respuestas se restauraban, pero los contadores podían quedarse en cero.
        await expect(page.locator('.sl-quiz-nav-answered').first()).toHaveText('1');
      }
    }
    await page.evaluate(() => { location.hash = 'resultados'; });
    const complete = page.locator('.sl-quiz-results-complete');
    await expect(complete).toBeVisible();
    await expect(complete.locator('.sl-quiz-results-correct')).toHaveText('14');
    await page.reload();
    await expect(page.locator('.sl-quiz-nav-answered').first()).toHaveText('15');
    await expect(complete.locator('.sl-quiz-results-correct')).toHaveText('14');
    await complete.locator('.sl-quiz-results-reset').click();
    await expect(page.locator('sl-quiz:visible input[type=radio]').first()).toBeEnabled();
    await expect(page.locator('.sl-quiz-answer-feedback:visible')).toHaveCount(0);
    await expect(page.locator('.sl-quiz-nav-answered').first()).toHaveText('0');
    expect(errors).toEqual([]);
  });
}

test('portada y cuestionarios sin desbordamiento en móvil y escritorio', async ({ page }) => {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', ...routes]) {
      await page.goto(route);
      if (route !== '/') await expect(page.locator('sl-quiz:visible')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${route} a ${width}px`).toBe(true);
    }
  }
});

test('teclado: elegir no corrige hasta enviar', async ({ page }) => {
  await page.goto('/ut1/negocio/');
  const quiz = page.locator('sl-quiz:visible');
  const option = quiz.locator('input[type=radio]').first();
  await option.focus();
  await page.keyboard.press('Space');
  await expect(option).toBeChecked();
  await expect(option).toBeEnabled();
  await expect(quiz.locator('.sl-quiz-answer-feedback:visible')).toHaveCount(0);
  await quiz.locator('.sl-quiz-submit').focus();
  await page.keyboard.press('Enter');
  await expect(quiz.locator('.sl-quiz-answer-feedback:visible')).toHaveCount(4);
});
