# Cuestionarios · Inglés Profesional

Réplica independiente del proyecto de Acceso a Datos: Astro Starlight y su fork local de `starlight-quiz`. **9 cuestionarios, 15 preguntas cada uno: 135 preguntas originales, 540 opciones explicadas y 9 lecturas originales.** Nivel medio orientativo (B1), no certificación de nivel.

## Ejecutar

Node 22.12 o superior (construcción comprobada con Node 25).

```bash
npm ci
npm run dev
```

Abre `http://localhost:4327`. Se usa otro puerto para no interferir con Acceso a Datos.

```bash
npm test
npm run preview
```

`npm test` compila y audita fuentes, opciones, explicaciones, lecturas, enlaces y HTML generado. No sustituye la revisión lingüística ni una prueba de interacción en navegador.

Comprobación realizada el 6 de noviembre de 2026: `npm test` correcto; prueba adicional con Chrome headless en las nueve páginas (acierto y fallo, cuatro explicaciones, navegación, marcas y persistencia tras recargar). También se comprobó Reading a 390 px sin desbordamiento horizontal, el contador restaurado, un intento completo de 15/15, los resultados y el reinicio, sin errores JavaScript detectados. Esta prueba de humo no equivale a probar todas las respuestas en todos los dispositivos. La compilación muestra avisos no bloqueantes de Starlight por la colección opcional i18n vacía y la ausencia de una página 404 personalizada; se genera su 404 predeterminada.

## Contenido y mantenimiento

| Grupo | Vocabulary | Grammar | Reading |
| --- | --- | --- | --- |
| Examen 1 | Rutinas, frecuencia, presente | Present simple y continuous | Trabajo y rutinas con excepciones |
| Examen 2 | Duración, experiencia y marcadores | Present perfect y perfect continuous; contraste past simple | Progreso, hábitos y procesos |
| Global | Combinación de los dos | Los cuatro tiempos mezclados | Integración de hábitos y trayectoria |

- `src/content/docs/index.mdx`: portada y acceso a los nueve cuestionarios.
- `src/content/docs/guia-estudio.mdx`: alcance y guía autocontenida en castellano, con ejemplos traducidos.
- `contenido/{gramatica,vocabulario,reading}.mjs`: banco editable, con explicaciones individuales para todas las opciones.
- `contenido/bancos.mjs`: agrupación y referencias de repaso.
- `scripts/generar-cuestionarios.mjs`: `npm run generate` regenera **solo las nueve páginas de cuestionarios**. No editar manualmente esas páginas: los cambios se perderían al regenerarlas.
- `packages/starlight-quiz/`: copia del motor de AD con paginación, marcas, navegación, orden aleatorio, resultados y cronómetro. Se conserva su licencia. Prefijos locales `ing-quiz*` separan el almacenamiento del de AD. El navegador de preguntas también escucha el registro del progreso para restaurar correctamente sus contadores al recargar.

Las preguntas y respuestas se barajan por intento; **no se generan preguntas nuevas al reiniciar**. El global tiene su propio banco, sin repetir las preguntas de cada examen. Cada pregunta de Reading incluye su texto completo para no perder contexto al barajar o navegar. Se consultan las cuatro explicaciones al corregir, con indicadores textuales y colores de acierto/fallo.

El progreso solo vive en el `localStorage` del navegador. No hay backend, cuenta ni sincronización entre equipos. Cambiar de dominio, navegador o puerto cambia el almacenamiento disponible. No se importan respuestas de AD.

## Fuentes y alcance

Se leyeron las notas de alcance y los dos cuadernos de estudio de `D:/obsidian/DAM2/Exámenes/ING`, las cuatro notas de tiempos verbales, Daily routines, Time expressions y Ejercicios de reading de `Asignaturas/ING - Inglés Profesional/UT01`. La guía incluye las rutas de procedencia.

La gramática sigue ese alcance. El vocabulario figura en la bóveda como selección de apoyo, no como lista oficial del profesor. Los nueve textos son originales y se inspiran en sus habilidades y contextos, sin afirmar que pertenezcan al examen real. La exposición de Halloween del examen 2 se documenta como pendiente de práctica oral fuera de estos test. No se modificó la bóveda ni el proyecto de AD.

## Cloudflare Pages

URL pública configurada: **https://cuestionarios-ingles.pages.dev**.

Para conectar el repositorio a Pages:

| Ajuste | Valor |
| --- | --- |
| Nombre del proyecto | `cuestionarios-ingles` |
| Framework | Astro |
| Root directory | `07-ingles-profesional/cuestionarios` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Variable `NODE_VERSION` | `22` |

La ruta raíz supone que conectas el repositorio `dam2-2026-27`; si subes solo esta carpeta, deja Root directory vacía. Las páginas son estáticas: no necesitan adaptador ni credenciales. Se incluye el paquete local en `packages/` y el lockfile para instalarlo en Cloudflare. No subas `node_modules`, `.astro` ni `dist` a Git.

### Compilar solo cuando cambie este proyecto

En el proyecto `cuestionarios-ingles`, abre **Settings → Build → Build watch paths**:

- **Include paths:** elimina el `*` predeterminado y deja únicamente `07-ingles-profesional/cuestionarios/*`.
- **Exclude paths:** vacío.

Estas rutas son relativas a la raíz del repositorio, no al Root directory del build. En Cloudflare, el `*` final también incluye los archivos de todas las subcarpetas. Configurar solo Root directory no limita qué cambios disparan compilaciones: también hay que aplicar este filtro en el panel. No se configura automáticamente desde `astro.config.mjs`.

Resultado: los cambios dentro de este proyecto disparan el build; los cambios únicamente en AD u otras asignaturas lo omiten. Excepciones de Cloudflare: los eventos sin archivos cambiados, con 3000 o más archivos o con 20 o más commits pueden compilar sin aplicar el filtro.

Referencia: [Build watch paths de Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/build-watch-paths/).

Alternativa por terminal, después de crear el proyecto en tu cuenta:

```bash
npm run build
npx wrangler pages deploy dist --project-name cuestionarios-ingles
```

No se ha publicado ni configurado la cuenta de Cloudflare desde este proyecto. `site` establece canónicas y metadatos; no crea ni reserva el dominio de Pages.
