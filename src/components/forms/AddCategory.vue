<script setup lang="ts">
import { reactive, ref } from 'vue';
import axios, { AxiosError } from 'axios';

type SubmitError = Partial<{
    description: string,
    code: number,
    name: string,
}>

const categoryName = ref('');
const formState = reactive({
    submiting: false,
    hasError: false,
    errorDetail: {
        message: '',
        code: 0,
    } as SubmitError,
});
const onSubmit = async () => {
    if (formState.hasError) {
        formState.hasError = false;
    }
    formState.submiting = true;
    // Just to add some loading time
    await new Promise(resolve => setTimeout(() => resolve('timeout succeed'), 500));
    // if (!categoryName.value) {
    //     console.log('NO VALUE')
    //     // TODO
    //     return;
    // }
    try {
        await axios.post(`${import.meta.env.VITE_APP_API_URL}/gallery`, {
            name: categoryName.value,
        });
        formState.submiting = false;
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
            <div v-if="formState.hasError" class="text-left mb-4">
                <div class="text-sm text-red-500">Chyba pri odoslaní formulára ({{ formState.errorDetail.code ? `kód
                                    ${formState.errorDetail.code}`
                    : `Nedefinovanýkód chyby` }})!</div>
                <div>{{ formState.errorDetail.description }}</div>
            </div>
            <button type="submit"
                class="w-full bg-black outline-none text-white px-4 rounded-md py-5 hover:bg-opacity-80">Pridať</button>
        </form>
        <Transition>
            <div v-if="formState.submiting"
                class="absolute left-0 top-0 w-full h-full bg-white opacity-80 flex items-center justify-center">
                <div class="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
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