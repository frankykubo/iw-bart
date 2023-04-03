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

const processedGallery = ref<ProcessedGallery[]>([] as ProcessedGallery[]);

const fetchData = async () => {
  const galleryDataResponse = await axios.get<{ galleries: Gallery[] }>(`${apiUrl}/gallery`);
  processedGallery.value = await Promise.all(galleryDataResponse.data.galleries.map(async glr => {
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
}

await fetchData();

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
        <div v-for="(gallery, idx) in processedGallery" :key="idx"
          class="relative bg-white custom-shadow hover:scale-105 transition-all duration-100 ease-linear cursor-pointer rounded-md overflow-hidden">
          <div class="absolute top-3 left-3 z-20 flex items-center">
            <router-link :to="{ name: 'gallery', params: { path: gallery.path } }"
              class="block bg-black bg-opacity-60 px-2 py-1 text-white rounded-full font-thin text-xs h-6 flex items-center justify-center mr-1">
              {{
                gallery.length }}
              fotiek
            </router-link>
            <DeleteIcon class="relative z-20 h-6 w-6 p-1.5" title="Vymazať galériu"
              @icon-clicked="promptGalleryModal(gallery.name, gallery.path)" />
          </div>
          <router-link :to="{ name: 'gallery', params: { path: gallery.path } }" class="grid-item">
            <div class="flex flex-col w-full h-48">
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
        </div>
        <div class="grid-item">
          <AddActionCard @click="formModalOpened = true;" card-text="Pridať kategóriu" />
        </div>
      </div>
    </main>
    <Transition>
      <FormModal v-if="formModalOpened" @close-modal="formModalOpened = false;" title="Pridať kategóriu">
        <template #modal-content>
          <AddCategory @close-modal="formModalOpened = false;" @successful-submit="fetchData" />
        </template>
      </FormModal>
    </Transition>
    <Transition>
      <FormModal v-if="removeGalleryModal.opened" @close-modal="removeGalleryModal.opened = false;"
        title="Vymazať galériu">
        <template #modal-content>
          <RemoveGallery :gallery-detail="removeGalleryModal.galleryDetail"
            @close-modal="removeGalleryModal.opened = false;" item-question="Naozaj chcete vymazať galériu"
            success-text="Kategória bola zmazaná!" @successful-submit="fetchData" />
        </template>
      </FormModal>
    </Transition>
  </div>
</template>
