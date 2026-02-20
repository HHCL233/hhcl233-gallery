<!-- components/TypedText.vue -->
<template>
  <span ref="typedElement" class="typed-text"></span>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Typed from 'typed.js'

const props = defineProps<{
  strings: string[]
  typeSpeed?: number
  loop?: boolean
  showCursor?: boolean
  cursorChar?: string
}>()

const typedElement = ref<HTMLElement | null>(null)
let typed: Typed | null = null

onMounted(() => {
  if (typedElement.value) {
    typed = new Typed(typedElement.value, {
      strings: props.strings,
      typeSpeed: props.typeSpeed || 50,
      loop: props.loop || false,
      showCursor: props.showCursor !== false,
      cursorChar: props.cursorChar || '|',
      backSpeed: 30,
      backDelay: 1500
    })
  }
})

onBeforeUnmount(() => {
  typed?.destroy()
})
</script>

<style scoped>
.typed-text {
  font-size: inherit;
  line-height: inherit;
}
</style>
