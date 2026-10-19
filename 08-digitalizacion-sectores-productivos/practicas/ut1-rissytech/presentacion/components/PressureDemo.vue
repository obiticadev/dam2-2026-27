<script setup>
import { computed, ref } from 'vue'
import { onSlideEnter, useNav } from '@slidev/client'
import TechIcon from './TechIcon.vue'
const { isPrintMode, nextSlide, prevSlide } = useNav()
const state = ref(isPrintMode.value ? 'escalated' : 'normal')
const acknowledged = computed(() => state.value === 'ack')
const fault = computed(() => state.value !== 'normal')
const escalated = computed(() => state.value === 'escalated')
function reset() { state.value = isPrintMode.value ? 'escalated' : 'normal' }
onSlideEnter(reset)
</script>

<template>
  <div class="pressure-demo" @click.stop @keydown.space.stop @keydown.enter.stop @keydown.right.stop="nextSlide" @keydown.left.stop="prevSlide">
    <div class="demo-explanation">
      <span class="pill">SIMULACIÓN EDUCATIVA</span>
      <h2>La máquina actúa.<br>La persona recibe el aviso.</h2>
      <div class="demo-machine" :class="{ 'has-fault': fault }">
        <TechIcon name="pressure" :size="38" />
        <div><small>ESTACIÓN 03 · SENSOR PROPUESTO: ifm PN2094</small><strong>{{ fault ? 'Presión insuficiente' : 'Presión correcta' }}</strong><span>{{ fault ? 'Sellado interrumpido por el PLC' : 'Sellado habilitado' }}</span></div>
      </div>
      <div class="demo-controls">
        <button class="btn primary" :disabled="fault" @click="state = 'alert'"><TechIcon name="alert" :size="18" />Simular caída de presión</button>
        <button class="btn ghost" :disabled="state !== 'alert'" @click="state = 'escalated'">Simular plazo agotado</button>
        <div class="demo-reset-row"><button class="reset-button" @click="reset"><TechIcon name="reset" :size="16" /> Reiniciar demo</button></div>
      </div>
    </div>
    <div class="phone-shell" :class="{ 'phone-alarm': fault && !acknowledged }">
      <div class="phone-notch"></div><div class="phone-top"><span>09:41</span><span>● ▰</span></div>
      <div class="phone-brand"><TechIcon name="chip" :size="20" /><div>RissyTech<small>PUESTO DE MANTENIMIENTO</small></div><span class="connection-dot" title="Conexión simulada"></span></div>
      <div class="phone-body" aria-live="polite">
        <span class="phone-status" :class="fault ? 'status-red' : 'status-green'"><TechIcon :name="fault ? 'alert' : 'check'" :size="16" />{{ fault ? 'INCIDENCIA ABIERTA' : 'PLANTA SUPERVISADA' }}</span>
        <TechIcon :name="fault ? 'bell' : 'shield'" :size="32" class="phone-main-icon" />
        <h3>{{ fault ? 'Presión insuficiente' : 'Todo bajo control' }}</h3>
        <p>{{ fault ? 'Estación 3 · Embolsado' : 'Sin alertas pendientes en este escenario.' }}</p>
        <template v-if="fault">
          <div class="phone-detail"><span>Máquina</span><b>Sellado detenido</b><span>Evento</span><b>09:41 · Presión baja</b></div>
          <div class="alert-channels"><span>≈ Vibración</span><span>♪ Sonido</span><span>⚠ Visual</span></div>
          <button class="phone-ack" :disabled="acknowledged" @click="state = 'ack'">{{ acknowledged ? '✓ Alerta recibida' : 'Alerta recibida' }}</button>
          <p class="phone-message">{{ acknowledged ? 'Incidencia asignada al operario. La máquina sigue detenida.' : escalated ? 'Plazo agotado: aviso repetido y escalado a mantenimiento.' : 'Confirma que vas a atender la incidencia.' }}</p>
        </template>
        <div v-else class="phone-overview"><small>SUPERVISIÓN DE PLANTA</small><div><TechIcon name="pressure" :size="23" /><span><b>Embolsado</b><small>Sellado habilitado</small></span><TechIcon name="check" :size="16" /></div><p><span class="status-dot"></span>Esperando eventos del controlador</p></div>
      </div>
      <div class="phone-bottom"><span>PLANTA 01</span><span>SIMULACIÓN</span></div><div class="phone-home"></div>
    </div>
  </div>
</template>

<style scoped>
.pressure-demo { grid-template-columns: 1fr 250px; gap: 70px; padding-right: 65px; margin-top: 15px; }
.phone-shell { box-sizing: border-box; width: 226px; height: 426px; padding: 12px 13px 24px; border: 5px solid #182333; border-radius: 35px; background: #f2f5fa; box-shadow: 0 0 0 1px #95a1b0, 0 18px 35px #1b314c20; }
.phone-shell::before { content: ''; position: absolute; width: 3px; height: 33px; left: -8px; top: 85px; border-radius: 2px; background: #596778; }
.phone-shell::after { content: ''; position: absolute; width: 3px; height: 47px; right: -8px; top: 108px; border-radius: 2px; background: #596778; }
.phone-notch { top: 7px; left: 50%; transform: translateX(-50%); width: 65px; height: 16px; border-radius: 15px; background: #111827; }
.phone-top { height: 25px; padding: 0 5px 9px; font-size: 8px; align-items: center; }
.phone-top span:last-child { font-size: 8px; color: #182333; }
.phone-brand { margin: 0 -13px; padding: 10px 12px; gap: 7px; background: white; border-color: #dce4f0; font-size: 12px; }
.phone-brand > svg { background: #182333; color: white; box-sizing: content-box; padding: 6px; border-radius: 9px; }
.phone-brand small { display: block; color: #607494; font-size: 5px; letter-spacing: .1em; margin-top: 2px; }
.phone-brand .connection-dot { width: 6px; height: 6px; background: #13b981; border-radius: 50%; margin-left: auto; }
.phone-body { padding-top: 10px; }
.phone-status { font-size: 6px; padding: 5px 7px; border-radius: 15px; }
.phone-main-icon { display: block; margin-top: 8px; background: #dcf5eb; padding: 6px; box-sizing: content-box; border-radius: 12px; }
.phone-alarm .phone-main-icon { background: #ffe4e7; }
.phone-body h3 { font-size: 16px; margin-top: 7px; }
.phone-body > p { font-size: 9px; margin-top: 5px; }
.phone-detail { margin-top: 10px; border-color: #e0e5ef; border-radius: 9px; font-size: 8px; gap: 5px; padding: 9px; }
.alert-channels { font-size: 7px; gap: 3px; margin-top: 9px; }
.phone-ack { padding: 11px 6px; margin-top: 9px; font-size: 11px; border-radius: 9px; }
.phone-body .phone-message { font-size: 8px; line-height: 1.5; margin-top: 6px; }
.phone-overview { background: white; padding: 12px 10px; border: 1px solid #dce4f0; border-radius: 12px; margin-top: 18px; }
.phone-overview > small { font-size: 6px; color: #607494; letter-spacing: .08em; }
.phone-overview > div { display: flex; gap: 8px; align-items: center; margin-top: 12px; color: #335faa; }
.phone-overview b { display: block; font-size: 10px; color: #182d3d; }
.phone-overview div small { display: block; font-size: 8px; color: #536a78; margin-top: 3px; }
.phone-overview div > svg:last-child { margin-left: auto; color: #098764; }
.phone-overview p { font-size: 7px; color: #536a78; margin-top: 14px; border-top: 1px solid #e3eaf2; padding-top: 10px; }
.phone-overview .status-dot { width: 4px; height: 4px; margin-right: 4px; }
.phone-bottom { position: absolute; bottom: 22px; left: 14px; right: 14px; display: flex; justify-content: space-between; color: #607494; font-size: 6px; letter-spacing: .08em; }
.phone-home { position: absolute; bottom: 7px; width: 66px; height: 3px; left: 50%; transform: translateX(-50%); background: #182333; border-radius: 4px; }
</style>
