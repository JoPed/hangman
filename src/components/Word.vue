<template>
  <div v-if="word" class="mt-8">
    <span
      v-for="(char, index) in splitWord(word)"
      :key="index"
      :class="char === ' '
          ? 'w-4 bg-white-50 h-1 z-40 mx-2 inline-block relative  opacity-0'
          : 'w-4 h-[2px] bg-white-50 z-40 mx-2 inline-block relative'"
    >
      <span
        class="absolute bottom-0 font-medium uppercase -translate-x-1/2 left-1/2 text-white-50"
        :ref="el => {correctLetterRef[index] = el}"
        :data-index="index"
      ></span>
    </span>
  </div>
</template>

<script>
export default {
  props: ["word", "correctLetterRef"],
  setup() {
    const splitWord = (word) => {
      return word.split("");
    };

    return { splitWord };
  },
};
</script>

<style>
</style>