<template>
  <div class="relative max-w-screen-lg my-0 pb-10 mx-auto">
    <div
      class="flex justify-between items-center pb-1 mb-4 border-b border-dashed border-purple-600"
    >
      <h1 class="text-lg font-medium capitalize">Favorites</h1>
    </div>

    <div v-if="favorites.length" class="grid grid-cols-4 gap-4">
      <div
        class="group relative"
        v-for="(image, index) in favorites"
        :key="String(index)"
      >
        <img class="w-full" :src="image" alt="" />

        <v-button
          size="mini"
          class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 cursor-pointer"
          @click="toggleFavorite(image)"
        >
          <svg-icon iconClass="favorite" class="text-red-600" />
        </v-button>
      </div>
    </div>

    <div v-else>Empty</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Favorites',
  setup: () => {
    const store = useStore()
    const favorites = computed(() => store.state.favorites)

    const toggleFavorite = image => {
      store.dispatch('toggleFavorite', image)
    }

    return { favorites, toggleFavorite }
  }
})
</script>
