# Ejercicio 5 - Transacciones JDBC

[← UT02 · Índice de la unidad](../INDICE.md)

> **Unidad:** UT02 · Manejo de conectores  
> **Tipo de recurso:** Ejercicio  
> **Fuente:** [Aula virtual](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218716)

> **Criterio editorial:** contenido del aula sin resumir ni actualizar sus versiones. Se mejora la estructura y se normalizan los espacios de sangría del código; los archivos originales permanecen intactos.

## Índice

- [Enunciado](#enunciado)
- [Fuentes locales y adjuntos](#fuentes-locales-y-adjuntos)

---

<a id="contenido"></a>
<a id="enunciado"></a>
## Enunciado

**Contexto:** La base de datos `world` de MySQL contiene, entre otras, la tabla `country` con información de todos los países: código ISO, nombre, continente, población, Expectativa de vida (`LifeExpectancy`), PIB (`GNP`), etc.

**Tarea a realizar:**

Se desea implementar un método Java que actualice **de forma transaccional** la información de **dos países** en la tabla `country`. La operación consiste en:

1. Incrementar la población (`Population`) del país con código `'ESP'` (España) en **1.000.000** de habitantes.
2. **Restar** esa misma cantidad de población al país con código `'FRA'` (Francia).
3. La operación debe ser **atómica**: o se aplican ambos cambios, o no se aplica ninguno. Si el segundo `UPDATE` falla (por ejemplo, porque el código de país no existe), se debe deshacer el primero.
4. Provoca el **error** y comprueba que no actualiza los dos registros

<a id="fuentes-locales-y-adjuntos"></a>
## Fuentes locales y adjuntos

<details>
<summary>Consultar los HTML y archivos originales</summary>

- [contenido.html](../originales/UT02-manejo-de-conectores/218716-Ejercicio%205%20-%20Transacciones%20JDBC%20P%C3%A1gina/contenido.html)

</details>
