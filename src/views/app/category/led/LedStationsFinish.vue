<template>
  <div v-if="objectData" class="category-led-station">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>{{ objectData.formName }}</strong>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <b-dropdown-item
                @click="addModal()"
                v-if="objectData.accessWrite === true"
              >
                <i class="fad fa-plus"></i>
                &emsp;{{ $t("pages.finished-product") }}
              </b-dropdown-item>
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
              <!-- <b-dropdown-item
                @click="updateImageModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 &&
                  objectData.accessWrite === true &&
                  selectedItems[0].IsDeploy == true
                "
              >
                <i class="fad fa-images"></i>
                &emsp;{{ $t('update-image') }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-images"></i>
                &emsp;{{ $t('update-image') }}
              </b-dropdown-item> -->
              <!-- <b-dropdown-item
                @click="deleteModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 &&
                  objectData.accessWrite === true &&
                  !selectedItems[0].IsDeploy
                "
              >
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t('pages.delete') }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t('pages.delete') }}
              </b-dropdown-item> -->
              <b-dropdown-item
                @click="printExternalExcel('custom-table')"
                v-if="
                  items && items.length > 0 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-file-excel"></i>
                &emsp;
                {{ $t("report.action.download-excel-page") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-file-excel"></i>
                &emsp;
                {{ $t("report.action.download-excel-page") }}
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
      :key-show="keyShow"
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
  </div>
</template>

<script>
import CustomTables from "@/components/Table/CustomTables";
// import CustomForm from './component/FormFire'
import CustomForm from "@/components/Form/CustomForm";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import ledAPI from "@/api/modules/ledAPI";
// import { getExportID, getStationByID, fireLocations } from '@/data/modules/fire'
// import { uploadImagesBase64, getImagesByID, regionList } from '@/api/modules/systemAPI'

// import {
//   getExport,
//   exportProduct,
//   // deployProduct,
//   getLedStationsByID,
//   ledStationsRemove,
// } from '@/api/modules/ledAPI'
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
      nameState: null,
      dataTypeDefault: null,
      nameDevice: "",
      dataFormOptions: {
        LocationID: [],
        DataTypeID: [],
        RegionID: [],
      },
      optionLocation: null,
      regionOption: null,
      keyShow: 0,
      keyString: "GasRestaurent",
      storeImg: null,
      listImage: null,
      listImageBase64: [],
      isShow: true,
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
    updateImageModal(item) {
      this.getImages(item[0].StationID);
      this.$bvModal.show("update-image");
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
    printExternalExcel(table) {
      handling.printExcel(
        table,
        this.objectData.formName,
        null,
        null,
        this.$t("form.page") + " " + this.$refs["tableForm"].currentPage
      );
    },
    addModal() {
      this.$bvModal.show("modal-finished-product");

      // this.apiForm = '/api/AquaStations/ExportProduct'
      // this.apiForm = '/api/LedStations/Export'
      // this.getOptionDataTypeID('SMARTLED')
      // setTimeout(() => {
      //   this.$bvModal.show('modal-finished-product')
      // }, this.timer)
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
        DataTypeID: this.dataTypeDefault,
      };
      // systemAPI.submitData(this.apiForm, body)
      exportProduct(body)
        .then((val) => {
          if (val.status) {
            if (!this.items || this.items.length === 0) {
              this.$bvModal.hide("modal-finished-product");
              this.getColumn("LedStations");
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
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("LedStations");
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
    editModal(items) {
      this.getDataByID(items[0].StationID);
      // this.getOptionDataTypeID('SMARTLED')

      this.showDataFormOptionParentLocation(this.optionLocation);
      setTimeout(() => {
        for (let i = 0; i < this.regionOption.length; i++) {
          if (this.regionOption[i].RegionID === items[0].RegionID) {
            this.keyShow = this.regionOption[i].Key;
          }
        }

        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/LedStations/Edit"; //fix
        this.bodyFormDefault = {
          StationID: items[0].StationID,
          MenuIDCurent: this.objectData.menuIDCurrent,
          // DataTypeID: 5028,
        };
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
      ledStationsRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("LedStations");
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
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
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
        StationID: id, // dùng Aqua chung thì đổi key thành ID
        //DataTypeID: 5028, // a.đức -> gán cứng
      };
      // getStationByID(body)
      ledAPI
        .getLedStationsByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      ledAPI
        .getExport()
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
      // let body = {
      //   DataTypeID: 5028, // a.đức -> gán cứng
      // }
      // getExportID(body)
      //   .then((val) => {
      //     this.items = val.status
      //       ? handling.convertDataBitToBoolean(val.data)
      //       : []
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
    },
    getKeyTable() {
      // let body = {
      //   DataTypeID: 5028, // a.đức -> gán cứng
      // }
      // getExportID(body)
      ledAPI
        .getExport()
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
    getPowerTypeOption() {
      ledAPI
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
      ledAPI
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
    // getFireLocations() {
    //   fireLocations()
    //     .then((val) => {
    //       let array = val.status
    //         ? handling.convertDataBitToBoolean(val.data)
    //         : []
    //       if (array.length > 0) {
    //         let arrTable = []
    //         this.convertKeyTableData(array, 0, arrTable, 0)
    //         this.optionLocation = arrTable
    //       } else {
    //         this.optionLocation = []
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    // convertKeyTableData(array, ParentID, arrayTable = [], i) {
    //   array.forEach((item) => {
    //     console.log(item);
    //     if (item['ParentID'] !== ParentID) {
    //       return
    //     }
    //     let obj = {
    //       ID: item['ID'],
    //       ParentID: item['ParentID'],
    //       FireLocationName: item['FireLocationName'],
    //       Address: item['Address'],
    //       Lat: item['Lat'],
    //       Long: item['Long'],
    //       IsActive: item['IsActive'],
    //       Note: item['Note'],
    //       Key: i,
    //     }
    //     arrayTable.push(obj)
    //     this.convertKeyTableData(array, item['ID'], arrayTable, i + 1)
    //   })
    // },
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
    getOptionDataTypeID(code) {
      let body = {
        Note: code,
      };
      systemAPI
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
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("LedStations");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("LedStations");
    await this.getConnectTypeOption();
    await this.getPowerTypeOption();
    await this.getOptionDataTypeID("SMARTLED");
    await this.getRegion();
    // await this.getFireLocations()
  },
  watch: {
    items() {
      this.getColumn("LedStations");
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

<style lang="scss">
.category-led-station {
  td {
    vertical-align: middle;
    padding-top: 16px;
  }
}
</style>
