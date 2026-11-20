# Cuestionarios · Tecnología educativa

Copia adaptada del proyecto de `01-acceso-datos/cuestionarios`, con el mismo
Astro Starlight y su plugin local `packages/starlight-quiz`.
El proyecto original no se modifica.

Contiene únicamente las **18 preguntas de las cuatro imágenes facilitadas**,
con cuatro opciones y una sola correcta por pregunta. Las soluciones corresponden
a las respuestas rojas de las imágenes, sin añadir preguntas ni explicaciones
inventadas. Se conservan las referencias a páginas y diapositivas.

| Cuestionario | Imagen | Preguntas | Soluciones en el orden original |
| --- | --- | --- | --- |
| Integración de la tecnología | 1 | 4 | c, b, b, d |
| Dispositivos y pizarras digitales | 2 | 5 | b, d, d, b, c |
| IA en la educación | 3 | 4 | b, b, b, d |
| Recursos, redes y licencias | 4 | 5 | d, b, d, a, b |

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
72 opciones del MDX con el HTML compilado, además de verificar las claves
de respuesta transcritas y los enlaces de la portada.

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
