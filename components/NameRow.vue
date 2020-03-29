<template>
  <tr>
    <td
      class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
    >
      {{ name.first }} {{ name.last }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
    >
      <InputToggle v-model="used"></InputToggle>
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
    >
      <InputToggle v-model="liked"></InputToggle>
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
  data() {
    return {
      used: false,
      liked: false,
    }
  },
  methods: {
    toggleLiked() {
      this.liked = !this.liked
    },
    toggleUsed() {
      this.used = !this.used
    }
  }
})
</script>
