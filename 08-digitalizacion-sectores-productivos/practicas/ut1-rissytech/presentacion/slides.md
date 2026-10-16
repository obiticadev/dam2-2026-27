---
theme: default
title: RissyTech — De la máquina al dato
titleTemplate: '%s'
info: Plan de transformación digital de una fábrica de patatas fritas. Actividad UT1, Digitalización aplicada a los sistemas productivos, DAM.
author: Nathalia Piñera Molina, Ruben Barrado Pastor y Oliver Bitica
keywords: digitalización, IT, OT, industria 4.0, RissyTech, DAM
favicon: /favicon.svg
aspectRatio: 16/9
canvasWidth: 1100
colorSchema: dark
transition: fade
duration: 17min
routerMode: hash
monaco: false
record: false
drawings:
  enabled: false
fonts:
  sans: Inter Variable
  provider: none
htmlAttrs:
  lang: es
seoMeta:
  ogTitle: RissyTech — De la máquina al dato
  ogDescription: Una propuesta de transformación digital que conecta sensores, control local y personas.
  themeColor: '#0c1720'
exportFilename: rissytech-transformacion-digital
export:
  format: pdf
  withClicks: false
  timeout: 60000
  wait: 1000
defaults:
  layout: default
  transition: fade
class: cover-slide
---

<div class="cover-top"><span class="pill">CONSULTORES DE LA FÁBRICA DEL FUTURO</span><span class="edition">DIGITALIZACIÓN / UT1</span></div>
<div class="cover-grid">
  <div class="cover-copy">
    <div class="eyebrow">PLAN DE TRANSFORMACIÓN DIGITAL</div>
    <h1>De la máquina<br>al <span class="accent">dato.</span></h1>
    <p class="cover-subtitle">RissyTech: una fábrica de patatas fritas<br>que aprende a escuchar su planta.</p>
    <div class="cover-tags"><span>OT + IT</span><span>EDGE COMPUTING</span><span>MOVILIDAD</span></div>
  </div>
  <div class="cover-art"><div class="art-label"><span class="status-dot"></span>RISSYTECH / PLANTA CONECTADA</div><FactoryArt /></div>
</div>
<div class="cover-team"><span>EQUIPO CONSULTOR</span><b>Nathalia Piñera Molina</b><b>Ruben Barrado Pastor</b><b>Oliver Bitica</b><em>DAM · 2026–2027</em></div>

<!--
Abrir con una idea: no proponemos sustituir toda la fábrica, sino conectar las máquinas con información útil para actuar a tiempo. Este trabajo es un diseño conceptual, no una implantación real ni un gemelo digital validado. Presentar al equipo y el módulo. Fuente: documento del equipo, páginas 1–2 de contenido.
Duración orientativa: 45 segundos.
-->

---
class: problem-slide
---

<div class="eyebrow">01 / EL PROBLEMA</div>

# La avería ocurre ahora.<br>La información llega después.

<div class="problem-grid">
  <div class="problem-stat"><span class="stat-number">1<span> h</span></span><p>entre mediciones manuales<br>de la temperatura del aceite</p><small>Situación descrita en el caso.</small></div>
  <div class="problem-timeline">
    <div class="timeline-line"></div>
    <div class="timeline-event"><span class="timeline-dot danger"></span><small>EN LA MÁQUINA</small><h3>Aparece una anomalía</h3><p>Temperatura fuera de rango,<br>presión baja o un atasco.</p></div>
    <div class="timeline-event" v-click="1"><span class="timeline-dot muted"></span><small>CUANDO SE REVISA</small><h3>Se descubre el problema</h3><p>El lote puede estar dañado<br>y la línea, detenida.</p></div>
    <div class="timeline-verdict" v-click="2"><TechIcon name="arrow" :size="24" /><span>El objetivo: pasar del control puntual<br>a la <b>detección y respuesta continuas.</b></span></div>
  </div>
</div>

<!--
El caso habla de 30 años de maquinaria analógica y de problemas que pueden descubrirse horas más tarde. La temperatura se mide manualmente cada hora. No afirmar que todo fallo tarda exactamente una hora en detectarse: es el intervalo de medición de la fritura.
[click] Explicar el coste de detectar tarde: calidad del lote y disponibilidad de la planta.
[click] La digitalización reduce el vacío de información, pero no demuestra por sí sola un ahorro económico. Fuente: página 2 del documento.
Duración: 60 segundos.
-->

---
---

<div class="eyebrow">02 / EL RECORRIDO DEL PRODUCTO</div>

# Cuatro estaciones. Un sistema conectado.

<p class="lead">La transformación sigue el proceso real de la fábrica.</p>

<div class="plant-route">
  <article class="station-card"><div class="station-top"><span>01</span><TechIcon name="water" :size="34" /></div><h2>Lavado<br>y pelado</h2><p>Tierra, piedras y consumo de agua.</p><div class="station-risk"><small>RIESGO</small><b>Cuchillas dañadas<br>y paradas</b></div></article>
  <span class="route-arrow">→</span>
  <article class="station-card orange"><div class="station-top"><span>02</span><TechIcon name="heat" :size="34" /></div><h2>Corte<br>y fritura</h2><p>El aceite debe mantenerse entre 170 y 190 °C.</p><div class="station-risk"><small>RIESGO</small><b>Patatas quemadas<br>o aceitosas</b></div></article>
  <span class="route-arrow">→</span>
  <article class="station-card blue"><div class="station-top"><span>03</span><TechIcon name="pressure" :size="34" /></div><h2>Embolsado<br>y sellado</h2><p>El sellado necesita aire a presión.</p><div class="station-risk"><small>RIESGO</small><b>Bolsas mal cerradas<br>y pérdida de calidad</b></div></article>
  <span class="route-arrow">→</span>
  <article class="station-card purple"><div class="station-top"><span>04</span><TechIcon name="box" :size="34" /></div><h2>Almacén<br>y expedición</h2><p>El stock se cuenta a mano al final del día.</p><div class="station-risk"><small>RIESGO</small><b>Existencias sin<br>visibilidad inmediata</b></div></article>
</div>

<!--
Recorrer la fábrica de izquierda a derecha, como el producto. Identificar un problema en cada estación antes de enseñar la tecnología. Los colores se mantendrán en las siguientes diapositivas para reconocer las estaciones. Fuente: página 2.
Duración: 60 segundos.
-->

---
---

<div class="eyebrow">03 / SENSORES · RETO COMÚN 1.1</div>

# Primero, hacer visible lo que ocurre.

<p class="lead">Cada sensor responde a una pregunta concreta.</p>

<div class="sensor-grid">
  <article class="sensor-card"><div class="card-kicker"><TechIcon name="wave" :size="25" /><span>01 / LAVADO Y PELADO</span></div><h2>¿Funciona bien<br>la máquina?</h2><div class="sensor-measure"><b>Vibración</b><span>Golpes, atascos y funcionamiento anómalo.</span></div><div class="sensor-measure"><b>Caudal de agua</b><span>Consumo excesivo o falta de suministro.</span></div></article>
  <article class="sensor-card orange"><div class="card-kicker"><TechIcon name="heat" :size="25" /><span>02 / FRITURA</span></div><h2>¿Está el aceite<br>en su intervalo?</h2><div class="sensor-measure"><b>Sonda PT100</b><span>Temperatura continua del aceite.</span></div><div class="temperature-band"><span>170 °C</span><b>INTERVALO DEL CASO</b><span>190 °C</span></div></article>
  <article class="sensor-card blue"><div class="card-kicker"><TechIcon name="pressure" :size="25" /><span>03 / EMBOLSADO</span></div><h2>¿Hay presión<br>para sellar?</h2><div class="sensor-measure"><b>Sensor de presión</b><span>Presión del aire comprimido.</span></div><div class="mini-note">El límite operativo lo define la máquina, no la app.</div></article>
  <article class="sensor-card purple"><div class="card-kicker"><TechIcon name="scan" :size="25" /><span>04 / ALMACÉN</span></div><h2>¿Qué palé<br>entra o sale?</h2><div class="sensor-measure"><b>Lector RFID</b><span>Identificación de etiquetas electrónicas.</span></div><div class="mini-note">Identifica objetos; no mide una variable física como la presión.</div></article>
</div>

<!--
Responder explícitamente a la pregunta de los sensores. En lavado hay dos: vibración y caudal. Un sensor de vibración detecta indicios de funcionamiento anómalo, no clasifica piedras. La PT100 mide temperatura; el controlador interpreta la medida. RFID es identificación automática y se incluye en la captura de datos, aunque no mida una magnitud física de proceso. No se ha inventado un umbral de presión. Fuente: página 3.
Duración: 75 segundos.
-->

---
---

<div class="eyebrow">04 / ACTUADORES · RETO COMÚN 1.2</div>

# El dato solo aporta valor si permite actuar.

<div class="control-loop"><span><TechIcon name="wave" />Medir</span><TechIcon name="arrow" /><span class="loop-controller"><TechIcon name="chip" />Decidir en el controlador</span><TechIcon name="arrow" /><span><TechIcon name="valve" />Actuar físicamente</span></div>

<div class="actuator-grid">
  <article><TechIcon name="motor" :size="35" /><small>01 / PROTEGER EL EQUIPO</small><h2>Contactor o<br>variador del motor</h2><p>Detiene la peladora ante una vibración peligrosa.</p></article>
  <article class="orange"><TechIcon name="valve" :size="35" /><small>02 / REGULAR EL PROCESO</small><h2>Válvula de<br>regulación de gas</h2><p>Ajusta el calor para mantener la temperatura del aceite.</p></article>
  <article class="blue"><TechIcon name="valve" :size="35" /><small>03 / EVITAR MAL SELLADO</small><h2>Electroválvula<br>neumática</h2><p>Interrumpe el ciclo si no hay presión suficiente.</p></article>
  <article class="purple"><TechIcon name="box" :size="35" /><small>04 / ORDENAR EL FLUJO</small><h2>Desviador<br>motorizado</h2><p>Dirige los palés en una línea de almacén automatizada.</p></article>
</div>

<div class="bottom-insight"><TechIcon name="shield" :size="19" /><span>La protección real exige enclavamientos y una solución de seguridad industrial adecuada.</span></div>

<!--
El sensor mide, el controlador decide y el actuador ejecuta. El esquema es conceptual. Un variador o un contactor por sí solos no constituyen una función de seguridad certificada. La válvula reguladora de gas forma parte del control de proceso y no sustituye la seguridad del quemador. El desviador presupone una línea automatizada. No todos los actuadores son elementos de emergencia. Fuente: página 4.
Duración: 70 segundos.
-->

---
clicks: 3
---

<div class="eyebrow">05 / ARQUITECTURA PROPUESTA · EDGE COMPUTING</div>

# La reacción es local. La información, compartida.

<p class="lead">Una separación clara entre control de máquina y servicios de información.</p>

<ArchitectureDiagram :stage="$clicks" />

<div class="diagram-legend"><span><i class="legend-line"></i>Control físico local</span><span><i class="legend-line blue-line"></i>Eventos y registros IT</span><span class="legend-note">Diseño conceptual · Sin dependencia de un proveedor cloud</span></div>

<!--
Esta arquitectura amplía el documento como propuesta de diseño, no como infraestructura ya implantada. El formato usa zonas y nodos de servicio inspirado en diagramas cloud; no son servicios ni iconos oficiales de AWS.
Estado inicial: el bucle OT permanece operativo sin la app ni Internet.
[click] Una pasarela separa la comunicación OT–IT. No se representa un acceso directo del móvil al actuador.
[click] Los eventos llegan al servicio IT y a los registros de incidencias y lotes.
[click] La app recibe los avisos. Las solicitudes de reactivación volverían por una interfaz controlada y autenticada, sujetas siempre a validación local; ese camino no se dibuja como una orden directa.
Los protocolos y el despliegue definitivo requerirían analizar la maquinaria, segmentar redes y definir autenticación, permisos y disponibilidad. Fuente del principio local: página 6. Pasarela, servicio y separación en zonas: propuesta técnica del equipo.
Duración: 90 segundos.
-->

---
clicks: 3
---

<div class="eyebrow">06 / NOTIFICACIONES CRÍTICAS · RETO DAM.1</div>

# De una caída de presión a una respuesta coordinada.

<p class="lead">La parada y el aviso son dos respuestas distintas al mismo evento.</p>

<AlertWorkflow :stage="$clicks" />

<!--
Estado inicial: el sensor detecta presión insuficiente y el controlador interrumpe el sellado con la electroválvula. No se espera al operario.
[click] La red transporta estación, presión medida y hora. La app presenta texto e iconos y usa vibración y sonido cuando el dispositivo lo permite.
[click] Confirmar recepción registra quién atiende. Después hay reparación y comprobación local antes de reanudar. Confirmar no reinicia.
[click] Si nadie confirma dentro del plazo definido, se repite el aviso y se avisa al responsable de mantenimiento. No hemos asignado segundos inventados. Repetir hasta recibir confirmación según la política de planta.
Fuente: páginas 5–6. Si falla la comunicación, el control físico local debe mantener la respuesta; una app móvil no es un sistema de seguridad funcional.
Duración: 90 segundos.
-->

---
class: demo-slide
---

<div class="eyebrow">07 / DEMO · CAPTAR LA ATENCIÓN SIN UNA PANTALLA FIJA</div>

# Una alerta que acompaña al operario.

<PressureDemo />

<!--
Demostración local, sin sensores ni maquinaria real. Pulsar «Simular caída de presión»: el sellado se interrumpe en el PLC antes de la confirmación. La app muestra la estación, la hora y una descripción. No se fabrica una lectura numérica de presión.
Pulsar «Simular plazo agotado» para mostrar el escalado. Luego «Alerta recibida»: se asigna la atención, pero no se elimina la avería ni se arranca la máquina.
Las etiquetas vibración/sonido/visual ilustran el diseño: el navegador no emite sonido, no vibra y no envía notificaciones push. Un producto real dependería del hardware, permisos y política del sistema operativo.
Fuente: páginas 5–6; interacción web: implementación ilustrativa.
Duración: 90 segundos.
-->

---
class: demo-slide
---

<div class="eyebrow">08 / DEMO · APP DEL OPERARIO DEL FUTURO · RETO DAM.2</div>

# Confirmar una reparación no es arrancar una máquina.

<MaintenanceDemo />

<!--
Mostrar primero motor parado y vibración elevada. Los números son ilustrativos, inspirados en la maqueta del documento, no datos medidos.
Secuencia recomendada para explicar el bloqueo: marcar solo «Intervención terminada», confirmar reparación y pulsar «Validar PLC». El arranque debe seguir bloqueado porque faltan las guardas y la zona despejada. Marcar las dos condiciones restantes y validar otra vez. Entonces se habilita «Arranque simulado». Pulsarlo para ver el estado de funcionamiento.
En este prototipo las casillas simulan entradas del controlador; una app real no podría acreditar guardas cerradas por una simple casilla. La comprobación debe venir del hardware y de los procedimientos autorizados. La acción de arranque independiente evita confundir reparación confirmada con movimiento inmediato.
Cambiar una condición revoca la autorización en la demo. Ningún botón está conectado a un equipo físico. Fuente: página 7 y principio de comprobación local de página 6.
Duración: 100 segundos.
-->

---
---

<div class="eyebrow">09 / DISEÑAR PARA EL ENTORNO REAL</div>

# Guantes. Ruido. Manos ocupadas.

<p class="lead">La mejor interfaz es la que reduce la necesidad de teclear.</p>

<div class="ergonomics-grid">
  <article><div class="ergonomic-icon"><TechIcon name="scan" :size="29" /></div><div><h2>Lector de códigos</h2><p>Registrar cajas y lotes con un gatillo utilizable con guantes.</p></div></article>
  <article><div class="ergonomic-icon"><TechIcon name="nfc" :size="29" /></div><div><h2>Lectura NFC</h2><p>Abrir la ficha y el historial de una máquina por proximidad.</p></div></article>
  <article><div class="ergonomic-icon"><TechIcon name="camera" :size="29" /></div><div><h2>Cámara y linterna</h2><p>Iluminar una avería y adjuntar evidencias al parte.</p></div></article>
  <article><div class="ergonomic-icon"><TechIcon name="mic" :size="29" /></div><div><h2>Dictado por voz</h2><p>Registrar observaciones cuando el ruido permita reconocerlas.</p></div></article>
  <article><div class="ergonomic-icon"><TechIcon name="hand" :size="29" /></div><div><h2>Objetivos táctiles grandes</h2><p>Menos pulsaciones erróneas en pantallas compatibles con guantes.</p></div></article>
  <article><div class="ergonomic-icon"><TechIcon name="bell" :size="29" /></div><div><h2>Avisos redundantes</h2><p>Vibración, texto e iconos. El color y el sonido no bastan.</p></div></article>
</div>

<!--
No añadir funciones por moda: cada una responde a una limitación del entorno. El NFC evita búsquedas, la pistola lectora evita escritura, la cámara documenta el problema. El dictado no se debe vender como infalible en una fábrica ruidosa. Los guantes exigen un dispositivo compatible, no solo botones más grandes. Fuente: página 8.
Duración: 60 segundos.
-->

---
---

<div class="eyebrow">10 / TRAZABILIDAD · INTEGRACIÓN CON EL ALMACÉN</div>

# Dos formas de identificar. Un mismo registro.

<div class="trace-grid">
  <div class="trace-inputs"><article><TechIcon name="nfc" :size="32" /><div><span class="pill purple-pill">RFID</span><h2>Palés</h2><p>Entradas y salidas automáticas.</p></div></article><article><TechIcon name="scan" :size="32" /><div><span class="pill blue-pill">CÓDIGO DE BARRAS</span><h2>Cajas, lotes y bastidores</h2><p>Identificación individual por lectura.</p></div></article></div>
  <svg class="trace-connectors" viewBox="0 0 90 270" aria-hidden="true"><path d="M0 62H35v73h52M0 207H35v-72" fill="none" stroke="#8aaeff" stroke-width="2" /><path d="m78 129 9 6-9 6" fill="none" stroke="#8aaeff" stroke-width="2" /></svg>
  <div class="trace-database"><TechIcon name="database" :size="48" /><h2>Registro compartido</h2><p>Identidad · lote · movimiento</p><div class="trace-record"><span>CONTENEDOR</span><b>Bastidor B-014</b><span>CONTENIDO ACTUAL</span><b>Lote L-2026-018</b><small>Ejemplo ilustrativo</small></div></div>
  <div class="trace-rule"><TechIcon name="link" :size="30" /><h2>El bastidor<br>se reutiliza.<br><span class="accent">El lote cambia.</span></h2><p>Su código identifica el soporte; la app actualiza qué lote contiene en cada momento.</p></div>
</div>

<!--
El lector RFID y la pistola no compiten: tienen distinta granularidad. Ambos deben usar los mismos registros para que no haya inventarios paralelos. El identificador del bastidor reutilizable no debe confundirse con el identificador del lote de patatas. Los códigos B-014 y L-2026-018 son ejemplos y no proceden de registros reales. Fuente: página 8, integración con el almacén.
Duración: 60 segundos.
-->

---
---

<div class="eyebrow">11 / PROPUESTA DE IMPLANTACIÓN</div>

# Empezar pequeño. Validar. Después, escalar.

<p class="lead">Una hoja de ruta propuesta; no un despliegue ya ejecutado.</p>

<div class="roadmap">
  <article><div class="roadmap-number">01</div><small>OBSERVAR</small><h2>Instrumentar<br>y establecer la base</h2><p>Medir temperatura, presión y vibración. Conocer el estado inicial.</p><div class="roadmap-proof"><TechIcon name="check" :size="17" />Lecturas coherentes y trazables</div></article>
  <article><div class="roadmap-number">02</div><small>CONTROLAR</small><h2>Probar la respuesta<br>local de la máquina</h2><p>Verificar paradas, regulación y condiciones de reactivación.</p><div class="roadmap-proof"><TechIcon name="check" :size="17" />Pruebas con y sin red IT</div></article>
  <article><div class="roadmap-number">03</div><small>CONECTAR</small><h2>Pilotar avisos<br>y mantenimiento</h2><p>Empezar por embolsado, formar al equipo y comprobar el escalado.</p><div class="roadmap-proof"><TechIcon name="check" :size="17" />Confirmación y bloqueo verificados</div></article>
  <article><div class="roadmap-number">04</div><small>AMPLIAR</small><h2>Integrar almacén<br>y evaluar el resultado</h2><p>Unificar registros y comparar con el punto de partida.</p><div class="roadmap-proof"><TechIcon name="check" :size="17" />Lotes y movimientos reconciliados</div></article>
</div>

<div class="bottom-insight"><TechIcon name="shield" :size="19" /><span>Transversal: permisos por rol, acceso OT–IT controlado y registro de las acciones.</span></div>

<!--
Esta diapositiva es una ampliación propuesta por el equipo para explicar cómo llevar el diseño al terreno. No forma parte de una implantación documentada ni incorpora presupuestos o fechas inventados. Instrumentar primero no autoriza conectar actuadores sin evaluación de seguridad industrial. Probar fallos de red IT sin comprometer la seguridad y con personal autorizado. En el piloto, comprobar que confirmar no equivale a arrancar. Proteger accesos y guardar la autoría de las acciones. Objetivo: demostrar viabilidad antes de extenderlo.
Duración: 60 segundos.
-->

---
class: closing-slide
---

<div class="eyebrow">12 / EL VALOR DE LA TRANSFORMACIÓN</div>

<h1>No se trata de conectar máquinas.<br>Se trata de <span class="accent">actuar mejor.</span></h1>

<div class="outcomes">
  <article><span>01</span><h2>Calidad</h2><p>Detectar desvíos de temperatura y presión antes de prolongar el defecto.</p><small>MEDIR: lotes rechazados</small></article>
  <article><span>02</span><h2>Disponibilidad</h2><p>Localizar incidencias y coordinar la intervención de mantenimiento.</p><small>MEDIR: duración de las paradas</small></article>
  <article><span>03</span><h2>Trazabilidad</h2><p>Saber qué lote se mueve, dónde está y qué incidencias lo afectan.</p><small>MEDIR: diferencias de inventario</small></article>
</div>

<div class="closing-line"><TechIcon name="factory" :size="27" /><b>La máquina detecta. El controlador actúa. La persona decide cómo intervenir.</b></div>
<div class="closing-note">Beneficios esperados e indicadores propuestos. Sin resultados medidos todavía.</div>

<!--
Cerrar enlazando con el problema inicial: información más oportuna y actuaciones coordinadas, no tecnología por sí misma. Los tres indicadores son propuestas para evaluar el plan, no resultados obtenidos. No afirmar porcentajes de ahorro ni tiempos de reacción garantizados. La decisión de seguridad inmediata permanece en el control local; la persona interviene siguiendo el procedimiento.
Dar paso a preguntas. Fuente: síntesis de las propuestas del documento y criterios de evaluación del equipo.
Duración: 45 segundos.
-->

---
class: sources-slide
---

<div class="eyebrow">ANEXO / FUENTES, ALCANCE Y NAVEGACIÓN</div>

# Un plan conceptual. Una demostración reproducible.

<div class="sources-grid">
  <div class="source-main"><span class="pill">FUENTE ACADÉMICA</span><h2>Plan de transformación digital<br>de RissyTech</h2><p>Actividad UT1 · «El Gemelo Digital en Papel»<br>Digitalización aplicada a los sistemas productivos · DAM</p><div class="source-pages"><span>Caso y proceso <b>pp. 1–2</b></span><span>Sensores y actuadores <b>pp. 3–4</b></span><span>Notificaciones y app <b>pp. 5–7</b></span><span>Movilidad y almacén <b>p. 8</b></span></div><small>Paginación impresa del documento del equipo, no del visor PDF.</small></div>
  <div class="source-side"><h2>Qué se ha añadido</h2><p>Arquitectura por zonas, hoja de ruta e indicadores: <b>propuestas de diseño.</b></p><p>Interfaces y valores de motor: <b>simulación educativa, sin conexión a maquinaria.</b></p><h2>Cómo recorrerla</h2><div class="keyboard-guide"><span><kbd>→</kbd> <kbd>Espacio</kbd> Avanzar y revelar</span><span><kbd>←</kbd> Retroceder</span><span><kbd>O</kbd> Vista general</span><span>En las demos, utilizar sus botones.</span></div><a href="https://sli.dev" target="_blank" rel="noopener noreferrer" class="source-link">Construida con Slidev ↗</a></div>
</div>

<!--
El original se conserva en ../documentacion/TAREA_presentacion.pdf, fuera de la carpeta publicada. No se publica el PDF ni los ODT automáticamente. La presentación no afirma que exista infraestructura AWS, un gemelo digital operativo o un sistema industrial certificado. Los diagramas usan iconos vectoriales propios y el lenguaje de zonas y conexiones de los diagramas de arquitectura.
Esta diapositiva queda como anexo después del cierre, disponible para preguntas.
-->
