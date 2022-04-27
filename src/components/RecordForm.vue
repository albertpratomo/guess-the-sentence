R<template>
    <SentenceForm
        :sentence="sentence"
        @submit="updateRecord"
    />
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

const emit = defineEmits(['updated']);

const sentence = computed(() => props.record.get('sentence'));

function updateRecord(answer, accuracy) {
    const answeredAt = new Date;

    props.record.updateFields({answer, accuracy, answeredAt});

    emit('updated', answer, accuracy);
}
</script>
