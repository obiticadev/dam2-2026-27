# Cuestionarios · Programación Multimedia y Dispositivos Móviles

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
├── examen-mixto.mdx       # Simulacro de 40 preguntas (Tema 1 + Tema 2)
├── t1/                    # Tema 1, tecnologías móviles: m1…m5, un bloque por página
└── t2/                    # Tema 2, Android Studio: s1…s5 (proyecto, Java/XML, compilación, estados, ciclo de vida)
```

Cada carpeta de unidad se añade sola a la barra lateral; para un tema nuevo crea `src/content/docs/tX/` y añade el grupo en `sidebar` de `astro.config.mjs`.

Convenciones de las preguntas: cuatro opciones, una sola `[x]`, un comentario `>` por opción, `id` estable y único (`m1-01`, `s4-07`, `mx-12`…) para no perder el progreso guardado, y al final una línea `Repasar: **Mxx**` o `**Sxx**` que remite al resumen de `../resumen` (M = Tema 1, S = Tema 2).

Código: los fragmentos Java y XML van en bloques ```` ```java ```` o ```` ```xml ````. En el texto de MDX, cualquier nombre con `<`, `>` o llaves (`<TextView>`, `{}`) va entre comillas invertidas; fuera de ellas MDX lo interpreta como JSX y la compilación falla. Las trazas del ciclo de vida fijan siempre el escenario completo (qué actividad está en primer plano, si la nueva cubre la pantalla y qué hace el usuario).

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

<Quiz title="Hueco">El método que enlaza la actividad con su layout es [[setContentView]].</Quiz>

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
