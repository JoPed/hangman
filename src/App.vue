<template >
  <Navigation />
  <main class="container w-[calc(100vw-23px)] relative pb-3 mx-auto mt-6 text-center">
    <router-view />
  </main>
</template>

<script>
import Navigation from "./components/Navigation.vue";
export default {
  name: "App",
  components: {
    Navigation,
  },
};
</script>
