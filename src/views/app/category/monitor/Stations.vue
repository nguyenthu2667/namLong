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
                @click="editModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.update-deploy") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.update-deploy") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="updateImageModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 &&
                  objectData.accessWrite === true &&
                  selectedItems[0].IsDeploy == true
                "
              >
                <i class="fad fa-images"></i>
                &emsp;{{ $t("update-image") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-images"></i>
                &emsp;{{ $t("update-image") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="deleteModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("dropdown.delete") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("dropdown.delete") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="deviceModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-sort-alpha-up-alt"></i>
                &emsp;{{ $t("dropdown.device-permission") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-sort-alpha-up-alt"></i>
                &emsp;{{ $t("dropdown.device-permission") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="monitorModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-sort-numeric-up-alt"></i>
                &emsp;{{ $t("dropdown.monitor-permission") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-sort-numeric-up-alt"></i>
                &emsp;{{ $t("dropdown.monitor-permission") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="settingWarning(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-siren-on"></i>
                &emsp;Thiết lập cảnh báo
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-siren-on"></i>
                &emsp;Thiết lập cảnh báo
              </b-dropdown-item>
              <b-dropdown-item
                @click="printExternalExcel('custom-table')"
                v-if="
                  items && items.length > 0 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-file-excel"></i>
                &emsp; {{ $t("report.action.download-excel-page") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-file-excel"></i>
                &emsp; {{ $t("report.action.download-excel-page") }}
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
            ref="tableForm"
            :data-table="items"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            @row-selected="rowSelected"
            @status-edit="statusEdit"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
    <custom-form
      :name-form="nameForm"
      :title-form="titleForm"
      :api-form="apiForm"
      :body-form-default="bodyFormDefault"
      :data-form="dataForm"
      :state-form="stateForm"
      :type-form="typeForm"
      :data-form-option="dataFormOptions"
      @handle-submit="handleSubmit"
    ></custom-form>

    <b-modal
      class="text-center"
      centered
      id="device-modal"
      :title="$t('form.device-modal-title')"
      ok-only
      @hidden="resetModalDevice"
      scrollable
      size="lg"
    >
      <template v-if="dataDevicePermission !== null">
        <b-row class="mb-4">
          <b-colxx md="8" class="mt-2">
            <span>
              {{ $t("form.total") }}:
              <strong>{{ totalDeviceRows }}</strong>
              {{ $t("form.result").toLowerCase() }}
            </span>
          </b-colxx>
          <b-colxx md="4">
            <b-form-group
              label-align-sm="right"
              label-size="sm"
              label-for="filterInput"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-input
                  v-model="filterDevice"
                  type="search"
                  id="filterInput"
                  :placeholder="search_title"
                  style="border-radius: 20px"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-colxx>
        </b-row>
        <b-table
          ref="tableForm"
          id="custom-table"
          sort-by="title"
          sort-desc.sync="false"
          sticky-header
          :fields="fieldDevice"
          :items="dataDevicePermission"
          class="text-center"
          responsive
          @filtered="onFilteredDevice"
          :filter="filterDevice"
        >
          <template v-slot:cell(Action)="row">
            <b-form-checkbox
              v-model="row.item.IsCheck"
              switch
              size="md"
              @change="editModalDevice(row.item)"
            ></b-form-checkbox>
          </template>
        </b-table>
      </template>
    </b-modal>
    <b-modal
      class="text-center"
      centered
      id="monitor-modal"
      :title="$t('form.monitor-modal-title')"
      ok-only
      @hidden="resetModalMonitor"
      scrollable
      size="lg"
    >
      <template v-if="dataMonitorPermission !== null">
        <b-row class="mb-4">
          <b-colxx md="8" class="mt-2">
            <span>
              {{ $t("form.total") }}:
              <strong>{{ totalMonitorRows }}</strong>
              {{ $t("form.result").toLowerCase() }}
            </span>
          </b-colxx>
          <b-colxx md="4">
            <b-form-group
              label-align-sm="right"
              label-size="sm"
              label-for="filterInput"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-input
                  v-model="filterMonitor"
                  type="search"
                  id="filterInput"
                  :placeholder="search_title"
                  style="border-radius: 20px"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-colxx>
        </b-row>
        <b-table
          ref="tableForm"
          id="custom-table"
          sort-by="title"
          sort-desc.sync="false"
          sticky-header
          :fields="fieldMonitor"
          :items="dataMonitorPermission"
          class="text-center"
          responsive
          @filtered="onFilteredMonitor"
          :filter="filterMonitor"
        >
          <template v-slot:cell(Action)="row">
            <b-form-checkbox
              v-model="row.item.IsCheck"
              switch
              size="md"
              @change="editModalMonitor(row.item)"
            ></b-form-checkbox>
          </template>
        </b-table>
      </template>
    </b-modal>
    <b-modal
      id="modal-finished-product"
      ref="modal"
      :title="$t('form.add-device')"
      ok-only
      :ok-title="$t('form.submit')"
      @show="resetModalAdd"
      @hidden="resetModalAdd"
      @ok="handleOkAdd"
    >
      <form ref="form" @submit.stop.prevent="handleSubmitAdd">
        <b-form-group
          :state="nameState"
          :label="$t('form.device-id') + ':'"
          label-for="name-input"
          :invalid-feedback="$t('form.device-id-enter')"
        >
          <b-form-input
            id="name-input"
            v-model="nameDevice"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group :label="$t('menu.layers') + ':'">
          <b-form-select
            v-model="dataTypeDefault"
            :options="dataFormOptions.DataTypeID"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal
      id="update-image"
      :title="$t('update-image')"
      size="lg"
      scrollable
      @hidden="resetModalUpdate"
      @ok="handleModalUpdate"
    >
      <b-form ref="form" @submit.stop.prevent="handleSubmitUpdate">
        <b-form-file
          class="mb-4"
          :placeholder="$t('update-image') + '...'"
          v-model="listImage"
          :file-name-formatter="formatNames"
          multiple
          accept="image/*"
          :browse-text="$t('browse-text')"
        ></b-form-file>
        <b-form-group :label="$t('form.image') + ':'">
          <b-row v-if="isShow">
            <template v-if="listImageBase64 && listImageBase64.length > 0">
              <template v-for="(img, index) in listImageBase64">
                <b-col
                  style="position: relative"
                  lg="4"
                  :key="index"
                  class="mb-4"
                >
                  <b-badge
                    style="
                      background: red !important;
                      position: absolute;
                      right: 5px;
                      border-radius: 100%;
                      top: -5px;
                      cursor: pointer;
                    "
                    @click.stop.prevent="remove(index)"
                  >
                    X
                  </b-badge>
                  <div style="height: 180px">
                    <b-img-lazy
                      :src="img.Images"
                      style="width: 100%; height: 100%"
                    ></b-img-lazy>
                  </div>
                </b-col>
              </template>
            </template>
          </b-row>
        </b-form-group>
      </b-form>
      <template #modal-footer="{ cancel, ok }">
        <div class="w-100">
          <b-button variant="primary" class="float-right ml-2" @click="ok()">
            {{ $t("button.update") }}
          </b-button>
          <b-button class="float-right ml-2" @click="cancel()">
            {{ $t("button.cancel") }}
          </b-button>
          <b-button
            variant="danger"
            class="float-right ml-2"
            @click="deleteImgs"
          >
            {{ $t("button.remove-all") }}
          </b-button>
        </div>
      </template>
    </b-modal>
    <b-modal
      id="setting-warning"
      size="lg"
      scrollable
      @hidden="resetSettingModal"
      hide-header
    >
      <setting-warning
        :geo-code="geoCode"
        :objectData="objectData"
        :StationID="stationID"
      ></setting-warning>
    </b-modal>
  </div>
</template>
<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "@/views/app/category/monitor/StationComponent/CustomFormCategoryStations";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";

import { defaultRegionCode, defaultMapType } from "@/constants/config";
import wfs from "@/constants/wfs";
import monitorAPI from "@/api/modules/monitorAPI.js";
import shareAPI from "@/api/modules/shareAPI";
import aquaAPI from "@/api/modules/aquaAPI";
import systemAPI from "@/api/modules/systemAPI";
import SettingWarning from "./StationComponent/SettingWarning";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
    "setting-warning": SettingWarning,
  },
  data() {
    return {
      timer,
      geoCode: null,
      stationID: null,
      defaultRegionCode,
      defaultMapType,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      dataForm: null,
      dataFormOptions: {
        DataTypeID: [],
        ConnectTypeID: [],
        PowerTypeID: [],
      },
      typeForm: "",
      stateForm: null,
      dataByID: null,
      columnAdd: null,
      dataDevicePermission: null,
      totalDeviceRows: 0,
      filterDevice: "",
      search_title: this.$t("form.search-invalid"),
      fieldDevice: [
        {
          key: "InfoCode",
          label: this.$t("form.device-code"),
          sortable: true,
          tdClass: "pt-3 text-muted",
        },
        {
          key: "Name",
          label: this.$t("form.device-name"),
          sortable: true,
          tdClass: "text-left pt-3",
        },
        {
          key: "UnitName",
          label: this.$t("form.device-unit"),
          sortable: true,
          tdClass: "pt-3 text-muted",
        },
        {
          key: "Action",
          label: this.$t("form.device-action"),
        },
      ],
      dataMonitorPermission: null,
      totalMonitorRows: 0,
      filterMonitor: "",
      fieldMonitor: [
        {
          key: "IndicatorCode",
          label: this.$t("form.indicator-code"),
          sortable: true,
          tdClass: "pt-3 text-muted",
        },
        {
          key: "Name",
          label: this.$t("form.indicator-name"),
          sortable: true,
          tdClass: "text-left pt-3",
        },
        {
          key: "UnitName",
          label: this.$t("form.indicator-unit"),
          sortable: true,
          tdClass: "pt-3 text-muted",
        },
        {
          key: "Action",
          label: this.$t("form.indicator-action"),
        },
      ],
      // dataTypeOption: null,
      //form-export-product
      nameDevice: "",
      nameState: null,
      dataTypeDefault: null,
      //module-img
      isShow: true,
      keyString: "Aqua",
      storeImg: null,
      listImage: null,
      listImageBase64: [],
    };
  },
  methods: {
    resetSettingModal() {
      console.log("resetSettingModal");
    },
    settingWarning(item) {
      this.geoCode = this.selectedItems[0].GeoCode;
      this.stationID = this.selectedItems[0].StationID;
      setTimeout(() => {
        this.$bvModal.show("setting-warning");
      }, this.timer);
    },
    printExternalExcel(table) {
      handling.printExcel(
        table,
        this.objectData.formName,
        null,
        null,
        this.$t("form.page") + " " + this.$refs["tableForm"].currentPage
      );
    },
    onFilteredMonitor(filteredItems) {
      this.totalMonitorRows = filteredItems.length;
    },
    onFilteredDevice(filteredItems) {
      this.totalDeviceRows = filteredItems.length;
    },
    resetModalDevice() {
      this.dataDevicePermission = null;
      this.totalDeviceRows = 0;
    },
    resetModalMonitor() {
      this.dataMonitorPermission = null;
      this.totalMonitorRows = 0;
    },
    getOptionDataTypeID(code) {
      let body = {
        Note: code,
      };
      aquaAPI
        .getDataTypeByID(body)
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.DataTypeID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].DataTypeName,
                    value: val.data[i].DataTypeID,
                    geoCode: val.data[i].GeoCode,
                  };
                  this.dataFormOptions.DataTypeID.push(obj);
                }
              }
              this.dataTypeDefault = this.dataFormOptions.DataTypeID[0].value;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //module-img
    remove(index) {
      let remove = this.listImageBase64.splice(index, 1);
    },
    deleteImgs() {
      this.listImageBase64.length = [];
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
      }, 500);
    },
    formatNames(files) {
      return files.length === 1
        ? files[0].name
        : `${files.length} ${this.$t("form.image")}`;
    },
    updateImageModal(item) {
      this.getImages(item[0].StationID);
      this.$bvModal.show("update-image");
    },
    getImages(id) {
      let body = {
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
        StationID: id,
        GeoCode: this.keyString,
      };
      systemAPI
        .getImagesByID(body)
        .then((val) => {
          this.storeImg = val.status ? val.data : [];
          if (this.storeImg && this.storeImg.length > 0) {
            this.listImageBase64 = [];
            this.storeImg.forEach((item, index) => {
              if (item.ImageLink) {
                this.listImageBase64.push({
                  ID: index,
                  Images: item.ImageLink,
                });
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    resetModalUpdate() {
      this.storeImg = null;
      this.listImage = null;
      this.listImageBase64 = [];
    },
    handleModalUpdate(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitUpdate();
    },
    handleSubmitUpdate() {
      let body = {
        UserIDCurent: this.userID,
        MenuIDCurent: this.objectData.menuIDCurrent,
        StationID: this.selectedItems[0].StationID,
        GeoCode: this.keyString,
        Base64Strings: this.listImageBase64.map((item) =>
          item.Images.replace("data:image/jpeg;base64,", "")
        ),
      };
      systemAPI
        .uploadImagesBase64(body)
        .then((val) => {
          if (val.status) {
            this.$bvModal.hide("update-image");
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
        })
        .catch((err) => console.log(err));
    },
    //==
    //ExportProduct
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModalAdd() {
      this.nameDevice = "";
      this.nameState = null;
    },
    handleOkAdd(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitAdd();
    },
    handleSubmitAdd() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$nextTick(() => {
        this.submitAddOK(this.nameDevice);
        this.$bvModal.hide("modal-add");
      });
    },
    submitAddOK(note) {
      let body = {
        StationID: note,
        DataTypeID: this.dataTypeDefault,
      };
      systemAPI
        .submitData(this.apiForm, body)
        .then((val) => {
          if (val.status) {
            if (!this.items || this.items.length === 0) {
              this.$bvModal.hide("modal-finished-product");
              this.getColumn("AquaStations");
              this.getKeyTable();
              this.getData();
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.$bvModal.hide("modal-finished-product");
              this.getData();
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.$bvModal
              .msgBoxConfirm(this.$t("form.question-add-device"), {
                title: this.$t("form.unsuccessful"),
                size: "sm",
                buttonSize: "sm",
                okVariant: "danger",
                okTitle: this.$t("form.yes"),
                cancelTitle: this.$t("form.no"),
                footerClass: "p-2",
                hideHeaderClose: false,
                centered: true,
              })
              .then((value) => {
                if (value === true) {
                  this.$bvModal.show("modal-finished-product");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //====================================
    handleSubmit(val, objectDataWFS) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("Stations");
          this.getKeyTable();
          this.getData();
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, timer);
        } else {
          this.$bvModal.hide(this.nameForm);
          this.getData();
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, timer);
        }
        if (objectDataWFS) {
          switch (this.typeForm) {
            case "ADD":
              wfs
                .insertPoint(
                  objectDataWFS.url,
                  objectDataWFS.workspace,
                  objectDataWFS.urlWorkspace,
                  objectDataWFS.data,
                  objectDataWFS.type
                )
                .then((val) => {
                  if (val !== true) {
                    console.log("Không thêm được dữ liệu");
                    this.handleSubmitDelete(
                      objectDataWFS.data[
                        objectDataWFS.type.toLowerCase() + "id"
                      ]
                    );
                  }
                });
              break;
            case "EDIT":
              let URL = wfs.getPoint(
                null,
                objectDataWFS.type,
                this.defaultRegionCode
              );
              fetch(URL, {
                method: "GET",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((data) => {
                  return data.json();
                })
                .then((resp) => {
                  if (resp.features.length > 0) {
                    for (let i = 0; i < resp.features.length; i++) {
                      if (
                        this.idForm ===
                        resp.features[i].properties[
                          objectDataWFS.type.toLowerCase() + "id"
                        ].toString()
                      ) {
                        wfs
                          .updatePoint(
                            objectDataWFS.url,
                            objectDataWFS.workspace,
                            objectDataWFS.urlWorkspace,
                            objectDataWFS.data,
                            objectDataWFS.type,
                            resp.features[i].id
                          )
                          .then((rel) => {
                            if (rel !== true) {
                              console.log("Không sửa được dữ liệu");
                            }
                          });
                      }
                    }
                  } else {
                    wfs
                      .insertPoint(
                        objectDataWFS.url,
                        objectDataWFS.workspace,
                        objectDataWFS.urlWorkspace,
                        objectDataWFS.data,
                        objectDataWFS.type
                      )
                      .then((val) => {
                        if (val !== true) {
                          console.log("Không thêm được dữ liệu");
                          this.handleSubmitDelete(
                            objectDataWFS.data[
                              objectDataWFS.type.toLowerCase() + "id"
                            ]
                          );
                        }
                      });
                  }
                })
                .catch((err) => console.log("ErrorUpdate", err));
              break;
          }
        }
      } else {
        this.$bvModal.hide(this.nameForm);
        this.getData();
        setTimeout(() => {
          this.makeToast(
            "danger",
            this.$t("toast.fail").toUpperCase(),
            val.message
          );
        }, timer);
      }
      setTimeout(() => {
        this.nameForm = null;
        this.titleForm = null;
        this.apiForm = null;
        this.typeForm = "";
        this.bodyFormDefault = null;
      }, 200);
    },
    editModal(items) {
      this.getDataByID(items[0].StationID);
      this.getOptionDataTypeID(this.objectData.ByCreen);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/AquaStations/EditDeploy"; //fix
        this.bodyFormDefault = {
          StationID: items[0].StationID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
      let objectDataWFS;
      if (this.dataTypeOption) {
        let _dataOption = this.dataTypeOption.filter(
          (x) => x["DataTypeID"] === items[0]["DataTypeID"]
        );
        if (_dataOption) {
          objectDataWFS = wfs.getDataTypeTable(
            items[0],
            _dataOption[0]["GeoCode"]
          );
        } else {
          objectDataWFS = null;
        }
      }
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + items[0].StationName + "?", {
          title: this.$t("form.warning").toUpperCase(),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("form.yes"),
          cancelTitle: this.$t("form.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.handleSubmitDelete(items[0].StationID, objectDataWFS);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDelete(id, objectDataWFS) {
      if (objectDataWFS) {
        let URL = wfs.getPoint(
          null,
          objectDataWFS.type,
          this.defaultRegionCode
        );
        fetch(URL, {
          method: "GET",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((data) => {
            return data.json();
          })
          .then((resp) => {
            for (let i = 0; i < resp.features.length; i++) {
              if (
                id ===
                resp.features[i].properties[
                  objectDataWFS.type.toLowerCase() + "id"
                ].toString()
              ) {
                wfs
                  .deletePoint(
                    objectDataWFS.url,
                    objectDataWFS.workspace,
                    objectDataWFS.type,
                    resp.features[i].id
                  )
                  .then((val) => {
                    if (val !== true) {
                      console.log("Không xóa được dữ liệu");
                    }
                  });
              }
            }
          })
          .catch((err) => console.log("ErrorDelete", err));
      } else {
        console.log("Không có dữ liệu để xóa");
      }
      let body = {
        ID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      monitorAPI
        .monitorStationRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("Stations");
              this.getKeyTable();
              this.getData();
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.getData();
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.getData();
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editModalMonitor(data) {
      let body = {
        StationID: data.StationID,
        IndicatorID: data.IndicatorID,
        IsCheck: handling.convertBooleanToBit(data.IsCheck),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      monitorAPI
        .monitorEditStationByMonitorAuthorization(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.getData();
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.getData();
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    monitorModal(items) {
      this.getStationRightByMonitor(items[0].StationID);
      setTimeout(() => {
        this.$bvModal.show("monitor-modal");
      }, 200);
    },
    editModalDevice(data) {
      let body = {
        StationID: data.StationID,
        InfoID: data.InfoID,
        IsCheck: handling.convertBooleanToBit(data.IsCheck),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      monitorAPI
        .monitorEditStationByInfoAuthorization(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.getData();
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.getData();
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deviceModal(items) {
      this.getStationRightByDevice(items[0].StationID);
      setTimeout(() => {
        this.$bvModal.show("device-modal");
      }, 200);
    },
    rowSelected(data) {
      this.selectedItems = data;
      this.keyString = this.selectedItems[0].GeoCode;
    },
    statusEdit(data) {
      let body = {
        ID: data.StationID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      monitorAPI
        .monitorStationChangeStatus(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.getData();
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.getData();
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
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
    getOptionConnectType() {
      shareAPI
        .shareConnectTypeList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.ConnectTypeID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].ConnectTypeName,
                    value: val.data[i].ConnectTypeID,
                  };
                  this.dataFormOptions.ConnectTypeID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionPowerType() {
      shareAPI
        .sharePowerTypeList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.PowerTypeID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].PowerTypeName,
                    value: val.data[i].PowerTypeID,
                  };
                  this.dataFormOptions.PowerTypeID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // getOptionDataType() {
    //   systemAPI.dataTypeList()
    //     .then((val) => {
    //       if (val.status) {
    //         if (val.data.length > 0) {
    //           this.dataFormOptions.DataTypeID = []
    //           for (let i = 0; i < val.data.length; i++) {
    //             if (val.data[i].IsActive === 1) {
    //               let obj = {
    //                 text: val.data[i].DataTypeName,
    //                 value: val.data[i].DataTypeID,
    //               }
    //               this.dataFormOptions.DataTypeID.push(obj)
    //             }
    //           }
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    getFormAddShow(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          this.columnAdd = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getStationRightByDevice(id) {
      let body = {
        StationID: id,
      };
      monitorAPI
        .monitorStationByInfoAuthorization(body)
        .then((val) => {
          if (val.status) {
            let arr = [];
            if (val.data && val.data.length > 0) {
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  IsCheck: handling.convertBitToBoolean(val.data[i].IsCheck),
                  InfoCode: val.data[i].InfoCode,
                  UnitName: val.data[i].UnitName,
                  InfoID: val.data[i].InfoID,
                  Name: val.data[i].Name,
                  StationID: id,
                };
                arr.push(obj);
              }
            }
            this.dataDevicePermission = arr;
            this.totalDeviceRows = this.dataDevicePermission.length;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getStationRightByMonitor(id) {
      let body = {
        StationID: id,
        // MenuIDCurent: this.objectData.menuIDCurrent
      };
      monitorAPI
        .monitorStationByMonitorAuthorization(body)
        .then((val) => {
          if (val.status) {
            let arr = [];
            if (val.data && val.data.length > 0) {
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  IsCheck: handling.convertBitToBoolean(val.data[i].IsCheck),
                  IndicatorCode: val.data[i].IndicatorCode,
                  UnitName: val.data[i].UnitName,
                  IndicatorID: val.data[i].IndicatorID,
                  Name: val.data[i].Name,
                  StationID: id,
                };
                arr.push(obj);
              }
            }
            this.dataMonitorPermission = arr;
            this.totalMonitorRows = this.dataMonitorPermission.length;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataByID(id) {
      let body = {
        ID: id,
      };
      monitorAPI
        .monitorStationByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      monitorAPI
        .monitorStationList()
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable() {
      monitorAPI
        .monitorStationList()
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
    getDataType() {
      systemAPI
        .dataTypeList()
        .then((val) => {
          this.dataTypeOption = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("Stations");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("Stations");
    await this.getOptionPowerType();
    // await this.getOptionDataType()
    await this.getOptionConnectType();
    await this.getDataType();
  },
  watch: {
    items() {
      this.getColumn("Stations");
      this.getKeyTable();
    },
    listImage(to, from) {
      if (to && to.length > 0) {
        //this.listImageBase64.length = 0
        for (let i = 0; i < to.length; i++) {
          let reader = new FileReader();
          reader.readAsDataURL(to[i]);
          setTimeout(() => {
            this.listImageBase64.push({
              ID: to[i].lastModified + i,
              Images: reader.result,
            });
          }, 500);
        }
      }
    },
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
            ByCreen: this.menuRight[i].ByCreen,
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
