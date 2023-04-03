import { usePageLoadingStore } from '@/stores/pageLoading';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: async () => import('@/views/HomeView.vue')
    },
    {
      path: '/gallery/:path/:imagePath?',
      name: 'gallery',
      component: () => import('@/views/GalleryView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue')
    },
  ]
})

router.beforeEach((to, from) => {
  const store = usePageLoadingStore();
  if (to.name === from.name) {
    return true;
  }
  store.pageLoading = true;
});

export default router
