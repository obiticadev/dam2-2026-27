# Portfolio de Oliver Bitica

Portfolio estático en Astro. Requiere Node.js `22.23.4` o posterior, de una rama par.

Si usas `nvm`, ejecuta `nvm install` y `nvm use` desde esta carpeta para activar la versión de `.nvmrc`.

```sh
npm ci
npm run dev
```

Si ya ejecutaste `npm ci` pero tu equipo tiene Node `22.23.1` y no puedes actualizarlo, puedes arrancar Astro sin cambiar el Node del sistema:

```sh
npx --yes --package=node@22.23.5 -c 'node node_modules/.bin/astro dev'
```

`npm run build` genera la web en `dist/`; `npm run preview` sirve esa compilación en local.

- `src/pages/index.astro`: portada, ficha de Presupuestos ISF y perfil profesional.
- `src/components/`: diagramas y controles de reproducción.
- `src/styles/site.css`: composición adaptable y temas claro y noche.

El CV original no se copia a `dist/`. No lo incluyas en un repositorio público sin confirmar antes la versión y los datos que quieres compartir. Las capturas de ISF se añadirán a la ficha cuando estén disponibles, con datos ficticios o anonimizados.
