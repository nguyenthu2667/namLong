<template>
  <div style="cursor: pointer" v-if="objectData">
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
          <b-col xl="7" lg="6">
            <b-row>
              <b-col xl="12">
                <b-card class="card-custom-map-mini-two mb-4">
                  <div class="border-map-mini-two">
                    <multi-location-component
                      :lat-lng="latLng"
                      :type-item="'agri'"
                      ref="formMapMultiPoint"
                    ></multi-location-component>
                  </div>
                </b-card>
              </b-col>
              <b-col xl="12">
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
          <b-col xl="5" lg="6">
            <b-card class="mb-4" :title="$t('dashboards.follow-station')">
              <vue-perfect-scrollbar
                class="scroll follow-list-station"
                :settings="{ suppressScrollX: true, wheelPropagation: false }"
              >
                <follow-station
                  v-for="(value, index) in dataDashboard.ListDetails"
                  :value="value"
                  :key="index"
                  @fly-to-point="flyToPoint"
                />
              </vue-perfect-scrollbar>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col xl="12">
        <h5 class="text-muted">
          <strong>{{ $t("dashboards.aqua-list").toUpperCase() }}</strong>
        </h5>
      </b-col>
      <b-col xl="12">
        <div class="mb-2">
          <b-button
            variant="empty"
            class="pt-0 pl-0 d-inline-block d-md-none"
            v-b-toggle.displayOptions
          >
            <i class="simple-icon-arrow-down align-middle" />
          </b-button>
          <b-collapse id="displayOptions" class="d-md-block">
            <div class="d-block d-md-inline-block pt-1">
              <div
                class="search-sm d-inline-block float-md-left mr-1 align-top"
              >
                <b-input
                  :placeholder="$t('form.customer-name')"
                  v-model="search"
                />
              </div>
            </div>
          </b-collapse>
        </div>
        <div class="separator mb-3" />
      </b-col>
      <template v-if="convertItems && convertItems.length > 0">
        <b-col lg="12" class="mb-4">
          <b-row v-if="displayMode === 'thumb'" key="thumb">
            <b-colxx
              xxs="12"
              class="mb-3"
              v-for="(item, index) in convertItems"
              :id="item.StationID"
              :key="index"
            >
              <list-item
                :indexStation="index"
                :data="item"
                :objectData="objectData"
                @get-data-dashboard="getDataDashboard"
              />
            </b-colxx>
          </b-row>
          <b-row>
            <b-colxx xxs="12">
              <b-pagination
                :total-rows="totalRows"
                v-model="page"
                :per-page="perPage"
                size="sm"
                align="center"
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
import systemAPI from "@/api/modules/systemAPI";
import agricultureAPI from "@/api/modules/agricultureAPI";
import { defaultRegionCode } from "@/constants/config";
import { listRegion } from "@/data/latlngRegions";
import MultiLocationComponent from "@/components/Map/MultiLocationComponent";
import ListWithLocationItem from "@/components/Listing/ListWithLocationItem";
import handling from "@/constants/handling";
import AreaChartApex from "@/components/Charts/AreaChartApex";
import GradientWithRadialProgressCard from "@/components/Cards/GradientWithRadialProgressCard";
import FollowStation from "./component/FollowStation";
import ListItem from "./component/ListItem";

export default {
  components: {
    "multi-location-component": MultiLocationComponent,
    "list-with-location-item": ListWithLocationItem,
    "area-chart-apex": AreaChartApex,
    "gradient-with-radial-progress-card": GradientWithRadialProgressCard,
    "follow-station": FollowStation,
    "list-item": ListItem,
  },
  data() {
    return {
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
      convertItems: null,
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
      agricultureAPI
        .agriDashboard()
        .then((val) => {
          this.dataDashboard = val.status ? val.data[0] : null;
          let array = this.dataDashboard.ListDetails;
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
            this.totalRows = this.dataDashboard.ListDetails.length;
            this.convertItems = this.paginationData(
              this.page,
              this.perPage,
              this.dataDashboard.ListDetails
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timerLoadDashboard(time) {
      this.getDataDashboard();
      setTimeout(() => {
        this.timerLoadDashboard(time);
      }, time);
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
  },
  async created() {
    await this.getListMenuRight();
    await this.timerLoadDashboard(this.timer * 120);
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
