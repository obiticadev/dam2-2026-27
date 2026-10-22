# Cuestionarios · Acceso a Datos

Sitio estático de cuestionarios de autoevaluación hecho con [Astro Starlight](https://starlight.astro.build/)
y una versión propia de [starlight-quiz](https://ewels.github.io/starlight-quiz) (ver más abajo).
Las respuestas, las marcas y el cronómetro se guardan en el `localStorage` del navegador de cada
alumno (no hay servidor ni base de datos).

## Comandos

| Comando           | Acción                                       |
| ----------------- | -------------------------------------------- |
| `npm install`     | Instala dependencias (Node 22.12 o superior) |
| `npm run dev`     | Servidor local en `http://localhost:4321`    |
| `npm run build`   | Genera el sitio estático en `dist/`          |
| `npm run preview` | Sirve `dist/` para comprobarlo               |

## Estructura

```
PLANTILLA.mdx              # Ejemplo de cada tipo de pregunta (copiar para crear nuevos; no se publica)
packages/starlight-quiz/   # Fork local del plugin de cuestionarios
src/content/docs/
├── index.mdx              # Portada
├── examen-mixto.mdx       # Simulacro de 40 preguntas (UT02-A + UT02-B)
├── ut02a/                 # Ficheros, sin NIO: a1…a5, un bloque por página
└── ut02b/                 # XML: b1…b5 (DOM, SAX, StAX, JAXB)
```

Cada carpeta de unidad se añade sola a la barra lateral; para una unidad nueva crea `src/content/docs/utXX/` y añade el grupo en `sidebar` de `astro.config.mjs`.

Convenciones de las preguntas: seis opciones, una sola `[x]`, un comentario `>` por opción, `id` estable y único (`a1-01`, `b4-07`, `mx-12`…) para no perder el progreso guardado, y al final una línea `Repasar: **Axx**` que remite al resumen de `../resumen`.

XML: todo documento con elementos anidados va en un bloque ```` ```xml ```` indentado, nunca en línea (también en las opciones, que necesitan un texto breve antes del bloque, p. ej. `- [ ] XML:`, para que el plugin las reconozca). Se entiende que el fichero **no** tiene espacios entre etiquetas; si la respuesta depende de los espacios, el enunciado dice que la indentación es real. Solo el contenido mixto (`<a>texto <b>x</b></a>`) se deja en una línea, porque indentarlo cambiaría el texto.

## Sintaxis rápida

```mdx
import { Quiz, QuizResults } from 'starlight-quiz/components';

<Quiz title="Título único">
Enunciado

- [x] Correcta        (una [x] = respuesta única; varias [x] = múltiple)
- [ ] Incorrecta
  > Comentario si se elige esta opción

Explicación que aparece al responder.

</Quiz>

<Quiz title="Hueco">Java usa la clase [[RandomAccessFile]].</Quiz>

<QuizResults />
```

Opciones globales en `quizDefaults` (`astro.config.mjs`): barajar respuestas, numerar preguntas, botón de enviar, etc.

## Plugin propio (`packages/starlight-quiz`)

Es una copia de starlight-quiz 1.0.2 desligada del original (`file:packages/starlight-quiz` en
`package.json`); los cambios se hacen ahí directamente. Respecto al original añade:

- **Paginación automática:** cualquier página con `<Quiz>` muestra una pregunta cada vez, con
  *Anterior / Siguiente* (también con las flechas ← →) y `<QuizResults />` como última página.
  La URL guarda la pregunta actual (`#a1-05`, `#resultados`), así que recargar vuelve a ella.
- **Navegador de preguntas:** cuadrícula numerada en la columna derecha (en móvil, desplegable en
  la barra superior) con colores de acierto/fallo, la pregunta actual y acceso a resultados.
- **Marcar para revisar:** botón *Marcar* bajo cada pregunta; se ve como una esquina naranja.
- **Preguntas barajadas** (`shuffleQuestions`): cada intento tiene su propio orden aleatorio, que se
  mantiene al recargar y cambia al reiniciar. La numeración sigue el orden mostrado.
- **Cronómetro:** arranca al elegir la primera respuesta (sea cuál sea la pregunta), cuenta solo
  con la página visible, se detiene al responder todo y aparece en los resultados. *Reiniciar
  intento* borra respuestas, marcas y tiempo, vuelve a barajar y el cronómetro espera de nuevo.
- **Diseño más compacto:** el CSS del plugin se ordena después de las capas de Starlight, que
  antes le añadían 1rem extra entre opciones.

## Despliegue en Cloudflare Pages

1. Sube esta carpeta a un repositorio de GitHub.
2. Cloudflare → *Workers & Pages* → *Create* → *Pages* → *Connect to Git*.
3. Configuración de compilación:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** la ruta de esta carpeta dentro del repositorio, si no está en la raíz
   - Variable de entorno `NODE_VERSION` = `22`
4. Cada `git push` vuelve a publicar el sitio.

Alternativa sin Git: `npm run build` y `npx wrangler pages deploy dist`.
