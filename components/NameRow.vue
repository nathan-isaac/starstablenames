<template>
  <tr>
    <td
      class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
    >
      <div class="flex">
        <InputToggle :value="name.liked" @input="toggleLiked"></InputToggle>
        <span class="inline-block ml-5 text-2xl">
          {{ name.fullName }}
        </span>
      </div>
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
    >
      <div class="flex justify-center">
        <InputToggle :value="name.used" @input="toggleUsed"></InputToggle>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import InputToggle from '@/components/forms/InputToggle.vue'

export default Vue.extend({
  name: 'NameRow',
  components: {
    InputToggle
  },
  props: {
    name: {
      type: Object
    }
  },
  methods: {
    toggleLiked() {
      this.$emit('toggle-like', this.name.uid)
    },
    toggleUsed() {
      this.$emit('toggle-used', this.name.uid)
    }
  }
})
</script>
