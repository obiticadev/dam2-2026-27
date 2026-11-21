# Cuestionarios · Tecnología educativa

Copia adaptada del proyecto de `01-acceso-datos/cuestionarios`, con el mismo
Astro Starlight y su plugin local `packages/starlight-quiz`.
El proyecto original no se modifica.

Contiene las **31 preguntas de `PREGUNTAS EXAMEN T4.pdf`**, localizado en
`/home/oliwheel/Downloads/` (5 páginas). Las 18 preguntas iniciales procedentes
de cuatro imágenes se conservan sin cambios; se añaden las 13 restantes.
Cada pregunta tiene cuatro opciones y una sola solución marcada por la fuente.
Las claves se contrastaron con las opciones en rojo y negrita del PDF,
extrayendo tanto el texto como su color, sin inferir las respuestas.
Se conservan las referencias a páginas y diapositivas del temario.

Las 31 preguntas se presentan **en un único cuestionario en la página principal**,
sin dividirlas por imágenes o temas, con un solo resultado y cronómetro.
Las antiguas cuatro URL redirigen al cuestionario único mediante `public/_redirects`.

| Procedencia (no son cuestionarios separados) | Imagen | Preguntas | Soluciones en el orden original |
| --- | --- | --- | --- |
| Integración de la tecnología | 1 | 4 | c, b, b, d |
| Dispositivos y pizarras digitales | 2 | 5 | b, d, d, b, c |
| IA en la educación | 3 | 4 | b, b, b, d |
| Recursos, redes y licencias | 4 | 5 | d, b, d, a, b |

## Revisión frente al PDF (21 de noviembre de 2026)

- **18 de 18 preguntas existentes localizadas**, con coincidencia de todas las
  opciones y claves salvo diferencias editoriales sin cambio de significado.
- Correspondencia por identificadores: `tec-integracion-01..04` = PDF 19–22;
  `tec-dispositivos-01..05` = PDF 9–13; `tec-ia-01..04` = PDF 5–8;
  `tec-recursos-01..05` = PDF 14–18.
- **13 añadidas**: PDF 1–4 y 23–31. Identificadores `tec-pdf-NN`, donde NN es
  el número original del PDF, no la numeración aleatoria del intento.
- Las diferencias editoriales son puntos finales, signos de interrogación,
  mayúsculas, comillas, `transp.` frente a `Transparencia` y, en PDF 13, la opción
  correcta dice «profesorado» donde la imagen original decía «profesor».
  No cambia la solución; se conserva el texto de las imágenes en las 18 iniciales.
- **Ambigüedad de la fuente, PDF 23 (página 3):** pregunta qué medio es una red
  social y marca LinkedIn, pero también ofrece YouTube. YouTube también puede
  considerarse una red social y el propio PDF lo denomina así en la pregunta 15.
  Se conserva la clave d del PDF y se añade una nota editorial tras responder,
  recomendando contrastar la clasificación de la transparencia 18 con el profesorado.
  No se convierte arbitrariamente en una pregunta de respuesta múltiple.

Las nuevas preguntas cubren iluminación, duración y sonido de vídeos, OBS,
redes sociales, micrófonos, Quizlet, diseño didáctico de vídeos, IA generativa,
prompts, multimodalidad y ámbitos de aplicación de la IA. No quedan preguntas
del banco de 31 sin incorporar. No se incluye el PDF binario en el repositorio.

## Uso

```sh
npm install
npm run dev
```

Abre la dirección que indique Astro (normalmente `http://localhost:4321`).
Para gestionar el servidor en segundo plano, sigue `AGENTS.md`.

```sh
npm run build
npm run test:cuestionarios
npm run preview
```

El build genera `dist/`. La comprobación contrasta los enunciados y las
124 opciones del MDX con el HTML compilado, además de verificar las claves
de respuesta transcritas, la página única y sus redirecciones.

Se mantienen la navegación pregunta a pregunta, el barajado, las marcas para
revisar, los resultados, el cronómetro y el guardado local del progreso.
«Todas son correctas» y «Todos los anteriores» aluden a las otras tres opciones
aunque se barajen. Los identificadores `tec-*` son propios de este proyecto.

La URL pública configurada es `https://cuestionarios-master.pages.dev`.
Esta configuración no publica por sí misma el proyecto.
El contenido se encuentra en `src/content/docs/`; `PLANTILLA.mdx`
es una plantilla de autoría y no forma parte de las páginas publicadas.

## Cloudflare Pages: solo este proyecto y la rama main

Crea un proyecto **Pages con integración Git**, no un Worker, y selecciona:

| Campo | Valor |
| --- | --- |
| Repositorio | `obiticadev/dam2-2026-27` |
| Nombre del proyecto | `cuestionarios-master` |
| Rama de producción | `main` |
| Framework preset | `Astro` |
| Root directory | `otros/cuestionarios` |
| Build command | `npm run build && npm run test:cuestionarios` |
| Build output directory | `dist` |
| Variable de entorno | `NODE_VERSION` = `24` |

`dist` es relativo a la raíz configurada; no escribas de nuevo
`otros/cuestionarios/dist`. No se necesita adaptador de Cloudflare, comando
de despliegue ni variables secretas: el sitio es estático.

En **Settings → Builds & deployments** (o **Build**, según el panel):

1. **Production deployments**: rama `main`, despliegues automáticos activados.
2. **Preview deployments**: selecciona **None** para no compilar otras ramas.
3. **Build watch paths**:
   - **Include paths**: deja únicamente `otros/cuestionarios/*` y quita el `*` global.
   - **Exclude paths**: vacío.

El filtro se expresa desde la raíz del repositorio, no desde Root directory.
En Cloudflare un solo `*` incluye también las subcarpetas. Root directory limita
qué proyecto se compila; Build watch paths limita qué cambios disparan builds;
la rama de producción y Preview None limitan las ramas que despliegan.
Cloudflare puede omitir el filtro de rutas ante pushes vacíos o pushes con
3000 o más archivos cambiados o 20 o más commits.

**Antes del primer despliegue:** añade los archivos de `otros/cuestionarios`
a Git y súbelos a `main`, incluido `package-lock.json` y `packages/starlight-quiz/`.
No subas `node_modules/`, `.astro/` ni `dist/`; ya están en `.gitignore`.
El nombre del proyecto debe estar disponible en Cloudflare para obtener
exactamente `cuestionarios-master.pages.dev`.

Referencias oficiales:
- https://developers.cloudflare.com/pages/configuration/build-configuration/
- https://developers.cloudflare.com/pages/configuration/branch-build-controls/
- https://developers.cloudflare.com/pages/configuration/build-watch-paths/
