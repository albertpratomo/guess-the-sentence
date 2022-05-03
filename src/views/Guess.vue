<template>
    <div class="container">
        <div
            v-if="records.length && index === records.length"
            class="text-center"
        >
            <h1 class="font-bold">
                {{ $t('finish.title') }}
            </h1>
            
            <div>
                {{ $t('finish.body') }}
            </div>
        </div>
        
        <div
            v-else-if="!currentRecord"
            class="flex-col items-center gap-4"
        >
            {{ $t('intro.fillYourCode') }}

            <input
                v-model="answererCode"
                type="text"
                placeholder="Code"
            >

            <button
                class="mt-12 btn-blue"
                :disabled="!answererCode"
                @click="fetchRecords"
            >
                {{ $t('common.submit') }}
            </button>
        </div>

        <RecordForm
            v-else-if="currentRecord"
            :key="currentRecord.id"
            :subtitle="subtitle.text"
            :subtitle-class="subtitle.class"
            :record="currentRecord"
            @updated="index++"
        />
    </div>
</template>

<script setup>
import Airtable from 'airtable';
import RecordForm from '@/components/RecordForm.vue';
import {computed, ref} from 'vue';
import { useI18n } from 'vue-i18n';

const {t} = useI18n();

const answererCode = ref();

const records = ref([]);
const index = ref(0);
const currentRecord = computed(() => {
    if (!records.value) return;

    return records.value[index.value];
});

const subtitle = computed(() => {
    let cssClass, number, text;
    
    if (index.value < 10) {
        text = t('guess.subtitleStranger');
        number = index.value + 1;
    } else {
        cssClass = 'text-green-500';
        text = t('guess.subtitlePartner');
        number = index.value - 9;
    }

    return {
        class: cssClass,
        text: `${text} ${number}/10`,
    };
});

function fetchRecords() {
    Airtable.configure({
        apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
    })

    const BASE_ID = 'appeCRmidlJSZVW5Z';
    const type = answererCode.value[0];
    const table = (Airtable.base(BASE_ID))(type);

    table.select({
        filterByFormula: `{answererCode} = '${answererCode.value}'`,
        pageSize: 20,
        view: 'Grid view',
    }).firstPage((e, _records) => {
        records.value = _records;
    });
}
</script>
