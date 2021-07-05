<template>
  <div
    ref="scrollComponent"
    class="relative max-w-screen-lg my-0 pb-10 mx-auto"
  >
    <v-loading :visible="!dogBreedCards.length" />

    <div class="pb-1 mb-4 border-b border-dashed border-purple-600">
      <h1 class="text-lg font-medium">Dog Breed list</h1>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div v-for="(breed, index) in dogBreedCards" :key="index">
        <div class="flex flex-col justify-between bg-white p-2 rounded-lg">
          <img class="w-full mb-2 rounded-md" :src="breed.image" alt="" />
          <v-button
            class="w-full capitalize"
            size="small"
            type="primary"
            @click.prevent="$router.push(`/breed/${breed.breed}`)"
            >{{ breed.breed }}</v-button
          >
        </div>
      </div>
    </div>

    <div
      v-if="dogBreeds.length !== dogBreedCards.length"
      class="flex justify-center"
    >
      <v-button class="mt-8" type="success" size="small" @click="loadMoreBreeds"
        >Load more...</v-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref
} from 'vue'
import { useStore } from 'vuex'
import { DogBreed } from '@/store'
export default defineComponent({
  name: 'Main',
  setup: () => {
    const scrollComponent: any = ref(null)
    const store = useStore()
    const dogBreeds = computed(() => store.state.dogBreeds)
    const dogBreedCards: DogBreed[] = reactive([])

    const count = ref(0)
    const loadMoreBreeds = () => {
      if (dogBreeds.value.length === dogBreedCards.length) return

      dogBreedCards.length = 0
      count.value += 20
      for (const key in dogBreeds.value) {
        if (Number(key) >= count.value) break
        dogBreedCards.push(dogBreeds.value[key])
      }
    }

    store.dispatch('getDogBreeds').then(() => loadMoreBreeds())

    const handleScroll = () => {
      const element = scrollComponent.value
      if (
        Math.floor(element.getBoundingClientRect().bottom) <= window.innerHeight
      ) {
        loadMoreBreeds()
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return { scrollComponent, dogBreeds, dogBreedCards, loadMoreBreeds }
  }
})
</script>
