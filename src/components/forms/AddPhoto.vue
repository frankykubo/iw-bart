<script setup lang="ts">
import { reactive, ref } from 'vue';
import axios, { AxiosError } from 'axios';
import type { SubmitError } from '@/types/api';
import { useRoute } from 'vue-router';
import ErrorViewer from './ErrorViewer.vue';
import FileSubmitLoader from '../FileSubmitLoader.vue';

enum DragDropState {
    IDLE,
    OVER,
    DROPPED,
}

const emit = defineEmits(['closeModal', 'submitSuccess']);

const route = useRoute();
const dragAndDropState = ref<DragDropState>(DragDropState.IDLE);
const fileInputEl = ref<HTMLInputElement>();
const localImages = reactive<{ url: string, file: File }[]>([]);

const formState = reactive({
    submiting: false,
    hasError: false,
    errorDetail: {
        message: '',
        code: 0,
    } as SubmitError,
    success: false,
    done: {
        total: 0,
        success: 0,
        error: 0,
    }
});
const onSubmit = async () => {
    if (formState.hasError) {
        formState.hasError = false;
    }
    formState.done = {
        total: 0,
        error: 0,
        success: 0
    };

    formState.submiting = true;
    for (const fileObj of localImages) {
        // Just to add some loading time
        await new Promise(resolve => setTimeout(() => resolve('timeout succeed'), 1000));
        const formData = new FormData();
        formData.append('image', fileObj.file);
        try {
            await axios.post(`${import.meta.env.VITE_APP_API_URL}/gallery/${route.params.path}`, formData);
            formState.done.total += 1;
            formState.done.success += 1;
        } catch (e) {
            const error = e as AxiosError<SubmitError>;
            formState.errorDetail = {
                code: error.response?.data?.code,
                description: error.response?.data.description,
                name: error.response?.data.name
            };
            formState.done.total += 1;
            formState.done.error += 1;
            formState.hasError = true;
        }
    }
    if (formState.done.success > 0) {
        emit('submitSuccess');
    }
    formState.success = true;
    formState.submiting = false;

}

const processImages = (files: FileList) => {
    Array.from(files).forEach((file: File) => {
        if (file.type !== 'image/jpeg') {
            formState.errorDetail = {
                code: undefined,
                description: 'Nepodarilo sa nahrať všetky súbory. Je vyžadovaný typ JPG.',
            };
            formState.hasError = true;
            formState.submiting = false;
            return;
        }
        localImages.push({
            url: URL.createObjectURL(file),
            file: file,
        });
    });
}

async function onDropAction(event: DragEvent) {
    event.preventDefault();
    dragAndDropState.value = DragDropState.IDLE;
    processImages(event.dataTransfer!.files);
}

const onFileChange = () => {
    processImages(fileInputEl.value!.files!);
}

</script>

<template>
    <div>
        <div class="w-[50rem] max-w-[90vw] md:max-w-[65vw] px-12 pb-12 pt-1">
            <div class="relative w-full h-64 mb-4 rounded-md"
                :class="[dragAndDropState === DragDropState.OVER ? 'animatedBorder' : 'border-2 border-dotted']"
                @dragenter.prevent="dragAndDropState = DragDropState.OVER"
                @dragleave.prevent="dragAndDropState = DragDropState.IDLE" @dragover.prevent="null"
                @drop.prevent="onDropAction">
                <Transition>
                    <div v-if="dragAndDropState === DragDropState.IDLE"
                        class="absolute w-full h-full flex flex-col items-center justify-center">
                        <div class="flex flex-col items-center justify-center mb-4">
                            <div class="h-7 w-7">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.02693 18.329C4.18385 19.277 5.0075 20 6 20H18C19.1046 20 20 19.1046 20 18V14.1901M4.02693 18.329C4.00922 18.222 4 18.1121 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V14.1901M4.02693 18.329L7.84762 14.5083C8.52765 13.9133 9.52219 13.8482 10.274 14.3494L10.7832 14.6888C11.5078 15.1719 12.4619 15.1305 13.142 14.5865L15.7901 12.4679C16.4651 11.9279 17.4053 11.8856 18.1228 12.3484C18.2023 12.3997 18.2731 12.4632 18.34 12.5302L20 14.1901M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z"
                                        stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div class="font-medium">Sem presuňte fotky</div>
                        </div>
                        <div class="text-[#707070] font-light mb-4">alebo</div>
                        <input ref="fileInputEl" id="fileInput" type="file" hidden multiple @change="onFileChange" />
                        <label for="fileInput"
                            class="block px-4 py-2 border-2 border-black rounded-md hover:bg-black hover:text-white cursor-pointer">
                            Vyberte súbory
                        </label>
                    </div>
                </Transition>
            </div>
            <Transition>
                <div v-if="localImages.length > 0">
                    <h2 class="block text-xl font-bold mb-2">Nahraté fotografie (náhľad)</h2>
                    <div class="flex items-center flex-wrap mb-4">
                        <div class="mr-2" v-for="img in localImages" :key="img.url">
                            <img class="block w-20 h-20 object-cover" :src="img.url" alt="Uploaded image" />
                        </div>
                    </div>
                </div>
            </Transition>
            <ErrorViewer v-if="formState.hasError" :error-detail="formState.errorDetail" />
            <button class="w-full outline-none text-white px-4 rounded-md py-5"
                :class="[localImages.length === 0 ? 'bg-black bg-opacity-70' : 'bg-black hover:bg-opacity-80']"
                @click="onSubmit" :disabled="localImages.length === 0"
                :title="localImages.length === 0 ? 'Pre pridanie, prosím, nahrajte fotografie.' : ''">Pridať</button>
        </div>
        <Transition>
            <FileSubmitLoader v-if="formState.submiting"
                :percentage-done="(formState.done.total / localImages.length) * 100" />
        </Transition>
        <Transition>
            <div v-if="formState.success"
                class="absolute left-0 top-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center p-2">
                <div class="flex flex-col justify-center items-center">
                    <div class="w-20 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
                            <path
                                d="M32,2C15.431,2,2,15.432,2,32c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30C62,15.432,48.568,2,32,2z M25.025,50  l-0.02-0.02L24.988,50L11,35.6l7.029-7.164l6.977,7.184l21-21.619L53,21.199L25.025,50z"
                                fill="#43a047" />
                        </svg>
                    </div>
                    <div class="text-lg font-bold mb-3 text-green-500">
                        <div>Úspešne nahratých fotografií: {{ formState.done.success }}</div>
                        <div v-if="formState.done.error">Neúspešne nahraté: {{ formState.done.error }}</div>
                    </div>
                    <button class="block bg-black outline-none text-white px-6 rounded-md py-2 hover:bg-opacity-80"
                        @click="emit('closeModal')">
                        Zatvoriť
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>

<style>
@property --angle {
    syntax: '<angle>';
    initial-value: 90deg;
    inherits: true;
}

@property --gradX {
    syntax: '<percentage>';
    initial-value: 50%;
    inherits: true;
}

@property --gradY {
    syntax: '<percentage>';
    initial-value: 0%;
    inherits: true;
}

:root {
    --d: 2500ms;
    --angle: 90deg;
    --gradX: 100%;
    --gradY: 50%;
    --c1: rgb(0, 0, 0);
    --c2: rgba(168, 239, 255, 0.1);
}

.animatedBorder {
    background-color: #9fff9d;
    border: 0.35rem solid;
    border-image: conic-gradient(from var(--angle), var(--c2), var(--c1) 0.1turn, var(--c1) 0.15turn, var(--c2) 0.25turn) 30;
    animation: borderRotate var(--d) linear infinite forwards;
}

@keyframes borderRotate {
    100% {
        --angle: 420deg;
    }
}
</style>