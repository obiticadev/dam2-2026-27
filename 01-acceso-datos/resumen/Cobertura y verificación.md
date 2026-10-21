# Cobertura, procedencia y verificación

Este registro es auxiliar: no hace falta subirlo a NotebookLM.

**Alcance vigente:** UT02-A sin NIO; UT02-B completo. La exclusión procede de la indicación expresa del estudiante y solo se aplica a estos entregables. No se ha modificado la bóveda ni la nota de examen anterior.

Cada resumen contiene desarrollo elaborado y el texto docente pertinente como anexo. Las repeticiones originales se conservan por integridad documental, pero no se deben volver a explicar por duplicado en los audios.

## Límites de la comprobación

- La comparación textual verifica conservación del anexo tras las transformaciones declaradas, no la verdad de cada frase docente.
- Las imágenes se mantienen como enlaces locales al temario; no se promete que NotebookLM las lea. El esquema XSD y modelo JAXB relevantes se explican en texto en B13.
- Se compilan y ejecutan los dos laboratorios añadidos, no todos los programas originales. JAXB se revisa documentalmente, no se declara ejecutado.
- No se ha usado la interfaz de NotebookLM ni generado audios reales. Sus salidas deben revisarse; seis opciones y cantidades son instrucciones, no funciones garantizadas del cuestionario nativo.

## UT02-A

**Fuente:** `temario/UT02-A-manejo-de-ficheros.md`.

**SHA-256 original (bytes):** `a2746eb2902b0fe15412450967f61739d02ec6beee69c201270d805c297ebf3e`.

| Apartado original | Desarrollo elaborado | Respaldo |
|---|---|---|
| 1. Introducción | A01 | Anexo del resumen UT02-A |
| 2. java.io | A02 | Anexo del resumen UT02-A |
| 2.1. Streams o flujos | A01, A02 | Anexo del resumen UT02-A |
| 2.2. Clases asociadas a los flujos | A02 | Anexo del resumen UT02-A |
| 2.3. Formas de acceso a un fichero | A03 | Anexo del resumen UT02-A |
| 2.4. Clase File | A04 | Anexo del resumen UT02-A |
| 2.5. Creación y eliminación de ficheros y directorios | A04 | Anexo del resumen UT02-A |
| 2.6. Interfaz `FilenameFilter` | A05 | Anexo del resumen UT02-A |
| 2.7. Flujos basados en bytes | A06 | Anexo del resumen UT02-A |
| Escritura de bytes en un fichero: `FileOutputStream` | A06 | Anexo del resumen UT02-A |
| Lectura de bytes de un fichero: `FileInputStream` | A06 | Anexo del resumen UT02-A |
| 2.8. Serialización de objetos | A07 | Anexo del resumen UT02-A |
| 2.9. Ejemplo de serialización de objetos | A07 | Anexo del resumen UT02-A |
| 2.10. Flujos basados en caracteres | A08 | Anexo del resumen UT02-A |
| Clase `Reader` | A08 | Anexo del resumen UT02-A |
| Clase `InputStreamReader` | A08 | Anexo del resumen UT02-A |
| Clase `FileReader` | A08 | Anexo del resumen UT02-A |
| Clase `BufferedReader` | A08 | Anexo del resumen UT02-A |
| Clase `Writer` | A08 | Anexo del resumen UT02-A |
| Clase `FileWriter` | A08 | Anexo del resumen UT02-A |
| Clase `BufferedWriter` | A08 | Anexo del resumen UT02-A |
| 2.11. Operaciones básicas sobre ficheros de acceso secuencial | A09 | Anexo del resumen UT02-A |
| 2.12. Operaciones básicas sobre ficheros de acceso aleatorio | A10 | Anexo del resumen UT02-A |
| Ficheros de acceso aleatorio (o directo). Clase `RandomAccessFile` | A10 | Anexo del resumen UT02-A |
| Constructores | A10 | Anexo del resumen UT02-A |
| Métodos principales de `RandomAccessFile` | A10 | Anexo del resumen UT02-A |
| 2.13. Enlaces de interés | A15 y anexo documental | Anexo del resumen UT02-A |

**Transformaciones:**

- Codificación de salida UTF-8 y finales de línea LF.
- Encabezados docentes desplazados un nivel y prefijados para distinguirlos del desarrollo elaborado; contenido de código sin modificar.
- Rutas ./img/ adaptadas a ../temario/img/ para conservar recursos originales.
- Excluido íntegramente el capítulo 3 (NIO).
- Omitido el tramo introductorio de comparación IO/NIO y su enlace externo en 2.13; omisión expresa, no pérdida accidental.

## UT02-B

**Fuente:** `temario/UT02-B-librerias-xml-java.md`.

**SHA-256 original (bytes):** `c6a01ed53243ad027e539616e16bfca012ed9a7892bfb75729bc8039cbd79133`.

| Apartado original | Desarrollo elaborado | Respaldo |
|---|---|---|
| 1. Introducción | B01 | Anexo del resumen UT02-B |
| 1.1. _Parser_ o analizador XML | B01, B02 | Anexo del resumen UT02-B |
| 1.2. DOM vs SAX | B02 | Anexo del resumen UT02-B |
| 1.3. Serialización del XML | B02, B12 | Anexo del resumen UT02-B |
| 2. DOM | B03, B06 | Anexo del resumen UT02-B |
| Operaciones con DOM | B03, B06 | Anexo del resumen UT02-B |
| 2.1. Ejemplo de DOM | B03, B06 | Anexo del resumen UT02-B |
| 2.2. Jerarquía de clases del paquete `javax.xml.parsers` | B03, B04 | Anexo del resumen UT02-B |
| 2.3. La estructura DOM | B04, B05, B06 | Anexo del resumen UT02-B |
| Interfaces DOM principales | B04, B05, B06 | Anexo del resumen UT02-B |
| Métodos DOM más usuales | B04, B05, B06 | Anexo del resumen UT02-B |
| 2.4. Ejemplo completo | B05 | Anexo del resumen UT02-B |
| 2.5. Creación de un fichero XML a partir de un documento | B06 | Anexo del resumen UT02-B |
| 3. SAX | B07 | Anexo del resumen UT02-B |
| 3.1. ¿Cómo funciona SAX? | B07 | Anexo del resumen UT02-B |
| ¿Cómo funcionan los manejadores de eventos? | B07 | Anexo del resumen UT02-B |
| 3.2. Cómo leer un archivo XML con SAX | B08 | Anexo del resumen UT02-B |
| 4. StAX | B09 | Anexo del resumen UT02-B |
| 4.1. Características | B09 | Anexo del resumen UT02-B |
| Funcionamiento de StAX | B09 | Anexo del resumen UT02-B |
| 4.2. API de cursor | B10 | Anexo del resumen UT02-B |
| 4.3. API de iteradores | B11 | Anexo del resumen UT02-B |
| 5. Enlace de datos XML | B12, B13 | Anexo del resumen UT02-B |
| 5.1. Clases de mapeo. Anotaciones | B12 | Anexo del resumen UT02-B |
| Anotaciones principales | B12 | Anexo del resumen UT02-B |
| Parámetros de las anotaciones | B12 | Anexo del resumen UT02-B |
| 5.2. Ejemplo de anotaciones | B12, B13 | Anexo del resumen UT02-B |
| 5.3. El proceso de enlace de JAXB | B13 | Anexo del resumen UT02-B |
| _Marshal_ (serialización) | B13 | Anexo del resumen UT02-B |
| _Unmarshal_ (deserialización) | B13 | Anexo del resumen UT02-B |
| 5.4. Ejemplo de _marshal_ y _unmarshal_ | B13 | Anexo del resumen UT02-B |

**Transformaciones:**

- Codificación de salida UTF-8 y finales de línea LF.
- Encabezados docentes desplazados un nivel y prefijados para distinguirlos del desarrollo elaborado; contenido de código sin modificar.
- Rutas ./img/ adaptadas a ../temario/img/ para conservar recursos originales.

## Prompts comprobados

- 16 prompts de podcast: ocho por unidad.
- 21 prompts de cuestionario, simulacro, auditoría o repaso adaptativo: ocho por unidad y cinco mixtos.
- Cada prompt tiene su bloque independiente y declara explícitamente la exclusión de NIO.
- Markdown sin wikilinks dependientes de Obsidian; bloques de código cerrados y recursos de imagen locales existentes.

## Resultado de los laboratorios añadidos

Compilación con `javac --release 17 -encoding UTF-8` y ejecución en directorios temporales aislados con el JDK local. Salida comparada exactamente. En `PruebaFicheros` también se comprueba el archivo binario de 36 bytes, el registro modificado y el texto escrito. No quedan `.class` en la carpeta de resúmenes.

- `PruebaFicheros`: **correcto**; salida y comprobaciones satisfechas.
- `PruebaXml`: **correcto**; salida y comprobaciones satisfechas.

JAXB: **no ejecutado**; el resumen documenta dependencias y límites.

No se ha ejecutado el auditor de la bóveda: estos entregables están fuera de Obsidian y no modifican sus notas, registros ni enlaces. Se han comprobado aquí estructura, recursos locales, conservación del anexo y laboratorios pertinentes.
