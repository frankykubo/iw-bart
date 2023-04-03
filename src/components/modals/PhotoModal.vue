<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type PropType } from 'vue';
import { isElementInView } from '@/util/viewport';
import { useRoute } from 'vue-router';
import type { Gallery } from '@/types/gallery';
import ImageWithLoader from '@/components/ImageWithLoader.vue';
import IconBack from '@/components/icons/IconBack.vue';

const props = defineProps({
    galleryData: {
        type: Object as PropType<Gallery>,
        required: true,
    }
})

const modalContainer = ref<HTMLElement>();
const apiUrl = import.meta.env.VITE_APP_API_URL;
const route = useRoute();
let imagePath = route.params.imagePath as string;
imagePath = imagePath.replace('_ext_', '.');
const imageExists = ref(true);

const imageGalleryIdx = computed(() => {
    return props.galleryData.images!.findIndex((elm) => {
        return elm.path === imagePath
    }) as number;
})

if (imageGalleryIdx.value === -1) {
    imageExists.value = false;
}

const prevIndex = computed(() => {
    if (imageGalleryIdx.value === 0) {
        return props.galleryData.images!.length - 1;
    }
    return imageGalleryIdx.value - 1;
});

const nextIndex = computed(() => {
    if (imageGalleryIdx.value === props.galleryData.images!.length - 1) {
        return 0;
    }
    return imageGalleryIdx.value + 1;
});

const imageUrl = computed(() => `${apiUrl}/images/900x900/${route.params.path}/${imagePath}`);

const emit = defineEmits(['closeModal']);

const handleEscKey = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || !modalContainer.value) {
        return;
    }
    if (isElementInView(modalContainer.value)) {
        emit('closeModal');
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleEscKey);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscKey);
});
</script>

<template>
    <div ref="modalContainer" id="addGalleryModal"
        class="fixed z-50 top-0 left-0 w-[100vw] h-[100dvh] transition-all duration-300">
        <div data-modal-id="addGalleryModal" @click="emit('closeModal')"
            class="absolute left-0 top-0 w-full h-full bg-black opacity-50 z-10" />
        <div class="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-20 bg-white rounded-3xl">
            <div class="relative">
                <div class="h-[56rem] w-[56rem] max-w-[80vw] md:max-w-[65vw] bg-white rounded-2xl overflow-hidden">
                    <ImageWithLoader class="block w-full h-full" :img-url="imageUrl"
                        img-classes="block w-full h-full object-contain" />
                </div>
                <div v-if="galleryData.images!.length > 0 && imageExists" class="arrows">
                    <RouterLink
                        :to="{ name: 'gallery', params: { path: route.params.path, imagePath: galleryData.images![prevIndex].path.replace('.', '_ext_') } }"
                        class="flex items-center justify-center p-4 hover:scale-110 cursor-pointer transition-transform duration-100 -translate-y-1/2 -translate-x-1/2 top-1/2 h-12 w-12 rounded-full bg-white absolute left-0">
                        <IconBack />
                    </RouterLink>
                    <RouterLink
                        :to="{ name: 'gallery', params: { path: route.params.path, imagePath: galleryData.images![nextIndex].path.replace('.', '_ext_') } }"
                        class="flex items-center justify-center p-4 hover:scale-110 cursor-pointer transition-transform duration-100 -translate-y-1/2 translate-x-1/2 top-1/2 h-12 w-12 rounded-full bg-white absolute right-0 [&_svg]:rotate-180">
                        <IconBack />
                    </RouterLink>
                </div>
                <div @click="emit('closeModal')"
                    class="p-4 w-12 h-12 cursor-pointer absolute top-2 right-2 bg-black rounded-full bg-opacity-60 hover:bg-opacity-90">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#ffffff" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>