# Cobertura, procedencia y verificación

Este registro es auxiliar: no hace falta subirlo a NotebookLM.

**Alcance vigente:** Tema 1 y Tema 2 completos, primer examen de PMDM, fecha prevista el 30 de octubre de 2026. Los PDF de Sensores y Multimedia son referencias citadas. El alcance y la fecha coinciden con la nota de examen de la bóveda, que solo se ha leído.

Cada resumen contiene desarrollo elaborado y el texto docente íntegro como anexo. Las repeticiones originales se conservan por integridad documental, pero no se deben volver a explicar por duplicado en los audios.

## Límites de la comprobación

- La comprobación de reversibilidad verifica que el anexo conserva el temario tras las transformaciones declaradas, no la verdad de cada frase docente. Los datos caducados se señalan en el desarrollo, no se corrigen en el anexo.
- Las imágenes, los PDF y el vídeo se mantienen como enlaces locales al temario; no se promete que NotebookLM los lea. Las figuras con información se describen en texto (M06.3, M11.1, S03.3, S04.2, S14.3, S15.1, S15.2).
- El código Java y XML del Tema 2 se ha validado sin SDK de Android, con *stubs* que comprueban sintaxis y tipos. No se ha ejecutado ninguna app; el orden de los *callbacks* de S14.4 procede de la documentación de Android.
- No se ha usado la interfaz de NotebookLM ni generado audios reales. Sus salidas deben revisarse; las cuatro opciones y las cantidades son instrucciones, no funciones garantizadas del cuestionario nativo.

## Tema 1

**Fuente:** `temario/Tema 1.md`.

| Apartado original | Desarrollo elaborado | Respaldo |
|---|---|---|
| Información, resultados de aprendizaje y criterios | M00 | Anexo del resumen del Tema 1 |
| 1.A. 1. Introducción | M01 | Anexo |
| 1.1. ¿Qué es un dispositivo móvil? | M02.1, M02.2 | Anexo |
| 1.1.- Clasificación de los dispositivos móviles | M02.3 | Anexo |
| 2. Limitaciones de las tecnologías móviles | M03 | Anexo |
| 3. Tecnologías disponibles | M04 | Anexo |
| 3.1. Hardware · 3.1.1. Smartphones | M05.1 | Anexo |
| 3.1.2. El interior de un smartphone | M05.2 | Anexo |
| 1.B. 1. Sistemas operativos | M06.1 | Anexo |
| 1.1. Android | M06.2–M06.4 | Anexo |
| 1.2. iOS | M07 | Anexo |
| 1.3. Otros sistemas operativos: HarmonyOS, KaiOS, Ubuntu Touch/LineageOS | M08 | Anexo |
| 1.C. 1. Plataformas de desarrollo y lenguajes de programación | M09 | Anexo |
| 2. Elección de una alternativa | M10 | Anexo |
| 3. La plataforma Android | M11.2 | Anexo |
| 4. El entorno de ejecución | M11.1, M12.3 | Anexo |
| 5. Máquinas virtuales | M12 | Anexo |
| 1.D. Diapositivas 01–02 | M13.1 | Anexo |
| Diapositiva 03 | M08, M13.2 | Anexo |
| Diapositivas 04–09 | M13.3 | Anexo |
| Diapositiva 10 | M13.4 | Anexo |
| Diapositiva 11 | M13.5 | Anexo |
| Diapositiva 12 | M13.6 | Anexo |
| 1.E. ActividadUT01-1 | M11 | Anexo |
| PDF enlazados: Sensores y Multimedia | M14 (referencia) | Recursos del temario |

## Tema 2

**Fuente:** `temario/Tema 2.md`.

| Apartado original | Desarrollo elaborado | Respaldo |
|---|---|---|
| Información, resultados de aprendizaje, contenidos y criterios | S00 | Anexo del resumen del Tema 2 |
| 2.A. 1. Módulos para el desarrollo de aplicaciones | S01 | Anexo |
| 2.B. 1. Instalación de Android Studio | S02 | Anexo |
| 2.C. 1. Integración en el entorno de desarrollo | S03 | Anexo |
| 2. Creación de un proyecto | S03.1 | Anexo |
| 2.1. Paso 1 · 2.2. Paso 2 · 2.3. Paso 3 · 2.4. Paso 4 · 2.5. Paso 5 | S03.2–S03.4, S04 | Anexo |
| 3. Escritura de código | S05 | Anexo |
| 3.1. MainActivity | S06 | Anexo |
| 3.2. activity_main.xml | S07 | Anexo |
| 4. Compilación | S08 | Anexo |
| 5. Emuladores | S09 | Anexo |
| 6. Instalación y ejecución en un dispositivo real | S10 | Anexo |
| 2.D. 1. Aspectos fundamentales | S11 | Anexo |
| 2. El administrador de aplicaciones | S11 | Anexo |
| 3. Ciclo de vida de una aplicación | S12 | Anexo |
| 4. Modelo de estados de una aplicación | S13–S15 | Anexo |

## Transformaciones del anexo

- Codificación de salida UTF-8 y finales de línea LF; texto y código docentes sin modificar, incluidos los espacios no separables (U+00A0) de sus bloques de código.
- Encabezados docentes desplazados un nivel y prefijados con «Docente —» para distinguirlos del desarrollo elaborado; los bloques de código no se tocan.
- Rutas `Recursos/` adaptadas a `../temario/Recursos/` y enlace al otro tema adaptado a `../temario/`.
- Omitida la línea de navegación inicial hacia el otro tema; las anclas internas y el índice original se conservan.

## Prompts comprobados

- 16 prompts de podcast: ocho por tema.
- 21 prompts de cuestionario, simulacro, auditoría o repaso adaptativo: ocho por tema y cinco mixtos.
- Cada prompt está en su propio bloque, pide cuatro opciones cuando genera preguntas y excluye Sensores y Multimedia del examen.
- Markdown sin wikilinks dependientes de Obsidian; bloques de código cerrados; recursos locales existentes.

## Resultado de las comprobaciones de código

Bloques extraídos del `temario/Tema 2.md`, compilados con `javac --release 17` en un directorio temporal, sin dejar `.class` en la carpeta de resúmenes.

- **Copia literal:** falla por espacios no separables (U+00A0) en la sangría, 50 líneas del temario afectadas. Hallazgo documentado en S16.
- **`activity_main.xml` normalizado:** `xmllint --noout`, **bien formado**.
- **`MainActivity` y `ExampleActivity` normalizados, con *stubs* de `Activity`, `AppCompatActivity`, `Bundle` y `R`:** **compilan**.
- **Variante con `SetContentView(R.Layout.acivity_main)`:** **no compila** (*cannot find symbol*), como afirma S06.1.
- Ejecución en emulador o dispositivo: **no realizada**.

No se ha ejecutado el auditor de la bóveda: estos entregables están fuera de Obsidian y no modifican sus notas, registros ni enlaces.
