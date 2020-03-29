<template>
  <tr>
    <td
      class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
    >
      {{ name.fullName }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
    >
      <InputToggle :value="name.used" @input="toggleUsed"></InputToggle>
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
    >
      <InputToggle :value="name.liked" @input="toggleLiked"></InputToggle>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import InputToggle from './forms/InputToggle'

export default Vue.extend({
  name: 'NameRow',
  components: {
    InputToggle
  },
  props: {
    name: {}
  },
  methods: {
    toggleLiked() {
      this.$emit('toggle-like', this.name.uid);
    },
    toggleUsed() {
      this.$emit('toggle-used', this.name.uid);
    }
  }
})
</script>
