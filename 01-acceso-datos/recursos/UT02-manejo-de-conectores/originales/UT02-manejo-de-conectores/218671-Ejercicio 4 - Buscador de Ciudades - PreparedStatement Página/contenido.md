Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218671

## Ejercicio 4 - Buscador de Ciudades - PreparedStatement

Requisitos de finalización

**"Buscador de ciudades por país y población mínima"**

Para la base de datos "world", crea un programa Java con JDBC que:

1. Pida al usuario por teclado el **nombre de un país** (ej. `Spain`) y una **población mínima** (ej. `100000`).
2. Use una **sentencia preparada** con parámetros para consultar en la tabla `city` todas las ciudades de ese país cuya población sea mayor o igual al valor indicado.
3. Muestre por pantalla: nombre de la ciudad, distrito y población, ordenadas de mayor a menor población.
4. Si no hay resultados, muestre un mensaje informativo.
5. Controle las posibles excepciones `SQLException` e `InputMismatchException`.

**Requisito clave:** Usa `PreparedStatement` con parámetros `?` (no concatenación de cadenas).

Última modificación: miércoles, 21 de octubre de 2026, 13:41

[◄ Ejercicio 3 - Sentencias DML](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218620&forceview=1)

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
Ejercicio 5 - Transacciones JDBC
Práctica Evaluable - UT02
4A Mapeo Objeto Relacional ORM
4B creación de un proyecto de mapeo con hibernate. Base de datos Oracle. Maven
4C Lenguaje de consultas de Hibernate (HQL)
Ficheros de configuración
Entrega de Anteproyecto

[Ejercicio 5 - Transacciones JDBC ►](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218716&forceview=1)