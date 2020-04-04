<template>
  <svg class="h-4 w-4" viewBox="0 0 24 24">
    <title v-if="title">{{ title }}</title>
    <desc v-if="description">{{ description }}</desc>
    <path :d="path" :fill="color" />
  </svg>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'SvgIcon',
  props: {
    path: String,
    color: {
      type: String,
      default: 'currentColor'
    },
    title: String,
    description: String
  }
})
</script>
