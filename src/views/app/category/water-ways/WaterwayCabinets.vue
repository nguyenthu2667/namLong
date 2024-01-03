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
                @click="editModal(selectedItems, 'WaterwayCabinet')"
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
                @click="deleteModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("pages.delete") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("pages.delete") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="handleStationManager()"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fab fa-autoprefixer"></i>
                &emsp;{{ $t("report.action.station-manager-away") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fab fa-autoprefixer"></i>
                &emsp;{{ $t("report.action.station-manager-away") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="updateImageModal(selectedItems, 'WaterwayCabinet')"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-images"></i>
                &emsp;{{ $t("update-image") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-images"></i>
                &emsp;{{ $t("update-image") }}
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
            @row-selected="rowSelected"
            :select-mode="selectMode"
            :field-table="fields"
            :column-show="listColumnShow"
            @status-edit="statusEdit"
            :access-write="objectData.accessWrite"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
    <custom-form
      :name-form="nameForm"
      :title-form="titleForm"
      :api-form="apiForm"
      :data-form="dataForm"
      :data-form-option="dataFormOptions"
      :state-form="stateForm"
      :type-form="typeForm"
      :body-form-default="bodyFormDefault"
      :key-show="keyShow"
      @handle-submit="handleSubmit"
    ></custom-form>
    <b-modal
      class="text-center"
      centered
      id="modal-station"
      size="xl"
      hide-header
      scrollable
      ok-only
    >
      <template v-if="selectedItems.length > 0">
        <h1>
          <strong>
            {{ $t("form.manager").toUpperCase() }}
            {{ " " + selectedItems[0].CabinetName.toUpperCase() }}
          </strong>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <b-dropdown-item
                @click="editModalStation(selectedLamp, 'WaterwayStation')"
                v-if="
                  selectedLamp.length === 1 && objectData.accessWrite === true
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
                @click="deleteModalStation(selectedLamp)"
                v-if="
                  selectedLamp.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("pages.delete") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("pages.delete") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="updateImageModal(selectedLamp, 'WaterwayStation')"
                v-if="
                  selectedLamp.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-images"></i>
                &emsp;{{ $t("update-image") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-images"></i>
                &emsp;{{ $t("update-image") }}
              </b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </div>
        <div class="separator mb-5"></div>
        <custom-table
          :id="'custom-table-lamp'"
          ref="tableForm"
          :data-table="dataLamps"
          :field-table="fieldLamp"
          :column-show="listColumnShowStation"
          :access-write="objectData.accessWrite"
          :select-mode="selectMode"
          @row-selected="rowSelectLamp"
          @status-edit="statusEditStation"
        ></custom-table>
      </template>
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
  </div>
</template>

<script>
import handling from "@/constants/handling";
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "@/components/Form/CustomForm";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import waterwayAPI from "@/api/modules/waterwayAPI";
import shareAPI from "@/api/modules/shareAPI";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
  },
  data() {
    return {
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      selectedLamp: [],
      items: null,
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      dataForm: null,
      typeForm: "",
      stateForm: null,
      dataByID: null,
      stationByID: null,
      columnAdd: null,
      dataFormOptions: {
        ConnectTypeID: [],
        PowerTypeID: [],
        RegionID: [],
        CabinetID: [],
        WaterwayTypeID: [],
        WaterwaySizeTypeID: [], // ! WaterwaySizeID =  WaterwaySizeTypeID
        RouteID: [],
      },
      regionOption: null,
      keyShow: 0,
      dataLamps: [],
      keyLamp: [],
      listColumnShowStation: [],
      columnAddStation: [],
      listImage: null,
      listImageBase64: [],
      isShow: true,
      keyString: "",
    };
  },
  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
    },
    fieldLamp: function () {
      return handling.mergeTableAndData(
        this.keyLamp,
        this.listColumnShowStation
      );
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
  methods: {
    formatNames(files) {
      return files.length === 1
        ? files[0].name
        : `${files.length} ${this.$t("form.image")}`;
    },
    resetModalUpdate() {
      this.storeImg = null;
      this.listImage = null;
      this.listImageBase64 = [];
    },
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
    handleModalUpdate(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitUpdate();
    },
    handleSubmitUpdate() {
      let body = {
        UserIDCurent: this.userID,
        MenuIDCurent: this.objectData.menuIDCurrent,
        StationID:
          this.keyString === "WaterwayCabinet"
            ? this.selectedItems[0].CabinetID
            : this.selectedLamp[0].StationID,
        GeoCode: this.keyString,
        Base64Strings: this.listImageBase64.map((item) =>
          item.Images.replace(/^data:image\/[a-z]+;base64,/, "")
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
    updateImageModal(item, keyString) {
      this.keyString = keyString;
      this.getImages(item[0].CabinetID || item[0].StationID);
      this.$bvModal.show("update-image");
    },
    getImages(id) {
      let body = {
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
    getRegion() {
      systemAPI
        .regionList()
        .then((val) => {
          if (val.status) {
            let array = [];
            handling.recursiveTreeSelectRegion(val.data, 0, array);
            this.dataFormOptions.RegionID = array;
            let arrTable = [];
            this.convertKeyTableData(val.data, 0, arrTable, 0);
            this.regionOption = arrTable;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertKeyTableData(array, parentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["RegionParentID"] !== parentID) {
          return;
        }
        let obj = {
          IsActive: item["IsActive"],
          Note: item["Note"],
          RegionID: item["RegionID"],
          RegionName: item["RegionName"],
          RegionParentID: item["RegionParentID"],
          Key: i,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["RegionID"], arrayTable, i + 1);
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
    getKeyTable() {
      waterwayAPI
        .waterWayCabinetList()
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
    getData() {
      waterwayAPI
        .waterWayCabinetList()
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    statusEdit(data) {
      let body = {
        CabinetID: data.CabinetID || data.StationID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      waterwayAPI
        .waterWayCabinetChangeStatus(body)
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
    addModal() {
      this.dataForm = handling.showExtensionFormAdd(
        this.columnAdd,
        this.dataFormOptions
      );
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/WaterwayCabinets/Add";
      this.bodyFormDefault = {
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          if (this.keyString === "WaterwayCabinets") {
            this.getColumn("WaterwayCabinets");
            this.getKeyTable();
            this.getData();
          } else {
            this.getColumnStationModal("WaterwayStations");
            this.getDataStation(this.selectedItems[0].CabinetID);
          }
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        } else {
          this.$bvModal.hide(this.nameForm);
          if (this.keyString === "WaterwayCabinets") {
            this.getColumn("WaterwayCabinets");
            this.getKeyTable();
            this.getData();
          } else {
            this.getColumnStationModal("WaterwayStations");
            this.getDataStation(this.selectedItems[0].CabinetID);
          }
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
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
        }, this.timer);
      }
      this.nameForm = null;
      this.titleForm = null;
      this.apiForm = null;
      this.bodyFormDefault = null;
      this.typeForm = "";
    },
    editModal(items, keyString) {
      this.keyString = keyString;
      this.getDataByID(items[0].CabinetID || items[0].StationID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        for (let i = 0; i < this.regionOption.length; i++) {
          if (this.regionOption[i].RegionID === items[0].RegionID) {
            this.keyShow = this.regionOption[i].Key;
          }
        }
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/WaterwayCabinets/Edit";
        this.bodyFormDefault = {
          ID: items[0].CabinetID || items[0].StationID,
          MenuIDCurent: this.objectData.menuIDCurrent,
          UserIDCurent: this.userID,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question") +
            (items[0].CabinetName || items[0].StationID) +
            "?",
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
          if (value === true && this.keyString === "WaterwayCabinet") {
            this.handleSubmitDelete(items[0].CabinetID);
          } else {
            this.deleteModalStation(items[0].StationID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDelete(id) {
      let body = {
        CabinetID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      waterwayAPI
        .waterWayCabinetRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("WaterwayCabinets");
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
    handleCabinetManager() {
      setTimeout(() => {
        this.$bvModal.show("modal-cabinet");
      }, this.timer);
    },
    handleStationManager() {
      this.getDataStation(
        this.selectedItems[0].CabinetID || this.selectedLamp[0].StationID
      );
      setTimeout(() => {
        this.$bvModal.show("modal-station");
      }, this.timer);
    },
    getDataStation(id) {
      let body = {
        CabinetID: id,
        UserIDCurent: this.userID,
      };
      waterwayAPI
        .waterWayStationListByCabinetID(body)
        .then((val) => {
          this.dataLamps = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          this.keyLamp =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnStationModal(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowStation = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFormAddShowStationModal(string) {
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
    getOptionCabinetID() {
      waterwayAPI
        .waterWayCabinetList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.CabinetID = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].CabinetName,
                  value: val.data[i].CabinetID,
                };
                this.dataFormOptions.CabinetID.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addModalStation() {
      this.dataForm = handling.showExtensionFormAdd(
        this.columnAddStation,
        this.dataFormOptions
      );

      if (this.dataForm.HasMarker) {
        this.dataForm.HasMarker[1] = false;
      }
      this.nameForm = "modal-add-lamp";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/WaterwayStations/Add";
      this.bodyFormDefault = {
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
        CabinetID:
          this.selectedItems[0].CabinetID || this.selectedItems[0].StationID,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    editModalStation(items) {
      this.getDataStationByID(items[0].StationID);
      setTimeout(() => {
        this.stationByID.HasMarker = !!this.stationByID.HasMarker;
        this.dataForm = handling.showExtensionFormEdit(
          this.stationByID,
          this.selectedItems[0]
        );
        this.nameForm = "modal-edit-lamp";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/WaterwayStations/Edit";
        this.idForm = items[0].LampID;
        this.bodyFormDefault = {
          MenuIDCurent: this.objectData.menuIDCurrent,
          UserIDCurent: this.userID,
          CabinetID: this.selectedItems[0].StationID,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    getDataStationByID(id) {
      let body = {
        ID: id,
        UserIDCurent: this.userID,
      };
      waterwayAPI
        .waterWayStationByID(body)
        .then((val) => {
          this.stationByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteModalStation(items) {
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
            this.handleSubmitDeleteLamp(items[0].StationID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSubmitDeleteLamp(id) {
      let body = {
        StationID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      waterwayAPI
        .waterWayStationRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumnStationModal("WaterwayStations");
              this.getDataStation(
                this.selectedItems[0].CabinetID ||
                  this.selectedItems[0].StationID
              );
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.getDataStation(
                this.selectedItems[0].CabinetID ||
                  this.selectedItems[0].StationID
              );
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.getDataStation(
              this.selectedItems[0].CabinetID || this.selectedItems[0].StationID
            );
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
    statusEditStation(data) {
      let body = {
        StationID: data.StationID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
      };
      waterwayAPI
        .waterWayStaionChangeStatus(body)
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.getDataByID(data.StationID);
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.getDataByID(data.StationID);
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
    rowSelected(data) {
      this.selectedItems = data;
    },
    rowSelectLamp(data) {
      this.selectedLamp = data;
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getDataByID(id) {
      let body = {
        ID: id,
        UserIDCurent: this.userID,
      };
      if (this.keyString === "WaterwayCabinet") {
        waterwayAPI
          .waterWayCabinetByID(body)
          .then((val) => {
            this.dataByID = val.status ? val.data : [];
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        waterwayAPI
          .waterWayStationByID(body)
          .then((val) => {
            this.dataByID = val.status ? val.data : [];
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
    getOptionWaterwayTypeID() {
      waterwayAPI
        .waterWayTypeListActive()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.WaterwayTypeID = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].WaterwayTypeName,
                  value: val.data[i].ID,
                };
                this.dataFormOptions.WaterwayTypeID.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionWaterwaySizeID() {
      waterwayAPI
        .waterWaySizeList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.WaterwaySizeTypeID = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].WaterwaySizeName,
                  value: val.data[i].ID,
                };
                this.dataFormOptions.WaterwaySizeTypeID.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRoutes() {
      waterwayAPI
        .waterWayRoutesListActive()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.RouteID = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].WaterwayRouteName,
                  value: val.data[i].ID,
                };
                this.dataFormOptions.RouteID.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("WaterwayCabinets");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("WaterwayCabinets");
    await this.getOptionCabinetID();
    await this.getOptionPowerType();
    await this.getOptionConnectType();
    await this.getOptionWaterwayTypeID();
    await this.getOptionWaterwaySizeID();
    await this.getRegion();
    await this.getRoutes();
    await this.getColumnStationModal("WaterwayStations");
    await this.getFormAddShowStationModal("WaterwayStations");
  },
  watch: {
    items() {
      this.getColumn("WaterwayCabinets");
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
};
</script>

<style></style>
