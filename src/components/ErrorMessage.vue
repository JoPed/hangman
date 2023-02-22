<template>
  <div
    class="
      block
      mt-3
      text-white-50 text-[clamp(.75rem,
      calc(.6rem
      +
      .5vw),
      1.5rem)]
    "
  >
    {{ inputError }}
  </div>
</template>

<script>
export default {
    props: ['inputError']
};
</script>