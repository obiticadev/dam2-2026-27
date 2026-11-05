# Cuestionarios · Python · Segundo examen

Réplica independiente del proyecto de Acceso a Datos: Astro Starlight y su fork local de `starlight-quiz`. Se conserva la paginación, navegación, marcas, barajado, explicaciones por opción, resultados, cronómetro y guardado local. No se copian las preguntas ni el archivo histórico de AD.

## Ejecutar

Requiere Node **22.18+** (para las pruebas que importan TypeScript directamente), compatible con los requisitos de Astro, y Python **3.13** para comprobar las trazas. No necesita paquetes Python externos.

```bash
npm ci
npm run dev
```

Abrir la URL que indique Astro (normalmente `http://localhost:4321`). Si ese puerto ya está ocupado por otro cuestionario, Astro selecciona otro; para elegirlo: `npm run dev -- --port 4323`.

| Comando | Función |
|---|---|
| `npm run build` | Generar el sitio estático en `dist/` |
| `npm run preview` | Servir la compilación |
| `npm run test:cuestionarios` | Comprobar MDX y HTML; ejecutar después del build |
| `npm run test:trazas` | Ejecutar los 57 fragmentos Python literales y contrastar salida y error |
| `npm test` | Compilar y ejecutar ambas comprobaciones |

Si solo se dispone del comando `python3`, usar `python3 -X utf8 scripts/verificar_trazas.py`.

## Selección publicada

Tres simulacros de **20 preguntas** (60 distintas), con **cuatro opciones y una correcta**. Se proponen **30 minutos por simulacro**, no 30 minutos para las 60 preguntas. La viabilidad temporal es un criterio editorial, no una medición con alumnos: fragmentos de hasta 14 líneas no vacías entre todos sus archivos, números pequeños y recursiones breves. No hay cierre automático a los 30 minutos ni penalización configurada.

| Página | Enfoque | Código / conceptos |
|---|---|---|
| `py-examen-2/simulacro-1` | Salidas y fundamentos | 20 / 0 |
| `py-examen-2/simulacro-2` | Errores y casos límite | 20 / 0 |
| `py-examen-2/simulacro-3` | Variantes y RA3 | 17 / 3 |

Cada opción incluye explicación al corregir. Las condiciones de ejecución y la correspondencia exacta de las referencias T/F/R/RA3 están en la portada. Se distinguen sintaxis inválida, excepción en ejecución y código válido con fallo lógico. Se pide la clase más específica para no hacer ambiguas las jerarquías de excepciones.

## Fuentes y límites

Solo lectura de `D:/obsidian/DAM2`: nota de alcance `Exámenes/PY/PY - Examen 2 - UT03.md`, notas «Lo esencial» y «Cuaderno de repaso», los tres Markdown de `Fuentes/PY/aula-virtual/UT3/` y el Markdown de la práctica RA3 en `Fuentes/PY/aula-virtual/Prácticas/`. Se consultaron además los `.py` de los 30 ejercicios en `dam2-2026-27-python-labs/practicas/UT3. Ejercicios adicionales`, excluyendo sus entornos virtuales. No se modificó ninguna de estas fuentes ni se procesaron los PDF equivalentes.

La nota de alcance confirma **UT03 completa**. La petición actual concreta el entrenamiento tipo test y la estimación 20 preguntas / 30 minutos, aunque la nota anterior aún indique formato pendiente. No se actualiza la bóveda por esta tarea. Las preguntas son originales de práctica, no oficiales ni una predicción del examen.

### Cobertura de conceptos

| Objetivo | Preguntas representativas (prefijo `py2-`) |
|---|---|
| Booleanos como números, tipos y operadores | s1-01/02/03, s2-07, s3-01/02/07/14 |
| Definición, docstring, parámetros y llamadas | s1-03, s2-04/05/06, s3-04/05 |
| `print`, `return` y caminos sin retorno | s1-04/05, s2-09/10/11/16/17 |
| Sangría válida e inválida | s1-10, s2-01/02/03/09 |
| Ámbito y mutación frente a reasignación | s1-06/07/08/20, s2-08/20, s3-08/19 |
| Tupla de retorno y desempaquetado | s1-09, s3-06 |
| Módulos, alias, autoprueba y reutilización | s1-11/12/13, s2-12/13, s3-08 |
| Excepciones y su momento de aparición | s2-01/03/04/05/06/08/11/12/13/14/15/17/18/19/20 |
| Caso base, propagación y pila recursiva | s1-14/15/19, s2-15/16/17, s3-11/12/20 |
| Dígitos, binario, inversión, armónica e interés | s1-16/17/18, s2-18, s3-13/14 |
| Reglas incompletas y casos frontera | s2-09/10, s3-09/10/14/16 |
| RA3: extensiones, tamaños, rutas y nombres libres | s3-15/16/17/18 |
| RA3: historial compartido y total de bytes | s1-20, s3-19 |

No se promete una pregunta por cada uno de los 30 ejercicios ni evaluar cada API de RA3: se seleccionan sus mecanismos transversales. La teoría de colecciones de UT04 queda fuera. Las precisiones añadidas se indican en cada pregunta; se evita depender de direcciones de memoria, orden de directorios, azar, límites exactos de recursión o resultados inestables de redondeo.

## Pruebas y mantenimiento

`scripts/resultados-esperados.json` contiene la salida, la clase exacta de excepción (o `null`) y el índice editorial de la opción correcta (base cero). El verificador Python extrae el **código publicado**, sin corregir sangrías ni reescribir funciones, y lo ejecuta en procesos/carpetas nuevos con timeout. Comprueba que la opción marcada representa esa salida o error. Los módulos auxiliares también se extraen literalmente. No accede a los archivos reales del organizador ni necesita `rich`.

Las tres preguntas conceptuales (s3-17/18/20) se revisan por razonamiento y contraste documental, no se presentan como ejecutadas. Las pruebas estructurales revisan las 60 preguntas, 240 opciones con explicación, HTML generado, IDs únicos, enlaces de portada y conservación literal del código y su sangría en el botón de copia del HTML. No certifican la ausencia de ambigüedad pedagógica ni sustituyen una prueba visual de interacción en navegador.

Contenido en `src/content/docs/`; motor heredado en `packages/starlight-quiz/`. Los IDs y rutas `py2-*` / `py-examen-2/` separan los intentos de los de AD incluso al alternar proyectos en el mismo origen local. Cambiar el significado de una pregunta exige un ID nuevo para no reutilizar respuestas guardadas.

## Despliegue

Crear un proyecto **Pages** conectado al repositorio `obiticadev/dam2-2026-27` (no un Worker con comando de despliegue).

| Campo | Valor |
|---|---|
| Nombre del proyecto (propuesto, sujeto a disponibilidad) | `cuestionarios-python-2` |
| Rama de producción | `main` |
| Framework preset | `Astro` |
| Root directory | `06-programacion-python/cuestionarios` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Variable `NODE_VERSION` | `24` |
| Variable `SITE_URL` | URL pública real, por ejemplo `https://cuestionarios-python-2.pages.dev` si ese es el nombre asignado |

La salida `dist` es relativa al directorio raíz configurado. No se hereda el dominio público de AD. `SITE_URL` habilita URL canónicas y sitemap; ajustar si Cloudflare asigna otro nombre o se usa un dominio propio.

### Desplegar solo si cambia este proyecto

En **Settings → Build → Build watch paths**, sustituir el include predeterminado `*` por:

```text
06-programacion-python/cuestionarios/*
```

Dejar **Exclude paths** vacío. Estas rutas son relativas a la **raíz del repositorio**, no al Root directory del build. Según la documentación de Cloudflare, un solo `*` incluye también los subdirectorios. Configurar Root directory por sí solo **no** evita builds por cambios en otras carpetas.

Si tampoco se quieren previews de otras ramas, en **Branch control** desactivar los despliegues de preview; la producción seguirá la rama `main`.

Limitación de Cloudflare: el filtro se omite en pushes sin archivos cambiados, con 3000 o más archivos cambiados o con 20 o más commits; en esos casos puede construir aunque no coincidan rutas. El filtro no impide un despliegue manual.

Referencia: https://developers.cloudflare.com/pages/configuration/build-watch-paths/
