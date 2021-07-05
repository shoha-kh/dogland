<template>
  <div
    v-show="visible"
    class="absolute top-0 left-0 right-0 bottom-0 m-0 transition-opacity delay-300 z-50"
  >
    <div
      class="absolute top-0 left-0 right-0 bottom-0 opacity-90"
      :class="background"
    ></div>
    <div
      class="loading-spinner absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4"
    >
      <svg viewBox="25 25 50 50" class="circular" :class="size">
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          class="path stroke-current stroke-2 text-gray-400"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'v-loading',
  props: {
    size: { type: String, default: () => 'w-11 h-11' },
    visible: { type: Boolean, default: () => false },
    background: { type: String, default: () => 'bg-white' }
  },
  setup: () => {
    const style = ref('')
    return { style }
  }
})
</script>

<style lang="postcss">
.loading {
  &-spinner {
    .circular {
      animation: loading-rotate 2s linear infinite;
    }
    .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-linecap: round;
    }
  }
}

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
