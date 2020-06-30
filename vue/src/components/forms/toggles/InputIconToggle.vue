<template>
  <span
    class="relative inline-block flex-shrink-0 cursor-pointer transition-colors focus:outline-none focus:shadow-outline"
    role="checkbox"
    tabindex="0"
    @click="toggle()"
    @keydown.space.prevent="toggle()"
    :aria-checked="value.toString()"
  >
    <span aria-hidden="true" class="">
      <SvgIcon
        class="h-5 w-5"
        :class="{ 'text-gray-400': !value, 'text-red-600': value }"
        :path="iconPath"
      ></SvgIcon>
    </span>
  </span>
</template>

<script>
import Vue from "vue";
import SvgIcon from "@/components/icons/SvgIcon";

export default Vue.extend({
  name: "InputIconToggle",
  components: {
    SvgIcon
  },
  props: {
    value: {},
    startIcon: {
      default() {
        return mdiCircle;
      }
    },
    endIcon: {
      default() {
        return mdiCircle;
      }
    }
  },
  computed: {
    iconPath() {
      return this.value ? this.endIcon : this.startIcon;
    }
  },
  methods: {
    toggle() {
      this.$emit("input", !this.value);
    }
  }
});
</script>
