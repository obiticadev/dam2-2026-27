# Tema 1 — Prompts para podcast de NotebookLM

## Uso y parámetros

Selecciona únicamente la fuente **«Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo»**. Copia **un bloque** por generación en la personalización del resumen de audio. Idioma: español. Si se ofrecen formato y extensión, elige explicación en profundidad y extensión larga para los episodios temáticos. Los nombres y opciones concretos de la interfaz pueden variar.

**Alcance:** primer examen de PMDM, Tema 1 completo. Los PDF de Sensores y Multimedia (M14) son referencias citadas, no unidades del examen: solo P-M0 los menciona, en una frase. Este archivo de prompts no es una fuente de teoría: no hace falta subirlo al cuaderno.

La serie recomendada son los cinco episodios P-M1 a P-M5; P-M0 sirve de orientación y P-M6/P-M7, de repaso. Es mejor repartir los detalles que pedir que quepan todos en una sola grabación. Las duraciones o pausas solicitadas no se garantizan; revisa siempre el audio generado.

## P-M0. Mapa global sin omitir las distinciones fundamentales

```text
Genera un resumen de audio en español para un estudiante de segundo de DAM que prepara el primer examen de Programación Multimedia y Dispositivos Móviles, con preguntas tipo test de una sola respuesta correcta. Usa solo la fuente Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo.

Presenta un mapa razonado de M01-M13: definición de dispositivo móvil, limitaciones y ventajas, preguntas iniciales de hardware/SO/plataforma, smartphone y chipset, sistemas operativos, plataformas y lenguajes, elección del curso, arquitectura de Android, máquinas virtuales y tipos de aplicación. Explica qué problema resuelve cada bloque y cómo se enlaza con el siguiente. Menciona en una sola frase que los PDF de sensores y multimedia son referencias y no amplían el examen.

Destaca estas distinciones: SO frente a SDK frente a IDE frente a runtime; código nativo frente a gestionado; SDK frente a NDK; Java ME frente a Android; Dalvik frente a ART; app nativa, web/PWA, híbrida y multiplataforma. Lee los nombres técnicos con precisión y no inventes datos.

Prioriza el desarrollo elaborado. El anexo es respaldo, no otro temario que repetir; sus datos caducados no anulan las aclaraciones de M15. No atribuyas preguntas al profesor ni inventes ponderación. Termina enumerando los cinco bloques que requieren un episodio propio.
```

## P-M1. Dispositivos móviles, limitaciones y hardware

```text
Genera un audio de estudio en español basado exclusivamente en M01-M05 y los matices relacionados de M15 de Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo. Nivel: segundo de DAM; objetivo: distinguir respuestas parecidas de un test.

Orden: por qué existe el módulo (inmediatez, hiperconectividad, movilidad); el problema de definir «móvil»; la definición de trabajo desglosada rasgo a rasgo, insistiendo en «conexión permanente o no» y en por qué la capacidad de proceso es una «verdad a medias»; las dos listas de clasificación y el foco en smartphones y tablets; las siete limitaciones con su consecuencia de diseño; las ventajas; la conectividad como ventaja y como limitación a la vez.

Después, las tres preguntas antes de desarrollar (hardware, sistema operativo, plataforma con lenguajes y herramientas) y la tabla de lo que cita el temario en cada nivel. Explica qué es un smartphone (SO instalado y apps de terceros), sus características, y el interior: chipset, DSP, ARM como arquitectura que se licencia con más del 90 % de cuota, y las arquitecturas MSM, OMAP y Marvell con su empresa.

Por cada distinción: regla correcta, distractor plausible y contraejemplo. Señala los datos históricos como tales, sin presentarlos como actuales. Cierra con cinco comprobaciones breves y explica la respuesta antes de seguir.
```

## P-M2. Sistemas operativos móviles

```text
Genera un audio detallado en español sobre M06-M08 y las aclaraciones relacionadas de M15 de Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo. Preparo un test de segundo de DAM con distractores sutiles.

Explica la función del sistema operativo y la evolución del mercado: diversidad en los años 2000 y dominio actual de Android e iOS por sus ecosistemas. Para Android desarrolla origen en Android Inc. y Google, kernel de Linux modificado, HTC Dream en 2008, cuota, fabricantes, nombres de postres en orden alfabético con letra y versión, Android 16, SDK gratuito, Java y Kotlin, y el paso de Eclipse con ADT a Android Studio basado en IntelliJ IDEA, con la aclaración de fechas.

Para iOS desarrolla Apple, solo hardware Apple, derivación de Mac OS X, Swift frente a Objective-C, Xcode con Interface Builder, SwiftUI, simuladores, Instruments y TestFlight, y por qué el SDK es gratuito pero publicar en la App Store no. Aclara iPadOS, tvOS y el salto de numeración a iOS 26 sin convertirlo en dato central.

Compara HarmonyOS, KaiOS, Ubuntu Touch y LineageOS, y Tizen de la diapositiva, con desarrollador, enfoque, ventajas y desventajas. Usa pares mínimos: kernel de Linux frente a Mac OS X, SDK gratuito frente a programa de pago, nombre de postre frente a nivel de API. Cierra con una mini batería oral.
```

## P-M3. Plataformas, lenguajes y elección del curso

```text
Genera un audio en español dedicado a M09-M10 de Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo. Nivel segundo de DAM; entrenamiento para test exigente.

Explica qué es una plataforma de desarrollo y por qué determina la portabilidad: código ejecutable sobre el SO, sobre una máquina virtual o sobre un intérprete. Usa los dos ejemplos del temario: Objective-C con el SDK de Apple frente a Java ME con un midlet y la KVM. Distingue código nativo y código gestionado, y el papel del NDK frente al SDK en Android.

Recorre las plataformas Android, iOS, Java ME y Windows Phone con sus herramientas y lenguajes, y explica por qué Java ME es una excepción: no es el kit de un SO sino un subconjunto de Java que exige una máquina virtual en el dispositivo. Indica qué plataformas están descontinuadas hoy sin convertirlo en el centro del episodio.

Desarrolla la elección del curso paso a paso: Java ya conocido, ciclo multiplataforma, Android Studio frente a Java ME, decisión según las necesidades del cliente, y la configuración final Java y XML, Android, Android Studio, emulador y hardware. Advierte que el curso usa Java aunque Google impulse Kotlin. Cierra comparando cinco afirmaciones casi correctas con su versión exacta.
```

## P-M4. Arquitectura de Android y máquinas virtuales

```text
Genera un audio de profundización en español sobre M11-M12 de Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo, usando M15 para aclarar confusiones.

Recorre la pila oficial de abajo arriba: kernel de Linux, HAL, Android Runtime y bibliotecas C/C++ nativas al mismo nivel, framework de la API de Java y apps del sistema. Para cada capa explica su función, qué contiene y un detalle discriminante: la HAL carga un módulo por tipo de hardware; cada app con su proceso y su instancia de ART; OpenGL ES accesible desde Java; los gestores de vistas, recursos, notificaciones y actividad; los proveedores de contenido; las apps del sistema sin estado especial. Relaciona después la lista de cinco componentes con la pila de seis capas y señala que la lista no incluye la HAL.

Explica qué es una máquina virtual y la JVM. Desarrolla Java ME: por qué Java SE es demasiado pesada, configuraciones y perfiles, KVM y CVM, CLDC, CDC y MIDP, y midlet. Compara Dalvik y ART: DEX, dx, máquina basada en registros, AOT en la instalación y JIT, compatibilidad en una sola dirección, sustitución en Android 5.0. Aclara Jack, D8 y la evolución de la compilación de ART desde Android 7.

Explica la Actividad UT01-1 como lectura de la arquitectura. Cierra con trampas: HAL y framework, ART y framework, KVM por kilobytes, Dalvik basada en registros.
```

## P-M5. Tipos de aplicación, interfaz, rendimiento y tendencias

```text
Genera un audio preciso en español sobre M13 de Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo, con los matices de M15.

Recorre las doce diapositivas como un razonamiento, no como lectura: introducción y tres rasgos de los dispositivos; SO de la presentación; agrupación de nativas, híbridas y web; comparativa de rendimiento, acceso al hardware, coste y mantenimiento, explicando el patrón de la tabla; ventajas e inconvenientes de las nativas; PWA y sus tres características; híbridas; multiplataforma frente a nativas.

Explica con cuidado la aclaración técnica: Ionic y Cordova usan un WebView; React Native dibuja componentes nativos; Flutter usa Dart y su propio motor gráfico. La infografía de la falta de funciones sin conexión no es una limitación universal. Distingue lo que dice la diapositiva de la clasificación técnica actual sin descalificar el material.

Después, tecnologías de interfaz con su lenguaje, incluidas Java y XML, Jetpack Compose y SwiftUI, y el fin de Xamarin. Relaciona las tres optimizaciones de rendimiento y batería con las limitaciones de M03 y termina con las cuatro tendencias. Propón tres casos de elección razonada de tipo de app antes de resolverlos.
```

## P-M6. Repaso de trampas, no repetición de todo el tema

```text
Genera un audio de repaso activo en español usando M15 y M16, con apoyo en M01-M13 de Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo. No leas literalmente el anexo ni todas las opciones de las preguntas.

Organiza la conversación en pares mínimos: conexión permanente o no; capacidad limitada o verdad a medias; ARM o fabricante; chipset o procesador; Linux o Mac OS X; SDK gratuito o programa de pago; SDK o NDK; nativo o gestionado; Java ME o SO; KVM o CVM; Dalvik o JVM; ART o Dalvik; HAL o framework; ART o framework; proveedor de contenido o sistema de vistas; app del sistema o app de usuario; Java o Kotlin en el curso; nativa, web e híbrida en la comparativa; híbrida o multiplataforma.

Para cada par formula una afirmación engañosa, deja una breve oportunidad de pensar, corrígela y da el contraejemplo mínimo que la demuestra falsa. Explica el mecanismo, no solo la respuesta. Respeta las aclaraciones sobre fechas, versiones y la diapositiva 8. Termina con una lista de errores que conviene volver a consultar y sus identificadores Mxx.
```

## P-M7. Examen oral con opciones

```text
Genera un audio de autoevaluación en español con preguntas nuevas basadas en M01-M13 y M15-M16 de Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo. Preparo un test de cuatro alternativas y una sola correcta.

Formula ocho preguntas: una de definición y limitaciones, una de hardware, dos de sistemas operativos, una de plataformas, dos de arquitectura y máquinas virtuales, y una de tipos de aplicación. Usa cuatro alternativas breves A-D; no anuncies la respuesta por entonación ni por una introducción reveladora. Da una pausa breve para responder y luego explica la correcta y el error conceptual de las otras tres, sin limitarte a decir verdadero o falso.

No bases preguntas en cifras de cuota o versiones que el resumen marca como caducables, salvo que la pregunta trate precisamente de reconocer el dato docente. No preguntes por sensores ni multimedia. Distribuye las respuestas correctas y evita repetir las preguntas de M16 palabra por palabra. Identifica esta actividad como práctica añadida, no como preguntas oficiales. Si no caben ocho preguntas razonadas, prioriza explicar bien y declara los bloques pendientes.
```
