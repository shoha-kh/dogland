<template>
  <Header />
  <div class="flex-auto h-full">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'
export default defineComponent({
  name: 'Home',
  components: {
    Header
  }
})
</script>

<style lang="postcss">
html,
body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: var(--main-font-size);
  background: var(--main-bg-color);
  min-height: 100%;
}
</style>
