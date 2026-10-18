# RissyTech / Dirección creativa

## Primera versión aplicada: «La fábrica a ciegas»

Tema claro de aspecto editorial y técnico: blanco dominante, tinta azul noche,
turquesa para señales físicas y acentos de estación con contraste de lectura.
Planos, nodos, recorridos y bucles, no decoración ciberpunk. Se mantienen las 13
diapositivas principales, las dos demos y el contenido académico. El anexo de
fuentes aparece después del cierre y se incluye en el PDF. Contiene los modelos
propuestos y enlaces a sus fabricantes, como el documento del equipo.

La distopía es **cotidiana y plausible**, no apocalíptica: una planta puede seguir
produciendo mientras pierde visibilidad sobre la calidad de lo que fabrica.
«A ciegas» es una metáfora del caso, no un incidente histórico ni una medición.

### Apertura sugerida / unos 30 segundos

> ¿Puede una fábrica seguir produciendo sin saber que está fabricando mal?
> En RissyTech, el producto avanza por cuatro estaciones. Pero la información
> no avanza con él: el aceite se comprueba cada hora y el stock se cuenta al
> final del día. No necesitamos imaginar robots fuera de control. Basta con
> imaginar una fábrica que descubre demasiado tarde lo que ya está ocurriendo.
> Este es nuestro plan para dejar de producir a ciegas.

No reproducir una alarma real, un falso directo o una lectura supuestamente
medida para captar la atención. Las demos llevan su rótulo de simulación.

## Tres formas distópicas de plantearla

### 1. La fábrica ciega / aplicada de forma contenida

- **Pregunta:** «¿Y si el producto se mueve más rápido que la información?»
- **Artefacto posible:** un parte de incidencia ficticio con campos «anomalía»,
  «detección» y «lote afectado», sin cifras ni horarios inventados.
- **Diagrama:** dos recorridos paralelos, producto continuo y observación manual
  discontinua; la propuesta cierra ese vacío con captura y control local.
- **Encaje:** problema, sensores, trazabilidad y cierre.
- **Límite:** la hora es el intervalo de medición del aceite, no un tiempo universal
  de detección. No afirmar que un lote concreto se perdió.

### 2. La fábrica rehén de Internet / pregunta aplicada en arquitectura

- **Pregunta:** «¿Quién detiene el sellado cuando la conexión desaparece?»
- **Artefacto posible:** etiqueta «Servicio IT no disponible / escenario hipotético».
- **Diagrama:** marcar la comunicación IT como interrumpida y conservar visible
  el bucle sensor → PLC → actuador. El móvil nunca se convierte en un mando directo.
- **Encaje:** arquitectura, alertas y prueba de respuesta sin red IT.
- **Límite:** no afirmar que la demo prueba un corte de red real o que garantiza
  seguridad certificada. La versión actual plantea la pregunta, no simula ese corte.

### 3. La fábrica que nadie escucha / alternativa para una siguiente iteración

- **Pregunta:** «Si todo avisa, ¿qué consigue realmente nuestra atención?»
- **Artefacto posible:** una bandeja ficticia de avisos repetidos, seguida de una
  única incidencia con estación, causa, atención asignada y estado.
- **Diagrama:** evento → aviso relevante → confirmación; si no hay respuesta,
  repetición y escalado según la política de planta.
- **Encaje:** notificaciones, ergonomía y demo de presión.
- **Límite:** la saturación de alarmas no está documentada en RissyTech. Sería un
  escenario crítico añadido, rotulado como ficción. Evitar parpadeos, sonidos
  repetidos y números de alertas presentados como resultados del caso.

**Recomendación:** no combinar tres historias completas. Usar la fábrica ciega
como relato principal; introducir la dependencia de red como pregunta técnica y
reservar la saturación de alertas para el debate. Así se sorprende sin desplazar
los retos de la actividad ni convertir el trabajo en una historia de terror.

## Investigación y fuentes

Consultadas el 16 de octubre de 2026. Las fuentes externas orientan el enfoque
narrativo y de factores humanos; no sustituyen al documento académico.

1. **Documento del equipo:** `../documentacion/TAREA_presentacion.pdf`.
   Páginas impresas: caso y proceso 1–2; sensores y actuadores 3–4;
   notificaciones y app 5–7; ergonomía y almacén 8; fichas de fabricantes 9.
   La adaptación del 18 de octubre conserva modelos y enlaces, pero explica su
   función sin rangos de catálogo ni detalles de instalación.
2. **Near Future Laboratory — What Is Design Fiction?**
   https://nearfuturelaboratory.com/what-is-design-fiction/
   Propone explorar futuros posibles a través de artefactos cotidianos concretos,
   en lugar de visiones tecnológicas vagas o catástrofes espectaculares.
   Aquí inspira los posibles partes y pantallas ficticios, no predicciones.
3. **Health and Safety Executive — Alarm management.**
   https://www.hse.gov.uk/humanfactors/topics/alarm-management.htm
   Las alarmas deben dirigir la atención hacia condiciones que requieren acción,
   informar y guiar, tener una respuesta definida y respetar las capacidades
   humanas. Fundamenta la alternativa de «la fábrica que nadie escucha»;
   no demuestra que RissyTech haya sufrido saturación de alarmas.

## Diagramas de esta revisión

- **Portada:** nuevo plano conceptual de las cuatro estaciones (`PlantBlueprint`).
- **Sensores:** variable → captura → finalidad (`SignalMap`), con identificación
  RFID separada de la medición física y sin inventar límites de presión. Modelos:
  ifm VVB001, SM8000 y PN2094; WIKA TR21-A (Pt100); Zebra FX9600-4 con AN480.
- **Actuadores:** nuevo bucle con realimentación (`ControlLoop`).
- **Ergonomía:** condición de trabajo → respuesta de diseño → objetivo
  (`ErgonomicsMap`), conservando las seis herramientas del documento y concretando
  la pistola de códigos Zebra DS3678-SR, también presente en trazabilidad.
- **Fuentes:** `EquipmentSources` reúne los enlaces oficiales de la página 9 del
  documento. Son propuestas para la actividad, no una instalación validada.
- **Arquitectura, alertas, trazabilidad y hoja de ruta:** conservados y adaptados
  al tema claro. Las revelaciones por clic siguen funcionando.

Arquitectura detallada, hoja de ruta e indicadores son propuestas. Interfaces y
valores de motor son simulaciones. Confirmar recepción o reparación **no arranca
una máquina**: validación del controlador y arranque son pasos separados.
