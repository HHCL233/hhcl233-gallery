<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGalleryStore } from '@/stores/gallery'
import { initGalleryData } from '@/services/galleryService'
import { useRouter } from 'vue-router'

const router = useRouter()
const galleryStore = useGalleryStore()
onMounted(async () => {
  await initGalleryData()
  console.log(galleryStore.galleryData)
})

const goToHome = () => {
  router.push(`/`)
}
</script>

<template>
  <s-page theme="auto">
    <s-appbar>
      <!--标题-->
      <h1 slot="headline" @click="goToHome()" class="appbar-title"> HHCL233 的图库 </h1>
    </s-appbar>
    <!--页面内容-->
    <div style="height: 100vh; overflow: hidden;width: 100%;">
      <RouterView></RouterView>
    </div>
  </s-page>
</template>

<style scoped>
.appbar-title {
  cursor: pointer
}
</style>
