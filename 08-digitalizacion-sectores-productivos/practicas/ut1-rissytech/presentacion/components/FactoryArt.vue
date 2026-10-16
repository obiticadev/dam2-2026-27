<script setup>
import TechIcon from './TechIcon.vue'
const blocks = [
  { x: 60, y: 144, icon: 'water', n: '01', color: '#63ddc1' },
  { x: 220, y: 61, icon: 'heat', n: '02', color: '#f5b76b' },
  { x: 220, y: 228, icon: 'pressure', n: '03', color: '#8aaeff' },
  { x: 380, y: 144, icon: 'box', n: '04', color: '#b9a1ff' },
]
</script>

<template>
  <svg viewBox="0 0 540 410" role="img" aria-label="Ilustración isométrica de cuatro estaciones conectadas con un controlador local">
    <path d="m20 242 248-129 249 129-249 129Z" fill="#0d202a" stroke="#24424b" />
    <g stroke="#1b3942" fill="none">
      <path d="m63 264 248-129m-206 151L353 157m-206 151L395 179m-206 151L437 201m-206 151L479 223" />
      <path d="m63 220 248 129M105 198l248 129M147 176l248 129M189 154l248 129M231 132l248 129" />
    </g>
    <path d="m105 203 160-84 161 84-161 83Z" fill="none" stroke="#63ddc1" stroke-width="2" stroke-dasharray="5 5" />
    <g v-for="b in blocks" :key="b.n" :transform="`translate(${b.x}, ${b.y})`">
      <path d="m0 40 45 24 45-24-45-24Z" :fill="b.color" opacity="0.12" />
      <path d="M0 0v44l45 24V24Z" fill="#183540" stroke="#365861" />
      <path d="m45 24 45-24v44L45 68Z" fill="#112832" stroke="#365861" />
      <path d="m0 0 45-24L90 0 45 24Z" fill="#21404b" :stroke="b.color" />
      <TechIcon :name="b.icon" :size="28" x="31" y="-14" :style="{ color: b.color }" />
      <text x="13" y="33" fill="#bed1d6" style="font-size: 12px" transform="skewY(28)">{{ b.n }}</text>
      <circle cx="69" cy="40" r="3" :fill="b.color" />
    </g>
    <path d="M265 181V57" stroke="#63ddc1" stroke-width="1.5" stroke-dasharray="4 5" />
    <rect x="203" y="12" width="124" height="42" rx="7" fill="#12372f" stroke="#63ddc1" />
    <TechIcon name="chip" :size="21" x="215" y="22" style="color: #63ddc1" />
    <text x="246" y="38" fill="#d8fff3" style="font-size: 13px; font-weight: 600">EDGE / PLC</text>
    <text x="268" y="402" text-anchor="middle" fill="#8aabb4" style="font-size: 10px; letter-spacing: 2px">UNA PLANTA. UN SISTEMA CONECTADO.</text>
  </svg>
</template>
