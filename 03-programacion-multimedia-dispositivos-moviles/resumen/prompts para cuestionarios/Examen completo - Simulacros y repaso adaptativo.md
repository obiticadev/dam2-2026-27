# Primer examen de PMDM — Prompts mixtos y repaso adaptativo

## Selección de fuentes y límites

Selecciona **ambos resúmenes preparados**: Tema 1 y Tema 2. No selecciones los temarios originales sin filtrar, los PDF de Sensores y Multimedia ni fuentes de otras asignaturas. Las distribuciones siguientes son propuestas de entrenamiento, no información del profesor.

Para Studio, pega Q-X1. Para cuatro alternativas con estructura controlada, usa Q-X2 en el chat. Para practicar sin ver de antemano todas las preguntas, Q-X3. Para aprender de fallos, Q-X4. Para detectar huecos antes del examen, Q-X5. Cuatro opciones es un requisito solicitado al modelo: comprueba que lo cumple, porque el formato nativo puede imponer otro.

## Q-X1. Studio: examen mixto difícil

```text
Crea un cuestionario difícil en español del primer examen de Programación Multimedia y Dispositivos Móviles para segundo de DAM a partir solo de los dos resúmenes seleccionados: Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo y Tema 2 - Entorno de trabajo y Android Studio - Resumen completo. Alcance: Tema 1 y Tema 2 completos. Sensores y multimedia excluidos.

Objetivo: unas 40 preguntas, mitad por tema, sin presentarlo como ponderación oficial. Si el formato limita la cantidad, conserva equilibrio y variedad. Solicito cuatro alternativas por pregunta con una sola correcta si el formato lo permite. Combina conceptos, comparaciones, código, secuencias de callbacks y elección razonada de tecnología. Distractores difíciles pero justos, no ambigüedades.

Incluye contrastes transversales: máquina virtual de ejecución (ART/Dalvik) frente a emulador (AVD); SDK, NDK, IDE y Gradle; Java ME y midlets frente a Android y actividades; estados del midlet frente a estados de la actividad; capas de la arquitectura frente a ficheros del proyecto (gestor de actividad frente a Activity); limitaciones del Tema 1 frente a decisiones del Tema 2 (nivel de API, emulador, onPause ligero).

Usa los desarrollos y sus matices antes que los anexos originales. No bases respuestas en cifras caducables ni en requisitos de 2017. No inventes preguntas oficiales, fechas ni requisitos. Al revisar, explica todas las opciones y referencia Mxx/Sxx.
```

## Q-X2. Chat: simulacro de 40 preguntas con corrección diferida

```text
Actúa como examinador de práctica. Usa exclusivamente los dos resúmenes seleccionados del Tema 1 y del Tema 2 de PMDM. El primer examen incluye ambos temas completos. Genera un simulacro textual de 40 preguntas difíciles en español, exactamente cuatro opciones A-D por pregunta y una sola correcta. No copies literalmente las preguntas de muestra de los resúmenes.

Matriz de práctica, no oficial: Tema 1 — 3 dispositivos y limitaciones, 2 hardware, 4 sistemas operativos, 3 plataformas y elección, 5 arquitectura y máquinas virtuales, 3 tipos de aplicación; Tema 2 — 3 herramientas, proyecto y nivel de API, 4 Activity con Java y XML, 3 compilación, emulador y dispositivo, 3 fases y estados, 7 callbacks, trazas y estado. Intercala temas; no reveles el bloque como pista. Al menos 10 preguntas deben usar código, XML o secuencias de callbacks con escenario completo.

Entrega primero solo las preguntas y la plantilla 1-40, sin soluciones ni indicaciones reveladoras. Si no cabe en una respuesta, divide en tandas numeradas sin cambiar la matriz y sin dar soluciones entre tandas. Espera mis respuestas. Corrige después en tabla y explica cada error con la regla, la traza si procede y el descarte de las otras tres opciones, citando Mxx/Sxx. Cuenta aciertos, errores y omitidas sin aplicar penalización oficial inventada.

Antes de publicar, comprueba internamente unicidad de respuesta, cuatro alternativas y consistencia técnica con las aclaraciones de los resúmenes. Después de corregir, propone el siguiente repaso según mis fallos, no una repetición genérica de todo el temario.
```

## Q-X3. Chat: examinador interactivo de una pregunta cada vez

```text
Quiero practicar el primer examen de Programación Multimedia y Dispositivos Móviles con los dos resúmenes seleccionados, Tema 1 y Tema 2 completos. Hazme una sola pregunta cada vez, en español, con cuatro opciones A-D y una sola correcta. No muestres la solución antes de mi respuesta. No inventes preguntas oficiales.

Empieza con una pregunta de diagnóstico y alterna bloques para no dejar sin evaluar: dispositivos y limitaciones, hardware, sistemas operativos, plataformas, arquitectura, máquinas virtuales, tipos de aplicación, herramientas y proyecto, Java y XML, compilación y emulador, fases y estados, callbacks y conservación del estado. Usa código y trazas con escenarios completos. No preguntes por sensores ni multimedia.

Cuando responda, indica si acerté, explica el mecanismo y por qué falla cada distractor, cita el bloque Mxx/Sxx y formula la siguiente pregunta. Si digo «no sé», explica primero una versión sencilla y después ofrece una variante nueva. Aumenta la dificultad solo cuando demuestre comprensión, no porque acierte una vez.

Mantén un registro en esta conversación de bloque, acierto/error/omisión y tipo de confusión. Cada diez preguntas ofrece un balance de cobertura y recomienda dos apartados concretos. No confundas dificultad con redacción ambigua. Comienza ahora con una única pregunta.
```

## Q-X4. Chat: repaso adaptativo a partir de mis errores

```text
Voy a pegar mis respuestas falladas o dudas del primer examen de PMDM. Usa solo los dos resúmenes seleccionados, Tema 1 y Tema 2. Primero identifica para cada fallo la confusión subyacente: definición, clasificación, capa o componente, plataforma o herramienta, máquina virtual, tipo de aplicación, línea de código, fase frente a estado, orden de callbacks, bucle del ciclo de vida o conservación del estado.

No repitas solo la respuesta correcta. Explica la regla y un contraejemplo, cita Mxx/Sxx y diseña dos preguntas nuevas por confusión: una directa y otra de transferencia con un escenario diferente. Cada pregunta tendrá cuatro opciones y una única correcta; no reveles soluciones hasta que responda. Revisa que ninguna dependa de condiciones omitidas, cifras caducables o material de sensores y multimedia.

Cuando conteste, corrige cada alternativa, actualiza los errores recurrentes y distingue haber acertado por descarte de poder explicar el mecanismo. Propón un orden corto de lectura de apartados para remediar mis fallos. Si faltan mis respuestas, pídelas en lugar de inventar un diagnóstico. No marques ningún bloque como dominado sin evidencia de mis respuestas.
```

## Q-X5. Chat: auditoría de cobertura y examen de trampas

```text
Con los dos resúmenes seleccionados, audita la cobertura de los cuestionarios que pegaré. Alcance del primer examen de PMDM: Tema 1 y Tema 2 completos. No basta con contar preguntas ni encabezados.

Construye una matriz bloque/mecanismo evaluado/preguntas existentes/hueco detectado. Considera M01-M13 y S01-S15, con M15 y S17 como catálogo de trampas. Comprueba que se evalúan definiciones, comparaciones, ubicación en capas, líneas de código, secuencias de callbacks, estados y decisiones de tecnología, no solo definiciones generales. Los anexos son respaldo, no bloques nuevos que duplicar.

Señala contenido fuera de alcance, preguntas repetidas, respuestas ambiguas y errores como: conexión permanente obligatoria, ARM como fabricante, Android sobre Mac OS X, NDK que sustituye al SDK, KVM más pesada que CVM, Dalvik basada en pila, HAL encima del framework, React Native dentro de un WebView como hecho técnico, tools:context como enlace en ejecución, R.Layout válido, estados del midlet como estados de la actividad, ciclo visible entre onResume y onPause, onCreate al volver de una actividad detenida, onDestroy garantizado y onSaveInstanceState antes de onPause sin indicar la versión.

Después genera solo las preguntas necesarias para los huecos: cuatro opciones y una correcta, con precondiciones suficientes. Separa enunciados y soluciones para que pueda practicar. Usa referencias Mxx/Sxx y no inventes una distribución oficial. Si todavía no he pegado los cuestionarios, espera a recibirlos.
```
