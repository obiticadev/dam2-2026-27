---
name: anydoc-aula-virtual-to-temario
description: Transforma Markdown exportado con AnyDoc desde Aula Virtual en apuntes DAM 2 listos para temario/, siguiendo el patrón UT02-A-manejo-de-ficheros.md. Úsala para estructurar, revisar y enriquecer exportaciones AnyDoc destinadas a un documento UTxx, incluidas sus tablas, ejemplos, imágenes y enlaces.
compatibility: OpenCode and Antigravity CLI; workspace skill using the Agent Skills SKILL.md format.
metadata:
  project: dam2-2026-27
  language: es
  source: anydoc-aula-virtual
  target: temario
---

# De AnyDoc de Aula Virtual a apuntes de temario DAM 2

Transforma una exportación de AnyDoc en un documento didáctico estructurado para el temario del curso. El resultado de referencia es:

- **Fuente exportada:** `01-acceso-datos/recursos/2A Manejo de ficheros _ AulaVirtual/2A Manejo de ficheros.md`
- **Resultado de referencia:** `01-acceso-datos/temario/UT02-A-manejo-de-ficheros.md`

Usa el segundo documento como patrón editorial, no como fuente para completar hechos que no estén en la exportación o en los recursos originales. Para otras unidades, adapta el código, título, módulo y rutas al documento y a las convenciones ya existentes en su carpeta `temario/`.

Esta skill es la específica para el flujo **exportación de AnyDoc → apunte de temario**. Si también está disponible `clean-converted-markdown`, aplica aquí este flujo de salida separada y comparación con los recursos; reserva la limpieza en el mismo archivo para solicitudes explícitas de limpieza in situ.

## Objetivo y límites

- Mantén la exportación de AnyDoc en `recursos/` como fuente; por defecto, crea o actualiza el documento final separado en `temario/`.
- Conserva todos los conceptos, definiciones, procedimientos, ejemplos, datos, referencias y matices únicos del material. No conviertas el tema en un resumen.
- Repara la estructura y los errores evidentes de extracción; redacta en español claro y correcto sin alterar el sentido.
- Puedes consolidar duplicados realmente redundantes y reorganizar fragmentos cuya lectura se haya mezclado por el diseño, pero conserva cualquier detalle adicional que aporte una de las repeticiones.
- No inventes contenido, citas, nombres de archivos, imágenes, celdas, relaciones entre conceptos ni enlaces. Si una reconstrucción no es segura, conserva el fragmento con una presentación prudente y comunica la duda al usuario.
- No reescribas el PDF, el HTML, el Markdown bruto de AnyDoc ni recursos que no formen parte explícita de la tarea. Respeta modificaciones y eliminaciones preexistentes del espacio de trabajo.

## Inspección previa

1. Lee por completo el Markdown de AnyDoc. En archivos extensos, recórrelo en tramos amplios y consecutivos, conservando el contexto entre tramos.
2. Busca en la carpeta de recursos del tema los PDF, HTML, imágenes y README que acompañen a la exportación. Consulta esos recursos cuando ayuden a reconstruir orden de lectura, figuras, tablas o código. El Markdown de AnyDoc es la base textual; el PDF/HTML ayuda a resolver ambigüedades, no autoriza a omitir su contenido.
3. Inspecciona el archivo final si ya existe, el `README.md` del temario y el README de imágenes del tema. Sigue su nomenclatura en vez de crear un formato paralelo.
4. Antes de editar, identifica el índice del documento, las secciones, los ejemplos y las referencias del original. Distingue contenido real de metadatos de impresión, navegación y restos de maquetación.
5. Determina las rutas reales de los recursos. No presupongas que un HTML enlazado por una versión anterior todavía existe.

## Patrón editorial del resultado

### Cabecera

Usa un único título H1 con código de unidad y título. A continuación incluye metadatos breves en un bloque de cita, una línea horizontal y el contenido. Adapta los valores y añade únicamente enlaces a archivos existentes:

```markdown
# UT02-A: Manejo de ficheros

> **Módulo:** Acceso a Datos (DAM 2)
> **Unidad:** UT02 - Persistencia en ficheros y XML
> **Tema:** 2A - Manejo de ficheros (`java.io`)
> **Documento oficial PDF:** [`2A Manejo de ficheros _ AulaVirtual.pdf`](../recursos/2A%20Manejo%20de%20ficheros%20_%20AulaVirtual/2A%20Manejo%20de%20ficheros%20_%20AulaVirtual.pdf)

---
```

Si el HTML o el PDF no están presentes, omite su línea en lugar de dejar un enlace roto o recrear el archivo. Cuando el repositorio use otro patrón de cabecera para el módulo, prioriza ese patrón.

### Jerarquía

- Convierte el índice numerado de AnyDoc en encabezados reales; no repitas la tabla de contenidos al principio salvo petición expresa.
- Mantén la numeración y el orden temático del original. Elimina niveles de encabezado artificiales como `#####` usados por AnyDoc para texto resaltado.
- Usa H1 solo para el título. Usa H2 para los capítulos de primer nivel (`## 1. Introducción`, `## 2. java.io`, `## 3. java.nio`), H3 para sus apartados (`### 2.1. Streams o flujos`) y H4 para subapartados temáticos o clases (`#### Clase FileReader`). No saltes niveles sin necesidad.
- Las etiquetas breves dentro de un apartado pueden ser párrafos en negrita (por ejemplo, `**Flujos de bytes**`) cuando no sean secciones con entidad propia. No conviertas cada frase destacada en un encabezado.
- Omite del cuerpo final los datos de impresión de Moodle/AnyDoc (persona que imprime, sitio, curso/libro duplicados, fecha de impresión), la descripción administrativa exportada si no aporta contenido, y el índice automático una vez convertido en encabezados. Conserva las explicaciones académicas que sigan a esos elementos.

### Prosa y énfasis

- Escribe para alumnado de DAM en español de España, con tildes, puntuación y concordancia corregidas. Prefiere párrafos breves, cada uno con una idea central.
- Usa términos coherentes con el material (`fichero`, `entrada/salida`, `búfer`, etc.) y conserva la terminología técnica del módulo.
- Marca conceptos clave con **negrita** de forma moderada. Escribe clases, métodos, paquetes, opciones, tipos, rutas de ejemplo y fragmentos breves en código en línea, como `` `java.nio.file.Path` `` y `` `readLine()` ``. Usa cursiva para términos extranjeros cuando ayude a la lectura.
- Desarrolla abreviaturas solo si el original lo permite. No añadas antecedentes ni explicaciones avanzadas ajenos al temario.
- Contrasta errores técnicos evidentes con la documentación oficial pertinente antes de corregirlos. Corrige solo cuando el error y la solución sean claros; no sustituyas el contenido por una explicación especulativa ni cambies silenciosamente el alcance del curso. Resume al usuario las correcciones técnicas relevantes fuera del documento.

### Listas, tablas y elementos mal detectados

- Convierte enumeraciones pegadas en prosa en listas Markdown cuando los elementos sean independientes. Conserva el orden y la relación entre elemento y explicación.
- Mantén tablas únicamente si existe una relación real entre filas y columnas, como la tabla de métodos de `File`. Reconstruye cabeceras, filas y columnas a partir del original y comprueba que ninguna celda se haya desplazado.
- Si AnyDoc emitió una tabla para maquetación, columnas de página o texto de un diagrama, deshaz la tabla: reorganiza la información como prosa, lista, tabla semántica o código según corresponda. No mantengas cuadrículas deformadas con celdas vacías o fragmentos sin relación.
- En caso de no poder recuperar con seguridad la relación de una tabla, conserva el texto legible en una lista o indica la ambigüedad; no adivines valores o alineaciones.
- Mantén captions y atribuciones cuando sean informativos y vuelve a asociarlos con su figura o ejemplo si la relación es clara.

### Ejemplos y código

- Recupera fragmentos de código que la exportación haya aplanado en una línea o mezclado con explicaciones. Separa introducción, código y explicación posterior.
- Usa bloques cercados con lenguaje, normalmente `java`, y conserva el orden de imports, clases, métodos, comentarios y sentencias. Indenta de forma consistente y separa ejemplos distintos en bloques separados.
- Conserva firmas, nombres, valores y comportamiento del ejemplo. Repara errores de OCR/maquetación o sintaxis solo si la reconstrucción es inequívoca; no sustituyas por una solución moderna ni reescribas el ejemplo por preferencia personal.
- Si un código es un fragmento y no un programa completo, no le inventes imports o clases para aparentar que compila. Etiquétalo como fragmento con una breve frase si hace falta.
- Cuando el material distinga varios pasos, conserva una explicación en texto o una lista cerca del código. No escondas el contenido pedagógico dentro de comentarios inventados.

### Imágenes y enlaces

- Conserva las figuras relevantes en el punto del texto al que pertenecen e intégralas con ruta relativa y texto alternativo descriptivo, por ejemplo: `![Jerarquía de clases InputStream y OutputStream](./img/2A/5.png)`.
- Usa los recursos gráficos ya exportados cuando correspondan. Si hace falta copiarlos a `temario/img/<tema>/`, copia únicamente archivos existentes y necesarios; no enlaces a imágenes de cabecera, logos o elementos decorativos como si fueran figuras del tema.
- Comprueba que cada ruta de imagen final resuelve desde el Markdown. No renombres ni sobrescribas archivos existentes sin comprobar antes su uso.
- Si añades imágenes nuevas, registra su nombre, origen/página (si se conoce), sección y descripción en el README de esa carpeta de imágenes, siguiendo el formato existente.
- Convierte URLs desnudas en enlaces Markdown con texto descriptivo cuando el contexto y el destino sean claros. Conserva la URL y no fabriques destinos. Usa rutas relativas para los recursos locales, codificando espacios y caracteres especiales de forma válida.
- Para documentación Java, sigue la versión que use la unidad o el repositorio (el ejemplo UT02-A enlaza documentación JDK 17); no cambies a la documentación más reciente automáticamente.

## Organización en este repositorio

- El documento académico final va en el `temario/` del módulo correspondiente, no junto al Markdown bruto en `recursos/`.
- Sigue el nombre `UTxx-Y-slug-del-tema.md` que emplee el temario. Por ejemplo, `UT02-A-manejo-de-ficheros.md`.
- Guarda figuras del tema en `temario/img/<identificador-del-tema>/` y enlázalas desde el Markdown con rutas relativas.
- Si se incorpora una unidad nueva, añade o actualiza su fila en el `temario/README.md` con enlaces locales verificados a Markdown y a los formatos de origen disponibles. No dupliques filas ni modifiques entradas ajenas al cambio.
- No edites `skills-lock.json` para esta skill local ni ejecutes AnyDoc sobre archivos de origen salvo que el usuario lo pida.

## Procedimiento de transformación

1. **Fija entradas y destino.** Usa las rutas explícitas del usuario. Si solo facilita la fuente, determina el módulo, código UT, letra/tema y slug a partir del índice y de los documentos vecinos. Si cualquiera de esos datos es ambiguo y cambia la ruta final, pregunta antes de crear un documento con nombre inventado.
2. **Levanta el mapa de contenido.** Extrae todos los capítulos y subcapítulos y relaciona cada bloque de texto, lista, tabla, figura, código y enlace con una sección. Marca duplicados, OCR dudoso y fragmentos que necesiten consulta del PDF/HTML.
3. **Prepara el esqueleto.** Crea la cabecera y la jerarquía de encabezados respetando la numeración. No escribas un resumen sustitutivo.
4. **Reconstruye sección por sección.** Revisa prosa, listas, tablas y ejemplos contra el mapa. Inserta figuras donde aporten contexto. Conserva el recorrido didáctico y completa las secciones finales, no te detengas tras las primeras páginas.
5. **Integra recursos e índice.** Verifica enlaces, copia solo los activos necesarios y actualiza el índice/README de imágenes únicamente si la nueva unidad o los recursos lo requieren.
6. **Audita el resultado completo.** Lee el Markdown final desde el comienzo hasta el final y compara su estructura y contenido con el original. Corrige artefactos restantes antes de darlo por terminado.

## Lista de verificación final

- [ ] Hay un único título H1 con código y nombre de la unidad, metadatos útiles y separador.
- [ ] La antigua tabla de contenidos quedó representada por encabezados numerados coherentes, no duplicada como texto.
- [ ] No quedan metadatos de impresión, restos de columnas, tablas de maquetación, texto concatenado ni encabezados artificiales de AnyDoc.
- [ ] Están todas las secciones y todos los conceptos, ejemplos, datos, referencias, notas y figuras con valor del origen; las repeticiones solo se consolidaron si eran redundantes.
- [ ] Las tablas conservadas son semánticas y sus celdas están en la columna correcta.
- [ ] Los bloques de código tienen fences equilibrados, lenguaje y formato legible; no se cambió su intención.
- [ ] Los enlaces e imágenes locales apuntan a archivos existentes y tienen etiquetas/alt text útiles.
- [ ] La numeración, ortografía, acentos, mayúsculas técnicas y niveles de encabezado son consistentes.
- [ ] El índice del temario y el README de figuras están actualizados si corresponde, sin cambios ajenos.
- [ ] La revisión final incluyó también las últimas secciones del documento y no dejó notas del agente dentro del temario.

## Forma de comunicar la entrega

Responde en español e indica la ruta del nuevo/actualizado temario, los principales tipos de reconstrucción realizados (por ejemplo, tablas, código, jerarquía o imágenes), si se actualizó el índice y cualquier recurso ausente o pasaje que haya quedado ambiguo. No afirmes que la transformación está completa si no revisaste el documento final entero.
