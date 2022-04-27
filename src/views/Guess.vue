<template>
    <div class="container">
        <div
            v-if="typeInvalid"
            class="text-center"
        >
            This link is invalid, please contact the research conductor.
        </div>

        <SentenceForm
            v-else
            :sentence="sentence"
        />
    </div>
</template>

<script setup>
import SentenceForm from '@/components/SentenceForm.vue';
import {ref} from 'vue';
import { useRoute } from 'vue-router';

const {type} = useRoute().params;

const typeInvalid = !['a', 'b', 'c', 'd'].includes(type);

const sentence = ref('i am type ' + type);
</script>
