<template>
    <div class="container">
        <SentenceInput
            v-if="!sentence"
            @submit="sentence = $event"
        />

        <SentenceForm
            v-else
            :sentence="sentence"
        />
    </div>
</template>

<script setup>
import SentenceForm from '@/components/SentenceForm.vue';
import SentenceInput from '@/components/SentenceInput.vue';
import {ref} from 'vue';

const sentence = ref();
</script>
