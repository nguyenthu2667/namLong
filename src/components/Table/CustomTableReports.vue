<template>
  <div>
    <template v-if="dataTable && dataTable.length > 0">
      <b-table
        :ref="idTable"
        :id="idTable"
        :fields="fieldTable"
        :items="dataTable"
        class="text-center"
        hidden
      >
        <template
          v-slot:[`cell(${objKey.ClName})`]="row"
          v-for="(objKey, key) in columnShow"
        >
          <template
            v-if="
              objKey.TypeCol.toUpperCase() === 'BIT' ||
              objKey.TypeCol.toUpperCase() === 'CHECK' ||
              objKey.TypeCol.toUpperCase() === 'ALERT'
            "
          >
            <b-form-checkbox
              :key="key"
              v-model="row.item[objKey.ClName]"
              switch
              size="md"
              disabled
            ></b-form-checkbox>
          </template>
          <template v-else-if="objKey.TypeCol.toUpperCase() === 'DATE'">
            <span class="text-muted">{{
              convertDate(row.item[objKey.ClName])
            }}</span>
          </template>
          <template v-else-if="objKey.TypeCol.toUpperCase() === 'DATETIME'">
            <span class="text-muted">{{
              convertDateTime(row.item[objKey.ClName])
            }}</span>
          </template>
          <template v-else-if="objKey.TypeCol.toUpperCase() === 'STRING-TREE'">
            <template v-if="row.item['Key'] > 0">
              <template v-for="index in row.item['Key']">
                <span :key="index"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                >
              </template>
            </template>
            {{ row.item[objKey.ClName] }}
          </template>
          <template
            v-else-if="objKey.TypeCol.toUpperCase().split('-')[1] === 'IMAGE'"
          >
            <b-link :href="row.item[objKey.ClName]">Image</b-link>
          </template>
          <template v-else-if="objKey.TypeCol.toUpperCase() === 'PROCESS'">
            <template v-if="row.item[objKey.ClName] === 1">
              <i class="fad fa-eye-slash mr-2" style="color: green"></i>
              <strong style="color: green">{{
                row.item[objKey.TypeCol + "Name"]
              }}</strong>
            </template>
            <template v-if="row.item[objKey.ClName] === 2">
              <i class="fad fa-eye mr-2" style="color: black"></i>
              <strong style="color: black">{{
                row.item[objKey.TypeCol + "Name"]
              }}</strong>
            </template>
            <template v-if="row.item[objKey.ClName] === 3">
              <i class="fad fa-check mr-2" style="color: blue"></i>
              <strong style="color: blue">{{
                row.item[objKey.TypeCol + "Name"]
              }}</strong>
            </template>
            <template v-if="row.item[objKey.ClName] === 4">
              <i class="fad fa-undo-alt mr-2" style="color: red"></i>
              <strong style="color: red">{{
                row.item[objKey.TypeCol + "Name"]
              }}</strong>
            </template>
          </template>
          <template v-else>
            {{ row.item[objKey.ClName] }}
          </template>
        </template>
      </b-table>
    </template>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["idTable", "dataTable", "fieldTable", "columnShow"],
  data() {},
  methods: {
    convertDate(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("DD/MM/YYYY");
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm DD/MM/YYYY");
    },
  },
};
</script>
<style>
.btn-sm,
.btn-group-sm > .btn {
  line-height: 1;
}
</style>
