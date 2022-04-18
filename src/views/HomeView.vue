<template>
  <div class="flex flex-col gap-8">
    Input your sentence

    <input type="text" v-model="sentence" @keyup.enter="submitSentence"/>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const sentence = ref();
const sentenceSubmitted = ref(false);

function submitSentence() {
  sentenceSubmitted.value = true;

  console.log(sentence.value);
}
</script>
