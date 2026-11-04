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
├── examen-mixto.mdx       # 20 preguntas mixtas, dificultad normal
├── examen-mixto-dificil.mdx # 20 preguntas mixtas, mayor dificultad
├── ut02a/                 # sin-codigo.mdx y con-codigo.mdx, nivel normal
└── ut02b/                 # sin-codigo.mdx y con-codigo.mdx, nivel normal
```

`archivo/` conserva los once cuestionarios anteriores sin publicarlos. La selección activa contiene exactamente **seis cuestionarios y 120 preguntas**. Cada mixto tiene diez preguntas de A y diez de B; es una distribución de práctica, no una ponderación oficial. No se modificó la bóveda.

Cada carpeta de unidad se añade sola a la barra lateral; para una unidad nueva crea `src/content/docs/utXX/` y añade el grupo en `sidebar` de `astro.config.mjs`.

Convenciones: **cuatro opciones**, una sola `[x]`, un comentario `>` por opción, `id` estable y único, y una referencia final `Repasar` al apartado del temario. Los prefijos nuevos (`an`, `ac`, `bn`, `bc`, `mn`, `md`) evitan reutilizar las respuestas guardadas de preguntas anteriores. Con `showCorrect: true`, al corregir se muestran las explicaciones de las cuatro opciones; si se desactiva, solo se explica la elegida.

## Fuentes y criterio editorial

Se consultaron en `D:/obsidian/DAM2` los temarios `Fuentes/AD/temario/UT02-A-manejo-de-ficheros.md` y `UT02-B-librerias-xml-java.md`, el índice de AD, la nota del primer examen, el repaso esencial y las aclaraciones DOM pertinentes. Las referencias § corresponden a los encabezados numerados de las fuentes. Los escenarios son práctica elaborada, no preguntas oficiales.

Se conserva la exclusión de NIO que tenía el proyecto, aunque la nota del examen de la bóveda contempla ambos temas completos. JAXB usa la versión 2 (`javax.xml.bind`) con dependencias externas en Java 17+. Las precisiones añadidas al temario se identifican cuando procede.

Las preguntas priorizan objetivos concretos, distractores cercanos y condiciones explícitas. Una opción puede expresar algo cierto pero insuficiente para el problema. Se evita convertir sistemáticamente la correcta en la más larga; la auditoría informa del reparto de longitudes, sin tratar esa métrica como prueba de calidad semántica.

## Comprobaciones

- `npm run build`: compila las páginas MDX y genera el sitio.
- `npm run test:cuestionarios`: audita fuentes y HTML compilado (ejecutar después del build).
- `npm run test:trazas`: ejecuta una selección de trazas Java, sin dependencias externas JAXB.

Las comprobaciones automáticas no certifican la ausencia de ambigüedad semántica ni sustituyen la revisión pedagógica. Las pruebas Java verifican los casos indicados en su código; no ejecutan todos los fragmentos parciales de las preguntas ni los ejemplos JAXB.

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
