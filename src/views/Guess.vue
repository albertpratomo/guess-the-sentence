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
import Airtable from 'airtable';
import SentenceForm from '@/components/SentenceForm.vue';
import {ref} from 'vue';
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

table.select({
    pageSize: 20,
    filterByFormula: `{answererCode} = '${answererCode}'`
}).firstPage((e, _records) => {
    records.value = _records;
});

console.log(records.value);

const sentence = ref('i am type ' + type);
</script>
