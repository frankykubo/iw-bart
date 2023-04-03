<script setup lang="ts">
defineProps({
    percentageDone: {
        type: Number,
        required: true,
    }
})
</script>

<template>
    <div class="absolute left-0 top-0 w-full h-full bg-white bg-opacity-80 flex flex-col items-center justify-center">
        <div class="font-bold text-sm mb-2">
            Nahrávam súbory...
        </div>
        <div class="progressbar">
            <span class="progress" :style="{ width: `${percentageDone}%` }"></span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.progressbar {
    border-radius: 9999px;
    position: relative;
    max-width: 60%;
    width: 100%;
    height: 20px;
    background: #cdcdcd;
    overflow: hidden;
}

span.progress {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: #326666;
    transition: all .3s;
}
</style>