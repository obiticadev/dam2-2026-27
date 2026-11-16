# UT02 · Referencias y material complementario

[Inicio de la entrega](../../INDICE.md) · [Documentación de UT02](INDICE.md) · [JDBC](../contenidos/3A-manejo-de-conectores.md) · [SQLite](../contenidos/3B-sqlite.md)

Se agrupan los enlaces por su función y se elimina la duplicación de etiquetas como «página», «enlace» o letras aisladas. Las páginas web requieren conexión; el PDF complementario está incluido localmente.

<a id="indice"></a>
## Índice de apartados

- [JDBC: API y tutorial](#nav-jdbc-api-y-tutorial)
- [Conectores y motores](#nav-conectores-y-motores)
- [SQLite y Chinook](#nav-sqlite-y-chinook)
- [PDF y vídeos complementarios](#nav-pdf-y-videos-complementarios)
- [Alcance de la comprobación](#nav-alcance-de-la-comprobacion)

<a id="nav-jdbc-api-y-tutorial"></a>
## JDBC: API y tutorial

| Referencia | Para qué consultarla |
|---|---|
| [Paquete java.sql · Java 11](https://docs.oracle.com/en/java/javase/11/docs/api/java.sql/java/sql/package-summary.html) | Clases e interfaces de JDBC. |
| [Connection · Java 11](https://docs.oracle.com/en/java/javase/11/docs/api/java.sql/java/sql/Connection.html) | Conexión, transacciones y creación de sentencias. |
| [PreparedStatement · Java 11](https://docs.oracle.com/en/java/javase/11/docs/api/java.sql/java/sql/PreparedStatement.html) | Parámetros y ejecución de sentencias preparadas. |
| [ResultSet · Java 11](https://docs.oracle.com/en/java/javase/11/docs/api/java.sql/java/sql/ResultSet.html) | Cursores, tipos, concurrencia y actualización. |
| [DatabaseMetaData · Java 11](https://docs.oracle.com/en/java/javase/11/docs/api/java.sql/java/sql/DatabaseMetaData.html) | Catálogos, esquemas, tablas y capacidades del driver. |
| [Tipos SQL: java.sql.Types](https://docs.oracle.com/en/java/javase/11/docs/api/java.sql/java/sql/Types.html) | Tipos utilizados por setNull y parámetros OUT. |
| [DataSource · Java 11](https://docs.oracle.com/en/java/javase/11/docs/api/java.sql/javax/sql/DataSource.html) | Configuración de fuentes de datos. |
| [Tutorial JDBC de Oracle: recuperación y modificación de resultados](https://docs.oracle.com/javase/tutorial/jdbc/basics/retrieving.html) | Ejemplos históricos de ResultSet; contrastar con la versión de Java utilizada. |

[↑ Volver al índice](#indice)

<a id="nav-conectores-y-motores"></a>
## Conectores y motores

| Referencia | Contenido |
|---|---|
| [MySQL Connector/J · Descarga oficial](https://dev.mysql.com/downloads/connector/j/) | Driver JDBC de MySQL. |
| [Formato de URL de Connector/J 8.0](https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-jdbc-url-format.html) | Sintaxis y opciones de conexión del entorno docente. |
| [MySQL: procedimientos almacenados](https://dev.mysql.com/doc/refman/8.0/en/stored-routines.html) | Creación y uso de procedimientos y funciones. |
| [Oracle: drivers JDBC y UCP](https://www.oracle.com/database/technologies/jdbc-ucp-downloads.html) | Descargas oficiales; elegir la versión compatible con el JDK y servidor. |
| [Java Native Interface · Definición](https://es.wikipedia.org/wiki/Java_Native_Interface) | Contexto para los drivers que dependen de código nativo. |

La «I» suelta del índice anterior era el primer carácter de un enlace dividido a una introducción Oracle. No era otro recurso. Se retira la duplicación; la referencia oficial de drivers anterior tiene un nombre completo. También se eliminan enlaces laterales sin función didáctica aquí, como un dominio de VB.NET usado únicamente para enlazar el nombre del lenguaje.

[↑ Volver al índice](#indice)

<a id="nav-sqlite-y-chinook"></a>
## SQLite y Chinook

| Referencia | Contenido |
|---|---|
| [SQLite: descargas oficiales](https://www.sqlite.org/download.html) | Herramientas y bibliotecas por plataforma. |
| [SQLite: manual de la consola](https://www.sqlite.org/cli.html) | Órdenes con punto, importación y formato de salida. |
| [SQLite: lenguaje SQL](https://www.sqlite.org/lang.html) | Índice de la sintaxis SQL implementada. |
| [SQLite: tipos y afinidades](https://www.sqlite.org/datatype3.html) | Diferencia entre clase de almacenamiento y tipo declarado. |
| [SQLite: ALTER TABLE](https://www.sqlite.org/lang_altertable.html) | Operaciones admitidas y sus restricciones. |
| [SQLite: claves foráneas](https://www.sqlite.org/foreignkeys.html) | Activación, acciones referenciales y validación. |
| [SQLite: transacciones](https://www.sqlite.org/lang_transaction.html) | BEGIN, modos de transacción y comportamiento de bloqueo. |
| [DB Browser for SQLite · Descargas](https://sqlitebrowser.org/dl/) | Cliente gráfico de escritorio. |
| [Chinook · Proyecto oficial](https://github.com/lerocha/chinook-database) | Base de ejemplo y scripts por motor. |
| [SQLite Tutorial: creación de tablas](https://www.sqlitetutorial.net/sqlite-create-table/) | Contexto de los diagramas de contactos y proveedores del aula. |

[↑ Volver al índice](#indice)

<a id="nav-pdf-y-videos-complementarios"></a>
## PDF y vídeos complementarios

- **[Tutorial de incorporación del driver JDBC a Eclipse · PDF local](../pdf/tutorial-driver-jdbc-eclipse.pdf).** Universidad de Cádiz, Ángel Manuel Gamaza Domínguez y José Miguel Otte Sainz-Aguirre. Se conserva el archivo original y no se incrustan su portada, sus páginas de cortesía ni una transcripción defectuosa del código.

- **[Curso Java. Acceso a BBDD. JDBC I. Vídeo 201](https://youtu.be/cFLsynl91B0)** — pildorasinformaticas. Sustituye a la etiqueta que mostraba solamente el identificador del vídeo.

- **[Curso Java. Acceso a BBDD. JDBC II. Vídeo 202](https://youtu.be/TipyOAYGsdc)** — pildorasinformaticas. Complemento de consultas JDBC, no documento local ni dependencia del proyecto.

Los títulos y autores de los vídeos se consultaron mediante sus metadatos oEmbed. No se afirma que se hayan visionado íntegramente ni que todos sus ejemplos estén actualizados.

[↑ Volver al índice](#indice)

<a id="nav-alcance-de-la-comprobacion"></a>
## Alcance de la comprobación

Los enlaces con acceso restringido o respuestas de bloqueo no se dan por rotos automáticamente. La [validación final](../../documentacion/VALIDACION.md) registra la respuesta obtenida al revisar los destinos públicos. Una respuesta HTTP correcta no certifica toda la precisión del contenido de una web externa.

[↑ Volver al índice](#indice)
