<template>
  <div>
    <b-row v-if="data && data.length > 0">
      <b-col md="12" class="mb-4">
        <b-dropdown
          id="dropdown-form"
          ref="dropdown"
          left
          variant="empty"
          toggle-class="p-0"
          no-caret
          class="pb-1"
        >
          <template slot="button-content">
            <span v-b-toggle.collapse-header>
              <i class="fad fa-cog" style="font-size: 18px"></i>
            </span>
          </template>
          <b-dropdown-form>
            <b-form-input
              class="mt-1"
              id="search-input"
              type="search"
              size="sm"
              v-model="searchText"
              :placeholder="$t('panel.search-input-monitor')"
              style="min-width: 200px"
            ></b-form-input>
            <template v-if="searchText && searchText !== ''">
              <template v-if="optionSearch(searchText).length > 0">
                <p class="mt-3 mb-0 text-muted font-italic text-small">
                  {{ $t("panel.total") }}
                  {{ optionSearch(searchText).length }}
                  {{ $t("panel.result") }}
                </p>
              </template>
              <template v-else>
                <p class="mt-3 mb-0 text-muted font-italic text-small">
                  {{ $t("panel.non-data") }}
                </p>
              </template>
            </template>
            <template v-else>
              <p class="mt-3 mb-0 text-muted font-italic text-small">
                {{ $t("panel.total") }} {{ dataFollow.length }}
                {{ $t("panel.result") }}
              </p>
            </template>
          </b-dropdown-form>
          <b-dropdown-divider></b-dropdown-divider>
          <vue-perfect-scrollbar
            class="list-item-station-option"
            :settings="{ suppressScrollX: true, wheelPropagation: false }"
          >
            <template v-if="searchText && searchText !== ''">
              <b-dropdown-item
                v-for="(station, index) in optionSearch(searchText)"
                :key="index"
                @click="changeStation(station)"
              >
                <span class="item-station-option">
                  {{ station.DataTypeName }}
                </span>
              </b-dropdown-item>
            </template>
            <template v-else>
              <b-dropdown-item
                v-for="(station, index) in dataFollow"
                :key="index"
                @click="changeStation(station)"
              >
                <span class="item-station-option">
                  {{ station.DataTypeName }}
                </span>
              </b-dropdown-item>
            </template>
          </vue-perfect-scrollbar>
        </b-dropdown>
        <template v-if="selectedData">
          <span class="ml-2 h5 text-muted">
            <strong>{{ selectedData.DataTypeName }}</strong>
          </span>
        </template>
      </b-col>
      <b-col lg="4" class="mb-4">
        <gradient-with-radial-progress-card
          icon="fad fa-map-marker-alt ml-3 mt-3"
          :title="`${data[0].Total} ${$t('dashboards.station1')}`"
          :detail="$t('dashboards.station-total')"
          :percent="100"
          :progressText="data[0].Total"
        />
      </b-col>
      <b-col lg="4" class="mb-4">
        <gradient-with-radial-progress-card
          icon="fad fa-map-marker-check ml-3 mt-3"
          :title="`${data[0].Actived} ${$t('dashboards.station1')}`"
          :detail="$t('dashboards.station-active')"
          :percent="(data[0].Actived * 100) / data[0].Total"
          :progressText="data[0].Actived + '/' + data[0].Total"
        />
      </b-col>
      <b-col lg="4" class="mb-4">
        <gradient-with-radial-progress-card
          icon="fad fa-map-marker-exclamation ml-3 mt-3"
          :title="`${data[0].Error} ${$t('dashboards.station1')}`"
          :detail="$t('dashboards.station-error')"
          :percent="(data[0].Error * 100) / data[0].Total"
          :progressText="data[0].Error + '/' + data[0].Total"
        />
      </b-col>
      <b-col xl="6" lg="6">
        <b-row>
          <b-col xl="12">
            <b-card class="card-custom-map-mini-two mb-4">
              <div class="border-map-mini-two">
                <multi-map-mini
                  :type="'WATER'"
                  :dataMapNow="dataMapNow"
                  ref="multiMapMini"
                ></multi-map-mini>
              </div>
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
              <template v-if="dataHistory && dataHistory.length > 0">
                <b-table
                  :responsive="true"
                  :sticky-header="true"
                  :no-border-collapse="true"
                  :bordered="true"
                  :hover="true"
                  :items="dataHistory"
                  :fields="fieldsHistory"
                  head-variant="light"
                  class="text-center text-small mb-0"
                  style="max-height: 338px"
                ></b-table>
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
      <b-col xl="12">
        <h5 class="text-muted">
          <strong>
            {{ $t("dashboards.monitor.list-station").toUpperCase() }}
          </strong>
        </h5>
      </b-col>

      <template v-if="convertItems && convertItems.length > 0">
        <b-col lg="12" class="mb-4">
          <div class="list-monitor-grid">
            <div
              v-for="(item, index) in convertItems"
              :id="item.StationID"
              :key="index"
            >
              <list-item
                :data="item"
                :objectData="objectData"
                :dataMapNow="dataMapNow"
              />
            </div>
          </div>
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
import systemAPI from "@/api/modules/systemAPI";
import { timer } from "@/constants/config";

import handling from "@/constants/handling";

import monitorAPI from "@/api/modules/monitorAPI";
import notificationAPI from "@/api/modules/notificationAPI";
import FollowStation from "./component/FollowStation";
import GradientWithRadialProgressCard from "@/components/Cards/GradientWithRadialProgressCard";
import ListItem from "./component/ListItem";
import MultiMapMini from "@/components/Map/MultiMapMini.vue";

export default {
  components: {
    "follow-station": FollowStation,
    "gradient-with-radial-progress-card": GradientWithRadialProgressCard,
    "list-item": ListItem,
    "multi-map-mini": MultiMapMini,
  },
  data() {
    return {
      displayMode: "thumb",
      search: "",
      filterItems: null,
      convertItems: null,
      page: 1,
      perPage: 21,
      totalRows: 0,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      dataFollow: null,
      data: null,
      selectedData: null,
      searchText: "",
      listStation: null,
      latLng: [],
      dataHistory: [],
      fieldsHistory: [
        {
          key: "Body",
          label: this.$t("report.warning"),
          tdClass: "font-weight-bold text-muted text-left pl-4",
        },
        {
          key: "CreateDate",
          label: this.$t("dashboards.timer"),
          tdClass: "font-weight-bold text-muted",
        },
      ],
      typeLayer: null,
      rangeColorValues: null,
      dataMapNow: null,
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
  },
  watch: {
    // search(to, from) {
    //   if (this.items.length > 0) {
    //     this.page = 1
    //     if (to.length > 0) {
    //       let newArr = this.searchData(this.items, to)
    //       if (newArr.length > 0) {
    //         this.filterItems = newArr
    //         this.convertItems = this.paginationData(
    //           this.page,
    //           this.perPage,
    //           newArr,
    //         )
    //         this.totalRows = newArr.length
    //       } else {
    //         this.filterItems = null
    //         this.convertItems = null
    //         this.totalRows = 0
    //       }
    //     } else {
    //       this.filterItems = null
    //       this.convertItems = this.paginationData(
    //         this.page,
    //         this.perPage,
    //         this.items,
    //       )
    //       this.totalRows = this.items.length
    //     }
    //   }
    // },
    // page(to, from) {
    //   if (this.filterItems) {
    //     this.convertItems = this.paginationData(
    //       to,
    //       this.perPage,
    //       this.filterItems,
    //     )
    //     this.totalRows = this.filterItems.length
    //   } else {
    //     this.convertItems = this.items
    //       ? this.paginationData(to, this.perPage, this.items)
    //       : null
    //     this.totalRows = this.items.length
    //   }
    // },
  },
  methods: {
    resetChartDetail() {
      this.typeLoadData = "DAY";
      this.dataForm = null;
      this.dataChart = null;
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
      this.$refs.formMapMultiPoint.flyPoint(
        items.StationLat,
        items.StationLong
      );
    },
    showListStationConnect(id) {
      document.getElementById(id).classList.toggle("show-list-custom");
    },
    changeStation(station) {
      this.selectedData = station;
      this.getData(this.selectedData);
      this.getHistory(this.selectedData);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
    optionSearch(text) {
      if (text && text !== "") {
        let array = [];
        let regex = new RegExp(text, "i");
        this.dataFollow.forEach((val) => {
          if (val.DataTypeName.search(regex) !== -1) {
            array.push(val);
          }
        });
        return array;
      } else {
        return [];
      }
    },
    getOption() {
      monitorAPI
        .monitorDataCodeOptions()
        .then((val) => {
          this.dataFollow = val.status ? val.data.reverse() : [];
          if (!this.selectedData) {
            this.selectedData = this.dataFollow[0];
          }
          this.getData(this.selectedData);
          this.getHistory(this.selectedData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHistory(selected) {
      this.dataHistory = [];
      let body = {
        GeoCode: selected.DataCode,
      };
      notificationAPI
        .getTop30(body)
        .then((val) => {
          this.dataHistory = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData(selected) {
      let body = {
        DataCode: selected.DataCode,
      };
      monitorAPI
        .monitorDashboardFollow(body)
        .then((val) => {
          this.data = val.status ? val.data : [];
          this.dataMapNow = this.data
            ? [
                {
                  DataTypeName: "WATER",
                  DataProperties: this.data[0].listStation,
                },
              ]
            : [];

          if (this.data && this.data.length > 0) {
            this.latLng = [];
            if (
              this.data[0].listStation &&
              this.data[0].listStation.length > 0
            ) {
              this.typeLayer = this.data[0].listStation[0].GeoCode;
              this.data[0].listStation.forEach((item) => {
                if (item.StationLat && item.StationLong) {
                  this.latLng.push([
                    item.StationLat,
                    item.StationLong,
                    item.StatusColor,
                  ]);
                }
              });

              //search-pagination
              this.items = this.data[0].listStation;
              this.totalRows = this.data[0].listStation.length;
              this.convertItems = this.paginationData(
                this.page,
                this.perPage,
                this.data[0].listStation
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
      this.getOption();
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.timerLoadDashboard(this.timer * 10);
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

.list-monitor-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
}

@media only screen and (max-width: 46.1875em) {
  .list-monitor-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
