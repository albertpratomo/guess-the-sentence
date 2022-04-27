<template>
    <div class="flex flex-col gap-8 text-center">
        Input your sentence

        <input
            v-model="sentence"
            type="text"
            @keyup.enter="submit"
        >
    </div>
</template>

<script setup>
import {ref} from 'vue';

const emit = defineEmits(['submit']);

const sentence = ref();

function submit() {
    sentence.value = sentence.value.replace(/\s{2,}/g, ' ').trim().toLowerCase();

    emit('submit', sentence.value);
}
</script>
