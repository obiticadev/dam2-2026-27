# Tema 1 — Prompts para cuestionarios de NotebookLM

## Cómo usarlos

Selecciona solo **«Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo»**. En la creación/personalización de cuestionarios de Studio, elige dificultad alta y la cantidad disponible que prefieras; pega un prompt de abajo. Las cantidades son objetivos de práctica, **no ponderaciones del examen**.

El formato de práctica es de **cuatro opciones A–D y una sola correcta**, el que el estudiante ha elegido. La interfaz puede fijar su propio número de opciones o preguntas. Si no lo respeta, usa el prompt Q-M6 en el **chat**, donde se solicita el simulacro como texto. No hace falta subir este archivo como fuente.

**Regla de alcance:** Tema 1 completo, apartados 1.A–1.E. Sensores y Multimedia (M14) son referencias, no materia del examen. No basar preguntas en cifras de cuota o versiones que caducan, salvo para reconocer el dato docente. Usa los matices del desarrollo, no formulaciones caducadas conservadas en el anexo.

## Q-M0. Cuestionario completo del tema

```text
Crea un cuestionario difícil en español basado solo en Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo. Objetivo orientativo: 30 preguntas; si la herramienta fija otra cantidad, respeta su límite y conserva diversidad. Nivel segundo de DAM. No incluyas sensores ni multimedia.

Distribución pedagógica aproximada, no oficial: 15% definición, clasificación y limitaciones; 10% hardware y ARM; 20% sistemas operativos; 15% plataformas, lenguajes y elección del curso; 25% arquitectura de Android y máquinas virtuales; 15% tipos de aplicación y diapositivas. Incluye todos los grupos aunque cambie la cantidad. Alterna conceptos, comparaciones, clasificación de ejemplos y detección de afirmaciones falsas.

Solicito cuatro opciones A-D y una sola inequívocamente correcta por pregunta, cuando el formato lo permita. Distractores plausibles basados en confusiones de la fuente; no opciones absurdas ni varias parcialmente correctas. Evita preguntas que dependan de cifras de mercado, fechas de versiones o modelos concretos de 2008-2017, salvo que la pregunta sea reconocer lo que dice el temario.

Prioriza M01-M13 y M15-M16; el anexo es respaldo, no fuente para contradecir las aclaraciones. Al revisar cada respuesta, justifica la correcta y por qué falla cada distractor, indicando el apartado Mxx. No presentes las preguntas como oficiales.
```

## Q-M1. Dispositivos, limitaciones y hardware

```text
Crea un cuestionario difícil en español de unas 12 preguntas sobre M01-M05 y los matices relacionados de M15 de Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo. Solicito cuatro alternativas por pregunta y una sola correcta si lo permite el formato.

Cubre inmediatez, hiperconectividad y movilidad; los rasgos de la definición de trabajo, especialmente la conexión permanente o no y la capacidad de proceso como verdad a medias; las dos listas de clasificación y el foco del curso; las siete limitaciones con su consecuencia de diseño; las ventajas y la doble cara de la conectividad; las tres preguntas antes de desarrollar; smartphone como terminal con SO y apps de terceros; chipset, DSP y códecs; ARM como arquitectura licenciada; MSM de Qualcomm, OMAP de Texas Instruments y Marvell.

Incluye casos breves en los que haya que identificar qué limitación condiciona una decisión. No inventes requisitos que la fuente no da. Cada distractor debe corresponder a una confusión real distinta. Explica todas las alternativas en la revisión y cita el apartado Mxx. No afirmes procedencia oficial.
```

## Q-M2. Sistemas operativos móviles

```text
Crea unas 12 preguntas difíciles en español basadas en M06-M08 de Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo. Solicito cuatro opciones y una correcta por pregunta, si el cuestionario lo permite.

Evalúa la función del SO y el dominio de Android e iOS por sus ecosistemas; Android: Android Inc. y Google, kernel de Linux modificado, HTC Dream, nombres de postres en orden alfabético, SDK gratuito, Java y Kotlin, Eclipse con ADT y Android Studio sobre IntelliJ IDEA; iOS: solo hardware Apple, derivado de Mac OS X, Swift y Objective-C, Xcode y sus herramientas, SDK gratuito y programa de desarrolladores de pago; HarmonyOS, KaiOS, Ubuntu Touch, LineageOS y Tizen con su desarrollador, enfoque, ventajas y desventajas.

Las preguntas sobre nombres de postre deben preguntar por la relación letra-nombre o el orden, no por memorizar decimales. No construyas una pregunta cuya respuesta dependa de cifras de cuota o de la versión más reciente. Distractores que intercambien rasgos entre sistemas. En la revisión, explica la correcta y descarta individualmente las otras tres; cita Mxx. Son preguntas añadidas, no oficiales.
```

## Q-M3. Plataformas, lenguajes y elección del curso

```text
Crea un cuestionario difícil en español de unas 10 preguntas basado en M09-M10 de Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo. Solicito cuatro opciones y una sola correcta si el formato lo admite.

Evalúa plataforma de desarrollo y portabilidad; ejecución sobre el SO, una máquina virtual o un intérprete; el ejemplo de Objective-C frente al midlet de Java ME con KVM; código nativo frente a gestionado; SDK frente a NDK; Android, iOS, Java ME y Windows Phone con sus herramientas y lenguajes; por qué Java ME es una excepción; las razones para elegir Java y Android Studio; la configuración de trabajo del curso; la elección según las necesidades del cliente.

Incluye afirmaciones casi correctas que solo fallen en una condición. No confundas la elección del curso, Java y XML, con lo que recomienda Google hoy. En la revisión explica el mecanismo, cada alternativa y el apartado M09/M10/M15. No reutilices literalmente las preguntas de muestra.
```

## Q-M4. Arquitectura de Android y máquinas virtuales

```text
Crea unas 15 preguntas difíciles en español sobre M11-M12 y los matices relacionados de M15 de Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo. Solicito cuatro alternativas con una sola correcta cuando sea posible.

Evalúa el orden y la función de las seis capas; la HAL y sus módulos por hardware; ART y bibliotecas nativas al mismo nivel; cada app con su proceso y su instancia de ART; DEX; AOT, JIT y GC; bibliotecas centrales de Java; OpenGL ES y NDK; gestores del framework y proveedores de contenido; apps del sistema sin estado especial; correspondencia entre la lista de cinco componentes y la pila de seis capas; JVM y bytecode; por qué Java SE no sirve en dispositivos pequeños; configuración y perfil; KVM y CVM; CLDC, CDC, MIDP y midlet; Dalvik basada en registros, dx, sustitución por ART en Android 5.0 y compatibilidad en una sola dirección.

Al menos cinco preguntas deben pedir ubicar un componente concreto en su capa. No inventes componentes que la fuente no cite. En la revisión explica cada distractor y cita M11/M12/M15. No declares preguntas oficiales.
```

## Q-M5. Tipos de aplicación y tecnologías (diapositivas)

```text
Crea unas 12 preguntas difíciles en español centradas en M13 de Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo. Solicito cuatro opciones y una correcta por pregunta si la herramienta lo admite.

Evalúa los tres rasgos de los dispositivos; los SO de la presentación con su desarrollador; la agrupación en nativas, híbridas y web; cada celda de la comparativa de rendimiento, acceso a hardware, coste y mantenimiento; ventajas y desventajas de las nativas; las tres características de las PWA; las híbridas; multiplataforma frente a nativas; tecnologías de interfaz y su lenguaje; las tres optimizaciones de rendimiento y batería; las cuatro tendencias.

Cuando una pregunta use la clasificación de la diapositiva, dilo en el enunciado («según la diapositiva…»). Si la pregunta trata de la clasificación técnica actual, apóyate en la aclaración de M13.3. No mezcles ambos criterios en la misma pregunta. En la revisión explica la correcta y las otras tres con referencia Mxx.
```

## Q-M6. Chat: simulacro con cuatro opciones en el formato textual solicitado

```text
Actúa como examinador de práctica de Programación Multimedia y Dispositivos Móviles, nivel segundo de DAM. Usa solo Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo. Alcance M01-M13 y M15-M16; sensores y multimedia excluidos. Genera ahora un simulacro en texto de 24 preguntas difíciles, exactamente cuatro alternativas etiquetadas A-D y una sola correcta por pregunta.

Reparte: cuatro de dispositivos y limitaciones, dos de hardware, cuatro de sistemas operativos, cuatro de plataformas y elección del curso, seis de arquitectura y máquinas virtuales, y cuatro de tipos de aplicación. No copies las muestras. Distractores plausibles con la misma precisión y longitud que la respuesta correcta; no uses «todas/ninguna de las anteriores» ni dobles negaciones. No dependas de cifras caducables.

Primero entrega solo preguntas y una plantilla de respuesta 1-24, sin soluciones ni pistas. Espera a que envíe mis letras. Después corrige en una tabla pregunta/mi respuesta/correcta/bloque, y desarrolla para cada error la regla, el razonamiento y por qué falla cada opción, con referencia Mxx. Puntúa solo aciertos sobre 24, sin inventar penalización oficial. Distingue omisión de error. Después propone cinco preguntas nuevas sobre mis confusiones sin repetir enunciados.

Antes de mostrar las preguntas, revisa internamente que cada una tenga cuatro opciones y exactamente una correcta, priorizando los matices del resumen sobre formulaciones caducadas del anexo.
```

## Q-M7. Chat: auditoría de un cuestionario generado

```text
Revisa el cuestionario que pegaré a continuación contrastándolo solo con Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo. No lo resuelvas por intuición: examina definiciones, capas, rasgos de cada sistema y aclaraciones de M15.

Por pregunta comprueba: cuatro alternativas; una sola respuesta defendible; enunciado autosuficiente; ausencia de dependencia de cifras caducables, de la versión más reciente o de la clasificación de una diapositiva sin indicarlo. Detecta preguntas sobre sensores o multimedia, datos presentados como actuales cuando son históricos, preguntas repetidas y pistas de redacción. Marca correcta/ambigua/incorrecta/fuera de alcance, explica la incidencia y ofrece una versión corregida con solución razonada. No inventes hechos para salvar una pregunta ambigua. Espera a que pegue el cuestionario.
```
