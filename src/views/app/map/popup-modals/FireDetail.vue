<template>
  <b-row style="height: 80vh">
    <b-colxx md="12">
      <b-tabs content-class="mt-1" fill>
        <b-tab
          :title="$t('form.title-info')?.toUpperCase()"
          active
          style="height: 60vh"
        >
          <b-card>
            <div class="d-flex flex-column flex-lg-row gap-3">
              <div class="fire-box-left-modal">
                <div>
                  <div
                    class="
                      d-flex
                      align-items-center
                      flex-column flex-lg-row
                      mb-2
                    "
                  >
                    <div
                      class="font-weight-bold mr-2"
                      style="color: black; font-size: 16px"
                    >
                      {{
                        dataModal.LocationName
                          ? dataModal.LocationName.toUpperCase()
                          : dataModal.StationName.toUpperCase()
                      }}
                    </div>
                    <div class="d-flex align-items-center fw-600">
                      (
                      <div
                        style="width: 12px; height: 12px; border-radius: 50%"
                        :style="`backgroundColor: ${dataModal.StatusColor}`"
                      ></div>
                      <strong class="ml-2"> {{ dataModal.StatusName }}</strong>
                      )
                    </div>
                  </div>
                  <div class="fz-14 pl-2">
                    <div class="d-flex align-items-center fw-600 mb-2">
                      <i class="fad fa-map-marker-alt"></i>
                      <strong class="ml-2 fw-600 font-weight-bold">
                        {{ dataModal.StationAddress || dataModal.address }}
                      </strong>
                    </div>
                    <div class="d-flex align-items-center fw-600 mb-2">
                      <i class="fad fa-calendar"></i>
                      <strong class="ml-2 font-weight-bold">
                        {{ convertDateTime(dataModal.UpdateTime) }}
                      </strong>
                    </div>
                  </div>
                </div>

                <div class="mt-4">
                  <div>
                    <div
                      class="
                        title-card
                        text-leaft
                        mb-2
                        text-muted text-uppercase
                        border-bottom
                      "
                      style="margin-bottom: 8px !important"
                    >
                      <strong>{{ $t("fire.information-site-cabinet") }}</strong>
                    </div>
                    <b-row>
                      <b-col
                        lg="4"
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                        "
                      >
                        <div class="d-flex align-items-center">
                          <b-img
                            :src="
                              require('@/assets/img/fire-icon/firespeakerPin.png')
                            "
                            style="height: 30px; width: 30px"
                          ></b-img>
                          <span class="fz-md">{{
                            $t("fire.low-battery")
                          }}</span>
                        </div>
                        <div class="fz-small-icon">
                          {{ dataModal.SpeakerPin }}
                        </div>
                      </b-col>

                      <b-col
                        md="6"
                        lg="4"
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                        "
                      >
                        <div class="d-flex align-items-center">
                          <b-img
                            :src="
                              require('@/assets/img/fire-icon/firespeakerError.png')
                            "
                            style="height: 30px; width: 30px"
                          ></b-img>
                          <span class="fz-md">{{
                            $t("fire.reporting-error")
                          }}</span>
                        </div>
                        <div class="fz-small-icon">
                          {{ dataModal.SpeakerError }}
                        </div>
                      </b-col>

                      <b-col
                        md="6"
                        lg="4"
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                        "
                      >
                        <div class="d-flex align-items-center">
                          <b-img
                            :src="
                              require('@/assets/img/fire-icon/firespeakerFire.png')
                            "
                            style="height: 30px; width: 30px"
                          ></b-img>
                          <span class="fz-md">{{ $t("fire.fire-alarm") }}</span>
                        </div>
                        <div class="fz-small-icon">
                          {{ dataModal.SpeakerFire }}
                        </div>
                      </b-col>

                      <b-col
                        md="6"
                        lg="4"
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                          mt-1
                        "
                      >
                        <div class="d-flex align-items-center">
                          <b-img
                            :src="
                              require('@/assets/img/fire-icon/firespeakerRooms.png')
                            "
                            style="height: 30px; width: 30px"
                          ></b-img>
                          <span class="fz-md">{{
                            $t("fire.total-position")
                          }}</span>
                        </div>
                        <div class="fz-small-icon">
                          {{ dataModal.SpeakerRooms }}
                        </div>
                      </b-col>

                      <b-col
                        md="6"
                        lg="4"
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                          mt-1
                        "
                      >
                        <div class="d-flex align-items-center">
                          <b-img
                            :src="
                              require('@/assets/img/fire-icon/firespeakerCount.png')
                            "
                            style="height: 30px; width: 30px"
                          ></b-img>
                          <span class="fz-md">{{
                            $t("fire.total-equipment-v2")
                          }}</span>
                        </div>
                        <div class="fz-small-icon">
                          {{ dataModal.SpeakerCount }}
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                  <div class="mt-2">
                    <div
                      class="
                        title-card
                        text-leaft
                        mb-2
                        text-muted text-uppercase
                        border-bottom
                      "
                      style="margin-bottom: 8px !important"
                    >
                      <strong>{{
                        $t("fire.information-equipment-fire")
                      }}</strong>
                    </div>
                    <b-row>
                      <b-col
                        md="6"
                        lg="4"
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                        "
                      >
                        <div class="d-flex align-items-center">
                          <b-img
                            :src="
                              require('@/assets/img/fire-icon/firesensorPin.png')
                            "
                            style="height: 30px; width: 30px"
                          ></b-img>
                          <span class="fz-md">{{
                            $t("fire.low-battery")
                          }}</span>
                        </div>
                        <div class="fz-small-icon">
                          {{ dataModal.SensorPin }}
                        </div>
                      </b-col>

                      <b-col
                        md="6"
                        lg="4"
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                        "
                      >
                        <div class="d-flex align-items-center">
                          <b-img
                            :src="
                              require('@/assets/img/fire-icon/firesensorError.png')
                            "
                            style="height: 30px; width: 30px"
                          ></b-img>
                          <span class="fz-md">{{
                            $t("fire.reporting-error")
                          }}</span>
                        </div>
                        <div class="fz-small-icon">
                          {{ dataModal.SensorError }}
                        </div>
                      </b-col>

                      <b-col
                        md="6"
                        lg="4"
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                        "
                      >
                        <div class="d-flex align-items-center">
                          <b-img
                            :src="
                              require('@/assets/img/fire-icon/firesensorFire.png')
                            "
                            style="height: 30px; width: 30px"
                          ></b-img>
                          <span class="fz-md">{{ $t("fire.fire-alarm") }}</span>
                        </div>
                        <div class="fz-small-icon">
                          {{ dataModal.SensorFire }}
                        </div>
                      </b-col>

                      <b-col
                        md="6"
                        lg="4"
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                        "
                      >
                        <div class="d-flex align-items-center">
                          <b-img
                            :src="
                              require('@/assets/img/fire-icon/firesensorRooms.png')
                            "
                            style="height: 30px; width: 30px"
                          ></b-img>
                          <span class="fz-md">{{
                            $t("fire.total-position")
                          }}</span>
                        </div>
                        <div class="fz-small-icon">
                          {{ dataModal.SensorRooms }}
                        </div>
                      </b-col>

                      <b-col
                        md="6"
                        lg="4"
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                        "
                      >
                        <div class="d-flex align-items-center">
                          <b-img
                            :src="
                              require('@/assets/img/fire-icon/firesensorCount.png')
                            "
                            style="height: 30px; width: 30px"
                          ></b-img>
                          <span class="fz-md">{{
                            $t("fire.total-equipment-v2")
                          }}</span>
                        </div>
                        <div class="fz-small-icon">
                          {{ dataModal.SensorCount }}
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </div>

                <div class="mt-4">
                  <div class="d-flex align-items-center">
                    <i class="fas fa-image mr-2" style="font-size: 16px"></i>
                    <strong>{{
                      $t("fire.device-monitoring")?.toUpperCase()
                    }}</strong>
                  </div>
                  <div>
                    <b-img
                      v-img
                      :src="dataModal.LinkAvatar"
                      style="width: 100% !important; background: #f3f3f3"
                      class="fire-detail-img"
                    />
                  </div>
                </div>
              </div>
              <div class="fire-box-right-modal">
                <template
                  v-if="dataModal.Stations && dataModal.Stations.length > 0"
                >
                  <div
                    style="
                      min-height: 71vh;
                      max-height: 71vh;
                      overflow-x: hidden;
                      overflow-y: auto;
                      padding-right: 4px;
                    "
                  >
                    <div v-for="(station, i) in dataModal.Stations" :key="i">
                      <div
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                          border-bottom
                          pb-1
                          fz-title-right
                          mb-1
                        "
                      >
                        <div>{{ station.FireStationName }}</div>
                        <div>
                          <b-badge
                            pill
                            :style="
                              'font-size: 80%; color: black; border: 1px solid #d3d0d0f7;background-color:' +
                              station.StatusColor.toLowerCase() +
                              '!important;'
                            "
                          >
                            <span :style="'color:white'">
                              {{ station.StatusName }}
                            </span>
                          </b-badge>
                        </div>
                      </div>
                      <div class="mt-2">
                        <h6 class="text-center">
                          {{ $t("fire.location-fire-alarm-monitoring") }}
                        </h6>
                        <div class="fire-grid-room">
                          <template
                            v-if="station.Rooms && station.Rooms.length > 0"
                          >
                            <div
                              v-for="(room, indexR) in station.Rooms"
                              :key="indexR"
                              @click="handleRoomClick(room)"
                            >
                              <div
                                class="
                                  text-center
                                  p-1
                                  text-white
                                  fire-hover-right
                                "
                                :style="`background-color: ${room.StatusColor}; border-radius: 4px; cursor: pointer`"
                              >
                                {{ room.FireStationName }}
                              </div>
                            </div>
                          </template>
                          <template v-else>
                            <div class="text-left font-italic text-muted">
                              {{ $t("panel.non-data") }}
                            </div>
                          </template>
                        </div>
                      </div>
                      <div class="mt-2 mb-4">
                        <h6 class="text-center">
                          {{ $t("fire.alarm-cabinet-location") }}
                        </h6>
                        <div class="d-flex align-items-center gap-1">
                          <template
                            v-if="station.Speaker && station.Speaker.length > 0"
                          >
                            <div
                              v-for="(speak, indexR) in station.Speaker"
                              :key="indexR"
                              @click="handleRoomClick(speak)"
                            >
                              <div
                                class="
                                  text-center
                                  p-1
                                  text-white
                                  fire-hover-right
                                "
                                :style="`background-color: ${speak.StatusColor}; border-radius: 4px;  cursor: pointer;min-width:142px;white-space:nowrap`"
                              >
                                {{ speak.FireStationName }}
                              </div>
                            </div>
                          </template>
                          <template v-else>
                            <div class="text-left font-italic text-muted">
                              {{ $t("panel.non-data") }}
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="text-left font-italic text-muted">
                    {{ $t("panel.non-data") }}
                  </div>
                </template>
                <div
                  lg="6"
                  class="text-right d-flex"
                  style="
                    flex-wrap: wrap;
                    width: 100%;
                    justify-content: flex-end;
                  "
                >
                  <template v-for="des in statusColors">
                    <strong :key="des.id" class="mr-2">
                      <i
                        :style="'color:' + des.color"
                        class="fas fa-circle"
                      ></i>
                      {{ des.label }}
                    </strong>
                  </template>
                </div>
              </div>
            </div>
          </b-card>
        </b-tab>
        <b-tab :title="$t('report.report')?.toUpperCase()" style="height: 60vh">
          <b-row class="mt-4">
            <b-colxx lg="6">
              <b-form-group :label="$t('other.from-date') + ':'">
                <b-form-datepicker
                  :locale="locale"
                  v-model="from"
                  @input="changeOption(from, to)"
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
            <b-colxx lg="6">
              <b-form-group :label="$t('other.to-date') + ':'">
                <b-form-datepicker
                  :locale="locale"
                  v-model="to"
                  plain
                  @input="changeOption(from, to)"
                ></b-form-datepicker>
              </b-form-group>
            </b-colxx>
          </b-row>
          <b-row>
            <b-col lg="12">
              <custom-table
                :data-table="dataTable"
                :field-table="fieldsTable"
                :column-show="columnShowTable"
              ></custom-table>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab
          :title="$t('tabs.title.list-image-setting')?.toUpperCase()"
          style="height: 60vh"
        >
          <b-row v-if="images && images.length > 0">
            <template v-for="(img, index) in images">
              <b-col :key="index" lg="4" class="p-2 pos-parent">
                <b-img
                  v-img
                  class="h-100 w-100"
                  :src="img.ImageLink"
                  alt="image"
                ></b-img>
                <span class="pos-chilren-title">
                  <b>{{ img.StationID }}</b>
                </span>
              </b-col>
            </template>
          </b-row>
          <div v-else class="text-center text-muted mt-4">
            {{ $t("data.non-data") }}
          </div>
        </b-tab>
      </b-tabs>
    </b-colxx>
    <b-modal
      id="modal-detail-room"
      ref="modal-detail-room"
      :title="titleForm"
      @hidden="resetModalRoom"
      v-if="dataForm"
      scrollable
      class="text-center"
      size="lg"
      centered
      hide-footer
    >
      <b-tabs content-class="mt-1" fill>
        <b-tab
          :title="$t('report.aqua.fields-current.info-device')?.toUpperCase()"
          active
          style="height: 60vh"
        >
          <b-row>
            <b-col lg="12">
              <div>
                <b>{{ $t("fire.list-device")?.toUpperCase() }}</b>
                <template
                  v-if="dataForm.ListSensor && dataForm.ListSensor.length > 0"
                >
                  <template v-for="(sensor, i) in dataForm.ListSensor">
                    <div
                      :key="i"
                      class="d-flex justify-content-between bg-light p-2 mb-1"
                    >
                      <span class="text-muted w-50">
                        {{ $t("fire.installation-location") }}:
                        <b>{{ sensor.NodeName }}</b>
                      </span>
                      <span class="text-muted w-25">
                        {{ $t("modal.fields-node-aqua.pin") }}:
                        <b>{{ sensor.Pin }} %</b>
                      </span>
                      <span class="text-muted w-25">
                        <b>
                          <i
                            :style="'color:' + sensor.StatusColor"
                            class="fas fa-circle mr-2"
                          ></i>
                          {{ sensor.StatusName }}
                        </b>
                      </span>
                    </div>
                  </template>
                </template>
                <template v-else>
                  <div class="text-center text-muted mt-2">
                    {{ $t("data.non-data") }}
                  </div>
                </template>
              </div>
            </b-col>
            <b-col lg="12" class="mt-2">
              <div>
                <div class="d-flex justify-content-between">
                  <b style="margin-top: 4px">{{
                    $t("fire.history-report")?.toUpperCase()
                  }}</b>
                  <b-form-radio-group
                    id="radio-type-fire"
                    v-model="typed"
                    :options="options"
                    name="radio-options-type-fire"
                  />
                </div>
              </div>
            </b-col>
            <b-col lg="12">
              <template v-if="items && items.length > 0">
                <b-table :items="items" :fields="fields" hover></b-table>
              </template>
              <template v-else>
                <div class="text-center text-muted mt-2">
                  {{ $t("data.non-data") }}
                </div>
              </template>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab
          :title="$t('tabs.title.list-image-setting').toUpperCase()"
          style="height: 60vh"
        >
          <b-row v-if="imagesRoom && imagesRoom.length > 0">
            <template v-for="(img, index) in imagesRoom">
              <b-col :key="index" lg="4" class="p-2 pos-parent">
                <b-img
                  v-img
                  class="h-100 w-100"
                  :src="img.ImageLink"
                  alt="image"
                ></b-img>
                <span class="pos-chilren-title">
                  <b>{{ img.NodeName }}</b>
                </span>
              </b-col>
            </template>
          </b-row>
          <div v-else class="text-center text-muted mt-4">
            {{ $t("data.non-data") }}
          </div>
        </b-tab>
      </b-tabs>
    </b-modal>
  </b-row>
</template>

<script>
import moment from "moment";
import handling from "@/constants/handling";
import fireAPI from "@/api/modules/fireAPI";
import systemAPI from "@/api/modules/systemAPI";
import CustomTables from "@/components/Table/CustomTables";
import ContentRoom from "@/views/app/dashboards/fire/component/ContentRoom";

String.prototype.allReplace = function (obj) {
  let retStr = this;
  for (let i in obj) {
    retStr = retStr.replace(new RegExp(i, "g"), obj[i]);
  }
  return retStr;
};

export default {
  name: "fire-popup",
  components: {
    "custom-table": CustomTables,
    "content-room": ContentRoom,
  },
  props: ["dataMapNow", "dataParent", "objectData"],
  data() {
    return {
      dataModal: this.dataParent ?? null,
      statusColors: [],
      images: [],
      imagesRoom: [],
      listImage: null,
      dataForm: null,
      titleForm: "",
      selectMode: "single",
      typed: "FIRE",
      items: [],
      itemsOtherSetting: [],
      fields: [
        {
          key: "NodeName",
          label: "Vị trí lắp đặt",
          tdClass: "text-left",
        },
        {
          key: "StartTime",
          label: "Bắt đầu",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
        {
          key: "FinishTime",
          label: "Kết thúc",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
      ],
      fieldsOtherSetting: [
        {
          key: "NodeName",
          label: "Tên tủ",
          tdClass: "text-left",
        },
        {
          key: "StartTime",
          label: "Trạng thái kích hoạt",
          tdClass: "text-center",
        },
      ],
      options: [
        {
          text: this.$t("dashboards.warning-fire.warning-fire"),
          value: "FIRE",
        },
        { text: this.$t("fire.error"), value: "ERROR" },
      ],
      dataTable: [],
      columnShowTable: null,
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      from: handling.convertDateToPicker(handling.getDateSubtract(30)),
      to: handling.convertDateToPicker(handling.getDateNow()),
      objectKey: null,
    };
  },
  computed: {
    data() {
      let result = [];
      if (this.dataModal && this.dataModal.Stations?.length > 0) {
        this.dataModal.Stations.forEach((e) => {
          if (e.Level == 1) {
            let floor = { ...e };
            floor.chilrens = this.dataModal.Stations.filter(
              (n) => n.ParentID == floor.ID
            );
            result.push(floor);
          }
        });
      }
      return result;
    },
    speakers() {
      let arr = [];
      this.dataModal.Stations.map((room) => {
        if (room.Speakers?.length > 0) {
          room.Speakers.forEach((p) => {
            arr.push(p);
          });
        }
      });
      return arr;
    },
    dataNodes() {
      let result = [];
      if (this.dataModal && this.dataModal.Stations?.length > 0) {
        this.dataModal.Stations.forEach((e) => {
          if (e.Level == 1) {
            let floor = { ...e };
            floor.chilrens = this.dataModal.Stations.filter(
              (n) => n.ParentID == floor.ID
            );
            result.push(floor);
          }
        });
      }
      return result;
    },
    fieldsTable: function () {
      return handling.mergeTableAndData(this.objectKey, this.columnShowTable);
    },
  },
  watch: {
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
            if (item.LocationID == this.dataParent.LocationID) {
              this.dataModal = { ...this.dataParent, ...item };
            }
          });
        }
      });
    },
    typed() {
      if (this.dataForm) {
        if (this.typed == "FIRE") {
          this.items = this.dataForm.ListFireHistories;
        } else {
          this.items = this.dataForm.ListErrorHistories;
        }
      } else {
        this.items = [];
      }
    },
    dataTable() {
      this.getColumn("ReportFires");
    },
  },
  async created() {
    await this.getData();
    await this.getColumn("ReportFires");
    await this.getDataReport(this.from, this.to);
  },
  mounted() {
    this.getImages();
  },
  methods: {
    convertKeyTableData(array, parentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["ParentID"] != parentID) {
          return;
        }
        let obj = {
          FireErrorCount: item["FireErrorCount"],
          FireErrorTime: item["FireErrorTime"],
          FireStatusCount: item["FireStatusCount"],
          FireStatusTime: item["FireStatusTime"],
          ID: item["ID"],
          LocationName: item["LocationName"],
          LowPinCount: item["LowPinCount"],
          LowPinTime: item["LowPinTime"],
          ParentID: item["ParentID"],
          Key: i,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["ID"], arrayTable, i + 1);
      });
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    showModalDetail() {
      setTimeout(() => {
        this.$bvModal.show("modal-detail");
      }, 500);
    },
    getColumn(string) {
      let body = {
        ObjectName: string,
      };

      systemAPI
        .tableFields(body)
        .then((val) => {
          this.columnShowTable = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeOption(from, to) {
      this.getDataReport(from, to);
    },
    getDataReport(from, to) {
      let body = {
        DateType: "FromDateToDate",
        LocationID: "" + this.dataModal.LocationID,
        FromDate: from.toString().allReplace({ "-": "/" }),
        ToDate: to.toString().allReplace({ "-": "/" }),
      };
      fireAPI
        .getReportTotal(body)
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];

          let array = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (array.length > 0) {
            let arrTable = [];
            this.convertKeyTableData(array, "0", arrTable, 0);
            this.dataTable = arrTable;
          } else {
            this.dataTable = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSettingOther() {
      setTimeout(() => {
        this.$bvModal.show("modal-setting-other");
      }, 500);
    },
    handleRoomClick(room) {
      let body = {
        LocationID: room.ID,
      };
      fireAPI
        .getRoomByID(body)
        .then((val) => {
          this.dataForm = val.status ? val.data : null;
          this.typed = "FIRE";
          this.items = this.dataForm.ListFireHistories;
          this.imagesRoom = this.dataForm.ListImages;
        })
        .catch((err) => console.log(err));
      this.titleForm = "THÔNG TIN PHÒNG " + room.FireStationName.toUpperCase();
      setTimeout(() => {
        this.$bvModal.show("modal-detail-room");
      }, 500);
    },
    resetModalRoom() {
      this.dataForm = null;
    },
    getImages() {
      if (this.dataModal && this.dataModal.Images?.length > 0) {
        return (this.images = this.dataModal.Images);
      } else {
        return (this.images = []);
      }
    },
    getData() {
      fireAPI
        .getStatusColors()
        .then((val) => {
          let result = val.status ? val.data : [];
          this.statusColors = [];
          result.forEach((e) => {
            let obj = {
              id: e.StatusID,
              color: e.StatusColor,
              label: e.StatusName,
            };
            this.statusColors.push(obj);
          });
        })
        .catch((err) => console.log(err));
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
  },
};
</script>

<style scoped>
.fire-box-left-modal {
  width: 44%;
}

.fire-box-right-modal {
  width: 56%;
}

.gap-3 {
  gap: 12px;
}
.pos-parent {
  position: relative;
  height: 200px;
  cursor: pointer;
}
.pos-chilren-title {
  position: absolute;
  color: white;
  background: black;
  z-index: 2;
  right: 5px;
  bottom: 10px;
  padding: 5px;
}
.floors {
  height: 30px;
  padding: 5px;
  border: 1px solid grey;
  color: white;
}
.rooms {
  padding: 5px;
  border: 1px solid gray;
  margin-right: 10px;
  color: white;
  cursor: pointer;
}
.led-red {
  background-color: #f00;
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
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-moz-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-ms-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-o-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
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
}

.led-orange {
  background-color: rgb(255, 200, 0);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #705400 0 -1px 9px,
    rgb(255, 200, 0) 0 2px 12px;
}
.card-custom-map-mini .card-body {
  padding: 0;
}

.border-map-mini {
  width: 100%;
  height: 320px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.border-map-mini .map-control {
  height: 240px;
  /*padding: .5rem;*/
}

.border-map-mini .list-station-control {
  height: 104px;
  padding: 1rem;
}

.info-station {
  /* height: 350px; */
}

.info-station .card-body {
  padding: 0;
}

.info-station .card-body .custom-title-control {
  font-size: 15px;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f6f6f6;
  width: 100%;
  font-weight: bold;
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

.ps-container {
  margin-right: -5px;
  padding-right: 5px;
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

#dropFire {
  background-color: #fcdfe0;
  border: 1px solid #db888b;
}
#dropDisconnect {
  background-color: #f0eaea;
  border: 1px solid #909090;
}
#dropLowPin {
  background-color: #f8d7a5;
  border: 1px solid #f89500;
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
.activeFireBG {
  background-color: rgba(254, 47, 55, 0.1);
}

.fire-detail-img {
  height: 400px;
}
.fz-14 {
  font-size: 14px;
}

#fullscreen-wallpaper {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 1);
  cursor: pointer;
}

#fullscreen-wallpaper .image-wallpaper {
  width: 100%;
  height: 100%;
}

#fullscreen-wallpaper .button-close-wallpaper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}

#fullscreen-wallpaper .button-close-wallpaper .btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0.6rem;
}

#fullscreen-wallpaper .button-close-wallpaper .btn i {
  font-size: 20px;
}

.fz-title {
  font-size: 15px;
  font-weight: 700;
}

.fire-grid-room {
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.fz-title-right {
  font-size: 16px;
  font-weight: 700;
}

.gap-1 {
  gap: 5px;
}

.fire-hover-right {
  transition: 0.3s linear;
  opacity: 1;
}

.fire-hover-right:hover {
  opacity: 0.8;
}

/* Mobile: width < 740px  */
@media only screen and (max-width: 46.1875em) {
  .fire-box-left-modal {
    width: 100%;
  }

  .fire-box-right-modal {
    width: 100%;
  }

  .fire-detail-img {
    height: 280px;
  }
}

/* Tablet: width >= 740px and width < 1024px  */
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .fire-responsive-list-item {
    width: 50%;
    flex: unset;
  }
}
</style>
