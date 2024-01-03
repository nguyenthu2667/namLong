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
      ref="modal-item"
      v-if="dataModal"
      hide-header
      size="xl"
      ok-only
      scrollable
      @hidden="resetModal"
    >
      <cabinet-popup
        :data-parent="dataModal"
        :access-write="objectData.accessWrite"
      ></cabinet-popup>
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
import waterwayAPI from "@/api/modules/waterwayAPI";
import CabinetPopup from "@/views/app/map/popup-modals/WaterwayCabinet";

export default {
  components: {
    "custom-table": CustomTables,
    "cabinet-popup": CabinetPopup,
  },

  data() {
    return {
      isShow: false,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
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
      layerLoad: "Waterway",
      dataChange: false,
      cabinetOption: [],
      lightOption: [],
      dataModalHistory: null,
      optionsSchedulesLamp: [
        { text: this.$t("modal.monday"), value: "T2" },
        { text: this.$t("modal.tuesday"), value: "T3" },
        { text: this.$t("modal.wednesday"), value: "T4" },
        { text: this.$t("modal.thursday"), value: "T5" },
        { text: this.$t("modal.friday"), value: "T6" },
        { text: this.$t("modal.saturday"), value: "T7" },
        { text: this.$t("modal.sunday"), value: "CN" },
      ],
    };
  },
  updated() {
    setTimeout(() => {
      this.isShow = true;
    }, 500);
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
      this.getColumn("WaterwayMonitor");
      this.getKeyTable();
    },
  },
  methods: {
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
      this.dataChange = false;
      this.dataModalHistory = null;
    },
    infoModal(items) {
      this.getMapNow(this.layerLoad);
      setTimeout(() => {
        this.dataModal = this.returnDataModal(
          items[0].StationID,
          this.dataMapNow
        );
        this.dataModalHistory = this.returnDataModal(
          items[0].StationID,
          this.dataMapNow
        );
        this.dataChange = false;
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
      return data;
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    returnSchedulesLamp(obj) {
      let arr = [];
      if (obj.CN === 1) {
        arr.push("CN");
      }
      if (obj.T2 === 1) {
        arr.push("T2");
      }
      if (obj.T3 === 1) {
        arr.push("T3");
      }
      if (obj.T4 === 1) {
        arr.push("T4");
      }
      if (obj.T5 === 1) {
        arr.push("T5");
      }
      if (obj.T6 === 1) {
        arr.push("T6");
      }
      if (obj.T7 === 1) {
        arr.push("T7");
      }
      return arr;
    },
    changeSchedule(id, status) {
      let body = {
        StationID: id,
        IsSchedule: handling.convertBooleanToBit(status),
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      waterwayAPI
        .mapCabinetActionSchedules(body)
        .then((val) => {
          if (val.status) {
            this.getData();
            setTimeout(() => {
              this.dataModal.IsSchedule = status;
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.dataModal.IsSchedule = !status;
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.dataModal.IsSchedule = !status;
          }, this.timer);
          console.log(err);
        });
    },
    handleChangeOnOff(id, status) {
      let body = {
        StationID: id,
        CabinetStatus: handling.convertBooleanToBit(status),
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      waterwayAPI
        .mapCabinetChangeStatus(body)
        .then((val) => {
          if (val.status) {
            this.getData();
            setTimeout(() => {
              this.dataModal.CabinetStatus = status;
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.dataModal.CabinetStatus = !status;
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.dataModal.CabinetStatus = !status;
          }, this.timer);
          console.log(err);
        });
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
      waterwayAPI
        .waterWayMonitorList()
        .then((val) => {
          this.items = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable() {
      waterwayAPI
        .waterWayMonitorList()
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
          this.listColumnShow = val.status
            ? val.data.map((item) => {
                if (
                  item.ClName === "StationMoved" ||
                  item.ClName === "StationError" ||
                  item.ClName === "StationDisconnect" ||
                  item.ClName === "StationLowPin" ||
                  item.ClName === "StationTotal"
                ) {
                  return { ...item, custom: "custom" };
                }
                return { ...item };
              })
            : [];
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
    // await this.loadCabinetOption()
    // await this.loadLightOption()
    await this.getColumn("WaterwayMonitor");
    await this.getKeyTable();
    await this.timeLoadData(this.timer * 120);
  },
  computed: {
    fields: function () {
      let newFields = handling.mergeTableAndData(
        this.objectKey,
        this.listColumnShow
      );
      if (newFields && newFields.length > 0) {
        newFields.forEach((item) => {
          if (
            item.key === "StationMoved" ||
            item.key === "StationError" ||
            item.key === "StationDisconnect" ||
            item.key === "StationLowPin" ||
            item.key === "StationTotal"
          ) {
            item.tdClass = "text-right pt-3";
          }
        });
      }
      return newFields;
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

.custom-checkbox {
  position: absolute;
  top: -3px;
  left: 120px;
  padding-right: 15px;
  z-index: 99999;
}
</style>
