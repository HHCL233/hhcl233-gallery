import { useGalleryStore } from '@/stores/gallery'

export async function initGalleryData() {
  try {
    const galleryStore = useGalleryStore()

    const galleryData = (await fetch('/hhcl233-gallery/config/gallery.json')).json()
    galleryStore.galleryData = (await galleryData).reverse()

  } catch (err) {
    console.error('[图库错误] 数据加载失败!,信息:', err)
  }
}
