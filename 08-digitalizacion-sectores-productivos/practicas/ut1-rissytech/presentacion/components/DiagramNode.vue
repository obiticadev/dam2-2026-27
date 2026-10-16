<script setup>
import TechIcon from './TechIcon.vue'
defineProps({ x: Number, y: Number, label: String, sub: String, icon: String, tone: { default: 'teal' }, width: { default: 132 } })
</script>

<template>
  <g :transform="`translate(${x}, ${y})`" :class="`diagram-node tone-${tone}`">
    <rect :width="width" height="100" rx="9" class="node-bg" />
    <rect x="12" y="12" width="32" height="32" rx="6" class="node-icon-bg" />
    <TechIcon :name="icon" x="18" y="18" :size="20" class="node-icon" />
    <text x="12" y="65" class="node-title">{{ label }}</text>
    <text x="12" y="84" class="node-sub">{{ sub }}</text>
  </g>
</template>
