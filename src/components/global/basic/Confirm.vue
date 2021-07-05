<template>
  <v-modal
    ref="modal"
    size="max-w-xs"
    :default-header="false"
    :default-footer="false"
  >
    <template #default>
      <div class="p-6">
        <div class="mb-6">
          <span v-html="description"></span>
        </div>
        <div class="flex justify-between">
          <v-button @click="cancel" size="small">{{ cencelLabel }}</v-button>
          <v-button
            @click="confirm"
            :type="confirmTypeHandler(type)"
            size="small"
            >{{ confirmLabel }}</v-button
          >
        </div>
      </div>
    </template>
  </v-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'v-confirm',
  props: {
    type: { type: String, default: () => 'default' },
    confirmLabel: { type: String, default: () => 'Confirm' },
    cencelLabel: { type: String, default: () => 'Cencel' },
    description: {
      type: String,
      default: () => 'Are you sure you want to do this?'
    }
  },
  emits: ['input', 'change', 'confirm'],
  setup: () => {
    const resolvePromise: any = ref(undefined)
    const rejectPromise: any = ref(undefined)
    const modal = ref()

    const confirmTypeHandler = type => {
      if (type === 'delete') return 'danger'
      else return 'primary'
    }

    const show = () => {
      modal.value.show()

      return new Promise((resolve, reject) => {
        resolvePromise.value = resolve
        rejectPromise.value = reject
      })
    }

    const confirm = () => {
      modal.value.close()
      resolvePromise.value(true)
    }
    const cancel = () => {
      modal.value.close()
      resolvePromise.value(false)
    }

    return { modal, show, close, confirm, cancel, confirmTypeHandler }
  }
})
</script>
