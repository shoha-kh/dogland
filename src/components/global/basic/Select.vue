<template>
  <div class="relative" :style="`z-index: ${focused && 1}`" v-out="close">
    <div v-if="disabled" class="relative">
      <div
        class="block overflow-hidden overflow-ellipsis whitespace-nowrap w-full h-full py-3 pl-6 bg-gray-50 rounded-md cursor-default"
        :class="selectLabel === '' ? 'text-gray-400 pr-8' : 'pr-16'"
      >
        {{ selectLabel === '' ? label : selectLabel }}
      </div>
      <svg-icon
        class="absolute top-2/4 right-3 transform -translate-y-2/4 text-gray-400 cursor-default"
        icon-class="down"
        :line-icon="true"
      />
    </div>

    <div v-else class="relative">
      <div
        @click="focused = !focused"
        class="block overflow-hidden overflow-ellipsis whitespace-nowrap w-full h-full py-3 pl-6 bg-gray-100 rounded-md cursor-pointer"
        :class="
          `
            ${selectLabel === '' ? 'text-gray-400 pr-8' : 'pr-16'}
            ${validate && validate.$error ? 'border border-red-600' : ''}
          `
        "
      >
        {{ selectLabel === '' ? label : selectLabel }}
      </div>
      <svg-icon
        v-if="selectValue && clearable"
        @click="deselect"
        class="absolute top-2/4 right-9 transform -translate-y-2/4 cursor-pointer"
        icon-class="cross"
        :line-icon="true"
      />
      <svg-icon
        @click="focused = !focused"
        class="absolute top-2/4 right-3 transform -translate-y-2/4 cursor-pointer"
        :icon-class="focused ? 'up' : 'down'"
        :line-icon="true"
      />
    </div>

    <ul
      v-show="focused"
      class="absolute top-full w-full bg-white p-2 mt-1 rounded-md shadow-lg"
      :class="scrollable && 'max-h-52 overflow-x-hidden overflow-y-auto'"
    >
      <li class="mb-2" v-if="searchEnable">
        <input
          class="w-full px-2 py-1 border rounded-md outline-none"
          type="text"
          @input="searchAction"
          :placeholder="searchPlaceholder"
        />
      </li>

      <template v-if="selectOptionsClone.length">
        <li
          v-for="option in selectOptionsClone"
          :key="option.value"
          @click="selected(option)"
          class="block overflow-hidden overflow-ellipsis whitespace-nowrap w-full bg-gray-100 hover:bg-purple-400 hover:text-white px-2 py-1 mb-1 last:mb-0 rounded-md cursor-pointer"
        >
          {{ option.label }}
        </li>
      </template>

      <template v-else>
        <slot name="empty">Empty</slot>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watch } from 'vue'
import debounce from '@/utils/debounce'

export default defineComponent({
  name: 'v-select',
  props: {
    modelValue: { type: [String, Number], default: () => '' }, // default option value
    options: { type: Array, default: () => [] }, // options [{ label: 'String', value: 'String' }]
    label: { type: String, default: () => 'Select a ...' }, // default label
    search: { type: Function }, // Search Custom Function
    searchEnable: { type: Boolean, default: () => false }, // state of search input! Disabled by default
    searchPlaceholder: { type: String, default: () => 'Search' }, // Search input Placeholder

    clearable: { type: Boolean, default: () => false }, // Cross icon for deselect
    scrollable: { type: Boolean, default: () => false }, // Add scroll for option list
    disabled: { type: Boolean, default: () => false },
    validate: { type: Object, default: () => null }
  },
  emits: ['input', 'change', 'update:modelValue'],
  setup: (props, { emit }) => {
    const focused = ref(false)
    const selectLabel = ref('')
    const selectValue = computed({
      get: () => props.modelValue,
      set: value => {
        emit('input', value)
        emit('change', value)
        emit('update:modelValue', value)
      }
    })
    const test = toRefs(props).options
    const selectOptions: any = computed({
      get: () => props.options,
      set: value => {
        emit('input', value)
        emit('change', value)
      }
    })
    const selectOptionsClone: any = reactive([])
    selectOptions.value.forEach(option => selectOptionsClone.push(option))

    const selected = option => {
      selectValue.value = option.value
      selectLabel.value = option.label
      focused.value = false // hide dropdown
    }
    const deselect = () => {
      selectValue.value = ''
      selectLabel.value = ''
    }
    const close = () => {
      focused.value = false
    }

    const searchHandler = event => {
      if (props.search) {
        props.search(event.target.value)
        return
      }

      const target = String(event.target.value).toUpperCase()
      if (!target.length) {
        selectOptionsClone.length = 0
        selectOptions.value.forEach(option => selectOptionsClone.push(option))
        return
      }

      selectOptionsClone.length = 0
      selectOptions.value.forEach(
        option =>
          option.label.toUpperCase().search(target) !== -1 &&
          selectOptionsClone.push(option)
      )
    }
    const searchAction = debounce(searchHandler, 350)

    const selectDataHandler = () => {
      const index = selectOptionsClone.findIndex(
        (option: any) => option.value == selectValue.value
      )

      if (index == -1) {
        deselect()
        return
      }
      selectValue.value = selectOptionsClone[index].value
      selectLabel.value = selectOptionsClone[index].label
    }
    selectDataHandler()

    watch(
      () => selectValue.value,
      () => selectDataHandler()
    )

    watch(
      () => [...selectOptions.value],
      () => {
        selectOptionsClone.length = 0
        selectOptions.value.forEach(option => selectOptionsClone.push(option))
      }
    )

    return {
      test,

      focused,
      selectLabel,
      selectValue,
      selectOptions,
      selectOptionsClone,

      searchAction,

      selected,
      deselect,
      close
    }
  }
})
</script>
