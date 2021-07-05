<template>
  <div
    v-show="isVisible"
    class="relative flex items-center py-2 px-6 mb-4 text-xs rounded-md"
    :class="`
      ${dark ? style.dark.color : style.light.color}
      ${dark ? style.dark.bg : style.light.bg}
    `"
  >
    <div
      class="flex justify-center items-center w-5 h-5 mr-2 rounded-full"
      :class="!dark ? style.dark.bg : style.light.bg"
    >
      <svg-icon
        v-if="showIcon"
        :class="!dark ? 'text-white' : style.light.color"
        :icon-class="icon"
        :lineIcon="type === 'success' || type === 'error' ? true : false"
        style="width:12px;heigth;12px;"
      />
    </div>
    <div class="w-10/12 md:w-11/12">
      <div v-if="description" class="font-medium text-sm">{{ title }}</div>
      <span>{{ description ? description : title }}</span>
    </div>
    <svg-icon
      class="absolute top-2.5 right-2.5 cursor-pointer text-gray-500"
      icon-class="cross"
      @click="close"
      :line-icon="true"
      style="width:12px;heigth;12px;"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"

export default defineComponent({
  name: "v-alert",
  props: {
    visible: { type: Boolean, default: () => true }, // If :visible="false" alert will be hidden
    type: { type: String, default: () => "" }, // types: (success, info, warning, error)
    title: { type: String, default: () => "" },
    description: { type: String, default: () => "" }, // If added desc title will change font-size
    dark: { type: Boolean, default: () => false }, // If you use this color background will darken
    showIcon: { type: Boolean, default: () => false }, // Shows icons
  },
  setup: (props) => {
    const isVisible = ref(props.visible)
    const icon = ref("")
    const style = reactive({
      light: {
        color: "",
        bg: "",
      },
      dark: {
        color: "",
        bg: "",
      },
    })

    switch (props.type) {
      case "success":
        icon.value = "check"

        style.light.color = "text-green-900"
        style.light.bg = "bg-green-100"
        style.dark.bg = "bg-green-500"
        break

      case "info":
        icon.value = "info"

        style.light.color = "text-gray-900"
        style.light.bg = "bg-gray-100"
        style.dark.bg = "bg-gray-500"
        break

      case "warning":
        icon.value = "warning-sign"

        style.light.color = "text-yellow-900"
        style.light.bg = "bg-yellow-100"
        style.dark.bg = "bg-yellow-500"
        break

      case "error":
        icon.value = "cross"

        style.light.color = "text-red-900"
        style.light.bg = "bg-red-100"
        style.dark.bg = "bg-red-500"
        break

      default:
        style.dark.bg = "bg-gray-400"
        style.light.color = "text-black"
        style.light.bg = "bg-gray-50"
        break
    }

    props.dark ? (style.dark.color = "text-white") : ""

    const show = () => {
      isVisible.value = true
    }
    const close = () => {
      isVisible.value = false
    }

    return { style, icon, isVisible, show, close }
  },
})
</script>
