<script setup lang="ts">
import TypedText from '@/components/common/TypedText.vue'
import GalleryGrid from '@/components/gallery/GalleryGrid.vue'
</script>

<template>
  <div class="home-page">
    <div class="title">
      <h1 class="title-h1">HHCL233 的图库</h1>
      <TypedText :strings="['woW', 'Wow', 'wOw']" :typeSpeed="80" :loop="true" cursorChar="_" />
    </div>
    <div class="gallery">
      <GalleryGrid />
    </div>
  </div>
</template>

<style scoped>
.home-page {
  overflow: auto;
  height: calc(100% - 60px);
}

.title {
  width: 100%;
  text-align: center;
  height: 120px;
  margin-top: 24px;
}

.title-h1 {
  margin: 14px 0;
}

.gallery {
  width: 100%;
}
</style>
