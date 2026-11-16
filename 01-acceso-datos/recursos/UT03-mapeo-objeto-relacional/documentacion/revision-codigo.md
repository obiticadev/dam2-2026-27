# Revisión del código docente — UT03

## Criterio y trazabilidad

Revisión estática de los **144 bloques Markdown originales**: 70 en 4A, 7 en 4B y 67 en 4C, más los ocho archivos de texto del paquete. La numeración de esta revisión cuenta cada bloque delimitado por tres acentos graves en su orden original, incluidos fragmentos, salidas, gramática y contraejemplos. No es la métrica histórica de bloques HTML del manifiesto de extracción.

Las tablas cubren todos esos bloques, agrupando los que comparten tratamiento. **Revisado no significa compilado aisladamente.** Muchos omiten imports, métodos o clases deliberadamente, o muestran fallos intencionados. Los bloques originales se conservan sin alteración. Las soluciones completas se añaden al final de cada libro, identificadas como edición local; son las que se extraen, compilan y prueban según [Verificación](verificacion.md).

## 4A — 70 bloques

Referencia: [libro y solución completa](../contenidos/4A-mapeo-objeto-relacional.md#ejemplos-revisados).

| Bloques | Diagnóstico y tratamiento |
|---|---|
| 1 | Entidad Profesor con numeración de líneas. Añadir imports y `Serializable`; no copiar `1:` como Java. Clase completa equivalente en `Mapeos.Profesor`. |
| 2–3 | Fragmentos de arranque nativo/JPA, no alternativas intercambiables sin configuración. 4B desarrolla el arranque nativo. Cerrar la fábrica al final. |
| 4 | XML etiquetado como Java y valores de marcador. No es una configuración operativa. 4B aporta XML completo, sin números de línea. |
| 5–7 | Uno a uno unidireccional: métodos/constructores omitidos y PK compartida sin desarrollar. Sustituido editorialmente por FK única y cascada probada; no se mezcla con PK compartida. |
| 8–10 | Bidireccional con anotaciones de propietario en ambos lados. Solución: un único propietario y `mappedBy` en el inverso, sincronizando referencias. |
| 11–12 | Esquema relacional y flechas: pseudocódigo, no Java. |
| 13–15 | Uno a muchos Set: faltan imports/métodos y la colección no se inicializa en la entidad. Solución `avisos`, inicializada y con FK en el hijo. |
| 16–18 | Lista con `@IndexColumn` de versiones antiguas. Se usa `@OrderColumn`, posición persistida y prueba de reordenación y eliminación de huérfanos. |
| 19–20 | Esquema relacional y FK: pseudocódigo. |
| 21–23 | Muchos a muchos con `new HashSet()` sin genéricos y ALL en ambos lados: riesgo de eliminar entidades compartidas. Solución con PERSIST/MERGE, propietario e inverso y helpers. |
| 24–28 | Anotaciones aisladas que ilustran cascada; no recomendación universal. Evitar REMOVE sobre muchos a muchos y sobre padres compartidos en muchos a uno. |
| 29 | Prosa marcada como Java; no compilable ni parte de un programa. |
| 30–31 | Factura/LineaFactura parciales: falta ID, entidad hija y métodos; no son clases completas. Ilustran ciclo de vida dependiente. Su mecánica ALL/orphanRemoval se desarrolla y prueba con Profesor/Correo, no se inventa una práctica de facturación. |
| 32–33 | Usuario parcial y equals por login. Faltan getters; el login debe ser una clave natural no nula, única e inmutable para sostener esta política de igualdad. El tratamiento de dos null como iguales es peligroso. No se incorpora esa política a las entidades de referencia. |
| 34 | **Error de compilación:** `resultado` no inicializado. Inicializar a 1 antes de multiplicar o usar `Objects.hash(login)` con un equals coherente. Igualdad por valor probada en EmployeeId. |
| 35 | IDENTITY depende del motor; clase parcial sin imports/accesores. Se desarrolla en Profesor para H2. |
| 36 | Falta declarar `@SequenceGenerator`. Solución completa en Ciclo con mismo nombre de generador y secuencia. |
| 37 | EmployeeId por valor: retirar prefijos `>` del código y añadir imports. No modificar la clave tras persistir. Solución escalar completa en Mapeos. |
| 38–49 | Fragmentos de claves compuestas: `serializable` en minúscula, `mappedBy` sin comillas, `Employees` en vez de `Employee`, llaves dispersas y puntos suspensivos. No son un conjunto compilable. Reemplazo completo con EmbeddedId/MapsId, Company/Employee/Phone. |
| 50 | EmployeeId escalar completo salvo imports. Solución equivalente con tipos Long coherentes en ambas FK/PK y equals/hashCode. |
| 51–54 | Company y Employee sin constructor vacío explícito al tener otros constructores; asociación read-only y relación incompleta en memoria al crear el empleado con company null. Solución con constructor JPA, helper addEmployee y MapsId; Phone se carga por sus dos columnas. |
| 55–58 | Variante Hibernate con relación dentro de EmbeddedId. **Error de modelo:** `Set<EmployeeId>` no es un OneToMany de entidades; `mappedBy="company"` no apunta a una propiedad de Employee y `e1` nunca se persiste. Se elige y prueba la variante portable escalar + MapsId en vez de mantener dos modelos incompatibles. |
| 59 | Borrado sin transacción/cierre y sin comprobar null. Patrón completo en 4B y borrado con cascadas en las pruebas. |
| 60–61 | Ambos usan get aunque el texto explica load. Get devuelve null; load puede ser proxy y fallar más tarde. Añadir transacción y cierre. |
| 62 | Evict desconecta, no borra. Fragmento de ciclo de vida, no CRUD completo. |
| 63 | Merge sin transacción: seguir la instancia devuelta, que es distinta del objeto separado. Prueba específica de merge. |
| 64 | Refresh sobre objeto creado con new: no usar como ejemplo JPA portable. Cargar la entidad gestionada y refrescar dentro de la transacción. |
| 65 | Bloqueo sin transacción. Solución probada con PESSIMISTIC_WRITE dentro de una; no certifica concurrencia entre clientes. |
| 66 | Traza SQL de ejemplo, no código Java. |
| 67–68 | Demostración intencional de LazyInitializationException. Se conserva; prueba tanto el fallo esperado como la solución join fetch antes de cerrar sesión. |
| 69–70 | Demostración intencional de NonUniqueObjectException al asociar dos instancias con el mismo ID. No «arreglar» la traza; usar instancia gestionada o merge según objetivo. |

## 4B — 7 bloques

Referencia: [proyecto revisado](../contenidos/4B-proyecto-hibernate-oracle-maven.md#proyecto-revisado).

| Bloques | Diagnóstico y tratamiento |
|---|---|
| 1 | Dependencias incompletas y `hibernate-testing` para una aplicación. Usar `hibernate-core`, el driver del motor y POM completo. No mezclar javax/jakarta. |
| 2 | XML con espacio antes de la declaración; copiarlo así puede invalidar el prólogo. Credenciales ficticias, nombre de servicio y dialecto dependen del servidor. XML de referencia válido en 4B. |
| 3 | Usuario sin cierre de clase, imports ni accesores y con contraseña en claro. Solución completa con acceso por campos, sin enseñar almacenamiento de contraseñas en claro. |
| 4 | HibernateUtils no cierra fábrica y omite imports; ruta del classpath descrita imprecisamente en la prosa. Solución con importaciones, constructor privado y shutdown de aplicación. |
| 5–6 | Un mismo Main dividido por el Markdown y por un `finally` fuera del bloque. No copiar cada fragmento como archivo. Solución completa con try-with-resources y rollback. |
| 7 | Import Usuario desde paquete distinto al mapeo, atributos parciales, excepción silenciada y fábrica sin cerrar. Solución con paquetes coherentes, entidad completa, comprobación CRUD, rollback y propagación del error. |

## Paquete de configuración — ocho archivos de texto

Los ocho originales están [integrados en 4B](../contenidos/4B-proyecto-hibernate-oracle-maven.md#configuracion-del-aula) y se conservan también en `adjuntos/` y en el ZIP íntegro.

| Archivo | Resultado de revisión |
|---|---|
| HibernateUtils.java | Import sin usar de StandardServiceRegistryBuilder; falta cierre de fábrica y paquete distinto a otros fragmentos. El import sobrante no es por sí mismo un error de compilación. |
| Main.java | **No compila:** catch sin try. Imports de Usuario y LocalDate sin implementación. Falta entidad y trabajo transaccional. Reemplazo completo en 4B. |
| MySQL hibernate.cfg.xml | Driver/dialecto coherentes con MySQL 8/Hibernate 5.4. Credenciales de ejemplo y base externa requeridas; `create` destructivo. Usar validate en un esquema propio preparado. |
| MySQL pom.xml | XML bien formado, pero nombre/artifact heredado de Oracle y sin garantías de plugins de compilación. Dependencias históricas; versión revisada común y tabla de adaptación en 4B. |
| Oracle hibernate.cfg.xml | URL por SID; no confundir con servicio. `create` destructivo; requiere esquema y permisos reales. Driver antiguo admite alias, se documenta oracle.jdbc.OracleDriver. |
| Oracle pom.xml | XML bien formado; dependencia y Java 11 coherentes a nivel de configuración, sin integración Oracle ejecutada. |
| SQLite hibernate.cfg.xml | Ruta Windows no portable, barras dobles literales en XML, `create` destructivo. El dialecto requiere el complemento de terceros. Usar ruta absoluta Linux y esquema preparado si se adapta. |
| SQLite pom.xml | Incluye driver y dialecto externo. No trasladar el dialecto a Hibernate 6/7. Las dependencias se prueban en un CRUD SQLite en memoria con esquema explícito; eso no acredita generación de esquema ni todos los mapeos de 4A. |

No se reescriben los ZIP ni sus archivos originales. Las advertencias editoriales y la solución están en los Markdown; no se presenta un archivo original defectuoso como ya corregido.

## 4C — 67 bloques

Referencia: [consultas revisadas](../contenidos/4C-consultas-hql-y-criterios.md#consultas-revisadas).

| Bloques | Diagnóstico y tratamiento |
|---|---|
| 1 | Gramática HQL, no Java. |
| 2–7 | Consultas introductorias y consulta errónea deliberada. El tipo concreto de excepción puede cambiar según versión. El FROM sin SELECT es HQL válido; el nombre es de entidad, no de tabla. |
| 8–12 | Ejemplos sobre mayúsculas: atributos y entidad sensibles a su nombre Java; comparación de valores depende de colación/motor, no es universalmente equivalente. |
| 13–15 | Filtros con texto y apóstrofo escapado. Para entradas del usuario usar parámetros, probado con apóstrofo y cadena de intento de inyección. |
| 16–21 | Literales numéricos y tipos de TiposBasicos: condicionados a una entidad no suministrada, no programas autónomos. |
| 22–24 | Fechas y horas como cadenas: sustituir por parámetros del tipo del atributo; portabilidad no garantizada. El mismo dateTime aparece para hora y timestamp, verificar modelo. |
| 25–28 | BETWEEN, IN, LIKE, IS NULL: sintaxis ilustrativa. `dataDate` no coincide con `dateDate`; falta modelo para decidir el nombre real. |
| 29–30 | Operadores lógicos y aritméticos: fragmentos HQL condicionados al modelo y tipos. |
| 31 | AVG/SUM/MIN/MAX/COUNT: resultados no todos Integer. Prueba completa comprueba tipos numéricos y valores. |
| 32 | Concatenación y `Id` cuya capitalización debe coincidir con el atributo Java (normalmente id). No asumir nombre de columna. Para código portable cualificar alias y usar parámetros. |
| 33–36 | Orden, group/having, subconsulta y producto cartesiano. Implementaciones de orden, agrupación y subconsulta probadas; producto cartesiano no equivale a relación. |
| 37–39 | Entidad Profesores inconsistente, asociación profesor.ciclo no demostrada y JOIN con ON vacío. Solución parte de la relación explícita Ciclo.profesor. |
| 40 | Concatenación de datos en HQL: vulnerable y frágil ante apóstrofos. Sustituir por parámetros. |
| 41 | **Java/HQL inválidos:** comillas y + mal formados, parámetros con nombre enlazados por posiciones. Solución tipada con setParameter por nombre. |
| 42–43 | Gramática y ejemplo UPDATE: necesitan transacción real. |
| 44 | **Error HQL:** falta espacio entre Profesor y set al concatenar. Solución renombrar, flush/clear y transacción. |
| 45–47 | Prosa, gramática y DELETE con ? heredado. Sustituir por parámetro con nombre; no son un programa completo. |
| 48 | Borrado masivo: necesita transacción y no aplica cascadas JPA. Se limita la solución a entidades sin relaciones. |
| 49 | Gramática INSERT SELECT de HQL 5, no Java. |
| 50 | **Error HQL:** profesor/Profesor, alias persona/p inconsistente. Solución con Person p y destino Profesor coherentes; advertencia sobre IDs explícitos. |
| 51–54 | Query sin tipar, entidad/proyección tupla/escalar. Soluciones tipadas Profesor, Object[] y String para eliminar casts y listas raw. |
| 55–56 | uniqueResult puede devolver null o fallar por varios resultados. Manejo de ambos casos probado. La traza es salida esperada, no Java para compilar. |
| 57–58 | Paginación sin límites de entrada ni overflow y recuento con cast int. Solución con validación, orden determinista, multiplyExact y cálculo long de páginas sin coma flotante. |
| 59–64 | Anotaciones de consultas nombradas fragmentadas y falta coma entre @NamedQuery. Definición completa compilada en Profesor. |
| 65 | Parámetros ? sin ordinal: cambiar a nombres o ?1/?2/?3. |
| 66 | Consulta nombrada sin tipar; solución tipada. |
| 67 | **Java inválido:** nombre sin comillas, falta punto y coma, setString heredado. Solución buscarNombrada con cadena y setParameter. |

## Qué se ha probado realmente

Compilación y trece pruebas de integración de los **archivos completos revisados**, extraídos directamente de los Markdown: doce sobre H2 y una de CRUD SQLite. Los fragmentos del aula que dependen de modelos ausentes quedan identificados como tales; no se inventa TiposBasicos ni se atribuye una implementación de Criteria al material original. Véanse [resultados, pasos y límites](verificacion.md).
