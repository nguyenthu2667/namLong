<template>
  <div class="led-station-list">
    <div class="led-station-list-title">
      <h4 class="text-center">Chọn bảng led trình chiếu</h4>
      <button
        type="button"
        aria-label="Close"
        class="close"
        @click="cancelForm"
      >
        ×
      </button>
    </div>
    <div class="mt-3">
      <led-dynamic-table
        :data-table="newDataTable"
        :field-table="fields"
        :bordered="true"
        :selectable="false"
        @rowClicked="rowClicked"
      ></led-dynamic-table>
    </div>
    <div class="d-flex justify-content-end btn-group-led">
      <b-button variant="secondary" size="sm" @click="cancelForm">
        Đóng
      </b-button>
      <b-button
        variant="primary"
        class="ml-2"
        size="sm"
        @click="addLedStations"
      >
        Xác nhận
      </b-button>
    </div>
  </div>
</template>

<script>
import LedDynamicTable from './LedDynamicTable'

export default {
  props: ['ledStationList', 'selectedLedStation', 'fieldsStationSelect'],
  components: {
    'led-dynamic-table': LedDynamicTable,
  },
  data() {
    return {
      // fields: [
      //   { key: 'Checkbox', label: 'Chọn' },
      //   { key: 'StationName', label: 'Tên' },
      //   { key: 'StationAddress', label: 'Địa chỉ' },
      // ],
      // totalRows: 0,
      // perPage: 20,
      // currentPage: 1,
      selectedRow: [],
    }
  },
  computed: {
    fields() {
      if (this.fieldsStationSelect) {
        const obj = {
          key: 'IsChecked',
          label: 'Chọn',
          thClass: 'text-center',
          typeCol: 'Checkbox',
          // sortNum: 0
          // sortable: false
        }
        return [obj, ...this.fieldsStationSelect]
      }
      return []
    },
    newDataTable() {
      if(this.ledStationList && this.selectedRow) {
        const arr = []
        for(const i in this.ledStationList) {
          const obj = this.ledStationList[i]
          const IsChecked = this.selectedRow.includes(obj.StationID) ? true : false
          arr.push({
            ...obj,
            IsChecked,
          })
        }
        return arr
      }
      return []
    }
  },
  methods: {
    cancelForm() {
      this.$emit('cancelForm')
    },
    addLedStations() {
      console.log(this.selectedRow);
      this.$emit('addLedStations', this.selectedRow)
    },
    rowClicked(row, index) {
      // console.log(row)
      if (this.selectedRow.includes(row.StationID)) {
        this.selectedRow = this.selectedRow.filter(
          (item) => item !== row.StationID,
        )
      } else {
        this.selectedRow = [...this.selectedRow, row.StationID]
      }
    },
  },
  created() {
    this.totalRows = this.items?.length || 0
    this.selectedRow = this.selectedLedStation.map((item) => item.StationID)
  },
  watch: {
    selectedRow(to) {
      // console.log(to)
    },
  },
}
</script>

<style lang="scss">
.led-station-list {
  .led-station-list-title {
    position: relative;

    button {
      position: absolute;
      right: -20px;
      top: -25px;
    }
  }
  .btn-group-led {
    .btn-secondary {
      background-color: #6c757d;
      border: 1px solid #6c757d;
    }
  }
}
</style>
