import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePageLoadingStore = defineStore('pageLoading', () => {
  const pageLoading = ref(true)

  return { pageLoading }
})
