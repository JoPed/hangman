<template>
  <Description />

  <main
    class="max-w-5xl mx-auto min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px] min-[1400px]:max-w-[1320px] mt-6 text-center pb-3 relative"
  >
    <UserInput
      v-model:inputError="inputError"
      :guessInputRef="guessInputRef"
      :handleUserInput="handleUserInput"
      :isGameOver="isGameOver"
      :resetGame="resetGame"
    />

    <ErrorMessage :inputError="inputError" class="container" />
    <Word :word="word" :setCorrectLetterRef="setCorrectLetterRef" />

    <Canvas :get-ref="(el) => {canvasRef = el}" :clearCanvasRef="clearCanvasRef" />

    <Notification :message="gameOverText" :get-ref="(el) => {notificationRef = el}" /> 

      
    
  </main>
</template>

<script>
import Description from "./components/Description.vue";
import UserInput from "./components/UserInput.vue";
import ErrorMessage from "./components/ErrorMessage.vue";
import Word from "./components/Word.vue";
import Canvas from './components/Canvas.vue';
import Notification from './components/Notification.vue';
import { wordsToGuess } from "./components/WordsToGuess";

import { ref } from "vue";

export default {
  name: "App",
  components: {
    Description,
    UserInput,
    ErrorMessage,
    Word,
    Canvas,
    Notification
  },
  setup() {
    
    function useArrayRef() {
      const refs = [];
      return [refs, (el) => el && refs.push(el)];
    }

    const inputError = ref("");
    let isGameOver = false;
    const guessInputRef = ref(null);

    // A ref to every correct letter shown above the '-'
    const [correctLetterRef, setCorrectLetterRef] = useArrayRef();
    const word = ref(
      wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]
    );

    let gameOverText = "<span>you lost</span><br><br>Click <span>'Play again'</span> to start new game";
    const notificationRef = ref(null);

    const canvasRef = ref(null);
    const clearCanvasRef = ref(false);
    const wrongGuesses = [];

    const handleUserInput = () => {
      console.log("user guess");
    };

    const resetGame = () => {
      console.log("game reset");
    };

    return {
      inputError,
      isGameOver,
      handleUserInput,
      resetGame,
      guessInputRef,
      setCorrectLetterRef,
      word,
      canvasRef,
      clearCanvasRef,
      wrongGuesses,
      gameOverText,
      notificationRef
    };
  },
};
</script>
