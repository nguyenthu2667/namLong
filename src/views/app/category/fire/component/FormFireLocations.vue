<template>
  <div>
    <template v-if="dataForm" class="form-fire-location">
      <b-col lg="12" class="pl-0">
        <b-row>
          <b-col lg="8">
            <b-row>
              <b-col lg="4">
                <b-form-group
                  :label="dataForm.Name[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.Name[3]"
                >
                  <b-form-input
                    v-model="dataForm.Name[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    @input="resetStateInput('Name')"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="8">
                <b-form-group
                  :label="dataForm.Address[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.Address[3]"
                >
                  <b-form-input
                    v-model="dataForm.Address[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    @input="resetStateInput('Address')"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="4">
                <b-form-group
                  :label="dataForm.NameExtention1[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.NameExtention1[3]"
                >
                  <b-form-input
                    v-model="dataForm.NameExtention1[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="8">
                <b-form-group
                  :label="dataForm.AddressExtention1[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.AddressExtention1[3]"
                >
                  <b-form-input
                    v-model="dataForm.AddressExtention1[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="3">
            <b-form-group :label="dataForm.Note[0]">
              <b-form-textarea
                v-model="dataForm.Note[1]"
                rows="2"
                max-rows="6"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                style="height: 113px"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="1">
            <b-form-group label="ID">
              <b-form-input
                :value="dataForm.ID ? dataForm.ID[1] : 'AUTO'"
                disabled
                class="text-center"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.Phone[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.Phone[3]"
            >
              <b-form-input
                v-model="dataForm.Phone[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                class="text-right"
                @input="resetStateInput('Phone')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.Email[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.Email[3]"
            >
              <b-form-input
                v-model="dataForm.Email[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                @input="resetStateInput('Email')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.Lat[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.Lat[3]"
            >
              <b-form-input
                v-model="dataForm.Lat[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                class="text-right"
                @input="resetStateInput('Lat')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.Long[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.Long[3]"
            >
              <b-form-input
                v-model="dataForm.Long[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                class="text-right"
                @input="resetStateInput('Long')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group
              :label="dataForm.IsActive[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.IsActive[3]"
              v-if="dataForm.IsActive"
            >
              <div class="d-flex">
                <b-form-radio
                  v-model="dataForm.IsActive[1]"
                  :value="1"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                  >{{ $t("npl.using") }}</b-form-radio
                >
                <b-form-radio
                  v-model="dataForm.IsActive[1]"
                  :value="0"
                  class="ml-2"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                  >{{ $t("npl.not-use") }}</b-form-radio
                >
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <!-- <b-col lg="3">
            <b-form-group
              :label="dataForm.LinkAvatar[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.LinkAvatar[3]"
            >
              <b-form-file
                :placeholder="$t('modal.please-choose-file')"
                :browse-text="$t('modal.choose-file')"
                v-model="file"
              ></b-form-file>
            </b-form-group>
            <div class="show-image-video-2" v-if="base64String">
              <div class="show-image-video-2-2">
                <b-img :src="base64String"></b-img>
              </div>
            </div>
          </b-col> -->
        </b-row>
        <b-row v-if="dataForm.ID">
          <b-col lg="5" style="overflow-x: auto">
            <FireStationsTable
              :items="dataTableFireStations"
              :fields="[
                { key: 'StationID', label: $t('fire.device-id') },
                { key: 'StationName', label: $t('fire.device-name') },
                { key: 'SessionData', label: $t('fire.period') },
                { key: 'IsActive', label: $t('fire.status') },
                { key: 'Action', label: $t('fire.action') },
              ]"
              :title="$t('fire.fire-station-management')"
              :defaultSelect="selectedFireStations"
              @add="addFireStations"
              @edit="editFireStations"
              @remove="removeFireStations"
              @rowSelected="changeSelectedFireStations"
            />
          </b-col>
          <b-col lg="7">
            <b-row>
              <b-col lg="6">
                <LocationTable
                  :items="dataTableAlarmCabinetLocation"
                  :fields="[
                    { key: 'STT', label: $t('fire.no') },
                    {
                      key: 'FireLocationDetailName',
                      label: $t('fire.location'),
                    },
                    { key: 'Action', label: this.$t('fire.action') },
                  ]"
                  :title="$t('fire.alarm-cabinet-location')"
                  :defaultSelect="selectedAlarmCabinetLocation"
                  tableName="AlarmCabinetLocation"
                  @edit="editLocationName"
                  @rowSelected="changeSelectedAlarmCabinetLocation"
                />
              </b-col>
              <b-col lg="6">
                <FireNodesTable
                  :items="dataTableAlarmCabinet"
                  :fields="[
                    { key: 'ID', label: $t('fire.device-id') },
                    { key: 'STT', label: $t('fire.no') },
                    { key: 'NodeName', label: $t('fire.node-name') },
                    { key: 'Action', label: $t('fire.action') },
                  ]"
                  :title="$t('fire.list-of-alarm-cabinet')"
                  tableName="AlarmCabinet"
                  :showAdd="selectedAlarmCabinetLocation ? true : false"
                  @add="addFireNodes"
                  @edit="editFireNodes"
                  @remove="removeFireNodes"
                />
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col lg="6">
                <LocationTable
                  :items="dataTableFireAlarmsLocation"
                  :fields="[
                    { key: 'STT', label: $t('fire.no') },
                    {
                      key: 'FireLocationDetailName',
                      label: $t('fire.location'),
                    },
                    { key: 'Action', label: this.$t('fire.action') },
                  ]"
                  :title="$t('fire.fire-alarms-location')"
                  :defaultSelect="selectedFireAlarmsLocation"
                  @edit="editLocationName"
                  @rowSelected="changeSelectedFireAlarmsLocation"
                />
              </b-col>
              <b-col lg="6">
                <FireNodesTable
                  :items="dataTableFireAlarms"
                  :fields="[
                    { key: 'ID', label: $t('fire.device-id') },
                    { key: 'STT', label: $t('fire.no') },
                    { key: 'NodeName', label: $t('fire.node-name') },
                    { key: 'Action', label: $t('fire.action') },
                  ]"
                  :title="$t('fire.list-of-fire-alarms')"
                  tableName="FireAlarms"
                  :showAdd="selectedFireAlarmsLocation ? true : false"
                  @add="addFireNodes"
                  @edit="editFireNodes"
                  @remove="removeFireNodes"
                />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </template>
    <template v-else>
      {{ $t("cards.no-data") }}
    </template>
    <b-modal
      id="modal-add-fire-station"
      :title="titleModalTable"
      size="lg"
      tableName="FireStations"
      @ok="handleAddFireStations"
      @hidden="hiddenModalAddFireStations"
      cancel-variant="outline-danger"
      :ok-title="$t('modal.change')"
      :cancel-title="$t('modal.cancel')"
    >
      <b-table
        v-if="dataTableSelectFireStations.length > 0"
        :items="dataTableSelectFireStations"
        :fields="[
          { key: 'StationID', label: this.$t('fire.device-id') },
          { key: 'StationName', label: this.$t('fire.device-name') },
        ]"
        :bordered="true"
        head-variant="light"
        id="table-child"
        class="border-bottom"
        select-mode="single"
        selectable
        @row-selected="rowSelectedFireStations"
      >
      </b-table>
      <template v-else>
        {{ $t("cards.no-data") }}
      </template>
    </b-modal>
    <b-modal
      id="modal-edit-deploy-fire-station"
      :title="$t('fire.edit-deploy-fire-station')"
      size="lg"
      tableName="FireStations"
      @ok="hanldeEditDeployFireStations"
      @hidden="hiddenModalEditDeployFireStations"
      cancel-variant="outline-danger"
      :ok-title="$t('modal.change')"
      :cancel-title="$t('modal.cancel')"
    >
      <FormMagementCabinet
        :dataForm="dataFormEditDeployFireStations"
        :listImageBase64="listImageBase64"
      />
    </b-modal>

    <!-- doi ten vi tri lap dat  -->
    <b-modal
      id="modal-change-location-name"
      :title="$t('fire.change-location-name')"
      size="md"
      @ok="hanldeChangeLocationName"
      @hidden="hiddenChangeLocationName"
      cancel-variant="outline-danger"
      :ok-title="$t('modal.change')"
      :cancel-title="$t('modal.cancel')"
    >
      <template v-if="dataFormChangeLocationName">
        <b-form-group
          :label="dataFormChangeLocationName.Name[0]"
          :invalid-feedback="$t('form.no-blank')"
          :state="dataFormChangeLocationName.Name[3]"
        >
          <b-form-input
            v-model="dataFormChangeLocationName.Name[1]"
          ></b-form-input>
        </b-form-group>
      </template>
    </b-modal>

    <!-- them cam bien va tu canh bao -->
    <b-modal
      id="modal-add-fire-node"
      :title="titleModalTable"
      size="lg"
      @ok="handleAddFireNodes"
      @hidden="hiddenModalAddFireNodes"
      cancel-variant="outline-danger"
      :ok-title="$t('modal.change')"
      :cancel-title="$t('modal.cancel')"
    >
      <template v-if="typeNodeID === 1">
        <b-table
          v-if="dataTableSelectFireAlarms.length > 0"
          :items="dataTableSelectFireAlarms"
          :fields="[
            { key: 'ID', label: this.$t('fire.device-id') },
            { key: 'NodeName', label: this.$t('fire.device-name') },
          ]"
          :bordered="true"
          head-variant="light"
          id="table-child"
          class="border-bottom"
          select-mode="single"
          selectable
          @row-selected="rowSelectedFireNodes"
        >
        </b-table>
        <template v-else>
          {{ $t("cards.no-data") }}
        </template>
      </template>
      <template v-if="typeNodeID === 2">
        <b-table
          v-if="dataTableSelectAlarmCabinet.length > 0"
          :items="dataTableSelectAlarmCabinet"
          :fields="[
            { key: 'ID', label: this.$t('fire.device-id') },
            { key: 'NodeName', label: this.$t('fire.device-name') },
          ]"
          :bordered="true"
          head-variant="light"
          id="table-child"
          class="border-bottom"
          select-mode="single"
          selectable
          @row-selected="rowSelectedFireNodes"
        >
        </b-table>
        <template v-else>
          {{ $t("cards.no-data") }}
        </template>
      </template>
    </b-modal>

    <!-- modal cập nhật triển khai cho cảm biến và tủ cảnh báo -->
    <b-modal
      id="modal-edit-deploy-fire-node"
      :title="titleModal"
      size="lg"
      @ok="hanldeEditDeployFireNodes"
      @hidden="hiddenModalEditDeployFireNodes"
      cancel-variant="outline-danger"
      :ok-title="$t('modal.change')"
      :cancel-title="$t('modal.cancel')"
    >
      <FormFireNodes
        :dataForm="dataFormEditDeployFireNodes"
        :listImageBase64="listImageBase64FireNodes"
        :isShowCarousel="isShowCarousel"
      />
    </b-modal>
  </div>
</template>

<script>
import handling from "@/constants/handling.js";
import fireAPI from "@/api/modules/fireAPI";
import systemAPI from "@/api/modules/systemAPI";

import FireStationsTable from "@/views/app/category/fire/component/FireStationsTable";
import LocationTable from "@/views/app/category/fire/component/LocationTable";
import FireNodesTable from "@/views/app/category/fire/component/FireNodesTable";
import FormMagementCabinet from "@/views/app/category/fire/component/FormMagementCabinet";
import FormFireNodes from "@/views/app/category/fire/component/FormFireNodes";

export default {
  props: ["dataForm", "currentMode"],
  components: {
    FireStationsTable,
    LocationTable,
    FormMagementCabinet,
    FireNodesTable,
    FormFireNodes,
  },
  data() {
    return {
      file: null,
      base64String: null,
      dataTableFireStations: [],
      colTypesFireStations: [],
      objectKeysFireStations: [],
      titleModalTable: "",
      titleModal: "",
      dataTableSelectFireStations: [],
      selectedFireStations: "",
      selectedFireStationFromModal: "",
      dataFormEditDeployFireStations: null,
      isCheckIsValid: false,
      notRequired: ["ID", "StationID", "Note", "NameExtention1", "ImageLink"],
      listImageBase64: [],
      listImageBase64FireNodes: [],

      //vị trí lắp đặt của cảm biến
      dataTableFireAlarmsLocation: [],
      dataTableAlarmCabinetLocation: [],

      dataFormChangeLocationName: null,
      selectedAlarmCabinetLocation: null,
      selectedFireAlarmsLocation: null,

      //
      dataTableAlarmCabinet: [],
      dataTableFireAlarms: [],

      selectedAlarmCabinetFromModal: null,
      selectedFireAlarmsFromModal: null,
      dataTableSelectAlarmCabinet: [],
      dataTableSelectFireAlarms: [],
      typeNodeID: "", //1 thiết bị báo cháy (cảm biến), 2 tủ cảnh báo tại chỗ

      dataFormEditDeployFireNodes: null,
      isShowCarousel: false,
    };
  },
  created() {
    this.getColTypes("FireStations");
  },
  watch: {
    "$i18n.locale"() {
      this.getDataFireStations();
      this.getColTypes("FireStations");
    },
    file(newVal) {
      this.getBase64String(newVal);
    },
    dataForm(newVal) {
      this.selectedFireStations = "";
      if (newVal) {
        if (newVal.LinkAvatar) {
          this.base64String = newVal.LinkAvatar[1];
        }
        if (newVal.ID) {
          this.getDataFireStations();
        }
      }
    },
    selectedFireStations(newVal) {
      // console.log('watch selectedFireStations', newVal);
      if (newVal) {
        this.fireLocationDetailsGetType1(newVal);
        this.fireLocationDetailsGetType2(newVal);

        this.selectedAlarmCabinetLocation = null;
        this.selectedFireAlarmsLocation = null;
      } else {
        this.dataTableFireAlarmsLocation = [];
        this.dataTableAlarmCabinetLocation = [];
        this.selectedAlarmCabinetLocation = null;
        this.selectedFireAlarmsLocation = null;
        this.dataTableAlarmCabinet = [];
        this.dataTableFireAlarms = [];
      }
    },
    selectedAlarmCabinetLocation(newVal) {
      if (newVal) {
        this.getDataFireNodes(newVal, 2);
      }
    },
    selectedFireAlarmsLocation(newVal) {
      if (newVal) {
        this.getDataFireNodes(newVal, 1);
      }
    },
  },
  methods: {
    resetStateInput(field) {
      //reset lại state khi có input để nó mất cái dòng cảnh báo đi
      if (this.dataForm[field][3] === false) {
        this.dataForm[field][3] = true;
      }
    },
    generateBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => reject(error);
      });
    },
    async getBase64String(file) {
      // console.log(file);
      const base64 = await this.generateBase64(file);
      if (base64.includes("image")) {
        this.base64String = base64;
        // console.log('this.base64String', this.base64String)
        // const arr = (this.dataForm.Logo[1] = base64);
        // console.log(this.dataForm.Logo[1]);
      } else {
        this.base64String = null;
        this.showNotify(
          "danger",
          this.$t("toast.fail").toUpperCase(),
          this.$t("choose-file-image")
        );
      }
    },
    getDataFireStations(string) {
      let body = {
        LocationID: this.dataForm.ID[1].toString(),
      };
      fireAPI
        .fireStationsByLocationID(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          this.dataTableFireStations = data;
          this.objectKeysFireStations =
            data.length > 0 ? Object.keys(data[0]) : null;
          if (data.length) {
            if (!this.selectedFireStations) {
              this.selectedFireStations = data[0].StationID;
            }
          } else {
            this.selectedFireStations = null;
          }
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
          // this.FireStationsTable[tableName].colTypes = val.status ? val.data : null;
          switch (string) {
            case "FireStations":
              this.colTypesFireStations = val.status ? val.data : null;
              break;

            default:
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFieldsFireStationsTable(keys, colTypes) {
      let result = handling.mergeKeyDynamic(keys, colTypes);
      if (result) {
        result.forEach((item) => {
          item.sortable = false;
          item.tdClass = item.tdClass.replace("pt-2", "");
        });
        return result;
      }
    },
    getDataTableSelectFireStations() {
      fireAPI
        .fireStationGetDeploy()
        .then((val) => {
          this.dataTableSelectFireStations = val.status ? val.data : [];
          this.$bvModal.show("modal-add-fire-station");
        })
        .catch((err) => console.log(err));
    },
    addFireStations() {
      this.titleModalTable = this.$t("fire.add-fire-station").toUpperCase();
      this.getDataTableSelectFireStations();
    },
    rowSelectedFireStations(row) {
      this.selectedFireStationFromModal = row[0].StationID;
    },
    handleAddFireStations(bvModalEvent) {
      bvModalEvent.preventDefault();
      if (!this.selectedFireStationFromModal) {
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("fire.no-device-to-add")
        );
      }
      let body = {
        StationID: this.selectedFireStationFromModal.toString(),
        LocationID: this.dataForm.ID[1].toString(),
      };
      fireAPI
        .fireStationEditLocation(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataFireStations();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.$bvModal.hide("modal-add-fire-station");
        })
        .catch((err) => console.log(err));
    },
    hiddenModalAddFireStations() {
      this.selectedFireStationFromModal = null;
    },
    hiddenModalEditDeployFireStations() {
      this.dataFormEditDeployFireStations = null;
      this.listImageBase64 = [];
    },
    editFireStations(obj) {
      const id = obj.item.StationID.toString();
      let body = {
        StationID: id,
      };
      fireAPI
        .fireStationByID(body)
        .then((val) => {
          const obj = val.status ? val.data : null;
          if (obj) {
            let newObj = handling.showExtensionFormEdit(obj);
            this.dataFormEditDeployFireStations = {
              ...newObj,
              ID: ["ID", id, "ID", null],
            };
            this.$bvModal.show("modal-edit-deploy-fire-station");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeFireStations(obj) {
      let body = {
        StationID: obj.item.StationID.toString(),
      };
      fireAPI
        .fireStationDelLocation(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataFireStations();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
        })
        .catch((err) => console.log(err));
    },
    hanldeEditDeployFireStations(bvModalEvent) {
      bvModalEvent.preventDefault();
      if (!this.dataFormEditDeployFireStations) return;
      this.isCheckIsValid = true;
      if (!this.checkFormValidate("FireStations")) {
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("toast.content")
        );
      }
      this.isCheckIsValid = false;
      let obj = {};
      for (const key in this.dataFormEditDeployFireStations) {
        if (key === "ImageLink") {
          obj.ImageLink = [];
          if (this.dataFormEditDeployFireStations[key][1]?.length > 0) {
            // ImageLink
            this.dataFormEditDeployFireStations[key][1].forEach((e) => {
              if (e.ImageLink) {
                obj.ImageLink.push(e.ImageLink);
              }
            });
          }
          if (this.listImageBase64?.length > 0) {
            this.listImageBase64.forEach((e) => {
              let string = e.Images.split(",")[1];
              obj.ImageLink.push(string);
            });
          }
        } else {
          obj = {
            ...obj,
            [key]: this.dataFormEditDeployFireStations[key][1],
          };
        }
      }
      // console.log(obj);
      let body = {
        ...obj,
      };
      fireAPI
        .fireStationEditDeploy(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataFireStations();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.$bvModal.hide("modal-edit-deploy-fire-station");
        })
        .catch((err) => console.log(err));
    },

    changeSelectedFireStations(item) {
      // console.log('changeSelectedFireStations', item);
      this.selectedFireStations = item[0].StationID;
    },
    fireLocationDetailsGetType1(id) {
      let body = {
        StationID: id,
      };
      fireAPI
        .fireLocationDetailsGetType1(body)
        .then((val) => {
          // this.dataTableFireAlarmsLocation = val.status ? val.data : [];
          const data = val.status ? val.data : [];
          this.dataTableFireAlarmsLocation = data;
          if (data.length) {
            if (!this.selectedFireAlarmsLocation) {
              this.selectedFireAlarmsLocation = data[0].ID;
            }
          } else {
            this.selectedFireAlarmsLocation = null;
          }
        })
        .catch((err) => console.log(err));
    },
    fireLocationDetailsGetType2(id) {
      let body = {
        StationID: id,
      };
      fireAPI
        .fireLocationDetailsGetType2(body)
        .then((val) => {
          // this.dataTableAlarmCabinetLocation = val.status ? val.data : [];
          const data = val.status ? val.data : [];
          this.dataTableAlarmCabinetLocation = data;
          if (data.length) {
            if (!this.selectedAlarmCabinetLocation) {
              this.selectedAlarmCabinetLocation = data[0].ID;
            }
          } else {
            this.selectedAlarmCabinetLocation = null;
          }
        })
        .catch((err) => console.log(err));
    },
    changeSelectedFireAlarmsLocation(item) {
      this.selectedFireAlarmsLocation = item[0].ID;
    },
    changeSelectedAlarmCabinetLocation(item) {
      this.selectedAlarmCabinetLocation = item[0].ID;
    },
    editLocationName(obj) {
      this.dataFormChangeLocationName = {
        Name: [
          this.$t("fire.location"),
          obj.item.FireLocationDetailName,
          null,
          null,
        ],
        ID: ["ID", obj.item.ID, null, null],
        tableName: ["tableName", obj.tableName, null, null],
      };

      this.$bvModal.show("modal-change-location-name");
    },
    hanldeChangeLocationName() {
      if (!this.dataFormChangeLocationName.Name) {
        this.dataFormChangeLocationName.Name[3] = false;
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("toast.content")
        );
      }
      let body = {
        ID: this.dataFormChangeLocationName.ID[1],
        Name: this.dataFormChangeLocationName.Name[1],
      };
      const tableName = this.dataFormChangeLocationName.tableName[1];
      fireAPI
        .fireLocationEditNameLocationDetails(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            if (tableName == "AlarmCabinetLocation") {
              console.log("load tu canh bao");
              this.fireLocationDetailsGetType2(this.selectedFireStations);
            } else {
              console.log("load cam bien");
              this.fireLocationDetailsGetType1(this.selectedFireStations);
            }
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.$bvModal.hide("modal-change-location-name");
        })
        .catch((err) => console.log(err));
    },
    hiddenChangeLocationName() {
      this.dataFormChangeLocationName = null;
    },
    getDataFireNodes(id, TypeID) {
      let body = {
        TypeID,
        LocationID: id,
        StationID: this.selectedFireStations,
      };
      fireAPI
        .fireNodesGetByLocationID(body)
        .then((val) => {
          if (TypeID === 2) {
            this.dataTableAlarmCabinet = val.status ? val.data : [];
          } else if (TypeID === 1) {
            this.dataTableFireAlarms = val.status ? val.data : [];
          }
        })
        .catch((err) => console.log(err));
    },
    addFireNodes(tableName) {
      if (tableName === "AlarmCabinet") {
        this.titleModalTable = this.$t("fire.add-alarm-cabinet");
        this.typeNodeID = 2;
        this.getDataTableSelectFireNodes(2);
      } else if (tableName === "FireAlarms") {
        this.titleModalTable = this.$t("fire.add-alarm-fires");
        this.typeNodeID = 1;
        this.getDataTableSelectFireNodes(1);
      }
    },
    getDataTableSelectFireNodes(TypeID) {
      let body = {
        TypeID,
      };
      fireAPI
        .fireNodesGetDeploy(body)
        .then((val) => {
          if (TypeID === 2) {
            this.dataTableSelectAlarmCabinet = val.status ? val.data : [];
          } else if (TypeID === 1) {
            this.dataTableSelectFireAlarms = val.status ? val.data : [];
          }
          this.$bvModal.show("modal-add-fire-node");
        })
        .catch((err) => console.log(err));
    },
    rowSelectedFireNodes(item) {
      // console.log(item);
      if (this.typeNodeID === 1) {
        this.selectedFireAlarmsFromModal = item[0].ID;
      } else if (this.typeNodeID === 2) {
        this.selectedAlarmCabinetFromModal = item[0].ID;
      }
    },
    handleAddFireNodes(bvModalEvent) {
      bvModalEvent.preventDefault();
      if (this.typeNodeID === 1) {
        this.handleAddFireAlarms();
      } else if (this.typeNodeID === 2) {
        this.handleAddAlarmCabinet();
      }
    },
    handleAddFireAlarms() {
      if (!this.selectedFireAlarmsFromModal) {
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("fire.no-device-to-add")
        );
      }
      let body = {
        ID: this.selectedFireAlarmsFromModal,
        StationID: this.selectedFireStations.toString(),
        LocationID: this.selectedFireAlarmsLocation.toString(),
      };
      fireAPI
        .fireNodesEditLocation(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataFireNodes(this.selectedFireAlarmsLocation, 1);
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.$bvModal.hide("modal-add-fire-node");
        })
        .catch((err) => console.log(err));
    },
    handleAddAlarmCabinet() {
      if (!this.selectedAlarmCabinetFromModal) {
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("fire.no-device-to-add")
        );
      }
      let body = {
        ID: this.selectedAlarmCabinetFromModal,
        StationID: this.selectedFireStations.toString(),
        LocationID: this.selectedAlarmCabinetLocation.toString(),
      };
      fireAPI
        .fireNodesEditLocation(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataFireNodes(this.selectedAlarmCabinetLocation, 2);
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.$bvModal.hide("modal-add-fire-node");
        })
        .catch((err) => console.log(err));
    },
    hiddenModalAddFireNodes() {
      this.typeNodeID = null;
      this.selectedFireAlarmsFromModal = null;
      this.selectedAlarmCabinetFromModal = null;
    },
    editFireNodes(obj) {
      if (obj.tableName === "FireAlarms") {
        this.typeNodeID = 1;
        this.titleModal = this.$t("fire.edit-deploy-fire-alarms");
      } else if (obj.tableName === "AlarmCabinet") {
        this.typeNodeID = 2;
        this.titleModal = this.$t("fire.edit-deploy-alarm-cabinet");
      }
      const id = obj.item.ID.toString();
      let body = {
        ID: id,
      };
      fireAPI
        .nodeByID(body)
        .then((val) => {
          const obj = val.status ? val.data : null;
          if (obj) {
            let newObj = handling.showExtensionFormEdit(obj);
            this.dataFormEditDeployFireNodes = {
              ...newObj,
              ID: ["ID", id, "ID", null],
            };
            this.$bvModal.show("modal-edit-deploy-fire-node");
            this.isShowCarousel = true
            // this.dataFormEditDeployFireNodes = null
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeFireNodes(obj) {
      console.log(obj);
      let body = {
        ID: obj.item.ID.toString(),
      };
      fireAPI
        .fireNodesDelLocation(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            if (obj.tableName === "FireAlarms") {
              this.getDataFireNodes(this.selectedFireAlarmsLocation, 1);
            } else if (obj.tableName === "AlarmCabinet") {
              this.getDataFireNodes(this.selectedAlarmCabinetLocation, 2);
            }
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
            this.getDataFireNodes(this.selectedAlarmCabinetLocation, 2);
          }
        })
        .catch((err) => console.log(err));
    },
    hanldeEditDeployFireNodes(bvModalEvent) {
      bvModalEvent.preventDefault();
      if (!this.dataFormEditDeployFireNodes) return;
      this.isCheckIsValid = true;
      if (!this.checkFormValidate("FireNodes")) {
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("toast.content")
        );
      }
      this.isCheckIsValid = false;
      let obj = {};
      for (const key in this.dataFormEditDeployFireNodes) {
        if (key === "ImageLink") {
          obj.ImageLink = [];
          if (this.dataFormEditDeployFireNodes[key][1]?.length > 0) {
            // ImageLink
            this.dataFormEditDeployFireNodes[key][1].forEach((e) => {
              if (e.ImageLink) {
                obj.ImageLink.push(e.ImageLink);
              }
            });
          }
          if (this.listImageBase64FireNodes?.length > 0) {
            this.listImageBase64FireNodes.forEach((e) => {
              let string = e.Images.split(",")[1];
              obj.ImageLink.push(string);
            });
          }
        } else {
          obj = {
            ...obj,
            [key]: this.dataFormEditDeployFireNodes[key][1],
          };
        }
      }
      let body = {
        ...obj,
      };
      fireAPI
        .fireNodesEditDeploy(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            if (this.typeNodeID === 1) {
              this.getDataFireNodes(this.selectedFireAlarmsLocation, 1);
            } else if (this.typeNodeID === 2) {
              this.getDataFireNodes(this.selectedAlarmCabinetLocation, 2);
            }
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.$bvModal.hide("modal-edit-deploy-fire-node");
        })
        .catch((err) => console.log(err));
    },
    hiddenModalEditDeployFireNodes() {
      this.dataFormEditDeployFireNodes = null;
      this.listImageBase64FireNodes = [];
    },
    checkIsValid(key, form) {
      //có bắt đầu kiểm có giá trị
      if (!this.isCheckIsValid) {
        return true;
      }
      // const notRequired = ["ID", "Note"];
      if (this.notRequired.includes(key)) {
        return true;
      }
      // const value = this.dataForm[key][1];
      let value = "";
      if (form == "FireStations") {
        value = this.dataFormEditDeployFireStations[key][1];
      } else if (form == "FireNodes") {
        value = this.dataFormEditDeployFireNodes[key][1];
      }
      // console.log(value);
      if (value || value === 0 || value === false) {
        return true;
      } else {
        return false;
      }
    },
    checkFormValidate(form) {
      if (form == "FireStations") {
        for (const key in this.dataFormEditDeployFireStations) {
          let result = this.checkIsValid(key, form);
          this.dataFormEditDeployFireStations[key][3] = result;
          if (!result) {
            console.log("invaildKey:", key);
            // break;
          }
        }
        this.dataFormEditDeployFireStations = {
          ...this.dataFormEditDeployFireStations,
        }; //--> gán lại để render lại dataForm
        for (const key in this.dataFormEditDeployFireStations) {
          if (!this.dataFormEditDeployFireStations[key][3]) {
            return false;
          }
        }
        return true;
      } else if (form == "FireNodes") {
        for (const key in this.dataFormEditDeployFireNodes) {
          let result = this.checkIsValid(key, form);
          this.dataFormEditDeployFireNodes[key][3] = result;
          if (!result) {
            console.log("invaildKey:", key);
            // break;
          }
        }
        this.dataFormEditDeployFireNodes = {
          ...this.dataFormEditDeployFireNodes,
        }; //--> gán lại để render lại dataForm
        for (const key in this.dataFormEditDeployFireNodes) {
          if (!this.dataFormEditDeployFireNodes[key][3]) {
            return false;
          }
        }
        return true;
      }
    },
    showNotify(type, titleMessage, message) {
      this.$notify(type, titleMessage, message, {
        duration: 3000,
        permanent: false,
      });
    },
  },
};
</script>

<style lang="scss">
.form-fire-location {
  .show-image-video-2 {
    margin-top: 5px;
    display: block;
    position: relative;
    // padding-top: 75%;
    padding-top: 56.25%; //16:9
  }
  .show-image-video-2-2 {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
