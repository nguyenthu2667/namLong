<template>
  <div v-if="dataTable && dataTable.length > 0">
    <b-row class="mb-4">
      <b-colxx md="7" class="mt-2">
        <span>
          {{ $t('form.total') }}:
          <strong>{{ totalRows }}</strong>
          {{ $t('form.result').toLowerCase() }}
        </span>
      </b-colxx>
      <b-colxx md="5">
        <b-form-group
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
              :placeholder="search_title"
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
                :text="$t('cards.find-text')"
                right
                variant="primary"
                size="sm"
                no-caret
                style="height: 31px;"
              >
                <b-form-checkbox-group
                  v-model="filterOn"
                  class="ml-3 mt-1 mr-3 mb-1"
                  style="width: 160px;"
                >
                  <template v-for="(item, key) in fieldTable">
                    <b-form-checkbox :value="item.key" :key="key">
                      <span class="text-small font-weight-bold">
                        {{ item.label }}
                      </span>
                    </b-form-checkbox>
                    <br />
                  </template>
                </b-form-checkbox-group>
              </b-dropdown>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-colxx>
    </b-row>
    <b-table
      :ref="idTable"
      :id="idTable"
      sort-by="title"
      sort-desc.sync="false"
      @row-selected="rowSelected"
      selectable
      :select-mode="selectMode"
      :current-page="currentPage"
      :per-page="perPage"
      selectedVariant="primary"
      :fields="fieldTable"
      :items="dataTable"
      class="text-center"
      @filtered="onFiltered"
      :filter="filter"
      :filter-included-fields="filterOn"
      responsive
      bordered
    >
      <!-- rowspan -->
      <template #cell(StationName)="{ item }">
        <div v-if="item.StationName" class="text-nowrap">
          {{ item.StationName }}
        </div>
        <div
          v-if="
            item.DeviceInfos[0] &&
            item.DeviceInfos[0].InfoName &&
            item.DeviceInfos[0].InfoValue
          "
          class="text-nowrap"
        >
          {{ item.DeviceInfos[0].InfoName }}:
          {{ item.DeviceInfos[0].InfoValue }}
        </div>
        <div
          v-if="
            item.DeviceInfos[1] &&
            item.DeviceInfos[1].InfoName &&
            item.DeviceInfos[1].InfoValue
          "
          class="text-nowrap"
        >
          {{ item.DeviceInfos[1].InfoName }}:
          {{ item.DeviceInfos[1].InfoValue }}
        </div>
      </template>
      <template #cell(Extras)="{ item }">
        <template v-if="item.Extras && item.Extras.length > 0">
          <template v-for="(extra, key) in item.Extras">
            <div
              :key="key"
              v-if="extra.StationExtraName && extra.Status"
              class="text-nowrap"
            >
              {{ extra.StationExtraName }}: {{ extra.Status }}
            </div>
          </template>
        </template>
      </template>
      <template #cell(Nodes)="{ item }">
        <template v-if="item.Nodes && item.Nodes.length > 0">
          <template v-for="(node, key) in item.Nodes">
            <div :key="key" v-if="node.StationNodeName" class="border-bottom">
              <div class="content">
                {{ node.StationNodeName }}
              </div>
            </div>
          </template>
        </template>
      </template>
      <template #cell(PIN)="{ item }">
        <template v-if="item.PIN && item.PIN.length > 0">
          <template v-for="(pin, key) in item.PIN">
            <div
              :key="key"
              v-if="pin.DeviceInfos[0].InfoValue"
              class="border-bottom"
            >
              <div class="content">
                {{ pin.DeviceInfos[0].InfoValue }}
              </div>
            </div>
          </template>
        </template>
      </template>
      <template #cell(TDV)="{ item }">
        <template v-if="item.TDV && item.TDV.length > 0">
          <template v-for="(tdv, key) in item.TDV">
            <div
              :key="key"
              v-if="tdv.DeviceInfos[0].InfoValue"
              class="border-bottom"
            >
              <div class="content">
                {{ tdv.DeviceInfos[0].InfoValue }}
              </div>
            </div>
          </template>
        </template>
      </template>
      <template #cell(PH)="{ item }">
        <template v-if="item.PH && item.PH.length > 0">
          <template v-for="(ph, key) in item.PH">
            <div
              :key="key"
              v-if="ph.Indicators[0].IndicatorValue"
              class="border-bottom"
            >
              <div class="content">
                {{ ph.Indicators[0].IndicatorValue }}
              </div>
            </div>
          </template>
        </template>
      </template>
      <template #cell(EC)="{ item }">
        <template v-if="item.EC && item.EC.length > 0">
          <template v-for="(ec, key) in item.EC">
            <div
              :key="key"
              v-if="ec.Indicators[0].IndicatorValue"
              class="border-bottom"
            >
              <div class="content">
                {{ ec.Indicators[0].IndicatorValue }}
              </div>
            </div>
          </template>
        </template>
      </template>
      <template #cell(SAL)="{ item }">
        <template v-if="item.SAL && item.SAL.length > 0">
          <template v-for="(sal, key) in item.SAL">
            <div
              :key="key"
              v-if="sal.Indicators[2].IndicatorValue"
              class="border-bottom"
            >
              <div class="content">
                {{ sal.Indicators[2].IndicatorValue }}
              </div>
            </div>
          </template>
        </template>
      </template>
      <!-- end-rowspan -->
    </b-table>
    <b-pagination
      size="sm"
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
import moment from 'moment'

export default {
  props: [
    'dataTable',
    'fieldTable',
    'columnShow',
    'selectedItems',
    'accessWrite',
    'selectMode',
    'dataFormOption',
    'idTable',
    'typeShowData',
    'showChildRow',
  ],
  data() {
    return {
      currentPage: 1,
      perPage: 20,
      search_title: this.$t('form.search-invalid'),
      filter: '',
      totalRows: 0,
      filterOn: [],
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.dataTable) {
        this.totalRows = this.dataTable.length
      }
    }, 500)
  },
  updated() {
    if (this.dataTable && this.filter === '') {
      this.totalRows = this.dataTable.length
    }
  },
  methods: {
    openFullscreen(idElement) {
      let element = document.getElementById(idElement)
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      }
    },
    showNodeDetail(item) {
      this.$emit('row-selected', item)
    },
    rowSelected(items) {
      this.$emit('row-selected', items)
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    statusEdit(items) {
      this.$emit('status-edit', items)
    },
    convertDate(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss")
      return date.format('DD/MM/YYYY')
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss")
      return date.format('HH:mm DD/MM/YYYY')
    },
    convertDateTime2(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss")
      return date.format('HH:mm:ss DD/MM/YYYY')
    },
  },
}
</script>
