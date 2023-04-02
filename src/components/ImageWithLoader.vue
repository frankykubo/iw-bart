<script setup lang="ts">
import { ref } from 'vue';


defineProps({
    imgUrl: {
        type: String,
        required: true,
    },
    imgClasses: {
        type: String,
        required: false,
        default: '',
    }
})

const isLoaded = ref(false);

const onImageLoad = () => {
    isLoaded.value = true;
};


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
            <img :class="imgClasses" :src="imgUrl" @load="onImageLoad" />
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