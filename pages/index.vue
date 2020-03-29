<template>
  <div>
    <div class="flex flex-col">
      <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Used
                </th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Like/Dislike
                </th>
              </tr>
            </thead>
            <tbody>
              <NameRow
                v-for="(name, index) in names"
                :key="name.uid"
                :name="name"
                :class="{ 'bg-white': !(index % 2), 'bg-gray-50': index % 2 }"
                @toggle-like="onToggleLike"
                @toggle-used="onToggleUsed"
              ></NameRow>
            </tbody>
          </table>

          <div
            class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          >
            <div class="hidden sm:block">
              <p class="text-sm leading-5 text-gray-700">
                Showing
                <span class="font-medium">1</span>
                to
                <span class="font-medium">10</span>
                of
                <span class="font-medium">20</span>
                results
              </p>
            </div>
            <div class="flex-1 flex justify-between sm:justify-end">
              <a
                href="#"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                Previous
              </a>
              <a
                href="#"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import InputToggle from '../components/forms/InputToggle.vue'
import NameRow from '../components/NameRow.vue'
import { HttpNameListGateway, InMemoryLikesGateway, Names } from '~/src/Names'

export default Vue.extend({
  components: {
    InputToggle,
    NameRow
  },
  async asyncData(ctx: Context): Promise<object | void> | object | void {
    const names = Names.make()
    return await names.load()
  },
  data() {
    return {
      names: []
    }
  },
  methods: {
    onToggleLike(uid) {
      const names = Names.make()
      names.toggleLike(uid).then((viewModel) => {
        this.names = viewModel.names
      })
    },
    onToggleUsed(uid) {}
  }
})
</script>
