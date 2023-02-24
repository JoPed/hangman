<template >
  <Description />

  <main
    class="max-w-5xl mx-auto min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px] min-[1400px]:max-w-[1320px] mt-6 text-center pb-3 relative"
  >
    <UserInput
      v-model:inputError="inputError"
      :get-ref="
        (el) => {
          guessInputRef = el;
        }
      "
      :handleUserInput="handleUserInput"
      :isGameOver="isGameOver"
      :resetGame="resetGame"
    />

    <ErrorMessage :inputError="inputError" class="container" />
    <Word :word="word" :correctLetterRef="correctLetterRef" />

    <Canvas
      :get-ref="
        (el) => {
          canvasRef = el;
        }
      "
      :clearCanvasRef="clearCanvasRef"
    />

    <Notification
      :message="gameOverText"
      :get-ref="
        (el) => {
          notificationRef = el;
        }
      "
    />
  </main>
</template>

<script>
import Description from "./components/Description.vue";
import UserInput from "./components/UserInput.vue";
import ErrorMessage from "./components/ErrorMessage.vue";
import Word from "./components/Word.vue";
import Canvas from "./components/Canvas.vue";
import Notification from "./components/Notification.vue";
import { wordsToGuess } from "./components/scripts/WordsToGuess";
import { drawArray, clearCanvas } from "./components/scripts/DrawFunctions";

import { onMounted, ref, watch } from "vue";

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

    //* props for userinput and error message
    const inputError = ref("");
    let isGameOver = false;
    const guessInputRef = ref(null);

    //* props for word component 
    // A ref to every correct letter shown above the '-'
    const correctLetterRef= ref([]);
    
    const word = ref(
      wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]
    );

    //* props for notification component
    let gameOverText = "";
    const notificationRef = ref(null);

    //*props for canvas component
    const canvasRef = ref(null);
    const clearCanvasRef = ref(false);

    //*used for logic, inside App.vue
    const wrongGuesses = ref([]);
    let prevGuesses = [];
    const context = ref(null);
    let spacesInWord = 0;
    let playerScore = ref(0);
    let playerLives = ref(10);
    let wrongGuessesText = "Wrong guesses: ";
    let guess = '';

    const compKey = ref(0);

    const forceRerender = () => {
      compKey.value += 1;
    }
    

    const winCheck = () => {
      if(playerScore.value === word.value.length - spacesInWord){
        isGameOver = true;
        guessInputRef.value.disabled = true;
        gameOverText = "<span class='text-xl font-bold'>You rock</span><br><br>Click <span class='font-bold'>'Play again'</span> to start new game";
      }
    };

    const resetGame = () => {
      correctLetterRef.value.forEach(ref => ref.innerHTML = "");
      word.value = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
      wrongGuesses = [];
      isGameOver = false;
      playerScore.value = 0;
      prevGuesses = [];
      playerLives.value = 10;
      guessInputRef.value.disabled = false;
      guessInputRef.value.focus();
      clearCanvas();
    };

    const handleGuess = () => {

      guess = guessInputRef.value.value.toLowerCase();

      if(guess.length > 1){
        inputError.value = 'Only one letter at a time';
      }
      else if(guess.length === 0 || guess === ' ') {
        inputError.value = 'You have to type a letter between a-z';
      }

      // loop through the selected word
      for(let i = 0; i < word.value.length; i++){

        /* if the guessed letter matched at least one letter of the selected word
        and the guess hasn't been made previous */
        if(word.value[i] === guess && !prevGuesses.includes(guess)){

          // console.log(correctLetterRef.value[i]);
          correctLetterRef.value[i].innerHTML = guess;

          guessInputRef.value.value = "";

          console.log(guess);

          playerScore.value += 1;
          prevGuesses.push(guess);
        }
      }

      /*Check the selected word for the guessed value
      if not the guessed value is present in the selected word, value of checkwrongguess will be -1 */
      let checkWrongGuess = word.value.indexOf(guess);

      if(checkWrongGuess === -1 && !wrongGuesses.value.includes(' ' + guess)){
        wrongGuesses.value.push(' ' + guess);
        guessInputRef.value.value = '';
        playerLives.value -= 1;
        forceRerender();

        draw();
      }
      else if (wrongGuesses.value.includes(' ' + guess)){
        inputError.value = 'You already guessed that letter';
      }

    };

    const handleUserInput = (event) => {
      if (event.key === "Enter" || event.type === "click") {
        event.preventDefault();
        handleGuess();
      }
    };

    const draw = () => {
      drawArray[playerLives.value](canvasRef.value.getContext("2d"));
    };

    const drawWrongGuesses = () => {
      const wrongGuessesUppercase = wrongGuesses.value.map((w) => w.toUpperCase());

      context.value.fillText(wrongGuessesUppercase, 10, 70);
    };

    //*Set focus to the input when site in ready
    onMounted(() => {
      guessInputRef.value.focus();

      context.value = canvasRef.value.getContext("2d");
      context.value.fillStyle = "white";
      context.value.font = "30px Source Code Pro, sans-serif";
      context.value.fillText(wrongGuessesText, 10, 25);
    });

    watch(
      () => correctLetterRef.value,
      () => {
        guessInputRef.value.focus();
        spacesInWord = word.value.split(" ").length - 1;
      }
    );

    watch([playerScore, playerLives],() => {
        winCheck();

        if (playerLives.value <= 0) {
          gameOverText =
            "<span class='text-xl font-bold'>You lost</span>\nClick <span class='font-bold'>'Play again'</span> to start new game";
          isGameOver = true;
          guessInputRef.value.disabled = true;
        }

        console.log(playerScore.value);
        console.log(playerLives.value);
        
        drawWrongGuesses();
      }
    );

    const test = () => {
      console.log('test');
      wrongGuesses.value.push('a');
    }

    return {
      inputError,
      isGameOver,
      handleUserInput,
      resetGame,
      guessInputRef,
      correctLetterRef,
      word,
      canvasRef,
      clearCanvasRef,
      wrongGuesses,
      gameOverText,
      notificationRef,
      prevGuesses,
      compKey
    };
  },
};
</script>
