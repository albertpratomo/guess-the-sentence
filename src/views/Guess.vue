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
import {GoogleSpreadsheet} from 'google-spreadsheet';
import SentenceForm from '@/components/SentenceForm.vue';
import {ref} from 'vue';
import { useRoute } from 'vue-router';

const {type} = useRoute().params;

const sheets = {
    a: '10KANUVaIq4T8s374upojJHZfPLdJsNuBQIE77rFceRw',
};

const typeInvalid = !(type in sheets);

async function fetchSentence() {
    const sheet = new GoogleSpreadsheet(sheets[type]);

    await sheet.useServiceAccountAuth({
        client_email: import.meta.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: import.meta.env.VITE_GOOGLE_PRIVATE_KEY,
    });
    
    const sentence = ref('asaws');

    await sheet.loadInfo();
    console.log(sheet.title);
}

fetchSentence();
</script>
