# Ejercicio 4 - Buscador de Ciudades - PreparedStatement

[← UT02 · Índice de la unidad](../INDICE.md)

> **Unidad:** UT02 · Manejo de conectores  
> **Tipo de recurso:** Ejercicio  
> **Fuente:** [Aula virtual](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218671)

> **Criterio editorial:** contenido del aula sin resumir ni actualizar sus versiones. Se mejora la estructura y se normalizan los espacios de sangría del código; los archivos originales permanecen intactos.

## Índice

- [Enunciado](#enunciado)
- [Fuentes locales y adjuntos](#fuentes-locales-y-adjuntos)

---

<a id="contenido"></a>
<a id="enunciado"></a>
## Enunciado

**"Buscador de ciudades por país y población mínima"**

Para la base de datos "world", crea un programa Java con JDBC que:

1. Pida al usuario por teclado el **nombre de un país** (ej. `Spain`) y una **población mínima** (ej. `100000`).
2. Use una **sentencia preparada** con parámetros para consultar en la tabla `city` todas las ciudades de ese país cuya población sea mayor o igual al valor indicado.
3. Muestre por pantalla: nombre de la ciudad, distrito y población, ordenadas de mayor a menor población.
4. Si no hay resultados, muestre un mensaje informativo.
5. Controle las posibles excepciones `SQLException` e `InputMismatchException`.

**Requisito clave:** Usa `PreparedStatement` con parámetros `?` (no concatenación de cadenas).

<a id="fuentes-locales-y-adjuntos"></a>
## Fuentes locales y adjuntos

<details>
<summary>Consultar los HTML y archivos originales</summary>

- [contenido.html](../originales/UT02-manejo-de-conectores/218671-Ejercicio%204%20-%20Buscador%20de%20Ciudades%20-%20PreparedStatement%20P%C3%A1gina/contenido.html)

</details>
