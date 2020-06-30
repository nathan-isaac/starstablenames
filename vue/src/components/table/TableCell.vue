<template>
  <td
    class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
  >
    <slot></slot>
  </td>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TableCell"
});
</script>
