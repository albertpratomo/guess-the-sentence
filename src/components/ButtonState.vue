<template>
    <button class="flex items-center gap-4 ">
        <spinner v-if="loading" />

        <slot />
    </button>
</template>

<script setup>
import Spinner from '@/components/Spinner.vue';

defineProps({
    loading: {
        type: Boolean,
        default: false,
    }
})
</script>
