<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'FullWidthOnMobileContainer'
})
</script>
