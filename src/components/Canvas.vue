<template>
  <div class="w-full min-[768px]:w-10/12 min-[992px]:w-6/12 mx-auto">
    <canvas
      :ref="
        (el) => {
          canvasRef = el;
          getRef(el);
        }
      "
      class="mt-4 w-full h-[500px] border-2 border-dashed border-white-50"
    />
  </div>
</template>

<script setup>
import { onMounted, watch, defineProps, ref, watchEffect } from "vue";

const props = defineProps({
  getRef: {
    type: Function,
  },
  clearCanvasRef: {
    type: Boolean,
  },
});

const canvasRef = ref();

const setUpCanvas = (canvas) => {
  const { width, height } = canvas.getBoundingClientRect();

  const scale = window.devicePixelRatio;

  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(height * scale);
};

watch(
  () => props.clearCanvasRef,
  () => {
    const canvas = canvasRef.value;

    if (canvas) {
      setUpCanvas(canvas);
    }
  }
);

onMounted(() => {
  const canvas = canvasRef.value;

  if (canvas) {
    setUpCanvas(canvas);
  }
});
</script>