<template>
  <div
    v-if="isVisible"
    class="modal p-6 fixed inset-0"
    :class="`${size === 'max-w-full' ? 'pt-6' : 'pt-14'}`"
    style="z-index: 999;"
  >
    <div
      v-if="closeWithBackground"
      @click="close"
      class="absolute inset-0 bg-black bg-opacity-20"
    ></div>
    <div v-else class="absolute inset-0 bg-black bg-opacity-20"></div>
    <div
      class="modal-wrap relative flex flex-col w-full mx-auto max-h-full bg-white rounded-md"
      :class="`${size} ${propLoading && 'overflow-hidden'}`"
    >
      <v-loading :visible="propLoading"></v-loading>

      <header
        v-if="defaultHeader"
        class="modal-header flex p-4 bg-gray-100 rounded-t-md"
        :class="title ? 'justify-between' : 'justify-end'"
      >
        <h4 v-if="title">{{ title }}</h4>
        <button class="modal-header__close" @click="close">
          <svg-icon class="w-5 h-5" icon-class="cross" :line-icon="true" />
        </button>
      </header>

      <slot name="header"></slot>

      <slot name="default"></slot>

      <slot name="footer"></slot>

      <footer
        v-if="defaultFooter"
        class="modal-footer flex justify-end p-4 bg-gray-100 rounded-b-md"
      >
        <v-button size="small" @click="close">
          Close
        </v-button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'v-modal',
  props: {
    size: { type: String, default: 'max-w-4xl' }, // TailwindCss max-width system 'max-w-*'
    title: { type: String, default: '' },
    defaultHeader: { type: Boolean, default: true },
    defaultFooter: { type: Boolean, default: true },
    closeWithBackground: { type: Boolean, default: false },

    loading: { type: Boolean, default: () => false },
    modelClose: { type: Function, default: () => ({}) }
  },
  emits: ['v-loading'],
  setup: (props, { emit }) => {
    const isVisible = ref(false)
    const propLoading = computed({
      get: () => props.loading,
      set: value => emit('v-loading', value)
    })

    const show = () => {
      isVisible.value = true
    }
    const close = () => {
      if (!isVisible.value) return
      isVisible.value = false
      propLoading.value = false
      props.modelClose()
    }

    return { isVisible, propLoading, show, close }
  }
})
</script>

<style lang="postcss">
.modal {
  &-wrap {
    &.max-w-full {
      @apply h-full;
    }
    main {
      @apply flex-grow overflow-x-hidden overflow-y-auto;
    }
  }
  &-header,
  &-footer {
    @apply flex-shrink;
  }
}
</style>
