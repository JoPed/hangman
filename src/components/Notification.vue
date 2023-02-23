<template>
  <div
    v-if="message != ''"
    class="w-[200px] p-5 fixed z-50 left-1/2 -top-4 -translate-x-1/2 translate-y-[15%]  rounded-b shadow-[1px_3px_5px_rgba(242,135,5,.5)] bg-orange-50 text-center text-white-50 whitespace-pre-line"
    :ref="(el) => {notificationRef = el;getRef(el);}"
    v-html="message"
  ></div>
</template>

<script>
import { onMounted, onUnmounted, ref} from "vue";
export default {
  props: ["message", "getRef"],
  setup(props) {
    const notificationRef = ref();
    let timeOut = null;

    onMounted(() => {

      if (props.message !== "") {
        
        // notificationRef.value.innerHtml = props.message;
        console.log(notificationRef.value.innerHtml)
        notificationRef.value.classList.add("active");

        // timeOut = setTimeout(() => {
        //   notificationRef.value.classList.remove("active");
        // }, 4000);
      }
    });

    onUnmounted(() => {
        clearTimeout(timeOut);
    });

    return {notificationRef};
  }
};
</script>

<style>
</style>