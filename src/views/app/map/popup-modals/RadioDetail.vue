<template>
  <div>
    <b-tabs fill>
      <b-tab title="THÔNG TIN CHI TIẾT" style="height: 80vh">
        <b-row class="mt-3">
          <b-col lg="12" md="12" class="text-center">
            <h4>
              <strong>{{ dataModal.StationName.toUpperCase() }}</strong>
            </h4>
          </b-col>
          <b-col lg="12" md="12" class="text-center" style="font-weight: 600">
            <span class="mr-2">
              <i
                :class="
                  dataModal.StatusColor.toUpperCase() == 'RED'
                    ? `fas fa-circle led-red`
                    : `fas fa-circle`
                "
                :style="`color:${dataModal.StatusColor}`"
              ></i>
              {{ dataModal.StatusName }}
            </span>
            <span class="mr-2">
              <i class="fad fa-map-marker-alt"></i>
              <span class="text-muted"> {{ dataModal.StationAddress }}</span>
            </span>
            <span class="mr-2">
              <i class="fad fa-calendar"></i>
              <span class="text-primary">
                {{ dataModal.UpdateTime }}
              </span>
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col lg="5" class="mb-2">
            <div
              class="title-card mb-2 bg-primary p-1 pl-2"
              style="font-size: 14px; font-weight: 600"
            >
              <span v-if="dataModal.LastTime && dataModal.LastTime.length > 0"
                >Đang trình chiếu
                {{ dataModal.LastTime[0].BroadcastName }}
              </span>
            </div>
            <!-- v-if="type == 'LINK'" -->
            <AudioPlayerList
              :height="'179px'"
              :data="audioList"
            ></AudioPlayerList>
          </b-col>
          <b-col lg="7" class="mb-2">
            <div
              class="title-card mb-2 bg-primary p-1 pl-2"
              style="font-size: 14px; font-weight: 600"
            >
              <span>Chi tiết giám sát</span>
            </div>
            <b-table
              thead-class="d-none"
              responsive
              :fields="fieldsIndicator"
              :items="dataIndicator"
              bordered
            ></b-table>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <h5 class="text-muted mb-2">
              <strong> DANH SÁCH LỊCH PHÁT </strong>
            </h5>
            <div class="separator" />
          </b-col>
          <b-col lg="12">
            <dynamic-table
              v-if="dataTableList.length > 0"
              ref="tableDynamicPopup"
              :field-table="fieldsTableList"
              :data-table="dataTableList"
              :bordered="true"
              :isSearch="true"
              @dbclick="handleDbclickInfo"
            ></dynamic-table>
            <template v-else>
              <div class="text-center text-muted mt-4">
                <strong> {{ $t("panel.non-data") }}</strong>
              </div>
            </template>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="LỊCH SỬ PHÁT SÓNG" style="height: 80vh">
        <b-row class="mt-3">
          <b-col lg="12" class="d-flex">
            <b-button
              size="sm"
              :variant="selectedDate == 'Day' ? 'primary' : 'outline-primary'"
              class="cus-btn"
              @click="changeTypeDateSelected('Day')"
              >Trong ngày
            </b-button>
            <b-button
              size="sm"
              :variant="selectedDate == 'Week' ? 'primary' : 'outline-primary'"
              class="cus-btn"
              @click="changeTypeDateSelected('Week')"
              >Trong tuần
            </b-button>
            <b-button
              size="sm"
              :variant="selectedDate == 'Month' ? 'primary' : 'outline-primary'"
              class="cus-btn"
              @click="changeTypeDateSelected('Month')"
              >Trong tháng
            </b-button>
            <b-button
              size="sm"
              :variant="selectedDate == 'Year' ? 'primary' : 'outline-primary'"
              class="cus-btn"
              @click="changeTypeDateSelected('Year')"
              >Trong năm
            </b-button>
            <b-button
              size="sm"
              :variant="selectedDate == 'Date' ? 'primary' : 'outline-primary'"
              class="cus-btn"
              @click="changeTypeDateSelected('Date')"
              >Khoảng thời gian
            </b-button>
            <div v-show="selectedDate == 'Date' ? true : false" class="mr-1">
              <span>Từ ngày </span>
              <b-form-datepicker
                v-model="fromDate"
                locale="vn"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                class="text-center"
              />
            </div>
            <div v-show="selectedDate == 'Date' ? true : false" class="mr-1">
              <span>Đến ngày </span>
              <b-form-datepicker
                v-model="toDate"
                locale="vn"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                class="text-center"
              />
            </div>
          </b-col>
          <b-col lg="12">
            <div class="d-flex justify-content-between">
              <div class="d-none d-sm-block" style="padding-top: 15px">
                {{ $t("form.total") }}:
                <strong>{{ dataHistoryPlay.length }}</strong>
                {{ $t("form.result").toLowerCase() }}
              </div>
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
            </div>

            <div class="separator mb-2" />
          </b-col>
          <b-col lg="12">
            <b-row>
              <template v-for="(item, i) in dataHistoryPlay">
                <b-col lg="6" :key="i" class="mb-4">
                  <b-row>
                    <b-col lg="6">
                      <AudioPlayerList
                        :height="'140px'"
                        :data="[
                          {
                            name: 'Audio',
                            url: item.Link,
                          },
                        ]"
                        :showListMenu="false"
                      ></AudioPlayerList>
                    </b-col>
                    <b-col lg="6" class="p-0">
                      <div style="font-size: 15px">
                        <strong>{{ item.OName }}</strong>
                      </div>
                      <div>
                        <b-badge
                          :style="'background:#d7d7d7!important;font-size:88%;color:black'"
                        >
                          Bản tin
                        </b-badge>
                      </div>
                      <div>
                        <span
                          >Số lần phát: <b>{{ item.ViewNo }}</b></span
                        >
                      </div>
                      <div>
                        <span
                          >Thời gian phát: <b>{{ item.TimeShow }}</b></span
                        >
                      </div>
                      <div>
                        <span
                          >Phát lần đầu:
                          <b> {{ convertDateTime(item.FirstTime) }}</b></span
                        >
                      </div>
                      <div>
                        <span
                          >Phát lần gần đây:
                          <b> {{ convertDateTime(item.LastTime) }}</b></span
                        >
                      </div>
                    </b-col>
                  </b-row>
                </b-col>
              </template>
            </b-row>
          </b-col>
          <!-- <b-col class="text-center text-muted text-small font-italic">
            {{ $t('map.no-data') }}
          </b-col> -->
        </b-row>
      </b-tab>
      <b-tab title="HÌNH ẢNH THIẾT BỊ" style="height: 80vh">
        <b-row v-if="dataImages && dataImages.length > 0" class="mt-3">
          <template v-for="(img, index) in dataImages">
            <b-col lg="4 mb-2" :key="index">
              <div style="height: 250px">
                <b-img
                  v-img:group
                  style="width: 100%; height: 100%"
                  :src="img.ImageLink"
                  alt="Image"
                ></b-img>
              </div>
              <span
                class="p-1 text-center"
                style="
                  font-weight: 600;
                  width: 100px;
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  background: #000;
                  color: #fff;
                  border: 1px solid #d7d7d7;
                "
                >Hình {{ index + 1 }}</span
              >
            </b-col>
          </template>
        </b-row>
        <b-row v-else class="mt-3">
          <b-col class="text-center text-muted text-small font-italic">
            {{ $t("map.no-data") }}
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
    <b-modal
      id="modal-info"
      name="modal-info"
      :size="'xl'"
      ok-only
      centered
      scrollable
      @hide="resetModal"
      hide-header
      hide-footer
    >
      <radio-info v-if="dataInfo" :data="dataInfo"> </radio-info>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";
import AudioPlayerList from "@/components/Audio/AudioPlaylist.vue";
import DynamicTable from "@/components/Table/DynamicTable";
import radioAPI from "@/api/modules/radioAPI";
import RadioInfo from "../../dashboards/radio/component/RadioInfo.vue";

export default {
  props: ["dataMapNow", "dataParent", "objectData"],
  name: "radio-popup",
  components: {
    AudioPlayerList,
    "dynamic-table": DynamicTable,
    "radio-info": RadioInfo,
  },
  data() {
    return {
      dataModal: this.dataParent ?? null,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      geoCode: "SmartRadio",
      //ảnh lắp đặt
      dataImages: [],
      //chi tiết giám sát
      fieldsIndicator: [
        {
          key: "titleA",
          stickyColumn: true,
          isRowHeader: true,
          tdClass: "bg-light",
        },
        "valueA",
        {
          key: "titleB",
          stickyColumn: true,
          isRowHeader: true,
          tdClass: "bg-light",
        },
        "valueB",
      ],
      //danh sách lịch phát
      keyStringTableList: "RadioSchedules",
      colTypes: null,
      fieldsTableList: null,
      type: null,
      //tab-history
      fromDate: moment(new Date()).format("YYYY-MM-DD"),
      toDate: moment(new Date()).format("YYYY-MM-DD"),
      totalRows: 2,
      perPage: 10,
      currentPage: 1,
      selectedDate: "Day",
      dataHistoryPlay: [],
      dataInfo: null,
    };
  },
  computed: {
    dataIndicator() {
      let arr = [
        {
          titleA: "Hoạt động CPU (%)",
          valueA: this.dataModal.CpuPerformance ?? "không có dữ liệu",
          titleB: "Chu kỳ dữ liệu",
          valueB: this.dataModal.SessionData ?? "không có dữ liệu",
        },
        {
          titleA: "Nhiệt độ CPU (℃)",
          valueA: this.dataModal.CpuTemperature ?? "không có dữ liệu",
          titleB: "Tín hiệu 4G",
          valueB: this.dataModal.Signal4G ?? "không có dữ liệu",
        },
        {
          titleA: "RAM",
          valueA: this.dataModal.Memory ?? "không có dữ liệu",
          titleB: "Cường độ dòng điện",
          valueB: this.dataModal.Amperage_mA ?? "không có dữ liệu",
        },
        {
          titleA: "Bộ nhớ",
          valueA: this.dataModal.Storage ?? "không có dữ liệu",
          titleB: "Hiệu điện thế",
          valueB: this.dataModal.Voltage_V ?? "không có dữ liệu",
        },
      ];
      return arr;
    },
    audioList() {
      if (
        this.dataModal.LastTime?.length > 0 &&
        this.dataModal.LastTime[0].BroadcastDescription
      ) {
        if (this.dataModal.LastTime[0].MediaType.toUpperCase() == "LINK") {
          this.type = "LINK";
        }
        return this.dataModal.LastTime[0].BroadcastDescription.split(";").map(
          (e, i) => ({
            name: "Audio " + i,
            url: e,
          })
        );
      } else {
        return [];
      }
    },
    dataTableList() {
      if (this.dataModal.Schedules?.length > 0 && this.colTypes?.length > 0) {
        let items = this.dataModal.Schedules;
        let keysTableList = Object.keys(items[0]);
        this.fieldsTableList = handling.mergeKeyDynamic(
          keysTableList,
          this.colTypes
        );
        return items;
      } else {
        return [];
      }
    },
  },
  async created() {
    await this.getColTypes(this.keyStringTableList);
    await this.getImages();
    await this.getDataHistoryPlay();
  },
  watch: {
    fromDate() {
      this.getDataHistoryPlay();
    },
    toDate() {
      this.getDataHistoryPlay();
    },
    dataParent(val) {
      this.dataModal = { ...val };
    },
    dataMapNow(arr) {
      arr.forEach((modul) => {
        if (
          modul.DataTypeName.toUpperCase() ==
          this.dataParent.moduleType.toUpperCase()
        ) {
          modul.DataProperties.forEach((item) => {
            if (item.StationID == this.dataParent.StationID) {
              this.dataModal = { ...this.dataParent, ...item };
            }
          });
        }
      });
    },
  },
  methods: {
    resetModal() {
      this.dataInfo = null;
    },
    handleDbclickInfo(row) {
      this.dataInfo = row;
      setTimeout(() => {
        this.$bvModal.show("modal-info");
      }, 500);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
    changeTypeDateSelected(value) {
      this.selectedDate = value;
      this.getDataHistoryPlay();
    },
    getDataHistoryPlay() {
      let body = {
        View: this.selectedDate,
        StationID: this.dataModal.StationID,
        FromDate: this.fromDate,
        ToDate: this.toDate,
      };
      radioAPI
        .getReportHistoryPlay(body)
        .then((val) => {
          this.dataHistoryPlay = val.status ? val.data : [];
        })
        .catch((err) => console.log(err));
    },
    getImages() {
      let body = {
        UserIDCurent: this.userID,
        StationID: this.dataModal.StationID,
        GeoCode: this.geoCode,
      };
      systemAPI
        .getImagesByID(body)
        .then((val) => {
          this.dataImages = val.status && val.data.length > 0 ? val.data : [];
        })
        .catch((err) => console.log(err));
    },
    getColTypes(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.colTypes = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style  scoped>
.led-red {
  color: #f00;
  /* background-color: #f00; */
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
    rgba(255, 0, 0, 0.5) 0 2px 12px;
  -webkit-animation: blinkRed 0.5s infinite;
  -moz-animation: blinkRed 0.5s infinite;
  -ms-animation: blinkRed 0.5s infinite;
  -o-animation: blinkRed 0.5s infinite;
  animation: blinkRed 0.5s infinite;
}

@-webkit-keyframes blinkRed {
  from {
    color: #f00;
    /* background-color: #f00; */
  }
  50% {
    color: #a00;
    /* background-color: #a00; */
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    color: #f00;
    /* background-color: #f00; */
  }
}

@-moz-keyframes blinkRed {
  from {
    color: #f00;
    /* background-color: #f00; */
  }
  50% {
    color: #a00;
    /* background-color: #a00; */
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    color: #f00;
    /* background-color: #f00; */
  }
}

@-ms-keyframes blinkRed {
  from {
    color: #f00;
    /* background-color: #f00; */
  }
  50% {
    color: #a00;
    /* background-color: #a00; */
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    color: #f00;
    /* background-color: #f00; */
  }
}

@-o-keyframes blinkRed {
  from {
    color: #f00;
    /* background-color: #f00; */
  }
  50% {
    color: #a00;
    /* background-color: #a00; */
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    color: #f00;
    /* background-color: #f00; */
  }
}

@keyframes blinkRed {
  from {
    color: #f00;
    /* background-color: #f00; */
  }
  50% {
    color: #a00;
    /* background-color: #a00; */
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    color: #f00;
    /* background-color: #f00; */
  }
}

.led-green {
  background-color: rgb(60, 250, 50);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px,
    rgb(60, 250, 50) 0 2px 12px;
}

.led-blue {
  background-color: rgb(0, 225, 255);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #007272 0 -1px 9px,
    rgb(0, 255, 255) 0 2px 12px;
}

.led-gray {
  background-color: rgb(200, 200, 200);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #afafaf 0 -1px 9px,
    rgb(200, 200, 200) 0 2px 12px;
  color: #000 !important;
}

.led-orange {
  background-color: rgb(255, 200, 0);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #705400 0 -1px 9px,
    rgb(255, 200, 0) 0 2px 12px;
}
</style>
<style scoped>
.cus-btn {
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 5px;
  width: 150px;
  font-size: 14px;
  height: 30px;
  margin-top: 18px;
  margin-right: 3px;
  padding: 0;
}
</style>