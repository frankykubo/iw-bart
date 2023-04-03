<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import type { Gallery } from '@/types/gallery';
import { useRoute, useRouter } from 'vue-router';
import axios, { AxiosError } from 'axios';
import AddPhoto from '@/components/forms/AddPhoto.vue';
import ImageWithLoader from '@/components/ImageWithLoader.vue';
import FormModal from '@/components/modals/FormModal.vue';
import PhotoModal from '@/components/modals/PhotoModal.vue';
import AddActionCard from '@/components/AddActionCard.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import RemoveGallery from '@/components/forms/RemoveGallery.vue';
import IconBack from '@/components/icons/IconBack.vue';

const route = useRoute();
const router = useRouter();
const apiUrl = import.meta.env.VITE_APP_API_URL;
const galleryData = ref<Gallery>({} as Gallery);
const noDataAvailable = reactive({
    value: false,
    code: 0,
});

const fetchData = async () => {
    const galleryDataResponse = await axios.get<Gallery>(`${apiUrl}/gallery/${route.params.path}`);
    galleryData.value = galleryDataResponse.data;
    document.title = `${document.title} | ${galleryData.value.gallery!.name}`
};

try {
    await fetchData();
} catch (e) {
    const error = e as AxiosError;
    noDataAvailable.code = error.response!.status;
    noDataAvailable.value = true;
}

const addPhotoModalOpened = ref(false);
const photoModalOpened = computed(() => Boolean(route.params.imagePath));
const removePhotoModal = reactive({
    opened: false,
    imageDetail: {
        name: '',
        path: '',
    },
});

const onClosePhotoModal = () => {
    router.replace({ name: 'gallery' });
}

const promptImageDeleteModal = (name: string, path: string) => {
    removePhotoModal.imageDetail = {
        name,
        path,
    }
    removePhotoModal.opened = true;
}

</script>

<template>
    <div>
        <div v-if="!noDataAvailable.value">
            <div class="container mx-auto px-4">
                <router-link to="/" class="flex items-center justify-start mb-6 w-fit">
                    <div class="w-3 mr-2">
                        <IconBack />
                    </div>
                    <h2 class="text-lg font-medium block">{{ galleryData.gallery!.name }}</h2>
                </router-link>
            </div>
            <main class="container mx-auto px-4 mb-20">
                <div v-if="galleryData.images" class="gallery-grid">
                    <div class="grid-item relative bg-white custom-shadow hover:scale-105 transition-all duration-100 ease-linear cursor-pointer rounded-md overflow-hidden"
                        v-for="(image, idx) in galleryData.images" :key="idx">
                        <div class="absolute top-3 left-3 z-20 flex items-center">
                            <DeleteIcon class="relative z-20 h-6 w-6 p-1.5" title="Vymazať fotografiu"
                                @icon-clicked="promptImageDeleteModal(image.name, image.fullpath)" />
                        </div>
                        <router-link :to="{ name: 'gallery', params: { imagePath: image.path.replace('.', '_ext_') } }"
                            class="w-full h-full">
                            <div class="flex flex-col w-full h-48">
                                <ImageWithLoader class="block w-full h-full"
                                    :img-url="`${apiUrl}/images/200x200/${image.fullpath}`"
                                    img-classes="block w-full h-full object-cover" />
                            </div>
                        </router-link>
                    </div>
                    <div class="grid-item">
                        <AddActionCard @click="addPhotoModalOpened = true;" card-text="Pridať fotky" />
                    </div>
                </div>
            </main>
            <Transition>
                <FormModal v-if="addPhotoModalOpened" @close-modal="addPhotoModalOpened = false;" title="Pridať fotky">
                    <template #modal-content>
                        <AddPhoto @close-modal="addPhotoModalOpened = false;" @submit-success="fetchData" />
                    </template>
                </FormModal>
            </Transition>
            <Transition>
                <PhotoModal :gallery-data="galleryData" v-if="photoModalOpened" @close-modal="onClosePhotoModal"
                    :key="route.params.imagePath as string ?? 0" />
            </Transition>
            <Transition>
                <FormModal v-if="removePhotoModal.opened" @close-modal="removePhotoModal.opened = false;"
                    title="Vymazať fotografiu">
                    <template #modal-content>
                        <RemoveGallery :gallery-detail="removePhotoModal.imageDetail"
                            @close-modal="removePhotoModal.opened = false;" item-question="Naozaj chcete vymazať fotografiu"
                            success-text="Fotografia bola zmazaná!" @successful-submit="fetchData" />
                    </template>
                </FormModal>
            </Transition>
        </div>
        <div v-else
            class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-screen h-[100dvh] flex items-center justify-center">
            <div v-if="noDataAvailable.code === 404" class="text-red-500 font-bold text-lg">
                Požadovaná galéria neexistuje!
            </div>
            <div v-else class="text-red-500 font-bold text-lg">Nepodarilo sa načítať dáta</div>
        </div>
    </div>
</template>