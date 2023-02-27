<template>
  <header class="container bg-[#0f0e11] h-[100px] sticky top-0 z-50 mx-auto">
    <nav class="container h-full flex justify-center items-center mx-auto">
      <ul class="list-none flex" :class="isMenuOpen ? 'active' : ''">
        <li @click="closeMenu" class="p-[15px] select-none">
          <router-link
            :to="{ name: 'Game' }"
            class="cursor-pointer no-underline font-semibold text-white-50 text-xl [&.active]:font-bold [&.active]:pb-3 [&.active]:border-b-2 [&.active]:border-solid "
            >Home/Game</router-link
          >
        </li>
        <li @click="closeMenu" class="p-[15px] select-none">
          <router-link :to="{ name: 'Words' }" class="cursor-pointer no-underline font-semibold text-white-50 text-xl [&.active]:font-bold [&.active]:pb-3 [&.active]:border-b-2 [&.active]:border-solid">New words</router-link>
        </li>
      </ul>

      <!-- <div id="hamburger" onClick={ handleClickHamburgerMenu }>
          { isMenuOpen ? <FaTimes size={ 30 } /> : <FaBars size={ 30 } /> }
        </div> -->
    </nav>
  </header>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const isMenuOpen = ref(false);

    const handleClickHamburgerMenu = () => (isMenuOpen.value = !isMenuOpen);

    const closeMenu = () => (isMenuOpen.value = false);

    return { handleClickHamburgerMenu, closeMenu, isMenuOpen };
  },
};
</script>

<style>
</style>