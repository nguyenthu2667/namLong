<template>
  <div>
    <div>
      <div>
        <b-row>
          <b-colxx xxs="12">
            <div class="d-flex justify-content-lg-between">
              <h4 class="text-capitalize">
                <strong>{{ $t("form.camera-device") }}</strong>
              </h4>
              <div @click="editModalCamera" style="cursor: pointer">
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.edit") }}
              </div>
            </div>
          </b-colxx>
        </b-row>
        <b-row>
          <b-colxx xxs="12" class="mb-4">
            <b-card>
              <custom-table
                ref="tableForm"
                :data-table="dataCamera"
                :select-mode="selectMode"
                :field-table="fieldsCamera"
                :column-show="listColumnShowCamera"
                :row-page="3"
              ></custom-table>
            </b-card>
          </b-colxx>
        </b-row>
      </div>
      <div>
        <b-row>
          <b-colxx xxs="12">
            <div class="d-flex justify-content-lg-between">
              <h4 class="text-capitalize">
                <strong>{{ $t("form.speaker-device") }}</strong>
              </h4>
              <div @click="editModalSpeaker" style="cursor: pointer">
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.edit") }}
              </div>
            </div>
          </b-colxx>
        </b-row>
        <b-row>
          <b-colxx xxs="12" class="mb-4">
            <b-card>
              <custom-table
                ref="tableForm"
                :data-table="dataSpeaker"
                :select-mode="selectMode"
                :field-table="fieldsSpeaker"
                :column-show="listColumnShowSpeaker"
                :row-page="3"
              ></custom-table>
            </b-card>
          </b-colxx>
        </b-row>
      </div>
      <div>
        <b-row>
          <b-colxx xxs="12">
            <div class="d-flex justify-content-lg-between">
              <h4 class="text-capitalize">
                <strong>{{ $t("form.monitor-device") }}</strong>
              </h4>
              <div style="cursor: pointer" @click="editModalLink">
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.edit") }}
              </div>
            </div>
          </b-colxx>
        </b-row>
        <b-row>
          <b-colxx xxs="12">
            <b-card>
              <custom-table
                ref="tableForm"
                :data-table="dataLink"
                :select-mode="selectMode"
                :field-table="fieldsLink"
                :column-show="listColumnShowLink"
                :row-page="3"
              ></custom-table>
            </b-card>
          </b-colxx>
        </b-row>
      </div>
    </div>
    <div>
      <b-modal
        id="modal-location-detail"
        @hidden="resetTable"
        centered
        hide-header
        size="xl"
        hide-footer
      >
        <b-row>
          <b-colxx xxs="12" class="mb-4">
            <b-card>
              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <h3 class="text-uppercase">{{ titleTable }}</h3>
                <div class="d-flex">
                  <b-button
                    pill
                    variant="secondary"
                    class="mr-1"
                    @click="$bvModal.hide('modal-location-detail')"
                    >Cancel</b-button
                  >
                  <b-button
                    pill
                    variant="primary"
                    @click="handleModalEdit"
                    :disabled="dataSelectChange.length === dataCheckOk.length"
                    >OK</b-button
                  >
                </div>
              </div>
              <custom-table-all
                ref="tableForm"
                :data-table="dataDetailDevice"
                :select-mode="selectMode"
                :field-table="fieldsCameraCustom"
                :column-show="listColumnShowCamera"
                :row-page="8"
                @changeCheck="handleCheckSelect"
              ></custom-table-all>
            </b-card>
          </b-colxx>
        </b-row>
      </b-modal>
    </div>
    <div id="custom-spinner-load-submit">
      <div class="form-spinner">
        <div class="spinner">
          <div class="inner one"></div>
          <div class="inner two"></div>
          <div class="inner three"></div>
        </div>
        <div class="text-spinner">
          <p>{{ $t("cards.loading") }} ...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timer } from "@/constants/config";

import handling from "@/constants/handling";

import systemAPI from "@/api/modules/systemAPI.js";

import CustomTables from "@/views/app/category/monitor/locations/CustomTables";
import CustomTablesAll from "@/views/app/category/monitor/locations/CustomTablesAll";
import monitorAPI from "@/api/modules/monitorAPI.js";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-table-all": CustomTablesAll,
  },
  props: [
    "dataCamera",
    "fieldsCamera",
    "listColumnShowCamera",
    "dataSpeaker",
    "fieldsSpeaker",
    "listColumnShowSpeaker",
    "dataLink",
    "fieldsLink",
    "listColumnShowLink",
    "selectMode",
    "selectedItems",
  ],
  data() {
    return {
      dataDetailDevice: [],
      dataSelectChange: [],
      apiForm: "",
      typeTable: "",
      titleTable: "",
      dataCheckOk: [],
    };
  },
  computed: {
    fieldsCameraCustom() {
      if (
        this.fieldsCamera &&
        this.fieldsCamera.length > 0 &&
        this.typeTable === "Camera"
      ) {
        return [
          ...this.fieldsCamera,
          {
            key: "check",
            label: "Chọn thiết bị",
            sortNum: 8,
            sortable: true,
            tdClass: "text-center pt-3",
          },
        ];
      }
      if (
        this.fieldsSpeaker &&
        this.fieldsSpeaker.length > 0 &&
        this.typeTable === "Speaker"
      ) {
        return [
          ...this.fieldsSpeaker,
          {
            key: "check",
            label: "Chọn thiết bị",
            sortNum: 8,
            sortable: true,
            tdClass: "text-center pt-3",
          },
        ];
      }
      if (
        this.fieldsLink &&
        this.fieldsLink.length > 0 &&
        this.typeTable === "Link"
      ) {
        return [
          ...this.fieldsLink,
          {
            key: "check",
            label: "Chọn thiết bị",
            sortNum: 8,
            sortable: true,
            tdClass: "text-center pt-3",
          },
        ];
      }
      return [];
    },
  },
  methods: {
    resetTable() {
      console.log("Reset 111");
      this.dataSelectChange = [];
      this.dataDetailDevice = [];
      this.apiForm = "";
      this.dataCheckOk = [];
    },
    handleCheckSelect(item) {
      if (item.IsCheck === true) {
        this.add(item);
      } else {
        this.remove(item);
      }
    },
    add(item) {
      if (this.typeTable === "Camera") {
        this.dataSelectChange.push({
          ID: item.ID,
          Channel: item.Channel,
        });
        console.log(this.dataSelectChange);
      }
      if (this.typeTable === "Speaker") {
        this.dataSelectChange.push(item.ID);
      }
      if (this.typeTable === "Link") {
        this.dataSelectChange.push(item.StationID);
        console.log(this.dataSelectChange);
      }
    },
    remove(item) {
      if (this.typeTable === "Camera") {
        this.dataSelectChange = this.dataSelectChange.filter((_item) => {
          return (
            (_item.ID === item.ID || _item.ID !== item.ID) &&
            _item.Channel !== item.Channel
          );
        });
      }
      if (this.typeTable === "Speaker") {
        this.dataSelectChange = this.dataSelectChange.filter((_item) => {
          return _item !== item.ID;
        });
        console.log(this.dataSelectChange);
      }
      if (this.typeTable === "Link") {
        this.dataSelectChange = this.dataSelectChange.filter((_item) => {
          return _item !== item.StationID;
        });
      }
    },
    editModalCamera() {
      let body = {
        LocationID: this.selectedItems[0].ID,
      };
      this.titleTable = this.$t("modal.device-option") + this.$t("form.camera");
      this.typeTable = "Camera";
      this.apiForm = "/api/StationLinks/EditDevice";
      monitorAPI
        .cameraStationsDevicesByID(body)
        .then((val) => {
          this.dataDetailDevice = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (this.dataDetailDevice) {
            this.dataDetailDevice = this.dataDetailDevice.map((e) => ({
              ...e,
              IsCheck: handling.convertBitToBoolean(e.IsCheck),
            }));
          }
          this.dataDetailDevice.forEach((x) => {
            if (x.IsCheck === true) {
              this.dataSelectChange.push({
                ID: x.ID,
                Channel: x.Channel,
              });
            }
          });
          this.dataCheckOk = JSON.parse(JSON.stringify(this.dataSelectChange));
        })
        .catch((err) => {
          console.log(err);
        });
      setTimeout(() => {
        this.$bvModal.show(`modal-location-detail`);
      }, this.timer);
    },

    editModalSpeaker() {
      let body = {
        LocationID: this.selectedItems[0].ID,
      };
      this.titleTable =
        this.$t("modal.device-option") + this.$t("form.speaker");
      this.typeTable = "Speaker";
      this.apiForm = "/api/StationLinks/EditSpeaker";
      monitorAPI
        .speakerStationsDevicesByID(body)
        .then((val) => {
          this.dataDetailDevice = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (this.dataDetailDevice) {
            this.dataDetailDevice = this.dataDetailDevice.map((e) => ({
              ...e,
              IsCheck: handling.convertBitToBoolean(e.IsCheck),
            }));
          }
          this.dataDetailDevice.forEach((x) => {
            if (x.IsCheck === true) {
              this.dataSelectChange.push(x.ID);
            }
          });
          this.dataCheckOk = JSON.parse(JSON.stringify(this.dataSelectChange));
        })
        .catch((err) => {
          console.log(err);
        });
      setTimeout(() => {
        this.$bvModal.show(`modal-location-detail`);
      }, this.timer);
    },
    editModalLink() {
      let body = {
        LocationID: this.selectedItems[0].ID,
      };
      this.titleTable =
        this.$t("modal.device-option") + this.$t("form.monitor");
      this.typeTable = "Link";
      this.apiForm = "/api/StationLinks/EditStations";
      monitorAPI
        .linkStationsDevicesByID(body)
        .then((val) => {
          this.dataDetailDevice = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (this.dataDetailDevice) {
            this.dataDetailDevice = this.dataDetailDevice.map((e) => ({
              ...e,
              IsCheck: handling.convertBitToBoolean(e.IsCheck),
            }));
          }
          this.dataDetailDevice.forEach((x) => {
            if (x.IsCheck === true) {
              this.dataSelectChange.push(x.StationID);
            }
          });
          this.dataCheckOk = JSON.parse(JSON.stringify(this.dataSelectChange));
        })
        .catch((err) => {
          console.log(err);
        });
      setTimeout(() => {
        this.$bvModal.show(`modal-location-detail`);
      }, this.timer);
    },

    handleModalEdit() {
      let arrNew = [];
      if (this.typeTable === "Camera") {
        arrNew = [...this.dataSelectChange];
      } else if (this.typeTable === "Speaker") {
        this.dataSelectChange.forEach((x) => {
          arrNew.push(x + "");
        });
      } else {
        arrNew = [...this.dataSelectChange];
      }
      let body = {
        LocationID: this.selectedItems[0].ID,
        ListDevices: arrNew,
      };
      if (body && body.length > 0) {
        body.ListDevices = body.ListDevices.map((x) => ({
          ...x,
          IsCheck: handling.convertBooleanToBit(x.IsCheck),
        }));
      }
      let spinnerDiv = document.getElementById("custom-spinner-load-submit");
      spinnerDiv.style.display = "block";
      console.log(body);
      systemAPI
        .submitData(this.apiForm, body)
        .then((val) => {
          this.dataDetailDevice = [];
          this.dataSelectChange = [];
          spinnerDiv.style.display = "none";
          this.$emit("handle-submit-detail", val);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#custom-spinner-load-submit {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.form-spinner {
  --size: 80px;

  width: var(--size);
  height: var(--size);

  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.text-spinner p {
  font-weight: bold;
  color: white;
}

.spinner {
  --size: 62px;

  width: var(--size);
  height: var(--size);

  border-radius: 50%;
  perspective: 800px;

  margin-bottom: 10px;
  /*margin-left: 10px;*/
}

.inner {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
}

.inner.one {
  left: 0;
  top: 0;
  animation: rotate-one 1s linear infinite;
  border-bottom: 3px solid #2cfffe;
}

.inner.two {
  right: 0;
  top: 0;
  animation: rotate-two 1s linear infinite;
  border-right: 3px solid #fcc10f;
}

.inner.three {
  right: 0;
  bottom: 0;
  animation: rotate-three 1s linear infinite;
  border-top: 3px solid #ec1b60;
}

@keyframes rotate-one {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes rotate-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes rotate-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
