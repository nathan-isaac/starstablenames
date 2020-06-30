<template>
  <SvgIcon :path="mdiLoading" class="rotating"></SvgIcon>
</template>

<script>
import Vue from "vue";
import { mdiLoading } from "@mdi/js";
import SvgIcon from "@/components/icons/SvgIcon";

export default Vue.extend({
  name: "LoadingSpinner",
  components: {
    SvgIcon
  },
  data() {
    return {
      mdiLoading
    };
  }
});
</script>

<style scoped>
@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rotating {
  animation: rotating 0.5s linear infinite;
}
</style>
