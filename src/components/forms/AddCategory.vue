<script setup lang="ts">
import { reactive, ref } from 'vue';
import axios, { AxiosError } from 'axios';
import type { SubmitError } from '@/types/api';
import AbsoluteLoader from '@/components/AbsoluteLoader.vue';
import ErrorViewer from './ErrorViewer.vue';
import IconCheckmark from '@/components/icons/IconCheckmark.vue';

const emit = defineEmits(['closeModal', 'successfulSubmit']);

const categoryName = ref('');
const formState = reactive({
    submiting: false,
    hasError: false,
    errorDetail: {
        message: '',
        code: 0,
    } as SubmitError,
    success: false,
});
const onSubmit = async () => {
    if (formState.hasError) {
        formState.hasError = false;
    }
    formState.submiting = true;
    // Just to add some loading time
    await new Promise(resolve => setTimeout(() => resolve('timeout succeed'), 500));
    if (!categoryName.value) {
        formState.errorDetail = {
            code: undefined,
            description: 'Názov musí mať dĺžku aspoň 1 znak.',
        };
        formState.hasError = true;
        formState.submiting = false;
        return;
    }
    try {
        await axios.post(`${import.meta.env.VITE_APP_API_URL}/gallery`, {
            name: categoryName.value,
        });
        formState.success = true;
        formState.submiting = false;
        emit('successfulSubmit');
    } catch (e: any) {
        const error = e as AxiosError<SubmitError>;
        formState.errorDetail = {
            code: error.response?.data?.code,
            description: error.response?.data.description,
            name: error.response?.data.name
        };
        formState.hasError = true;
        formState.submiting = false;
    }
}
</script>

<template>
    <div>
        <form class="w-[50rem] max-w-[90vw] md:max-w-[65vw] px-12 pb-12 pt-1" @submit.prevent="onSubmit">
            <div class="relative mb-4">
                <label for="inputField"
                    class="absolute -translate-y-1/2 top-0 left-2 px-2 bg-white font-medium text-xs">Názov
                    kategórie
                    *</label>
                <input type="text" required id="inputField" v-model="categoryName"
                    class="border border-gray-400 rounded-md outline-none focus:border-black px-4 py-3 w-full transition-all duration-100">
            </div>
            <ErrorViewer v-if="formState.hasError" :error-detail="formState.errorDetail" />
            <button type="submit"
                class="w-full bg-black outline-none text-white px-4 rounded-md py-5 hover:bg-opacity-80">Pridať</button>
        </form>
        <Transition>
            <AbsoluteLoader v-if="formState.submiting" />
        </Transition>
        <Transition>
            <div v-if="formState.success"
                class="absolute left-0 top-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center p-2">
                <div class="flex flex-col justify-center items-center">
                    <div class="w-20 mb-6">
                        <IconCheckmark />
                    </div>
                    <div class="text-lg font-bold mb-3 text-green-500">
                        Kategória bola úspešne vytvorená!
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
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>