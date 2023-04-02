<script setup lang="ts">
import axios from 'axios';
import type { Gallery, ProcessedGallery } from '@/types/gallery';
import AddActionCard from '@/components/AddActionCard.vue';
import FormModal from '@/components/modals/FormModal.vue';
import AddCategory from '@/components/forms/AddCategory.vue';
import ImageWithLoader from '@/components/ImageWithLoader.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import RemoveGallery from '@/components/forms/RemoveGallery.vue';
import { reactive, ref } from 'vue';

const apiUrl = import.meta.env.VITE_APP_API_URL;
const formModalOpened = ref(false);
const removeGalleryModal = reactive({
  opened: false,
  galleryDetail: {
    name: '',
    path: '',
  },
});

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

const promptGalleryModal = (name: string, path: string) => {
  removeGalleryModal.galleryDetail = {
    name,
    path,
  }
  removeGalleryModal.opened = true;
}

</script>

<template>
  <div>
    <main class="container mx-auto px-4 mb-20">
      <div class="gallery-grid">
        <router-link v-for="(gallery, idx) in processedGallery" :key="idx" :to="`/${gallery.path}`" class="grid-item">
          <div
            class="flex flex-col w-full h-48 bg-white custom-shadow hover:scale-105 transition-all duration-100 ease-linear cursor-pointer rounded-md overflow-hidden">
            <div class="absolute top-3 left-3 z-10 flex items-center">
              <div
                class="bg-black bg-opacity-60 px-2 py-1 text-white rounded-full font-thin text-xs h-6 flex items-center justify-center mr-1">
                {{
                  gallery.length }}
                fotiek
              </div>
              <DeleteIcon class="h-6 w-6 p-1.5" @icon-clicked="promptGalleryModal(gallery.name, gallery.path)" />
            </div>
            <ImageWithLoader v-if="gallery.image" class="block w-full h-4/6" :img-url="gallery.image.url"
              img-classes="object-cover w-full h-full" />
            <div class="block w-full h-4/6 relative p-2" v-else>
              <ImageWithLoader img-url="/images/empty-frame.png" class="block h-full w-full"
                img-classes="h-full w-full rounded-sm" />
              <div class="text-sm text-black absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-center">
                Galéria neobsahuje žiadne fotografie!
              </div>
            </div>
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
          <AddCategory @close-modal="formModalOpened = false;" />
        </template>
      </FormModal>
    </Transition>
    <Transition>
      <FormModal v-if="removeGalleryModal.opened" @close-modal="removeGalleryModal.opened = false;"
        title="Vymazať galériu">
        <template #modal-content>
          <RemoveGallery :gallery-detail="removeGalleryModal.galleryDetail"
            @close-modal="removeGalleryModal.opened = false;" />
        </template>
      </FormModal>
    </Transition>
  </div>
</template>
