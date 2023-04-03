<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['imageLoaded'])


const props = defineProps({
    imgUrl: {
        type: String,
        required: true,
    },
    imgClasses: {
        type: String,
        required: false,
        default: '',
    },
})

const isLoaded = ref(false);
const hasError = ref(false);
const imageEl = ref();

const onImageLoad = () => {
    isLoaded.value = true;
    emit('imageLoaded');
};

const onImageError = () => {
    hasError.value = true;
    isLoaded.value = true;
    emit('imageLoaded');
};

watch(() => props.imgUrl, () => {
    imageEl.value.src = '';
    isLoaded.value = false;
});


</script>

<template>
    <KeepAlive>
        <div class="relative">
            <Transition>
                <div v-if="!isLoaded"
                    class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex justify-center items-center">
                    <div class="loader"></div>
                </div>
            </Transition>
            <Transition>
                <div v-if="hasError" class="w-full h-full flex justify-center items-center">
                    <div class="font-bold text-lg text-red-500">
                        Obrázok sa nepodarilo načítať
                    </div>
                </div>
            </Transition>
            <img v-if="!hasError" ref="imageEl" :class="imgClasses" :src="imgUrl" @load="onImageLoad"
                @error="onImageError" />
        </div>
    </KeepAlive>
</template>

<style scoped>
.loader {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid #000000;
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>