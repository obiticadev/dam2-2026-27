# Cuestionarios · Acceso a Datos

Sitio estático de cuestionarios de autoevaluación hecho con [Astro Starlight](https://starlight.astro.build/)
y [starlight-quiz](https://ewels.github.io/starlight-quiz). Las respuestas se guardan en el
`localStorage` del navegador de cada alumno (no hay servidor ni base de datos).

## Comandos

| Comando           | Acción                                       |
| ----------------- | -------------------------------------------- |
| `npm install`     | Instala dependencias (Node 22.12 o superior) |
| `npm run dev`     | Servidor local en `http://localhost:4321`    |
| `npm run build`   | Genera el sitio estático en `dist/`          |
| `npm run preview` | Sirve `dist/` para comprobarlo               |

## Estructura

```
src/content/docs/
├── index.mdx              # Portada
├── examen-mixto.mdx       # Simulacro de 40 preguntas (UT02-A + UT02-B)
├── plantilla.mdx          # Ejemplo de cada tipo de pregunta (copiar para crear nuevos)
├── ut02a/                 # Ficheros, sin NIO: a1…a5, un bloque por página
└── ut02b/                 # XML: b1…b5 (DOM, SAX, StAX, JAXB)
```

Cada carpeta de unidad se añade sola a la barra lateral; para una unidad nueva crea `src/content/docs/utXX/` y añade el grupo en `sidebar` de `astro.config.mjs`.

Convenciones de las preguntas: seis opciones, una sola `[x]`, un comentario `>` por opción, `id` estable y único (`a1-01`, `b4-07`, `mx-12`…) para no perder el progreso guardado, y al final una línea `Repasar: **Axx**` que remite al resumen de `../resumen`.

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
