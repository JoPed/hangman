<template >
  <Navigation />
  <main
    class="container w-[calc(100vw-23px)] relative pb-3 mx-auto mt-6 text-center"
  >
    <router-view />
  </main>
</template>

<script>
import Navigation from "./components/Navigation.vue";

import { useMobileDetection } from "vue3-mobile-detection";
import { onMounted } from 'vue';
export default {
  name: "App",
  components: {
    Navigation,
  },
  setup() {
    const { isMobile } = useMobileDetection();

    onMounted(() => {
      if(isMobile()){
        document.querySelector('#app').style.width = '100%';
      }
      else {
        document.querySelector('#app').style.width = 'calc(100vw - 23px)';
      }
    }) 

    return { isMobile };
  },
};
</script>
