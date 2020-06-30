<template>
  <div class="bg-white overflow-hidden shadow sm:rounded-lg">
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "EdgeToEdgeCard"
});
</script>
