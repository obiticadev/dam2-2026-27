# Tema 2 — Prompts para podcast de NotebookLM

## Uso y parámetros

Selecciona únicamente la fuente **«Tema 2 - Entorno de trabajo y Android Studio - Resumen completo»**. Copia **un bloque** por generación en la personalización del resumen de audio. Idioma: español. Si se ofrecen formato y extensión, elige explicación en profundidad y extensión larga para los episodios temáticos. Los nombres y opciones concretos de la interfaz pueden variar.

**Alcance:** primer examen de PMDM, Tema 2 completo. Los requisitos de instalación y las capturas son datos históricos del temario: los audios deben presentarlos como tales. Este archivo de prompts no es una fuente de teoría: no hace falta subirlo al cuaderno.

La serie recomendada son los cinco episodios P-S1 a P-S5; P-S0 sirve de orientación y P-S6/P-S7, de repaso. El ciclo de vida se reparte en dos episodios (P-S4 y P-S5) porque es el bloque más denso. Las duraciones o pausas solicitadas no se garantizan; revisa siempre el audio generado.

## P-S0. Mapa global del entorno y del ciclo de vida

```text
Genera un resumen de audio en español para un estudiante de segundo de DAM que prepara el primer examen de Programación Multimedia y Dispositivos Móviles, con preguntas tipo test de una sola respuesta correcta. Usa solo la fuente Tema 2 - Entorno de trabajo y Android Studio - Resumen completo.

Presenta un mapa razonado de S01-S15: qué hay que instalar, creación del proyecto, estructura, Activity con su parte Java y su parte XML, compilación y ejecución, emulador y dispositivo real, administrador de aplicaciones, cinco fases, estados de una actividad, callbacks y conservación del estado. Explica cómo se conecta cada paso con el siguiente, desde instalar Android Studio hasta girar la pantalla de una app en marcha.

Destaca estas distinciones: SDK frente a IDE; proyecto frente a módulo; tools:context frente a setContentView; compilar frente a ejecutar frente a depurar; emulador frente a runtime; APK frente a JAR; fases de la aplicación frente a estados de la actividad frente a estados del midlet; ciclo completo, visible y en primer plano.

Prioriza el desarrollo elaborado. El anexo es respaldo; sus datos antiguos no anulan las aclaraciones de S17. No atribuyas preguntas al profesor. Termina enumerando los cinco bloques que requieren un episodio propio.
```

## P-S1. Herramientas, instalación y creación del proyecto

```text
Genera un audio de estudio en español basado exclusivamente en S01-S04 y los matices relacionados de S17 de Tema 2 - Entorno de trabajo y Android Studio - Resumen completo. Nivel: segundo de DAM; objetivo: distinguir respuestas parecidas de un test.

Explica que el SDK es el mínimo para compilar y qué aporta el IDE; la descarga de Android Studio con o sin SDK; los requisitos del temario por sistema operativo como datos históricos, con las observaciones del profesor sobre procesador y emulador. Explica proyecto y módulos, factores de forma, y los cinco pasos del asistente: nombre, paquete y ubicación; factores de forma y nivel de API mínimo, cada formato convertido en un módulo; plantilla de actividad y Add No Activity; nombre de la actividad y del layout; estructura generada.

Dedica tiempo al nivel de API: más bajo llega a más dispositivos con menos funciones; el porcentaje de Help me choose es acumulado, esa versión o superior; lee la tabla de la captura sin pedir que se memoricen las cifras; explica minSdk y qué ocurre si el dispositivo tiene una API inferior. Explica Empty Activity, MainActivity y activity_main, y la splash screen.

Recorre las zonas del IDE y la estructura manifests, java y res con sus carpetas. Cierra con cinco comprobaciones breves y explica la respuesta antes de seguir.
```

## P-S2. Activity, Java y XML línea a línea

```text
Genera un audio detallado en español sobre S05-S07 de Tema 2 - Entorno de trabajo y Android Studio - Resumen completo. Preparo un test de segundo de DAM con distractores sutiles.

Explica la definición de Activity como pantalla con ventana propia, la actividad principal, la pila de actividades LIFO con una traza de abrir y volver atrás, y la división en parte lógica Java y parte gráfica XML, incluidos los layouts y la alternativa programática. Explica el papel del manifiesto, la actividad de arranque y la aclaración del intent-filter MAIN y LAUNCHER.

Recorre MainActivity.java línea a línea: paquete, imports, herencia de AppCompatActivity, @Override, onCreate con Bundle, super.onCreate primero y setContentView con R.layout. Explica la clase R generada y el nombre de recurso sin extensión. Insiste en el error tipográfico del temario SetContentView y R.Layout, que no compilaría, en SuperNotCalledException y en que savedInstanceState es null la primera vez. Da el equivalente actual con AndroidX.

Recorre activity_main.xml: declaración, ConstraintLayout, tres espacios de nombres, match_parent frente a wrap_content, TextView, y las cuatro restricciones que centran el texto. Aclara que tools:context solo sirve al editor y que el enlace en ejecución lo hace setContentView. Cierra con una mini batería oral de qué pasaría si cambiara cada línea.
```

## P-S3. Compilación, emuladores y dispositivo real

```text
Genera un audio en español dedicado a S08-S10 de Tema 2 - Entorno de trabajo y Android Studio - Resumen completo. Nivel segundo de DAM; entrenamiento para test exigente.

Explica Build > Make Project con Gradle, Run con selección de destino e instalación, y Debug con puntos de interrupción, variables y expresiones. Separa construir, instalar, ejecutar y depurar, y por qué compilar no garantiza que la app funcione bien en todos los dispositivos. Aclara APK y Android App Bundle.

Desarrolla el emulador: para qué sirve, por qué puede diferir del dispositivo real, el criterio del profesor del 80-90 % de funcionalidad, depuración en el emulador y casos en que es obligatorio. Explica el AVD, la creación desde Select Deployment Target con Create New Emulator, los emuladores externos, y la diferencia entre emulador y máquina virtual de ejecución.

Desarrolla el dispositivo real: causas de las diferencias, transferir el APK, utilidades de fabricantes y no propietarias, y la depuración USB con las opciones de desarrollador. Explica por qué la mención del .jar procede de Java ME y no describe la instalación en Android. Cierra comparando cinco afirmaciones casi correctas con su versión exacta.
```

## P-S4. Administrador de aplicaciones, fases y estados

```text
Genera un audio de profundización en español sobre S11-S13 de Tema 2 - Entorno de trabajo y Android Studio - Resumen completo, usando S17 para aclarar confusiones.

Explica los tres aspectos del entorno de ejecución y las dos funciones del administrador de aplicaciones. Aclara el origen Java ME del texto: midlets y AMS. Desarrolla las cinco fases en orden, descubrimiento, instalación, ejecución, actualización y borrado, con lo que hace el gestor en cada una, y deja claro que son el ciclo de vida de la aplicación instalada, no los estados de una actividad.

Explica la analogía con el planificador de procesos. Compara los tres estados de una actividad, reanudada, pausada y detenida, con una tabla oral: visibilidad, foco, objeto en memoria, anexión al administrador de ventanas y posibilidad de que el sistema la elimine. Explica finish() y la eliminación del proceso, y que una actividad eliminada debe crearse de nuevo.

Dedica un tramo a no mezclar los estados del midlet, activo, pausa y destruido, con los de la actividad, porque el temario los intercala sin avisar. Cierra con preguntas orales de clasificación: dado un caso, ¿es fase, estado de actividad o estado de midlet?
```

## P-S5. Callbacks, bucles, trazas y conservación del estado

```text
Genera un audio preciso en español sobre S14-S15 de Tema 2 - Entorno de trabajo y Android Studio - Resumen completo. Nivel segundo de DAM; test de una respuesta correcta.

Explica los seis callbacks del esqueleto y onRestart: cuándo se llaman, qué estado alcanzan y qué conviene hacer en cada uno; la regla de llamar primero a la superclase. Explica los tres bucles anidados con sus límites exactos, completo entre onCreate y onDestroy, visible entre onStart y onStop, primer plano entre onResume y onPause, y por qué onPause debe ser ligero. Describe la figura del ciclo de vida con sus flechas de retorno.

Recorre las trazas una a una y pide pensar antes de resolver: abrir la app; A abre B, con A pausada antes de crear B y detenida después; volver atrás; actividad translúcida encima; botón Inicio; finish(); giro de pantalla; proceso eliminado. Aclara el AlertDialog que no pausa, que onDestroy no está garantizado y el cambio de Android 12 en la actividad raíz.

Explica la conservación del estado: instancia intacta frente a instancia destruida, onSaveInstanceState, el Bundle, onCreate u onRestoreInstanceState después de onStart, y los caminos azul y rojo de la figura del giro. Corrige la posición antigua de onSaveInstanceState antes de onPause: desde API 28 va después de onStop. Distingue estado temporal de datos persistentes. Cierra con tres variantes de traza resueltas paso a paso.
```

## P-S6. Repaso de trampas, no repetición de todo el tema

```text
Genera un audio de repaso activo en español usando S17 y S18, con apoyo en S01-S15 de Tema 2 - Entorno de trabajo y Android Studio - Resumen completo. No leas literalmente el anexo ni todas las opciones de las preguntas.

Organiza la conversación en pares mínimos: SDK o IDE; proyecto o módulo; API mínima alta o baja; porcentaje exacto o acumulado; actividad principal o primera pantalla; tools:context o setContentView; R.layout.activity_main con o sin extensión; super.onCreate obligatorio u opcional; savedInstanceState null o no; match_parent o wrap_content; Make Project o Run; emulador o ART; APK o JAR; fases de la app o estados de la actividad; estados de la actividad o del midlet; pausada o detenida; ciclo visible o en primer plano; onPause ligero o pesado; orden al abrir otra actividad; onRestart u onCreate al volver; onDestroy garantizado o no; giro con o sin recreación; onRestoreInstanceState antes o después de onStart; pila LIFO o FIFO.

Para cada par formula una afirmación engañosa, deja una breve oportunidad de pensar, corrígela y da el contraejemplo mínimo. Explica el mecanismo causal. Termina con una lista de errores que conviene volver a consultar y sus identificadores Sxx.
```

## P-S7. Examen oral con opciones

```text
Genera un audio de autoevaluación en español con preguntas nuevas basadas en S01-S15 y S17-S18 de Tema 2 - Entorno de trabajo y Android Studio - Resumen completo. Preparo un test de cuatro alternativas y una sola correcta.

Formula ocho preguntas: una de herramientas o creación del proyecto, una de nivel de API, dos de Java y XML, una de compilación, emulador o dispositivo, una de fases o estados, y dos de callbacks y trazas. Usa cuatro alternativas breves A-D; no anuncies la respuesta por entonación ni por una introducción reveladora. Da una pausa breve para responder y luego explica la correcta y el error conceptual de las otras tres.

Las trazas deben fijar el escenario completo: qué actividad está en primer plano, si la nueva cubre toda la pantalla y qué acción hace el usuario. No bases preguntas en cifras de las capturas ni en requisitos de 2017. Distribuye las respuestas correctas y evita repetir las preguntas de S18 palabra por palabra. Identifica la actividad como práctica añadida, no como preguntas oficiales. Si no caben ocho preguntas razonadas, prioriza explicar bien y declara los bloques pendientes.
```
