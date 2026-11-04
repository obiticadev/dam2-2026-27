<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'
const { currentSlideNo } = useNav()
const section = computed(() => currentSlideNo.value <= 5 ? 'RUBÉN / UK · ENGLAND' : currentSlideNo.value <= 10 ? 'OLIVER / USA' : 'READ MORE')
</script>
<template>
  <footer class="deck-footer" :class="{ 'on-night': [3, 6, 10].includes(currentSlideNo) }"><span>HALLOWEEN / TWO STOPS, ONE SPOOKY NIGHT</span><span>{{ section }} · {{ String(currentSlideNo).padStart(2, '0') }} / 11</span></footer>
</template>
