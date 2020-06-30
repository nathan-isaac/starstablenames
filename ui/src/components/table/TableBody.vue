<template>
  <tbody>
    <slot></slot>
  </tbody>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TableBody"
});
</script>
