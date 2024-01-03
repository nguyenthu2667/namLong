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
                @click="managerLocation(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-sensor-fire"></i>
                &emsp;Quản lí vị trí
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-sensor-fire"></i>
                &emsp;Quản lí vị trí
              </b-dropdown-item>
              <b-dropdown-item
                @click="managerModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-sensor-fire"></i>
                &emsp;Quản lí thiết bị
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-sensor-fire"></i>
                &emsp;Quản lí thiết bị
              </b-dropdown-item>
              <b-dropdown-item
                @click="printExternalExcel('custom-table-report-fire-station')"
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
            :id="'custom-table-report-fire-station'"
            :data-table="items"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            :key-show="keyShow"
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
      </form>
    </b-modal>
    <b-modal id="modal-nodes" hide-header size="xl">
      <modal-node-station
        :items="dataNodesTable"
        :fields="fieldNodeTable"
        :objectData="objectData"
        :listColumnShow="columnShowNode"
        :titleNode="titleNode"
        :dataParent="dataParent"
        :handle-reload="handleReload"
      />
    </b-modal>
    <b-modal id="modal-location-detail" hide-header size="xl">
      <modal-location-detail
        :items="dataTableLocationDetail"
        :fields="fieldTableLocationDetail"
        :objectData="objectData"
        :listColumnShow="columnShowLocationDetail"
        :titleNode="titleNode"
        :dataParent="dataParent"
        :handle-reload="handleReloadLocationDetail"
      />
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
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "./component/FormFire";
import ModalNodeStation from "./component/ModalNodeStation";
import ModalLocationDetail from "./component/ModalLocationDetail";
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";
import fireAPI from "@/api/modules/fireAPI";
import shareAPI from "@/api/modules/shareAPI";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
    "modal-node-station": ModalNodeStation,
    "modal-location-detail": ModalLocationDetail,
  },
  data() {
    return {
      timer: 500,
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
      typeForm: "",
      stateForm: null,
      dataByID: null,
      columnAdd: null,
      dataFormOptions: {
        PowerTypeID: null,
        ConnectTypeID: null,
        LocationID: [],
      },
      nameState: null,
      nameDevice: "",
      dataNodesTable: [],
      fieldNodeTable: null,
      columnShowNode: null,
      titleNode: "",
      optionLocation: null,
      keyShow: 0,
      keyString: "Fire",
      dataParent: null,
      storeImg: null,
      listImage: null,
      listImageBase64: [],
      isShow: true,

      //////
      dataTableLocationDetail: [],
      columnShowLocationDetail: [],
    };
  },
  methods: {
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
    resetModalUpdate() {
      this.storeImg = null;
      this.listImage = null;
      this.listImageBase64 = [];
    },
    updateImageModal(item) {
      this.getImages(item[0].StationID);
      this.$bvModal.show("update-image");
    },
    handleReload(items) {
      this.managerModal([items], "reload");
    },
    managerModal(items, key) {
      this.titleNode = items[0].FireLocationName;
      this.dataParent = items[0];
      let body = {
        StationID: items[0].StationID,
      };
      fireAPI
        .getNodesByID(body)
        .then((val) => {
          this.dataNodesTable = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          let keys =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : null;
          this.getColumn("FireNodes", "NODE");
          setTimeout(() => {
            this.fieldNodeTable = handling.mergeTableAndData(
              keys,
              this.columnShowNode
            );
            if (key == "reload") {
            } else {
              this.$bvModal.show("modal-nodes");
            }
          }, 500);
        })
        .catch((err) => console.log(err));
    },
    printExternalExcel(table) {
      handling.printExcel(
        table,
        this.data.FireLocationName.toUpperCase(),
        null,
        null,
        this.$t("form.page") + " " + this.$refs["tableForm"].currentPage
      );
    },
    addModal() {
      this.apiForm = "/api/FireStations/ExportProduct";
      setTimeout(() => {
        this.$bvModal.show("modal-finished-product");
      }, this.timer);
    },
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
      };
      systemAPI
        .submitData(this.apiForm, body)
        .then((val) => {
          if (val.status) {
            if (!this.items || this.items.length === 0) {
              this.$bvModal.hide("modal-finished-product");
              this.getColumn("FireStations");
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
    getFireLocations() {
      fireAPI
        .fireLocationActive()
        .then((val) => {
          let array = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (array.length > 0) {
            let arrTable = [];
            this.convertKeyTableData(array, 0, arrTable, 0);
            this.optionLocation = arrTable;
          } else {
            this.optionLocation = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertKeyTableData(array, ParentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["ParentID"] !== ParentID) {
          return;
        }
        let obj = {
          ID: item["ID"],
          ParentID: item["ParentID"],
          FireLocationName: item["FireLocationName"],
          Address: item["Address"],
          Lat: item["Lat"],
          Long: item["Long"],
          IsActive: item["IsActive"],
          Note: item["Note"],
          Key: i,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["ID"], arrayTable, i + 1);
      });
    },
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("FireStations");
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
          this.$bvModal.hide(this.nameForm);
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
    showDataFormOptionParentLocation(array, id) {
      let _array = [];
      if (id) {
        _array = array.filter((x) => x.ParentID !== id && x.ID !== id);
      } else {
        _array = array;
      }
      let newArray = [];
      this.recursiveTreeSelectParentLocation(_array, 0, newArray, 0);
      this.dataFormOptions.LocationID = newArray;
    },
    recursiveTreeSelectParentLocation(a, i, r, c) {
      if (!a) return;
      a.forEach((element) => {
        if (element["ParentID"] != i || element["IsActive"] == false) return;
        let n = [];
        this.recursiveTreeSelectParentLocation(a, element["ID"], n, c + 1);
        if (n.length > 0) {
          r.push({
            id: element["ID"],
            label: element["FireLocationName"],
            parent: element["ParentID"],
            key: c,
            children: n,
          });
        } else {
          r.push({
            id: element["ID"],
            label: element["FireLocationName"],
            parent: element["ParentID"],
            key: c,
          });
        }
      });
    },
    editModal(items) {
      this.getDataByID(items[0].StationID);
      // this.showDataFormOptionParentLocation(this.optionLsocation);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "custom-table-report-fire-station";
        this.titleForm = "CẬP NHẬT TRIỄN KHAI";
        this.typeForm = "EDIT";
        this.apiForm = "/api/FireStations/EditDeploy"; //fix
        this.bodyFormDefault = {
          StationID: items[0].StationID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        this.getSelectOptions();
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
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
            this.handleSubmitDelete(items[0].StationID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDelete(id) {
      let body = {
        StationID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      fireAPI
        .fireStationRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("FireStations");
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
    rowSelected(data) {
      this.selectedItems = data;
    },
    statusEdit(data, field) {
      if (field.toUpperCase() == "ISACTIVE") {
        let body = {
          StationID: data.StationID,
          IsActive: handling.convertBooleanToBit(data.IsActive),
        };
        fireAPI
          .fireStationChangeStatus(body)
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
      }
      if (field.toUpperCase() == "ISTEST") {
        let body = {
          StationID: data.StationID,
          IsTest: handling.convertBooleanToBit(data.IsTest),
        };
        fireAPI
          .otherStatusChangeStatus(body)
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
      }
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
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
    getDataByID(id) {
      let body = {
        StationID: id,
      };
      fireAPI
        .fireStationByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPowerTypeOption() {
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
    getConnectTypeOption() {
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
    getLocationOption() {
      fireAPI
        .fireLocationGet()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.LocationID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].FireLocationName,
                    value: val.data[i].ID,
                  };
                  this.dataFormOptions.LocationID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData(id) {
      fireAPI
        .fireStationGet()
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable(id) {
      fireAPI
        .fireStationGet()
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumn(string, key) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          if (key == "LOCATION-DETAIL") {
            this.columnShowLocationDetail = val.status ? val.data : [];
          } else if (key == "NODE") {
            this.columnShowNode = val.status ? val.data : [];
          } else {
            this.listColumnShow = val.status ? val.data : [];
          }
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
    getSelectOptions() {
      fireAPI
        .fireLocationActive()
        .then((val) => {
          const arr = val.status ? val.data : [];
          this.dataFormOptions.LocationID = arr.map((item) => ({
            value: item.ID,
            text: item.FireLocationName,
          }));
          if (arr.length && !this.dataForm.LocationID[1]) {
            this.dataForm.LocationID[1] =
              this.dataFormOptions.LocationID[0].value;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    managerLocation(items) {
      this.titleNode = items[0].StationName;
      this.dataParent = items[0];
      
      this.getColumn("FireLocationDetails", "LOCATION-DETAIL");
      this.getFireLocationDetail(items[0].StationID)
      setTimeout(() => {
        this.$bvModal.show("modal-location-detail");
      }, 500);
    },
    getFireLocationDetail(id) {
      let body = {
        StationID: id,
      };

      fireAPI
        .fireLocationDetailGet(body)
        .then((val) => {
          this.dataTableLocationDetail = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => console.log(err));
    },
    handleReloadLocationDetail(items) {
      this.getFireLocationDetail(items.StationID)
    }
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("FireStations");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("FireStations");
    await this.getLocationOption();
    await this.getConnectTypeOption();
    await this.getPowerTypeOption();
    await this.getFireLocations();
  },
  watch: {
    items() {
      this.getColumn("FireStations");
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
          };
        }
      }
    },
    fieldTableLocationDetail() {
      if (this.dataTableLocationDetail.length > 0) {
        const keys = Object.keys(this.dataTableLocationDetail[0]);
        return handling.mergeTableAndData(keys, this.columnShowLocationDetail);
      }
      return [];
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
