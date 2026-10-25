# Tema 2 — Prompts para cuestionarios de NotebookLM

## Cómo usarlos

Selecciona solo **«Tema 2 - Entorno de trabajo y Android Studio - Resumen completo»**. En la creación/personalización de cuestionarios de Studio, elige dificultad alta y la cantidad disponible que prefieras; pega un prompt de abajo. Las cantidades son objetivos de práctica, **no ponderaciones del examen**.

El formato de práctica es de **cuatro opciones A–D y una sola correcta**, el que el estudiante ha elegido. La interfaz puede fijar su propio número de opciones o preguntas. Si no lo respeta, usa el prompt Q-S6 en el **chat**. No hace falta subir este archivo como fuente.

**Regla de alcance:** Tema 2 completo, apartados 2.A–2.D. Los requisitos de instalación de 2017 y las cifras de las capturas son históricos: no deben decidir una respuesta salvo que la pregunta trate de reconocer el dato docente. Usa los matices del desarrollo, no formulaciones antiguas conservadas en el anexo.

## Q-S0. Cuestionario completo del tema

```text
Crea un cuestionario difícil en español basado solo en Tema 2 - Entorno de trabajo y Android Studio - Resumen completo. Objetivo orientativo: 30 preguntas; si la herramienta fija otra cantidad, respeta su límite y conserva diversidad. Nivel segundo de DAM.

Distribución pedagógica aproximada, no oficial: 10% herramientas e instalación; 15% creación del proyecto, módulos y nivel de API; 20% Activity, MainActivity.java y activity_main.xml; 15% compilación, emulador y dispositivo real; 10% administrador, fases y estados; 30% callbacks, bucles, trazas y conservación del estado. Incluye todos los grupos aunque cambie la cantidad. Alterna conceptos, lectura de código, órdenes de callbacks y detección de errores.

Solicito cuatro opciones A-D y una sola inequívocamente correcta por pregunta, cuando el formato lo permita. Distractores plausibles basados en confusiones de la fuente: estados del midlet, fases de la app, bucles cruzados, tools:context, R.Layout. Las trazas deben fijar qué actividad está en primer plano, si la nueva cubre toda la pantalla y qué hace el usuario.

Prioriza S01-S15 y S17-S18; el anexo es respaldo. Al revisar cada respuesta, justifica la correcta y por qué falla cada distractor, indicando el apartado Sxx. No presentes las preguntas como oficiales.
```

## Q-S1. Herramientas, proyecto y estructura

```text
Crea un cuestionario difícil en español de unas 12 preguntas sobre S01-S04 y los matices relacionados de S17 de Tema 2 - Entorno de trabajo y Android Studio - Resumen completo. Solicito cuatro alternativas por pregunta y una sola correcta si lo permite el formato.

Cubre el SDK como mínimo para compilar; SDK, IDE, AVD y Gradle; Android Studio con o sin SDK; proyecto y módulos; factores de forma convertidos en módulos; los cinco pasos del asistente y sus pantallas; nombre de paquete por dominio invertido; nivel de API mínimo, alcance frente a funciones; porcentaje acumulado; minSdk y dispositivos con API inferior; plantillas, Empty Activity y Add No Activity; MainActivity y activity_main; splash screen; zonas del IDE; estructura manifests, java y res con sus carpetas.

No construyas preguntas que se respondan con los requisitos de hardware de 2017 o las cifras exactas de las capturas. Cada distractor debe corresponder a una confusión distinta. Explica todas las alternativas en la revisión y cita Sxx. No afirmes procedencia oficial.
```

## Q-S2. Activity, Java y XML

```text
Crea unas 15 preguntas difíciles en español basadas en S05-S07 de Tema 2 - Entorno de trabajo y Android Studio - Resumen completo. Solicito cuatro opciones y una correcta por pregunta, si el cuestionario lo permite.

Evalúa la definición de Activity y su ventana; actividad principal; pila LIFO con trazas de abrir y volver atrás; parte lógica y parte gráfica; layouts; interfaz programática; manifiesto y actividad de arranque con MAIN y LAUNCHER; cada línea de MainActivity.java; herencia de AppCompatActivity o Activity; @Override; onCreate y Bundle; super.onCreate primero y SuperNotCalledException; savedInstanceState null en el primer arranque; setContentView y R.layout; clase R y nombre sin extensión; errores tipográficos SetContentView y R.Layout; AndroidX; cada elemento de activity_main.xml; espacios de nombres android, app y tools; match_parent y wrap_content; restricciones que centran el TextView; tools:context frente a setContentView.

Incluye al menos cuatro preguntas con un fragmento de código o XML y pregunta qué hace, qué falla o qué falta. Fija el fragmento completo en el enunciado. Distractores basados en errores típicos, no en ambigüedades. Al revisar, explica la correcta y descarta individualmente las otras tres; cita Sxx.
```

## Q-S3. Compilación, emuladores y dispositivo real

```text
Crea un cuestionario difícil en español de unas 10 preguntas basado en S08-S10 de Tema 2 - Entorno de trabajo y Android Studio - Resumen completo. Solicito cuatro opciones y una sola correcta si el formato lo admite.

Evalúa Make Project y Gradle; Run, destino de implementación e instalación; Debug, puntos de interrupción, variables y expresiones; construir, instalar, ejecutar y depurar como etapas distintas; APK y Android App Bundle; finalidad del emulador y sus diferencias con el dispositivo real; criterio del 80-90 %; depuración en el emulador; AVD, Select Deployment Target y Create New Emulator; emuladores externos; emulador frente a máquina virtual de ejecución; causas de diferencias en el dispositivo real; transferencia del APK; depuración USB y opciones de desarrollador; APK frente al JAR de Java ME.

Incluye situaciones en las que haya que identificar en qué etapa aparece un síntoma. En la revisión explica el mecanismo, cada alternativa y el apartado S08/S09/S10/S17.
```

## Q-S4. Administrador, fases, estados y callbacks

```text
Crea unas 15 preguntas difíciles en español sobre S11-S14 y los matices relacionados de S17 de Tema 2 - Entorno de trabajo y Android Studio - Resumen completo. Solicito cuatro alternativas con una sola correcta cuando sea posible.

Evalúa las dos funciones del administrador; AMS y midlets; las cinco fases en orden y el papel del gestor en cada una; analogía con el planificador; los tres estados de la actividad con visibilidad, foco, memoria, anexión al administrador de ventanas y posibilidad de eliminación; finish() y eliminación del proceso; estados del midlet frente a estados de la actividad; los seis callbacks y onRestart; llamada a la superclase; tres bucles anidados y sus límites; por qué onPause debe ser ligero; el diagrama con sus flechas de retorno.

La mitad de las preguntas deben exigir ordenar callbacks en un escenario concreto: abrir la app, abrir otra actividad a pantalla completa, volver atrás, actividad translúcida, Inicio, finish(), proceso eliminado. Fija siempre el escenario. Cada alternativa errónea debe representar un error identificable: invertir pausa y detención, cruzar bucles, llamar a onCreate en vez de onRestart. En la revisión incluye la secuencia paso a paso y explica por qué fallan las otras tres.
```

## Q-S5. Conservación del estado y giro de pantalla

```text
Crea unas 10 preguntas difíciles en español centradas en S14.4 y S15 de Tema 2 - Entorno de trabajo y Android Studio - Resumen completo. Solicito cuatro opciones y una correcta por pregunta si la herramienta lo admite.

Evalúa instancia intacta frente a instancia destruida; onSaveInstanceState y el Bundle; recuperación en onCreate, comprobando null, o en onRestoreInstanceState después de onStart; caminos azul y rojo de la figura del giro; recreación por defecto al girar; posición de onSaveInstanceState en la figura frente a Android 9 o superior; ausencia de onSaveInstanceState al pulsar Atrás o llamar a finish(); guardado automático de vistas con id; onDestroy no garantizado si se elimina el proceso; estado temporal frente a datos persistentes.

Cuando una pregunta dependa de la versión de Android, indícala en el enunciado o pregunta por lo que muestra la figura del temario. En la revisión explica la secuencia y la condición que haría correcto cada distractor, si procede, citando S15/S17.
```

## Q-S6. Chat: simulacro con cuatro opciones en el formato textual solicitado

```text
Actúa como examinador de práctica de Programación Multimedia y Dispositivos Móviles, nivel segundo de DAM. Usa solo Tema 2 - Entorno de trabajo y Android Studio - Resumen completo. Alcance S01-S15 y S17-S18. Genera ahora un simulacro en texto de 24 preguntas difíciles, exactamente cuatro alternativas etiquetadas A-D y una sola correcta por pregunta.

Reparte: tres de herramientas y proyecto, dos de nivel de API, cinco de Activity, Java y XML, tres de compilación, emulador y dispositivo, cuatro de fases y estados, y siete de callbacks, trazas y conservación del estado. No copies las muestras. Al menos ocho deben usar código, XML o una secuencia de callbacks. Fija los escenarios completos. Distractores plausibles con la misma precisión y longitud que la respuesta correcta; no uses «todas/ninguna de las anteriores» ni dobles negaciones.

Primero entrega solo preguntas y una plantilla de respuesta 1-24, sin soluciones ni pistas. Espera a que envíe mis letras. Después corrige en una tabla pregunta/mi respuesta/correcta/bloque, y desarrolla para cada error la regla, la traza y por qué falla cada opción, con referencia Sxx. Puntúa solo aciertos sobre 24, sin inventar penalización oficial. Distingue omisión de error. Después propone cinco preguntas nuevas sobre mis confusiones sin repetir enunciados.

Antes de mostrar las preguntas, revisa internamente que cada una tenga cuatro opciones y exactamente una correcta según el escenario, priorizando los matices del resumen sobre el código antiguo del anexo.
```

## Q-S7. Chat: auditoría de un cuestionario generado

```text
Revisa el cuestionario que pegaré a continuación contrastándolo solo con Tema 2 - Entorno de trabajo y Android Studio - Resumen completo. No lo resuelvas por intuición: examina secuencias de callbacks, estados, líneas de código y aclaraciones de S17.

Por pregunta comprueba: cuatro alternativas; una sola respuesta defendible; enunciado autosuficiente; escenario completo en las trazas; ausencia de dependencia de requisitos de 2017, cifras de capturas o versión de Android no indicada. Detecta mezclas de estados del midlet con estados de la actividad, fases de la app tratadas como callbacks, tools:context como enlace en ejecución, el error R.Layout aceptado como válido, onSaveInstanceState situado como en la figura antigua sin indicarlo, preguntas repetidas y pistas de redacción. Marca correcta/ambigua/incorrecta/fuera de alcance, explica la incidencia y ofrece una versión corregida con solución razonada. Espera a que pegue el cuestionario.
```
