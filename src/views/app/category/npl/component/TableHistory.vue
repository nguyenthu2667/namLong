<template>
  <div>
    <b-table
      id="npl-table-history-action"
      class="npl-table-history-action"
      :fields="fields"
      :items="items"
      bordered
      responsive
      show-empty
      head-variant="light"
    >
      <template #cell(ActionTypeName)="row">
        <div>
          <b-badge
            style="min-width: 100px"
            v-if="row.item.ActionTypeName.toUpperCase() == 'TẠO MỚI'"
            variant="outline-success"
            class="p-2 text-uppercase"
          >
            {{$t('table-history.create')}}
          </b-badge>
          <b-badge
            style="min-width: 100px"
            v-else-if="row.item.ActionTypeName.toUpperCase() == 'CẬP NHẬT'"
            variant="outline-warning"
            class="p-2 text-uppercase"
          >
            {{$t('table-history.update')}}
          </b-badge>
          <b-badge
            style="min-width: 100px"
            v-else-if="row.item.ActionTypeName.toUpperCase() == 'KHÓA'"
            variant="outline-danger"
            class="p-2 text-uppercase"
          >
            {{$t('table-history.lock')}}
          </b-badge>
          <!-- <b-badge
            style="min-width: 100px"
            v-else
            variant="outline-primary"
            class="p-2"
            >LỖI THAO TÁC
          </b-badge> -->
        </div>
      </template>
    </b-table>
    <!-- <b-pagination
      align="center"
      :total-rows="totalRows"
      :per-page="perPage"
      v-model="currentPage"
    >
      <template v-slot:next-text>
        <i class="simple-icon-arrow-right" />
      </template>
      <template v-slot:prev-text>
        <i class="simple-icon-arrow-left" />
      </template>
      <template v-slot:first-text>
        <i class="simple-icon-control-start" />
      </template>
      <template v-slot:last-text>
        <i class="simple-icon-control-end" />
      </template>
    </b-pagination> -->
  </div>
</template>

<script>
export default {
  props: ["fields", "items"],
  data() {
    return {
      totalRows: this.items.length,
      currentPage: 1,
      perPage: 10,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>