<template>
  <Description />

  <!--  -->

  <select
    class="my-4 bg-transparent border-2 border-solid rounded border-white-50 text-white-50"
    @input="handleGameModeChoise"
    v-if="showGameModes"
  >
    <option class="text-white-50 bg-black-50" selected disabled>
      Choose game mode
    </option>
    <option class="text-white-50 bg-black-50" value="predefined">
      Existing words (related to webdevelopment)
    </option>
    <option class="text-white-50 bg-black-50" value="yourWords">
      Your locally stored words
    </option>
  </select>

  <div>
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
      :wrongGuessesText="wrongGuessesText"
    />
  </div>

  <Notification
    :message="gameOverText"
    :get-ref="
      (el) => {
        notificationRef = el;
      }
    "
  />
</template>

<script>
import Description from "./Description.vue";
import UserInput from "./UserInput.vue";
import ErrorMessage from "./ErrorMessage.vue";
import Word from "./Word.vue";
import Canvas from "./Canvas.vue";
import Notification from "./Notification.vue";
import { wordsToGuess } from "./scripts/WordsToGuess";
import { drawArray, clearCanvas } from "./scripts/DrawFunctions";
import {onMounted, ref, watch } from "vue";

export default {
  name: "Game",
  components: {
    Description,
    UserInput,
    ErrorMessage,
    Word,
    Canvas,
    Notification,
  },
  setup() {
    //* props for userinput and error message
    const inputError = ref("");
    const isGameOver = ref(false);
    const guessInputRef = ref(null);

    //* props for word component
    // A ref to every correct letter shown above the '-'
    const correctLetterRef = ref([]);
    const userWords = ref([]);

    const word = ref("");

    //* props for notification component
    const gameOverText = ref({});
    const notificationRef = ref(null);

    //*props for canvas component
    const canvasRef = ref(null);
    const clearCanvasRef = ref(false);

    //*used for logic, inside App.vue
    const wrongGuesses = ref([]);
    const prevGuesses = ref([]);
    // used for prevGuesses before being push into prevGuesses array
    const emptyArr = [];
    const context = ref(null);
    const spacesInWord = ref(0);
    let playerScore = ref(0);
    let playerLives = ref(10);
    const wrongGuessesText = ref("Wrong guesses: ");
    let guess = "";
    const choiseMade = ref("");
    const showGameModes = ref(true);

    const winCheck = () => {
      if (playerScore.value === word.value.length - spacesInWord.value) {
        isGameOver.value = true;
        guessInputRef.value.disabled = true;
        gameOverText.value = {
          msg: "<span class='text-xl font-bold'>You rock</span><br><br>Click <span class='font-bold'>'Play again'</span> to start new game",
          class: "bg-green-700",
        };
      }
    };

    const resetGame = (newWord) => {

      if(newWord){
        selectWord();
      }
      correctLetterRef.value.forEach((ref) => (ref.innerHTML = ""));
      wrongGuesses.value.length = 0;
      isGameOver.value = false;
      playerScore.value = 0;
      prevGuesses.value.length = 0;
      emptyArr.length = 0;
      playerLives.value = 10;
      guessInputRef.value.disabled = false;
      guessInputRef.value.focus();
      gameOverText.value = "";
      clearCanvas();
    };

    const handleGuess = () => {
      guess = guessInputRef.value.value.toLowerCase();

      if (guess.length > 1) {
        inputError.value = "Only one letter at a time";
        return;
      } else if (guess.length === 0 || guess === " " || !isNaN(guess)) {
        inputError.value = "You have to type a letter between a-z";
        return;
      }

      // loop through the selected word
      for (let i = 0; i < word.value.length; i++) {
        /* if the guessed letter matched at least one letter of the selected word
        and the guess hasn't been made previous */
        if (word.value[i] === guess && !prevGuesses.value.includes(guess)) {
          correctLetterRef.value[i].innerHTML = guess;

          guessInputRef.value.value = "";

          playerScore.value += 1;
          emptyArr.push(guess);
        } else if (prevGuesses.value.includes(guess)) {
          inputError.value = "You already guessed that letter";
        }
      }

      showGameModes.value = false;
      prevGuesses.value.push(...emptyArr);

      /*Check the selected word for the guessed value
      if not the guessed value is present in the selected word, value of checkwrongguess will be -1 */
      let checkWrongGuess = word.value.indexOf(guess);

      if (checkWrongGuess === -1 && !wrongGuesses.value.includes(" " + guess)) {
        wrongGuesses.value.push(" " + guess);
        guessInputRef.value.value = "";
        playerLives.value -= 1;

        draw();
      } else if (wrongGuesses.value.includes(" " + guess)) {
        inputError.value = "You already guessed that letter";
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
      const wrongGuessesUppercase = wrongGuesses.value.map((w) =>
        w.toUpperCase()
      );

      context.value.fillText(wrongGuessesUppercase, 10, 70);
    };

    // const drawWrongGuessesText = () => {
    //   context.value = canvasRef.value.getContext("2d");

    //   context.value.fillStyle = "white";
    //   context.value.font = "30px Source Code Pro, sans-serif";
    //   context.value.fillText(wrongGuessesText.value, 10, 25);
    //   console.log(context.value)
    // };

    const handleGameModeChoise = (e) => {
      choiseMade.value = e.target.value;
    };

    const selectWord = () => {
      if (choiseMade.value === "yourWords" && localStorage.getItem("words")) {
        gameOverText.value = {
          msg: "Your words was found, and one has been selected.\nStart game, when you are ready",
          class: "bg-green-700",
        };
        // get the words for localstorage
        userWords.value.push(...JSON.parse(localStorage.getItem('words')));
        
        // get a random word from localstorage and use that as selected word
        word.value = userWords.value[Math.floor(Math.random() * userWords.value.length)];

      } else if (choiseMade.value === "predefined") {
        gameOverText.value = {
          msg: "One of the predefined webrelated words will be selected.\nStart game, when you are ready",
          class: "bg-green-700",
        };
        word.value =
          wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
          
      } else if (!localStorage.getItem("words")) {
        gameOverText.value = {
          msg: "Your words was not found. Try making/saving new words on the New Words page.\nStart game, when you are ready",
          class: "bg-red-700",
        };
        choiseMade.value = "";
      }
    };

    onMounted(() => {
      context.value = canvasRef.value.getContext('2d');
    }) 

    watch(
      () => choiseMade.value,
      () => {
        resetGame(false);
        selectWord();
      }
    );

    watch(() => guessInputRef.value, () => {
        spacesInWord.value = word.value.split(" ").length - 1;
    })

    // watching for chages of the word ref, and then updating the spacesinword variable when ever the word is changed
    watch(
      () => word.value,
      () => {
        if (word.value) {
          spacesInWord.value = word.value.split(" ").length - 1;
        }
      }
    );

    // newLives/newScore is a parameter (could call it whatever) i automaticly get access to when watching a certain value
    watch([playerScore, playerLives], ([newScore, newLives]) => {
      winCheck();

      if (newLives <= 0) {
        gameOverText.value = {
          msg: "<span class='text-xl font-bold'>You lost</span>\nClick <span class='font-bold'>'Play again'</span> to start new game",
          class: "bg-red-700",
        };
        isGameOver.value = true;
        guessInputRef.value.disabled = true;
      }

      if(context.value) {drawWrongGuesses();}
      
    });

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
      choiseMade,
      handleGameModeChoise,
      showGameModes,
      wrongGuessesText
    };
  },
};
</script>

<style>
</style>