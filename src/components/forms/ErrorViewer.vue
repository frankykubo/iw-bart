<script setup lang="ts">
import type { SubmitError } from '@/types/api';
import type { PropType } from 'vue';

defineProps({
    errorDetail: {
        type: Object as PropType<SubmitError>,
        required: true,
    }
})
</script>

<template>
    <div class="text-left mb-4">
        <div class="text-sm text-red-500">Chyba pri odoslaní formulára ({{ errorDetail.code ? `kód
                    ${errorDetail.code}`
            : `Nedefinovanýkód chyby` }})!</div>
        <div>{{ errorDetail.description }}</div>
    </div>
</template>