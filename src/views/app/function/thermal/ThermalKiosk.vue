<template>
  <div v-if="objectData">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>{{ objectData.formName }}</strong>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <b-dropdown-item
                @click="infoModal(selectedItems)"
                v-if="selectedItems.length === 1"
              >
                <i class="fad fa-info-circle"></i>
                &emsp;{{ $t("pages.info") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-info-circle"></i>
                &emsp;{{ $t("pages.info") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="resetSystemModal(selectedItems)"
                v-if="selectedItems.length === 1"
              >
                <i class="fad fa-undo"></i>
                &emsp;{{ $t("pages.reset-kiosk") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-undo"></i>
                &emsp;{{ $t("pages.reset-kiosk") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="updateDataModal(selectedItems)"
                v-if="selectedItems.length === 1"
              >
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.update-kiosk") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.update-kiosk") }}
              </b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </div>
        <div class="mb-2 mt-2"></div>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12" class="mb-4">
        <b-card>
          <custom-table
            :data-table="items"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            @row-selected="rowSelected"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
    <b-modal
      id="modal-item"
      v-if="dataModal"
      hide-header
      size="xl"
      ok-only
      centered
      scrollable
      @hide="resetModal"
    >
      <b-row>
        <b-colxx md="12">
          <h3 class="text-center font-weight-bold">
            {{ dataModal.StationName.toUpperCase() }}
          </h3>
          <p class="text-center">
            <span class="font-italic">{{ $t("map.address") + ": " }}</span>
            <span class="font-weight-bold">{{ dataModal.StationAddress }}</span>
            <span>/</span>
            <span class="font-italic">
              {{ $t("map.lng") + " - " + $t("map.lat") + ": " }}
            </span>
            <span class="font-weight-bold">
              {{ dataModal.Long + ", " + dataModal.Lat }}
            </span>
            <span>/</span>
            <span class="font-italic">{{ $t("map.update-time") + ": " }}</span>
            <span class="text-danger font-weight-bold">
              {{ convertDateTime(dataModal.UpdateTime) }}
            </span>
          </p>
        </b-colxx>
        <b-colxx lg="3" md="12"></b-colxx>
        <b-colxx lg="6" md="12">
          <b-alert
            :class="['text-center', 'led-' + dataModal.StatusColor]"
            style="color: white; letter-spacing: 4px"
            show
          >
            <strong>{{ dataModal.StatusName.toUpperCase() }}</strong>
          </b-alert>
        </b-colxx>
        <b-colxx lg="3" md="12"></b-colxx>
        <b-colxx md="12">
          <b-row>
            <b-colxx md="4">
              <template v-if="dataModal.SerialNumber">
                <b-form-group
                  class="mb-0"
                  :label="$t('modal.series-number') + ':'"
                >
                  <b-alert
                    class="text-center"
                    show
                    style="background-color: rgb(233, 236, 239); color: black"
                  >
                    {{ dataModal.SerialNumber }}
                  </b-alert>
                </b-form-group>
              </template>
            </b-colxx>
            <b-colxx md="4">
              <template v-if="dataModal.InputDate">
                <b-form-group
                  class="mb-0"
                  :label="$t('modal.input-date') + ':'"
                >
                  <b-alert
                    class="text-right"
                    show
                    style="background-color: rgb(233, 236, 239); color: black"
                  >
                    {{ convertDate(dataModal.InputDate) }}
                  </b-alert>
                </b-form-group>
              </template>
            </b-colxx>
            <b-colxx md="4">
              <template v-if="dataModal.TempWarning">
                <b-form-group
                  class="mb-0"
                  :label="$t('modal.warning-temperature') + ':'"
                >
                  <template v-if="parseFloat(dataModal.TempWarning) < 38">
                    <b-progress
                      class="w-100 mb-3"
                      :max="100"
                      height="1.5rem"
                      style="background-color: rgb(233, 236, 239)"
                    >
                      <b-progress-bar
                        :animated="animated"
                        style="
                          background-color: rgb(60, 179, 113);
                          color: black;
                        "
                        :value="parseFloat(dataModal.TempWarning)"
                        :label="`${parseFloat(dataModal.TempWarning)} ºC`"
                      ></b-progress-bar>
                    </b-progress>
                  </template>
                  <template v-else>
                    <b-progress
                      class="w-100 mb-3"
                      :max="100"
                      height="1.5rem"
                      style="background-color: rgb(233, 236, 239)"
                    >
                      <b-progress-bar
                        :animated="animated"
                        style="background-color: rgb(255, 0, 50); color: black"
                        :value="parseFloat(dataModal.TempWarning)"
                        :label="`${parseFloat(dataModal.TempWarning)} ºC`"
                      ></b-progress-bar>
                    </b-progress>
                  </template>
                </b-form-group>
              </template>
            </b-colxx>
            <b-colxx md="3">
              <template v-if="dataModal.TodayData">
                <b-form-group
                  class="mb-0"
                  :label="$t('modal.today-data') + ':'"
                >
                  <b-alert
                    class="text-right"
                    show
                    style="background-color: rgb(233, 236, 239); color: black"
                  >
                    <span class="font-weight-bold">
                      {{ dataModal.TodayData }}
                    </span>
                    {{ $t("modal.case") }}
                  </b-alert>
                </b-form-group>
              </template>
            </b-colxx>
            <b-colxx md="3">
              <template v-if="dataModal.TodayWarning">
                <b-form-group
                  class="mb-0"
                  :label="$t('modal.today-warning') + ':'"
                >
                  <b-alert
                    class="text-right"
                    show
                    style="background-color: rgb(233, 236, 239); color: black"
                  >
                    <span class="font-weight-bold">
                      {{ dataModal.TodayWarning }}
                    </span>
                    {{ $t("modal.case") }}
                  </b-alert>
                </b-form-group>
              </template>
            </b-colxx>
            <b-colxx md="3">
              <template v-if="dataModal.TotalData">
                <b-form-group class="mb-0" :label="$t('modal.total') + ':'">
                  <b-alert
                    class="text-right"
                    show
                    style="background-color: rgb(233, 236, 239); color: black"
                  >
                    <span class="font-weight-bold">
                      {{ dataModal.TotalData }}
                    </span>
                    {{ $t("modal.case") }}
                  </b-alert>
                </b-form-group>
              </template>
            </b-colxx>
            <b-colxx md="3">
              <template v-if="dataModal.TotalWarning">
                <b-form-group
                  class="mb-0"
                  :label="$t('modal.total-warning') + ':'"
                >
                  <b-alert
                    class="text-right"
                    show
                    style="background-color: rgb(233, 236, 239); color: black"
                  >
                    <span class="font-weight-bold">
                      {{ dataModal.TotalWarning }}
                    </span>
                    {{ $t("modal.case") }}
                  </b-alert>
                </b-form-group>
              </template>
            </b-colxx>
            <b-colxx md="12" v-if="hisList && hisList.length > 0">
              <b-form-group class="mb-0" :label="$t('modal.new-data') + ':'">
                <b-table
                  :sticky-header="true"
                  responsive
                  :items="hisList"
                  :fields="fieldHisList"
                  class="text-center"
                >
                  <template v-slot:cell(_image)="slot">
                    <b-img
                      :src="slot.item.DataImage"
                      id="image-face-name"
                      fluid
                      :alt="slot.item.FaceName"
                      style="width: 50px; height: 50px"
                      @click="openFullscreen('image-face-name')"
                    ></b-img>
                  </template>
                </b-table>
              </b-form-group>
            </b-colxx>
          </b-row>
        </b-colxx>
      </b-row>
    </b-modal>
    <b-modal
      id="modal-prevent-callback"
      ref="modal-prevent-callback"
      :title="$t('modal.callback-thermal-kiosk')"
      @hidden="resetModalCallback"
      @ok="handleOkCallback"
      v-if="callback"
    >
      <form ref="form" @submit.stop.prevent="handleSubmitCallback">
        <b-form-group :label="$t('modal.series-number') + ':'">
          <b-form-input v-model="callback.series" disabled></b-form-input>
        </b-form-group>
        <b-form-group :label="$t('modal.from-datetime') + ':'">
          <b-row>
            <b-colxx md="4">
              <b-form-timepicker
                locale="vi"
                :label-close-button="$t('modal.close')"
                v-model="callback.timeFrom"
                required
              ></b-form-timepicker>
            </b-colxx>
            <b-colxx md="8">
              <b-form-datepicker
                locale="vi"
                v-model="callback.from"
                required
              ></b-form-datepicker>
            </b-colxx>
          </b-row>
        </b-form-group>
        <b-form-group :label="$t('modal.to-datetime') + ':'">
          <b-row>
            <b-colxx md="4">
              <b-form-timepicker
                locale="vi"
                :label-close-button="$t('modal.close')"
                v-model="callback.timeTo"
                required
              ></b-form-timepicker>
            </b-colxx>
            <b-colxx md="8">
              <b-form-datepicker
                locale="vi"
                v-model="callback.to"
                required
              ></b-form-datepicker>
            </b-colxx>
          </b-row>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script>
import CustomTables from "@/components/Table/CustomTables";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import moment from "moment";
import systemAPI from "@/api/modules/systemAPI";
import mapAPI from "@/api/modules/mapAPI";
import thermalAPI from "@/api/modules/thermalAPI";

export default {
  components: {
    "custom-table": CustomTables,
  },
  data() {
    return {
      timer,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      dataMapNow: null,
      dataModal: null,
      animated: true,
      layerLoad: "Kiosk",
      hisList: null,
      fieldHisList: [
        {
          key: "FaceName",
          label: this.$t("modal.employer-name"),
          tdClass: "text-left",
        },
        {
          key: "PositionName",
          label: this.$t("modal.employer-position"),
          tdClass: "text-center",
        },
        {
          key: "Phone",
          label: this.$t("modal.employer-phone"),
          tdClass: "text-center",
        },
        {
          key: "Address",
          label: this.$t("modal.employer-address"),
          tdClass: "text-left",
        },
        {
          key: "DataTemperature",
          label: this.$t("modal.employer-temperature"),
          formatter: function (val) {
            return val + " °C";
          },
          tdClass: "text-center",
        },
        {
          key: "DataTime",
          label: this.$t("modal.employer-time"),
          tdClass: "text-center",
        },
        {
          key: "_image",
          label: this.$t("modal.employer-image"),
          tdClass: "text-center",
        },
      ],
      callback: null,
    };
  },
  watch: {
    dataMapNow() {
      if (this.dataModal && this.dataMapNow) {
        this.dataModal = this.returnDataModal(
          this.dataModal.SerialNumber,
          this.dataMapNow
        );
      }
    },
    items() {
      this.getColumn("MonitorKiosks");
      this.getKeyTable();
    },
  },
  methods: {
    updateDataModal(items) {
      this.callback = {
        series: items[0].SerialNumber,
        timeFrom: moment().format("HH:mm:ss"),
        from: moment().format("YYYY-MM-DD"),
        timeTo: moment().format("HH:mm:ss"),
        to: moment().format("YYYY-MM-DD"),
      };
      setTimeout(() => {
        this.$bvModal.show("modal-prevent-callback");
      }, this.timer);
    },
    resetModalCallback() {
      this.callback = null;
    },
    handleOkCallback(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitCallback();
    },
    handleSubmitCallback() {
      let body = {
        SerialNumber: this.callback.series,
        FromDate: this.callback.from + " " + this.callback.timeFrom,
        ToDate: this.callback.to + " " + this.callback.timeTo,
      };
      thermalAPI
        .thermalKioskCallback(body)
        .then((val) => {
          if (val.status) {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
            this.$nextTick(() => {
              this.$bvModal.hide("modal-prevent-callback");
            });
          } else {
            this.makeToast(
              "danger",
              this.$t("toast.fail").toUpperCase(),
              val.message
            );
            this.$nextTick(() => {
              this.$bvModal.hide("modal-prevent-callback");
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetSystemModal(items) {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question-reset") + items[0].KioskName + "?",
          {
            title: this.$t("form.warning").toUpperCase(),
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: this.$t("form.yes"),
            cancelTitle: this.$t("form.no"),
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value === true) {
            this.handleSubmitReset(items[0].SerialNumber);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitReset(id) {
      let body = {
        SerialNumber: id,
      };
      thermalAPI
        .thermalKioskReset(body)
        .then((val) => {
          if (val.status) {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          } else {
            this.makeToast(
              "danger",
              this.$t("toast.fail").toUpperCase(),
              val.message
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getHistory(series) {
      let body = {
        SerialNumber: series,
      };
      thermalAPI
        .thermalReportTop(body)
        .then((val) => {
          this.hisList = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetModal() {
      this.dataModal = null;
    },
    infoModal(items) {
      this.getMapNow(this.layerLoad);
      setTimeout(() => {
        this.dataModal = this.returnDataModal(
          items[0].SerialNumber,
          this.dataMapNow
        );
        this.getHistory(this.dataModal.SerialNumber);
        setTimeout(() => {
          this.$bvModal.show("modal-item");
        }, this.timer / 1.5);
      }, this.timer);
    },
    returnDataModal(id, dataMapNow) {
      let data = null;
      for (let i = 0; i < dataMapNow.length; i++) {
        if (data !== null) {
          return data;
        }
        for (let j = 0; j < dataMapNow[i].DataProperties.length; j++) {
          if (id === dataMapNow[i].DataProperties[j].SerialNumber) {
            data = dataMapNow[i].DataProperties[j];
          }
        }
      }
      return data;
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
    convertDate(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("DD/MM/YYYY");
    },
    openFullscreen(idElement) {
      let element = document.getElementById(idElement);
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    timeLoadData(time) {
      this.getData();
      if (this.layerLoad) {
        this.getMapNow(this.layerLoad);
      }
      if (this.dataModal) {
        this.getHistory(this.dataModal.SerialNumber);
      }
      setTimeout(() => {
        this.timeLoadData(time);
      }, time);
    },
    getMapNow(layer) {
      let body = {
        DataCode: layer,
      };
      mapAPI
        .mapNowByCode(body)
        .then((val) => {
          this.dataMapNow = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      thermalAPI
        .thermalKioskMonitor()
        .then((val) => {
          this.items = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable() {
      thermalAPI
        .thermalKioskMonitor()
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumn(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShow = val.status ? val.data : [];
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
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("MonitorKiosks");
    await this.getKeyTable();
    await this.timeLoadData(this.timer * 20);
  },
  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
    },
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
</style>
