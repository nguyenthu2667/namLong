<template>
  <div v-if="objectData">
    <b-row v-if="dataDashboard">
      <b-col xl="12" lg="6">
        <b-row>
          <b-col lg="4" class="mb-4">
            <gradient-with-radial-progress-card
              icon="fad fa-map-marker-alt ml-3 mt-3"
              :title="`${dataDashboard.Total} ${$t('dashboards.station1')}`"
              :detail="$t('dashboards.station-total')"
              :percent="100"
              :progressText="dataDashboard.Total"
            />
          </b-col>
          <b-col lg="4" class="mb-4">
            <gradient-with-radial-progress-card
              icon="fad fa-map-marker-check ml-3 mt-3"
              :title="`${dataDashboard.Actived} ${$t('dashboards.station1')}`"
              :detail="$t('dashboards.station-active')"
              :percent="(dataDashboard.Actived * 100) / dataDashboard.Total"
              :progressText="dataDashboard.Actived + '/' + dataDashboard.Total"
            />
          </b-col>
          <b-col lg="4" class="mb-4">
            <gradient-with-radial-progress-card
              icon="fad fa-map-marker-exclamation ml-3 mt-3"
              :title="`${dataDashboard.Error} ${$t('dashboards.station1')}`"
              :detail="$t('dashboards.station-error')"
              :percent="(dataDashboard.Error * 100) / dataDashboard.Total"
              :progressText="dataDashboard.Error + '/' + dataDashboard.Total"
            />
          </b-col>
          <b-col xl="6" lg="6">
            <b-row>
              <b-col xl="12">
                <b-card no-body style="height: 385px">
                  <multi-map-mini
                    ref="multiMapMini"
                    :data-map-now="dataMapNow"
                    :object-data="objectData"
                    :type="'Aqua'"
                  ></multi-map-mini>
                </b-card>
              </b-col>
            </b-row>
          </b-col>
          <b-col xl="6" lg="6">
            <b-card class="history-control-station mb-4">
              <b-card-body>
                <div class="custom-title-control">
                  <p class="d-inline">
                    <i class="fad fa-history mr-2"></i>
                    {{ $t("dashboards.history-station") }}
                  </p>
                </div>
                <div class="custom-body-control">
                  <template
                    v-if="
                      dataDashboard &&
                      dataDashboard.ListControlHistory &&
                      dataDashboard.ListControlHistory.length > 0
                    "
                  >
                    <b-table
                      :responsive="true"
                      :sticky-header="true"
                      :no-border-collapse="true"
                      :bordered="true"
                      :hover="true"
                      :items="dataDashboard.ListControlHistory"
                      :fields="fields"
                      head-variant="light"
                      class="text-center text-small mb-0"
                      style="max-height: 338px"
                    >
                      <template v-slot:cell(_updateTime)="slot">
                        <p class="p-0 m-0 text-small">
                          {{ convertDateTime(slot.item.UpdateTime) }}
                        </p>
                      </template>
                    </b-table>
                  </template>
                  <template v-else>
                    <p class="p-3 text-muted text-small font-italic">
                      {{ $t("map.no-data") }}
                    </p>
                  </template>
                </div>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col xl="12">
        <h5 class="text-muted">
          <strong>{{ $t("dashboards.aqua-list").toUpperCase() }}</strong>
        </h5>
      </b-col>
      <b-colxx xxs="12" class="mb-4 table-station-aqua">
        <b-card>
          <custom-table
            :data-table="items"
            :field-table="fieldsStation"
            :column-show="listColumnShowStation"
            @row-dblclicked="rowDblclicked"
          ></custom-table>
        </b-card>
      </b-colxx>
      <div v-if="false">
        <!-- <div> -->
        <template v-if="items && items.length > 0">
          <b-col lg="12" class="mb-4">
            <b-row v-if="displayMode === 'thumb'" key="thumb">
              <b-colxx
                xxs="12"
                class="mb-3"
                v-for="(item, index) in items"
                :id="item.StationID"
                :key="index"
              >
                <aqua-list-item
                  :indexStation="index"
                  :data="item"
                  :objectData="objectData"
                  :rangeColorValues="rangeColorValues"
                  @get-data-dashboard="getDataDashboard"
                />
              </b-colxx>
            </b-row>
          </b-col>
        </template>
        <template v-else>
          <b-col lg="12" class="mb-4">
            <p class="text-muted text-small font-italic">
              {{ $t("map.no-data") }}
            </p>
          </b-col>
        </template>
      </div>
    </b-row>
    <b-modal
      :id="`modal-detail-${dataForm.StationID}`"
      ref="modal-detail"
      hide-header
      v-if="dataForm"
      @hidden="resetChartDetail"
      scrollable
      ok-only
      class="text-center"
      size="xl"
      title-class="font-weight-bolder"
    >
      <popup :data-parent="dataForm" :objectData="objectData" />
    </b-modal>
  </div>
</template>

<script>
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import aquacultureAPI from "@/api/modules/aquacultureAPI";
import { defaultRegionCode } from "@/constants/config";
import { listRegion } from "@/data/latlngRegions";
import MultiMapMini from "@/components/Map/MultiMapMini.vue";
import ListWithLocationItem from "@/components/Listing/ListWithLocationItem";
import RadialChartApexTwo from "@/components/Charts/RadialChartApexTwo";
import handling from "@/constants/handling";
import AreaChartApex from "@/components/Charts/AreaChartApex";
import GradientWithRadialProgressCard from "@/components/Cards/GradientWithRadialProgressCard";
import FollowStation from "./component/FollowStation";
import AquaListItem from "./component/AquaListItem";
// import CustomTables from '@/components/Table/CustomTables'
import CustomTables from "./component/CustomTables";
import PopupDetailAqua from "@/views/app/map/popup-modals/Aqua.vue";

export default {
  components: {
    "multi-map-mini": MultiMapMini,
    "list-with-location-item": ListWithLocationItem,
    "radial-chart-apex-two": RadialChartApexTwo,
    "area-chart-apex": AreaChartApex,
    "gradient-with-radial-progress-card": GradientWithRadialProgressCard,
    "follow-station": FollowStation,
    "aqua-list-item": AquaListItem,
    "custom-table": CustomTables,
    popup: PopupDetailAqua,
  },
  data() {
    return {
      dataForm: null,
      timer,
      listRegion,
      defaultRegionCode,
      menuRight: [],
      dataDashboard: null,
      latLng: null,
      stationArray: null,
      displayMode: "thumb",
      search: "",
      filterItems: null,
      page: 1,
      perPage: 10,
      totalRows: 0,
      fields: [
        {
          key: "StationName",
          label: this.$t("dashboards.aqua-name"),
          tdClass: "text-center font-weight-bold pl-3",
        },
        {
          key: "ExtraName",
          label: this.$t("dashboards.aqua-device"),
          tdClass: "text-center font-weight-bold text-muted pl-3",
        },
        {
          key: "ExtraStatusName",
          label: this.$t("dashboards.status"),
          tdClass: "font-weight-bold text-muted",
        },
        {
          key: "_updateTime",
          label: this.$t("dashboards.timer"),
          tdClass: "text-muted",
        },
      ],
      rangeColorValues: null,
      dataStation: [],
      listColumnShowStation: [],
      dataMapNow: [],
    };
  },
  watch: {
    search(to, from) {
      if (this.items.length > 0) {
        this.page = 1;
        if (to.length > 0) {
          let newArr = this.searchData(this.items, to);
          if (newArr.length > 0) {
            this.filterItems = newArr;
            this.items = this.paginationData(this.page, this.perPage, newArr);
            this.totalRows = newArr.length;
          } else {
            this.filterItems = null;
            this.items = null;
            this.totalRows = 0;
          }
        } else {
          this.filterItems = null;
          this.items = this.paginationData(this.page, this.perPage, this.items);
          this.totalRows = this.items.length;
        }
      }
    },
    page(to, from) {
      if (this.filterItems) {
        this.items = this.paginationData(to, this.perPage, this.filterItems);
        this.totalRows = this.filterItems.length;
      } else {
        this.items = this.items
          ? this.paginationData(to, this.perPage, this.items)
          : null;
        this.totalRows = this.items.length;
      }
    },
  },
  methods: {
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
    flyToPoint(items) {
      this.$refs.formMapMultiPoint.flyPoint(
        items.StationLat,
        items.StationLong
      );
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
    convertBitToBoolean(value) {
      return !!value;
    },
    getDataDashboard() {
      aquacultureAPI
        .aquaDashboard()
        .then((val) => {
          this.dataDashboard = val.status ? val.data[0] : null;
          let array = this.dataDashboard.ListDetails;
          this.dataStation = array; //--> thêm mới

          this.stationArray = array;
          let latLngArray = [];
          array.forEach((val) => {
            latLngArray.push([
              parseFloat(val.StationLat),
              parseFloat(val.StationLong),
            ]);
          });
          this.latLng = latLngArray.length > 0 ? latLngArray : null;
          if (!this.item && this.dataDashboard.ListDetails.length > 0) {
            this.items = this.dataDashboard.ListDetails;
            this.items = this.items.map(
              ({ ListExtra, ListDeviceInfo, ListNode, ...item }) => {
                let arrNew = {
                  ...item,
                  DeviceInfoProperties: ListDeviceInfo,
                  ExtraProperties: ListExtra,
                  ListIndicator: this.dataDashboard.ListIndicator,
                  NodeProperties: ListNode,
                };
                arrNew.NodeProperties = arrNew.NodeProperties.map(
                  ({ ListMonitoring, ...y }) => {
                    let arrNewMonitor = {
                      ...y,
                      MonitoringProperties: ListMonitoring.map((monitor) => ({
                        ...monitor,
                        IndicatorCode: monitor.InfoCode,
                        IndicatorValue: monitor.InfoValue,
                        IndicatorName: monitor.InfoName,
                      })),
                    };
                    return {
                      ...arrNewMonitor,
                    };
                  }
                );
                return {
                  ...arrNew,
                };
              }
            );
            this.dataMapNow =
              this.items?.length > 0
                ? [
                    {
                      DataTypeName: "AQUA",
                      DataProperties: this.items,
                    },
                  ]
                : [];
            this.totalRows = this.dataDashboard.ListDetails.length;
            this.convertItems = this.paginationData(
              this.page,
              this.perPage,
              this.items
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timerLoadDashboard(time) {
      this.getDataDashboard();
    },
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
    getColumnStation(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          const arr = val.status ? val.data : [];
          const newArr = [];
          arr.forEach((item) => {
            if (item.ClName.toUpperCase() !== "SLNODE") {
              newArr.push(item);
            }
          });
          this.listColumnShowStation = newArr;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rowDblclicked(row) {
      this.dataForm = row;
      setTimeout(() => {
        this.$bvModal.show(`modal-detail-${row.StationID}`);
      });
    },
    resetChartDetail() {
      this.typeLoadData = "WEEK";
      this.dataForm = null;
      this.titleForm = null;
      this.dataChartStation = null;
      this.dataChartNode = null;
      //this.handleReloadData()
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 100);
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.timerLoadDashboard();
    // await this.getDataStation()
    await this.getColumnStation("Monitors");
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
    fieldsStation: function () {
      if (this.dataStation?.length > 0) {
        const objectKey = Object.keys(this.dataStation[0]);
        return handling.mergeTableAndData(
          objectKey,
          this.listColumnShowStation
        );
      }
      return [];
    },
  },
};
</script>

<style scoped>
.card-custom-system-info .card-title {
  margin: 0.7rem 0.7rem 0rem 0.7rem;
  font-size: 15px;
  font-weight: bold;
}

.card-custom-system-info .card-body {
  padding: 0;
}
.card-custom-map-mini-two .card-body {
  padding: 0;
}

.border-map-mini-two {
  width: 100%;
  height: 385px;
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}

/* .card-custom-map-mini .card-body {
  padding: 0;
}

.border-map-mini {
  width: 100%;
  height: 510px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.border-map-mini .map-control {
  height: 350px; */
/*  !*padding: .5rem;*!*/
/* } */
/*
.border-map-mini .list-station-control {
  height: 160px;
  padding: 1.5rem;
}  */

.history-control-station {
  height: 385px;
}

.history-control-station .card-body {
  padding: 0;
}

.history-control-station .card-body .custom-title-control {
  font-size: 15px;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #d7d7d7;
  width: 100%;
  font-weight: bold;
}

.history-control-station .card-body .custom-body-control {
  height: 338px;
}

.follow-list-station {
  height: 684px;
}

.show-list-custom {
  display: block;
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
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}
</style>
<style lang="scss">
.table-station-aqua {
  .table-responsive {
    margin-bottom: 0;
    border-bottom: 1px solid #f3f3f3;
  }
  .b-pagination {
    margin-bottom: 0;
  }
}
</style>
