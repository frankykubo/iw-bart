<script setup lang="ts">
import axios from 'axios';
import type { Gallery, ProcessedGallery } from '@/types/gallery';
import AddActionCard from '@/components/AddActionCard.vue';
import FormModal from '@/components/modals/FormModal.vue';
import AddCategory from '@/components/forms/AddCategory.vue';
import { ref } from 'vue';

const apiUrl = import.meta.env.VITE_APP_API_URL;
const formModalOpened = ref(false);

const galleryData = await axios.get<{ galleries: Gallery[] }>(`${apiUrl}/gallery`);
const processedGallery = await Promise.all(galleryData.data.galleries.map(async glr => {
  if (!glr.image) {
    return {
      ...glr,
      length: 0,
    } as ProcessedGallery;
  }
  const galleryData = await axios.get<Gallery>(`${apiUrl}/gallery/${glr.path}`);
  return {
    ...glr,
    image: {
      ...glr.image,
      url: `${apiUrl}/images/200x200/${glr.image.fullpath}`
    },
    length: galleryData.data.images!.length,
  } as ProcessedGallery;
}));

</script>

<template>
  <div>
    <main class="container mx-auto px-4 mb-20">
      <div class="gallery-grid">
        <router-link v-for="(gallery, idx) in processedGallery" :key="idx" :to="`/${gallery.path}`" class="grid-item">
          <div
            class="flex flex-col w-full h-48 bg-white custom-shadow hover:scale-105 transition-all duration-100 ease-linear cursor-pointer rounded-md overflow-hidden">
            <div class="absolute top-4 left-4 bg-black bg-opacity-60 px-2 py-1 text-white rounded-full font-thin text-xs">
              {{
                gallery.length }}
              fotiek</div>
            <img v-if="gallery.image" class="block w-full h-4/6 object-cover" :src="gallery.image.url" />
            <div class="h-2/6 flex items-center justify-center text-center text-base font-medium">
              {{ gallery.name }}
            </div>
          </div>
        </router-link>
        <div class="grid-item">
          <AddActionCard @click="formModalOpened = true;" />
        </div>
      </div>
    </main>
    <Transition>
      <FormModal v-if="formModalOpened" @close-modal="formModalOpened = false;" title="Pridať kategóriu">
        <template #modal-content>
          <AddCategory />
        </template>
      </FormModal>
    </Transition>
  </div>
</template>
