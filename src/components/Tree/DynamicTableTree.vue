<template>
  <div class="dynamic-table mt-2">
    <b-table
      :id="id"
      :ref="'dynamic-table-' + id"
      selectedVariant="primary"
      :tbody-tr-class="rowClass"
      :fields="fieldTable"
      :items="dataTable"
      responsive
      show-empty
      head-variant="light"
      :bordered="bordered"
      selectable
      :select-mode="selectMode"
      sort-by="title"
      sort-desc.sync="false"
      :filter="filter"
      :filter-included-fields="filterOn"
      @filtered="onFiltered"
      :current-page="isPagination ? currentPage : null"
      :per-page="isPagination ? perPage : null"
      @row-selected="emitSelected"
      @row-dblclicked="emitDbClick"
    >
      <template
        v-for="(field, index) in fieldTable"
        v-slot:[`cell(${field.key})`]="row"
      >
        <template v-if="field.typeCol.toUpperCase() == 'STRING-TREE'">
          {{ row.item[`${field.key}`] }}
        </template>
        <template
          v-else-if="
            field.typeCol.toUpperCase() == 'AVATAR' ||
            field.typeCol.toUpperCase() == 'IMAGE'
          "
        >
          <div :key="index" style="width: 65px; height: 33px">
            <img
              style="width: 100%; height: 100%"
              :src="row.item[`${field.key}`]"
              alt=""
              @error="loadImgDefault"
            />
          </div>
        </template>
        <template v-else-if="field.typeCol.toUpperCase() == 'MEDIALINK/NAME'">
          <div :key="index" class="p-0 position-relative">
            <template
              v-if="
                row.item[`MediaType`] &&
                row.item[`MediaType`].toUpperCase() == 'NAME'
              "
            >
              <b-badge
                style="
                  font-size: 90%;
                  color: black;
                  border: 1px solid #d3d0d0f7;
                "
                variant="light"
              >
                {{ row.item[`${field.key}`] }}
              </b-badge>
            </template>
          </div>
        </template>
        <template
          v-else-if="
            field.typeCol.toUpperCase().search('FLOAT') > -1 ||
            field.typeCol.toUpperCase().search('MONEY') > -1 ||
            field.typeCol.toUpperCase() == 'NUMBERBOLDVN'
          "
        >
          <div class="text-right" :key="index">
            {{ convertMoneyVN(row.item[`${field.key}`]).split(".")[0] }}
          </div>
        </template>
        <template v-else-if="field.typeCol.toUpperCase() == 'DATE'">
          <span style="color: #858585" :key="index">
            {{ convertDate(row.item[`${field.key}`]) }}
          </span>
        </template>
        <template v-else-if="field.typeCol.toUpperCase() == 'DATETIME'">
          <span style="color: #858585" :key="index">
            {{ convertDateTime(row.item[`${field.key}`]) }}
          </span>
        </template>
        <template
          v-else-if="
            field.typeCol.toUpperCase() == 'ISCHECK' ||
            field.typeCol.toUpperCase() == 'MUTEDBIT'
          "
        >
          <span
            :key="index"
            v-if="
              row.item[`${field.key}`] == 1 || row.item[`${field.key}`] == true
            "
            style="color: limegreen"
            >✔
          </span>
          <span :key="index" v-else style="color: red">✗ </span>
        </template>
        <template v-else-if="field.typeCol.toUpperCase() == 'BIT'">
          <div :key="index">
            <template v-if="row.item.IsActive">
              <Status
                :color="pStatus.color1"
                :label="pStatus.label1"
                :showCircle="false"
              ></Status>
            </template>
            <template v-else>
              <Status
                :color="pStatus.color2"
                :label="pStatus.label2"
                :showCircle="false"
              ></Status>
            </template>
          </div>
        </template>
        <template v-else-if="field.typeCol.toUpperCase() == 'MONEY'">
          {{ convertCurrency(row.item[field.key], pFormatCurrency) }}
        </template>
        <template v-else>
          <!-- STRING -->
          <div :key="index">
            {{ row.item[`${field.key}`] }}
          </div>
        </template>
      </template>
      <template #empty>
        <div class="text-left font-italic text-muted">
          {{ $t("data.non-data") }}
        </div>
      </template>
      <template #emptyfiltered>
        <div class="text-left font-italic text-muted">
          {{ $t("data.non-result") }}
        </div>
      </template>
    </b-table>
    <b-pagination
      v-show="isPagination"
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
    </b-pagination>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import Status from "@/components/Badges/StatusColor.vue";

export default {
  name: "dynamic-table",
  components: {
    Status,
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    fieldTable: {
      type: Array,
      default: () => [],
    },
    dataTable: {
      type: Array,
      default: () => [],
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    selectMode: {
      type: String,
      default: "single",
    },
    isPagination: {
      type: Boolean,
      default: true,
    },
    isSearch: {
      type: Boolean,
      default: true,
    },
    pTotalRows: {
      type: Number,
      default: 0,
    },
    pCurrentPage: {
      type: Number,
      default: 1,
    },
    filter: {
      type: String,
      default: "",
    },
    pStatus: {
      type: Object,
      default: () => {},
    },
    pFormatCurrency: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.dataTable) {
        this.totalRows = this.dataTable.length;
      }
    }, 500);
  },
  data() {
    return {
      filterOn: [],
      totalRows: this.dataTable ? this.dataTable.length : 0,
      currentPage: 1,
      perPage: 10,
    };
  },
  async created() {
    await this.handleData();
  },
  methods: {
    loadImgDefault(e) {
      return (e.target.src =
        "https://static.thenounproject.com/png/586523-200.png");
    },
    rowClass(item, type) {
      if (item !== null && item.RowColor) {
        let key = item.RowColor.toUpperCase();
        switch (key) {
          case "RED":
            return "table-danger";
            break;
          case "ORANGE":
          case "YELLOW":
            return "table-warning";
            break;
          case "BLACK":
            return "table-dark";
            break;
          case "GREY":
          case "GRAY":
            return "table-secondary";
            break;
          case "BLUE":
            return "table-primary";
            break;
          case "GREEN":
            return "table-success";
            break;
          default:
            return;
            break;
        }
      }
    },
    handleBeforePlay(next) {
      setTimeout(() => {
        next(); // Start playing
      }, 500);
    },
    emitDbClick(row) {
      this.$emit("dbclick", row);
    },
    emitSelected(row) {
      this.$emit("selected", row);
    },
    handleData() {
      this.totalRows = this.dataTable.length;
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    emitEdit(items, key) {
      this.$emit("status-edit", items, key);
    },
    convertMoneyVN(value) {
      return handling.convertFloat(value);
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
    convertCurrency(string, country) {
      return handling.convertMoney(string, country);
    },
  },
  watch: {
    dataTable() {
      this.handleData();
    },
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 2px;
  border-radius: 5px;
  height: 7px;
}

::-webkit-scrollbar-track {
  background: inherit;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #d7d7d7;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #b0b0b0;
}
</style>
<style lang="scss">
#app-container {
  overflow-x: hidden;
}
.dropdown-search .btn-primary {
  height: 31px;
  background: #004085;
  padding-top: 7px;
}
.dynamic-table .table th {
  white-space: nowrap;
}
</style>

<style lang="scss" scoped>
// test-color-row-dynamic
.hexvalue1 {
  background-color: #d9ffbc;
  color: #d9ffbc;
}
.hexvalue2 {
  background-color: #fd7e14;
  color: #fd7e14;
}
</style>

<style>
/* custom-audio */
.audioPlayerTableDynamic .audio__progress-wrap {
  margin-top: 10px;
}
.audioPlayerTableDynamic .audio__play-start svg {
  height: 24px;
}
.audioPlayerTableDynamic .audio__play-pause svg {
  height: 24px;
}
.audioPlayerTableDynamic .audio__play-loading {
  width: 24px;
  height: 24px;
}
.audioPlayerTableDynamic .audio__play-prev svg {
  height: 14px;
}
.audioPlayerTableDynamic .audio__play-next svg {
  height: 14px;
}
.audioPlayerTableDynamic .audio__play-icon {
  height: 70%;
}
.audioPlayerTableDynamic .audio__play-rate {
  font-size: 12px;
}
</style>
