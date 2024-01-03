<template>
  <div v-if="objectData">
    <b-row v-if="data">
      <b-col lg="12">
        <b-row class="mb-2">
          <b-col md="12" lg="3">
            <weather-city :pHeight="440"></weather-city>
          </b-col>
          <b-col md="12" lg="4" class="mb-3 mt-3 mt-lg-0" style="height: 440px">
            <b-card no-body style="min-height: 214px; height: 100%" class="p-3">
              <div>
                <div
                  class="title-card text-leaft fz-title"
                  style="margin-bottom: 8px !important"
                >
                  <strong>{{ $t("fire.information-area-install") }}</strong>
                </div>
                <div class="d-flex gap-md">
                  <div class="item-card mb-3">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/fire-icon/firesensorRooms.png')
                          "
                          style="height: 30px; width: 30px"
                        ></b-img>
                        <span class="fz-md">{{
                          data.SensorRoomsDescription
                        }}</span>
                      </div>
                      <div class="fz-small-icon">
                        {{ data.SensorRooms }}
                      </div>
                    </div>
                  </div>
                  <div class="item-card mb-3">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/fire-icon/firestationSum.png')
                          "
                          style="height: 30px; width: 30px"
                        ></b-img>
                        <span class="fz-md">{{
                          data.StationSumDescription
                        }}</span>
                      </div>
                      <div class="fz-small-icon">
                        {{ data.StationSum }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-flex gap-md">
                  <div class="item-card mb-3">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/fire-icon/firestationDisconnected.png')
                          "
                          style="height: 30px; width: 30px"
                        ></b-img>
                        <span class="fz-md">{{
                          data.StationDisconnectedDescription
                        }}</span>
                      </div>
                      <div class="fz-small-icon">
                        {{ data.StationDisconnected }}
                      </div>
                    </div>
                  </div>

                  <div class="item-card mb-3">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/fire-icon/firespeakerCount.png')
                          "
                          style="height: 30px; width: 30px"
                        ></b-img>
                        <span class="fz-md">{{
                          data.SpeakerCountDescription
                        }}</span>
                      </div>
                      <div class="fz-small-icon">
                        {{ data.SpeakerCount }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="separator mb-3"></div>
              <div>
                <div
                  class="title-card text-leaft fz-title"
                  style="margin-bottom: 8px !important"
                >
                  <strong>{{ $t("fire.information-site-cabinet") }}</strong>
                </div>

                <div class="d-flex gap-md">
                  <div class="item-card mb-3">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/fire-icon/firespeakerRooms.png')
                          "
                          style="height: 30px; width: 30px"
                        ></b-img>
                        <span class="fz-md">{{
                          data.SpeakerRoomsDescription
                        }}</span>
                      </div>
                      <div class="fz-small-icon">
                        {{ data.SpeakerRooms }}
                      </div>
                    </div>
                  </div>
                  <div class="item-card mb-3">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/fire-icon/firespeakerFire.png')
                          "
                          style="height: 30px; width: 30px"
                        ></b-img>
                        <span class="fz-md">{{
                          data.SpeakerFireDescription
                        }}</span>
                      </div>
                      <div class="fz-small-icon">
                        <span>{{ data.SpeakerFire }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-flex gap-md">
                  <div class="item-card mb-3">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/fire-icon/firespeakerError.png')
                          "
                          style="height: 30px; width: 30px"
                        ></b-img>
                        <span class="fz-md">{{
                          data.SpeakerErrorDescription
                        }}</span>
                      </div>
                      <div class="fz-small-icon">
                        <span>{{ data.SpeakerError }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="item-card mb-3">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/fire-icon/firespeakerPin.png')
                          "
                          style="height: 30px; width: 30px"
                        ></b-img>
                        <span class="fz-md">
                          {{ data.SpeakerPinDescription }}</span
                        >
                      </div>
                      <div class="fz-small-icon">
                        {{ data.SpeakerPin }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="separator mb-3"></div>
              <div>
                <div
                  class="title-card text-leaft mb-2 fz-title"
                  style="margin-bottom: 8px !important"
                >
                  <strong>{{ $t("fire.information-equipment-fire") }}</strong>
                </div>
                <div class="d-flex gap-md">
                  <div class="item-card mb-3">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/fire-icon/firesensorCount.png')
                          "
                          style="height: 30px; width: 30px"
                        ></b-img>
                        <span class="fz-md">{{
                          data.SensorCountDescription
                        }}</span>
                      </div>
                      <div class="fz-small-icon">
                        {{ data.SensorCount }}
                      </div>
                    </div>
                  </div>
                  <div class="item-card mb-3">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/fire-icon/firesensorFire.png')
                          "
                          style="height: 30px; width: 30px"
                        ></b-img>
                        <span class="fz-md">{{
                          data.SensorFireDescription
                        }}</span>
                      </div>
                      <div class="fz-small-icon">
                        {{ data.SensorFire }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex gap-md">
                  <div class="item-card mb-3">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/fire-icon/firesensorError.png')
                          "
                          style="height: 30px; width: 30px"
                        ></b-img>
                        <span class="fz-md">{{
                          data.SensorErrorDescription
                        }}</span>
                      </div>
                      <div class="fz-small-icon">
                        {{ data.SensorError }}
                      </div>
                    </div>
                  </div>
                  <div class="item-card mb-3">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex align-items-center">
                        <b-img
                          :src="
                            require('@/assets/img/fire-icon/firesensorPin.png')
                          "
                          style="height: 30px; width: 30px"
                        ></b-img>
                        <span class="fz-md">
                          {{ data.SensorPinDescription }}</span
                        >
                      </div>
                      <div class="fz-small-icon">
                        {{ data.SensorPin }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-card>
          </b-col>
          <b-col md="12" lg="5">
            <b-card style="height: 440px">
              <div>
                <template v-if="historys && historys.length > 0">
                  <b-table
                    class="history-dashboard-table text-center text-small mb-0 fire-sticky-header"
                    :responsive="true"
                    :sticky-header="true"
                    :no-border-collapse="true"
                    :bordered="true"
                    :hover="true"
                    :items="historys"
                    :fields="fieldsHistory"
                    head-variant="light"
                  >
                  </b-table>
                </template>
                <template v-else>
                  <p class="p-3 text-muted text-small font-italic">
                    {{ $t("map.no-data") }}
                  </p>
                </template>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="12">
        <b-row>
          <b-col md="12" lg="5">
            <h5 class="text-muted">
              <strong>
                {{ $t("form.map").toUpperCase() }}
              </strong>
            </h5>
            <b-row>
              <b-col xl="12">
                <b-card class="mb-2" style="height: 600px">
                  <div class="border-map-mini-two">
                    <multi-map-mini
                      ref="multiMapMini"
                      :data-map-now="dataMapNow"
                    ></multi-map-mini>
                  </div>
                </b-card>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="12" lg="7">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="text-muted">
                <strong>
                  {{ $t("dashboards.apartment-list").toUpperCase() }}
                </strong>
              </h5>
              <div class="mb-2">
                <div
                  class="search-sm d-inline-block float-md-left mr-1 align-top fire-search"
                >
                  <b-input
                    :placeholder="$t('fire.customer-name')"
                    v-model="search"
                  />
                </div>
              </div>
            </div>
            <div class="separator mb-3 mt-2" />
            <template v-if="convertItems && convertItems.length > 0">
              <div
                class="mt-2 mb-4"
                style="max-height: 600px; overflow-x: hidden; overflow-y: auto"
              >
                <div
                  class="mb-3"
                  v-for="(item, index) in convertItems"
                  :key="index"
                  :id="item.ID"
                >
                  <list-item
                    :key="item.ID"
                    :data="item"
                    :accessWrite="objectData.accessWrite"
                    :selected-data="handleSelect"
                    :objectData="objectData"
                    @emitFlyFireDashboard="emitFlyFireDashboard"
                  />
                </div>
                <div>
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
                </div>
              </div>
            </template>
            <template v-else>
              <b-col lg="12" class="mb-4">
                <p class="text-muted text-small font-italic">
                  {{ $t("map.no-data") }}
                </p>
              </b-col>
            </template>
          </b-col>
        </b-row>
      </b-col>
      <!-- </b-card> -->
    </b-row>
  </div>
</template>
<script>
import handling from "@/constants/handling";
import fireAPI from "@/api/modules/fireAPI";
import systemAPI from "@/api/modules/systemAPI";
import ListItem from "./component/ListItem";
import WeatherCity from "@/components/Cards/Weather";

import MultiMapMini from "@/components/Map/MultiMapMini";
export default {
  components: {
    "list-item": ListItem,
    "multi-map-mini": MultiMapMini,
    "weather-city": WeatherCity,
  },
  data() {
    return {
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer: 500,
      selectMode: "single",
      menuRight: [],
      selectedItems: [],
      data: null,
      page: 1,
      perPage: 10,
      totalRows: 0,
      search: "",
      filterItems: null,
      convertItems: null,
      latLng: [],
      typeLayer: null,
      dataMapNow: null,
      historys: [],
      fieldsHistory: [
        {
          key: "StatusData",
          label: "Trạng thái",
          tdClass: "text-left font-weight-bold pl-3",
          sortable: true,
        },
        {
          key: "LocalName",
          label: "Tên",
          tdClass: "text-left font-weight-bold pl-3",
          sortable: true,
        },
        {
          key: "StartTime",
          label: "Bắt đầu",
          tdClass: "text-muted text-left",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
          sortable: true,
        },
        {
          key: "FinishTime",
          label: "Kết thúc",
          tdClass: "text-muted text-left",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
          sortable: true,
        },
      ],
    };
  },
  methods: {
    emitFlyFireDashboard(data) {
      this.$refs.multiMapMini.flyToPoint(data);
    },
    handleSelect(value) {
      this.selectedItems = this.items.filter((item) => item.ID === value);
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
    rowSelected(data) {
      this.selectedItems = data;
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 3000,
      });
    },
    getData() {
      fireAPI
        .getDashboard()
        .then((val) => {
          this.data = val.status ? val.data.Dashboards[0] : [];
          if (this.data) {
            this.dataMapNow = [
              {
                DataTypeName: "FIRE",
                DataProperties: val.data.ListLocations,
              },
            ];
          }
          if (val.data.ListLocations && val.data.ListLocations.length > 0) {
            this.latLng = [];
            this.typeLayer = val.data.ListLocations[0].GeoCode;
            val.data.ListLocations.forEach((item) => {
              if (item.Lat && item.Long) {
                this.latLng.push([item.Lat, item.Long, item.StatusColor]);
              }
            });
          }
          //search
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data.ListLocations)
            : [];
          if (this.search.length > 0) {
            let newArr = [];
            this.items.forEach((item) => {
              this.filterItems.forEach((ele) => {
                if (item.ID === ele.ID) {
                  newArr.push(item);
                }
              });
              this.convertItems = newArr;
            });
          } else {
            this.filterItems = null;
            this.convertItems = this.paginationData(
              this.page,
              this.perPage,
              this.items
            );
            this.totalRows = this.items.length;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHistorys() {
      fireAPI
        .getHistory()
        .then((val) => {
          this.historys = val.status ? val.data : [];
        })
        .catch((err) => console.log(err));
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
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getData();
    await this.getHistorys();
    this.intervalTime = setInterval(() => {
      this.getData();
      this.getHistorys();
    }, this.timer * 6);
  },
  watch: {
    "$i18n.locale"(to, from) {
      if (from !== to) {
        this.getData();
        this.getHistorys();
      }
    },
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
  mounted() {
    setTimeout(() => {
      if (this.columnAdd) {
        let obj = {};
        for (let i = 0; i < this.columnAdd.length; i++) {
          let key = this.columnAdd[i]["ClName"];
          if (
            key.toUpperCase().search("NOTE") === -1 &&
            key.toUpperCase().search("DESCRIPTION") === -1
          ) {
            obj[key] = null;
          }
        }
        this.stateForm = obj;
      }
    }, 500);
  },
};
</script>
<style>
.box_header .card-body {
  padding: 10px;
}
.history-dashboard-table .table th {
  white-space: nowrap;
}

.fire-sticky-header > table > thead > tr > th.position-relative {
  position: sticky !important;
}
</style>
<style scoped>
.separator {
  border-bottom: 1px solid #d7d7d7;
}

.fire-search {
  width: 280px;
}

.fire-sticky-header {
  max-height: 400px !important;
}
.border-map-mini-two {
  height: 100%;
  width: 100%;
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}
.box_header-icon {
  width: 80px;
  height: 70px;
}
.box_header-value {
  color: hsl(185 31% 15%);
  font-size: 40px;
  font-weight: 700;
  text-align: center;
}
.box_header-bottom {
  color: hsl(185 31% 15%);
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list_item {
  padding: 10px;
  background: #f3f3f3;
  font-size: 15px;
  border-radius: 5px;
}

.fz-md {
  font-size: 14px;
  font-weight: 600;
}

.fz-small-icon {
  font-size: 16px;
  font-weight: 700;
}

.fz-title {
  font-size: 15px;
  font-weight: 700;
}

.item-card {
  width: 50%;
}

.gap-md {
  gap: 10px;
}

/* Mobile: width < 740px  */
@media only screen and (max-width: 46.1875em) {
  .fire-search {
    width: 175px;
  }
}
</style>
