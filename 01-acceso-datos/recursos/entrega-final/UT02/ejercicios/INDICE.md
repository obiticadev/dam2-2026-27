# UT02 · Ejercicios y soluciones

[Inicio de la entrega](../../INDICE.md) · [JDBC](../contenidos/3A-manejo-de-conectores.md) · [SQLite](../contenidos/3B-sqlite.md)

Cada documento reúne el **enunciado**, la **solución revisada**, sus **requisitos** y las **comprobaciones**. Las soluciones son editoriales; las dos soluciones del aula se han tenido en cuenta sin conservar sus defectos de formato.

| Actividad | Qué se trabaja | Solución |
|---|---|---|
| **1 · Idiomas de España** | Consulta de varias filas y porcentajes. | [Enunciado y código](01-idiomas-espana.md) |
| **2 · Tablas de una base** | DatabaseMetaData, catálogo, esquema y recuento. | [Enunciado y código](02-metadatos-tablas.md) |
| **3 · Insertar, actualizar y borrar** | DML seguro sobre una fila temporal. | [Enunciado y código](03-insertar-actualizar-borrar.md) |
| **4 · Buscador de ciudades** | Teclado, parámetros, validación y ausencia de resultados. | [Enunciado y código](04-buscador-ciudades.md) |
| **5 · Transacciones entre países** | Commit, rollback y verificación de filas afectadas. | [Enunciado y código](05-transacciones-paises.md) |
| **6 · Práctica evaluable de salarios** | ResultSet actualizable y prioridad de las subidas. | [Enunciado, código y resultados esperados](06-practica-salarios.md) |
| **7 · Procedimiento de clientes** | Actividad integrada en el libro 3A; SQL y CallableStatement. | [Desarrollo completo](07-procedimiento-clientes.md) |
| **8 · Consultas Chinook** | Actividad integrada en el libro 3B; consola, jazz y facturación. | [Consultas resueltas](08-chinook-sqlite.md) |

> **Preparación común.** Los archivos Java utilizan Java 11 o superior, el driver correspondiente y las clases `Conexion` y `Transacciones` de la [guía de entorno y pruebas](../documentacion/entorno-y-pruebas.md). No son proyectos independientes que deban compilarse sin esas clases.

Para los ejercicios 1–5 se utiliza el esquema de ejemplo MySQL **world**. No viene necesariamente instalado con Workbench: hay que importarlo. Las pruebas automáticas usan datos mínimos controlados, no afirman reproducir toda la base world.
