<template>
  <span
    :class="{ 'bg-gray-200': !value, 'bg-indigo-600': value }"
    class="relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline"
    role="checkbox"
    tabindex="0"
    @click="toggle()"
    @keydown.space.prevent="toggle()"
    :aria-checked="value.toString()"
  >
    <span
      aria-hidden="true"
      :class="{ 'translate-x-5': value, 'translate-x-0': !value }"
      class="relative inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"
    >
      <span
        :class="{
          'opacity-0 ease-out duration-100': value,
          'opacity-100 ease-in duration-200': !value
        }"
        class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
      >
        <SvgIcon class="h-3 w-3 text-gray-400" :path="startIcon"> </SvgIcon>
      </span>
      <span
        :class="{
          'opacity-100 ease-in duration-200': value,
          'opacity-0 ease-out duration-100': !value
        }"
        class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
      >
        <SvgIcon class="h-3 w-3 text-gray-400" :path="endIcon"> </SvgIcon>
      </span>
    </span>
  </span>
</template>

<script>
import Vue from 'vue'
import { mdiClose, mdiCheck } from '@mdi/js'
import SvgIcon from '~/components/icons/SvgIcon'

export default Vue.extend({
  name: 'InputToggleWithIcon',
  components: {
    SvgIcon
  },
  props: {
    value: {
      type: Boolean
    },
    startIcon: {
      default() {
        return mdiClose
      }
    },
    endIcon: {
      default() {
        return mdiCheck
      }
    }
  },
  methods: {
    toggle() {
      this.$emit('input', !this.value)
    }
  }
})
</script>
