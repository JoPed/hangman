<template>

  <Description />

  <main class="max-w-5xl mx-auto min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px] min-[1400px]:max-w-[1320px] mt-6 text-center pb-3 relative">

    <UserInput v-model:inputError="inputError" :guessInputRef="guessInputRef" :handleUserInput="handleUserInput" :isGameOver="isGameOver" :resetGame="resetGame" />

    <ErrorMessage :inputError="inputError" class="container" />

    <button class="mt-10 border-2 border-white-50 text-white-50 p-1" @click="test">Tryk på mig</button>
  </main>

</template>

<script>
import Description from './components/Description.vue';
import UserInput from './components/UserInput.vue';
import ErrorMessage from './components/ErrorMessage.vue';

import {ref} from 'vue';

export default {
  name: 'App',
  components: {
    Description,
    UserInput,
    ErrorMessage
  },
  setup(){
    const inputError = ref('testing');
    const isOpenTest = ref(false); 
    let isGameOver = false;
    const guessInputRef = ref(null);


    const handleUserInput = () => {
      console.log('user guess')
    }

    const resetGame = () => {
      console.log('game reset')
    }

    const test = () => {
      // console.log('first')
      inputError.value = 'new error';
    }

    return {inputError, isGameOver, handleUserInput, resetGame, guessInputRef, test};
  }
}
</script>
