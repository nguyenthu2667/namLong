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
                @click="useGasModal(selectedItems)"
                v-if="selectedItems.length === 1"
              >
                <i class="fad fa-circle-notch"></i>
                &emsp;{{ $t("reset") }} A/B
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-circle-notch"></i>
                &emsp;{{ $t("reset") }} A/B
              </b-dropdown-item>
              <b-dropdown-item
                @click="resetSystemModal(selectedItems)"
                v-if="selectedItems.length === 1"
              >
                <i class="fad fa-undo"></i>
                &emsp;{{ $t("pages.restart-device") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-undo"></i>
                &emsp;{{ $t("pages.restart-device") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="refreshSystemModal(selectedItems)"
                v-if="selectedItems.length === 1"
              >
                <i class="fad fa-sync-alt"></i>
                &emsp;{{ $t("pages.refresh-sensor") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-sync-alt"></i>
                &emsp;{{ $t("pages.refresh-sensor") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="exportModal()"
                v-if="objectData.accessWrite === true"
              >
                <i class="fad fa-file-excel"></i>
                &emsp;
                {{ $t("report.action.download-excel") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-file-excel"></i>
                &emsp;
                {{ $t("report.action.download-excel") }}
              </b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </div>
        <div class="mb-2">
          <span v-b-toggle.header-options variant="primary">
            <i class="fad fa-cog mr-2" style="font-size: 15px"></i>
            <strong>
              {{ storeName }}
            </strong>
          </span>
          <b-collapse id="header-options">
            <div class="mt-1">
              <b-row>
                <b-colxx xl="4" v-if="storeOptions">
                  <span class="text-small">{{ $t("dashboards.store") }}:</span>
                  <b-form-select
                    v-model="storeDefault"
                    :options="storeOptions"
                    size="sm"
                    @change="selectOption(storeDefault)"
                  ></b-form-select>
                </b-colxx>
                <b-colxx xl="4">
                  <!-- <span class="text-small">
                    {{ $t('dashboards.from-date') }}:
                  </span>
                  <b-form-datepicker
                    id="datepicker-sm"
                    size="sm"
                    :locale="locale"
                    v-model="fromDateDefault"
                    @input="
                      selectOption(fromDateDefault, toDateDefault, storeDefault)
                    "
                  ></b-form-datepicker> -->
                </b-colxx>
                <b-colxx xl="4">
                  <!-- <span class="text-small">
                    {{ $t('dashboards.to-date') }}:
                  </span>
                  <b-form-datepicker
                    id="datepicker-sm"
                    size="sm"
                    :locale="locale"
                    v-model="toDateDefault"
                    @input="
                      selectOption(fromDateDefault, toDateDefault, storeDefault)
                    "
                  ></b-form-datepicker> -->
                </b-colxx>
              </b-row>
            </div>
          </b-collapse>
        </div>
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
            @status-edit="statusEditModal"
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
      body-class="custom-style-body"
      @hide="resetModal"
    >
      <gas-restaurant-popup
        :data-parent="dataModal"
        :dataMapNow="dataMapNow"
        :object-data="objectData"
        :fast-order="true"
        @status-edit="lockGasModal"
        @handle-submit="submitOrder"
      ></gas-restaurant-popup>
    </b-modal>
    <b-modal
      id="modal-lock"
      ref="modal-lock"
      :title="
        lockStation && lockStation.IsLock
          ? $t('dashboards.gas-lock-open')
          : $t('dashboards.gas-lock')
      "
      ok-only
      :ok-title="$t('modal.change')"
      @hidden="resetModalLock"
      @ok="handleOkLock"
      title-class="font-weight-bolder"
    >
      <form ref="form" @submit.stop.prevent="handleSubmitLock">
        <b-form-group
          :state="lockState"
          :label="$t('dashboards.reason') + ':'"
          label-for="lock-input"
          :invalid-feedback="$t('dashboards.enter-reason')"
        >
          <b-form-input
            id="lock-input"
            v-model="lock"
            :state="lockState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal
      id="modal-use-gas"
      ref="modal-use-gas"
      :title="$t('reset').toUpperCase() + ' A/B'"
      ok-only
      :ok-title="$t('modal.change')"
      @hidden="resetModalUseGas"
      @ok="handleOkUseGas"
      size="sm"
      class="text-center"
      title-class="font-weight-bolder"
    >
      <form ref="form" @submit.stop.prevent="handleSubmitUseGas">
        <b-form-group
          class="font-weight-bold"
          :label="$t('dashboards.choose-side-to-use') + ':'"
          v-slot="{ ariaDescribedby }"
        >
          <template v-if="selectedUseGas === 'A'">
            <b-row class="p-2">
              <b-colxx xs="6">
                <span @click="checkedStatus('A')" style="width: 100%">
                  <b-img-lazy
                    :src="
                      require('@/assets/img/gas-restaurant-icon/blue_gasA.svg')
                    "
                    style="width: 100px"
                  ></b-img-lazy>
                </span>
              </b-colxx>
              <b-colxx xs="6">
                <span @click="checkedStatus('B')" style="width: 100%">
                  <b-img-lazy
                    :src="
                      require('@/assets/img/gas-restaurant-icon/gray_gasB.svg')
                    "
                    style="width: 100px"
                  ></b-img-lazy>
                </span>
              </b-colxx>
            </b-row>
          </template>
          <template v-else>
            <b-row class="p-2">
              <b-colxx xs="6">
                <span @click="checkedStatus('A')" style="width: 100%">
                  <b-img-lazy
                    :src="
                      require('@/assets/img/gas-restaurant-icon/gray_gasA.svg')
                    "
                    style="width: 100px"
                  ></b-img-lazy>
                </span>
              </b-colxx>
              <b-colxx xs="6">
                <span @click="checkedStatus('B')" style="width: 100%">
                  <b-img-lazy
                    :src="
                      require('@/assets/img/gas-restaurant-icon/blue_gasB.svg')
                    "
                    style="width: 100px"
                  ></b-img-lazy>
                </span>
              </b-colxx>
            </b-row>
          </template>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal id="export-modal" :title="titleForm" class="text-center">
      <b-row>
        <b-colxx lg="12">
          <b-form-group :label="$t('dashboards.store') + ':'">
            <b-form-select
              v-model="storeDefault"
              :options="storeOptions"
              size="sm"
              @change="changeOption(storeDefault)"
            ></b-form-select>
          </b-form-group>
        </b-colxx>
        <!-- <b-colxx lg="12">
          <b-form-group :label="$t('modal.from-date') + ':'">
            <b-form-datepicker
              locale="vi"
              v-model="fromDateDefault"
              required
            ></b-form-datepicker>
          </b-form-group>
        </b-colxx>
        <b-colxx lg="12">
          <b-form-group :label="$t('modal.to-date') + ':'">
            <b-form-datepicker
              locale="vi"
              v-model="toDateDefault"
              required
            ></b-form-datepicker>
          </b-form-group>
        </b-colxx> -->
      </b-row>
      <template #modal-footer="{ cancel }">
        <b-button variant="success" @click="handleSubmitExport(0)">
          {{ $t("report.action.download-excel") }}
        </b-button>
        <b-button variant="danger" @click="cancel()"> Cancel </b-button>
      </template>
    </b-modal>
    <b-modal
      id="notify-modal"
      ref="notify-modal"
      hide-footer
      :title="$t('notify.notification').toUpperCase()"
    >
      <div class="text-center mb-4">
        <b-img
          :src="require('@/assets/img/V.svg')"
          style="height: 100px"
        ></b-img>
      </div>
      <strong class="text-center">
        <p class="mb-0">{{ $t("notify.noti-check-2") }}.</p>
        <p class="mb-0">{{ $t("notify.noti-check-3") }}!</p>
      </strong>
    </b-modal>
  </div>
</template>
<script>
import excelAPI from "@/api/modules/excelAPI";
import CustomTables from "@/components/Table/CustomTables";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import mapAPI from "@/api/modules/mapAPI";
import gasRestaurantAPI from "@/api/modules/gasRestaurantAPI";
import GasRestaurantPopup from "@/views/app/map/popup-modals/GasRestaurantDetail";
import gasSalesAPI from "@/api/modules/gasSalesAPI";

export default {
  components: {
    "custom-table": CustomTables,
    "gas-restaurant-popup": GasRestaurantPopup,
  },
  data() {
    return {
      titleForm: null,
      timer,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      dataMapNow: null,
      dataModal: null,
      layerLoad: "GasRestaurent",
      lockState: null,
      lock: "",
      lockStation: null,
      useGasStation: null,
      selectedUseGas: null,
      fromDateDefault: handling.convertDateToPicker(
        handling.getDateSubtract(30)
      ),
      toDateDefault: handling.convertDateToPicker(handling.getDateNow()),
      storeOptions: null,
      storeDefault: null,
      storeName: null,
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
    };
  },
  watch: {
    dataMapNow() {
      if (this.dataModal && this.dataMapNow) {
        this.dataModal = this.returnDataModal(
          this.dataModal.StationID,
          this.dataMapNow
        );
      }
    },
    items() {
      this.getColumn("MonitorByGasRestaurants");
    },
  },
  methods: {
    changeOption(store) {
      this.getData(store);
      this.getKeyTable(store);
    },
    exportModal() {
      this.titleForm = this.$t("report.action.download-excel").toUpperCase();
      setTimeout(() => {
        this.$bvModal.show("export-modal");
      }, this.timer);
    },
    handleSubmitExport(value) {
      let body = {
        StoreID: this.storeDefault,
        UserIDCurent: this.userID,
        MenuIDCurent: this.objectData.menuIDCurrent,
        ExportType: this.typeFile,
        IsAll: value,
        FromDate: this.fromDateDefault,
        ToDate: this.toDateDefault,
      };
      excelAPI
        .exportExcel(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
            this.$bvModal.show("notify-modal");
          } else {
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
          this.$bvModal.hide("export-modal");
        })
        .catch((err) => console.log(err));
    },
    selectOption(id) {
      let result = this.storeOptions.find((item) => item.value == id);
      this.storeName = result.text;
      this.getData(id);
    },
    getOption() {
      gasSalesAPI
        .getStoreList()
        .then((val) => {
          let options = val.status ? val.data : null;
          if (options?.length > 0) {
            let array = [];
            options.forEach((ele) => {
              let obj = {
                value: ele.StoreID,
                text: ele.StoreName,
              };
              array.push(obj);
            });
            this.storeOptions = array;
            this.storeDefault =
              this.storeOptions?.length > 0 ? this.storeOptions[0].value : null;
            this.storeName =
              this.storeOptions?.length > 0 ? this.storeOptions[0].text : null;
          }
          this.getData(this.storeDefault);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData(id) {
      let body = {
        StoreID: id ? id : this.storeDefault,
      };
      gasRestaurantAPI
        .gasRestaurantMonitor(body)
        .then((val) => {
          this.items = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable() {
      let body = {
        StoreID: this.storeDefault,
      };
      gasRestaurantAPI
        .gasRestaurantMonitor(body)
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitOrder(val) {
      if (val.status) {
        setTimeout(() => {
          this.makeToast(
            "success",
            this.$t("toast.success").toUpperCase(),
            val.message
          );
        }, this.timer);
      } else {
        setTimeout(() => {
          this.makeToast(
            "danger",
            this.$t("toast.fail").toUpperCase(),
            val.message
          );
        }, this.timer);
      }
      if (this.layerLoad) {
        this.getMapNow(this.layerLoad);
      }
    },
    submitLockOK(note, items) {
      let body = {
        StationID: items.StationID,
        IsLock: handling.convertBooleanToBit(!items.IsLock),
        LockDescription: note,
      };
      gasRestaurantAPI.gasRestaurantLock(body).then((val) => {
        if (val.status) {
          this.getData(this.storeDefault);
          this.makeToast(
            "success",
            this.$t("toast.success").toUpperCase(),
            val.message
          );
        } else {
          this.getData(this.storeDefault);
          this.makeToast(
            "danger",
            this.$t("toast.fail").toUpperCase(),
            val.message
          );
        }
      });
    },
    handleSubmitLock() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$nextTick(() => {
        this.submitLockOK(this.lock, this.lockStation);
        this.$bvModal.hide("modal-lock");
      });
    },
    handleOkLock(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitLock();
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.lockState = valid;
      return valid;
    },
    resetModalLock() {
      this.lock = "";
      this.lockState = null;
      this.lockStation = null;
      this.getMapNow(this.layerLoad);
    },
    lockGasModal(items) {
      this.lockStation = items;
      setTimeout(() => {
        this.$bvModal.show("modal-lock");
      }, 200);
    },
    statusEditModal(items) {
      this.lockStation = items;
      this.lockStation.IsLock = !items.IsLock;
      setTimeout(() => {
        this.$bvModal.show("modal-lock");
      }, 200);
    },
    submitUseGasOK(note, items) {
      let body = {
        StationID: items.StationID,
        ValDefault: note,
        // ValDefault: handling.convertBooleanToBit(note),
      };
      gasRestaurantAPI.gasRestaurantGasUse(body).then((val) => {
        if (val.status) {
          this.getData(this.storeDefault);
          this.makeToast(
            "success",
            this.$t("toast.success").toUpperCase(),
            val.message
          );
        } else {
          this.getData(this.storeDefault);
          this.makeToast(
            "danger",
            this.$t("toast.fail").toUpperCase(),
            val.message
          );
        }
      });
    },
    handleSubmitUseGas() {
      this.$nextTick(() => {
        this.submitUseGasOK(this.selectedUseGas, this.useGasStation);
        this.$bvModal.hide("modal-use-gas");
      });
    },
    handleOkUseGas(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitUseGas();
    },
    resetModalUseGas() {
      this.useGasStation = null;
      this.selectedUseGas = [];
      this.getMapNow(this.layerLoad);
    },
    useGasModal(items) {
      this.useGasStation = items[0];
      this.selectedUseGas = items[0].GasUsing;
      setTimeout(() => {
        this.$bvModal.show("modal-use-gas");
      }, 200);
    },
    checkedStatus(string) {
      this.selectedUseGas = string;
    },
    resetSystemModal(items) {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question-reset") + items[0].StationName + "?",
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
            this.handleSubmitReset(items[0].StationID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitReset(id) {
      let body = {
        StationID: id,
      };
      gasRestaurantAPI
        .gasRestaurantReset(body)
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
    refreshSystemModal(items) {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question-refresh") + items[0].StationName + "?",
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
            this.handleSubmitRefresh(items[0].StationID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitRefresh(id) {
      let body = {
        StationID: id,
      };
      gasRestaurantAPI
        .gasRestaurantRefresh(body)
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
    resetModal() {
      this.dataModal = null;
    },
    infoModal(items) {
      setTimeout(() => {
        this.dataModal = this.returnDataModal(
          items[0].StationID,
          this.dataMapNow
        );
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
          if (id === dataMapNow[i].DataProperties[j].StationID) {
            data = dataMapNow[i].DataProperties[j];
          }
        }
      }
      data.moduleType = "GasRestaurent";
      return data;
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    convertDate(string) {
      return handling.convertDate(string);
    },
    convertDateTime(string) {
      return handling.convertDateTime(string);
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
      this.getData(this.storeDefault);
      if (this.layerLoad) {
        this.getMapNow(this.layerLoad);
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
          let result = val.status && val.data.length > 0 ? val.data[0] : null;
          // if (
          //   result &&
          //   result.DataProperties &&
          //   result.DataProperties.length > 0
          // ) {
          //   this.items = result.DataProperties
          //   this.objectKey = Object.keys(result.DataProperties[0])
          // }
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
    await this.getOption();
    await this.getListMenuRight();
    await this.getColumn("MonitorByGasRestaurants");
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
.custom-style-body {
  background-color: red;
}
</style>
