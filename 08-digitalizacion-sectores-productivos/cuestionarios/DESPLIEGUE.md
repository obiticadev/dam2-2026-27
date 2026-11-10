# Desplegar en Cloudflare Pages

Objetivo: **https://cuestionarios-digitalizacion.pages.dev**. Esta guía es para **Pages**, no para crear un Worker ni activar SSR. El sitio genera archivos estáticos; no necesita adaptador de Cloudflare, backend ni claves en el código.

## 1. Comprobar antes de publicar

Desde `08-digitalizacion-sectores-productivos/cuestionarios`:

```sh
npm ci
npm test
npm run preview
```

Comprueba portada, cuestionarios, corrección, resultados y móvil. `npm test` genera `dist/` y audita las 120 preguntas y sus siete cálculos.

Revisa los cambios que vayas a subir: solo el código y contenido autorizado del proyecto. No incluyas `node_modules/`, `dist/`, `.astro/`, cookies, contraseñas, PDF ni láminas de los materiales del aula. El `.gitignore` de este proyecto excluye dependencias y compilados, pero no protege automáticamente las carpetas hermanas del repositorio.

## 2. Conectar el repositorio con Pages

En Cloudflare, entra en **Workers & Pages → Create application → Pages → Connect to Git** —la etiqueta puede ser «Import an existing Git repository»— y selecciona el repositorio `dam2-2026-27` y la rama que quieras publicar.

Configura:

| Campo | Valor |
|---|---|
| **Project name** | `cuestionarios-digitalizacion` |
| **Production branch** | Tu rama de publicación real; no cambies de rama solo por esta guía. |
| **Framework preset** | Astro |
| **Root directory** | `08-digitalizacion-sectores-productivos/cuestionarios` |
| **Build command** | `npm test` |
| **Build output directory** | `dist` |
| **Environment variable** | `NODE_VERSION` = `22.23.1` |

El directorio `dist` es **relativo al Root directory**, no a la raíz del repositorio. `npm test` ejecuta `npm run build` y después la auditoría; así un contenido roto bloquea el despliegue. No es necesario usar un comando de despliegue adicional en una integración Git de Pages.

Se conserva `package-lock.json` para resolver las mismas dependencias. El plugin está dentro de `packages/starlight-quiz`, en esta misma carpeta; no se necesitan otros proyectos del monorepo.

El nombre del proyecto determina el subdominio `*.pages.dev`, sujeto a disponibilidad en Cloudflare. `site` ya está configurado en `astro.config.mjs` con la URL solicitada. **Ese ajuste no reserva ni crea el dominio.** Si Cloudflare asigna otro nombre, actualiza `site` y la prueba correspondiente antes de volver a publicar.

## 3. Evitar rebuilds por cambios en el resto del repositorio

**Este es el ajuste adicional importante.** Root directory indica dónde se compila, pero, por defecto, Pages puede compilar por cambios en cualquier archivo del repositorio.

Abre el proyecto de Pages y ve a:

**Settings → Build → Build watch paths → Edit**.

Sustituye el patrón global de inclusión `*` por:

```text
08-digitalizacion-sectores-productivos/cuestionarios/*
```

| Configuración | Valor |
|---|---|
| **Include paths** | Solo `08-digitalizacion-sectores-productivos/cuestionarios/*` |
| **Exclude paths** | Vacío |

**Las rutas son relativas a la raíz del repositorio**, no al Root directory del build. En este filtro de Pages, `*` también alcanza subdirectorios: cubre MDX, configuración, lockfile, scripts y el plugin local. No mantengas simultáneamente el `*` global en la lista de inclusiones, porque volvería a incluir todo.

Ejemplos esperados:

| Cambio del commit | Resultado para este proyecto |
|---|---|
| `08-digitalizacion-sectores-productivos/cuestionarios/src/content/docs/ut1/negocio.mdx` | Compilar. |
| `08-digitalizacion-sectores-productivos/cuestionarios/packages/starlight-quiz/styles.css` | Compilar. |
| `08-digitalizacion-sectores-productivos/cuestionarios/package-lock.json` | Compilar. |
| `01-acceso-datos/cuestionarios/src/…` | Omitir build. |
| `08-digitalizacion-sectores-productivos/temario/UT1-…md` | Omitir build: no es una dependencia de compilación. |
| `README.md` de la raíz u otra asignatura | Omitir build. |

Si más adelante el proyecto lee archivos compartidos fuera de su carpeta, añade **solo esas rutas** a Include paths. Si extraes esta carpeta a un repositorio independiente, deja Root directory vacío y vuelve a incluir `*`.

Este filtro se guarda **en la configuración de Cloudflare**, no se activa solo por añadir un fichero al repositorio. Los reintentos manuales y despliegues directos no prueban el filtrado de commits. Comprueba el historial de despliegues tras un cambio real dentro y otro fuera del proyecto.

Los controles de ramas son otra opción: si no quieres previews en otras ramas, revisa **Branch control / Preview deployments**. Eso no sustituye el filtro de rutas.

## 4. Verificación del despliegue

Tras el primer build correcto, abre:

```text
https://cuestionarios-digitalizacion.pages.dev/
https://cuestionarios-digitalizacion.pages.dev/ut3/servicios/
https://cuestionarios-digitalizacion.pages.dev/mixtos/decisiones/
```

- Confirma que aparece Digitalización y que hay ocho cuestionarios.
- Responde, corrige, recarga y verifica que continúa el intento.
- Revisa una pregunta de cálculo y su operación tras corregir.
- Comprueba móvil, navegación y resultados.
- Un acceso a una ruta inexistente debe mostrar la página 404, no una aplicación SPA.

El progreso local de `localhost` o de un dominio de preview no se transfiere al dominio final.

## 5. Alternativa: subida directa

Si no quieres conectar Git, desde esta misma carpeta:

```sh
npm ci
npm test
npx wrangler login
npx wrangler pages project create cuestionarios-digitalizacion
npx wrangler pages deploy dist --project-name cuestionarios-digitalizacion
```

El comando de creación es solo para un proyecto que aún no exista; si ya está creado, omítelo. La sesión se inicia en tu navegador; no pegues tokens en el repositorio ni en el chat.

**Decide el método antes de crear el proyecto:** Cloudflare distingue proyectos con integración Git y Direct Upload; no se puede convertir sin más uno en otro. Un proyecto Git existente puede recibir subidas manuales con Wrangler, pero eso no configura un pipeline Git en un proyecto creado como Direct Upload. Si eliges subida directa, no habrá rebuild automático por commits ni necesitarás Build watch paths.

## Referencias oficiales

- [Pages: configuración de compilación](https://developers.cloudflare.com/pages/configuration/build-configuration/).
- [Pages: monorepos](https://developers.cloudflare.com/pages/configuration/monorepos/).
- [Pages: Build watch paths](https://developers.cloudflare.com/pages/configuration/build-watch-paths/).
- [Pages: Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

Esta guía deja los valores preparados; no crea recursos, configura la cuenta ni publica el sitio por sí sola.
