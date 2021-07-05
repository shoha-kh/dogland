<template>
  <button
    :class="
      `btn btn--${type ? type : 'default'} ${size &&
        'btn--' + size} ${(loading || disabled) && 'disabled'}`
    "
    :disabled="loading || disabled"
  >
    <slot v-if="!loading"></slot>
    <template v-else>
      <div class="flex justify-center items-center">
        <span class="relative w-5 h-5 mr-2">
          <v-loading
            :visible="loading"
            size="w-5 h-5"
            background="bg-transparent"
          ></v-loading>
        </span>
        <span>
          Loading
        </span>
      </div>
    </template>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'v-button',
  props: {
    type: { type: String, default: () => '' }, // default, primary, success, info, warning, danger
    size: { type: String, default: () => '' },

    loading: { type: Boolean, default: () => false },
    disabled: { type: Boolean, default: () => false }
  }
})

//! Styles in assets/styles/global/basic/button.css
</script>
