R<template>
    <SentenceForm
        :sentence="sentence"
        :image="image"
        @submit="updateRecord"
    />
</template>

<script setup>
import {Record} from 'airtable';
import {computed} from 'vue';
import SentenceForm from '@/components/SentenceForm.vue';

const props = defineProps({
    number: {
        type: Number,
        required: true,
    },
    record: {
        type: Record,
        required: true,
    }
});

const emit = defineEmits(['updated']);

const sentence = computed(() => props.record.get('sentence'));

const image = computed(() => {
    const providerCode = props.record.get('providerCode');
    const type = providerCode[0];

    return `/img/${type}/${props.number}.webp`;
});

function updateRecord(answer, accuracy) {
    const answeredAt = new Date;

    props.record.updateFields({answer, accuracy, answeredAt});

    emit('updated', answer, accuracy);
}
</script>
