import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import axios from 'axios'
const axiosConfig = {
  headers: { "Content-Type": "application/json" }
}

export interface DogBreedImages {
  url: string
  favorite: boolean
}
export interface DogBreed {
  breed: string
  subBreed?: string[]
  image?: string
  images?: DogBreedImages[]
}
export interface State {
  dogBreeds: DogBreed[]
  dogBreedsList: object
  favorites: string[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    dogBreeds: [],
    dogBreedsList: {},
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]')
  },

  mutations: {
    addDogBreed (state, payload: DogBreed) {
      const breedIndex = state.dogBreeds.findIndex(i => i.breed === payload.breed)
      if (breedIndex !== -1) {
        state.dogBreeds[breedIndex].breed = payload.breed
        payload.subBreed && (state.dogBreeds[breedIndex].subBreed = payload.subBreed)
        payload.image && (state.dogBreeds[breedIndex].image = payload.image)
        payload.images && (state.dogBreeds[breedIndex].images = payload.images)
        return
      }
      state.dogBreeds.push(payload)
    },
    addDogBreedsList (state, breedsList) {
      state.dogBreedsList = breedsList
    },

    updateDogBreedImage (state, payload: { breed: string; image: DogBreedImages }) {
      const breedIndex = state.dogBreeds.findIndex(i => i.breed === payload.breed)
      if (breedIndex === -1) return

      const images = (state.dogBreeds[breedIndex].images || [])
      const imageIndex = images.findIndex(i => i.url === payload.image.url)
      if (imageIndex === -1) return

      const checkFavorite = state.favorites.indexOf(payload.image.url)
      images[imageIndex].url = payload.image.url
      images[imageIndex].favorite = checkFavorite !== -1
    },
    toggleFavorite (state, imageUrl) {
      if (state.favorites.indexOf(imageUrl) !== -1) {
        state.favorites.splice(state.favorites.indexOf(imageUrl), 1)
        localStorage.setItem('favorites', JSON.stringify(state.favorites))
      } else {
        state.favorites.push(imageUrl)
      }

      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
  },

  actions: {
    updateDogBreedImage ({ commit }, { breed, image }) {
      commit('updateDogBreedImage', { breed, image })
    },
    getDogBreedRandomImage (_, breed) {
      return new Promise((resolve, reject) => {
        axios
          .get(`breed/${breed}/images/random`, axiosConfig)
          .then(res => {
            if (res.status === 200) {
              resolve(res.data.message)
            }
          })
          .catch(err => {
            console.log('-err-', err);
            reject(err)
          })
      })
    },

    getDogBreed ({ commit }, { breed, subBreed }) {
      let url = `breed/${breed}/images`
      if (subBreed)
        url = `breed/${breed}/${subBreed}/images`

      return new Promise((resolve, reject) => {
        axios
          .get(url, axiosConfig)
          .then(res => {
            if (res.status !== 200) return

            const images = res.data.message.map(imageUrl => {
              const result = {
                url: imageUrl,
                favorite: false
              }

              const checkFavorite = this.state.favorites.indexOf(imageUrl)
              if (checkFavorite !== -1) result.favorite = true

              return result
            })
            commit('addDogBreed', { breed, images })
            resolve(res)
          })
          .catch(err => {
            console.log('-err-', err);
            reject(err)
          })
      })
    },

    getDogBreeds ({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("breeds/list/all", axiosConfig)
          .then(res => {
            if (res.status !== 200) return
            // console.log('-breeds-', res);

            const breedsList = res.data.message
            commit('addDogBreedsList', breedsList)
            Object.keys(breedsList).forEach(async (breed, index) => {
              await this.dispatch('getDogBreedRandomImage', breed).then((image) => {
                commit('addDogBreed', { breed, image })
              })

              if (Object.keys(breedsList).length == (index + 1))
                resolve(res)
            })
          })
          .catch(err => {
            console.log('-err-', err);
            reject(err)
          })
      })
    },

    toggleFavorite ({ commit }, imageUrl) {
      commit('toggleFavorite', imageUrl)
    },
  },
})

export function useStore () {
  return baseUseStore(key)
}