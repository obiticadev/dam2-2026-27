# Informe de extracción y revisión · Digitalización

## Origen y destino

- **Curso:** <https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/course/view.php?id=1233>.
- **Herramienta:** `dam-2026-27-projects/descarga-aula/descargar.py`, ejecutada con `--curso` y `--salida` para este curso y esta carpeta.
- **Autenticación:** inicio de sesión manual del usuario en el navegador del descargador. No se han exportado contraseñas, cookies ni perfiles.
- **Originales:** en esta carpeta, con los nombres y la estructura generados por el proyecto.
- **Temas editados:** [índice del temario](../temario/README.md).

## Resultado de la descarga

El registro contiene **10 entradas**: cuatro recursos guardados, tres actividades no compatibles y tres avisos de sección no accesible.

| Recurso | Identificador Moodle | Resultado |
|---|---|---|
| Guía didáctica de Digitalización | 209561 | PDF y página contenedora guardados; sin avisos del recurso. |
| Digitalización aplicada a los sectores productivos | 209564 | PDF guardado; 16 páginas; sin avisos del recurso. |
| Tecnologías habilitadoras digitales | 209568 | PDF guardado; 13 páginas; sin avisos del recurso. |
| Sistemas basados en la nube y sistemas conectados | 209571 | PDF guardado; 15 páginas; sin avisos del recurso. |

**Omisiones previstas del exportador:**

- Avisos, tipo foro, identificador 209559.
- Clase Jitsi, identificador 209562.
- ActividadUT1 (copia), tipo tarea, identificador 217603.

No se han enviado formularios, respuestas, entregas ni mensajes. Los adjuntos interiores de actividades omitidas no se han recorrido.

**Incidencias del aula:** los enlaces `course/section.php?id=22067`, `22068` y `22069` devolvieron **HTTP 404**. Los tres PDF temáticos sí se encontraron en la página principal del curso. Esto no permite asegurar que no haya otros materiales dentro de secciones inaccesibles.

[Registro técnico completo](registro.json) · [Índice generado por el descargador](INDICE.md) · [Índice HTML](index.html)

## Preparación de los tres Markdown

1. Extracción del texto de los PDF, manteniendo como referencia la disposición de las páginas.
2. Renderizado local y revisión visual de las **44 páginas** para recuperar contenido de esquemas y tablas que no aparecía en el texto extraído.
3. Reconstrucción en Markdown de los apartados, tablas, organigramas, mapas de síntesis, ejemplos y retos.
4. Edición homogénea: título, procedencia, índice jerárquico, anclas explícitas, desarrollo, síntesis, reto, vocabulario y correspondencia con el PDF.
5. Conservación de todas las páginas como PNG en `laminas/ut1/`, `laminas/ut2/` y `laminas/ut3/`, con enlaces individuales desde cada tema.
6. Comprobación de las **61 anclas explícitas** y de los **150 enlaces** de los tres temas: sin destinos locales inexistentes ni anclas duplicadas o ausentes.

El contenido se ha editado para lectura y estudio: no es una transcripción tipográfica literal ni una reproducción exacta de la maquetación. Las láminas y los PDF permiten consultar el original.

## Decisiones y límites editoriales

- **UT3:** el archivo del aula es `u.03.pdf`, pero su portada dice «4. Sistemas basados en la nube». Se conserva esa discrepancia en el tema.
- **Contenedores y servicios:** se distingue la explicación de contenedores de la clasificación IaaS/PaaS/SaaS, aunque el PDF las presenta en el mismo apartado.
- **Imprecisiones del material:** se señalan por separado las simplificaciones sobre entrenamiento de IA, acceso a servidores locales, seguridad de nube privada, responsabilidades y ejemplos de proveedores.
- **Datos y productos:** las cifras de 4G/5G, porcentajes de gasto, ejemplos comerciales y aplicación sanitaria se identifican como datos de la presentación. No se han verificado externamente ni se ofrecen como garantías actuales o recomendaciones.
- **Casos del libro:** se conservan títulos y referencias, pero no se inventan los enunciados completos que no están en los PDF.
- **Actividad previa:** `Actividad UT1.md` y `Actividad UT1.pdf` se conservan sin cambios. El Markdown previo es una selección centrada en DAM, mientras que el PDF contiene también material de DAW. No se ha confundido esta actividad con el tema teórico.
- **Nombres de archivo:** algunos nombres descargados contienen caracteres mal codificados, como `PresentaciÃ³n`. Se mantienen para no romper el registro y el índice del exportador; los enlaces del temario apuntan a los archivos reales.

## Integridad de los PDF temáticos

Huellas SHA-256 calculadas sobre los archivos descargados, sin modificarlos durante la edición:

| Tema | SHA-256 |
|---|---|
| UT1 | `6ae0fd00bc92914547774fdf276970fb96e7469a1a733fdc66ab5559f939c07d` |
| UT2 | `60aca498344ecd4a6898ed2e499128d3707258b11c6cefef2adb495f3f8758ff` |
| UT3 | `48a8f74d3b1fdaada4080085e6157304bdfed21ebbe3567ccf19075aa033ebf9` |

## Uso y publicación

Los originales y sus reconstrucciones contienen material docente de terceros, atribuido a McGraw Hill. Se han preparado para el estudio local solicitado. No se ha hecho ningún commit ni push; que los archivos estén en un repositorio local no autoriza su publicación.
