<script setup>
import { computed, useId } from 'vue'

const props = defineProps({ scene: String, label: String })

// Cada instancia lleva sus propios ids: Slidev oculta las diapositivas con
// display:none y un degradado definido en una diapositiva oculta no se pinta.
const uid = `sa${useId().replace(/[^\w-]/g, '')}`
const id = n => `${uid}-${n}`
const u = n => `url(#${uid}-${n})`
const h = n => `#${uid}-${n}`

const INK = '#442e36'
const SKIES = {
  cover: { moon: [250, 86, 34] },
  roots: { moon: [352, 104, 56], harvest: true },
  england: { moon: [414, 62, 22] },
  vegetables: { moon: [446, 56, 16], night: true },
  door: { moon: [86, 64, 22] },
  hero: { moon: [424, 60, 22] },
  choice: { moon: [250, 74, 30], night: true },
}
const sky = computed(() => SKIES[props.scene] || {})
const night = computed(() => !!sky.value.night)

const stars = [
  [52, 50, 1.8], [96, 30, 1.3], [142, 72, 2], [188, 36, 1.4], [306, 30, 1.6], [334, 64, 1.2],
  [384, 38, 2], [458, 98, 1.4], [462, 40, 1.8], [64, 124, 1.2], [214, 92, 1.6], [292, 104, 1.3],
  [430, 140, 1.2], [164, 128, 1.4], [120, 168, 1.1], [372, 170, 1.1],
].map(([x, y, r], i) => ({ x, y, r, d: `${(0.15 + (i % 7) * 0.13).toFixed(2)}s` }))

// Banderines del salón del fantasma: se reparten sobre una curva cuadrática.
const bunting = Array.from({ length: 11 }, (_, i) => {
  const t = (i + 0.5) / 11
  const [x0, y0, x1, y1, x2, y2] = [18, 26, 250, 86, 482, 26]
  const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * x1 + t ** 2 * x2
  const y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * y1 + t ** 2 * y2
  const dx = 2 * (1 - t) * (x1 - x0) + 2 * t * (x2 - x1)
  const dy = 2 * (1 - t) * (y1 - y0) + 2 * t * (y2 - y1)
  return { x, y, a: Math.atan2(dy, dx) * 180 / Math.PI, c: ['#f98c36', '#9a7cc4', '#edc66d', '#76a05f'][i % 4], d: `${(0.1 + i * 0.07).toFixed(2)}s` }
})

const pickets = Array.from({ length: 27 }, (_, i) => 14 + i * 18)
const ticks = Array.from({ length: 12 }, (_, i) => i * 30)
</script>

<template>
  <svg viewBox="0 0 500 350" role="img" :aria-label="label" class="story-art" :class="`scene-${scene}`">
    <defs>
      <clipPath :id="id('frame')"><rect x="18" y="12" width="464" height="316" rx="44" /></clipPath>
      <clipPath :id="id('glass')"><rect x="50" y="62" width="120" height="128" /></clipPath>

      <linearGradient :id="id('dusk')" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2b2343" /><stop offset=".5" stop-color="#55416f" /><stop offset=".8" stop-color="#a8678a" /><stop offset="1" stop-color="#ee9f6a" />
      </linearGradient>
      <linearGradient :id="id('night')" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#17132a" /><stop offset=".7" stop-color="#2f2650" /><stop offset="1" stop-color="#4a3a6c" />
      </linearGradient>
      <radialGradient :id="id('moon')" cx=".38" cy=".35" r=".75">
        <stop offset="0" stop-color="#fffbe6" /><stop offset=".7" stop-color="#f8e3a0" /><stop offset="1" stop-color="#eec46a" />
      </radialGradient>
      <radialGradient :id="id('harvest')" cx=".4" cy=".35" r=".8">
        <stop offset="0" stop-color="#ffe2a0" /><stop offset=".6" stop-color="#f6a85a" /><stop offset="1" stop-color="#e07c3c" />
      </radialGradient>
      <radialGradient :id="id('halo')">
        <stop offset="0" stop-color="#ffe7a6" stop-opacity=".55" /><stop offset=".55" stop-color="#ffd27a" stop-opacity=".18" /><stop offset="1" stop-color="#ffd27a" stop-opacity="0" />
      </radialGradient>
      <radialGradient :id="id('glow')">
        <stop offset="0" stop-color="#ffd36b" stop-opacity=".8" /><stop offset=".5" stop-color="#ffb347" stop-opacity=".28" /><stop offset="1" stop-color="#ff9a3c" stop-opacity="0" />
      </radialGradient>
      <radialGradient :id="id('pump')" cx=".38" cy=".3" r=".85">
        <stop offset="0" stop-color="#ffbf72" /><stop offset=".55" stop-color="#f58a34" /><stop offset="1" stop-color="#d4621f" />
      </radialGradient>
      <radialGradient :id="id('pside')" cx=".5" cy=".3" r=".9">
        <stop offset="0" stop-color="#f29443" /><stop offset="1" stop-color="#bb521c" />
      </radialGradient>
      <radialGradient :id="id('flame')" cx=".5" cy=".65" r=".7">
        <stop offset="0" stop-color="#fffbd2" /><stop offset=".5" stop-color="#ffd85c" /><stop offset="1" stop-color="#f5a133" />
      </radialGradient>
      <linearGradient :id="id('ghost')" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffffff" /><stop offset=".55" stop-color="#f4eefa" /><stop offset="1" stop-color="#d9cbec" />
      </linearGradient>
      <linearGradient :id="id('hatgrad')" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#a98bd4" /><stop offset=".6" stop-color="#7d5bb0" /><stop offset="1" stop-color="#5d3f8c" />
      </linearGradient>
      <linearGradient :id="id('cape')" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f07466" /><stop offset="1" stop-color="#b53c3a" />
      </linearGradient>
      <linearGradient :id="id('turnip')" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8a58a8" /><stop offset=".32" stop-color="#c7a3d6" /><stop offset=".55" stop-color="#f7f0f4" /><stop offset="1" stop-color="#eadfe6" />
      </linearGradient>
      <linearGradient :id="id('window')" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff0b0" /><stop offset="1" stop-color="#f6b45a" />
      </linearGradient>
      <linearGradient :id="id('interior')" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffe3a0" /><stop offset="1" stop-color="#f0a058" />
      </linearGradient>
      <radialGradient :id="id('vignette')" cx=".5" cy=".45" r=".75">
        <stop offset=".55" stop-color="#1c1428" stop-opacity="0" /><stop offset="1" stop-color="#1c1428" stop-opacity=".45" />
      </radialGradient>

      <pattern :id="id('bricks')" width="26" height="14" patternUnits="userSpaceOnUse">
        <rect width="26" height="14" fill="#c46a4c" /><path d="M0 .5h26M0 7.5h26M7 .5v7M20 7.5v7" stroke="#9f4c36" stroke-width="1.3" />
      </pattern>
      <pattern :id="id('siding')" width="12" height="13" patternUnits="userSpaceOnUse">
        <rect width="12" height="13" fill="#86ad9f" /><path d="M0 12.2h12" stroke="#668d80" stroke-width="1.6" />
      </pattern>
      <pattern :id="id('planks')" width="64" height="18" patternUnits="userSpaceOnUse">
        <rect width="64" height="18" fill="#4d3c5e" /><path d="M0 17.4h64M40 0v18" stroke="#3a2d4b" stroke-width="1.4" />
      </pattern>
      <pattern :id="id('paper')" width="30" height="30" patternUnits="userSpaceOnUse">
        <rect width="30" height="30" fill="#5b4879" /><circle cx="7" cy="7" r="1.7" fill="#7562a0" /><circle cx="22" cy="22" r="1.7" fill="#7562a0" /><path d="m22 5 1.2 2.4 2.4 1.2-2.4 1.2L22 12.2l-1.2-2.4-2.4-1.2 2.4-1.2Z" fill="#6c5893" />
      </pattern>

      <mask :id="id('trail')" maskUnits="userSpaceOnUse" x="0" y="0" width="500" height="350">
        <path class="a-draw" style="--d:.35s" pathLength="1" stroke-dasharray="1" d="M116 220C160 104 340 104 384 220" fill="none" stroke="#fff" stroke-width="12" />
      </mask>
      <mask :id="id('magic')" maskUnits="userSpaceOnUse" x="0" y="0" width="500" height="350">
        <path class="a-draw" style="--d:.7s" pathLength="1" stroke-dasharray="1" d="M206 132C236 90 276 90 300 124" fill="none" stroke="#fff" stroke-width="14" />
      </mask>

      <!-- Piezas reutilizables -->
      <path :id="id('spark')" d="M0-11C1-4 4-1 11 0 4 1 1 4 0 11-1 4-4 1-11 0-4-1-1-4 0-11Z" />
      <g :id="id('bat')" fill="#21192f">
        <path d="M0 0C-6-9-16-13-30-9c4 4 5 9 4 15 5-4 10-4 13 1 3-4 7-4 9 0 1-3 2-5 4-5Z" /><path d="M0 0C-6-9-16-13-30-9c4 4 5 9 4 15 5-4 10-4 13 1 3-4 7-4 9 0 1-3 2-5 4-5Z" transform="scale(-1 1)" /><ellipse cy="1" rx="5" ry="7" />
        <path d="m-4-4-1-7 3 4h4l3-4-1 7Z" /><circle cx="-2" cy="-1" r=".9" fill="#ffd36b" /><circle cx="2" cy="-1" r=".9" fill="#ffd36b" />
      </g>
      <g :id="id('leaf')">
        <path d="M0-14C10-10 15 2 0 15-15 2-10-10 0-14Z" stroke="#442e36" stroke-width="2" stroke-linejoin="round" /><path d="M0-10V12" stroke="#442e36" stroke-width="1.5" opacity=".5" />
      </g>

      <g :id="id('pumpkin')">
        <path d="M-2-40C-5-56-1-66 10-72" fill="none" :stroke="INK" stroke-width="15" stroke-linecap="round" />
        <path d="M-2-40C-5-56-1-66 10-72" fill="none" stroke="#4d7a44" stroke-width="9" stroke-linecap="round" />
        <path d="M-4-48c-18-8-30 0-26 10 3 7 12 5 11-2" fill="none" stroke="#76a05f" stroke-width="3" stroke-linecap="round" />
        <g :stroke="INK" stroke-width="3">
          <ellipse cx="-36" cy="4" rx="34" ry="44" :fill="u('pside')" /><ellipse cx="36" cy="4" rx="34" ry="44" :fill="u('pside')" />
          <ellipse cx="-16" cy="2" rx="32" ry="48" :fill="u('pump')" /><ellipse cx="16" cy="2" rx="32" ry="48" :fill="u('pump')" />
          <ellipse cx="0" cy="2" rx="22" ry="49" :fill="u('pump')" />
        </g>
        <path d="M-52-20c4-12 12-18 20-21" fill="none" stroke="#ffe0b0" stroke-width="5" stroke-linecap="round" opacity=".7" />
        <path d="M6-60c12-18 36-16 42-2-14 8-30 8-42 2Z" fill="#76a05f" :stroke="INK" stroke-width="2.5" stroke-linejoin="round" />
        <path d="M10-60c12-3 24-3 34-2" fill="none" stroke="#4d7a44" stroke-width="2" />
      </g>
      <g :id="id('jack')" :fill="u('flame')" :stroke="INK" stroke-width="2.5" stroke-linejoin="round">
        <path d="M-34-6-20-28-8-6Z" /><path d="M8-6 20-28 34-6Z" /><path d="M-5 9 0-1l5 10Z" />
        <path d="M-36 16C-24 40 24 40 36 16c-5 4-10 4-14 2l-2 8-8-4c-8 2-16 2-24 0l-8 4-2-8c-4 2-9 2-14-2Z" />
      </g>
      <g :id="id('painted')">
        <path d="m-30-14 3.4 7 7.6 1.1-5.5 5.4 1.3 7.6-6.8-3.6-6.8 3.6 1.3-7.6-5.5-5.4 7.6-1.1Z" fill="#8064ab" :stroke="INK" stroke-width="1.5" />
        <path d="m24 4 2.6 5.4 5.9.9-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.9Z" fill="#edc66d" :stroke="INK" stroke-width="1.5" />
        <circle cx="4" cy="-20" r="5" fill="#fff3df" :stroke="INK" stroke-width="1.5" /><circle cx="-10" cy="22" r="4" fill="#8064ab" /><circle cx="30" cy="-24" r="3.5" fill="#fff3df" /><circle cx="-40" cy="16" r="3" fill="#edc66d" />
      </g>

      <g :id="id('arm-down')">
        <path d="M-46 6c-18 2-36-6-38-20-1-10 10-13 18-6 6 6 12 8 20 8Z" :fill="u('ghost')" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
      </g>
      <g :id="id('arm-wave')">
        <path d="M46-6c16-8 28-26 26-42-1-10-12-12-15-2-2 10-5 18-13 24Z" :fill="u('ghost')" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
      </g>
      <g :id="id('ghost-body')">
        <path d="M-56 58c-4-38-6-66 0-94 10-48 102-48 112 0 6 28 6 60 14 92-10 10-20-4-30 6S20 58 8 68-16 62-28 70s-22-2-28-12Z" :fill="u('ghost')" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <path d="M34-60c16 14 22 40 22 66 2 20 4 34 8 48-6 4-12 0-18 4 0-30 0-78-12-118Z" fill="#cdbbe3" opacity=".55" />
      </g>
      <g :id="id('ghost-face')">
        <ellipse cx="-20" cy="-26" rx="8" ry="11" :fill="INK" /><ellipse cx="20" cy="-26" rx="8" ry="11" :fill="INK" />
        <circle cx="-17" cy="-30" r="3.3" fill="#fff" /><circle cx="23" cy="-30" r="3.3" fill="#fff" /><circle cx="-22" cy="-21" r="1.5" fill="#fff" /><circle cx="18" cy="-21" r="1.5" fill="#fff" />
        <ellipse cx="-38" cy="-8" rx="9" ry="5" fill="#f6a3a0" opacity=".8" /><ellipse cx="38" cy="-8" rx="9" ry="5" fill="#f6a3a0" opacity=".8" />
        <path d="M-12-10q12 4 24 0-4 18-12 18T-12-10Z" :fill="INK" /><path d="M-6 3q6-5 12 0-3 4-6 4t-6-4Z" fill="#ef8f8f" />
      </g>
      <g :id="id('costume-face')">
        <ellipse cx="-18" cy="-24" rx="8" ry="10" :fill="INK" /><ellipse cx="18" cy="-26" rx="8" ry="10" :fill="INK" />
        <path d="M-50 10q10 4 18 0M30 18q10 4 18-2" fill="none" stroke="#cdbbe3" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <g :id="id('hat')">
        <ellipse cy="-64" rx="64" ry="13" fill="#563a80" :stroke="INK" stroke-width="3" />
        <path d="M-38-68c8-24 18-54 36-72 12-12 30-16 44-6-14 2-22 10-25 22 7 20 15 38 21 56-24 6-52 6-76 0Z" :fill="u('hatgrad')" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <path d="M-35-76c23 6 47 6 70 0l-4-14c-21 6-41 6-62 0Z" fill="#edc66d" :stroke="INK" stroke-width="2.5" stroke-linejoin="round" />
        <path d="M0-91c.8 3 2 4.2 5 5-3 .8-4.2 2-5 5-.8-3-2-4.2-5-5 3-.8 4.2-2 5-5Z" fill="#fff8e0" :stroke="INK" stroke-width="1.2" />
        <path d="M-26-96c4-14 10-28 18-38" fill="none" stroke="#c7b0e6" stroke-width="4" stroke-linecap="round" opacity=".7" />
      </g>

      <g :id="id('house-uk')">
        <rect x="34" y="-178" width="24" height="48" fill="#b0563d" :stroke="INK" stroke-width="3" />
        <rect x="30" y="-186" width="32" height="10" rx="2" fill="#8a4532" :stroke="INK" stroke-width="3" />
        <path d="M-98-96 0-168 98-96Z" fill="#4e4766" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <path d="M-72-115h144M-47-133h94M-22-151h44" stroke="#665e84" stroke-width="2.5" />
        <rect x="-82" y="-98" width="164" height="98" :fill="u('bricks')" :stroke="INK" stroke-width="3" />
        <g :stroke="INK" stroke-width="3"><rect x="-68" y="-84" width="38" height="42" :fill="u('window')" /><rect x="30" y="-84" width="38" height="42" :fill="u('window')" /></g>
        <path d="M-49-84v42m-19-21h38m49-21v42m-19-21h38" stroke="#f3e9d6" stroke-width="3.5" />
        <g fill="#efe3cc" :stroke="INK" stroke-width="2"><rect x="-72" y="-43" width="46" height="7" rx="2" /><rect x="26" y="-43" width="46" height="7" rx="2" /></g>
        <path d="M-18 0v-58a18 18 0 0 1 36 0V0Z" fill="#2f5d55" :stroke="INK" stroke-width="3" />
        <path d="M-12-58a12 12 0 0 1 24 0Z" :fill="u('window')" :stroke="INK" stroke-width="2" />
        <circle cy="-34" r="4.5" fill="none" stroke="#edc66d" stroke-width="2.5" /><circle cx="11" cy="-24" r="2.6" fill="#edc66d" />
        <rect x="-26" y="-5" width="52" height="7" rx="2" fill="#d6cab6" :stroke="INK" stroke-width="2" />
      </g>
      <g :id="id('house-us')">
        <path d="M-88-104 0-172l88 68Z" fill="#7a5c8c" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <circle cy="-128" r="12" :fill="u('window')" :stroke="INK" stroke-width="3" /><path d="M0-140v24m-12-12h24" stroke="#f3e9d6" stroke-width="2.5" />
        <rect x="-76" y="-106" width="152" height="106" :fill="u('siding')" :stroke="INK" stroke-width="3" />
        <g :stroke="INK" stroke-width="3"><rect x="-56" y="-98" width="32" height="26" :fill="u('window')" /><rect x="24" y="-98" width="32" height="26" :fill="u('window')" /><rect x="-60" y="-48" width="34" height="28" :fill="u('window')" /></g>
        <path d="M-40-98v26m80-26v26m-84 2v28" stroke="#f3e9d6" stroke-width="2.5" />
        <path d="M-94-56H94l-10-15H-84Z" fill="#5f4570" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <g fill="#f3ead9" :stroke="INK" stroke-width="2"><rect x="-80" y="-56" width="9" height="56" /><rect x="71" y="-56" width="9" height="56" /></g>
        <rect x="-4" y="-52" width="30" height="52" fill="#b84f3f" :stroke="INK" stroke-width="3" /><circle cx="20" cy="-24" r="2.6" fill="#edc66d" />
        <circle cx="40" cy="-40" r="11" :fill="u('glow')" /><circle cx="40" cy="-40" r="4" fill="#fff0b0" :stroke="INK" stroke-width="1.5" />
        <path d="m-51-27 4-6 4 6Zm10 0 4-6 4 6Zm-7 6q6 5 12 0" fill="#7b3d1d" opacity=".7" />
        <rect x="-10" y="-4" width="42" height="6" rx="2" fill="#d6cab6" :stroke="INK" stroke-width="2" />
      </g>

      <g :id="id('hero-body')">
        <g :stroke="INK" stroke-linecap="round"><path d="M-12-40v28M12-40v28" stroke-width="18" /></g>
        <path d="M-12-40v28M12-40v28" stroke="#3d5f9e" stroke-width="12" stroke-linecap="round" />
        <g fill="#c9433d" :stroke="INK" stroke-width="3"><ellipse cx="-15" cy="-5" rx="12" ry="7.5" /><ellipse cx="15" cy="-5" rx="12" ry="7.5" /></g>
        <path d="M-22-88c-12 12-16 26-14 38" fill="none" :stroke="INK" stroke-width="15" stroke-linecap="round" />
        <path d="M-22-88c-12 12-16 26-14 38" fill="none" stroke="#4f7fc0" stroke-width="9" stroke-linecap="round" />
        <circle cx="-36" cy="-48" r="7.5" fill="#c98b62" :stroke="INK" stroke-width="2.5" />
        <rect x="-25" y="-100" width="50" height="64" rx="17" fill="#4f7fc0" :stroke="INK" stroke-width="3" />
        <path d="M-14-94c-4 14-4 34 0 48" fill="none" stroke="#7aa3db" stroke-width="5" stroke-linecap="round" opacity=".7" />
        <rect x="-25" y="-50" width="50" height="9" fill="#edc66d" :stroke="INK" stroke-width="2" /><rect x="-5" y="-51" width="10" height="11" rx="2" fill="#fff3c4" :stroke="INK" stroke-width="1.5" />
        <path d="m0-87 3.5 7.2 8 1.1-5.8 5.6 1.4 7.9L0-69l-7.1 3.8 1.4-7.9-5.8-5.6 8-1.1Z" fill="#edc66d" :stroke="INK" stroke-width="2" stroke-linejoin="round" />
        <circle cy="-126" r="30" fill="#c98b62" :stroke="INK" stroke-width="3" />
        <path d="M-31-128c-2-24 20-34 36-30 18 2 28 16 26 34-6-12-16-16-26-12-10-8-24-6-36 8Z" fill="#3a2a2e" :stroke="INK" stroke-width="2" stroke-linejoin="round" />
        <path d="M-31-124c10-10 22-6 31 0 9-6 21-10 31 0-4 10-16 14-25 8l-6-2-6 2c-9 6-21 2-25-8Z" fill="#c9433d" :stroke="INK" stroke-width="2.5" stroke-linejoin="round" />
        <path d="M-30-122l-13-7m13 7-12 5" stroke="#c9433d" stroke-width="4" stroke-linecap="round" />
        <ellipse cx="-13" cy="-121" rx="5.5" ry="4.5" fill="#fff" /><ellipse cx="13" cy="-121" rx="5.5" ry="4.5" fill="#fff" />
        <circle cx="-12" cy="-121" r="2.6" :fill="INK" /><circle cx="14" cy="-121" r="2.6" :fill="INK" />
        <circle cx="-20" cy="-106" r="5" fill="#f2a093" opacity=".7" /><circle cx="20" cy="-106" r="5" fill="#f2a093" opacity=".7" />
        <path d="M-9-106q9 9 18 0" fill="none" :stroke="INK" stroke-width="3" stroke-linecap="round" />
      </g>
      <g :id="id('hero-arm')">
        <path d="M22-88c12-12 18-28 18-44" fill="none" :stroke="INK" stroke-width="15" stroke-linecap="round" />
        <path d="M22-88c12-12 18-28 18-44" fill="none" stroke="#4f7fc0" stroke-width="9" stroke-linecap="round" />
        <circle cx="40" cy="-138" r="8.5" fill="#c98b62" :stroke="INK" stroke-width="2.5" />
      </g>
      <path :id="id('cape-shape')" d="M-20-96c-14 26-26 60-40 90 22-6 42 2 62-4 20 6 38-4 56 2-14-32-26-62-38-88Z" :fill="u('cape')" :stroke="INK" stroke-width="3" stroke-linejoin="round" />

      <g :id="id('clock-face')">
        <circle r="30" fill="#8064ab" :stroke="INK" stroke-width="3" /><circle r="24" fill="#fff8e9" :stroke="INK" stroke-width="2" />
        <path v-for="a in ticks" :key="a" d="M0-21v4" :stroke="INK" :stroke-width="a % 90 ? 1.5 : 3" stroke-linecap="round" :transform="`rotate(${a})`" />
      </g>
      <g :id="id('sweet')">
        <path d="m-14 0-16-12v24Zm28 0 16-12v24Z" fill="#9a7cc4" :stroke="INK" stroke-width="2" stroke-linejoin="round" />
        <rect x="-17" y="-11" width="34" height="22" rx="10" fill="#edc66d" :stroke="INK" stroke-width="2" /><path d="M-6-10 2 10M6-10l6 14" stroke="#f98c36" stroke-width="3" />
      </g>
      <g :id="id('lolly')">
        <path d="M0 0v34" stroke="#f3ead9" stroke-width="4" stroke-linecap="round" />
        <circle r="13" fill="#f07466" :stroke="INK" stroke-width="2" /><path d="M0 0c4 0 5-5 1-7-6-2-10 4-8 9 3 7 14 6 16-2" fill="none" stroke="#fff3df" stroke-width="3" stroke-linecap="round" />
      </g>
      <g :id="id('pail')">
        <path d="M-22-34c0-30 44-30 44 0" fill="none" :stroke="INK" stroke-width="3" />
        <use :href="h('lolly')" transform="translate(8 -44) rotate(14) scale(.7)" /><use :href="h('sweet')" transform="translate(-8 -38) rotate(-18) scale(.55)" />
        <path d="M-27-36h54l-5 32c-1 5-43 5-44 0Z" :fill="u('pump')" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <ellipse cy="-36" rx="27" ry="5" fill="#d8682a" :stroke="INK" stroke-width="2.5" />
        <path d="m-13-22 5-8 5 8Zm13 0 5-8 5 8Zm-14 7q11 9 22 0" :fill="INK" />
      </g>
      <g :id="id('apple')">
        <path d="M0-10c-6-6-18-4-18 8 0 12 10 18 18 14 8 4 18-2 18-14 0-12-12-14-18-8Z" :stroke="INK" stroke-width="2.5" stroke-linejoin="round" />
        <path d="M0-10q1-8 5-11" fill="none" :stroke="INK" stroke-width="2.5" stroke-linecap="round" /><path d="M3-17q8-6 13 0-7 4-13 0Z" fill="#76a05f" :stroke="INK" stroke-width="1.5" />
        <path d="M-12-4q0-6 5-8" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".6" />
      </g>
      <g :id="id('soulcake')">
        <ellipse cy="2" rx="27" ry="13" fill="#c98a4f" :stroke="INK" stroke-width="2.5" />
        <ellipse cy="-4" rx="25" ry="10" fill="#e8b77a" :stroke="INK" stroke-width="2.5" />
        <path d="M-13-4h26M0-11V3" stroke="#9c6235" stroke-width="3.5" stroke-linecap="round" />
        <g fill="#5a3a2e"><circle cx="-16" cy="-7" r="1.8" /><circle cx="14" cy="-1" r="1.8" /><circle cx="8" cy="-9" r="1.6" /><circle cx="-8" cy="1" r="1.6" /></g>
      </g>
    </defs>

    <!-- ESCENARIO COMÚN: cielo, estrellas y luna dentro del marco del cuento -->
    <g :clip-path="u('frame')">
      <template v-if="scene !== 'ghost'">
        <rect width="500" height="350" :fill="u(night ? 'night' : 'dusk')" />
        <g fill="#fff6d8"><circle v-for="(s, i) in stars" :key="i" class="a-twinkle" :style="{ '--d': s.d }" :cx="s.x" :cy="s.y" :r="s.r" /></g>
        <g v-if="sky.moon" class="a-rise" style="--d:.05s">
          <circle :cx="sky.moon[0]" :cy="sky.moon[1]" :r="sky.moon[2] * 2.6" :fill="u('halo')" />
          <circle :cx="sky.moon[0]" :cy="sky.moon[1]" :r="sky.moon[2]" :fill="u(sky.harvest ? 'harvest' : 'moon')" />
          <g :fill="sky.harvest ? '#e58a46' : '#efd28c'" opacity=".55">
            <circle :cx="sky.moon[0] - sky.moon[2] * .35" :cy="sky.moon[1] - sky.moon[2] * .2" :r="sky.moon[2] * .18" />
            <circle :cx="sky.moon[0] + sky.moon[2] * .3" :cy="sky.moon[1] + sky.moon[2] * .3" :r="sky.moon[2] * .24" />
            <circle :cx="sky.moon[0] + sky.moon[2] * .25" :cy="sky.moon[1] - sky.moon[2] * .45" :r="sky.moon[2] * .1" />
          </g>
        </g>
      </template>

      <!-- 01 · Portada: de una casa inglesa a una americana -->
      <g v-if="scene === 'cover'">
        <path d="M0 236c80-24 150-12 220-2 80 12 160-22 280-8v124H0Z" fill="#3c3157" />
        <path d="M0 268c120-12 180-6 250-2 80 4 150-12 250-4v88H0Z" fill="#2a2340" />
        <g class="a-pop" style="--d:.15s"><use :href="h('house-uk')" transform="translate(110 272) scale(.74)" /></g>
        <g class="a-pop" style="--d:.3s"><use :href="h('house-us')" transform="translate(392 272) scale(.74)" /></g>
        <g class="a-fly" style="--d:1s"><use :href="h('bat')" transform="translate(148 74) scale(.85)" /></g>
        <g class="a-fly" style="--d:1.2s"><use :href="h('bat')" transform="translate(372 52) scale(.6)" /></g>
      </g>

      <!-- 02 · Raíces: hoguera de Samhain bajo la luna de cosecha -->
      <g v-else-if="scene === 'roots'">
        <path d="M0 246c90-20 180-14 260-2 90 14 160-10 240-4v110H0Z" fill="#3a2f52" />
        <g fill="#251e36"><path d="m392 258 4-50c2-10 14-10 16 0l4 50Z" /><path d="m428 258 3-66c2-12 18-12 20 0l3 66Z" /><path d="m464 258 2-36c2-8 12-8 14 0l2 36Z" /></g>
        <path d="M0 272c120-10 200-8 270-2s150-8 230-4v84H0Z" fill="#2a2340" />
        <circle cx="146" cy="232" r="100" :fill="u('glow')" class="a-glow" style="--d:.2s" />
        <g transform="translate(146 270)">
          <g class="a-pop" style="--d:.1s"><g :stroke="INK" stroke-width="3" fill="#7a4a32"><rect x="-48" y="-8" width="96" height="16" rx="8" transform="rotate(14)" /><rect x="-48" y="-8" width="96" height="16" rx="8" transform="rotate(-14)" /></g></g>
          <g class="a-pop" style="--d:.3s"><g class="a-flicker" style="--d:.9s">
            <path d="M0-100c22 26 46 46 38 80-6 22-70 22-76 0-8-32 22-42 38-80Z" fill="#f2862f" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
            <path d="M3-70c14 18 24 32 18 52-6 12-34 12-40 0-6-18 12-28 22-52Z" fill="#f9c34a" />
            <path d="M0-40c8 10 12 18 8 28-4 6-14 6-17 0-3-10 5-16 9-28Z" fill="#fff2b0" />
          </g></g>
          <g fill="#ffd36b"><circle class="a-ember" style="--d:1s" cx="-20" cy="-112" r="3" /><circle class="a-ember" style="--d:1.3s" cx="24" cy="-124" r="2.4" /><circle class="a-ember" style="--d:1.6s" cx="4" cy="-140" r="2" /></g>
        </g>
        <ellipse cx="282" cy="282" rx="34" ry="6" fill="#000" opacity=".25" />
        <g class="a-rise" style="--d:.5s"><g transform="translate(282 214) scale(.6)">
          <use :href="h('arm-down')" /><g class="a-wave" style="--d:1.4s"><use :href="h('arm-wave')" /></g>
          <use :href="h('ghost-body')" /><use :href="h('ghost-face')" />
        </g></g>
        <g class="a-drop" style="--d:.6s"><use :href="h('leaf')" fill="#e9a23b" transform="translate(70 92) rotate(-30)" /></g>
        <g class="a-drop" style="--d:.9s"><use :href="h('leaf')" fill="#d06a3f" transform="translate(236 70) rotate(40) scale(.85)" /></g>
        <g class="a-drop" style="--d:1.2s"><use :href="h('leaf')" fill="#b5543c" transform="translate(440 182) rotate(-60) scale(.9)" /></g>
        <g class="a-drop" style="--d:1.5s"><use :href="h('leaf')" fill="#e9a23b" transform="translate(56 300) rotate(80) scale(.8)" /></g>
      </g>

      <!-- 03 · Inglaterra: casita de ladrillo, soul cakes y apple bobbing -->
      <g v-else-if="scene === 'england'">
        <path d="M0 212v-26h34v-12h8v12l24-16 30 16h30v-8l30-22 34 24v32Zm334 0v-30l28-18 28 18h20v-10h8v10l26-16 56 18v28Z" fill="#3c3157" />
        <path d="M0 266c120-8 180-6 250-4s150-8 250-2v90H0Z" fill="#2a2340" />
        <path d="M228 330l10-62h24l10 62Z" fill="#54476b" />
        <g class="a-pop" style="--d:.1s"><use :href="h('house-uk')" transform="translate(250 268) scale(1.02)" /></g>
        <g class="a-fly" style="--d:1s"><use :href="h('bat')" transform="translate(380 92) scale(.7)" /></g>
      </g>

      <!-- 04 · El fantasma decora el salón -->
      <g v-else-if="scene === 'ghost'">
        <rect width="500" height="350" :fill="u('paper')" />
        <g>
          <rect x="40" y="52" width="140" height="148" rx="8" fill="#f3ead9" :stroke="INK" stroke-width="3" />
          <rect x="50" y="62" width="120" height="128" :fill="u('night')" />
          <g :clip-path="u('glass')">
            <circle cx="132" cy="98" r="40" :fill="u('halo')" /><circle cx="132" cy="98" r="15" :fill="u('moon')" />
            <g fill="#fff6d8"><circle cx="66" cy="80" r="1.6" /><circle cx="88" cy="140" r="1.3" /><circle cx="154" cy="160" r="1.5" /><circle cx="72" cy="170" r="1.2" /></g>
            <path d="M50 190v-24l14-10 14 10v-6h8v12l16-12 22 14 20-10 26 14v12Z" fill="#251e36" />
            <g class="a-fly" style="--d:1.1s"><use :href="h('bat')" transform="translate(84 112) scale(.5)" /></g>
          </g>
          <path d="M110 62v128M50 126h120" stroke="#f3ead9" stroke-width="7" />
          <rect x="34" y="196" width="152" height="11" rx="3" fill="#e6d8c0" :stroke="INK" stroke-width="2.5" />
          <path d="M22 44h176" :stroke="INK" stroke-width="5" stroke-linecap="round" />
          <g fill="#7f5a9a" :stroke="INK" stroke-width="2.5" stroke-linejoin="round">
            <path d="M28 44c16 46 12 106-2 170h26c8-64 4-124-2-170Z" /><path d="M192 44c-16 46-12 106 2 170h-26c-8-64-4-124 2-170Z" />
          </g>
          <path d="M36 60c6 40 6 90 0 140m148-140c-6 40-6 90 0 140" stroke="#9b7bb6" stroke-width="3" fill="none" />
        </g>
        <path d="M18 26Q250 86 482 26" fill="none" stroke="#f3ead9" stroke-width="2" />
        <g v-for="(f, i) in bunting" :key="i" :transform="`translate(${f.x} ${f.y}) rotate(${f.a})`">
          <path class="a-swing" :style="{ '--d': f.d }" d="M-12 0h24L0 24Z" :fill="f.c" :stroke="INK" stroke-width="2" stroke-linejoin="round" />
        </g>
        <rect y="252" width="500" height="98" :fill="u('planks')" />
        <rect y="246" width="500" height="10" fill="#3b2e4f" :stroke="INK" stroke-width="2" />
        <ellipse cx="262" cy="304" rx="178" ry="28" fill="#a9532a" :stroke="INK" stroke-width="2.5" />
        <ellipse cx="262" cy="304" rx="156" ry="20" fill="none" stroke="#edc66d" stroke-width="3" stroke-dasharray="10 8" />
        <rect width="500" height="350" :fill="u('vignette')" />
        <ellipse cx="262" cy="292" rx="52" ry="8" fill="#000" opacity=".28" />
      </g>

      <!-- 05 · Linternas: del nabo a la calabaza -->
      <g v-else-if="scene === 'vegetables'">
        <path d="M0 270c120-14 220-10 290-4s140-10 210-6v90H0Z" fill="#221b35" />
        <circle cx="138" cy="200" r="98" :fill="u('glow')" class="a-glow" style="--d:.4s" />
        <circle cx="370" cy="210" r="124" :fill="u('glow')" class="a-glow" style="--d:1.3s" />
      </g>

      <!-- 06 · Trick or treat en la puerta -->
      <g v-else-if="scene === 'door'">
        <path d="M0 284c60-8 140-8 230-4v70H0Z" fill="#2a2340" />
        <path d="M40 350l60-66h60l-20 66Z" fill="#3f3556" />
        <rect x="228" y="-4" width="280" height="290" :fill="u('siding')" :stroke="INK" stroke-width="3" />
        <path d="M232 22l52 0M232 22l0 50M232 22l40 34M232 22c14 4 16 16 12 28M232 46c10-6 22-4 26 6" fill="none" stroke="#fff3df" stroke-width="1.5" opacity=".6" />
        <rect x="208" y="10" width="300" height="22" fill="#5f4570" :stroke="INK" stroke-width="3" />
        <rect x="282" y="86" width="130" height="198" fill="#f3ead9" :stroke="INK" stroke-width="3" />
        <rect x="292" y="96" width="110" height="188" :fill="u('interior')" />
        <path d="M402 96l-34 12v164l34 12Z" fill="#a84636" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <circle cx="376" cy="194" r="3.5" fill="#edc66d" :stroke="INK" stroke-width="1.5" />
        <path d="M300 96h94M300 104c12 10 26 10 38 0" fill="none" stroke="#e8a35a" stroke-width="2" />
        <circle cx="456" cy="146" r="46" :fill="u('glow')" class="a-glow" style="--d:.3s" />
        <path d="M456 112v10" :stroke="INK" stroke-width="3" /><rect x="445" y="122" width="22" height="30" rx="4" :fill="u('window')" :stroke="INK" stroke-width="3" /><path d="M442 122h28M442 152h28" :stroke="INK" stroke-width="3" stroke-linecap="round" />
        <rect x="226" y="282" width="282" height="18" fill="#8a6a5a" :stroke="INK" stroke-width="3" />
        <rect x="268" y="300" width="160" height="14" fill="#9c7c6a" :stroke="INK" stroke-width="3" />
        <rect x="254" y="314" width="188" height="20" fill="#ad8d79" :stroke="INK" stroke-width="3" />
        <ellipse cx="176" cy="290" rx="40" ry="6" fill="#000" opacity=".25" />
      </g>

      <!-- 07 · Calabaza enorme, superhéroe diminuto -->
      <g v-else-if="scene === 'hero'">
        <path d="M0 236v-30h40l22-16 22 16h38v30Zm300 0v-34l26-18 26 18h40v-12l24-14 24 14h60v46Z" fill="#3c3157" />
        <g fill="#cfc5d6" :stroke="INK" stroke-width="1.5" opacity=".85"><rect x="0" y="236" width="500" height="5" /><rect x="0" y="250" width="500" height="5" /></g>
        <path v-for="x in pickets" :key="x" :d="`M${x} 268v-38l6-8 6 8v38Z`" fill="#ebe1d4" :stroke="INK" stroke-width="1.5" opacity=".9" />
        <path d="M0 262c120-6 260-8 500-2v90H0Z" fill="#2e3f39" />
        <path d="M0 262c120-6 260-8 500-2" fill="none" stroke="#45594f" stroke-width="3" />
        <circle cx="160" cy="210" r="120" :fill="u('glow')" class="a-glow" style="--d:.5s" />
        <ellipse cx="160" cy="300" rx="96" ry="12" fill="#000" opacity=".25" />
        <ellipse cx="352" cy="296" rx="42" ry="6" fill="#000" opacity=".25" />
      </g>

      <!-- 09 · ¿Fantasma o superhéroe? -->
      <g v-else-if="scene === 'choice'">
        <path d="M0 250v-22h30v-10l18-12 18 12v32Zm80 0v-16l22-14 22 14v16Zm300 0v-26l20-14 20 14h20v-8l20-12 22 12h18v34Z" fill="#251e38" />
        <g fill="#ffd36b"><rect x="38" y="228" width="6" height="7" /><rect x="96" y="236" width="6" height="6" /><rect x="394" y="232" width="6" height="7" /><rect x="452" y="228" width="6" height="6" /></g>
        <path d="M0 262c120-12 200-12 260-6s160 8 240-4v98H0Z" fill="#1d182c" />
        <ellipse cx="146" cy="290" rx="40" ry="6" fill="#000" opacity=".3" />
        <ellipse cx="360" cy="294" rx="38" ry="6" fill="#000" opacity=".3" />
      </g>
    </g>

    <rect x="18" y="12" width="464" height="316" rx="44" fill="none" :stroke="night ? '#fff3df' : INK" :stroke-opacity="night ? .22 : 1" stroke-width="3" />

    <!-- PRIMER PLANO: los personajes pueden salir un poco del marco -->
    <g v-if="scene === 'cover'">
      <path d="M116 220C160 104 340 104 384 220" fill="none" stroke="#edc66d" stroke-width="3.5" stroke-dasharray="2 10" stroke-linecap="round" :mask="u('trail')" />
      <g class="a-rise" style="--d:.55s"><g class="a-bob" style="--d:1.6s"><g transform="translate(250 196) scale(.66)">
        <use :href="h('arm-down')" /><g class="a-wave" style="--d:1.3s"><use :href="h('arm-wave')" /></g>
        <use :href="h('ghost-body')" /><use :href="h('ghost-face')" />
        <path d="M-94-12v-10h22v10" fill="none" :stroke="INK" stroke-width="3.5" />
        <rect x="-108" y="-14" width="48" height="36" rx="7" fill="#e9bf63" :stroke="INK" stroke-width="3.5" />
        <rect x="-108" y="-1" width="48" height="7" fill="#c9433d" :stroke="INK" stroke-width="2" />
        <circle cx="-72" cy="14" r="6" fill="#6b8fd0" :stroke="INK" stroke-width="2" /><circle cx="-96" cy="14" r="5" fill="#fff3df" :stroke="INK" stroke-width="2" />
      </g></g></g>
      <g class="a-pop" style="--d:.7s"><use :href="h('pumpkin')" transform="translate(56 298) scale(.36)" /><use :href="h('jack')" transform="translate(56 298) scale(.36)" /></g>
      <g class="a-pop" style="--d:.85s"><use :href="h('pumpkin')" transform="translate(448 304) scale(.3)" /><use :href="h('jack')" transform="translate(448 304) scale(.3)" /></g>
      <g fill="#edc66d"><g transform="translate(476 28) scale(1.2)"><use class="a-twinkle" style="--d:1.4s" :href="h('spark')" /></g><g transform="translate(24 196)"><use class="a-twinkle" style="--d:1.7s" :href="h('spark')" /></g></g>
    </g>

    <g v-else-if="scene === 'roots'">
      <g fill="#edc66d"><g transform="translate(30 40) scale(1.2)"><use class="a-twinkle" style="--d:1.2s" :href="h('spark')" /></g></g>
    </g>

    <g v-else-if="scene === 'england'">
      <ellipse cx="96" cy="300" rx="58" ry="15" fill="#f3ead9" :stroke="INK" stroke-width="2.5" />
      <ellipse cx="96" cy="298" rx="44" ry="9" fill="none" stroke="#d6cab6" stroke-width="2" />
      <g class="a-pop" style="--d:.45s"><use :href="h('soulcake')" transform="translate(76 290)" /></g>
      <g class="a-pop" style="--d:.55s"><use :href="h('soulcake')" transform="translate(116 292)" /></g>
      <g class="a-pop" style="--d:.65s"><use :href="h('soulcake')" transform="translate(96 274)" /></g>
      <g class="a-pop" style="--d:.8s"><g transform="translate(402 300)">
        <path d="M-48-30h96l-7 46c-1 8-81 8-82 0Z" fill="#a7724a" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <path d="M-46-12h92M-43 6h86" stroke="#7d5236" stroke-width="3.5" />
        <ellipse cy="-30" rx="48" ry="11" fill="#7fb2c9" :stroke="INK" stroke-width="2.5" />
        <path d="M-34-28q8-4 16 0m30 2q8-4 16 0" fill="none" stroke="#d8eef5" stroke-width="2" stroke-linecap="round" />
        <g class="a-bob" style="--d:1.3s"><use :href="h('apple')" fill="#d2463d" transform="translate(-20 -34) scale(.75)" /></g>
        <g class="a-bob" style="--d:1.5s"><use :href="h('apple')" fill="#8bb35a" transform="translate(10 -36) scale(.72)" /></g>
        <g class="a-bob" style="--d:1.7s"><use :href="h('apple')" fill="#d2463d" transform="translate(32 -30) scale(.6)" /></g>
      </g></g>
      <g class="a-pop" style="--d:.95s"><use :href="h('pumpkin')" transform="translate(316 300) scale(.32)" /><use :href="h('jack')" transform="translate(316 300) scale(.32)" /></g>
      <g fill="#edc66d"><g transform="translate(30 38) scale(1.2)"><use class="a-twinkle" style="--d:1.3s" :href="h('spark')" /></g><g transform="translate(476 214)"><use class="a-twinkle" style="--d:1.6s" :href="h('spark')" /></g></g>
    </g>

    <g v-else-if="scene === 'ghost'">
      <g transform="translate(414 116)">
        <use :href="h('clock-face')" />
        <g class="a-sweep-h" style="--d:.6s"><circle r="22" fill="none" /><path d="M0 0 9.5 5.5" :stroke="INK" stroke-width="4" stroke-linecap="round" /></g>
        <g class="a-sweep-m" style="--d:.6s"><circle r="22" fill="none" /><path d="M0 0V-17" :stroke="INK" stroke-width="2.5" stroke-linecap="round" /></g>
        <circle r="3" fill="#c9433d" />
      </g>
      <circle cx="104" cy="282" r="44" :fill="u('glow')" class="a-glow" style="--d:.5s" />
      <circle cx="396" cy="276" r="58" :fill="u('glow')" class="a-glow" style="--d:.8s" />
      <g class="a-pop" style="--d:.3s"><use :href="h('pumpkin')" transform="translate(104 292) scale(.48)" /><use :href="h('jack')" transform="translate(104 292) scale(.48)" /></g>
      <g class="a-pop" style="--d:.45s"><use :href="h('pumpkin')" transform="translate(200 306) scale(.36)" /><use :href="h('painted')" transform="translate(200 306) scale(.36)" /></g>
      <g class="a-pop" style="--d:.6s"><g transform="translate(396 288) scale(.62)">
        <use :href="h('pumpkin')" /><use :href="h('jack')" />
        <circle cx="-48" cy="-24" r="4" fill="#8064ab" /><circle cx="50" cy="20" r="4.5" fill="#8064ab" /><circle cx="44" cy="-30" r="3" fill="#fff3df" />
      </g></g>
      <g class="a-rise" style="--d:.15s"><g class="a-bob" style="--d:1.2s"><g transform="translate(262 182)">
        <g class="a-wave" style="--d:1.1s;transform-origin:85% 90%"><use :href="h('arm-wave')" transform="scale(-1 1)" /></g>
        <g transform="scale(-1 1)"><use :href="h('arm-down')" /></g>
        <path d="M86-22l26 36" :stroke="INK" stroke-width="9" stroke-linecap="round" /><path d="M86-22l26 36" stroke="#c98a4f" stroke-width="5" stroke-linecap="round" />
        <rect x="104" y="4" width="12" height="9" rx="2" transform="rotate(-36 110 8)" fill="#cfc5d6" :stroke="INK" stroke-width="2" />
        <path d="M110 14c4 8 8 14 16 14-2-8-6-14-8-18Z" fill="#8064ab" :stroke="INK" stroke-width="2" stroke-linejoin="round" />
        <use :href="h('ghost-body')" /><use :href="h('ghost-face')" />
        <g transform="rotate(-7 0 -66)"><use :href="h('hat')" /></g>
      </g></g></g>
      <g fill="#8064ab"><circle class="a-ember-down" style="--d:1.5s" cx="382" cy="216" r="3.2" /><circle class="a-ember-down" style="--d:1.8s" cx="390" cy="232" r="2.4" /></g>
      <g fill="#edc66d">
        <g transform="translate(360 240) scale(.8)"><use class="a-twinkle" style="--d:1.6s" :href="h('spark')" /></g>
        <g transform="translate(448 236) scale(.6)"><use class="a-twinkle" style="--d:1.9s" :href="h('spark')" /></g>
        <g transform="translate(476 196) scale(1.1)"><use class="a-twinkle" style="--d:1.2s" :href="h('spark')" /></g>
        <g transform="translate(22 250) scale(1)"><use class="a-twinkle" style="--d:1.4s" :href="h('spark')" /></g>
      </g>
    </g>

    <g v-else-if="scene === 'vegetables'">
      <g class="a-pop" style="--d:.15s"><g transform="translate(138 192) scale(1.02)">
        <path d="M-40-40c0-62 80-62 80 0" fill="none" stroke="#a5825f" stroke-width="3.5" />
        <path d="M-4-56c-10-24-26-36-36-32 4 12 18 22 32 32Zm8 0c6-28 20-42 32-38-2 14-14 28-28 38Z" fill="#76a05f" :stroke="INK" stroke-width="2.5" stroke-linejoin="round" />
        <path d="M0-60c38 0 62 32 58 64-4 30-32 46-50 62-4 6-6 14-8 26-2-12-4-20-8-26-18-16-46-32-50-62-4-32 20-64 58-64Z" :fill="u('turnip')" :stroke="INK" stroke-width="3" />
        <path d="M-40-30c-6 10-8 22-6 32" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6" />
        <use :href="h('jack')" transform="translate(0 12) scale(.82)" />
      </g></g>
      <path d="M206 132C236 90 276 90 300 124" fill="none" stroke="#edc66d" stroke-width="4" stroke-dasharray="3 9" stroke-linecap="round" :mask="u('magic')" />
      <path class="a-pop" style="--d:1.15s" d="m290 112 12 14-18 2" fill="none" stroke="#edc66d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <g class="a-pop" style="--d:1.05s"><use :href="h('pumpkin')" transform="translate(372 214) scale(1.22)" /><use :href="h('jack')" transform="translate(372 214) scale(1.22)" /></g>
      <g fill="#edc66d">
        <g transform="translate(252 74) scale(1.1)"><use class="a-twinkle" style="--d:.9s" :href="h('spark')" /></g>
        <g transform="translate(226 150) scale(.6)"><use class="a-twinkle" style="--d:1.1s" :href="h('spark')" /></g>
        <g transform="translate(282 160) scale(.7)"><use class="a-twinkle" style="--d:1.3s" :href="h('spark')" /></g>
      </g>
    </g>

    <g v-else-if="scene === 'door'">
      <g class="a-rise" style="--d:.7s">
        <path d="M402 186c-28 0-50 4-76 10" fill="none" :stroke="INK" stroke-width="18" stroke-linecap="round" />
        <path d="M402 186c-28 0-50 4-76 10" fill="none" stroke="#6e4e83" stroke-width="12" stroke-linecap="round" />
        <circle cx="322" cy="198" r="8" fill="#c98b62" :stroke="INK" stroke-width="2.5" />
        <use :href="h('lolly')" transform="translate(300 186) rotate(-10) scale(.8)" />
        <use :href="h('sweet')" transform="translate(282 200) rotate(-20) scale(.55)" />
        <use :href="h('sweet')" transform="translate(320 204) rotate(16) scale(.5)" />
        <path d="M264 202h76c-2 30-22 42-38 42s-36-12-38-42Z" fill="#8064ab" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
        <path d="M274 212c4 12 12 20 22 22" fill="none" stroke="#a98bd4" stroke-width="3.5" stroke-linecap="round" />
      </g>
      <g :stroke="'#fff3df'" stroke-width="3.5" stroke-linecap="round" fill="none">
        <path class="a-knock" style="--d:.5s" d="M268 128q-10 12 0 24" />
        <path class="a-knock" style="--d:.75s" d="M256 120q-16 20 0 40" />
      </g>
      <g class="a-rise" style="--d:.2s"><g transform="translate(176 226) scale(.72)">
        <g fill="#c9433d" :stroke="INK" stroke-width="3"><ellipse cx="-22" cy="78" rx="15" ry="9" /><ellipse cx="24" cy="78" rx="15" ry="9" /></g>
        <path d="M-34 80h24M10 80h26" stroke="#fff3df" stroke-width="3" />
        <use :href="h('arm-down')" />
        <g transform="scale(-1 1)"><use :href="h('arm-down')" /></g>
        <use :href="h('ghost-body')" /><use :href="h('costume-face')" />
        <use :href="h('pail')" transform="translate(86 46) scale(.95)" />
      </g></g>
      <g class="a-pop" style="--d:1s"><use :href="h('pumpkin')" transform="translate(470 278) scale(.28)" /><use :href="h('jack')" transform="translate(470 278) scale(.28)" /></g>
      <g class="a-pop" style="--d:1.1s"><use :href="h('pumpkin')" transform="translate(52 304) scale(.3)" /><use :href="h('jack')" transform="translate(52 304) scale(.3)" /></g>
      <g fill="#edc66d"><g transform="translate(28 182)"><use class="a-twinkle" style="--d:1.3s" :href="h('spark')" /></g></g>
    </g>

    <g v-else-if="scene === 'hero'">
      <g class="a-pop" style="--d:.1s"><use :href="h('pumpkin')" transform="translate(160 214) scale(1.52)" /><use :href="h('jack')" transform="translate(160 214) scale(1.52)" /></g>
      <g transform="translate(440 304)">
        <rect x="-30" y="-36" width="60" height="36" rx="3" fill="#a7724a" :stroke="INK" stroke-width="3" /><path d="M-30-18h60M-10-36v36M10-36v36" stroke="#7d5236" stroke-width="2.5" />
        <g transform="translate(0 -68) scale(.82)">
          <g fill="#edc66d" :stroke="INK" stroke-width="2.5"><path d="M-36-18a14 14 0 0 1 20-20Z" /><path d="M36-18a14 14 0 0 0-20-20Z" /></g>
          <path d="m-18 24-8 12m26-12 8 12" :stroke="INK" stroke-width="4" stroke-linecap="round" />
          <use :href="h('clock-face')" />
          <g class="a-sweep-h" style="--d:.7s"><circle r="22" fill="none" /><path d="M0 0 11 0" :stroke="INK" stroke-width="4" stroke-linecap="round" transform="rotate(30)" /></g>
          <g class="a-sweep-m" style="--d:.7s"><circle r="22" fill="none" /><path d="M0 0V-17" :stroke="INK" stroke-width="2.5" stroke-linecap="round" /></g>
          <circle r="3" fill="#c9433d" />
        </g>
      </g>
      <g transform="translate(272 306)">
        <rect x="-10" y="-14" width="20" height="16" rx="2" fill="#e9dccb" :stroke="INK" stroke-width="2" /><rect x="-7" y="-11" width="14" height="10" fill="#c9433d" />
        <path d="M8-8c14-6 20 2 30-2" fill="none" stroke="#c9433d" stroke-width="2" stroke-linecap="round" /><path d="m38-14 10 10" stroke="#cfc5d6" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <path d="m404 318 14-8 4 12Z" fill="#c9433d" :stroke="INK" stroke-width="1.5" />
      <g class="a-pop" style="--d:.45s"><g transform="translate(352 292) scale(.78)">
        <g class="a-cape" style="--d:1s"><use :href="h('cape-shape')" /></g>
        <use :href="h('hero-body')" />
        <g class="a-wave" style="--d:1s"><use :href="h('hero-arm')" /></g>
        <use :href="h('pail')" transform="translate(-36 6) scale(.85)" />
      </g></g>
      <g fill="#edc66d">
        <g transform="translate(398 158) scale(.9)"><use class="a-twinkle" style="--d:1.2s" :href="h('spark')" /></g>
        <g transform="translate(30 70) scale(1.2)"><use class="a-twinkle" style="--d:1.5s" :href="h('spark')" /></g>
      </g>
    </g>

    <g v-else-if="scene === 'choice'">
      <g class="a-rise" style="--d:.2s"><g class="a-bob" style="--d:1.2s"><g transform="translate(146 196) scale(.86)">
        <use :href="h('arm-down')" /><g class="a-wave" style="--d:1s"><use :href="h('arm-wave')" /></g>
        <use :href="h('ghost-body')" /><use :href="h('ghost-face')" />
        <g transform="rotate(-7 0 -66)"><use :href="h('hat')" /></g>
      </g></g></g>
      <g class="a-pop" style="--d:.45s"><g transform="translate(360 294) scale(.84)">
        <g class="a-cape" style="--d:1s"><use :href="h('cape-shape')" /></g>
        <use :href="h('hero-body')" />
        <g class="a-wave" style="--d:1.1s"><use :href="h('hero-arm')" /></g>
      </g></g>
      <path class="a-pop" style="--d:.9s" d="M252 214c-30-18-40-38-26-52 10-10 22-4 26 6 4-10 16-16 26-6 14 14 4 34-26 52Z" fill="#f07466" :stroke="INK" stroke-width="3" stroke-linejoin="round" />
      <g fill="#edc66d">
        <g transform="translate(222 140) scale(.8)"><use class="a-twinkle" style="--d:1.2s" :href="h('spark')" /></g>
        <g transform="translate(288 134) scale(.6)"><use class="a-twinkle" style="--d:1.4s" :href="h('spark')" /></g>
        <g transform="translate(476 36) scale(1.1)"><use class="a-twinkle" style="--d:1.6s" :href="h('spark')" /></g>
      </g>
    </g>
  </svg>
</template>

<style>
/* Coreografía de entrada: se repite cada vez que la diapositiva aparece
   (Slidev la muestra con display) y termina. Nada se mueve en bucle. */
.story-art [class^='a-'], .story-art [class*=' a-'] {
  transform-box: fill-box;
  animation-delay: var(--d, 0s);
  animation-fill-mode: both;
}
.story-art .a-pop { transform-origin: 50% 100%; animation-name: sa-pop; animation-duration: .7s; animation-timing-function: cubic-bezier(.34, 1.56, .64, 1); }
.story-art .a-rise { animation-name: sa-rise; animation-duration: .9s; animation-timing-function: cubic-bezier(.22, 1, .36, 1); }
.story-art .a-bob { animation-name: sa-bob; animation-duration: 1.8s; animation-iteration-count: 2; animation-timing-function: ease-in-out; animation-fill-mode: none; }
.story-art .a-wave { transform-origin: 15% 90%; animation-name: sa-wave; animation-duration: 1.4s; animation-timing-function: ease-in-out; }
.story-art .a-twinkle { transform-origin: 50% 50%; animation-name: sa-twinkle; animation-duration: .8s; animation-timing-function: ease-out; }
.story-art .a-fly { animation-name: sa-fly; animation-duration: 1.6s; animation-timing-function: cubic-bezier(.22, 1, .36, 1); }
.story-art .a-glow { transform-origin: 50% 50%; animation-name: sa-glow; animation-duration: 1.2s; animation-timing-function: ease-out; }
.story-art .a-flicker { transform-origin: 50% 100%; animation-name: sa-flicker; animation-duration: .9s; animation-iteration-count: 3; animation-timing-function: ease-in-out; animation-fill-mode: none; }
.story-art .a-ember { animation-name: sa-ember; animation-duration: 1.4s; animation-timing-function: ease-out; }
.story-art .a-ember-down { animation-name: sa-ember-down; animation-duration: .9s; animation-timing-function: ease-in; }
.story-art .a-drop { animation-name: sa-drop; animation-duration: 1.8s; animation-timing-function: cubic-bezier(.3, .7, .4, 1); }
.story-art .a-draw { animation-name: sa-draw; animation-duration: 1.6s; animation-timing-function: ease-in-out; }
.story-art .a-sweep-m { transform-origin: 50% 50%; animation-name: sa-sweep-m; animation-duration: 2.6s; animation-timing-function: cubic-bezier(.45, 0, .25, 1); }
.story-art .a-sweep-h { transform-origin: 50% 50%; animation-name: sa-sweep-h; animation-duration: 2.6s; animation-timing-function: cubic-bezier(.45, 0, .25, 1); }
.story-art .a-swing { transform-origin: 50% 0; animation-name: sa-swing; animation-duration: 1.1s; animation-timing-function: cubic-bezier(.34, 1.56, .64, 1); }
.story-art .a-knock { transform-origin: 100% 50%; animation-name: sa-knock; animation-duration: .45s; animation-timing-function: ease-out; }
.story-art .a-cape { transform-origin: 50% 0; animation-name: sa-cape; animation-duration: 1s; animation-iteration-count: 3; animation-timing-function: ease-in-out; animation-fill-mode: none; }

@keyframes sa-pop { from { transform: scale(0); opacity: 0 } 60% { opacity: 1 } to { transform: none } }
@keyframes sa-rise { from { transform: translateY(36px); opacity: 0 } to { transform: none; opacity: 1 } }
@keyframes sa-bob { 0%, 100% { transform: none } 50% { transform: translateY(-7px) } }
@keyframes sa-wave { 0%, 100% { transform: none } 20% { transform: rotate(-14deg) } 45% { transform: rotate(8deg) } 70% { transform: rotate(-10deg) } }
@keyframes sa-twinkle { from { transform: scale(0) rotate(-90deg); opacity: 0 } 60% { transform: scale(1.5) rotate(10deg); opacity: 1 } to { transform: none } }
@keyframes sa-fly { from { transform: translate(-90px, 40px) scale(.3); opacity: 0 } to { transform: none; opacity: 1 } }
@keyframes sa-glow { from { transform: scale(.4); opacity: 0 } to { transform: none; opacity: 1 } }
@keyframes sa-flicker { 0%, 100% { transform: none } 30% { transform: scale(.94, 1.08) skewX(-3deg) } 65% { transform: scale(1.04, .95) skewX(2deg) } }
@keyframes sa-ember { from { transform: translateY(50px) scale(.3); opacity: 0 } 50% { opacity: 1 } to { transform: none } }
@keyframes sa-ember-down { from { transform: translateY(-26px); opacity: 0 } to { transform: none; opacity: 1 } }
@keyframes sa-drop { from { transform: translate(-30px, -80px) rotate(-120deg); opacity: 0 } 30% { opacity: 1 } to { transform: none } }
@keyframes sa-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes sa-sweep-m { from { transform: rotate(-720deg) } to { transform: none } }
@keyframes sa-sweep-h { from { transform: rotate(-60deg) } to { transform: none } }
@keyframes sa-swing { from { transform: rotate(-40deg) scaleY(.2); opacity: 0 } to { transform: none; opacity: 1 } }
@keyframes sa-knock { 0% { transform: scale(.3); opacity: 0 } 60% { transform: scale(1.15); opacity: 1 } to { transform: none } }
@keyframes sa-cape { 0%, 100% { transform: none } 50% { transform: skewX(-7deg) scaleX(1.05) } }

@media (prefers-reduced-motion: reduce) {
  .story-art [class^='a-'], .story-art [class*=' a-'] { animation: none !important; }
}
</style>
