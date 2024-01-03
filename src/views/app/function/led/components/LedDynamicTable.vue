<template>
  <div class="dynamic-table">
    <!-- <b-row class="mt-2 mb-2">
      <b-col :lg="7" class="mt-2">
        <span v-if="isPagination || filter != ''">
          {{ $t('modal.total') }}:
          <strong>{{ totalRows }}</strong>
          {{ $t('panel.result') }}
        </span>
        <span v-else>
          {{ $t('modal.total') }}:
          <strong>{{ pTotalRows }}</strong>
          {{ $t('panel.result') }} (Trang <b>{{ pCurrentPage }} </b>)
        </span>
      </b-col>
      <b-col :lg="5">
        <b-form-group
          v-show="isPagination || isSearch"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              :placeholder="$t('form.find')"
              style="
                border-bottom-left-radius: 20px;
                border-top-left-radius: 20px;
                font-size: 12px;
                height: 31px;
                padding-left: 1rem;
              "
            ></b-form-input>
            <b-input-group-append>
              <b-dropdown
                class="dropdown-search"
                :text="$t('cards.find-text')"
                right
                variant="primary"
                size="sm"
                no-caret
              >
                <b-form-checkbox-group
                  v-model="filterOn"
                  class="ml-3 mt-1 mr-3 mb-1"
                  style="width: 160px"
                >
                  <template v-for="(item, key) in fieldTable">
                    <b-form-checkbox :value="item.key" :key="key">
                      <span class="text-small font-weight-bold">
                        {{ item.label }}
                      </span>
                    </b-form-checkbox>
                  </template>
                </b-form-checkbox-group>
              </b-dropdown>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row> -->

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
      :selectable="selectable"
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
      @row-clicked="rowClicked"
    >
      <template
        v-for="(field, index) in fieldTable"
        v-slot:[`cell(${field.key})`]="row"
      >
        <template v-if="field.typeCol.toUpperCase() == 'STRING-TREE'">
          {{ row.item[`${field.key}`] }}
        </template>
        <template
          v-if="
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

        <template
          v-else-if="
            field.typeCol.toUpperCase().search('FLOAT') > -1 ||
              field.typeCol.toUpperCase().search('MONEY') > -1 ||
              field.typeCol.toUpperCase() == 'NUMBERBOLDVN'
          "
        >
          <div class="text-right" :key="index">
            {{ convertMoneyVN(row.item[`${field.key}`]).split('.')[0] }}
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
          <b-form-checkbox
            :key="index"
            switch
            size="md"
            v-model="row.item[`${field.key}`]"
            @change="emitEdit(row.item, field.key)"
          ></b-form-checkbox>
        </template>
        <template v-else-if="field.typeCol.toUpperCase() == 'KEY'">
          <div class="text-left" :key="index">
            {{ row.item[`${field.key}`] }}
          </div>
        </template>
        <template v-else-if="field.typeCol.toUpperCase() == 'CHECKBOX'">
          <div class="d-flex justify-content-center frame-checkbox" :key="index">
            <b-form-checkbox :checked="row.item.IsChecked" />
          </div>
        </template>
        <template v-else-if="field.typeCol.toUpperCase() == 'DELETE'">
          <div class="text-center btn-remove-led-station" :key="index">
            <div
              class="text-danger"
              @click="removeLedStation(row.item.StationID)"
            >
              <i class="fad fa-trash-alt"></i>
            </div>
          </div>
        </template>
        <template v-else>
          <!-- STRING -->
          <div :key="index">
            {{ row.item[`${field.key}`] }}
          </div>
        </template>
      </template>
      <template #empty>
        <div class="text-center font-italic text-muted">
          {{ textNoData || $t('panel.non-data') }}
        </div>
      </template>
      <template #emptyfiltered>
        <div class="text-center font-italic text-muted">
          {{ $t('panel.non-result') }}
        </div>
      </template>
    </b-table>
    <template v-if="dataTable && dataTable.length > 0">
      <b-pagination
        v-show="isPagination"
        align="center"
        :total-rows="totalRows"
        :per-page="perPage"
        v-model="currentPage"
        size="sm"
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
    </template>
  </div>
</template>

<script>
import handling from '@/constants/handling'

export default {
  name: 'led-dynamic-table',
  props: {
    id: {
      type: String,
      default: '',
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
    selectable: {
      type: Boolean,
      default: false,
    },
    selectMode: {
      type: String,
      default: 'single',
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
      default: '',
    },
    textNoData: {
      type: String,
      default: '',
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.dataTable) {
        this.totalRows = this.dataTable.length
      }
    }, 500)
  },
  data() {
    return {
      filterOn: [],
      totalRows: this.dataTable ? this.dataTable.length : 0,
      currentPage: 1,
      perPage: 10,
    }
  },
  async created() {
    await this.handleData()
  },
  methods: {
    loadImgDefault(e) {
      return (e.target.src =
        'https://static.thenounproject.com/png/586523-200.png')
    },
    rowClass(item, type) {
      if (item !== null && item.RowColor) {
        let key = item.RowColor.toUpperCase()
        switch (key) {
          case 'RED':
            return 'table-danger'
            break
          case 'ORANGE':
          case 'YELLOW':
            return 'table-warning'
            break
          case 'BLACK':
            return 'table-dark'
            break
          case 'GREY':
          case 'GRAY':
            return 'table-secondary'
            break
          case 'BLUE':
            return 'table-primary'
            break
          case 'GREEN':
            return 'table-success'
            break
          default:
            return
            break
        }
      }
    },
    emitDbClick(row) {
      this.$emit('dbclick', row)
    },
    emitSelected(row) {
      this.$emit('selected', row)
    },
    handleData() {
      this.totalRows = this.dataTable.length
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    emitEdit(items, key) {
      this.$emit('status-edit', items, key)
    },
    convertMoneyVN(value) {
      return handling.convertFloat(value)
    },
    convertDate(string) {
      return handling.convertDate(string)
    },
    convertDateTime(string) {
      return handling.convertDateTime(string)
    },
    rowClicked(row) {
      this.$emit('rowClicked', row)
    },
    removeLedStation(id) {
      this.$emit('removeLedStation', id)
    },
  },
  watch: {
    dataTable() {
      this.handleData()
    },
  },
}
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
.btn-remove-led-station {
  display: flex;
  justify-content: center;

  div {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: #f5f5f5;
    }
  }
}
.table-responsive,
.pagination {
  margin-bottom: 0;
}
.frame-checkbox {
  position: relative;
  margin-left: 5px;
  &::before {
    content: '';
    background: none;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
  }
  // .custom-checkbox {
  //   padding-left: 2rem;
  // }
}
</style>
