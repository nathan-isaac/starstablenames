<template>
  <thead>
    <slot></slot>
  </thead>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'TableHead'
})
</script>
