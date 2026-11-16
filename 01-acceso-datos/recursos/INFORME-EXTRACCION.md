# Informe de extracción — Acceso a Datos

## Índice

- [Resultado](#resultado)
- [Organización](#organizacion)
- [Comprobaciones](#comprobaciones)
- [Incidencias y límites](#incidencias)
- [Fuentes y conservación](#fuentes)

<a id="resultado"></a>
## Resultado

Extracción de las secciones solicitadas con la cuenta del usuario, en la fecha local registrada en el manifiesto. Se recuperan las **14 actividades visibles**, los **5 libros con 62 capítulos únicos**, los **7 enunciados y soluciones de páginas**, la **práctica evaluable con su SQL** y la **carpeta con el ZIP de configuración**.

| Unidad | Actividades | Libro | Capítulos únicos |
|---|---:|---|---:|
| UT02 — Manejo de conectores | 10 | 3A — Manejo de conectores | 24 |
| UT02 | — | 3B — Bases de datos embebidas. SQLite | 9 |
| UT03 — Mapeo objeto relacional | 4 | 4A — Mapeo objeto relacional ORM | 25 |
| UT03 | — | 4B — Proyecto Hibernate, Oracle y Maven | 2 |
| UT03 | — | 4C — HQL y consultas por criterios | 2 |

Los índices de navegación del aula enumeran todos los capítulos salvo el que se está mostrando. Se contrastaron los enlaces de esos índices con las páginas recuperadas. Las copias repetidas del primer capítulo se conservan en las fuentes, pero se integran una sola vez en los Markdown de lectura.

Además se recupera el **PDF externo de la Universidad de Cádiz (13 páginas)** enlazado desde 3A, con su transcripción, sus 8 imágenes originales y una reproducción visual de la página de código.

- [UT02 — Índice de lectura](UT02-manejo-de-conectores/INDICE.md)
- [UT03 — Índice de lectura](UT03-mapeo-objeto-relacional/INDICE.md)

<a id="organizacion"></a>
## Organización

La entrega de **UT02** se ha reorganizado para seguir la presentación del aula:

- `contenidos/`: únicamente **3A Manejo de conectores** y **3B Bases de datos embebidas. SQLite**.
- `practicas/`: los ocho recursos de prácticas, en el orden del aula.
- `documentacion/`: referencias externas y límites de su recuperación, separados del temario.
- `INDICE.md`: descripción de la unidad y apartados **Contenidos**, **Contenidos adicionales** y **Prácticas**. El apartado adicional se mantiene vacío, como en la sección descargada.

El tutorial PDF, el laboratorio visual y los tres ejemplos SQL/Java se integran en sus apartados correspondientes de **3A**. La ficha del conector se integra en **3B**, y el SQL de la práctica evaluable se incorpora al propio enunciado. Ya no hay Markdown auxiliares con nombres que parezcan nuevas versiones de 3A o 3B.

Se han conservado las instrucciones y el código, normalizando únicamente los espacios de sangría de las transcripciones. Las fechas y las versiones del aula no se corrigen por conjetura. El SQL de la práctica incluye una advertencia editorial sobre su instrucción `DROP DATABASE`, sin ejecutar ni modificar el archivo original.

**UT03 se ha reorganizado y revisado técnicamente el 16 de noviembre de 2026**:

- `contenidos/`: únicamente **4A**, **4B** y **4C**, con los 29 capítulos y sus imágenes. Se conservan los 144 bloques Markdown históricos y se distinguen de las soluciones editoriales completas.
- Los ocho archivos de configuración/código del paquete se transcriben íntegramente en **4B**; se integran la descripción de la carpeta y las referencias de sus tres ZIP. Se retiran los trece Markdown auxiliares redundantes una vez integrado su contenido, sin eliminar los archivos originales ni los binarios.
- `documentacion/`: referencias, [revisión técnica](UT03-mapeo-objeto-relacional/documentacion/revision-codigo.md) y [verificación reproducible](UT03-mapeo-objeto-relacional/documentacion/verificacion.md). Los errores se explican; no se corrigen silenciosamente en los originales.
- Soluciones documentadas para CRUD, relaciones, claves compuestas, HQL y una ampliación editorial Criteria. Se compilan y prueban los bloques revisados extraídos de los apuntes, con doce pruebas H2 y una de CRUD SQLite en memoria con esquema explícito, sin acceso a servidores del usuario. No se afirma validación de integración Oracle/MySQL ni de todos los mapeos sobre SQLite.
- Los apartados adicionales, prácticas y exámenes de UT03 estaban vacíos en la sección descargada. No se han inventado recursos oficiales ni una descarga para el proyecto ausente de 4B.
- Las doce imágenes originales de UT03 se conservan byte a byte y se han decodificado y revisado mediante hoja de contacto; hay trece inserciones, sin rutas de imagen ausentes. Los dos diagramas HQL 404 continúan documentados como no disponibles.

Ambas unidades mantienen:

- `INDICE.md`: entrada de lectura.
- `originales/`: instantáneas HTML inertes del contenido docente y adjuntos originales. Los HTML **no son la respuesta web íntegra ni una copia ejecutable**: se excluyen scripts, formularios de envío, navegación y estado personal de la entrega.
- `img/`: imágenes rescatadas e ilustraciones de los documentos, además de la captura estática del recurso visual JDBC.
- `adjuntos/` en UT03: ZIP descomprimido, con los paquetes MySQL, Oracle y SQLite, sin alterar. Su lectura se integra en 4B en vez de dispersarse en un Markdown por archivo. Los binarios ZIP/JAR se conservan sin ejecutarlos.

Los índices indican qué documento acompaña cada adjunto docente. Las imágenes auxiliares se integran en los documentos correspondientes, no se convierten en apuntes individuales.

<a id="comprobaciones"></a>
## Comprobaciones

- Inventario de 10 actividades en UT02 y 4 en UT03, obtenido únicamente de las dos secciones pedidas.
- Segunda lectura autenticada de los recursos y contraste de los índices de los cinco libros: ningún capítulo del índice quedó pendiente.
- Se comprobó que no hubiera texto docente dentro de formularios eliminado en la primera copia: no se encontraron formularios dentro del contenido docente de estos recursos.
- Verificación automática de los bloques de código de los fragmentos HTML convertidos, conservando su contenido y sangrado interior; los prefijos de listas/citas Markdown no cuentan como cambios de código.
- Control alfanumérico por fragmento contra el texto HTML transformado. Es una comprobación de cobertura, no una certificación semántica ni una revisión manual línea a línea.
- Preservación de las tablas sencillas. Las tablas que contenían bloques de código se presentan por celdas, en orden de lectura, para no aplastarlos en una sola línea; se avisa en el documento y se enlaza el HTML original.
- Comprobación de las rutas y anclas locales de los documentos de lectura.
- Huellas SHA-256 y tamaños de las fuentes y documentos en `MANIFIESTO-EXTRACCION.json`.

La verificación de extracción anterior acredita conservación respecto al aula, **no corrección del código original**. La revisión técnica posterior de UT03 está documentada por separado: trece pruebas de integración de las soluciones revisadas, con comprobación de enlaces, anclas, imágenes, cobertura de bloques y conservación de originales. Véase la evidencia y los límites en [Verificación UT03](UT03-mapeo-objeto-relacional/documentacion/verificacion.md).

**Incidencia del registro anterior:** la revisión detecta 17 huellas históricas que no coincidían con fuentes/adjuntos de UT03 ya antes de editar. Los 114 archivos de conservación de UT03 se contrastan con Git y no han cambiado durante esta tarea; se registran sus huellas actuales conservando los valores anteriores. Se detectan además 25 discrepancias en UT02, fuera de alcance, que se dejan documentadas sin modificar sus archivos ni sus huellas históricas. No se atribuye una causa ni se afirma validación global del manifiesto antiguo.

<a id="incidencias"></a>
## Incidencias y límites

1. **Dos diagramas originales de HQL no disponibles:** las imágenes PlantUML de `cursohibernate.es` devuelven HTTP 404 tanto por HTTP como por HTTPS. Se conserva su enlace y una advertencia en su posición. No se han reconstruido ni sustituido por diagramas inventados.
2. **Icono decorativo de viñeta ausente:** `/images/icon-bullet.png` devuelve 404. No es una figura de contenido; se elimina de la copia de lectura y se conserva la incidencia en el registro.
3. **Proyecto completo de 4B sin adjunto:** el segundo capítulo indica «descarga el fichero e importa el proyecto», pero su contenido no tiene ningún enlace ni archivo adjunto. El ZIP de la carpeta de configuración se conserva por separado y no se presenta como ese proyecto ausente.
4. **Laboratorio visual JDBC recuperado solo de forma estática:** se conservan HTML/CSS inertes, el texto disponible y los ejemplos Java, además de una captura local sin scripts ni red. Los campos y resultados generados por JavaScript no se recuperaron. La captura no representa una interacción ejecutada ni una réplica funcional.
5. **Referencias externas:** se conservan en el texto y en `referencias-externas.md`. No se descargaron recursivamente las webs de documentación, APIs, instaladores o vídeos; no se han comprobado todos esos enlaces. El PDF directamente enlazado de la Universidad de Cádiz constituye una excepción y está guardado localmente.
6. **PDF externo:** su capa textual presenta tildes separadas y espaciado defectuoso en el código. Se normalizan tildes y ligaduras; el código se entrega como extracción sin depurar, junto a su página reproducida. No se ha ejecutado ni corregido por conjetura.
7. La cobertura se refiere al contenido **visible para la cuenta en las dos secciones durante la extracción**. No se afirma haber recuperado material oculto, restringido, publicado posteriormente o inexistente en el aula.

Por esas incidencias no se debe describir el resultado como una réplica íntegra y funcional del aula sin excepciones.

<a id="fuentes"></a>
## Fuentes y conservación

- [Sección UT02](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/course/section.php?id=30596)
- [Sección UT03](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/course/section.php?id=30595)
- [Inventario UT02](UT02-manejo-de-conectores/originales/registro.json)
- [Verificación UT02](UT02-manejo-de-conectores/originales/VERIFICACION.json)
- [Inventario UT03](UT03-mapeo-objeto-relacional/originales/registro.json)
- [Verificación UT03](UT03-mapeo-objeto-relacional/originales/VERIFICACION.json)

No se han modificado Obsidian ni `temario/`, no se ha realizado la ingesta a ninguna wiki y no se han exportado cookies, contraseñas ni estados de sesión. El estado de entrega y los enlaces personales de la práctica no forman parte de los documentos docentes finales. Se conservan credenciales ficticias de los ejemplos del profesorado, como `scott/tiger`, sin tratarlas como credenciales de acceso del usuario.

El material del aula y el PDF de terceros se destinan a la copia local solicitada. **No se ha hecho commit ni push: no publicar estos archivos en un repositorio público sin autorización y revisión de derechos.**
