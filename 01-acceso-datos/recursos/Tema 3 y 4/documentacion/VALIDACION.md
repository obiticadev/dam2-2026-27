# Validación de la entrega final

[Inicio de la entrega](../INDICE.md) · [Índice general de documentación](INDICE.md)

Esta página registra las comprobaciones efectivamente ejecutadas sobre los archivos finales. No se utilizan las métricas históricas de extracción como sustituto de la revisión editorial o técnica.

<a id="indice"></a>
## Índice de apartados

- [Código y SQL](#nav-codigo-y-sql)
- [Presentación y navegación](#nav-presentacion-y-navegacion)
- [Referencias públicas y recursos externos](#nav-referencias-publicas-y-recursos-externos)
- [Límites](#nav-limites)

<a id="nav-codigo-y-sql"></a>
## Código y SQL

Comprobado el **16 de noviembre de 2026**, con OpenJDK **25.0.5** y Maven **3.9.11**, compilando los archivos documentados con `--release 11`.

| Conjunto | Resultado |
|---|---|
| UT02 · JDBC | **18 pruebas, 0 fallos, 0 errores, 0 omitidas. BUILD SUCCESS.** |
| UT03 · Hibernate | **13 pruebas, 0 fallos, 0 errores, 0 omitidas. BUILD SUCCESS.** |
| SQLite · Contactos, grupos y proveedores | Esquemas, FK, UNIQUE, cascada de borrado y punto de retorno comprobados. |
| SQLite · Chinook | Consultas ejecutadas sobre una muestra mínima: álbum de jazz sin duplicación y total por cliente, incluidos los que no tienen facturas. |

Los **22 archivos de proyecto** —14 de JDBC y 8 de Hibernate— se extraen de los bloques de esta edición. Incluyen 17 clases/archivos Java, dos POM, un XML de Hibernate y dos cargas SQL. El manifiesto permite contrastar sus huellas con los archivos que se compilaron. No se ejecuta una solución paralela no incluida en los apuntes.

Se comprueban, entre otros, consultas y ordenación, valores con comillas, intentos de inyección, DML sin alterar filas ajenas, rollback con país inexistente, los catorce salarios y su prioridad, aborto antes de commit, cursor con actualización/inserción/borrado, Map de ventas, relaciones ORM, claves compuestas, HQL, Criteria y carga diferida.

**Reproducir:** seguir las instrucciones completas en la documentación de cada unidad. Los proyectos se generan en una carpeta temporal y se usan bases en memoria; no hace falta modificar las bases del usuario para ejecutar las pruebas.

Se observaron avisos de las bibliotecas históricas y Maven sobre API internas/acceso nativo al utilizar JDK 25. No se ocultaron y no impidieron la compilación o las pruebas. La compatibilidad futura de esas versiones no queda garantizada; tampoco se afirma una ejecución real sobre todos los JDK desde Java 11.

[↑ Volver al índice](#indice)

<a id="nav-presentacion-y-navegacion"></a>
## Presentación y navegación

Se renderizaron los **27 documentos Markdown** —incluidos los tres índices de documentación— con tablas, bloques de código, títulos, listas y citas. Se inspeccionaron vistas de todas las secciones de los cinco temas y las vistas iniciales de las actividades y documentación, además de capturas a tamaño completo de los apartados que mostraban los defectos señalados.

- Sin asteriscos de negrita literales fuera del código ni encabezados artificialmente pequeños de nivel 4–6.
- Java formateado con cuatro espacios por nivel; los ejemplos completos se compilan después de aplicar el formato.
- Cursores presentados en una tabla de métodos clara, sin palabras pegadas ni la errata `last::`.
- PDF disponible mediante enlace local, sin portadas gigantes ni trece apartados de páginas extraídas.
- Referencias agrupadas con nombres descriptivos; títulos y autores de los cuatro vídeos identificados mediante oEmbed.
- Índices locales en contenidos y documentación, subapartados indentados en los bloques que lo requieren y enlaces de retorno al índice del documento. Los bloques pequeños no reciben niveles de navegación redundantes.
- **24 imágenes didácticas**, decodificadas y enlazadas —25 inserciones porque el esquema Chinook se reutiliza—, conservadas byte a byte.
- Ninguna imagen ausente ni destino o ancla local roto. Toda la navegación de la entrega queda dentro de su carpeta, salvo los enlaces web explícitos.
- Sin desbordamiento horizontal de página en la vista de escritorio comprobada. El formato final es Markdown estándar; no depende del CSS usado para la previsualización de revisión.

La inspección detectó una tabla de adaptación de motores demasiado ancha: se sustituyó por apartados independientes de MySQL, Oracle y SQLite. Las capturas de revisión se generan fuera de la entrega; no se incluyen como nuevas páginas del temario.

[↑ Volver al índice](#indice)

<a id="nav-referencias-publicas-y-recursos-externos"></a>
## Referencias públicas y recursos externos

Se examinaron **38 destinos públicos** de la edición: 31 respondieron con acceso correcto, cuatro vídeos se identificaron mediante sus metadatos y tres direcciones de MySQL devolvieron **HTTP 403** al cliente de comprobación. Estas últimas se conservan como referencias oficiales con **acceso no confirmado desde este entorno**, no se etiquetan automáticamente como enlaces rotos:

- Descarga de Connector/J.
- Formato de URL de Connector/J 8.0.
- Documentación de procedimientos almacenados MySQL 8.0.

Los enlaces del aula requieren autenticación y no se dan por validados públicamente. Una respuesta HTTP correcta no certifica todo el contenido de una web ni que un vídeo se haya visionado por completo.

El detalle de destinos, huellas, clases probadas y comprobaciones se registra en el manifiesto JSON de esta carpeta. Los originales del aula permanecen en el archivo exterior; esta edición no modifica sus bytes ni atribuye al profesor las soluciones editoriales.

[↑ Volver al índice](#indice)

<a id="nav-limites"></a>
## Límites

- No se ha certificado la integración contra servidores MySQL ni Oracle ni la concurrencia real de varios clientes.
- La base completa Chinook y los servidores del usuario no forman parte del entorno de prueba.
- No se reconstruyen los dos diagramas HQL inaccesibles ni el proyecto oficial ausente de 4B.
- El código de lectura es estático. Los proyectos de prueba se materializan fuera de la entrega y solo al ejecutar voluntariamente los bloques de reproducción.
- No se ha incorporado nada a Obsidian ni se ha publicado la entrega.

[↑ Volver al índice](#indice)
