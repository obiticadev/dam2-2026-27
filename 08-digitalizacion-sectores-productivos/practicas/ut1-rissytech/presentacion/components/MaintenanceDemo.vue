<script setup>
import { computed, ref } from 'vue'
import { onSlideEnter, useNav } from '@slidev/client'
import TechIcon from './TechIcon.vue'
const { nextSlide, prevSlide } = useNav()
const guards = ref(true)
const zone = ref(true)
const electrical = ref(true)
const confirmed = ref(false)
const running = ref(false)
const diagnosis = ref('')
const observations = ref('')
const saved = ref(false)
const safe = computed(() => guards.value && zone.value && electrical.value)
const message = ref('Comprobaciones locales simuladas. Sin conexión a maquinaria real.')
function reset() {
  guards.value = zone.value = electrical.value = true
  confirmed.value = running.value = saved.value = false
  diagnosis.value = observations.value = ''
  message.value = 'Comprobaciones locales simuladas. Sin conexión a maquinaria real.'
}
function confirm() {
  confirmed.value = true
  message.value = safe.value ? 'Reparación registrada y condiciones locales verificadas. Arranque simulado disponible.' : 'Reparación registrada. Arranque bloqueado: faltan condiciones de seguridad.'
}
function invalidate() {
  confirmed.value = running.value = false
  message.value = 'Condiciones modificadas. Revisa las comprobaciones antes de continuar.'
}
function start() {
  if (!confirmed.value || !safe.value) return
  running.value = true
  message.value = 'Puesta en marcha simulada. Completa el diagnóstico de la intervención.'
}
onSlideEnter(reset)
</script>

<template>
  <div class="maintenance-demo" @click.stop @keydown.space.stop @keydown.enter.stop @keydown.right.stop="nextSlide" @keydown.left.stop="prevSlide">
    <div class="tablet-bar"><span><TechIcon name="chip" :size="19" /><span><b>RissyTech</b><small>PUESTO DE MANTENIMIENTO</small></span></span><span class="demo-connection"><i></i>PLC · SIMULADO<span class="operator-avatar">OB</span></span></div>
    <div class="tablet-heading"><div><small>ESTACIÓN 01 · LAVADO Y PELADO / PELADORA 04</small><h2>Motor de peladora</h2><p>Panel de diagnóstico y puesta en marcha segura</p></div><span class="machine-badge" :class="running ? 'status-green' : 'status-red'"><TechIcon :name="running ? 'check' : 'alert'" :size="18" />{{ running ? 'En funcionamiento' : 'Motor detenido' }}</span></div>
    <div class="tablet-columns">
      <div class="motor-panel">
        <div class="panel-label">ESTADO DEL EQUIPO <span>DATOS ILUSTRATIVOS</span></div><h3>Rendimiento del motor</h3>
        <div class="motor-reading"><div class="motor-ring" :class="{ 'motor-running': running }"><TechIcon name="motor" :size="38" /></div><div><small>VELOCIDAD ACTUAL</small><strong>{{ running ? '1.480' : '0' }}</strong><span>RPM</span><p :class="running ? 'reading-green' : 'reading-red'"><TechIcon :name="running ? 'check' : 'alert'" :size="14" />{{ running ? 'Giro estable' : 'Motor detenido · Alarma activa' }}</p></div></div>
        <div v-if="!running" class="motor-cause"><TechIcon name="wave" :size="23" /><div><small>CAUSA DE LA PARADA</small><b>Vibración excesiva detectada</b><span>Posible atasco, impacto u objeto extraño.</span></div><div class="threshold"><small>LÍMITE ILUSTRATIVO</small><b>7,0 mm/s</b></div></div>
        <div v-else class="motor-resolved"><TechIcon name="check" :size="20" />Motor reactivado · Parámetros normalizados</div>
        <div class="motor-metrics"><div><small>TEMPERATURA</small><b>46 <em>°C</em></b><span>Rango normal</span></div><div :class="{ 'metric-alarm': !running }"><small>VIBRACIÓN</small><b>{{ running ? '1,8' : '12,4' }} <em>mm/s</em></b><span>{{ running ? 'Sin anomalías' : 'Sobre el límite' }}</span></div><div><small>CONSUMO</small><b>{{ running ? '64' : '0,2' }} <em>A</em></b><span>Lectura ilustrativa</span></div></div>
      </div>
      <div class="safety-panel">
        <template v-if="!running">
          <div class="safety-title"><TechIcon name="shield" :size="25" /><div><small>PROTOCOLO DE SEGURIDAD</small><h3>{{ confirmed && safe ? 'Reparación confirmada' : 'Comprobar antes de continuar' }}</h3></div></div>
          <div class="safety-checks">
            <label><input v-model="guards" type="checkbox" @change="invalidate" />Guardas de seguridad cerradas</label>
            <label><input v-model="zone" type="checkbox" @change="invalidate" />Zona de giro despejada</label>
            <label><input v-model="electrical" type="checkbox" @change="invalidate" />Diagnóstico eléctrico correcto</label>
          </div>
          <p class="safety-message" aria-live="polite">{{ message }}</p>
          <button v-if="!confirmed || !safe" class="btn repair-primary" @click="confirm"><TechIcon name="check" :size="23" /><span>Confirmar reparación<small>Registrar la intervención y comprobar el PLC</small></span><span aria-hidden="true">›</span></button>
          <button v-else class="btn repair-primary" @click="start"><TechIcon name="play" :size="23" /><span>Arranque simulado<small>Acción independiente · Condiciones verificadas</small></span><span aria-hidden="true">›</span></button>
        </template>
        <template v-else>
          <div class="safety-title"><TechIcon name="check" :size="25" /><div><small>REGISTRO DE MANTENIMIENTO</small><h3>Diagnóstico del operario</h3></div></div>
          <p class="diagnosis-prompt">Selecciona la causa encontrada durante la reparación.</p>
          <div class="diagnosis-options"><label v-for="cause in ['Piedra u objeto extraño', 'Atasco mecánico', 'Sobrecalentamiento', 'Otra avería']" :key="cause"><input v-model="diagnosis" type="radio" :value="cause" name="diagnosis" @change="saved = false" />{{ cause }}</label></div>
          <label class="diagnosis-notes">Observaciones (opcional)<textarea v-model="observations" placeholder="Describe brevemente la reparación" @input="saved = false"></textarea></label>
          <button class="btn repair-primary save-diagnosis" :disabled="!diagnosis || saved" @click="saved = true"><TechIcon name="check" :size="18" />{{ saved ? 'Diagnóstico guardado en esta demo' : 'Guardar diagnóstico' }}</button>
          <p class="local-record" aria-live="polite">{{ saved ? 'Registro temporal: no se envía ni se conserva al reiniciar.' : 'Simulación educativa · Sin registro en un sistema real.' }}</p>
        </template>
      </div>
    </div>
    <div class="tablet-footer"><button class="reset-button" @click="reset"><TechIcon name="reset" :size="15" /> Reiniciar</button></div>
  </div>
</template>

<style scoped>
.maintenance-demo { background: linear-gradient(120deg, #f5f7fb, #edf3fc); border: 1px solid #dbe4ef; border-radius: 15px; padding: 0 18px; margin-top: 13px; font-size: 12px; line-height: 1.4; }
.tablet-bar { height: 44px; margin: 0 -18px; padding: 0 18px; background: white; border-radius: 15px 15px 0 0; border-color: #e0e7f1; }
.tablet-bar > span:first-child { gap: 9px; }
.tablet-bar > span:first-child > svg { background: #182333; color: white; padding: 6px; box-sizing: content-box; border-radius: 9px; }
.tablet-bar b { color: #182333; font-size: 12px; }
.tablet-bar small { display: block; font-size: 6px; letter-spacing: .14em; color: #607494; margin-top: 2px; }
.demo-connection { display: flex; align-items: center; gap: 6px; font-size: 7px; color: #607494; }
.demo-connection i { width: 5px; height: 5px; background: #0eaf80; border-radius: 50%; }
.operator-avatar { display: grid; place-items: center; width: 25px; height: 25px; border-radius: 50%; color: #2563eb; background: #e4edff; font-weight: 700; margin-left: 9px; }
.tablet-heading { padding: 9px 0; }
.tablet-heading small { display: block; color: #2563eb; font-size: 7px; letter-spacing: .1em; }
.tablet-heading h2 { color: #182333; font-size: 24px; margin-top: 4px; }
.tablet-heading p { color: #607494; font-size: 9px; margin-top: 3px; }
.machine-badge { border: 1px solid currentColor; font-size: 10px; background: #fff2f2; color: #d52a39; }
.machine-badge.status-green { background: #e9faf2; color: #07845d; }
.tablet-columns { grid-template-columns: 1.25fr 1fr; gap: 15px; }
.motor-panel, .safety-panel { background: white; border: 1px solid #e0e7f1; border-radius: 14px; padding: 14px; height: 285px; }
.panel-label { color: #607494; font-size: 7px; }
.panel-label > span { color: #2563eb; font-size: 6px; }
.motor-panel h3 { font-size: 14px; margin-top: 4px; color: #182333; }
.motor-panel { display: grid; grid-template-rows: auto auto minmax(68px, 1fr) auto auto; gap: 8px; }
.motor-panel h3 { margin-top: 0; }
.motor-reading { margin: 0; gap: 30px; justify-content: flex-start; padding-left: 13px; }
.motor-ring { width: 68px; height: 68px; border-width: 6px; background: #fff5f5; border-color: #ffe1e4; outline-color: #fff0f1; color: #ed3e4b; box-shadow: inset 0 0 16px #fbb2bc40; }
.motor-ring.motor-running { background: #edfcf5; border-color: #bfeedd; outline-color: #e2f8ef; color: #059a73; }
.motor-reading small { display: block; font-size: 6px; letter-spacing: .12em; color: #607494; }
.motor-reading strong { color: #182333; font-size: 34px; line-height: 1.2; }
.motor-reading p { display: flex; align-items: center; gap: 5px; font-size: 8px; line-height: 1.3; padding: 4px 8px; border-radius: 6px; }
.motor-reading .reading-red { color: #ce2939; background: #fff0f1; }.motor-reading .reading-green { color: #07845d; background: #e9faf2; }
.motor-cause { gap: 9px; border: 1px solid #ffcbd0; border-radius: 9px; background: #fff5f5; padding: 10px; color: #cf2738; }
.motor-cause small { display: block; font-size: 6px; letter-spacing: .07em; }
.motor-cause b { font-size: 10px; margin-top: 2px; }
.motor-cause span { color: #a84551; font-size: 7px; }
.threshold { border-left: 1px solid #f2c6cc; padding-left: 9px; margin-left: auto; flex-shrink: 0; }
.threshold b { font-size: 12px; }
.motor-resolved { height: 59px; display: flex; align-items: center; gap: 9px; color: #07845d; background: #edfcf5; border-radius: 9px; padding: 12px; font-size: 11px; }
.motor-metrics { gap: 9px; margin-top: 0; }
.motor-metrics > div { border: 1px solid #e0e7f1; border-radius: 8px; background: #f8faff; padding: 8px 10px; }
.motor-metrics > .metric-alarm { background: #fff3f4; border-color: #ffcbd0; color: #cf2738; }
.motor-metrics small { font-size: 6px; color: #607494; }
.motor-metrics b { font-size: 19px; margin-top: 3px; }
.motor-metrics span { display: block; color: #607494; font-size: 6px; margin-top: 3px; }
.safety-title { display: flex; gap: 10px; align-items: center; }
.safety-title > svg { padding: 8px; box-sizing: content-box; background: #dcf9ec; color: #059a73; border-radius: 10px; }
.safety-title small { display: block; font-size: 6px; letter-spacing: .1em; color: #607494; }
.safety-title h3 { font-size: 13px; margin-top: 3px; color: #182333; }
.safety-checks { margin-top: 12px; gap: 0; }
.safety-checks label { font-size: 10px; gap: 9px; padding: 7px 0; border-bottom: 1px solid #edf1f6; color: #465875; }
.safety-checks input { width: 15px; height: 15px; accent-color: #0bab78; }
.safety-message { min-height: 35px; background: #fff9e9; border: 1px solid #f4dfa0; border-radius: 8px; padding: 7px 9px; font-size: 8px; color: #81521a; line-height: 1.5; margin-top: 10px !important; }
.repair-primary { width: 100%; display: flex; justify-content: flex-start; gap: 12px; padding: 12px 16px; margin-top: 11px; min-height: 49px; background: #13ad55; color: white; border-radius: 10px; box-shadow: 0 6px 14px #0c9b4720; font-size: 15px; text-align: left; }
.repair-primary small { display: block; font-size: 7px; font-weight: 450; margin-top: 3px; }
.repair-primary > span:last-child { margin-left: auto; }.repair-primary > span:nth-child(2) { margin-left: 0; }
.tablet-footer { padding: 8px 0; }.tablet-footer > span { font-size: 8px; color: #607494; }
.diagnosis-prompt { font-size: 9px; color: #607494; margin-top: 11px; }
.diagnosis-options { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 10px; }
.diagnosis-options label { display: flex; align-items: center; gap: 5px; background: #f8faff; border: 1px solid #e0e7f1; border-radius: 6px; padding: 7px 5px; font-size: 8px; cursor: pointer; color: #465875; }
.diagnosis-options input { width: 11px; height: 11px; accent-color: #2563eb; }
.diagnosis-notes { display: block; font-size: 8px; color: #465875; margin-top: 10px; }
textarea { width: 100%; resize: none; height: 44px; display: block; padding: 8px; border: 1px solid #e0e7f1; border-radius: 7px; margin-top: 4px; font: 8px 'Inter Variable'; background: #f8faff; }
.save-diagnosis { font-size: 11px; min-height: 31px; margin-top: 9px; padding: 8px; justify-content: center; }
.local-record { color: #607494; font-size: 7px; margin-top: 6px; }
</style>
