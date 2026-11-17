# Criterios editoriales y cobertura

[Inicio de la entrega](../INDICE.md) · [Índice general de documentación](INDICE.md)

<a id="indice"></a>
## Índice de apartados

- [1. Qué cambia respecto a la extracción](#nav-que-cambia-respecto-a-la-extraccion)
- [2. Mapa de UT02](#nav-mapa-de-ut02)
- [3. Mapa de UT03](#nav-mapa-de-ut03)
- [4. Tratamiento de referencias e imágenes](#nav-tratamiento-de-referencias-e-imagenes)
- [5. Criterio de validación](#nav-criterio-de-validacion)

<a id="nav-que-cambia-respecto-a-la-extraccion"></a>
## 1. Qué cambia respecto a la extracción

La extracción conserva procedencia; esta carpeta es la **edición final de lectura**. No se exige que cada defecto de HTML, salto de PDF o fragmento incompleto del aula se reproduzca literalmente.

- Títulos con jerarquía coherente; no se utilizan encabezados de nivel 5 o 6 para frases corrientes.
- Listas espaciadas, tablas para comparar métodos y avisos mediante citas Markdown estándar.
- Código Java con cuatro espacios por nivel y lenguaje declarado; configuración y SQL en sus bloques apropiados.
- Ejemplos completos corregidos, sin duplicar debajo las variantes históricas que no compilan.
- PDFs abiertos mediante enlace al archivo local, sin transcripción por páginas ni imágenes decorativas de su portada.
- Imágenes didácticas junto a la explicación y con nombres y textos alternativos comprensibles.
- Enlaces clasificados por finalidad y con títulos descriptivos; no se conservan letras sueltas o identificadores como títulos de recursos.
- Ejercicios agrupados con su solución y comprobaciones. Se distinguen actividades del aula y desarrollos editoriales.
- Índices en la documentación y retornos al índice local; los temas largos incluyen subíndices descriptivos sin subdividir innecesariamente los bloques breves.

Se utiliza Markdown estándar para que la lectura funcione sin CSS personalizado, plugins de Notion ni extensiones de Obsidian. El tamaño exacto, color y tipografía dependen del visor; **no se introducen etiquetas HTML de tamaño de letra** para simular diseño.

[↑ Volver al índice](#indice)

<a id="nav-mapa-de-ut02"></a>
## 2. Mapa de UT02

| Contenido de procedencia | Ubicación en la edición final |
|---|---|
| 3A, introducción, protocolos y conexión | 3A, secciones 1–4: bases, API, drivers, configuración y objetos JDBC. |
| Arquitectura, drivers tipos 1–4 y referencias a «tipo 5» | 3A, sección 2; clasificación histórica corregida y figuras explicativas. |
| Oracle Thin, OCI, conexión interna, URL y tnsnames | 3A, sección 3; formato correcto y separación entre configuración y Java. |
| Connector/J, configuración Eclipse y registro de drivers | 3A, sección 3 y guía común de entorno. |
| Tutorial PDF de Eclipse | Un único enlace al PDF local, no trece apartados de páginas. |
| Sentencias, consultas, parámetros, metadatos y DML | 3A, secciones 4–7 y ejercicios 1–4. |
| Laboratorio visual de inyección SQL | Explicación estática de datos frente a código; buscador y pruebas con comillas e intento de inyección. Se retiran controles inertes y etiquetas sueltas. |
| Array de alumnos y metadatos de columnas | Clase completa EjemplosJdbc en 3A, con pruebas de inserción y descripción. |
| Procedimientos Oracle/MySQL y adjuntos de clientes | Ejercicio 7, con SQL por motor y llamada Java completa. |
| Transacciones y Map de ventas | 3A, sección 9, EjemplosJdbc y ejercicio 5; confirmación conjunta y rollback probado. |
| ResultSet: tipos, concurrencia, cursor, actualización e inserción/borrado | 3A, sección 10; tabla de métodos, ejemplo completo de alumnos y práctica de salarios. |
| 3B, arquitectura, características e instalación | 3B, secciones 1–3. Se corrigen afirmaciones desactualizadas sobre JOIN y ALTER TABLE. |
| Consola, tipos, SQL, contactos y proveedores | 3B, secciones 3–6, con esquemas completos y FK activadas. |
| Transacciones, savepoints y JDBC SQLite | 3B, secciones 7–8; guías de pruebas y helper compartido. |
| Actividades independientes | Ejercicios 1–5 y práctica de salarios. |
| Actividad integrada Chinook | Ejercicio 8 con exploración, jazz y total facturado, incluyendo clientes sin facturas. |

No se ha convertido la entrega en un inventario de archivos originales. Se mantienen las ideas y funcionalidades didácticas con un recorrido claro; se eliminan ruido de extracción, feedback duplicado de cuestionarios y referencias que no aportaban contenido al tema.

[↑ Volver al índice](#indice)

<a id="nav-mapa-de-ut03"></a>
## 3. Mapa de UT03

| Libro y contenido | Ubicación final |
|---|---|
| 4A, introducción, persistencia, Hibernate y JPA | 4A, secciones 1–3. |
| Clases anotadas, configuración y Maven | 4A, sección 2, y proyecto completo de 4B. |
| Relaciones uno a uno, uno a muchos ordenado/desordenado y muchos a muchos | 4A, sección 4, y ejemplo resuelto 1 con entidades completas. |
| Cascadas y recomendaciones de ciclo de vida | 4A, sección 5, y pruebas de huérfanos y módulos compartidos. |
| equals/hashCode e identificadores simples/compuestos | 4A, sección 6, y EmployeeId/MapsId del ejemplo resuelto. |
| Contexto de persistencia, merge, refresh, bloqueos y excepciones | 4A, secciones 7–8, CRUD de 4B y suite reproducible. |
| 4B, diez pasos del proyecto y ocho archivos del paquete | Un proyecto coherente en 4B y tabla de adaptación por motor, sin repetir los errores del paquete. |
| 4C, sintaxis HQL, literales, parámetros, agregados, uniones y subconsultas | 4C, secciones 1–3, y clase Consultas del ejemplo resuelto 2. |
| Resultados, paginación y consultas nombradas | 4C, secciones 4–5 y pruebas con casos límite. |
| UPDATE, DELETE e INSERT SELECT | 4C, sección 6 y métodos DML documentados con sus restricciones. |
| Criteria | Ampliación editorial identificada, no atribuida a una lección original inexistente. |

En UT03 no se inventan enunciados evaluables: `ejercicios/` agrupa los desarrollos resueltos de los ejemplos para facilitar su uso.

[↑ Volver al índice](#indice)

<a id="nav-tratamiento-de-referencias-e-imagenes"></a>
## 4. Tratamiento de referencias e imágenes

Las páginas «página», «enlace» y «I» se reemplazan por referencias identificables. Los vídeos se renombran por sus metadatos. Se retiran del índice final notas al pie aisladas y búsquedas de Google con redirecciones impredecibles; sus contextos permanecen en el archivo histórico.

Se copian **24 imágenes didácticas** y el PDF como archivos locales, sin alterar sus bytes. No se copian iconos decorativos, portadas ni capturas de interfaces estáticas inservibles como si fueran nuevos apuntes. Una figura histórica no demuestra que el código de su época sea correcto: las diferencias de los modelos revisados se explican.

Persisten dos diagramas HQL externos inaccesibles y un proyecto oficial de 4B no adjuntado. Los programas editoriales no se presentan como una recuperación de esas fuentes ausentes.

[↑ Volver al índice](#indice)

<a id="nav-criterio-de-validacion"></a>
## 5. Criterio de validación

La comprobación combina compilación y pruebas **extraídas de los bloques entregados**, ejecución de SQL SQLite, revisión de rutas/anclas e inspección del HTML renderizado con tablas, listas, imágenes y código. No se declara una revisión visual perfecta por haber contado enlaces.

Los resultados y las limitaciones —incluidos los servidores no disponibles— quedan en [VALIDACION](VALIDACION.md). Los registros históricos del archivo de extracción no se reescriben como si sus métricas fueran las de esta edición final.

[↑ Volver al índice](#indice)
