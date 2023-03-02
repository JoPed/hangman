<template>
  <h1
    class="my-2 text-4xl font-bold text-center font-BAHNSCHRIFT text-white-50"
  >
    Add new words
  </h1>
  <p class="p-3 text-xl font-bold leading-8 text-center text-white-50">
    Type any word or multiple words (e.g. chair or kitcken table) <br />
    When satisfied with the list of words, press save (saved locally on your
    browser)<br />
    To load your own (local) words, go to Home/Game and press load words<br />
    To delete your own (local) words, press delete
  </p>

  <form>
    <label
      for="word"
      class="block w-3/12 mx-auto mt-10 italic font-semibold text-center text-white-50"
      >Type a word and press enter to confirm. <br />
      Words cannot be repeated!</label
    >
    <input
      v-model="tempWord"
      @keypress.enter.prevent="addWord"
      id="word"
      type="text"
      class="block w-2/12 border-2 border-solid border-white-50 mx-auto p-1 text-xl leading-6 text-white-50 bg-transparent appearance-none rounded-md mb-8 focus:outline-0 focus:shadow-md focus:shadow-white-50/30 h-[35px] pl-1"
    />
  </form>

  <div v-if="words.length > 0" class="w-1/2 p-3 mx-auto">
    <h2
      class="my-2 text-2xl font-bold text-center font-BAHNSCHRIFT text-white-50"
    >
      Selected words
    </h2>

    <div class="flex flex-row flex-wrap justify-center gap-2">
      <div
        class="flex flex-col items-center justify-center gap-y-1"
        v-for="(word, index) in words"
        :key="'skill' + index"
      >
        <p
          class="px-3 py-2 bg-white-50/20 rounded-2xl text-sm tracking-[1px] font-bold text-white-50 shadow-sm shadow-white-50/60 cursor-default select-none"
        >
          {{ word }}
        </p>
        <font-awesome-icon
          class="cursor-pointer text-white-50"
          @click="removeWord(word)"
          icon="fa-xmark"
        />
      </div>
    </div>
  </div>
  <button
    class="inline-block w-[125px] py-2 mr-1 mx-auto text-[1rem] font-normal text-white-50 bg-transparent border-2 border-solid border-white-50 appearance-none rounded cursor-pointer hover:bg-white-50/20"
    @click="saveWords"
  >
    Save words
  </button>
  <button
    class="inline-block w-[125px] ml-1 py-2 mx-auto text-[1rem] font-normal text-white-50 bg-green-600 border-2 border-solid border-white-50 appearance-none rounded cursor-pointer hover:bg-green-700/70"
    @click="loadWords"
  >
    Load words
  </button>
  <button
    class="inline-block w-[125px] ml-1 py-2 mx-auto text-[1rem] font-normal text-white-50 bg-red-600 border-2 border-solid border-white-50 appearance-none rounded cursor-pointer hover:bg-red-700/70"
    @click="deleteWords"
  >
    Delete words
  </button>

  
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let tempWord = ref("");
    const words = ref([]);

    const addWord = (e) => {
      e.preventDefault();

      if (tempWord.value) {
        if (!words.value.includes(tempWord.value)) {
          words.value.push(tempWord.value);
        }
        tempWord.value = "";
      }
    };

    const removeWord = (word) => {
      const indexOfWord = words.value.indexOf(word);
      words.value.splice(indexOfWord, 1);
    };

    const saveWords = () => {
      localStorage.setItem("words", JSON.stringify(words.value));
    };

    const deleteWords = () => {
      localStorage.removeItem("words");
    };

    const loadWords = () => {

      if(localStorage.getItem('words')){
        words.value.push(...JSON.parse(localStorage.getItem('words')));
      }
    }

    return { tempWord, addWord, words, removeWord, saveWords, deleteWords, loadWords };
  },
};
</script>

<style>
</style>