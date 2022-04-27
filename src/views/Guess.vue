<template>
    <div class="container">
        <div
            v-if="typeInvalid"
            class="text-center"
        >
            This link is invalid, please contact the research conductor.
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

const BASE_ID = 'appeCRmidlJSZVW5Z';

const TABLE_IDS = {
    A: 'tblPtzhnTaiXZX1Qr',
};

const type = useRoute().params.type.toUpperCase();

const answererId = '1';
const answererCode = type + answererId;

const typeInvalid = !(type in TABLE_IDS);

Airtable.configure({
    apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
})

const table = (Airtable.base(BASE_ID))(type);

const records = ref();
const index = ref(0);
const currentRecord = computed(() => {
    if (!records.value) return;

    return records.value[index.value];
});

table.select({
    filterByFormula: `{answererCode} = '${answererCode}'`,
    pageSize: 20,
    view: 'Grid view',
}).firstPage((e, _records) => {
    records.value = _records;
});
</script>
