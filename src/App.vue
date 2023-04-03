<script setup lang="ts">
import { RouterView } from 'vue-router';
import { usePageLoadingStore } from '@/stores/pageLoading';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = usePageLoadingStore();

router.afterEach(() => {
  store.pageLoading = false;
})
</script>

<template>
  <header class="mt-20 container mx-auto px-4 mb-5">
    <h1 class="text-3xl font-medium container">Fotogaléria</h1>
  </header>

  <RouterView v-if="!store.pageLoading" v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <Suspense>
          <component :is="Component"></component>
          <template #fallback>
            <main class="container mx-auto px-4 mb-20">
              <div class="gallery-grid">
                <div v-for="(num, idx) in [1, 2, 3, 4, 5]" :key="idx" class="w-full h-48 loader" />
              </div>
            </main>
          </template>
        </Suspense>
      </Transition>
    </template>
  </RouterView>
</template>

<style scoped>
.loader {
  background:
    linear-gradient(0.25turn, transparent, #FFF, transparent),
    linear-gradient(#DDD, #DDD),
    linear-gradient(#DDD, #DDD);

  background-color: #fff;
  background-repeat: no-repeat;
  background-size: 315px 200px, 315px 130px, 240px 100px, 225px 30px;
  background-position: -315px 0, 0 0, 0px 140px, 65px 145px;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  to {
    background-position: 315px 0, 0 0, 0 140px, 65px 145px;
  }
}
</style>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>