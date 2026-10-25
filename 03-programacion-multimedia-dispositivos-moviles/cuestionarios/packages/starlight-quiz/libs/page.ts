/**
 * Whether the page being rendered contains `<Quiz>` components, read from the
 * raw MDX body Starlight exposes on `Astro.locals.starlightRoute`. Quiz pages
 * swap the table of contents for the question navigator and become paginated.
 */
export function isQuizPage(locals: unknown): boolean {
  const route = (locals as { starlightRoute?: { entry?: { body?: unknown } } } | null)?.starlightRoute;
  const body = route?.entry?.body;
  return typeof body === 'string' && /<Quiz[\s>/]/.test(body);
}
