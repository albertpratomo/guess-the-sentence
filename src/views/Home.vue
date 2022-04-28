<template>
    <div class="container max-w-screen-md text-center">
        <div
            v-if="step === -1"
            class="flex-col items-center gap-12"
        >
            <h1 class="font-bold">
                {{ $t('intro.title') }}
            </h1>

            <div class="whitespace-pre-line">
                {{ $t('intro.body') }}
            </div>

            <button
                class="btn-blue"
                autofocus
                @click="step = 0"
            >
                {{ $t('common.start') }}
            </button>
        </div>

        <div v-else>
            <SentenceForm
                :key="step"
                :subtitle="subtitle"
                :sentence="sentences[step]"
                @submit="nextSentence"
            />
        </div>
    </div>
</template>

<script setup>
import SentenceForm from '@/components/SentenceForm.vue';
import {computed, ref} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const {t, tm} = useI18n();

const sentences = tm('practice.sentences');

const subtitle = computed(() => {
    const text = t('practice.subtitle'); 

    return `${text} ${step.value+1}/${sentences.length}`;
});

const step = ref(-1);

function nextSentence() {
    if (step.value === sentences.length - 1) {
        useRouter().push({
            name: 'guess',
        });
    }
}
</script>
