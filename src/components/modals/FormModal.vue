<script setup lang="ts">
import { ref } from 'vue';

const modalContainer = ref<HTMLElement>();

defineProps({
    title: {
        type: String,
        required: false,
        default: null,
    }
})
const emit = defineEmits(['closeModal']);
</script>

<template>
    <div ref="modalContainer" id="addGalleryModal"
        class="fixed z-10 top-0 left-0 w-[100vw] h-[100dvh] transition-all duration-300">
        <div data-modal-id="addGalleryModal" @click="emit('closeModal')"
            class="modalTrigger absolute left-0 top-0 w-full h-full bg-black opacity-50 z-10" />
        <div class="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-20 bg-white rounded-3xl overflow-hidden">
            <div class="h-fit max-h-[80vh] overflow-y-auto max-w-[90vw] md:max-w-[65vw]">
                <div class="flex items-center justify-between pt-12 px-12 mb-8">
                    <h1 class="block text-xl font-bold">{{ title }}</h1>
                    <div @click="emit('closeModal')" class="modalTrigger w-5 h-5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#000000" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                </div>
                <slot name="modal-content"></slot>
            </div>
        </div>
    </div>
</template>