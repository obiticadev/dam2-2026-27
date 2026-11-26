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
PLANTILLA.mdx                # Ejemplo de cada tipo de pregunta (copiar para crear nuevos; no se publica)
packages/starlight-quiz/     # Fork local del plugin de cuestionarios
src/content/docs/
├── index.mdx                # Portada con los tres bloques
├── tema-2/                  # Ficheros y XML
│   ├── ut02a/  ut02b/       # sin-codigo.mdx y con-codigo.mdx, nivel normal
│   └── mixto.mdx  mixto-dificil.mdx
├── tema-3/                  # JDBC y SQLite
│   ├── 3a/  3b/             # sin-codigo.mdx y con-codigo.mdx (normal) y casos-sin-codigo.mdx y casos-con-codigo.mdx (casos reales)
│   └── mixto.mdx  mixto-dificil.mdx  casos-mixto.mdx  casos-mixto-dificil.mdx  examen-oficial.mdx
└── tema-4/                  # Hibernate y HQL
    ├── orm/  hql/           # 4A–4B y 4C: sin-codigo.mdx y con-codigo.mdx
    └── mixto.mdx  mixto-dificil.mdx
```

`archivo/` conserva los once cuestionarios antiguos del tema 2 sin publicarlos. La selección activa contiene **24 cuestionarios de práctica (480 preguntas)** y el **examen oficial del Tema 3 (20 preguntas, prefijo `t3eo`)**. El examen se transcribió de la grabación del 25/11/2026; las soluciones son razonadas, ya que el Aula Virtual no muestra la corrección de ese intento. Cada mixto tiene diez preguntas de cada mitad del tema (A/B, 3A/3B, 4A–4B/4C); es una distribución de práctica, no una ponderación oficial.

La barra lateral agrupa cada tema en un bloque (`sidebar` de `astro.config.mjs`). Para un tema nuevo: crear `src/content/docs/tema-N/` con sus subcarpetas, añadir el bloque en `sidebar`, la tarjeta en la portada y sus rutas en `scripts/verificar-cuestionarios.mjs`.

Convenciones: **cada enunciado incluye los datos que necesita** (las preguntas se muestran de una en una y la introducción no se ve), **cuatro opciones**, una sola `[x]`, un comentario `>` por opción, `id` estable y único, y una referencia final `Repasar` al apartado del temario. Prefijos: tema 2 `an`, `ac`, `bn`, `bc`, `mn`, `md`; tema 3 `t3an`, `t3ac`, `t3bn`, `t3bc`, `t3mn`, `t3md` y, en los casos reales, `t3arn`, `t3arc`, `t3brn`, `t3brc`, `t3rmn`, `t3rmd`; tema 4 `t4on`, `t4oc`, `t4hn`, `t4hc`, `t4mn`, `t4md`. Las preguntas de «todas / ninguna son correctas» se escriben con afirmaciones **I/II/III** en el enunciado y opciones como «Solo I y III» o «Ninguna», porque las opciones se barajan y «todas las anteriores» perdería sentido. Con `showCorrect: true`, al corregir se muestran las explicaciones de las cuatro opciones.

Mover el tema 2 a `tema-2/` cambió sus URL: el progreso guardado en el navegador para esas páginas empieza de cero.

Las explicaciones aparecen dentro de cada opción, sin repetir las respuestas en cajas separadas. Al corregir, la correcta se marca en verde, solo una elección incorrecta se marca en rojo y las demás quedan en gris. Un indicador textual con ✓/✕ complementa el color; el resultado también se anuncia mediante una región accesible. Reiniciar oculta explicaciones y restaura los colores iniciales.

## Fuentes y criterio editorial

**Temas 3 y 4.** Parten de los documentos 3A–3B y 4A–4C de la entrega final (en la bóveda, `Fuentes/AD/Temas 3 y 4/`) y de sus ejercicios. Las preguntas con código se comprobaron en ejecución el 2026-11-20 (y las de casos reales del tema 3, el 2026-11-23): el SQL con `sqlite3` 3.54, el JDBC con `sqlite-jdbc` 3.51.0.0 y H2 1.4.200 (en modo MySQL para lo que depende de un servidor estricto) y el código Hibernate con Hibernate 5.4.33 y H2. Los procedimientos almacenados de MySQL no se ejecutaron por falta de servidor.

**Tema 2.** Se consultaron en `D:/obsidian/DAM2` los temarios `Fuentes/AD/temario/UT02-A-manejo-de-ficheros.md` y `UT02-B-librerias-xml-java.md`, el índice de AD, la nota del primer examen, el repaso esencial y las aclaraciones DOM pertinentes. Las referencias § corresponden a los encabezados numerados de las fuentes. Los escenarios son práctica elaborada, no preguntas oficiales.

Se conserva la exclusión de NIO que tenía el proyecto, aunque la nota del examen de la bóveda contempla ambos temas completos. JAXB usa la versión 2 (`javax.xml.bind`) con dependencias externas en Java 17+. Las precisiones añadidas al temario se identifican cuando procede.

Las preguntas priorizan objetivos concretos, distractores cercanos y condiciones explícitas. Una opción puede expresar algo cierto pero insuficiente para el problema. Se evita convertir sistemáticamente la correcta en la más larga; la auditoría informa del reparto de longitudes, sin tratar esa métrica como prueba de calidad semántica.

## Comprobaciones

- `npm run build`: compila las páginas MDX y genera el sitio.
- `npm run test:cuestionarios`: audita fuentes y HTML compilado (ejecutar después del build).
- `npm run test:trazas`: ejecuta una selección de trazas Java, sin dependencias externas JAXB.

Las comprobaciones automáticas no certifican la ausencia de ambigüedad semántica ni sustituyen la revisión pedagógica. Las pruebas Java verifican los casos indicados en su código; no ejecutan todos los fragmentos parciales de las preguntas ni los ejemplos JAXB.

XML: toda estructura se presenta en un bloque ```` ```xml ```` con formato de árbol y sangría, nunca como XML en línea. Cada elemento anidado o hermano ocupa su propia línea; las hojas pueden mostrar su texto entre apertura y cierre en la misma línea. También se aplica a las opciones, que necesitan un texto breve antes del bloque, p. ej. `- [ ] XML:`, para que el plugin las reconozca. Se entiende que el fichero **no** tiene espacios entre etiquetas; si la respuesta depende de los espacios, el enunciado dice que la indentación es real. En contenido mixto se mantiene el árbol y se especifican los nodos de texto exactos para distinguirlos de los saltos y la sangría de presentación. La auditoría impide volver a compactar estructuras anidadas o incluir XML entre backticks en línea en los cuestionarios activos.

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
