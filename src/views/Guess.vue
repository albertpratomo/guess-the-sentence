<template>
    <div class="container">
        <FeedbackForm
            v-if="records.length && index === records.length"
            :answerer-code="answererCode"
            :base="base"
        />
        
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

            <ButtonState
                :loading="loading"
                class="mt-12 btn-blue"
                :disabled="!answererCode"
                @click="fetchRecords"
            >
                <span v-t="'common.next'" />
            </ButtonState>
        </div>

        <RecordForm
            v-else-if="currentRecord"
            :key="currentRecord.id"
            :subtitle="subtitle.text"
            :subtitle-class="subtitle.class"
            :record="currentRecord"
            :number="(index % 10)+1"
            @updated="index++"
        />
    </div>
</template>

<script setup>
import Airtable from 'airtable';
import ButtonState from '@/components/ButtonState.vue';
import FeedbackForm from '@/components/FeedbackForm.vue';
import RecordForm from '@/components/RecordForm.vue';
import {computed, ref} from 'vue';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

Airtable.configure({
    apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
});
const BASE_ID = 'appeCRmidlJSZVW5Z';
const base = Airtable.base(BASE_ID);

const answererCode = ref();

const records = ref([]);
const index = ref(0);
const currentRecord = computed(() => {
    if (!records.value) return;

    const record = records.value[index.value];

    return record && record.get('sentence') 
        ? record
        : undefined;
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

const loading = ref(false);

function fetchRecords() {
    const type = answererCode.value[0];
    const table = base(type);

    loading.value = true;

    table.select({
        filterByFormula: `{answererCode} = '${answererCode.value}'`,
        pageSize: 20,
        view: 'Grid view',
    }).firstPage(
        (e, _records) => records.value = _records, 
        () => loading.value = false,
    );
}
</script>
