# Cuestionarios · Digitalización

Copia independiente del proyecto de `01-acceso-datos/cuestionarios`, adaptada a los tres temas de Digitalización. Conserva Astro Starlight y el fork local de `starlight-quiz`, con su licencia en `packages/starlight-quiz/LICENSE`. No modifica el original ni depende de él para compilar.

**Destino previsto:** <https://cuestionarios-digitalizacion.pages.dev>.

## Contenido

| Unidad | Cuestionario A | Cuestionario B |
|---|---|---|
| UT1 · Digitalización e IT-OT | Negocio y organización | Integración en la práctica |
| UT2 · Tecnologías habilitadoras | Elegir la tecnología | Aplicación e impacto |
| UT3 · Nube y sistemas conectados | Servicios y costes | Arquitectura y decisiones |
| Mixtos · Cinco preguntas por unidad | Integración | Decisiones |

**Ocho cuestionarios × 15 preguntas = 120 preguntas distintas**, cuatro opciones y una correcta. Todas las opciones tienen explicación. Los mixtos plantean escenarios nuevos, no repiten literalmente las preguntas de unidad.

Cada cuestionario UT3 contiene **tres cálculos**, y el mixto B añade uno de repaso: gasto sobre ingresos, comparación de sectores, puntos porcentuales e inversión de la operación para obtener ingresos. Utilizan el **3,28 %**, **7,16 %** y **1,51 %** de la diapositiva del profesor como datos de ejercicio, no como tarifas ni porcentajes obligatorios.

[Mapa de cobertura y criterio pedagógico](COBERTURA.md) · [Guía de despliegue y rebuild selectivo](DESPLIEGUE.md)

## Uso local

Requisitos: **Node 22.23.1** —versión fijada en `.node-version`— y npm. Desde esta carpeta:

```sh
npm ci
npm test
npm run preview
```

`npm test` compila y verifica fuentes y HTML; `preview` sirve el resultado en `http://localhost:4321`. Para editar con recarga automática: `npm run dev`.

| Comando | Función |
|---|---|
| `npm run build` | Generar `dist/`, sitio estático listo para Pages. |
| `npm run test:cuestionarios` | Verificar los MDX y el HTML generado; ejecutar después del build. |
| `npm test` | Compilar y ejecutar la auditoría anterior. |
| `npm run test:e2e` | Probar interacción en Chromium con el preview local ya abierto. |

Para las pruebas de navegador, instala Chromium una vez con `npx playwright install chromium`. Después de `npm test`, deja `npm run preview -- --host 127.0.0.1 --port 4321` abierto y ejecuta `npm run test:e2e` en otra terminal. Comprueban las 120 correcciones, recarga de progreso y contadores, marcas, resultados, reinicio, teclado y anchos de 320, 390 y 1440 px. No se ejecutan en el build de Pages ni requieren publicar el sitio.

## Funciones conservadas

- Una pregunta por pantalla, navegación anterior/siguiente y cuadrícula de preguntas.
- Barajado de preguntas y opciones; el orden del intento se mantiene al recargar.
- Envío manual, corrección de cada opción y resultados finales.
- Marcas para revisar, cronómetro y reinicio de intento.
- Progreso en `localStorage`: sin cuentas, servidor de aplicación ni base de datos.
- Diseño original adaptable a móvil, tema claro/oscuro y búsqueda de Starlight.

El progreso pertenece al origen y navegador: `localhost`, una URL de preview y el dominio final tienen almacenamientos distintos. Borrar los datos del navegador elimina los intentos. Las soluciones están en el sitio estático: sirve para aprender, no para un examen seguro.

## Fuentes

Los tres Markdown de `../temario/`:

- `UT1-digitalizacion-entornos-it-ot.md`.
- `UT2-tecnologias-habilitadoras-digitales.md`.
- `UT3-sistemas-nube-conectados.md`.

Los apartados **Repasar** corresponden a sus secciones. Los ejemplos son preguntas originales elaboradas a partir de sus conceptos. Se respetan las aclaraciones del temario, especialmente las diferencias entre contenedores y modelos de servicio y entre cloud/fog/edge/mist. UT3 es el tercer material del aula, pero su PDF lleva el capítulo 4 en portada.

Los PDF, las láminas del editor, la actividad anterior y los estados de sesión **no se copian al sitio**. No se depende de `../temario/` durante el build: actualizarlo no cambia automáticamente las preguntas; hay que revisar los MDX.

## Edición y comprobaciones

Los ocho cuestionarios están en `src/content/docs/ut1/`, `ut2/`, `ut3/` y `mixtos/`. La portada es `src/content/docs/index.mdx`; la navegación y URL canónica están en `astro.config.mjs`.

Convenciones: IDs `dig-…` únicos y estables; cuatro opciones con un solo `[x]`; comentario `>` para cada opción; referencia `Repasar: UT…`; un `<QuizResults />` por cuestionario. Si cambia el significado o la solución de una pregunta publicada, cambia su ID para no reutilizar respuestas antiguas incompatibles.

La auditoría comprueba 120 preguntas, reparto de los mixtos, feedback en HTML, ausencia de duplicados literales, posiciones iniciales equilibradas y cálculos. También comprueba que ninguna correcta sea la **única opción más larga** y evita que la más corta sea una pista sistemática. Las cifras son controles editoriales, no una prueba automática de dificultad o ausencia de ambigüedad.

La plantilla genérica `PLANTILLA.mdx` y la documentación del plugin no se publican como páginas. Se han omitido los cuestionarios, archivo histórico, trazas Java, dependencias y compilados de Acceso a Datos al crear la copia. El fork local solo añade una corrección: al restaurar preguntas tras una recarga, sincroniza también los contadores y el cronómetro del navegador de preguntas.

## Publicación

Sigue [DESPLIEGUE.md](DESPLIEGUE.md). **Root directory no limita por sí solo los rebuilds**: configura también **Build watch paths** con `08-digitalizacion-sectores-productivos/cuestionarios/*` relativo a la raíz del repositorio.

No se ha desplegado ni se ha creado el proyecto en tu cuenta. No publiques materiales ajenos, credenciales ni datos privados junto con este código.
