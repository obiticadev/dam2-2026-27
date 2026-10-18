<script setup>
import TechIcon from './TechIcon.vue'
defineProps({ stage: { type: Number, default: 0 } })
const steps = [
  { icon: 'pressure', label: 'Detectar', text: 'El ifm PN2094 mide la caída de presión', group: 0 },
  { icon: 'valve', label: 'Interrumpir', text: 'El PLC detiene el sellado', group: 0 },
  { icon: 'network', label: 'Comunicar', text: 'Estación, valor y hora', group: 1 },
  { icon: 'bell', label: 'Alertar', text: 'Vibración, sonido y aviso', group: 1 },
]
</script>

<template>
  <div class="workflow">
    <div class="workflow-lanes"><span>01 / RESPUESTA LOCAL</span><span>02 / AVISO A LA PERSONA</span></div>
    <div class="workflow-row">
      <template v-for="(step, i) in steps" :key="step.label">
        <div class="workflow-node" :class="[{ 'is-dim': stage < step.group }, i < 2 ? 'ot-node' : 'it-node']">
          <span class="step-index">0{{ i + 1 }}</span><TechIcon :name="step.icon" :size="30" />
          <h3>{{ step.label }}</h3><p>{{ step.text }}</p>
        </div>
        <div v-if="i < 3" class="workflow-arrow" :class="{ 'is-dim': stage < step.group }">→</div>
      </template>
    </div>
    <div class="workflow-resolution" :class="{ 'is-dim': stage < 2 }">
      <div><TechIcon name="check" /><span><b>Confirmar recepción</b><small>Asigna la atención. No reinicia.</small></span></div>
      <span class="resolution-arrow">→</span>
      <div><TechIcon name="shield" /><span><b>Reparar, validar y registrar</b><small>Reanudar solo tras la comprobación local.</small></span></div>
    </div>
    <div class="escalation" :class="{ 'is-dim': stage < 3 }"><TechIcon name="clock" :size="18" /><b>¿Sin respuesta?</b> Repetir el aviso y escalar a mantenimiento. <span>Plazo definido por la planta.</span></div>
  </div>
</template>
