<template>
<div :style="{height: heightContent + 'px'}" style="overflow: auto">
  <b-table
    id="npl-table-basic-form"
    class="npl-table-basic-form border-bottom"
    :fields="fields"
    :items="items"
    bordered
    responsive
    show-empty
    head-variant="light"
    selectable
    :select-mode="'single'"
    sticky-header
    style="max-height: calc(100% - 15px); margin-top: -1px"
    @row-dblclicked="rowDblclicked"
  >
    <template
      v-for="(field, index) in fields"
      v-slot:[`cell(${field.key})`]="row"
    >
      <template v-if="field.key.toUpperCase() === 'ODATE'">
        {{ convertDate(row.item[field.key]) }}
      </template>
      <template v-else-if="field.key.toUpperCase() === 'ISATTACHFILE'">
        <template v-if="row.item.IsAttachFile">
          <div :key="index" class="text-center">
            <span style="color: limegreen">✔</span>
          </div>
        </template>
        <template v-else>
          <div :key="index" class="text-center">
            <span style="color: red">✘</span>
          </div>
        </template>
      </template>
      <template v-else-if="field.key.toUpperCase() === 'ISACTIVE'">
        <div :key="index" class="d-flex justify-content-center">
          <div style="width: 90px">
            <Status
              :color="row.item.IsActive ? 'green' : 'gray'"
              :label="row.item.IsActive ? $t('npl.locked') : $t('npl.not-lock')"
              :showCircle="false"
            ></Status>
          </div>
        </div>
      </template>
      <template v-else-if="field.typeCol.toUpperCase() == 'MONEY'">
        {{ convertCurrency(row.item[field.key]) }}
      </template>
      <template v-else>
        {{ row.item[field.key] }}
      </template>
    </template>
    <template #empty>
      <div class="text-center font-italic text-muted">
        {{ $t("data.non-data") }}
      </div>
    </template>
  </b-table>
</div>
</template>

<script>
import moment from "moment";
import Status from "@/components/Badges/StatusColor.vue";

export default {
  props: ["items", "fields", "formatCurrency", "formatDecimal", "heightContent"],
  components: {
    Status,
  },
  data() {
    return {};
  },
  methods: {
    convertCurrency(value) {
      if (!value) {
        return 0;
      }
      if (this.formatCurrency.toUpperCase() == "VN") {
        return Number(value).toLocaleString("vi-VN");
      } else if (this.formatCurrency.toUpperCase() == "EN") {
        return Number(value).toLocaleString("en-US");
      }
    },
    convertDate(string) {
      if (string) {
        return moment(string).format("DD/MM/YYYY");
      }
      return string;
    },
    rowDblclicked(row) {
      this.$emit('rowDblclicked', row)
    }
  },
};
</script>

<style lang="scss" scoped></style>
