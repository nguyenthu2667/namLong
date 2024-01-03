<template>
  <div v-if="data">
    <b-row>
      <b-col lg="4" class="mb-4">
        <gradient-with-radial-progress-card
          icon="fad fa-map-marker-alt ml-3 mt-3"
          :title="`${data.CabinetTotal} ${$t('dashboards.station1')}`"
          :detail="$t('dashboards.station-total')"
          :percent="100"
          :progressText="data.CabinetTotal"
        />
      </b-col>
      <b-col lg="4" class="mb-4">
        <gradient-with-radial-progress-card
          icon="fad fa-map-marker-check ml-3 mt-3"
          :title="`${data.CabinetNormal} ${$t('dashboards.station1')}`"
          :detail="$t('dashboards.station-active')"
          :percent="(data.CabinetNormal * 100) / data.CabinetTotal"
          :progressText="data.CabinetNormal + '/' + data.CabinetTotal"
        />
      </b-col>
      <b-col lg="4" class="mb-4">
        <gradient-with-radial-progress-card
          icon="fad fa-map-marker-exclamation ml-3 mt-3"
          :title="`${data.CabinetError} ${$t('dashboards.station1')}`"
          :detail="$t('dashboards.station-error')"
          :percent="(data.CabinetError * 100) / data.CabinetTotal"
          :progressText="data.CabinetError + '/' + data.CabinetTotal"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col xl="6" lg="6">
        <b-row>
          <b-col xl="12">
            <b-card no-body style="height: 385px">
              <multi-map-mini
                ref="multiMapMini"
                :data-map-now="dataMapNow"
                :object-data="objectData"
                :type="'waterway'"
              ></multi-map-mini>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col xl="6">
        <b-card class="history-control-station mb-4">
          <b-card-body>
            <div class="custom-title-control">
              <p class="d-inline">
                <i class="fad fa-history mr-2"></i>
                {{ $t("dashboards.history-warning") }}
              </p>
            </div>
            <div class="custom-body-control">
              <template
                v-if="
                  data.HistoriesProperties &&
                  data.HistoriesProperties.length > 0
                "
              >
                <b-table
                  :responsive="true"
                  :sticky-header="true"
                  :no-border-collapse="true"
                  :bordered="true"
                  :hover="true"
                  :items="data.HistoriesProperties"
                  :fields="fieldsHistory"
                  head-variant="light"
                  class="text-center text-small mb-0"
                  style="max-height: 338px"
                >
                  <template v-slot:cell(IsSchedule)="row">
                    <template v-if="row.item.IsSchedule === 1">
                      {{ $t("modal.auto") }}
                    </template>
                    <template v-else>
                      {{ $t("modal.manual") }}
                    </template>
                  </template>
                  <template v-slot:cell(CabinetStatus)="row">
                    <template v-if="row.item.CabinetStatus === 1">
                      <i style="font-size: 15px" class="fas fa-toggle-on"></i>
                    </template>
                    <template v-else>
                      <i style="font-size: 15px" class="fas fa-toggle-off"></i>
                    </template>
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
    <b-row>
      <b-col xl="12">
        <h5 class="text-muted">
          <strong>
            {{ $t("dashboards.monitor.list-station").toUpperCase() }}
          </strong>
        </h5>
      </b-col>
    </b-row>
    <b-row>
      <template v-if="itemsTable && itemsTable.length > 0">
        <b-col lg="12" class="mb-4">
          <b-row v-if="displayMode === 'thumb'" key="thumb">
            <b-colxx xxs="12" class="mb-3">
              <list-item :itemsTable="itemsTable" :objectData="objectData" />
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
    </b-row>
  </div>
</template>

<script>
import { timer } from "@/constants/config";
import handling from "@/constants/handling";
import waterwayAPI from "@/api/modules/waterwayAPI";
import AreaChartApex from "@/components/Charts/LineChartDashed";
import FollowStation from "./component/FollowStation";
import GradientWithRadialProgressCard from "@/components/Cards/GradientWithRadialProgressCard";
import systemAPI from "@/api/modules/systemAPI";
import ListItem from "./component/ListItem";
import InfoClearanceHeight from "./component/InfoClearanceHeight";
import MultiMapMini from "@/components/Map/MultiMapMini.vue";

export default {
  components: {
    "multi-map-mini": MultiMapMini,
    "area-chart-apex": AreaChartApex,
    "follow-station": FollowStation,
    "gradient-with-radial-progress-card": GradientWithRadialProgressCard,
    "list-item": ListItem,
    "info-clearance-height": InfoClearanceHeight,
  },
  data() {
    return {
      objectKey: null,
      itemsTable: null,
      listColumnShow: null,
      selectMode: "single",
      items: null,
      interval: null,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      menuRight: [],
      timer,
      data: null,
      selectedData: null,
      searchText: "",
      latLng: [],
      typeLoadData: "WEEK",
      dataChart: null,
      titleForm: null,
      dataForm: null,
      displayMode: "thumb",
      search: "",
      filterItems: null,
      convertItems: null,
      page: 1,
      perPage: 10,
      totalRows: 0,
      fieldsHistory: [
        {
          key: "StationName",
          label: this.$t("dashboards.station-name"),
          tdClass: "text-center font-weight-bold pl-3",
        },
        {
          key: "IndicatorName",
          label: this.$t("table.title.indicator-warning"),
          tdClass: "text-center font-weight-bold pl-3",
        },
        {
          key: "IndicatorValue",
          label: this.$t("table.title.value"),
          tdClass: "text-muted",
        },
        {
          key: "CreateTime",
          label: this.$t("dashboards.timer"),
          tdClass: "text-muted",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
        {
          key: "IndicatorValue",
          label: this.$t("table.title.dist"),
          tdClass: "text-muted",
        },
      ],
      dataMapNow: null,
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
            this.items
          );
          this.totalRows = this.items.length;
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
        this.convertItems = this.items
          ? this.paginationData(to, this.perPage, this.items)
          : null;
        this.totalRows = this.items.length;
      }
    },
  },
  methods: {
    getColumn(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          let newArr = [];
          this.listColumnShow = val.status
            ? val.data.forEach((item) => {
                val.data.forEach((item) => {
                  if (item.ClName.toUpperCase() !== "STATIONTOTAL") {
                    newArr.push(item);
                  }
                });
                this.listColumnShow = newArr;
              })
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
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
      this.$refs.formMapMultiPoint.flyPoint(items.Lat, items.Long);
    },
    showListStationConnect(id) {
      document.getElementById(id).classList.toggle("show-list-custom");
    },
    changeStation(station) {
      this.selectedData = station;
      this.getData(this.selectedData);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
    optionSearch(text) {
      if (text && text !== "") {
        let array = [];
        let regex = new RegExp(text, "i");
        this.data.forEach((val) => {
          if (val.WaterwayRouteName.search(regex) !== -1) {
            array.push(val);
          }
        });
        return array;
      } else {
        return [];
      }
    },
    getData() {
      waterwayAPI
        .waterWayDashboardFollow()
        .then((val) => {
          this.data = val.status ? val.data : null;
          if (!this.selectedData) {
            this.selectedData = this.data;
          }
          if (this.selectedData) {
            this.dataMapNow = [
              {
                DataTypeName: "WATERWAY",
                DataProperties: this.data.TotalProperties,
              },
            ];
            this.itemsTable = this.data ? this.data.TotalProperties : [];
            this.objectKey = this.data
              ? Object.keys(this.data.TotalProperties[0])
              : [];
            if (!this.data) {
              this.data = null;
            }
            if (
              this.data.TotalProperties &&
              this.data.TotalProperties.length > 0
            ) {
              let latLngArray = [];
              this.data.TotalProperties.forEach((val) => {
                latLngArray.push([parseFloat(val.Lat), parseFloat(val.Long)]);
              });
              this.latLng = latLngArray.length > 0 ? latLngArray : null;
              //search-pagination
              this.items = this.data.TotalProperties;
              this.totalRows = this.data.TotalProperties.length;
              this.convertItems = this.paginationData(
                this.page,
                this.perPage,
                this.data.TotalProperties
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
    timerLoadDashboard(time) {
      setTimeout(() => {
        this.timerLoadDashboard(time);
      }, time);
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getData();
  },
  destroyed() {
    clearInterval(this.interval);
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
    fields: function () {
      let newFields = handling.mergeTableAndData(
        this.objectKey,
        this.listColumnShow
      );
      return newFields;
    },
  },
};
</script>

<style scoped>
.card-custom-map-mini-two .card-body {
  padding: 0;
}

.border-map-mini-two {
  width: 100%;
  height: 385px;
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}
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
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
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
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
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
</style>
