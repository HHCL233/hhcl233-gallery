<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGalleryStore } from '@/stores/gallery'
import { initGalleryData } from '@/services/galleryService'

const route = useRoute()
const galleryStore = useGalleryStore()
const photoData = ref<PhotoData | null>(null)

interface PhotoData {
  id: string | number
  title: string
  description?: string
  url?: string
  tags?: string[]
  shootTime: string
}

// 加载图片方法
const loadPhoto = (id: string | number) => {
  if (!id || !galleryStore.galleryData) return

  photoData.value = galleryStore.galleryData.find(
    item => item.id.toString() === id.toString()
  ) || null

  console.log('加载的图片数据:', photoData.value)
}

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadPhoto(newId as string)
  }
}, { immediate: true })

onMounted(async () => {
  await initGalleryData()
  if (route.params.id) {
    loadPhoto(route.params.id as string)
  }
})
</script>

<template>
  <div class="photo-detail">
    <s-card v-if="photoData?.url" class="photo-watch" :style="{ backgroundImage: `url(${photoData.url})` }">
    </s-card>
    <s-card v-else class="photo-empty">
      暂无图片
    </s-card>
    <s-card class="photo-info" type="filled">
      <h1 class="photo-info-title">{{ photoData!.title }}</h1>
      <div class="photo-info-tags">
        <s-button type="outlined" class="photo-info-tag" v-for="(tag, index) in photoData?.tags" :key="index">{{ tag
          }}</s-button>
      </div>
      <p class="photo-info-description">{{ photoData!.description }}</p>
      <p class="photo-info-time">{{ '上传时间: ' + photoData!.shootTime }}</p>
    </s-card>
  </div>
</template>

<style scoped>
.photo-detail {
  width: 100%;
  display: flex;
  height: calc(100% - 60px);
  overflow: hidden;
}

.photo-watch {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 100%;
  width: 70%;
  max-width: 100% !important;
}

.photo-empty {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.photo-info {
  width: 30%;
  max-width: 100% !important;
  padding: 24px;
}

.photo-info-title {
  margin: 0 0 12px 0;
}

.photo-info-tags {
  display: flex;
  flex-wrap: wrap;
}

.photo-info-tag {
  height: 32px;
}

@media (max-width: 768px) {
  .photo-detail {
    flex-wrap: wrap;
    overflow-y: auto;
  }

  .photo-watch,
  .photo-empty,
  .photo-info {
    width: 100%;
  }

  .photo-watch {
    height: auto;
    background-position: top;
  }
}
</style>
