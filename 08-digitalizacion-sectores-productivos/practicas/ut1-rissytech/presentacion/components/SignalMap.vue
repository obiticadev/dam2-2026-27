<script setup>
import TechIcon from './TechIcon.vue'
const rows = [
  { n: '01', station: 'Lavado y pelado', icon: 'wave', variable: 'Vibración + caudal de agua', sensor: 'Sensores de vibración y caudal', use: 'Detectar golpes o atascos; vigilar consumo y suministro de agua', tone: 'teal' },
  { n: '02', station: 'Corte y fritura', icon: 'heat', variable: 'Temperatura del aceite', sensor: 'Sonda de temperatura PT100', use: 'Comprobar el intervalo 170–190 °C', tone: 'orange' },
  { n: '03', station: 'Embolsado', icon: 'pressure', variable: 'Presión del aire comprimido', sensor: 'Sensor de presión', use: 'Detectar presión insuficiente', tone: 'blue' },
  { n: '04', station: 'Almacén', icon: 'scan', variable: 'Identidad del palé', sensor: 'Lector de etiquetas RFID', use: 'Registrar entradas y salidas', tone: 'purple' },
]
</script>

<template>
  <div class="signal-map" role="group" aria-label="De la variable de cada estación a su captura y su utilidad">
    <div class="signal-head"><span>ESTACIÓN / QUÉ OBSERVAR</span><span>CON QUÉ CAPTURARLO</span><span>PARA QUÉ</span></div>
    <div v-for="r in rows" :key="r.n" class="signal-row" :class="r.tone">
      <div class="signal-origin"><TechIcon :name="r.icon" :size="28" /><div><small>{{ r.n }} / {{ r.station }}</small><b>{{ r.variable }}</b></div></div>
      <span class="signal-arrow" aria-hidden="true">→</span>
      <div class="signal-device">{{ r.sensor }}</div>
      <span class="signal-arrow" aria-hidden="true">→</span>
      <p>{{ r.use }}</p>
    </div>
    <div class="signal-notes"><span>RFID identifica objetos; no mide una magnitud física.</span><span>El límite de presión lo define la máquina, no la app.</span></div>
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
.signal-device { background: var(--panel); border: 1px solid var(--line); border-radius: 7px; padding: 12px; font-size: 13px; }
.signal-row p { font-size: 13px; color: var(--muted); padding-left: 6px; }
.signal-notes { display: flex; justify-content: space-between; margin-top: 17px; font-size: 10px; color: var(--muted); }
</style>
