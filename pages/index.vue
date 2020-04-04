<template>
  <FullWidthOnMobileContainer>
    <EdgeToEdgeCard>
      <AppTable>
        <TableHead>
          <TableRow>
            <TableHeadCell>
              Name
            </TableHeadCell>
            <TableHeadCell class="text-center">
              Used
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            v-for="(name, index) in names"
            :key="name.uid"
            :class="{ 'bg-white': !(index % 2), 'bg-gray-50': index % 2 }"
          >
            <TableCell>
              <div class="flex">
                <InputIconToggle
                  :start-icon="mdiHeartOutline"
                  :end-icon="mdiHeart"
                  :value="name.liked"
                  @input="onToggleLike(name.uid)"
                ></InputIconToggle>
                <span class="inline-block ml-5 text-2xl">
                  {{ name.fullName }}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div class="flex justify-center">
                <InputToggleWithIcon
                  :value="name.used"
                  @input="onToggleUsed(name.uid)"
                ></InputToggleWithIcon>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </AppTable>

      <SimpleCardPagination
        :results-start="pagination.offsetStart"
        :results-end="pagination.offsetEnd"
        :results-total="pagination.totalPages"
        @previous="previousPage"
        @next="nextPage"
      >
      </SimpleCardPagination>
    </EdgeToEdgeCard>
  </FullWidthOnMobileContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiHeartOutline, mdiHeart } from '@mdi/js'
import AppTable from '~/components/table/AppTable.vue'
import { Names } from '~/src/Names'
import { Name } from '~/src/gateways/names'
import TableHead from '~/components/table/TableHead.vue'
import TableRow from '~/components/table/TableRow.vue'
import TableHeadCell from '~/components/table/TableHeadCell.vue'
import TableBody from '~/components/table/TableBody.vue'
import TableCell from '~/components/table/TableCell.vue'
import SimpleCardPagination from '~/components/pagination/SimpleCardPagination.vue'
import FullWidthOnMobileContainer from '~/components/container/FullWidthOnMobileContainer.vue'
import EdgeToEdgeCard from '~/components/card/EdgeToEdgeCard.vue'
import InputToggleWithIcon from '~/components/forms/toggles/InputToggleWithIcon.vue'
import InputIconToggle from '~/components/forms/toggles/InputIconToggle.vue'

export default Vue.extend({
  components: {
    AppTable,
    TableHead,
    TableBody,
    TableRow,
    TableHeadCell,
    InputToggleWithIcon,
    TableCell,
    SimpleCardPagination,
    FullWidthOnMobileContainer,
    EdgeToEdgeCard,
    InputIconToggle
  },
  async asyncData() {
    const names = Names.make()
    return await names.load()
  },
  data() {
    return {
      mdiHeart,
      mdiHeartOutline,
      names: [] as Name[],
      pagination: {
        nextPage: 0,
        previousPage: 0,
        currentPage: 0,
        totalPages: 0,
        offsetStart: 0,
        offsetEnd: 0
      }
    }
  },
  methods: {
    onToggleLike(uid: string) {
      const names = Names.make()
      names.toggleLike(uid).then((viewModel) => {
        this.names = viewModel.names
        this.pagination = viewModel.pagination
      })
    },
    onToggleUsed(uid: string) {
      const names = Names.make()
      names.toggleUsed(uid).then((viewModel) => {
        this.names = viewModel.names
        this.pagination = viewModel.pagination
      })
    },
    previousPage() {
      const names = Names.make()
      names.load(this.pagination.previousPage).then((viewModel) => {
        this.names = viewModel.names
        this.pagination = viewModel.pagination
      })
    },
    nextPage() {
      const names = Names.make()
      names.load(this.pagination.nextPage).then((viewModel) => {
        this.names = viewModel.names
        this.pagination = viewModel.pagination
      })
    }
  }
})
</script>
