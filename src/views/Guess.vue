<template>
    <div class="container">
        <div
            v-if="typeInvalid"
            class="text-center"
        >
            {{ $t('message.invalidLink') }}
        </div>

        <div
            v-else-if="!currentRecord"
            class="flex-col items-center gap-4"
        >
            {{ $t('intro.fillYourCode') }}

            <input
                v-model="answererId"
                type="number"
                placeholder="Code"
            >

            <button
                class="btn-blue mt-12"
                :disabled="!answererId"
                @click="fetchRecords"
            >
                {{ $t('common.submit') }}
            </button>
        </div>

        <RecordForm
            v-else-if="currentRecord"
            :key="currentRecord.id"
            :record="currentRecord"
            @updated="index++"
        />
    </div>
</template>

<script setup>
import Airtable from 'airtable';
import RecordForm from '@/components/RecordForm.vue';
import {computed, ref} from 'vue';
import { useRoute } from 'vue-router';

const type = useRoute().params.type.toUpperCase();
const typeInvalid = !['A', 'B', 'C', 'D'].includes(type);

const answererId = ref();

const records = ref();
const index = ref(0);
const currentRecord = computed(() => {
    if (!records.value) return;

    return records.value[index.value];
});

function fetchRecords() {
    Airtable.configure({
        apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
    })

    const BASE_ID = 'appeCRmidlJSZVW5Z';
    const table = (Airtable.base(BASE_ID))(type);

    table.select({
        filterByFormula: `{answererCode} = '${type + answererId.value}'`,
        pageSize: 20,
        view: 'Grid view',
    }).firstPage((e, _records) => {
        records.value = _records;
    });
}
</script>
