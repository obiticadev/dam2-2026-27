<script setup>
import TechIcon from './TechIcon.vue'
const rows = [
  { icon: 'hand', problem: 'Guantes y manos ocupadas', tools: 'Lector de códigos + botones grandes', detail: 'Gatillo para registrar cajas y lotes; pantalla compatible con guantes.', result: 'Menos escritura y menos errores táctiles' },
  { icon: 'bell', problem: 'Ruido industrial', tools: 'Avisos redundantes + dictado por voz', detail: 'Vibración, texto e iconos. Dictar solo cuando el ruido lo permita.', result: 'Reconocer el aviso sin depender del sonido' },
  { icon: 'camera', problem: 'Diagnóstico a pie de máquina', tools: 'NFC + cámara y linterna', detail: 'Abrir ficha e historial por proximidad; iluminar y fotografiar la avería.', result: 'Consultar y documentar sin buscar ni teclear' },
]
</script>

<template>
  <div class="ergonomics-map" role="group" aria-label="Limitación del entorno, respuesta de la interfaz y beneficio esperado">
    <div class="ergo-head"><span>CONDICIÓN DE TRABAJO</span><span>RESPUESTA DE DISEÑO</span><span>OBJETIVO</span></div>
    <div v-for="r in rows" :key="r.problem" class="ergo-row">
      <div class="ergo-problem"><TechIcon :name="r.icon" :size="30" /><h2>{{ r.problem }}</h2></div>
      <span class="ergo-arrow" aria-hidden="true">→</span>
      <div class="ergo-tools"><h3>{{ r.tools }}</h3><p>{{ r.detail }}</p></div>
      <span class="ergo-arrow" aria-hidden="true">→</span>
      <p class="ergo-result">{{ r.result }}</p>
    </div>
  </div>
</template>

<style scoped>
.ergonomics-map { margin-top: 26px; }.ergo-head { display: grid; grid-template-columns: 34% 43% 23%; color: var(--muted); font-size: 9px; letter-spacing: .1em; margin-bottom: 8px; }
.ergo-row { display: grid; grid-template-columns: 29% 5% 38% 5% 23%; align-items: center; min-height: 108px; border-bottom: 1px solid var(--line); gap: 0; }
.ergo-problem { display: flex; align-items: center; gap: 15px; padding-right: 15px; }.ergo-problem svg { color: var(--teal); flex-shrink: 0; }.ergo-problem h2 { font-size: 18px; line-height: 1.35; }
.ergo-tools { background: var(--panel); border-radius: 8px; padding: 14px; }.ergo-tools h3 { font-size: 15px; }.ergo-tools p { font-size: 12px; color: var(--muted); margin-top: 7px; line-height: 1.5; }
.ergo-arrow { text-align: center; color: var(--teal); font-size: 23px; }.ergo-result { font-size: 14px; color: var(--teal); padding-left: 5px; }
</style>
