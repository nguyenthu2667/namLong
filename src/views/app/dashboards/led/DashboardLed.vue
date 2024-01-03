<template>
  <div class="dasboard-led">
    <div v-if="dashboards" class="dasboard-led-statistical">
      <b-row>
        <b-col lg="3">
          <div class="statistical-frame">
            <h6 class="text-center mb-0">Tổng hợp thiết bị</h6>
            <div class="statistical-item">
              <div class="d-flex justify-content-between">
                <div class="statistical-text">
                  <i class="fas fa-receipt"></i>
                  {{ dashboards.TotalDevice_Description }}
                </div>
                <div class="statistical-value">
                  {{ dashboards.TotalDevice }}
                </div>
              </div>
              <b-progress
                variant="dark"
                :value="dashboards.TotalDevice"
                :max="dashboards.TotalDevice"
              />
            </div>
            <div class="statistical-item">
              <div class="d-flex justify-content-between">
                <div class="statistical-text">
                  <i class="fas fa-check-circle"></i>
                  {{ dashboards.TotalOnline_Description }}
                </div>
                <div class="statistical-value">
                  {{ dashboards.TotalOnline }}
                </div>
              </div>
              <b-progress
                variant="success"
                :value="dashboards.TotalOnline"
                :max="dashboards.TotalDevice"
              />
            </div>
            <div class="statistical-item">
              <div class="d-flex justify-content-between">
                <div class="statistical-text">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ dashboards.TotalOffline_Description }}
                </div>
                <div class="statistical-value">
                  {{ dashboards.TotalOffline }}
                </div>
              </div>
              <b-progress
                variant="danger"
                :value="dashboards.TotalOffline"
                :max="dashboards.TotalDevice"
              />
            </div>
          </div>
        </b-col>
        <b-col lg="6">
          <div class="statistical-frame">
            <h6 class="text-center mb-0">Tổng hợp lịch phát sóng</h6>
            <b-row>
              <b-col lg="6">
                <div class="statistical-item">
                  <div class="d-flex justify-content-between">
                    <div class="statistical-text">
                      <i class="fas fa-user-check"></i>
                      {{ dashboards.TotalApproval_Description }}
                    </div>
                    <div class="statistical-value">
                      <!-- {{ dashboards.TotalApproval }}/{{ totalSlideShow }} -->
                      {{ dashboards.TotalApproval }}
                    </div>
                  </div>
                  <b-progress
                    variant="dark"
                    :value="dashboards.TotalApproval"
                    :max="dashboards.TotalApproval"
                  />
                </div>
                <div class="statistical-item">
                  <div class="d-flex justify-content-between">
                    <div class="statistical-text">
                      <i class="fad fa-text"></i>
                      {{ dashboards.TotalText_Description }}
                    </div>
                    <div class="statistical-value">
                      <!-- {{ dashboards.TotalText }}/{{ totalSlideShowByType }} -->
                      {{ dashboards.TotalText }}
                    </div>
                  </div>
                  <b-progress
                    variant="dark"
                    :value="dashboards.TotalText"
                    :max="dashboards.TotalApproval"
                  />
                </div>
                <div class="statistical-item">
                  <div class="d-flex justify-content-between">
                    <div class="statistical-text">
                      <i class="fas fa-image"></i>
                      {{ dashboards.TotalImage_Description }}
                    </div>
                    <div class="statistical-value">
                      <!-- {{ dashboards.TotalImage }}/{{ totalSlideShowByType }} -->
                      {{ dashboards.TotalImage }}
                    </div>
                  </div>
                  <b-progress
                    variant="success"
                    :value="dashboards.TotalImage"
                    :max="dashboards.TotalApproval"
                  />
                </div>
                <div class="statistical-item">
                  <div class="d-flex justify-content-between">
                    <div class="statistical-text">
                      <i class="fas fa-video"></i>
                      {{ dashboards.TotalVideo_Description }}
                    </div>
                    <div class="statistical-value">
                      <!-- {{ dashboards.TotalVideo }}/{{ totalSlideShowByType }} -->
                      {{ dashboards.TotalVideo }}
                    </div>
                  </div>
                  <b-progress
                    variant="warning"
                    :value="dashboards.TotalVideo"
                    :max="dashboards.TotalApproval"
                  />
                </div>
              </b-col>
              <b-col lg="6">
                <div class="statistical-item">
                  <div class="d-flex justify-content-between">
                    <div class="statistical-text">
                      <i class="fas fa-spinner"></i>
                      {{ dashboards.TotalWaitApproval_Description }}
                    </div>
                    <div class="statistical-value">
                      {{ dashboards.TotalWaitApproval }}
                    </div>
                  </div>
                  <b-progress
                    variant="dark"
                    :value="dashboards.TotalWaitApproval_Description"
                    :max="dashboards.TotalWaitApproval"
                  />
                </div>

                <div class="statistical-item">
                  <div class="d-flex justify-content-between">
                    <div class="statistical-text">
                      <i class="fas fa-check-circle"></i>
                      {{ dashboards.TotalFinal_Description }}
                    </div>
                    <div class="statistical-value">
                      {{ dashboards.TotalFinal }}
                    </div>
                  </div>
                  <b-progress
                    variant="primary"
                    :value="dashboards.TotalFinal"
                    :max="dashboards.TotalFinal"
                  />
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col lg="3">
          <div class="statistical-frame">
            <h6 class="text-center mb-0">Lịch phát hiện tại</h6>
            <div class="statistical-item">
              <div class="d-flex justify-content-between">
                <div class="statistical-text">
                  <i class="fas fa-play"></i>
                  {{ dashboards.TotalRunning_Description }}
                </div>
                <div class="statistical-value">
                  {{ dashboards.TotalRunning }}
                </div>
              </div>
              <b-progress
                variant="dark"
                :value="dashboards.TotalRunning"
                :max="dashboards.TotalRunning"
              />
            </div>
            <div class="statistical-item">
              <div class="d-flex justify-content-between">
                <div class="statistical-text">
                  <i class="fad fa-text"></i>
                  {{ dashboards.RunningText_Description }}
                </div>
                <div class="statistical-value">
                  {{ dashboards.RunningText }}
                </div>
              </div>
              <b-progress
                variant="dark"
                :value="dashboards.RunningText"
                :max="dashboards.TotalRunning"
              />
            </div>
            <div class="statistical-item">
              <div class="d-flex justify-content-between">
                <div class="statistical-text">
                  <i class="fas fa-image"></i>
                  {{ dashboards.RunningImage_Description }}
                </div>
                <div class="statistical-value">
                  {{ dashboards.RunningImage }}
                </div>
              </div>
              <b-progress
                variant="success"
                :value="dashboards.RunningImage"
                :max="dashboards.TotalRunning"
              />
            </div>
            <div class="statistical-item">
              <div class="d-flex justify-content-between">
                <div class="statistical-text">
                  <i class="fas fa-video"></i>
                  {{ dashboards.RunningVideo_Description }}
                </div>
                <div class="statistical-value">
                  {{ dashboards.RunningVideo }}
                </div>
              </div>
              <b-progress
                variant="warning"
                :value="dashboards.RunningVideo"
                :max="dashboards.TotalRunning"
              />
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <div class="mt-4">
      <b-row>
        <b-col lg="6">
          <b-card style="height: 430px; padding: 0.75rem" no-body>
            <b-card-body>
              <div class="float-left float-none-xs">
                <div class="d-inline-block">
                  <h4 class="d-inline">
                    {{ $t("tabs.title.analysis-chart") }}
                  </h4>
                </div>
              </div>
              <b-dropdown
                :text="selectChartOption.label"
                size="xs"
                variant="outline-secondary"
                class="float-right float-none-xs"
              >
                <b-dropdown-item
                  v-for="(item, index) in optionChart"
                  @click="changeChartOption(item)"
                  :key="index"
                >
                  {{ item.label }}
                </b-dropdown-item>
              </b-dropdown>
            </b-card-body>
            <div class="chart card-body pt-0">
              <template v-if="showChart">
                <multi-area-shadow-chart
                  :labelDate="labelChart"
                  :data="dataChart"
                  :height="340"
                />
              </template>
              <template v-else>
                <p class="font-italic mt-4">{{ $t("cards.no-data") }}</p>
              </template>
            </div>
          </b-card>
        </b-col>
        <b-col lg="6">
          <b-card style="height: 430px">
            <ScheduleTable
              tableTitle="Lịch phát sóng hiện tại"
              :dataTable="currentScheduleList"
              :fieldTable="scheduleFields"
              :scheduleColumnShow="scheduleColumnShow"
              :perPage="10"
              headVariant="light"
              idModalDetail="modal-detail-current-schedule"
              :isShowLedStaionList="true"
            />
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div class="mt-4">
      <b-row>
        <b-col lg="6">
          <div class="card-custom-map-mini-two mb-4">
            <div class="border-map-mini-two shadow">
              <multi-location-component
                :lat-lng="latLng"
                type-item="smartled"
                ref="formMapMultiPoint"
                :convertItems="convertItems"
                :dataMapNow="dataMapNow"
                :objectData="objectData"
                @showModalDetail="showModalDetail"
              ></multi-location-component>
            </div>
          </div>
        </b-col>
        <b-col lg="6">
          <b-card class="history-control-station mb-4">
            <!-- <div class="custom-title-control text-center">
                <h6 style="color: black; font-weight: 600;" class="mb-0">
                  Danh sách bảng led
                </h6>
              </div> -->
            <div class="custom-body-control">
              <b-table
                :responsive="true"
                :sticky-header="true"
                :no-border-collapse="true"
                :bordered="true"
                :hover="true"
                :items="mapnows"
                :fields="fieldsStationLedList"
                :current-page="ledStationCurrentPage"
                :per-page="ledStationPerPage"
                @row-clicked="rowClicked"
                @row-dblclicked="showModalDetail"
                head-variant="light"
                class="text-center text-small mb-0"
                show-empty
              >
                <template #cell(StatusName)="row">
                  <span
                    class="badge-dashboard-led"
                    :style="{
                      background: row.item.StatusColor,
                    }"
                  >
                    {{ row.item.StatusName }}
                  </span>
                </template>
                <template #empty>
                  <div class="text-center font-italic text-muted">
                    {{ $t("panel.non-data") }}
                  </div>
                </template>
              </b-table>
              <!-- <div class="divide-table-pagination"></div> -->
              <!-- <b-pagination
                    :total-rows="mapnows.length"
                    :per-page="ledStationPerPage"
                    v-model="ledStationCurrentPage"
                    align="center"
                    size="sm"
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
              <!-- <template v-else>
                <p class="p-3 text-muted text-small font-italic">
                  {{ $t('map.no-data') }}
                </p>
              </template> -->
            </div>
            <b-pagination
              :total-rows="mapnows.length"
              :per-page="ledStationPerPage"
              v-model="ledStationCurrentPage"
              align="center"
              size="sm"
              style="margin-bottom: 0; height: 42px"
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
          </b-card>
        </b-col>
      </b-row>
    </div>
    <!-- <PopupDetail
      :detail="stationDetail"
      :openForm="openLedStationDetail"
      @closeForm="closeForm"
    /> -->
    <b-modal
      id="modal-detail-led-station"
      :size="'xl'"
      ok-only
      scrollable
      @hide="resetModal"
      hide-header
      hide-footer
    >
      <PopupDetail
        :detail="stationDetail"
        :scheduleColumnShow="scheduleColumnShow"
        @closeForm="closeForm"
        :showBtnClose="true"
      />
    </b-modal>
  </div>
</template>

<script>
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import handling from "@/constants/handling";
import mapAPI from "@/api/modules/mapAPI";
import ledAPI from "@/api/modules/ledAPI";
import MultiLocationComponent from "./component/MultiLocationComponent";
import CustomTables from "./component/CustomTables";
// import PopupDetail from '@/views/app/map/popup-modals/LedStation2'
import PopupDetail from "@/views/app/map/popup-modals/LedStation2";
// import ScheduleTable from '@/views/app/dashboards/led/component/ScheduleTable'
import ScheduleTable from "@/views/app/dashboards/led/component/ScheduleTable2";
import MultiAreaShadowChart from "@/components/Charts/MultiAreaShadow";

export default {
  name: "DashboardLed",
  components: {
    "multi-location-component": MultiLocationComponent,
    "custom-tables": CustomTables,
    PopupDetail,
    ScheduleTable,
    "multi-area-shadow-chart": MultiAreaShadowChart,
  },
  data() {
    return {
      dashboards: null,
      mapnows: [],
      search: "",
      filterItems: [],
      // dataMapNow: null,
      selectedData: [],
      menuRight: [],
      page: 1,
      perPage: 10,
      totalRows: 0,
      ledStationPerPage: 9,
      ledStationCurrentPage: 1,
      currentScheduleList: [],
      currentScheduleListObjectKey: [],
      scheduleColumnShow: [],
      fieldsStationLedList: [
        {
          key: "StationName",
          label: "Thiết bị",
          tdClass: "text-left",
        },
        {
          key: "StationAddress",
          label: "Địa chỉ lắp đặt",
          tdClass: "text-left",
        },
        {
          key: "Resolution",
          label: "Độ phân giải",
          tdClass: "text-left",
        },
        {
          key: "StatusName",
          label: "Trạng thái",
          tdClass: "text-center",
        },
      ],
      stationDetail: null,
      openLedStationDetail: false,
      chartList: [],
      chartByType: "", //Week, Month, Year
      selectChartOption: {
        label: this.$t("modal.this-week"),
        value: "WEEK",
      },
      optionChart: [
        {
          label: this.$t("modal.this-week"),
          value: "WEEK",
        },
        {
          label: this.$t("modal.this-month"),
          value: "MONTH",
        },
        {
          label: this.$t("modal.this-year"),
          value: "YEAR",
        },
      ],
      showChart: false,
      areaCharts: [],
      dataChart: null,
      labelChart: null,
    };
  },
  computed: {
    objectData: function () {
      for (let i = 0; i < this.menuRight.length; i++) {
        if (this.$route.fullPath === this.menuRight[i].Link) {
          return {
            menuIDCurrent: this.menuRight[i].MenuID.toString(),
            formName: this.menuRight[i].MenuName.toUpperCase(),
            accessWrite: handling.convertBitToBoolean(
              this.menuRight[i].AccessWrite
            ),
          };
        }
      }
    },
    scheduleFields: function () {
      if (this.currentScheduleList && this.currentScheduleList.length > 0) {
        const objectKey = Object.keys(this.currentScheduleList[0]);
        const arr = handling.mergeKeyDynamic(
          objectKey,
          this.scheduleColumnShow
        );
        const notDisplay = ["OID", "Note", "CreateDate", "IsActive"];
        const newArr = [];
        arr.forEach((item) => {
          if (!notDisplay.includes(item.key)) {
            newArr.push({
              key: item.key,
              label: item.label,
            });
          }
        });
        return newArr;
        // const obj = { key: 'Detail', label: '' }
        // return [...newArr, obj]
      }
      return [];
    },
    // scheduleFieldsCustom() {
    //   return [
    //       {key: 'OName', label: this.getColumnShowName('OName')},
    //       {key: 'FileType', label: this.getColumnShowName('FileType')},
    //       // {key: 'LoopType', label: this.getColumnShowName('LoopType')},
    //       {key: 'DateDescription', label: this.getColumnShowName('DateDescription')},
    //       {key: 'TimeDescription', label: this.getColumnShowName('TimeDescription')},
    //       {key: 'Detail', label: '', thClass: 'text-center'}
    //     ]
    // },
    latLng() {
      if (this.mapnows && this.mapnows.length > 0) {
        const arr = [];
        this.mapnows.forEach((item) => {
          arr.push([parseFloat(item.Lat), parseFloat(item.Long)]);
        });
        return arr;
      }
      return [];
    },
    convertItems() {
      if (this.mapnows && this.mapnows.length > 0) {
        const arr = this.paginationData(this.page, this.perPage, this.mapnows);
        return arr;
      }
      return [];
    },
    dataMapNow() {
      if (this.mapnows && this.mapnows.length > 0) {
        return [...this.mapnows];
      }
      return [];
    },
    itemsTable() {
      if (this.mapnows && this.mapnows.length > 0) {
        return [...this.mapnows];
      }
      return [];
    },
    // objectKey() {
    //   if (this.mapnows && this.mapnows.length > 0) {
    //     return Object.keys(this.mapnows)
    //   }
    //   return []
    // },
    // currentScheduleListFields() {
    //   const arr = handling.mergeTableAndData(
    //     this.currentScheduleListObjectKey,
    //     this.scheduleColumnShow,
    //   )
    //   if (arr && arr.length > 0) {
    //     const obj = arr.find((item) => item.key == 'Note')
    //     if (obj) {
    //       obj.tdClass = 'text-left pt-3 position-relative'
    //     }
    //   }
    //   return arr
    // },
    totalSlideShowByType() {
      if (this.dashboards) {
        return (
          this.dashboards.TotalText +
          this.dashboards.TotalImage +
          this.dashboards.TotalVideo
        );
      }
      return 0;
    },
    totalSlideShow() {
      if (this.dashboards) {
        return (
          this.dashboards.TotalWaitApproval +
          this.dashboards.TotalApproval +
          this.dashboards.TotalRunning +
          this.dashboards.TotalFinal
        );
      }
      return 0;
    },
  },
  methods: {
    getListMenuRight() {
      let body = {
        GroupID: JSON.parse(localStorage.getItem("user")).GroupID,
      };
      systemAPI
        .getMenus(body)
        .then((val) => {
          this.menuRight = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMapNow() {
      const body = {
        DataCode: "SMARTLED",
      };
      mapAPI
        .mapNowByCode(body)
        .then((val) => {
          this.dashboards = val.status
            ? val.data[0]?.DataProperties?.Dashboards[0]
            : null;
          this.mapnows = val.status ? val.data[0]?.DataProperties?.Mapnows : [];

          const list = this.dashboards?.PropertiesSchedule || [];
          if (list.length > 0) {
            this.currentScheduleList = handling.convertDataBitToBoolean(list);
            this.currentScheduleListObjectKey = Object.keys(list[0]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // flyToPoint(items) {
    //   this.$refs.formMapMultiPoint.flyPoint(items.Lat, items.Long)
    // },
    paginationData(page, perPage, array) {
      let newArray = [];
      array.forEach((val, index) => {
        if (page === 1) {
          if (index < perPage) {
            newArray.push(val);
          }
        } else {
          if (index >= perPage * (page - 1) && index < perPage * page) {
            newArray.push(val);
          }
        }
      });
      return newArray;
    },
    searchData(data, string) {
      let newArr = [];
      data.forEach((i) => {
        let status = false;
        Object.keys(i).forEach((j) => {
          if (j === "StationName") {
            if (
              i[j].toString().toLowerCase().indexOf(string.toLowerCase()) > -1
            ) {
              status = true;
            }
          }
        });
        if (status) {
          newArr.push(i);
        }
      });
      return newArr;
    },
    getColumnCurrentSchedule(string) {
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
    getScheduleChart() {
      let body = {
        View: this.selectChartOption.value,
        StationID: "12124124",
      };
      ledAPI
        .scheduleChart(body)
        .then((val) => {
          // this.chartList = val.status ? val.data : []
          if (val.data && val.data.length > 0) {
            this.convertDataChartMultiAreaShadow(val.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetModal() {
      this.stationDetail = null;
    },
    rowClicked(row) {
      // console.log(row)
      this.$refs.formMapMultiPoint.flyPoint(row.Lat, row.Long);
    },
    showModalDetail(item) {
      // console.log(item);
      this.stationDetail = item;
      // this.$bvModal.show('modal-detail-led-station')
    },
    closeForm() {
      // console.log('closeForm');
      this.$bvModal.hide("modal-detail-led-station");
      this.openLedStationDetail = false;
      // this.stationDetail = null
    },
    // getColumnShowName(key) {
    //   if (this.scheduleColumnShow && this.scheduleColumnShow.length > 0) {
    //     if (key) {
    //       const obj = this.scheduleColumnShow.find(
    //         (item) => item.ClName === key,
    //       )
    //       return obj ? obj.ShwName : ''
    //     }
    //   }
    //   return ''
    // },
    changeChartOption(item) {
      this.selectChartOption = item;
      this.showChart = false;
      this.areaCharts = [];
      this.getScheduleChart();
      this.getDataChart();
    },
    convertDataChartMultiAreaShadow(data) {
      //contructor
      let labelDate = [];
      let result = [
        {
          label: "Số trạm phát", //StationNo
          borderColor: "#05CBE1",
          pointBorderColor: "#05CBE1",
          pointHoverBackgroundColor: "#05CBE1",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#05CBE1",
          borderWidth: 2,
          pointBorderColor: "#05CBE1",
          // backgroundColor: this.gradient,
          data: [],
        },
        {
          label: "Thời gian phát", //TimeShow
          borderColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          pointHoverBackgroundColor: "#ffb64d",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#ffb64d",
          pointBorderColor: "#ffb64d",
          borderWidth: 2,
          // backgroundColor: this.gradient2,
          data: [],
        },
        {
          label: "Số lần phát", //ViewNo
          borderColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          pointHoverBackgroundColor: "#fe8b9e",
          pointHoverBorderColor: "black",
          pointBackgroundColor: "#fe8b9e",
          pointBorderColor: "#fe8b9e",
          borderWidth: 2,
          // backgroundColor: this.gradient2,
          data: [],
        },
      ];
      //data-custom
      data.forEach((item) => {
        labelDate.push(item.ItemDay.split("/")[0]);
        for (const key in item) {
          if (key === "StationNo") {
            result[0].data.push(item[key]);
          }
          if (key === "TimeShow") {
            result[1].data.push(item[key]);
          }
          if (key === "ViewNo") {
            result[2].data.push(item[key]);
          }
        }
      });
      this.labelChart = labelDate;
      this.dataChart = result;
      setTimeout(() => {
        this.showChart = true;
      }, 50);
    },
  },
  watch: {
    search(to, from) {
      if (this.mapnows.length > 0) {
        this.page = 1;
        if (to.length > 0) {
          let newArr = this.searchData(this.mapnows, to);
          if (newArr.length > 0) {
            this.filterItems = newArr;
            this.convertItems = this.paginationData(
              this.page,
              this.perPage,
              newArr
            );
            this.totalRows = newArr.length;
          } else {
            this.filterItems = null;
            this.convertItems = null;
            this.totalRows = 0;
          }
        } else {
          this.filterItems = null;
          this.convertItems = this.paginationData(
            this.page,
            this.perPage,
            this.mapnows
          );
          this.totalRows = this.mapnows.length;
        }
      }
    },
    page(to, from) {
      if (this.filterItems) {
        this.convertItems = this.paginationData(
          to,
          this.perPage,
          this.filterItems
        );
        this.totalRows = this.filterItems.length;
      } else {
        this.convertItems = this.mapnows
          ? this.paginationData(to, this.perPage, this.mapnows)
          : null;
        this.totalRows = this.mapnows.length;
      }
    },
    stationDetail(to) {
      if (to) {
        this.$bvModal.show("modal-detail-led-station");
        // this.openLedStationDetail = true
      }
    },
  },
  // updated() {
  //   setTimeout(() => {
  //     const a = this.$refs['test-height-modal']
  //     console.log(a);
  //     const bodyModal = a.$refs.body
  //     console.log(bodyModal);
  //     if (bodyModal) {
  //       bodyModal.style.minHeight = `${bodyModal.offsetHeight}px`
  //     }
  //   }, 300)
  // },
  async created() {
    await this.getListMenuRight();
    await this.getMapNow();
    await this.getColumnCurrentSchedule("ScheduleSlideShows");
    this.getScheduleChart();
  },
};
</script>

<style lang="scss">
.dasboard-led {
  .dasboard-led-statistical {
    .statistical-frame {
      background: white;
      padding: 15px;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      height: 100%;

      h6 {
        margin-bottom: 15px;
        color: black;
        font-weight: 600;
      }
    }
    .statistical-item {
      margin-top: 15px;
      i {
        font-size: 10px;
        width: 12px;
        height: 12px;
        color: gray;
      }
    }
  }
  .border-map-mini-two {
    width: 100%;
    height: 376px;
    // box-shadow: 0 1px 15px rgba(0, 0, 0, 0.4), 0 1px 6px rgba(0, 0, 0, 0.4);
  }
  .history-control-station {
    height: 376px;
  }

  .card-body {
    padding: 0;
  }

  // .history-control-station .card-body {
  //   padding: 0;
  // }

  .history-control-station .card-body .custom-title-control {
    font-size: 15px;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #d7d7d7;
    width: 100%;
    font-weight: bold;
  }

  .history-control-station .card-body .custom-body-control {
    // height: 338px;
  }

  .custom-list-collapse {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .custom-list-collapse-label {
    display: block;
    cursor: pointer;
    padding: 0.75rem;
    border-bottom: none;
    // box-shadow: 0 1px 15px rgba(0, 0, 0, 0.4), 0 1px 6px rgba(0, 0, 0, 0.4);
    margin-bottom: 0;
  }

  .custom-list-collapse-label:hover {
    background: #d7d7d7;
  }

  .custom-list-collapse-label.last {
    /*border-bottom: 1px solid #fff;*/
  }

  input[type="checkbox"] {
    position: absolute;
    left: -9999px;
  }

  input[type="checkbox"] ~ .cabinet-control {
    height: 0;
    transform: scaleY(0);
  }

  input[type="checkbox"]:checked ~ .cabinet-control {
    height: 100%;
    transform-origin: top;
    transition: transform 0.2s ease-out;
    transform: scaleY(1);
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    // box-shadow: 0 1px 15px rgba(0, 0, 0, 0.4), 0 1px 6px rgba(0, 0, 0, 0.4);
  }

  input[type="checkbox"]:checked + .custom-list-collapse-label {
    background: #d7d7d7;
    /*border-bottom: 1px solid #fff;*/
  }

  .dropdown-content {
    display: none;
    position: absolute;
    z-index: 1;
    top: 100px;
    left: 0;
    width: 100%;
  }

  #dropConnect {
    background-color: #e7f2e8;
    border: 1px solid #88cf8f;
  }

  #dropDisconnect {
    background-color: #fcdfe0;
    border: 1px solid #db888b;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {
    background-color: #f1f1f1;
  }

  .show-list-custom {
    display: block;
  }

  .none-click {
    pointer-events: none;
  }

  .button-wrapper .custom-type-load-label {
    font-size: 10px;
    padding: 5px 10px;
  }

  .button-wrapper .custom-type-load-li {
    height: 26px;
  }

  .button-wrapper .custom-type-load-li:first-child {
    margin-left: 0;
  }

  .button-wrapper .custom-type-load-li {
    margin-left: 20px;
  }

  .follow-list-station {
    height: 684px;
  }
  .divide-table-pagination {
    width: 100%;
    height: 2px;
    background: #f3f3f3;
  }
  .custom-body-control {
    th {
      white-space: nowrap;
      padding: 0.5rem;
    }
    td {
      vertical-align: middle;
      padding: 0.5rem;
    }
    .badge-dashboard-led {
      padding: 3px 6px;
      border-radius: 0.25rem;
      white-space: nowrap;
      font-size: 11px;
      color: white;
      cursor: pointer;

      i {
        font-size: 10px;
      }
    }
  }
  .b-table-sticky-header {
    max-height: 5000px;
    // height: 347px;
    height: 334px;
  }
}
</style>
