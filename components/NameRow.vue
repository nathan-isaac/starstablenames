<template>
  <tr>
    <td
      class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
    >
      {{ fullName }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
    >
      <InputToggle :value="used" @input="toggleUsed"></InputToggle>
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
    >
      <InputToggle :value="liked" @input="toggleLiked"></InputToggle>
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
    fullName: {
      type: String
    },
    uid: {
      type: String
    },
    liked: {
      type: Boolean
    },
    used: {
      type: Boolean
    }
  },
  methods: {
    toggleLiked() {
      this.$emit('change', {
        uid: this.uid,
        liked: !this.liked,
        used: this.used
      })
    },
    toggleUsed() {
      this.$emit('change', {
        uid: this.uid,
        liked: this.liked,
        used: !this.used
      })
    }
  }
})
</script>
