<script setup>
defineProps({ scene: String, label: String })
</script>

<template>
  <svg viewBox="0 0 500 350" role="img" :aria-label="label" class="story-art">
    <defs>
      <g id="pumpkin">
        <path d="M-5-40q-8-30 12-29" fill="none" stroke="#416449" stroke-width="10" stroke-linecap="round" />
        <ellipse cy="4" rx="66" ry="51" fill="#f98c36" stroke="#442e36" stroke-width="3" />
        <ellipse cy="4" rx="34" ry="51" fill="none" stroke="#d76529" stroke-width="3" />
        <path d="m-35-6 17-15 9 18m18 0 9-18 17 15M-29 20q29 26 58 0" fill="#442e36" />
      </g>
      <g id="ghost">
        <path d="M-58 73v-105a58 58 0 0 1 116 0V73L36 57 12 75-12 57-35 75Z" fill="#fff8e9" stroke="#442e36" stroke-width="3" stroke-linejoin="round" />
        <ellipse cx="-19" cy="-15" rx="5" ry="8" fill="#442e36" /><ellipse cx="19" cy="-15" rx="5" ry="8" fill="#442e36" />
        <path d="M-12 7q12 17 24 0" fill="none" stroke="#442e36" stroke-width="3" stroke-linecap="round" />
        <ellipse cx="-35" cy="3" rx="10" ry="5" fill="#f8b3a4" /><ellipse cx="35" cy="3" rx="10" ry="5" fill="#f8b3a4" />
      </g>
      <g id="hat"><path d="m-50-78 38-62 42 62" fill="#8064ab" stroke="#442e36" stroke-width="3" /><path d="M-64-78H49" stroke="#442e36" stroke-width="8" stroke-linecap="round" /><path d="m-35-100 49 0" stroke="#edc66d" stroke-width="9" /></g>
      <g id="house"><path d="M-75-32V92H75V-32" fill="#e6ab85" stroke="#442e36" stroke-width="3" /><path d="m-92-28 92-90 92 90Z" fill="#795d82" stroke="#442e36" stroke-width="3" /><path d="M-18 92V22h36v70" fill="#587c72" stroke="#442e36" stroke-width="3" /><path d="M-58-3h25v30h-25Zm91 0h25v30H33Z" fill="#ffe5a3" stroke="#442e36" stroke-width="3" /><circle cx="10" cy="58" r="3" fill="#ffe5a3" /></g>
      <g id="hero"><path d="m-28 0-37 100 114-5L24 0" fill="#cf655f" stroke="#442e36" stroke-width="3" /><path d="M-26 88V7h52v81" fill="#779d93" stroke="#442e36" stroke-width="3" /><path d="M-20 88v28m40-28v28" stroke="#442e36" stroke-width="12" stroke-linecap="round" /><circle cy="-22" r="32" fill="#bd825f" stroke="#442e36" stroke-width="3" /><path d="M-31-29q2-40 48-21l15 25q-20-4-32-17-5 17-31 13" fill="#442e36" /><circle cx="-10" cy="-21" r="3" fill="#442e36" /><circle cx="12" cy="-21" r="3" fill="#442e36" /><path d="M-7-6q9 9 17-1" fill="none" stroke="#442e36" stroke-width="3" /></g>
      <g id="clock"><circle r="27" fill="#fff8e9" stroke="#442e36" stroke-width="3" /><path d="M0-17V0L12 6" fill="none" stroke="#442e36" stroke-width="3" stroke-linecap="round" /></g>
      <g id="sweet"><path d="m-15 0-19-16v32Zm30 0 19-16v32Z" fill="#8064ab" stroke="#442e36" stroke-width="2" /><rect x="-19" y="-13" width="38" height="26" rx="10" fill="#e9bf63" stroke="#442e36" stroke-width="2" /></g>
    </defs>
    <ellipse cx="250" cy="175" rx="230" ry="157" fill="currentColor" opacity=".065" />
    <g fill="#d9ad56"><path d="m65 62 4 10 11 4-11 4-4 10-4-10-11-4 11-4Zm355 35 4 10 11 4-11 4-4 10-4-10-11-4 11-4Z" /><circle cx="390" cy="45" r="5" /><circle cx="90" cy="275" r="4" /></g>
    <path d="M45 300q205 24 410 0" fill="none" stroke="currentColor" stroke-width="2" opacity=".2" />
    <g v-if="scene === 'cover'">
      <use href="#house" transform="translate(107 188) scale(.72)" /><use href="#house" transform="translate(393 188) scale(.72)" />
      <path d="M140 285q110-100 220 0" fill="none" stroke="#9b7b9d" stroke-width="3" stroke-dasharray="6 8" />
      <use href="#ghost" transform="translate(250 163)" /><rect x="276" y="210" width="53" height="48" rx="8" fill="#e9bf63" stroke="#442e36" stroke-width="3" /><path d="M291 210v-10h21v10" fill="none" stroke="#442e36" stroke-width="3" />
      <use href="#pumpkin" transform="translate(100 282) scale(.45)" />
    </g>
    <g v-else-if="scene === 'roots'">
      <circle cx="330" cy="100" r="62" fill="#edc66d" /><use href="#ghost" transform="translate(235 185) scale(.9)" />
      <g fill="#d68154" stroke="#442e36" stroke-width="2"><path d="M90 130q-40-60 25-65 25 38-25 65Z" /><path d="M370 240q-30-70 40-65 10 47-40 65Z" /><path d="M111 273q-10-60 49-35-4 47-49 35Z" /></g>
    </g>
    <g v-else-if="scene === 'england'">
      <use href="#house" transform="translate(250 155) scale(1.2)" /><use href="#pumpkin" transform="translate(370 280) scale(.65)" />
      <ellipse cx="125" cy="280" rx="47" ry="16" fill="#fff8e9" stroke="#442e36" stroke-width="2" /><ellipse cx="125" cy="267" rx="32" ry="16" fill="#d6a269" stroke="#442e36" stroke-width="2" /><path d="M111 264h28m-14-10v20" stroke="#805632" stroke-width="3" />
      <path d="M218 267q-29-23-35 5-8 37 24 29 30 10 30-20 0-24-19-14" fill="#b86650" stroke="#442e36" stroke-width="2" /><path d="m213 263 7-18" stroke="#587c72" stroke-width="5" />
    </g>
    <g v-else-if="scene === 'ghost'">
      <use href="#ghost" transform="translate(245 180) scale(1.1)" /><use href="#hat" transform="translate(245 180) scale(1.1)" />
      <use href="#pumpkin" transform="translate(105 277) scale(.5)" /><use href="#pumpkin" transform="translate(210 288) scale(.43)" /><use href="#pumpkin" transform="translate(348 278) scale(.63)" /><use href="#clock" transform="translate(398 100)" />
    </g>
    <g v-else-if="scene === 'vegetables'">
      <path d="M115 185q-65-52-72 22-3 42 62 67l12 20 9-24q66-25 59-68-10-65-70-17" fill="#ddd3e0" stroke="#442e36" stroke-width="3" /><path d="M98 176q-15-42 8-49m10 47q12-50 33-50" fill="none" stroke="#587c72" stroke-width="7" /><path d="m82 207 13-9 6 11m27 0 8-11 13 9M90 230q25 20 48-1" fill="#442e36" />
      <use href="#pumpkin" transform="translate(350 218) scale(1.45)" />
    </g>
    <g v-else-if="scene === 'door'">
      <path d="M265 55h150v240H265Z" fill="#e7b187" stroke="#442e36" stroke-width="4" /><path d="M283 73h113v221H283Z" fill="#587c72" stroke="#442e36" stroke-width="3" /><circle cx="375" cy="190" r="6" fill="#edc66d" /><path d="M284 125q58 40 111 0" fill="none" stroke="#edc66d" stroke-width="4" />
      <use href="#ghost" transform="translate(165 215) scale(.7)" /><use href="#pumpkin" transform="translate(398 286) scale(.45)" />
      <path d="M193 245h67q-2 42-34 42t-33-42" fill="#8064ab" stroke="#442e36" stroke-width="3" /><use href="#sweet" transform="translate(221 245) scale(.6)" />
    </g>
    <g v-else-if="scene === 'hero'">
      <use href="#pumpkin" transform="translate(158 216) scale(1.5)" /><use href="#hero" transform="translate(350 184) scale(.9)" /><use href="#clock" transform="translate(390 84)" />
      <path d="M270 250h45l-5 46h-35Z" fill="#e9bf63" stroke="#442e36" stroke-width="2" /><use href="#sweet" transform="translate(293 254) scale(.6)" />
    </g>
    <g v-else-if="scene === 'choice'">
      <use href="#ghost" transform="translate(150 194) scale(1.1)" /><use href="#hat" transform="translate(150 194) scale(1.1)" /><use href="#hero" transform="translate(350 192)" /><path d="m217 170 12 12 24-26" fill="none" stroke="#8bab95" stroke-width="6" stroke-linecap="round" />
    </g>
  </svg>
</template>
