<template>
  <header
    class="flex justify-center items-center mb-4 bg-white"
    style="min-height: 60px;"
  >
    <nav>
      <ul class="flex flex-wrap m-0 p-0">
        <li class="mr-2">
          <router-link
            class="py-2 px-4 rounded-md"
            :class="
              $router.currentRoute.value.path === '/'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-50'
            "
            to="/"
            >Main</router-link
          >
        </li>
        <li>
          <router-link
            class="py-2 px-4 rounded-md"
            :class="
              $router.currentRoute.value.path === '/favorites'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-50'
            "
            to="/favorites"
            >Favorites</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Header'
})
</script>
