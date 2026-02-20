import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGalleryStore = defineStore('gallery', () => {
  const galleryData = ref([])

  return { galleryData }
})
