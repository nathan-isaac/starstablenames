<template>
  <div
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
  >
    <div class="hidden sm:block">
      <p class="text-sm leading-5 text-gray-700">
        Showing
        <span class="font-medium">{{ resultsStart }}</span>
        to
        <span class="font-medium">{{ resultsEnd }}</span>
        of
        <span class="font-medium">{{ resultsTotal }}</span>
        results
      </p>
    </div>
    <div class="flex-1 flex justify-between sm:justify-end">
      <a
        href="#"
        @click.prevent="$emit('previous')"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      >
        Previous
      </a>
      <a
        href="#"
        @click.prevent="$emit('next')"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      >
        Next
      </a>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "SimpleCardPagination",
  props: {
    resultsStart: {
      type: Number
    },
    resultsEnd: {
      type: Number
    },
    resultsTotal: {
      type: Number
    }
  }
});
</script>
