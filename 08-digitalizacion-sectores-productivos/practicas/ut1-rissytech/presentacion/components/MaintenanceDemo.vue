<script setup>
import { computed, ref } from 'vue'
import { onSlideEnter, useNav } from '@slidev/client'
import TechIcon from './TechIcon.vue'
const { nextSlide, prevSlide } = useNav()
const guards = ref(false)
const zone = ref(false)
const repaired = ref(false)
const confirmed = ref(false)
const authorized = ref(false)
const running = ref(false)
const safe = computed(() => guards.value && zone.value && repaired.value)
const message = ref('La máquina permanece detenida. Repara y comprueba las condiciones.')
function reset() {
  guards.value = zone.value = repaired.value = confirmed.value = authorized.value = running.value = false
  message.value = 'La máquina permanece detenida. Repara y comprueba las condiciones.'
}
function confirm() {
  confirmed.value = true
  authorized.value = false
  message.value = 'Reparación registrada. Pendiente de validación del controlador local.'
}
function validate() {
  authorized.value = safe.value
  message.value = safe.value ? 'Controlador: condiciones verificadas. Arranque disponible como acción separada.' : 'Controlador: arranque bloqueado. Faltan condiciones de seguridad.'
}
function invalidate() {
  authorized.value = running.value = false
  message.value = 'Condiciones modificadas: autorización retirada. Es necesario volver a validar.'
}
onSlideEnter(reset)
</script>

<template>
  <div class="maintenance-demo" @click.stop @keydown.space.stop @keydown.enter.stop @keydown.right.stop="nextSlide" @keydown.left.stop="prevSlide">
    <div class="tablet-bar"><span><TechIcon name="factory" :size="19" /><b>RissyTech</b> / MANTENIMIENTO</span><span class="pill">SIMULACIÓN · SIN MAQUINARIA REAL</span></div>
    <div class="tablet-heading"><div><small>ESTACIÓN 01 / LAVADO Y PELADO</small><h2>Motor de peladora</h2></div><span class="machine-badge" :class="running ? 'status-green' : 'status-red'"><TechIcon :name="running ? 'check' : 'alert'" :size="18" />{{ running ? 'En funcionamiento' : 'Motor detenido' }}</span></div>
    <div class="tablet-columns">
      <div class="motor-panel">
        <div class="panel-label">ESTADO DEL EQUIPO <span>DATOS ILUSTRATIVOS</span></div>
        <div class="motor-reading"><div class="motor-ring" :class="{ 'motor-running': running }"><TechIcon name="motor" :size="48" /></div><div><strong>{{ running ? '1.480' : '0' }}</strong><span>RPM</span><p>{{ running ? 'Giro estable' : 'Parada mantenida' }}</p></div></div>
        <div class="motor-cause" :class="{ 'cause-resolved': repaired }"><TechIcon :name="repaired ? 'check' : 'wave'" :size="20" /><div><b>{{ repaired ? 'Intervención realizada' : 'Vibración excesiva detectada' }}</b><span>{{ running ? 'Puesta en marcha registrada en el historial.' : repaired ? 'Pendiente de secuencia de puesta en marcha.' : 'Posible atasco, impacto u objeto extraño.' }}</span></div></div>
        <div class="motor-metrics"><div><small>TEMPERATURA</small><b>46 <em>°C</em></b></div><div><small>VIBRACIÓN</small><b>{{ repaired ? '1,8' : '12,4' }} <em>mm/s</em></b></div><div><small>CONTROL</small><b>Local <em>PLC</em></b></div></div>
      </div>
      <div class="safety-panel">
        <div class="panel-label">PROTOCOLO DE REACTIVACIÓN <TechIcon name="shield" :size="19" /></div>
        <div class="safety-checks">
          <label><input v-model="repaired" type="checkbox" @change="invalidate" />Intervención terminada</label>
          <label><input v-model="guards" type="checkbox" @change="invalidate" />Guardas de seguridad cerradas</label>
          <label><input v-model="zone" type="checkbox" @change="invalidate" />Zona de giro despejada</label>
        </div>
        <div class="repair-actions">
          <button class="btn primary" :disabled="!repaired || running" @click="confirm"><TechIcon name="check" :size="19" />Confirmar reparación</button>
          <div class="secondary-actions"><button class="btn ghost" :disabled="!confirmed || running" @click="validate">Validar PLC</button><button class="btn ghost" :disabled="!authorized || !safe || running" @click="running = true; message = 'Arranque simulado autorizado. Incidencia registrada en el historial.'"><TechIcon name="play" :size="14" />Arranque simulado</button></div>
        </div>
        <p class="safety-message" aria-live="polite">{{ message }}</p>
      </div>
    </div>
    <div class="tablet-footer"><span>Confirmar reparación ≠ arrancar el motor. El controlador mantiene los enclavamientos.</span><button class="reset-button" @click="reset"><TechIcon name="reset" :size="15" /> Reiniciar</button></div>
  </div>
</template>
