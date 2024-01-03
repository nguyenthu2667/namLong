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
                @click="addModal()"
                v-if="objectData.accessWrite === true"
              >
                <i class="fad fa-plus"></i>
                &emsp;{{ $t("pages.add") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="editModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.edit") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.edit") }}
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
                @click="shipperModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-user-hard-hat"></i>
                &emsp;{{ $t("modal.shipper") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-user-hard-hat"></i>
                &emsp;{{ $t("modal.shipper") }}
              </b-dropdown-item>
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
      :type-layer="'gasstore'"
      @handle-submit="handleSubmit"
    ></custom-form>
    <b-modal
      class="text-center"
      centered
      id="shipper-modal"
      size="xl"
      hide-header
      scrollable
      ok-only
    >
      <template v-if="selectedItems.length > 0">
        <h1>
          <strong>
            {{ $t("modal.shipper").toUpperCase() }}
            {{ selectedItems[0].StoreName.toUpperCase() }}
          </strong>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <b-dropdown-item
                @click="addModalShipper(selectedItems)"
                v-if="objectData.accessWrite === true"
              >
                <i class="fad fa-plus"></i>
                &emsp;{{ $t("pages.add") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="editModalShipper(selectedItemsShipper)"
                v-if="
                  selectedItemsShipper.length === 1 &&
                  objectData.accessWrite === true
                "
              >
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.edit") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.edit") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="deleteModalShipper(selectedItemsShipper)"
                v-if="
                  selectedItemsShipper.length === 1 &&
                  objectData.accessWrite === true
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
                @click="resetPassModal(selectedItemsShipper)"
                v-if="
                  selectedItemsShipper.length === 1 &&
                  objectData.accessWrite === true
                "
              >
                <i class="fad fa-sync-alt"></i>
                &emsp;{{ $t("dropdown.reset-password") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-sync-alt"></i>
                &emsp;{{ $t("dropdown.reset-password") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="printExternalExcel('custom-table-shipper')"
                v-if="
                  shippers &&
                  shippers.length > 0 &&
                  objectData.accessWrite === true
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
        <div class="separator mb-5"></div>
        <custom-table
          ref="tableForm"
          :id="'custom-table-shipper'"
          :data-table="shippers"
          :field-table="fieldsShipper"
          :column-show="listColumnShowShipper"
          :access-write="objectData.accessWrite"
          :select-mode="selectMode"
          @row-selected="rowSelectShipper"
          @status-edit="statusEditShipper"
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
import Axios from "axios";
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "@/components/Form/CustomForm";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import gasStoreAPI from "@/api/modules/gasStoreAPI";
import shipperAPI from "@/api/modules/shipperAPI";

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
      listColumnShowShipper: null,
      objectKeyShipper: null,
      menuRight: [],
      selectedItems: [],
      selectedItemsShipper: [],
      items: null,
      shippers: null,
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      dataForm: null,
      typeForm: "",
      stateForm: null,
      dataByID: null,
      dataByShipperID: null,
      columnAdd: null,
      columnAddShipper: null,
      keyString: "Stores",
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
    resetPassModal(items) {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question-pass") + items[0].ShippersName + "?",
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
            this.handleSubmitResetPass(items[0].ShippersID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitResetPass(id) {
      let body = {
        MenuIDCurent: this.objectData.menuIDCurrent,
        UserIDCurent: this.userID,
        ID: id,
        Phone: this.selectedItemsShipper[0].Phone,
      };
      shipperAPI
        .employerResetPassword(body)
        .then((val) => {
          if (val.status) {
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
      this.getImages(item[0].StoreID);
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
        StationID: this.selectedItems[0].StoreID,
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
    addModalShipper(items) {
      this.dataForm = handling.showExtensionFormAdd(this.columnAddShipper);
      this.nameForm = "modal-add-shipper";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/Shippers/Add";
      this.bodyFormDefault = {
        StoreID: items[0].StoreID,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    editModalShipper(items) {
      this.getDataByShipperID(items[0].ShippersID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByShipperID);
        this.nameForm = "modal-edit-shippers";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/Shippers/Edit";
        this.bodyFormDefault = {
          ID: items[0].ShippersID,
          StoreID: items[0].StoreID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        this.dataForm.Password[1] = "**********";
        this.dataForm.Password[4] = "DISABLED";
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModalShipper(items) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + items[0].ShippersName + "?", {
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
            this.handleSubmitDeleteShipper(items[0].ShippersID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSubmitDeleteShipper(id) {
      let body = {
        ID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      shipperAPI
        .shipperRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.shippers.length === 1) {
              this.getColumnShipper("Shippers");
              this.getKeyTableShipper();
              this.getShipperByStore(this.selectedItems[0].StoreID);
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.getShipperByStore(this.selectedItems[0].StoreID);
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.getShipperByStore(this.selectedItems[0].StoreID);
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
    statusEditShipper(data) {
      let body = {
        ID: data.ShippersID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      shipperAPI
        .shipperChangeStatus(body)
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
    rowSelectShipper(data) {
      this.selectedItemsShipper = data;
    },
    resetModalShipper() {
      this.selectedItemsShipper = [];
      this.shippers = null;
    },
    getDataByShipperID(id) {
      let body = {
        ID: id,
      };
      shipperAPI
        .shipperByID(body)
        .then((val) => {
          this.dataByShipperID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    shipperModal(items) {
      this.getShipperByStore(items[0].StoreID);
      setTimeout(() => {
        this.$bvModal.show("shipper-modal");
      }, 200);
    },
    getShipperByStore(id) {
      let body = {
        StoreID: id,
      };
      shipperAPI
        .shipperByStoreID(body)
        .then((val) => {
          this.shippers = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : null;
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
      this.dataForm = handling.showExtensionFormAdd(this.columnAdd);
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/Stores/Add";
      this.bodyFormDefault = {
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    handleSubmit(val) {
      if (val.status) {
        this.getColumn("Stores");
        this.getKeyTable();
        this.getData();
        this.getColumnShipper("Shippers");
        this.getKeyTableShipper();
        if (this.selectedItems.length > 0) {
          if (!this.shippers || this.shippers.length === 0) {
            this.$bvModal.hide(this.nameForm);
            this.getColumnShipper("Shippers");
            this.getKeyTableShipper();
            this.getShipperByStore(this.selectedItems[0].StoreID);
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            this.$bvModal.hide(this.nameForm);
            this.getShipperByStore(this.selectedItems[0].StoreID);
            setTimeout(() => {
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        } else {
          if (!this.items || this.items.length === 0) {
            this.$bvModal.hide(this.nameForm);
            this.getColumn("Stores");
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
        }
      } else {
        if (this.selectedItems.length > 0) {
          this.$bvModal.hide(this.nameForm);
          this.getShipperByStore(this.selectedItems[0].StoreID);
          setTimeout(() => {
            this.makeToast(
              "danger",
              this.$t("toast.fail").toUpperCase(),
              val.message
            );
          }, this.timer);
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
      }
      this.nameForm = null;
      this.titleForm = null;
      this.apiForm = null;
      this.bodyFormDefault = null;
      this.typeForm = "";
    },
    editModal(items) {
      this.getDataByID(items[0].StoreID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/Stores/Edit";
        this.bodyFormDefault = {
          ID: items[0].StoreID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + items[0].StoreName + "?", {
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
            this.handleSubmitDelete(items[0].StoreID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSubmitDelete(id) {
      let body = {
        ID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      gasStoreAPI
        .gasStoreRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("Stores");
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
    statusEdit(data) {
      let body = {
        ID: data.StoreID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      gasStoreAPI
        .gasStoreChangeStatus(body)
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
    getFormAddShowShipper(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          this.columnAddShipper = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataByID(id) {
      let body = {
        ID: id,
      };
      gasStoreAPI
        .gasStoreByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      gasStoreAPI
        .gasStoreList()
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
      gasStoreAPI
        .gasStoreList()
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTableShipper() {
      this.objectKeyShipper =
        this.shippers && this.shippers.length > 0
          ? Object.keys(this.shippers[0])
          : [];
      // gasStoreAPI.gasStoreList()
      //   .then((val) => {
      //     this.objectKeyShipper =
      //       val.status && val.data.length > 0 ? Object.keys(val.data[0]) : []
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
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
    getColumnShipper(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowShipper = val.status ? val.data : [];
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
    await this.getColumn("Stores");
    await this.getColumnShipper("Shippers");
    await this.getKeyTable();
    await this.getKeyTableShipper();
    await this.getData();
    await this.getFormAddShow("Stores");
    await this.getFormAddShowShipper("Shippers");
  },
  watch: {
    items() {
      this.getColumn("Stores");
      this.getKeyTable();
    },
    shippers() {
      this.getColumnShipper("Shippers");
      this.getKeyTableShipper();
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
    fieldsShipper: function () {
      return handling.mergeTableAndData(
        this.objectKeyShipper,
        this.listColumnShowShipper
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
};
</script>
