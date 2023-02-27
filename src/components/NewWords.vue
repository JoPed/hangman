<template>
  <h1
    class="text-center font-bold text-4xl my-2 font-BAHNSCHRIFT text-white-50"
  >
    Add new words
  </h1>
  <p class="text-center text-xl font-bold leading-8 p-3 text-white-50">
    Type any word or multiple words (e.g. chair or kitcken table) <br />
    When satisfied with the list of words, press save <br />
    To load your own (local) words, press load<br />
    To delete your own (local) words, press delete
  </p>

  <form>
    <label for="word" class="block w-3/12 text-center mx-auto text-white-50 mt-10 italic font-semibold">Type a word and press enter to confirm word</label>
    <input id="word" type="text" class="block w-2/12 border-2 border-solid border-black-50 mx-auto p-1 text-xl leading-6 text-white-50 bg-transparent appearance-none rounded-md mb-8 focus:outline-0 focus:shadow-md h-[35px] pl-1 " />
  </form>
</template>

<script>
export default {};
</script>

<style>
</style>