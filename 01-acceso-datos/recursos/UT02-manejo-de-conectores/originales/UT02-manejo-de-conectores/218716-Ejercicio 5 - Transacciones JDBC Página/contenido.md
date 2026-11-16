Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218716

## Ejercicio 5 - Transacciones JDBC

Requisitos de finalización

**Contexto:** La base de datos `world` de MySQL contiene, entre otras, la tabla `country` con información de todos los países: código ISO, nombre, continente, población, Expectativa de vida (`LifeExpectancy`), PIB (`GNP`), etc.

**Tarea a realizar:**

Se desea implementar un método Java que actualice **de forma transaccional** la información de **dos países** en la tabla `country`. La operación consiste en:

1. Incrementar la población (`Population`) del país con código `'ESP'` (España) en **1.000.000** de habitantes.
2. **Restar** esa misma cantidad de población al país con código `'FRA'` (Francia).
3. La operación debe ser **atómica**: o se aplican ambos cambios, o no se aplica ninguno. Si el segundo `UPDATE` falla (por ejemplo, porque el código de país no existe), se debe deshacer el primero.
4. Provoca el **error** y comprueba que no actualiza los dos registros

Última modificación: miércoles, 21 de octubre de 2026, 17:40

[◄ Ejercicio 4 - Buscador de Ciudades - PreparedStatement](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218671&forceview=1)

Saltar a actividad

Saltar a actividad
Avisos
Novedades
foro de dudas
Organización del proyecto Intermodular
Programación para Proyectos
Título y sinopsis del Proyecto Intermodular
Horario Curso
Procedimiento de reclamaciones
Curriculums para FFE
2A Manejo de ficheros
2B Librerías de tratamiento de XML en Java.
2B Librerías de tratamiento de XML en Java. Alternativa
Clases - Flujos de datos
Ejemplo de código Serialización
Ejemplo de manejo de Nodos en DOM
Fichero cd\_catalog.xml para ejemplo 2.1. Ejemplo de DOM
Presentación del curso
Ejercicio1 - Clase File
Solución - Ejercicio1 - Clase File
Ejercicio2 - Visualizar fichero
Solución - Ejercicio2 - Visualizar fichero
Ejercicio3- Fichero de acceso aelatorio
Solución - Ejercicio3 - Fichero de acceso aelatorio
Práctica Evaluable - UT01
Solución - Práctica Evaluable - UT01
Entrega Examen Ejercicio 04/11/2026
3A Manejo de conectores.
3B BASES DE DATOS EMBEBIDAS. SQLite
Ejercicio 1 - Recorrer una selección múltiple (No evaluable)
Solución Ejercicio 1 - Recorrer una selección múltiple
Ejercicio 2 - Tablas de una base de datos (No evaluable)
Solución Ejercicio 2 - Tablas de una Base de datos
Ejercicio 3 - Sentencias DML
Ejercicio 4 - Buscador de Ciudades - PreparedStatement
Práctica Evaluable - UT02
4A Mapeo Objeto Relacional ORM
4B creación de un proyecto de mapeo con hibernate. Base de datos Oracle. Maven
4C Lenguaje de consultas de Hibernate (HQL)
Ficheros de configuración
Entrega de Anteproyecto

[Práctica Evaluable - UT02 ►](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/assign/view.php?id=219702&forceview=1)