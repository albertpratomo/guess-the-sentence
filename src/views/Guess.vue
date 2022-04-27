<template>
    <div class="flex flex-col gap-8 container text-center">
        <template v-if="!sentenceSubmitted">
            Input your sentence

            <input
                v-model="sentence"
                type="text"
                @keyup.enter="submitSentence"
            >
        </template>

        <template v-else>
            Guess the sentence

            <div class="flex flex-wrap gap-4 items-center justify-center">
                <div
                    v-for="(word, i) in sentenceSplitted"
                    :key="i"
                    ref="inputs"
                >
                    <template v-if="i < index">
                        {{ sentenceSplitted[i] }}
                    </template>

                    <input
                        v-else
                        type="text"
                        class="bg-slate-100 w-36 focus:bg-white"
                        :disabled="!!(i > index)"
                        @keyup.enter="submitAnswer"
                    >
                </div>
            </div>

            <div v-if="completed">
                Your answer: {{ answers.join(' ') }}
                <br>
                Your accuracy: {{ accuracy }}%
            </div>
        </template>
    </div>
</template>

<script setup>
import {computed, nextTick, ref} from 'vue';

const sentence = ref();
const sentenceSubmitted = ref(false);
const sentenceSplitted = computed(() => sentence.value.split(' '));
const answers = ref();
const index = ref(1);
const inputs = ref();
const completed = computed(() => answers.value.length >= sentenceSplitted.value.length);

const correctCount = ref(0);
const accuracy = computed(() => (correctCount.value/(sentenceSplitted.value.length - 1) * 100));

async function submitSentence() {
    sentenceSubmitted.value = true;

    sentence.value = sentence.value.replace(/\s{2,}/g, ' ').trim().toLowerCase();

    answers.value = [sentenceSplitted.value[0]];

    await nextTick();

    inputs.value[index.value].firstChild.focus();
}

async function submitAnswer(e) {
    const answer = e.target.value.trim().toLowerCase();

    answers.value.push(answer);

    if (answer == sentenceSplitted.value[index.value]) {
        correctCount.value++;
    }

    index.value++;

    await nextTick();
    
    if (!completed.value) {
        inputs.value[index.value].firstChild.focus();
    }
}
</script>
