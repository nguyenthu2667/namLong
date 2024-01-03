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
              <!--              <b-dropdown-item @click="printExternalExcel('custom-table-report')"-->
              <!--                               v-if="items && items.length > 0 && objectData.accessWrite === true">-->
              <!--                <i class="fad fa-file-excel"></i>&emsp; {{ $t('report.action.download-excel') }}-->
              <!--              </b-dropdown-item>-->
              <!--              <b-dropdown-item v-else disabled>-->
              <!--                <i class="fad fa-file-excel"></i>&emsp; {{ $t('report.action.download-excel') }}-->
              <!--              </b-dropdown-item>-->
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
    <!--    <custom-table-report-->
    <!--      :id-table="'custom-table-report'"-->
    <!--      :data-table="items"-->
    <!--      :field-table="fields"-->
    <!--      :column-show="listColumnShow">-->
    <!--    </custom-table-report>-->
    <custom-form
      :name-form="nameForm"
      :title-form="titleForm"
      :api-form="apiForm"
      :data-form="dataForm"
      :state-form="stateForm"
      :id-form="idForm"
      :type-form="typeForm"
      :menu-current="objectData.menuIDCurrent"
      :data-form-option="dataFormOptions"
      :key-show="keyShow"
      @handle-submit="handleSubmit"
      @getLatLng="getLatLng"
    ></custom-form>
  </div>
</template>
<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomTableReports from "@/components/Table/CustomTableReports";
import CustomFormTree from "./component/CustomFormFunctionTreeCurrent";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import { defaultRegionCode, defaultMapType } from "@/constants/config";
import wfs from "@/constants/wfs";
import systemAPI from "@/api/modules/systemAPI";
import treeAPI from "@/api/modules/treeAPI";
import collectAPI from "@/api/modules/collectAPI";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-table-report": CustomTableReports,
    "custom-form": CustomFormTree,
  },
  data() {
    return {
      timer,
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
      dataForm: null,
      dataFormOptions: {
        TreeID: [],
        RouteID: [],
        TreeStatusID: [],
        LandID: [],
        TreeTypeID: [],
        ManagementUnitName: [],
      },
      idForm: null,
      typeForm: "",
      stateForm: {
        TreeHeight: null,
        TreeWidth: null,
        TreeNumber: null,
        Lat: null,
        Long: null,
        FloweringPeriod: null,
        FullAddress: null,
        RootsDepth: null,
        TreeName: null,
        Extention1: null,
        Extention2: null,
        Extention3: null,
        Extention4: null,
        Extention5: null,
        Extention6: null,
        Extention7: null,
        Extention8: null,
        Extention9: null,
        Extention10: null,
      },
      dataByID: null,
      columnAdd: null,
      keyShow: 0,
      optionRoute: null,
    };
  },
  methods: {
    getLatLng(v) {
      this.dataForm.Lat[1] = "" + v.lat;
      this.dataForm.Long[1] = "" + v.lng;
      this.dataForm = Object.assign({}, this.dataForm);
    },
    addModal() {
      this.showDataFormOptionRoute(this.optionRoute);
      this.dataForm = handling.showExtensionFormAdd(
        this.columnAdd,
        this.dataFormOptions
      );
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/TreeDataCurrents/Add";
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    handleSubmit(val, objectDataWFS) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("TreeDataCurrents");
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
      this.idForm = null;
      this.typeForm = "";
    },
    editModal(items) {
      this.getDataByID(items[0].ID);
      this.showDataFormOptionRoute(this.optionRoute);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        for (let i = 0; i < this.optionRoute.length; i++) {
          if (this.optionRoute[i].TreeRouteID === items[0].RouteID) {
            this.keyShow = this.optionRoute[i].Key;
          }
        }

        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/TreeDataCurrents/Edit";
        this.idForm = items[0].ID;
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    deleteModal(items) {
      let treeNumber;
      switch (items[0].TreeNumber.toString().length) {
        case 1:
          treeNumber = "00" + items[0].TreeNumber.toString();
          break;
        case 2:
          treeNumber = "0" + items[0].TreeNumber.toString();
          break;
        case 3:
          treeNumber = items[0].TreeNumber.toString();
          break;
        default:
          treeNumber = items[0].TreeNumber.toString();
          break;
      }
      let dataFormWFS = {
        StationID: parseInt(items[0].TreeID.toString() + treeNumber),
        Lat: items[0].Lat,
        Long: items[0].Long,
        StationName: items[0].TreeName,
        StationAddress: items[0].FullAddress,
      };
      let objectDataWFS = wfs.getDataTypeTable(dataFormWFS, "Tree");
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + items[0].TreeName + "?", {
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
            this.handleSubmitDelete(items[0].ID, objectDataWFS);
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
                objectDataWFS.data[
                  objectDataWFS.type.toLowerCase() + "id"
                ].toString() ===
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
      treeAPI
        .treeDataRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("TreeDataCurrents");
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
    showDataFormOptionRoute(array, id) {
      let _array = [];
      if (id) {
        _array = array.filter((x) => x.ParentID != id && x.TreeRouteID !== id);
      } else {
        _array = array;
      }
      let newArray = [];
      handling.recursiveTreeSelectRoute(_array, "0", newArray, 0);
      this.dataFormOptions.RouteID = newArray;
    },
    convertKeyTableData(array, parentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["ParentID"] != parentID) {
          return;
        }
        let obj = {
          TreeRouteID: item["TreeRouteID"],
          TreeRouteName: item["TreeRouteName"],
          ParentID: item["ParentID"],
          IsActive: item["IsActive"],
          Note: item["Note"],
          Key: i,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["TreeRouteID"], arrayTable, i + 1);
      });
    },
    getOptionRoute() {
      collectAPI
        .collectTreeRouteList()
        .then((val) => {
          let array = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (array.length > 0) {
            let arrTable = [];
            this.convertKeyTableData(array, "0", arrTable, 0);
            this.optionRoute = arrTable;
          } else {
            this.optionRoute = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionTree() {
      treeAPI
        .treeList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.TreeID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].TreeName,
                    value: val.data[i].TreeID,
                  };
                  this.dataFormOptions.TreeID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionTreeStatus() {
      treeAPI
        .treeStatusList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.TreeStatusID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].TreeStatusName,
                    value: val.data[i].TreeStatusID,
                  };
                  this.dataFormOptions.TreeStatusID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionTreeType() {
      treeAPI
        .treeTypeList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.TreeTypeID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].TreeTypeName,
                    value: val.data[i].TreeTypeID,
                  };
                  this.dataFormOptions.TreeTypeID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionTreeLand() {
      treeAPI
        .treeLandList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.LandID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].LandName,
                    value: val.data[i].LandID,
                  };
                  this.dataFormOptions.LandID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionTreeLand() {
      treeAPI
        .treeLandList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.LandID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].LandName,
                    value: val.data[i].LandID,
                  };
                  this.dataFormOptions.LandID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getOptionManagementUnit() {
      treeAPI
        .managementUnitListActive()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.ManagementUnitID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].ManagementUnitName,
                    value: val.data[i].ManagementUnitID,
                  };
                  this.dataFormOptions.ManagementUnitID.push(obj);
                }
              }
            }
          }
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
    getDataByID(id) {
      let body = {
        ID: id,
      };
      treeAPI
        .treeDataByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      treeAPI
        .treeDataList()
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
      treeAPI
        .treeDataList()
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
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("TreeDataCurrents");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("TreeDataCurrents");
    await this.getOptionTree();
    await this.getOptionRoute();
    await this.getOptionTreeStatus();
    await this.getOptionTreeType();
    await this.getOptionTreeLand();
    await this.getOptionManagementUnit();
  },
  watch: {
    items() {
      this.getColumn("TreeDataCurrents");
      this.getKeyTable();
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
};
</script>
<style></style>
