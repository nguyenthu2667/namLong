<template>
  <div class="table-dashboard-led-2" style="height: 376px">
    <div class="d-flex justify-content-between">
      <div style="padding: 0.5rem">
        <span>
          Lịch phát sóng hiện tại:
          <strong>{{ totalRows }}</strong>
        </span>
      </div>
      <!-- <b-pagination
        size="sm"
        :total-rows="totalRows"
        :per-page="perPage"
        v-model="currentPage"
        style="margin-bottom: 0"
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
    <template v-if="!isShowTable">
      <div class="font-italic text-muted w-100">
        {{ $t("panel.non-data") }}
      </div>
    </template>
    <template v-if="isShowTable">
      <b-table
        hover
        :current-page="currentPage"
        :per-page="perPage"
        :fields="fieldTable"
        :items="dataTable"
        :class="!bordered && 'add-border-bottom'"
        @filtered="onFiltered"
        :filter="filter"
        :filter-included-fields="filterOn"
        responsive
        @row-dblclicked="showModalDetail"
        :bordered="bordered"
        :head-variant="headVariant"
        show-empty
      >
        <template #cell(FileType)="row">
          <span class="badge-dashboard-led bg-primary">
            <i :class="badgeDetail(row.item.FileTypeHide).icon"></i>
            {{ badgeDetail(row.item.FileTypeHide).text }}
          </span>
        </template>
        <!-- <template #cell(Detail)="row">
          <div
            class="btn-watch-detail bg-primary"
            ref="btn-watch-detail"
            @click.stop="showModalDetail(row.item)"
          >
            <span>Xem chi tiết</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"
              />
            </svg>
          </div>
        </template> -->
        <template #empty>
          <div class="text-center font-italic text-muted">
            {{ $t("panel.non-data") }}
          </div>
        </template>
        <template #emptyfiltered>
          <div class="text-center font-italic text-muted">
            {{ $t("panel.non-result") }}
          </div>
        </template>
      </b-table>
      <!-- <div
        class="d-flex justify-content-center justify-content-sm-between align-items-center"
      >
        <span class="d-none d-sm-block">
          {{ $t('form.total') }}:
          <strong>{{ totalRows }}</strong>
          {{ $t('form.result').toLowerCase() }}
        </span>
        <b-pagination
          size="sm"
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
          style="margin-bottom: 0"
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
      </div> -->
    </template>
    <b-modal
      :id="idModalDetail"
      size="lg"
      ok-only
      scrollable
      @hide="resetModal"
      hide-header
      hide-footer
    >
      <ScheduleDetailModal
        :scheduleDetail="scheduleDetail"
        :scheduleColumnShow="scheduleColumnShow"
        :ledStaionFields="ledStaionFields"
        :ledStationList="ledStationList"
        :isShowLedStaionList="isShowLedStaionList"
        @closeForm="closeFormScheduleDetail"
      />
    </b-modal>
  </div>
</template>

<script>
import ledAPI from "@/api/modules/ledAPI";
import ScheduleDetailModal from "@/views/app/dashboards/led/component/ScheduleDetailModal";
import systemAPI from "@/api/modules/systemAPI";
import handling from "@/constants/handling";

export default {
  name: "ScheduleTable",
  props: {
    dataTable: {
      default: [],
    },
    fieldTable: {
      default: [],
    },
    perPage: {
      default: 10,
    },
    bordered: {
      default: false,
    },
    headVariant: {
      default: "light",
    },
    colSearch: {
      default: 5,
    },
    tableTitle: {
      default: "",
    },
    // scheduleColumnShow: {
    //   default: [],
    // },
    idModalDetail: {
      default: "",
    },
    isShowLedStaionList: {
      default: false,
    },
  },
  components: {
    ScheduleDetailModal,
  },
  data() {
    return {
      currentPage: 1,
      search_title: this.$t("form.search-invalid"),
      filter: "",
      filterOn: [],
      filteredItems: [],
      scheduleDetail: null,
      scheduleColumnShow: [],
      ledStationList: [],
      listColumnShowLedStation: [],
    };
  },
  computed: {
    totalRows() {
      if (this.dataTable && this.filter === "") {
        return this.dataTable.length;
      } else if (this.filter || this.filter === 0) {
        return this.filteredItems.length;
      } else {
        return 0;
      }
    },
    ledStaionFields() {
      if (this.ledStationList && this.ledStationList.length > 0) {
        const objectKey = Object.keys(this.ledStationList[0]);
        const arr = handling.mergeKeyDynamic(
          objectKey,
          this.listColumnShowLedStation
        );
        arr.forEach((item) => {
          item.tdClass = "text-left";
        });
        return arr;
      }
      return [];
    },
    isShowTable() {
      if (this.dataTable && this.dataTable.length > 0) {
        return true;
      }
      return false;
    },
  },
  methods: {
    onFiltered(filteredItems) {
      this.filteredItems = filteredItems;
      this.currentPage = 1;
    },
    resetModal() {
      this.scheduleDetail = null;
    },
    closeFormScheduleDetail() {
      this.$bvModal.hide(this.idModalDetail);
    },
    showModalDetail(item) {
      this.scheduleDetail = item;
      if (this.isShowLedStaionList) {
        this.getScheduleByID(item.OID);
        this.getColumnLedStation("LedStations");
      }
    },
    getScheduleByID(id) {
      let body = {
        OID: id.toString(),
      };
      ledAPI
        .scheduleByID(body)
        .then((val) => {
          if (val.status) {
            const arr = val.data?.Details || [];
            const newArr = [];
            arr.forEach((item) => {
              newArr.push({
                ...item,
                StationName: item.StationName || item.DeviceName,
                StationAddress: item.StationAddress || item.DeviceAddress,
                ConnectTypeName: item.ConnectTypeName || item.ConnectName,
              });
            });
            this.ledStationList = newArr;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnLedStation(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowLedStation = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnSchedule(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.scheduleColumnShow = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    badgeDetail(value) {
      if (value) {
        switch (value.toUpperCase()) {
          case "TEXT":
            return { text: "Văn bản", icon: "fad fa-text" };
          case "IMAGE":
            return { text: "Hình ảnh", icon: "fas fa-image" };
          case "VIDEO":
            return { text: "Video", icon: "fas fa-video" };
          default:
            return { text: "", icon: "" };
        }
      }
      return { text: "", icon: "" };
    },
  },
  watch: {
    scheduleDetail(to) {
      if (to) {
        if (this.isShowLedStaionList) {
          setTimeout(() => {
            this.$bvModal.show(this.idModalDetail);
          }, 500);
        } else {
          this.$bvModal.show(this.idModalDetail);
        }
      }
    },
  },
  created() {
    this.getColumnSchedule("ScheduleSlideShows");
  },
};
</script>
<style lang="scss">
.table-dashboard-led-2 {
  th {
    white-space: nowrap;
    padding: 0.5rem;
  }
  td {
    vertical-align: middle;
    padding: 0.5rem;
  }
  .table-responsive {
    margin-bottom: 0;
    &.add-border-bottom {
      border-bottom: 1px solid #f3f3f3;
    }
  }
  .b-pagination {
    margin-bottom: 0 !important;
  }
  .frame-status {
    position: relative;
    &::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }
  .btn-watch-detail {
    // padding: 4px 8px;
    margin: auto;
    width: 100px;
    height: 25px;
    border-radius: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;

    span {
      margin-right: 5px;
    }

    svg {
      width: 15px;
      height: 15px;
      path {
        fill: #ffff;
      }
    }
  }

  .badge-dashboard-led {
    padding: 3px 6px;
    // width: 100px;
    // height: 50px;
    border-radius: 0.25rem;
    white-space: nowrap;
    font-size: 11px;
    color: white;
    cursor: pointer;

    i {
      // font-size: 10px;
    }
  }
}
</style>
