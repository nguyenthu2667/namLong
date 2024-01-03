<template>
  <div>
    <b-table
      id="npl-table-basic-form"
      class="npl-table-basic-form border-bottom text-center"
      sticky-headers
      responsive
      :items="dataTableHistory"
      :fields="fieldsTableHistory"
      show-empty
      :select-mode="'single'"
      head-variant="light"
      bordered="bordered"
      style="max-height: calc(100% - 15px); margin-top: -1px"
    >
      <template #empty>
        <div class="text-center font-italic text-muted">
          {{ $t("data.non-data") }}
        </div>
      </template>
      <template #cell(ActionTypeName)="row">
        <template v-if="row.item.ActionTypeName == 'Cập nhật'">
          <div
            class="action"
            :style="'border: 2px solid; border-radius: 5px; color: #b69329; margin-left:25%; width: 50% '"
          >
            <div :style="'color: #b69329; font-weight: 600; padding: 2px 0px'">
              {{ row.item.ActionTypeName }}
            </div>
          </div>
        </template>
        <template v-else-if="row.item.ActionTypeName == 'Tạo mới'">
          <div
            class="action"
            :style="'border: 2px solid; border-radius: 5px; color:#3e884f; margin-left:25%; width: 50% '"
          >
            <div :style="'color: #3e884f; font-weight: 600; padding: 2px 0px'">
              {{ row.item.ActionTypeName }}
            </div>
          </div>
        </template>
      </template>
      <template #cell(CreateDate)="row">
        <template 
          class="tem" 
          :style="'width: 250px'"
        >
          <div 
            class="dateCreate" 
            :style="'text-align : left;'"
          >
            <div>
              {{ row.item.CreateDate }}
            </div>
          </div>
        </template>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: ["dataTableHistory", "fieldsTableHistory"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.tem {
  width: 250px;
}
</style>
