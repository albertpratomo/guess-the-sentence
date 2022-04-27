R<template>
    <SentenceForm :sentence="sentence" />
</template>

<script setup>
import {Record} from 'airtable';
import {computed} from 'vue';
import SentenceForm from '@/components/SentenceForm.vue';

const props = defineProps({
    record: {
        type: Record,
        required: true,
    }
});

const sentence = computed(() => props.record.get('sentence'));
</script>
