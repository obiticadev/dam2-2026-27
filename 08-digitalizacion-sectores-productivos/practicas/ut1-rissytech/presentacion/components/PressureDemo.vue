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
        <button class="reset-button" @click="reset"><TechIcon name="reset" :size="16" /> Reiniciar demo</button>
      </div>
      <p class="demo-footnote">Sin sonido ni vibración reales. La interfaz representa los canales de aviso de una app industrial.</p>
    </div>
    <div class="phone-shell" :class="{ 'phone-alarm': fault && !acknowledged }">
      <div class="phone-notch"></div><div class="phone-top"><span>09:41</span><span>RED DE PLANTA · DEMO</span></div>
      <div class="phone-brand"><TechIcon name="factory" :size="20" />RissyTech <span>OPERACIONES</span></div>
      <div class="phone-body" aria-live="polite">
        <span class="phone-status" :class="fault ? 'status-red' : 'status-green'"><TechIcon :name="fault ? 'alert' : 'check'" :size="16" />{{ fault ? 'INCIDENCIA ABIERTA' : 'PLANTA SUPERVISADA' }}</span>
        <TechIcon :name="fault ? 'bell' : 'shield'" :size="45" class="phone-main-icon" />
        <h3>{{ fault ? 'Presión insuficiente' : 'Todo bajo control' }}</h3>
        <p>{{ fault ? 'Estación 3 · Embolsado' : 'Sin alertas pendientes en este escenario.' }}</p>
        <template v-if="fault">
          <div class="phone-detail"><span>Máquina</span><b>Sellado detenido</b><span>Evento</span><b>09:41 · Presión baja</b></div>
          <div class="alert-channels"><span>≈ Vibración</span><span>♪ Sonido</span><span>⚠ Visual</span></div>
          <button class="phone-ack" :disabled="acknowledged" @click="state = 'ack'">{{ acknowledged ? '✓ Alerta recibida' : 'Alerta recibida' }}</button>
          <p class="phone-message">{{ acknowledged ? 'Incidencia asignada al operario. La máquina sigue detenida.' : escalated ? 'Plazo agotado: aviso repetido y escalado a mantenimiento.' : 'Confirma que vas a atender la incidencia.' }}</p>
        </template>
        <div v-else class="phone-empty"><span class="status-dot"></span>Esperando eventos del controlador</div>
      </div>
    </div>
  </div>
</template>
