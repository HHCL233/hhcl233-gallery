<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGalleryStore } from '@/stores/gallery'
import { initGalleryData } from '@/services/galleryService'

// 定义 PhotoData 接口
interface PhotoData {
  id: string | number
  title: string
  description?: string
  url?: string
  tags?: string[]
  shootTime: string
  [key: string]: any
}

const route = useRoute()
const galleryStore = useGalleryStore()
const photoData = ref<PhotoData | null>(null)
const isLoading = ref(true)

// 加载图片方法
const loadPhoto = (id: string | number) => {
  if (!id) return

  if (galleryStore.galleryData && Array.isArray(galleryStore.galleryData)) {
    const data = galleryStore.galleryData as unknown as PhotoData[]

    photoData.value = data.find(
      item => item && item.id && item.id.toString() === id.toString()
    ) || null

    console.log('加载的图片数据:', photoData.value)
  } else {
    console.warn('galleryData 不存在或不是数组')
    photoData.value = null
  }
}

// 初始化数据
const initData = async () => {
  isLoading.value = true
  try {
    await initGalleryData()
    if (route.params.id) {
      loadPhoto(route.params.id as string)
    }
  } catch (error) {
    console.error('初始化数据失败:', error)
  } finally {
    isLoading.value = false
  }
}

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadPhoto(newId as string)
  }
}, { immediate: true })

onMounted(() => {
  initData()
})
</script>

<template>
  <div class="photo-detail">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="photo-loading">
      <s-card class="photo-loading-card">加载中...</s-card>
    </div>

    <!-- 图片内容 -->
    <template v-else>
      <s-card v-if="photoData?.url" class="photo-watch" :style="{ backgroundImage: `url(${photoData.url})` }">
      </s-card>
      <s-card v-else class="photo-empty">
        暂无图片
      </s-card>

      <!-- 图片信息 -->
      <s-card v-if="photoData" class="photo-info" type="filled">
        <h1 class="photo-info-title">{{ photoData.title }}</h1>

        <div v-if="photoData.tags?.length" class="photo-info-tags">
          <s-button type="outlined" class="photo-info-tag" v-for="(tag, index) in photoData.tags" :key="index">
            {{ tag }}
          </s-button>
        </div>

        <p v-if="photoData.description" class="photo-info-description">
          {{ photoData.description }}
        </p>

        <p class="photo-info-time">
          {{ '上传时间: ' + photoData.shootTime }}
        </p>
      </s-card>
    </template>
  </div>
</template>

<style scoped>
.photo-detail {
  width: 100%;
  display: flex;
  height: calc(100vh - 60px);
  overflow: hidden;
  position: relative;
}

/* 加载状态 */
.photo-loading {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-loading-card {
  padding: 20px;
  text-align: center;
}

/* 图片查看区域 */
.photo-watch {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 100%;
  width: 70%;
  max-width: 100% !important;
  border-radius: 0;
}

.photo-empty {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  border-radius: 0;
}

/* 图片信息区域 */
.photo-info {
  width: 30%;
  max-width: 100% !important;
  padding: 24px;
  border-radius: 0;
  overflow-y: auto;
  /* 内容过多时可滚动 */
  background-color: #f5f5f5;
}

.photo-info-title {
  margin: 0 0 12px 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  word-break: break-word;
}

.photo-info-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.photo-info-tag {
  height: 32px;
  font-size: 14px;
}

.photo-info-description {
  margin: 0 0 16px 0;
  line-height: 1.6;
  color: #666;
  font-size: 14px;
  white-space: pre-wrap;
  word-break: break-word;
}

.photo-info-time {
  margin: 0;
  color: #999;
  font-size: 12px;
  border-top: 1px solid #e0e0e0;
  padding-top: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .photo-detail {
    flex-wrap: wrap;
    overflow-y: auto;
    height: auto;
    min-height: calc(100vh - 60px);
  }

  .photo-watch,
  .photo-empty,
  .photo-info {
    width: 100%;
  }

  .photo-watch {
    height: 300px;
    /* 移动端固定高度 */
    background-position: center;
    background-size: contain;
  }

  .photo-info {
    padding: 16px;
  }

  .photo-info-title {
    font-size: 20px;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .photo-info {
    background-color: #2c2c2c;
  }

  .photo-info-title {
    color: #e0e0e0;
  }

  .photo-info-description {
    color: #b0b0b0;
  }

  .photo-info-time {
    color: #808080;
    border-top-color: #404040;
  }
}
</style>
