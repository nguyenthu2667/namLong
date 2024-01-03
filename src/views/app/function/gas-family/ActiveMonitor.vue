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
                &emsp;{{ $t("pages.restart-device") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-undo"></i>
                &emsp;{{ $t("pages.restart-device") }}
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
            @row-selected="rowSelected"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
    <b-modal
      id="modal-item"
      v-if="dataModal"
      hide-header
      size="lg"
      ok-only
      centered
      scrollable
      @hide="resetModal"
    >
      <gas-family-popup
        :data-parent="dataModal"
        :dataMapNow="dataMapNow"
      ></gas-family-popup>
    </b-modal>
  </div>
</template>
<script>
import CustomTables from "@/components/Table/CustomTables";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import mapAPI from "@/api/modules/mapAPI";
import gasFamilyAPI from "@/api/modules/gasFamilyAPI";
import GasFamilyPopup from "@/views/app/map/popup-modals/GasFamilyDetail";
import gasSalesAPI from "@/api/modules/gasSalesAPI";

export default {
  components: {
    "custom-table": CustomTables,
    "gas-family-popup": GasFamilyPopup,
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
      layerLoad: "GasFamily",
      fromDateDefault: handling.convertDateToPicker(
        handling.getDateSubtract(30)
      ),
      toDateDefault: handling.convertDateToPicker(handling.getDateNow()),
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      storeOptions: null,
      storeDefault: null,
      storeName: null,
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
      this.getColumn("MonitorByGasFamilys");
      this.getKeyTable();
    },
  },
  methods: {
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
      gasFamilyAPI
        .gasFamilyReset(body)
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
      this.getMapNow(this.layerLoad);
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
      data.moduleType = "GasFamily";
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData(id) {
      let body = {
        StoreID: id ? id : this.storeDefault,
      };
      gasFamilyAPI
        .gasFamilyMonitor(body)
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
      gasFamilyAPI
        .gasFamilyMonitor(body)
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
    convertPickerToDate(string) {
      return handling.convertPickerToDate(string);
    },
  },
  async created() {
    await this.getOption();
    await this.getListMenuRight();
    await this.getColumn("MonitorByGasFamilys");
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
