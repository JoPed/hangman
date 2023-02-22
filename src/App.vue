<template>

  <Description />

  <main class="max-w-5xl mx-auto min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px] min-[1400px]:max-w-[1320px] mt-6 text-center pb-3 relative">
    <UserInput :inputError="inputError" :guessInputRef="guessInputRef" :handleUserInput="handleUserInput" :isGameOver="isGameOver" :resetGame="resetGame"  />
  </main>

</template>

<script>
import Description from './components/Description.vue';
import UserInput from './components/UserInput.vue';

import {ref} from 'vue';

export default {
  name: 'App',
  components: {
    Description,
    UserInput
  },
  setup(){
    let inputError = 'testing ';
    let isGameOver = false;
    const guessInputRef = ref(null);


    const handleUserInput = () => {
      console.log('user guess')
    }

    const resetGame = () => {
      console.log('game reset')
    }

    return {inputError, isGameOver, handleUserInput, resetGame, guessInputRef};
  }
}
</script>
