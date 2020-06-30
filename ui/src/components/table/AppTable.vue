<template>
  <div
    class="align-middle inline-block min-w-full overflow-hidden sm:rounded-lg"
  >
    <table class="min-w-full">
      <slot></slot>
    </table>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "AppTable"
});
</script>
