<template>
  <div class="relative max-w-screen-lg my-0 pb-10 mx-auto">
    <v-loading :visible="!dogBreedImages.length" />

    <div
      class="flex justify-between items-center pb-1 mb-4 border-b border-dashed border-purple-600"
    >
      <h1 class="text-lg font-medium capitalize">Breed: {{ breed }}</h1>

      <v-select
        v-if="subBreedOptions.length > 1"
        label="Select a dog sub-breed"
        v-model="subBreed"
        :options="subBreedOptions"
      />
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div
        class="group relative cursor-pointer"
        v-for="(image, index) in dogBreedImages"
        :key="index"
        @click="toggleFavorite(image)"
      >
        <img class="w-full" :src="image.url" alt="" />

        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100">
          <svg-icon
            iconClass="favorite"
            :class="image.favorite ? 'text-red-600' : 'text-white'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DogBreedImages } from '@/store'
import { useStore } from 'vuex'
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'DogBreed',
  setup: () => {
    const store = useStore()
    const router = useRouter()
    const breed = router.currentRoute.value.params.breed
    const subBreed = ref('')
    const subBreedOptions = reactive([{ label: 'All', value: 'all' }])
    const dogBreedsList = computed(() => store.state.dogBreedsList)

    const dogBreeds = computed(() => store.state.dogBreeds)
    const dogBreedImages: DogBreedImages[] = reactive([])
    const updateDogBreedImages = () => {
      const dogBreedsIdx = dogBreeds.value.findIndex(i => i.breed === breed)
      if (dogBreedsIdx === -1) return
      dogBreedImages.length = 0
      dogBreeds.value[dogBreedsIdx].images.forEach(e => dogBreedImages.push(e))
    }

    store.dispatch('getDogBreeds').then(() =>
      Object.keys(dogBreedsList.value[breed.toString()]).forEach(elem =>
        subBreedOptions.push({
          label:
            dogBreedsList.value[breed.toString()][elem]
              .charAt(0)
              .toUpperCase() +
            dogBreedsList.value[breed.toString()][elem].slice(1),
          value: dogBreedsList.value[breed.toString()][elem]
        })
      )
    )
    store.dispatch('getDogBreed', { breed }).then(() => updateDogBreedImages())

    const toggleFavorite = image => {
      store.dispatch('toggleFavorite', image.url)
      store.dispatch('updateDogBreedImage', { breed: breed, image: image })

      updateDogBreedImages()
    }

    watch(
      () => subBreed.value,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (newVal, oldVal) => {
        const value = { breed, subBreed: '' }
        if (newVal !== 'all') value.subBreed = newVal
        store.dispatch('getDogBreed', value).then(() => updateDogBreedImages())
      }
    )

    return { breed, subBreed, subBreedOptions, dogBreedImages, toggleFavorite }
  }
})
</script>
