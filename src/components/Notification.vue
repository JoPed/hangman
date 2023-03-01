<template>
<!-- -translate-y-[100%] [&.active]: -->
  <div
    
    class="w-[200px] p-5 fixed z-50 left-1/2 -top-4 -translate-x-1/2 -translate-y-[100%] [&.active]:translate-y-0 transition-transform rounded-b shadow-[1px_3px_5px_rgba(255,255,255,.2)]  text-center text-white-50 whitespace-pre-line"
    :ref="(el) => {notificationRef = el;getRef(el);}"
    v-html="message.msg"
  ></div>
</template>

<script>
import { onUnmounted, ref, watch} from "vue";
export default {
  props: ["message", "getRef"],
  setup(props) {
    const notificationRef = ref();
    let timeOut = null;

    watch(() => props.message.msg , () => {

      if (props.message.msg !== "") {
        console.log(notificationRef.value);
        notificationRef.value.classList.add("active", props.message.class);

        timeOut = setTimeout(() => {
          notificationRef.value.classList.remove("active", props.message.class);
        }, 2000);
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