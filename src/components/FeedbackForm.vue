R<template>
    <div class="flex-col items-center max-w-screen-md gap-4 mx-auto text-center">
        <template v-if="finished">
            <h1
                v-t="'finish.title'"
                class="font-bold"
            />
            
            <div v-t="'finish.body'" />
        </template>

        <template v-else>
            <h2 v-t="'feedback.question1'" />
    
            <textarea
                v-model="feedback1"
                rows="5"
                class="w-full"
            />
            
            <h2
                v-t="'feedback.question2'"
                class="mt-8"
            />
    
            <textarea
                v-model="feedback2"
                rows="5"
                class="w-full"
            />
    
            <ButtonState
                :loading="loading"
                class="mt-8 btn-blue"
                @click="submitFeedback"
            >
                <span v-t="'common.submit'" />
            </ButtonState>
        </template>
    </div>
</template>

<script setup>
import ButtonState from '@/components/ButtonState.vue';
import {Base} from 'airtable';
import {ref} from 'vue';

const props = defineProps({
    answererCode: {
        type: String,
        required: true,
    },
    base: {
        type: Base,
        required: true,
    },
});

const feedback1 = ref();
const feedback2 = ref();

const finished = ref(false);

const loading = ref(false);

function submitFeedback() {
    const table = props.base('Feedbacks');

    loading.value = true;

    table.create(
        {
            answererCode: props.answererCode,
            feedback1: feedback1.value,
            feedback2: feedback2.value,
        }, 
        () => loading.value = false,
    );

    finished.value = true;
}
</script>
