---
theme: default
title: RissyTech — La fábrica a ciegas
titleTemplate: '%s'
info: Plan de transformación digital de una fábrica de patatas fritas. Actividad UT1, Digitalización aplicada a los sistemas productivos, DAM.
author: Nathalia Piñera Molina, Ruben Barrado Pastor y Oliver Bitica
keywords: digitalización, IT, OT, industria 4.0, RissyTech, DAM
favicon: /favicon.svg
aspectRatio: 16/9
canvasWidth: 1100
colorSchema: light
transition: fade
duration: 18min
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
  ogTitle: RissyTech — La fábrica a ciegas
  ogDescription: Una propuesta de transformación digital que conecta sensores, control local y personas.
  themeColor: '#ffffff'
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

<div class="cover-top"><span class="pill">RISSYTECH / EXPEDIENTE DE TRANSFORMACIÓN</span><span class="edition">DIGITALIZACIÓN / UT1</span></div>
<div class="cover-grid">
  <div class="cover-copy">
    <div class="eyebrow">PLAN DE TRANSFORMACIÓN DIGITAL</div>
    <h1>La fábrica<br><span class="accent">a ciegas.</span></h1>
    <p class="cover-subtitle">De la máquina al dato.<br>Un plan para ver, comprender y actuar.</p>
    <div class="cover-tags"><span>OT + IT</span><span>EDGE COMPUTING</span><span>MOVILIDAD</span></div>
  </div>
  <div class="cover-art"><div class="art-label">PLANO CONCEPTUAL / NO ES TELEMETRÍA REAL</div><PlantBlueprint /></div>
</div>
<div class="cover-team"><span>EQUIPO CONSULTOR</span><b>Nathalia Piñera Molina</b><b>Ruben Barrado Pastor</b><b>Oliver Bitica</b><em>DAM · 2026–2027</em></div>

<!--
Abrir con una pregunta: «¿Puede una fábrica seguir produciendo sin saber que está fabricando mal?». «La fábrica a ciegas» es una metáfora narrativa del vacío de información descrito en el caso, no el nombre de un incidente real. No proponemos sustituir toda la fábrica, sino conectar las máquinas con información útil para actuar a tiempo. Este trabajo es un diseño conceptual, no una implantación real ni un gemelo digital validado. Presentar al equipo y el módulo. Fuente: documento del equipo, páginas 1–2 de contenido.
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

<p class="lead">Estos son los modelos que proponemos para cada estación.</p>

<SignalMap />

<!--
En lavado proponemos el ifm VVB001 para saber si la peladora vibra más de lo normal y el ifm SM8000 para medir cuánta agua se usa. El primero no identifica piedras directamente: detecta golpes o vibraciones. En fritura, la sonda WIKA TR21-A (Pt100) mide el aceite para que el sistema pueda regular el calor. En embolsado, el ifm PN2094 mide la presión del aire. En almacén, el Zebra FX9600-4 con antenas AN480 lee las etiquetas de los palés. No hace falta explicar rangos de catálogo ni conexiones: importa qué dato aporta cada equipo y para qué sirve. Son modelos propuestos para la actividad, no equipos ya instalados. Fuentes: página 3 y fichas de la página 9; enlaces en el anexo.
Duración: 75 segundos.
-->

---
---

<div class="eyebrow">04 / ACTUADORES · RETO COMÚN 1.2</div>

# El dato solo aporta valor si permite actuar.

<ControlLoop />

<div class="actuator-grid">
  <article><TechIcon name="motor" :size="35" /><small>01 / PROTEGER EL EQUIPO</small><h2>Contactor o<br>variador del motor</h2><p>Detiene la peladora ante una vibración peligrosa.</p></article>
  <article class="orange"><TechIcon name="valve" :size="35" /><small>02 / REGULAR EL PROCESO</small><h2>Válvula de<br>regulación de gas</h2><p>Ajusta el calor para mantener la temperatura del aceite.</p></article>
  <article class="blue"><TechIcon name="valve" :size="35" /><small>03 / EVITAR MAL SELLADO</small><h2>Electroválvula<br>neumática</h2><p>Interrumpe el ciclo si no hay presión suficiente.</p></article>
  <article class="purple"><TechIcon name="box" :size="35" /><small>04 / ORDENAR EL FLUJO</small><h2>Desviador<br>motorizado</h2><p>Dirige los palés en una línea de almacén automatizada.</p></article>
</div>

<div class="bottom-insight"><TechIcon name="shield" :size="19" /><span>Antes de volver a funcionar, la máquina debe comprobar que es seguro hacerlo.</span></div>

<!--
El sensor mide, el controlador decide y el actuador ejecuta. El esquema es conceptual. Un variador o un contactor por sí solos no constituyen una función de seguridad certificada. La válvula reguladora de gas forma parte del control de proceso y no sustituye la seguridad del quemador. El desviador presupone una línea automatizada. No todos los actuadores son elementos de emergencia. Fuente: página 4.
Duración: 70 segundos.
-->

---
clicks: 3
---

<div class="eyebrow">05 / ARQUITECTURA PROPUESTA · EDGE COMPUTING</div>

# Si cae Internet, la máquina no debe esperar.

<p class="lead">Propuesta OT–IT: la reacción es local; la información, compartida.</p>

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
Estado inicial: el sensor propuesto, ifm PN2094, mide la presión del aire. Si baja demasiado, el controlador interrumpe el sellado con la válvula de aire. No se espera al operario.
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
Demostración local, sin sensores ni maquinaria real. El ifm PN2094 es el modelo que proponemos, no un sensor conectado al navegador. Pulsar «Simular caída de presión»: el sellado se interrumpe en el PLC antes de la confirmación. La app muestra la estación, la hora y una descripción. No se fabrica una lectura numérica de presión.
Pulsar «Simular plazo agotado» para mostrar el escalado. Luego «Alerta recibida»: se asigna la atención, pero no se elimina la avería ni se arranca la máquina.
Las etiquetas vibración/sonido/visual ilustran el diseño: el navegador no emite sonido, no vibra y no envía notificaciones push. Un producto real dependería del hardware, permisos y política del sistema operativo.
Fuente: páginas 5–6; interacción web: implementación ilustrativa.
Duración: 90 segundos.
-->

---
class: demo-slide
---

<div class="eyebrow">08 / DEMO · APP DEL OPERARIO DEL FUTURO · RETO DAM.2</div>

# Diagnosticar. Reparar. Volver a producir.

<MaintenanceDemo />

<!--
Mostrar el motor detenido, el indicador de velocidad y la causa de la parada. La composición y los estados se basan en el prototipo de Figma incluido en la siguiente diapositiva y en las capturas de la página 7 del documento. Todas las lecturas son ilustrativas, no datos medidos. El límite de 7,0 mm/s es parte de esa maqueta: no es un umbral validado para una máquina real.
Las comprobaciones aparecen marcadas como en Figma y simulan entradas locales. Confirmar reparación registra la intervención y comprueba esas condiciones. Después aparece «Arranque simulado» como acción independiente; no se arranca al confirmar. En funcionamiento se normalizan las lecturas y aparece el registro de diagnóstico: seleccionar causa, añadir observaciones y guardar. Es un registro temporal que se borra al reiniciar la demo.
La presentación conserva el flujo de alarma, intervención y diagnóstico del diseño, pero separa la confirmación del arranque por seguridad. Las casillas no sustituyen los enclavamientos físicos ni un procedimiento autorizado. Cambiar una condición revoca la autorización. Fuente: páginas 6–7 y prototipo de Figma del equipo.
Duración: 100 segundos.
-->

---
---

<div class="eyebrow">09 / EL PROTOTIPO · DEL DOCUMENTO A FIGMA</div>

# La propuesta también se puede explorar.

<PrototypeAccess />

<!--
Este enlace abre el proyecto original de Figma Make, no una app conectada a la planta. El QR apunta a la misma dirección estable que el botón. Captura obtenida del proyecto del equipo: Industrial Maintenance App Interface, versión visible al preparar esta diapositiva. No enlazar al subdominio temporal figmacachedpreview, que requiere el contexto de Figma y puede caducar.
Se puede consultar también desde el móvil. El proyecto es accesible en modo de previsualización sin iniciar sesión en la comprobación realizada; las funciones de edición requieren cuenta. Hace falta conexión a Internet para abrir Figma, pero la captura y el QR se sirven localmente con la presentación.
El prototipo original combina confirmación y reactivación; nuestra demo conserva el diseño, el diagnóstico y las lecturas ilustrativas, con una acción de arranque separada y comprobación local. No presentar ninguna de las dos interfaces como un sistema de seguridad industrial validado.
Duración: 35 segundos.
-->

---
---

<div class="eyebrow">10 / DISEÑAR PARA EL ENTORNO REAL</div>

# Guantes. Ruido. Manos ocupadas.

<p class="lead">La mejor interfaz es la que reduce la necesidad de teclear.</p>

<ErgonomicsMap />

<!--
Cada función responde a una dificultad del trabajo. Proponemos la pistola Zebra DS3678-SR para escanear cajas y bastidores sin escribir sus códigos; se conecta al móvil o la tablet por Bluetooth. El NFC abre la ficha de la máquina y la cámara permite fotografiar una avería. El dictado solo ayudaría cuando el ruido permita reconocer la voz. La pantalla debe funcionar con guantes, no basta con hacer los botones más grandes. Fuentes: páginas 8–9.
Duración: 60 segundos.
-->

---
---

<div class="eyebrow">11 / TRAZABILIDAD · INTEGRACIÓN CON EL ALMACÉN</div>

# Dos formas de identificar. Un mismo registro.

<div class="trace-grid">
  <div class="trace-inputs"><article><TechIcon name="nfc" :size="32" /><div><span class="pill purple-pill">RFID</span><h2>Zebra FX9600-4</h2><p>Con antenas AN480: lee los palés al entrar o salir.</p></div></article><article><TechIcon name="scan" :size="32" /><div><span class="pill blue-pill">CÓDIGO DE BARRAS</span><h2>Zebra DS3678-SR</h2><p>Escanea cajas, lotes y bastidores uno a uno.</p></div></article></div>
  <svg class="trace-connectors" viewBox="0 0 90 270" aria-hidden="true"><path d="M0 62H35v73h52M0 207H35v-72" fill="none" stroke="#8aaeff" stroke-width="2" /><path d="m78 129 9 6-9 6" fill="none" stroke="#8aaeff" stroke-width="2" /></svg>
  <div class="trace-database"><TechIcon name="database" :size="48" /><h2>Registro compartido</h2><p>Identidad · lote · movimiento</p><div class="trace-record"><span>CONTENEDOR</span><b>Bastidor B-014</b><span>CONTENIDO ACTUAL</span><b>Lote L-2026-018</b><small>Ejemplo ilustrativo</small></div></div>
  <div class="trace-rule"><TechIcon name="link" :size="30" /><h2>El bastidor<br>se reutiliza.<br><span class="accent">El lote cambia.</span></h2><p>Su código identifica el soporte; la app actualiza qué lote contiene en cada momento.</p></div>
</div>

<!--
El Zebra FX9600-4 lee los palés al pasar por el punto de entrada o salida. La pistola Zebra DS3678-SR sirve para escanear una caja o un bastidor concreto. Ambos enviarían los datos a la misma aplicación, que comprobaría los movimientos para no contarlos dos veces. El código del bastidor identifica el soporte, no el lote de patatas que lleva: ese lote puede cambiar cuando se reutiliza. B-014 y L-2026-018 son ejemplos inventados para explicarlo, no registros reales. Fuentes: páginas 8–9.
Duración: 60 segundos.
-->

---
---

<div class="eyebrow">12 / PROPUESTA DE IMPLANTACIÓN</div>

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

<div class="eyebrow">13 / EL VALOR DE LA TRANSFORMACIÓN</div>

<h1>De producir a ciegas<br>a <span class="accent">actuar con criterio.</span></h1>

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

<div class="eyebrow">ANEXO / MODELOS Y FUENTES</div>

# Los modelos que hemos consultado.

<div class="sources-grid">
  <div class="source-main"><span class="pill">DOCUMENTO DEL EQUIPO</span><h2>Plan de transformación digital de RissyTech</h2><p>Actividad UT1 · «El Gemelo Digital en Papel»<br>Digitalización · 2.º de DAM</p><div class="source-pages"><span>Caso y proceso <b>pp. 1–2</b></span><span>Sensores y actuadores <b>pp. 3–4</b></span><span>Notificaciones y app <b>pp. 5–7</b></span><span>Movilidad y almacén <b>p. 8</b></span><span>Fichas de fabricantes <b>p. 9</b></span></div><small>Páginas impresas del documento.<br>Los enlaces abren las fuentes oficiales.</small></div>
  <EquipmentSources />
</div>

<div class="bottom-insight"><TechIcon name="shield" :size="19" /><span>Son modelos propuestos para la actividad. Un técnico tendría que comprobarlos antes de instalarlos en una fábrica real.</span></div>

<!--
Este anexo queda visible después del cierre y también se exporta al PDF para poder consultar los modelos. Las fichas son las mismas que aparecen en la página 9 de ../documentacion/TAREA_presentacion.pdf. No se publica ese documento ni los ODT: los enlaces apuntan a los fabricantes. La presentación no afirma que haya equipos instalados ni resultados medidos. La arquitectura y la hoja de ruta son propuestas; las demos son simulaciones educativas sin conexión a maquinaria. Los diagramas usan iconos propios, no servicios oficiales de AWS. Antes de instalar los modelos en una fábrica real habría que comprobar su compatibilidad con las máquinas.
-->
