<script setup>
// Fondo decorativo de las diapositivas nocturnas: estrellas, luna opcional y
// dos murciélagos. Se dibuja detrás del contenido y no capta el ratón.
import { useId } from 'vue'
const props = defineProps({ moon: { type: Boolean, default: false } })
const uid = `ns${useId().replace(/[^\w-]/g, '')}`

let seed = 7
const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647
const stars = Array.from({ length: 30 }, () => {
  return {
    x: 600 + rand() * 480,
    y: 26 + rand() * 180,
    r: 0.9 + rand() * 1.6,
    o: 0.35 + rand() * 0.45,
    d: `${(rand() * 1.4).toFixed(2)}s`,
  }
})
const sparks = [[650, 58, 0.8], [842, 150, 0.6], [1052, 40, 0.7]]
</script>

<template>
  <svg class="night-sky" viewBox="0 0 1100 619" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <radialGradient :id="`${uid}-halo`"><stop offset="0" stop-color="#ffe7a6" stop-opacity=".35" /><stop offset="1" stop-color="#ffe7a6" stop-opacity="0" /></radialGradient>
      <radialGradient :id="`${uid}-moon`" cx=".38" cy=".35" r=".75"><stop offset="0" stop-color="#fffbe6" /><stop offset=".7" stop-color="#f8e3a0" /><stop offset="1" stop-color="#eec46a" /></radialGradient>
    </defs>
    <circle v-for="(s, i) in stars" :key="i" class="ns-star" :style="{ animationDelay: s.d }" :cx="s.x" :cy="s.y" :r="s.r" fill="#fff3df" :opacity="s.o" />
    <g v-if="props.moon" class="ns-moon">
      <circle cx="972" cy="104" r="120" :fill="`url(#${uid}-halo)`" />
      <circle cx="972" cy="104" r="44" :fill="`url(#${uid}-moon)`" />
      <g fill="#efd28c" opacity=".55"><circle cx="958" cy="94" r="8" /><circle cx="986" cy="118" r="10" /><circle cx="984" cy="86" r="4" /></g>
    </g>
    <g fill="#18121f">
      <g class="ns-bat" style="animation-delay:.6s"><path transform="translate(880 70) scale(1.1)" d="M0 0C-6-9-16-13-30-9c4 4 5 9 4 15 5-4 10-4 13 1 3-4 7-4 9 0 1-3 2-5 4-5ZM0 0C6-9 16-13 30-9c-4 4-5 9-4 15-5-4-10-4-13 1-3-4-7-4-9 0-1-3-2-5-4-5Z" /></g>
      <g class="ns-bat" style="animation-delay:.9s"><path transform="translate(1040 168) scale(.75)" d="M0 0C-6-9-16-13-30-9c4 4 5 9 4 15 5-4 10-4 13 1 3-4 7-4 9 0 1-3 2-5 4-5ZM0 0C6-9 16-13 30-9c-4 4-5 9-4 15-5-4-10-4-13 1-3-4-7-4-9 0-1-3-2-5-4-5Z" /></g>
    </g>
    <g fill="#f6bd79">
      <g v-for="([x, y, s], i) in sparks" :key="i" :transform="`translate(${x} ${y}) scale(${s})`">
        <path class="ns-spark" :style="{ animationDelay: `${1 + i * 0.25}s` }" d="M0-11C1-4 4-1 11 0 4 1 1 4 0 11-1 4-4 1-11 0-4-1-1-4 0-11Z" />
      </g>
    </g>
  </svg>
</template>

<style>
.night-sky { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
.night-sky * { transform-box: fill-box; transform-origin: center; animation-fill-mode: both; }
.ns-star { animation: ns-twinkle .9s ease-out; }
.ns-moon { animation: ns-rise 1.2s cubic-bezier(.22, 1, .36, 1); }
.ns-bat { animation: ns-fly 1.8s cubic-bezier(.22, 1, .36, 1); }
.ns-spark { animation: ns-twinkle .8s ease-out; }
@keyframes ns-twinkle { from { transform: scale(0); opacity: 0 } 60% { transform: scale(1.6) } to { transform: none } }
@keyframes ns-rise { from { transform: translateY(40px); opacity: 0 } to { transform: none; opacity: 1 } }
@keyframes ns-fly { from { transform: translate(-160px, 60px) scale(.3); opacity: 0 } to { transform: none; opacity: 1 } }
</style>
