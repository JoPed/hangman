<template>
  <form>
    <label for="guess" class="text-lg italic text-white-50"
      >Make a guess (one letter at a time)</label
    >
    <div class="flex flex-row justify-center mt-2">
      <input
        @keydown="handleUserInput"
        @input="clearErrorMessage"
        :ref="getRef"
        v-autofocus
        type="text"
        class="block w-[100px] h-8 mx-3 p-1 text[1rem] font-normal text-white-50 bg-transparent border-2 border-solid border-white-50 appearance-none rounded focus:outline-0 focus:outline-none focus:shadow-[0_0_0_.3rem_rgba(242,135,5,.5)] focus:border-[rgb(242,135,5)] disabled:shadow-none disabled:border-2 disabled:border-solid disabled:border-white-50 disabled:bg-white-50/[.15]"
      />

      <button
        v-if="isGameOver"
        @click.prevent="resetGame"
        class="block w-[100px] h-8 mx-3 text-[1rem] font-normal text-white-50 bg-transparent border-2 border-solid border-white-50 appearance-none rounded cursor-pointer hover:bg-white-50/20"
      >
        Play Again
      </button>
      <button
        v-else
        @click="handleUserInput"
        class="block w-[100px] h-8 mx-3 text-[1rem] font-normal text-white-50 bg-transparent border-2 border-solid border-white-50 appearance-none rounded cursor-pointer hover:bg-white-50/20"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: ["isGameOver", "handleUserInput", "getRef", "resetGame"],
  setup(props, { emit }) {

    const clearErrorMessage = () => {
      emit("update:inputError", "");
    };

    //* Directives - every directive has to start with lowercase v and be camel case

 

    return { clearErrorMessage };
  },
};
</script>