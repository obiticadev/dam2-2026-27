<script setup>
import TechIcon from './TechIcon.vue'
const rows = [
  { n: '01', station: 'Lavado y pelado', icon: 'wave', variable: 'Vibraciones y cantidad de agua', devices: [{ model: 'ifm VVB001', kind: 'Vibración' }, { model: 'ifm SM8000', kind: 'Caudal de agua' }], use: 'Avisar si la peladora vibra demasiado y comprobar cuánta agua se usa.', tone: 'teal' },
  { n: '02', station: 'Corte y fritura', icon: 'heat', variable: 'Temperatura del aceite', devices: [{ model: 'WIKA TR21-A', kind: 'Temperatura · Pt100' }], use: 'Ayudar a mantener el aceite entre 170 y 190 °C.', tone: 'orange' },
  { n: '03', station: 'Embolsado', icon: 'pressure', variable: 'Presión del aire', devices: [{ model: 'ifm PN2094', kind: 'Presión' }], use: 'Detectar si falta presión para cerrar bien las bolsas.', tone: 'blue' },
  { n: '04', station: 'Almacén', icon: 'scan', variable: 'Qué palé entra o sale', devices: [{ model: 'Zebra FX9600-4', kind: 'RFID · antenas AN480' }], use: 'Leer los palés sin tener que apuntarlos a mano.', tone: 'purple' },
]
</script>

<template>
  <div class="signal-map" role="group" aria-label="De la variable de cada estación a su captura y su utilidad">
    <div class="signal-head"><span>ESTACIÓN / QUÉ MEDIMOS</span><span>MODELO PROPUESTO</span><span>PARA QUÉ LO USARÍAMOS</span></div>
    <div v-for="r in rows" :key="r.n" class="signal-row" :class="r.tone">
      <div class="signal-origin"><TechIcon :name="r.icon" :size="28" /><div><small>{{ r.n }} / {{ r.station }}</small><b>{{ r.variable }}</b></div></div>
      <span class="signal-arrow" aria-hidden="true">→</span>
      <div class="signal-device"><div v-for="device in r.devices" :key="device.model" class="signal-model"><strong>{{ device.model }}</strong><span>{{ device.kind }}</span></div></div>
      <span class="signal-arrow" aria-hidden="true">→</span>
      <p>{{ r.use }}</p>
    </div>
    <div class="signal-notes"><span>Vibración: detecta golpes, no las piedras directamente.</span><span>RFID: lee etiquetas para identificar los palés.</span></div>
  </div>
</template>

<style scoped>
.signal-map { margin-top: 24px; }
.signal-head { display: grid; grid-template-columns: 39% 32% 29%; font-size: 9px; letter-spacing: .1em; color: var(--muted); margin-bottom: 12px; }
.signal-row { --station: var(--teal); display: grid; grid-template-columns: 35% 4% 27% 5% 29%; align-items: center; min-height: 72px; border-bottom: 1px solid var(--line); }
.signal-row.orange { --station: var(--orange); }.signal-row.blue { --station: var(--blue); }.signal-row.purple { --station: var(--purple); }
.signal-origin { display: flex; align-items: center; gap: 15px; }.signal-origin svg { color: var(--station); flex-shrink: 0; }
small { display: block; color: var(--station); font-size: 9px; margin-bottom: 5px; text-transform: uppercase; letter-spacing: .06em; }
b { display: block; font-size: 15px; font-weight: 550; }.signal-arrow { color: var(--station); font-size: 22px; }
.signal-device { background: var(--panel); border: 1px solid var(--line); border-radius: 7px; padding: 9px 12px; font-size: 13px; }
.signal-model + .signal-model { margin-top: 6px; }
.signal-model strong { display: block; font-size: 14px; font-weight: 650; line-height: 1.25; }
.signal-model span { display: block; color: var(--muted); font-size: 11px; line-height: 1.3; }
.signal-row p { font-size: 13px; color: var(--muted); padding-left: 6px; }
.signal-notes { display: flex; justify-content: space-between; margin-top: 17px; font-size: 10px; color: var(--muted); }
</style>
