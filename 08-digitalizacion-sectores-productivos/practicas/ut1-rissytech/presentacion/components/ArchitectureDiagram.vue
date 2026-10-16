<script setup>
import DiagramNode from './DiagramNode.vue'
defineProps({ stage: { type: Number, default: 3 } })
</script>

<template>
  <svg viewBox="0 0 1000 335" class="architecture" role="img" aria-labelledby="architecture-title">
    <title id="architecture-title">Arquitectura propuesta. Sensores, PLC y actuadores dentro de OT. Una pasarela conecta con eventos, base de datos y app dentro de IT. La acción física permanece local.</title>
    <defs>
      <marker id="arch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="m0 0 10 5-10 5Z" fill="#63ddc1" /></marker>
      <marker id="arch-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="m0 0 10 5-10 5Z" fill="#8aaeff" /></marker>
    </defs>
    <rect x="1" y="1" width="428" height="326" rx="12" class="zone zone-ot" />
    <text x="20" y="29" class="zone-label teal">OT / CONTROL LOCAL</text>
    <text x="20" y="49" class="svg-caption">La máquina no espera a Internet</text>
    <path d="M142 130H164" class="wire" marker-end="url(#arch-arrow)" />
    <path d="M294 130h20" class="wire" marker-end="url(#arch-arrow)" />
    <DiagramNode :x="14" :y="80" :width="128" icon="wave" label="Sensores" sub="Medición física" />
    <DiagramNode :x="166" :y="80" :width="128" icon="chip" label="PLC / control" sub="Decisión local" tone="orange" />
    <DiagramNode :x="316" :y="80" :width="98" icon="valve" label="Actuador" sub="Acción física" />
    <path d="M365 180v45H78v-45" class="wire secondary" marker-end="url(#arch-arrow)" />
    <text x="24" y="246" class="svg-caption">Bucle de control local</text>
    <g :class="{ 'diagram-muted': stage < 1 }" class="diagram-stage">
      <rect x="452" y="1" width="547" height="326" rx="12" class="zone zone-it" />
      <text x="473" y="29" class="zone-label blue">IT / RED DE FÁBRICA</text>
      <text x="473" y="49" class="svg-caption">Supervisión, avisos y trazabilidad</text>
      <path d="M230 180v92h287v-92" class="wire blue-wire" marker-end="url(#arch-blue)" />
      <text x="302" y="290" class="svg-caption blue">Evento, no orden directa al motor</text>
      <DiagramNode :x="473" :y="80" :width="130" icon="network" label="Pasarela" sub="Interfaz OT–IT" tone="blue" />
    </g>
    <g :class="{ 'diagram-muted': stage < 2 }" class="diagram-stage">
      <path d="M603 130h42" class="wire blue-wire" marker-end="url(#arch-blue)" />
      <path d="M779 130h51" class="wire blue-wire" marker-end="url(#arch-blue)" />
      <DiagramNode :x="647" :y="80" icon="server" label="Servicio IT" sub="Gestiona eventos" tone="blue" />
      <DiagramNode :x="832" :y="80" :width="146" icon="database" label="Registros" sub="Lotes e incidencias" tone="purple" />
    </g>
    <g :class="{ 'diagram-muted': stage < 3 }" class="diagram-stage">
      <path d="M713 180v24" class="wire blue-wire" marker-end="url(#arch-blue)" />
      <DiagramNode :x="647" :y="206" icon="phone" label="App operario" sub="Recibe y confirma" tone="blue" />
      <text x="812" y="243" class="svg-caption">Estación · valor · hora</text>
      <text x="812" y="264" class="svg-caption">Usuario · estado · historial</text>
    </g>
  </svg>
</template>
