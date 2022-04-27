<template>
    <div class="flex flex-col gap-8 text-center">
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

        <div
            v-if="completed"
            class="flex-col items-center gap-4"
        >
            <div v-if="showAnswer">
                Your answer: {{ answersJoined }}
                <br>
                Your accuracy: {{ accuracy }}%
            </div>

            <button
                class="btn-blue"
                @click="$emit('submit', answersJoined, accuracy)"
            >
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import {computed, nextTick, ref} from 'vue';

const props = defineProps({
    sentence: {
        type: String,
        required: true,
    },
    showAnswer: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['submit']);

const sentenceSplitted = computed(() => props.sentence.split(' '));
const answers = ref([sentenceSplitted.value[0]]);
const answersJoined = computed(() => answers.value.join(' '));
const index = ref(1);
const inputs = ref();
const completed = computed(() => answers.value.length >= sentenceSplitted.value.length);

const correctCount = ref(0);
const accuracy = computed(() => (correctCount.value/(sentenceSplitted.value.length - 1) * 100));

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
