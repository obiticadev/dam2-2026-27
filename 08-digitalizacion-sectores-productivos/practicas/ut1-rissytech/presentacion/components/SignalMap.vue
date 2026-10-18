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
    <div class="signal-cards">
      <article v-for="r in rows" :key="r.n" class="signal-card" :class="r.tone">
        <header><span>{{ r.n }}</span><TechIcon :name="r.icon" :size="32" /></header>
        <small>{{ r.station }}</small>
        <h2>{{ r.variable }}</h2>
        <div class="signal-device"><div v-for="device in r.devices" :key="device.model" class="signal-model"><span>{{ device.kind }}</span><strong>{{ device.model }}</strong></div></div>
        <div class="signal-purpose"><span class="purpose-label">EL DATO NOS PERMITE</span><p>{{ r.use }}</p></div>
      </article>
    </div>
    <div class="signal-notes"><span>Vibración: detecta golpes, no las piedras directamente.</span><span>RFID: lee etiquetas para identificar los palés.</span></div>
  </div>
</template>

<style scoped>
.signal-map { margin-top: 22px; }
.signal-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.signal-card { --station: var(--teal); padding: 16px; border: 1px solid var(--line); border-radius: 15px; background: white; position: relative; box-shadow: 0 8px 24px #19374b06; }
.signal-card.orange { --station: var(--orange); }.signal-card.blue { --station: var(--blue); }.signal-card.purple { --station: var(--purple); }
header { display: flex; align-items: center; justify-content: space-between; color: var(--station); margin-bottom: 10px; }
header > span { font: 600 25px 'Manrope Variable'; opacity: .65; }
small { display: block; color: var(--station); font-size: 9px; text-transform: uppercase; letter-spacing: .07em; }
.signal-card h2 { font-size: 20px; line-height: 1.25; margin-top: 7px; height: 54px; }
.signal-device { background: color-mix(in srgb, var(--station) 6%, white); border-radius: 9px; padding: 10px 12px; height: 84px; margin-top: 10px; display: flex; flex-direction: column; justify-content: center; gap: 8px; }
.signal-model strong { display: block; font-size: 14px; font-weight: 650; line-height: 1.25; margin-top: 2px; }
.signal-model span { display: block; color: var(--muted); font-size: 10px; line-height: 1.3; }
.signal-purpose { margin-top: 13px; border-top: 1px solid var(--line); padding-top: 11px; }
.purpose-label { display: block; color: var(--station); font-size: 8px; letter-spacing: .08em; font-weight: 650; margin-bottom: 7px; }
.signal-purpose p { font-size: 12px; line-height: 1.65; color: var(--muted); }
.signal-notes { display: flex; justify-content: space-between; margin-top: 15px; font-size: 9px; color: var(--muted); }
</style>
