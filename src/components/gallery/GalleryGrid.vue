<template>
  <div class="gallery-grid">
    <s-card :clickable="true" class="gallery-card" v-for="(item, index) in galleryStore.galleryData" :key="index"
      :style="{ transform: `translateY(${Math.random() * 64}px)`, backgroundImage: `url(${(item as GalleryItem).url})` }"
      @click="goToImage(Number((item as GalleryItem).id))">
    </s-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { initGalleryData } from '@/services/galleryService'
import { useRouter } from 'vue-router'

import { useGalleryStore } from '@/stores/gallery'

const router = useRouter()
interface GalleryItem {
  id: string | number
  title: string
  description?: string
  url?: string,
  tags?: []
}
const galleryStore = useGalleryStore()

const goToImage = (id: number) => {
  router.push(`/img/${String(id)}`)
}
</script>
<style lang="css" scoped>
.gallery-grid {
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 200px);
  margin: auto;
  gap: 64px;
  justify-content: center;
}

.gallery-card {
  --random-y: 0px;
  transform: translateY(var(--random-y));
  height: 240px;
  aspect-ratio: 3/4;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
