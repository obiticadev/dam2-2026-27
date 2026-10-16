<script setup>
import TechIcon from './TechIcon.vue'
const stations = [
  { x: 32, y: 72, label: 'Lavado / pelado', icon: 'water', n: '01' },
  { x: 252, y: 72, label: 'Corte / fritura', icon: 'heat', n: '02' },
  { x: 32, y: 238, label: 'Embolsado', icon: 'pressure', n: '03' },
  { x: 252, y: 238, label: 'Almacén', icon: 'box', n: '04' },
]
</script>

<template>
  <svg viewBox="0 0 470 380" role="img" aria-label="Plano conceptual de cuatro estaciones. El flujo del producto se conecta con una capa de información propuesta.">
    <defs>
      <pattern id="plant-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#dfe9ed" stroke-width=".6" /></pattern>
      <marker id="plant-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="m0 0 10 5-10 5Z" fill="#167c80" /></marker>
    </defs>
    <rect x="1" y="1" width="468" height="378" rx="16" fill="#f3f8fa" stroke="#d5e2e8" />
    <rect x="12" y="12" width="446" height="356" fill="url(#plant-grid)" />
    <text x="32" y="38" fill="#536a78" style="font-size: 10px; letter-spacing: 2px">OT / FLUJO DE PRODUCTO</text>
    <path d="M200 117H252M336 162v40H116v36M200 283H252" fill="none" stroke="#167c80" stroke-width="2" marker-end="url(#plant-arrow)" />
    <g v-for="s in stations" :key="s.n" :transform="`translate(${s.x}, ${s.y})`">
      <rect width="168" height="90" rx="8" fill="white" stroke="#b7ccd5" />
      <TechIcon :name="s.icon" :size="28" x="16" y="15" style="color: #167c80" />
      <text x="130" y="30" fill="#879da8" style="font-size: 15px">{{ s.n }}</text>
      <text x="16" y="69" fill="#182d3d" style="font-size: 13px; font-weight: 600">{{ s.label }}</text>
    </g>
    <rect x="122" y="177" width="226" height="34" rx="17" fill="#183446" />
    <text x="235" y="199" text-anchor="middle" fill="white" style="font-size: 11px">+ DATOS PARA PODER ACTUAR</text>
    <text x="32" y="354" fill="#536a78" style="font-size: 9px; letter-spacing: 1px">4 ESTACIONES · UNA VISIÓN COMPARTIDA</text>
  </svg>
</template>
