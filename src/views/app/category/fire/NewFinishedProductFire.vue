<template>
  <div id="app-content-full" class="npl-categories npl-regions">
    <b-card>
      <div style="margin-top: -15px">
        <Title :title="objectData.formName" />
      </div>
      <b-row class="h-100">
        <b-col lg="4" class="h-100">
          <div class="units-frame">
            <div class="units-header">
              <div class="units-title">{{ $t("fire.magement-cabinet") }}</div>
              <i
                v-if="objectData.accessWrite"
                class="fas fa-plus btn-units"
                @click="addUnits('magementCabinet')"
              ></i>
            </div>
            <div class="units-content">
              <b-table
                v-if="dataTableMagementCabinet.length > 0"
                :items="dataTableMagementCabinet"
                :fields="[
                  { key: 'StationID', label: $t('fire.device-id') },
                  { key: 'StationName', label: $t('fire.device-name') },
                  { key: 'InputDate', label: $t('fire.input-date') },
                  { key: 'Action', label: $t('fire.action') },
                ]"
                :bordered="true"
                show-empty
                id="table-child"
                sticky-header
                style="max-height: 100%"
                >s
                <template #cell(InputDate)="row">
                  <div class="text-right">
                    {{ row.item.InputDate }}
                  </div>
                </template>
                <template #cell(IsActive)="row">
                  <div class="text-center">
                    <i
                      v-if="row.item.IsActive === 1"
                      class="fas fa-check text-success"
                    ></i>
                  </div>
                </template>
                <template #cell(Action)="row">
                  <div class="d-flex justify-content-center">
                    <i
                      v-if="objectData.accessWrite"
                      @click.stop="removeUnits(row.item, 'magementCabinet')"
                      class="fas fa-trash-alt text-danger mr-2 btn-units"
                    ></i>
                    <!-- <i
                      v-if="objectData.accessWrite"
                      @click.stop="editUnits(row.item, 'magementCabinet')"
                      class="fas fa-edit mr-2 btn-units"
                    ></i> -->
                  </div>
                </template>
              </b-table>
              <template v-else>
                <div class="units-item">
                  {{ $t("cards.no-data") }}
                </div>
              </template>
            </div>
          </div>
        </b-col>
        <b-col lg="4" class="h-100">
          <div class="units-frame">
            <div class="units-header">
              <div class="units-title">{{ $t("fire.alarm-cabinet") }}</div>
              <i
                v-if="objectData.accessWrite"
                class="fas fa-plus btn-units"
                @click="addUnits('alarmCabinet')"
              ></i>
            </div>
            <div class="units-content">
              <b-table
                v-if="dataTableAlarmCabinet.length > 0"
                :items="dataTableAlarmCabinet"
                :fields="[
                  { key: 'ID', label: $t('fire.device-id') },
                  { key: 'NodeName', label: $t('fire.device-name') },
                  { key: 'InputDate', label: $t('fire.input-date') },
                  { key: 'Action', label: $t('fire.action') },
                ]"
                :bordered="true"
                show-empty
                id="table-child"
                sticky-header
                style="max-height: 100%"
              >
                <template #cell(InputDate)="row">
                  <div class="text-right">
                    {{ converDate(row.item.InputDate) }}
                  </div>
                </template>
                <template #cell(IsActive)="row">
                  <div class="text-center">
                    <i
                      v-if="row.item.IsActive === 1"
                      class="fas fa-check text-success"
                    ></i>
                  </div>
                </template>
                <template #cell(Action)="row">
                  <div class="d-flex justify-content-center">
                    <i
                      v-if="objectData.accessWrite"
                      @click.stop="removeUnits(row.item, 'alarmCabinet')"
                      class="fas fa-trash-alt text-danger mr-2 btn-units"
                    ></i>
                    <!-- <i
                      v-if="objectData.accessWrite"
                      @click.stop="editUnits(row.item, 'magementCabinet')"
                      class="fas fa-edit mr-2 btn-units"
                    ></i> -->
                  </div>
                </template>
              </b-table>
              <template v-else>
                <div class="units-item">
                  {{ $t("cards.no-data") }}
                </div>
              </template>
            </div>
          </div>
        </b-col>
        <b-col lg="4" class="h-100">
          <div class="units-frame">
            <div class="units-header">
              <div class="units-title">
                {{ $t("fire.list-of-fire-alarms") }}
              </div>
              <i
                @click="addUnits('fireAlarms')"
                v-if="objectData.accessWrite"
                class="fas fa-plus btn-units"
              ></i>
            </div>
            <div class="units-content">
              <b-table
                v-if="dataTableFireAlarms.length > 0"
                :items="dataTableFireAlarms"
                :fields="[
                  { key: 'ID', label: $t('fire.device-id') },
                  { key: 'NodeName', label: $t('fire.device-name') },
                  { key: 'InputDate', label: $t('fire.input-date') },
                  { key: 'Action', label: $t('fire.action') },
                ]"
                :bordered="true"
                show-empty
                id="table-child"
                sticky-header
                style="max-height: 100%"
              >
                <template #cell(InputDate)="row">
                  <div class="text-right">
                    {{ converDate(row.item.InputDate) }}
                  </div>
                </template>
                <template #cell(IsActive)="row">
                  <div class="text-center">
                    <i
                      v-if="row.item.IsActive === 1"
                      class="fas fa-check text-success"
                    ></i>
                  </div>
                </template>
                <template #cell(Action)="row">
                  <div class="d-flex justify-content-center">
                    <i
                      v-if="objectData.accessWrite"
                      @click.stop="removeUnits(row.item, 'fireAlarms')"
                      class="fas fa-trash-alt text-danger mr-2 btn-units"
                    ></i>
                    <!-- <i
                      v-if="objectData.accessWrite"
                      @click.stop="editUnits(row.item, 'magementCabinet')"
                      class="fas fa-edit mr-2 btn-units"
                    ></i> -->
                  </div>
                </template>
              </b-table>
              <template v-else>
                <div class="units-item">
                  {{ $t("cards.no-data") }}
                </div>
              </template>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-modal
      id="modal-units"
      :title="titleModal"
      size="lg"
      :ok-title="$t('modal.agree')"
      :cancel-title="$t('modal.cancel')"
      @ok="handleSubmit"
      @hidden="hiddenModal"
    >
      <template v-if="dataForm">
        <b-row>
          <b-col lg="4">
            <b-form-group
              :label="dataForm.Name[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.Name[3]"
            >
              <b-form-input v-model="dataForm.Name[1]"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="dataForm.NameExtention1[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.NameExtention1[3]"
            >
              <b-form-input v-model="dataForm.NameExtention1[1]"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="4" xl="4">
            <b-form-group
              :label="dataForm.IsActive[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.IsActive[3]"
              v-if="dataForm.IsActive"
            >
              <div class="d-flex">
                <b-form-radio v-model="dataForm.IsActive[1]" :value="1">{{
                  $t("npl.using")
                }}</b-form-radio>
                <b-form-radio
                  v-model="dataForm.IsActive[1]"
                  :value="0"
                  class="ml-2"
                  >{{ $t("npl.not-use") }}</b-form-radio
                >
              </div>
            </b-form-group>
          </b-col>
        </b-row>
      </template>
    </b-modal>
    <b-modal
      id="modal-units"
      :title="$t('form.title-edit')"
      size="lg"
      :ok-title="$t('modal.agree')"
      :cancel-title="$t('modal.cancel')"
      @ok="handleSubmit"
      @hidden="hiddenModal"
    >
      <template v-if="dataFormEdit"> </template>
    </b-modal>
    <b-modal
      id="modal-add-units"
      :title="$t('form.title-add')"
      size="md"
      :ok-title="$t('modal.agree')"
      :cancel-title="$t('modal.cancel')"
      @ok="handleAdd"
      @hidden="hiddenModalAdd"
    >
      <template v-if="dataFormAdd">
        <b-row>
          <b-col lg="12">
            <b-form-group :label="$t('form.device-id')">
              <b-form-input v-model="dataFormAdd.StationID"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </template>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import Title from "@/views/app/category/npl/component/Title.vue";

import systemAPI from "@/api/modules/systemAPI";
import nplAPI from "@/api/modules/nplAPI";
import fireAPI from "@/api/modules/fireAPI";
import handling from "@/constants/handling.js";

export default {
  components: {
    Title,
  },
  data() {
    return {
      menuRight: [],
      columnAdd: [],
      dataFormOptions: {
        City: [],
        District: [],
        Ward: [],
      },
      selectedCity: "",
      selectedDistrict: "",
      titleModal: "",
      dataForm: null,
      notRequired: [
        "ID",
        "Note",
        "NameExtention1",
        "AddressExtention1",
        "LemonID",
      ],
      updateUnitsType: "", //city, district, ward

      //////
      dataTableMagementCabinet: [],
      dataTableAlarmCabinet: [],
      dataTableFireAlarms: [],
      dataFormAdd: {
        StationID: null,
      },
      dataFormEdit: null,
    };
  },
  computed: {
    objectData() {
      if (this.menuRight && this.menuRight.length) {
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
      } else {
        return {
          menuIDCurrent: "",
          formName: "",
          accessWrite: "",
        };
      }
    },
    FactorID() {
      const path = this.$route.fullPath;
      if (path.includes("category")) {
        return "Category";
      }
      return "";
    },
    CategoryType() {
      return this.$route.name;
    },
  },
  created() {
    this.getListMenuRight();
    this.getDynamicFormAdd(this.CategoryType);
    this.getCities();

    ////
    this.getDataMagementCabinet();
    this.getDataAlarmCabinet();
    this.getDataFireAlarms();
  },
  watch: {
    "$i18n.locale"(to, from) {
      if (from !== to) {
        this.getListMenuRight();
        this.getDynamicFormAdd(this.CategoryType);
        this.getCities();

        this.getDataMagementCabinet();
        this.getDataAlarmCabinet();
        this.getDataFireAlarms();

        this.selectedCity = "";
        this.selectedDistrict = "";
      }
    },
    selectedCity(newVal) {
      if (newVal || newVal === 0) {
        this.getDistrictsWards("District", newVal);
      } else {
        this.dataFormOptions = {
          ...this.dataFormOptions,
          District: [],
        };
      }
    },
    selectedDistrict(newVal) {
      if (newVal || newVal === 0) {
        this.getDistrictsWards("Ward", newVal);
      } else {
        this.dataFormOptions = {
          ...this.dataFormOptions,
          Ward: [],
        };
      }
    },
    dataForm(newVal) {
      if (newVal) {
        this.$bvModal.show("modal-units");
      }
    },
  },
  methods: {
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
    getDynamicFormAdd(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          const arr = val.status ? val.data : [];
          this.columnAdd = arr.filter((item) => item.IsHide == 0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ////
    getDataMagementCabinet() {
      fireAPI
        .fireStationGet()
        .then((val) => {
          let data = val.status ? val.data : [];
          this.dataTableMagementCabinet = data;
        })
        .catch((err) => console.log(err));
    },
    getDataAlarmCabinet() {
      let body = {
        TypeID: 2, //1 thiết bị báo cháy, 2 tủ cảnh báo tại chỗ
      };
      fireAPI
        .fireNodesGetTypeID(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          this.dataTableAlarmCabinet = data;
        })
        .catch((err) => console.log(err));
    },
    getDataFireAlarms() {
      let body = {
        TypeID: 1, //1 thiết bị báo cháy, 2 tủ cảnh báo tại chỗ
      };
      fireAPI
        .fireNodesGetTypeID(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          this.dataTableFireAlarms = data;
        })
        .catch((err) => console.log(err));
    },
    ////
    getCities() {
      let body = {
        Level: 2, //mặc định 2 là gọi các tỉnh, thành phố của Việt Nam
      };
      nplAPI
        .getCities(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          if (data.length > 0) {
            this.selectedCity = data[0].ID;
            this.selectedDistrict = "";
          } else {
            this.selectedCity = "";
            this.selectedDistrict = "";
          }
          this.dataFormOptions = {
            ...this.dataFormOptions,
            City: data,
          };
        })
        .catch((err) => console.log(err));
    },
    getDistrictsWards(option, parentID) {
      if (parentID) {
        let body = {
          ParentId: parentID,
        };
        nplAPI
          .getDistrictsWards(body)
          .then((val) => {
            let data = val.status ? val.data : [];
            if (data.length > 0) {
              //mặc định chọn phần tử đầu tiên trong mảng cho District, hoặc là Ward
              if (option == "District") {
                this.selectedDistrict = data[0].ID;
              }
            } else {
              if (option == "District") {
                this.selectedDistrict = "";
              }
            }
            this.dataFormOptions = {
              ...this.dataFormOptions,
              [option]: data,
            };
          })
          .catch((err) => console.log(err));
      }
    },
    getByID(id, isActive) {
      let body = {
        ID: id,
      };
      nplAPI
        .getRegionsByID(body)
        .then((val) => {
          let obj = val.status ? val.data : null;
          if (obj) {
            let newObj = handling.showExtensionFormEdit(obj);
            this.dataForm = {
              ...newObj,
              ID: ["ID", id, "ID", null],
              IsActive: [this.$t("status.status"), isActive, null, null],
            };
          } else {
            this.dataForm = null;
          }
        })
        .catch((err) => console.log(err));
    },
    changeCity(id) {
      this.selectedCity = id;
      this.getDistrictsWards("District", id);
    },
    changeDistrict(id) {
      this.selectedDistrict = id;
      this.getDistrictsWards("Ward", id);
    },
    addUnits(type) {
      this.updateUnitsType = type;
      this.$bvModal.show("modal-add-units");
      // if (this.columnAdd && this.columnAdd.length > 0) {
      //   let newObj = {};
      //   this.columnAdd.forEach((item) => {
      //     newObj = {
      //       ...newObj,
      //       [item.ClName]: [item.ShwName, null, item.TypeCol, null],
      //     };
      //   });
      //   this.dataForm = { ...newObj };
      //   this.titleModal = this.$t("form.title-add");
      //   this.updateUnitsType = type;
      // } else {
      //   this.dataForm = null;
      // }
    },
    removeUnits(item, type) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + "?", {
          title: this.$t("form.warning").toUpperCase(),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("modal.yes"),
          cancelTitle: this.$t("modal.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.updateUnitsType = type;
            this.handleDelete(item);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editUnits(item, type) {
      this.getByID(item.ID, item.IsActive);
      this.titleModal = this.$t("form.title-edit");
      this.updateUnitsType = type;
    },
    checkIsValid(key) {
      //có bắt đầu kiểm có giá trị
      // let isValid = true
      if (!this.isCheckIsValid) {
        // isValid = true
        return true;
      }
      // const notRequired = ["ID", "Note"];
      if (this.notRequired.includes(key)) {
        // isValid = true
        return true;
      }
      const value = this.dataForm[key][1];
      // console.log(value);
      if (value || value === 0 || value === false) {
        // isValid = true
        // console.log(key);
        return true;
      } else {
        // isValid = false
        return false;
      }
      // return isValid
    },
    checkFormValidate() {
      // let result = true;
      for (const key in this.dataForm) {
        // console.log(key);
        let result = this.checkIsValid(key);
        this.dataForm[key][3] = result;
        // console.log(result);
        if (!result) {
          console.log("invaildKey:", key);
          break;
        }
      }
      this.dataForm = { ...this.dataForm }; //--> gán lại để render lại dataForm
      for (const key in this.dataForm) {
        if (!this.dataForm[key][3]) {
          return false;
        }
      }
      return true;
      // return result;
    },
    handleSubmit(bvModalEvent) {
      bvModalEvent.preventDefault();
      if (!this.dataForm) return;
      this.isCheckIsValid = true;
      if (!this.checkFormValidate()) {
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("toast.content")
        );
      }
      let obj = {};
      for (const key in this.dataForm) {
        obj = {
          ...obj,
          [key]: this.dataForm[key][1],
        };
      }

      let ParentID;
      switch (this.updateUnitsType.toUpperCase()) {
        case "CITY":
          ParentID = 1; //id của nước Việt Nam
          break;
        case "DISTRICT":
          ParentID = this.selectedCity;
          break;
        case "WARD":
          ParentID = this.selectedDistrict;
          break;
        default:
          break;
      }
      let body = {
        ...obj,
        ParentID,
      };

      // console.log(body);
      if (body.ID) {
        nplAPI
          .editRegions(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              switch (this.updateUnitsType.toUpperCase()) {
                case "CITY":
                  this.getCities();
                  break;
                case "DISTRICT":
                  this.getDistrictsWards("District", val.data[0].ParentID);
                  break;
                case "WARD":
                  this.getDistrictsWards("Ward", val.data[0].ParentID);
                  break;
                default:
                  break;
              }
              // this.getByID(val.data[0].ID, val.data[0].IsActive);
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
            this.$bvModal.hide("modal-units");
          })
          .catch((err) => console.log(err));
      } else {
        nplAPI
          .addRegions(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              switch (this.updateUnitsType.toUpperCase()) {
                case "CITY":
                  this.getCities();
                  break;
                case "DISTRICT":
                  this.getDistrictsWards("District", ParentID);
                  break;
                case "WARD":
                  this.getDistrictsWards("Ward", ParentID);
                  break;
                default:
                  break;
              }
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
            this.$bvModal.hide("modal-units");
          })
          .catch((err) => console.log(err));
      }
    },
    handleDelete(item) {
      switch (this.updateUnitsType) {
        case "magementCabinet":
          this.fireStationRemove(item);
          break;
        case "alarmCabinet":
        case "fireAlarms":
          this.nodeRemove(item);
        default:
          break;
      }
      // let body = {
      //   ID: item.ID,
      // };
      // nplAPI
      //   .deleteRegions(body)
      //   .then((val) => {
      //     if (val.status) {
      //       this.showNotify("success", this.$t("toast.message"), val.message);
      //       switch (this.updateUnitsType.toUpperCase()) {
      //         case "CITY":
      //           this.getCities();
      //           break;
      //         case "DISTRICT":
      //           this.getDistrictsWards("District", item.ParentID);
      //           break;
      //         case "WARD":
      //           this.getDistrictsWards("Ward", item.ParentID);
      //           break;
      //         default:
      //           break;
      //       }
      //     } else {
      //       this.showNotify("error", this.$t("toast.message"), val.message);
      //     }
      //   })
      //   .catch((err) => console.log(err));
    },
    hiddenModal() {
      this.dataForm = null;
    },
    handleAdd(bvModalEvent) {
      bvModalEvent.preventDefault();
      if (!this.dataFormAdd.StationID) {
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("form.no-blank")
        );
      }
      switch (this.updateUnitsType) {
        case "magementCabinet":
          this.fireStationExportProduct();
          break;
        case "alarmCabinet":
          this.fireNodesExport(2);
          break;
        case "fireAlarms":
          this.fireNodesExport(1);
          break;
        default:
          break;
      }
    },
    fireStationExportProduct() {
      let body = {
        StationID: this.dataFormAdd.StationID,
      };
      fireAPI
        .fireStationExportProduct(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataMagementCabinet();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.$bvModal.hide("modal-add-units");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fireStationRemove(item) {
      let body = {
        StationID: item.StationID.toString(),
      };
      fireAPI
        .fireStationRemove(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getDataMagementCabinet();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.$bvModal.hide("modal-add-units");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fireNodesExport(TypeID) {
      let body = {
        // StationID: this.dataFormAdd.StationID,
        ID: this.dataFormAdd.StationID,
        TypeID, //1 thiết bị báo cháy, 2 tủ cảnh báo tại chỗ
      };
      fireAPI
        .fireNodesExport(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            if (TypeID == 2) {
              this.getDataAlarmCabinet();
            } else if (TypeID == 1) {
              this.getDataFireAlarms();
            }
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.$bvModal.hide("modal-add-units");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    nodeRemove(item) {
      let body = {
        ID: item.ID,
      };
      fireAPI
        .nodeRemove(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            if (this.updateUnitsType === "alarmCabinet") {
              this.getDataAlarmCabinet();
            } else if (this.updateUnitsType === "fireAlarms") {
              this.getDataFireAlarms();
            }
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    hiddenModalAdd() {
      this.dataFormAdd.StationID = null;
    },
    showNotify(type, titleMessage, message) {
      this.$notify(type, titleMessage, message, {
        duration: 3000,
        permanent: false,
      });
    },
    converDate(string) {
      return moment(string).format("DD/MM/YYYY");
    },
  },
};
</script>

<style>
.title-dropdown button {
  font-size: 20px;
  padding: 0;
}
</style>
<style>
.npl-table-basic-form .table th {
  white-space: nowrap;
}
.b-form-btn-label-control.form-control > .form-control.form-control-sm {
  white-space: nowrap;
  overflow: hidden;
}
</style>
<style lang="scss">
.npl-categories {
  .card {
    height: 100%;
  }
  .card-body {
    height: 100%;
  }
  .box-content {
    overflow: auto;
  }
  .btn-warning.disabled {
    color: white;
  }
  .btn-outline-danger.disabled {
    &:hover {
      color: #dc3545;
    }
  }
  .btn-outline-secondary.disabled {
    color: #2a93d5;
    &:hover {
      color: #2a93d5;
      background-color: transparent;
    }
  }
  .btn-outline-info.disabled {
    &:hover {
      color: #17a2b8;
      background-color: transparent;
    }
  }
  .custom-select {
    height: 36px;
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }
  td {
    vertical-align: middle;
  }
}
</style>
<style lang="scss">
.npl-regions {
  .units-frame {
    // border: 1px solid #dee2e6;
    margin-top: 15px;
    height: 100%;
  }
  .units-header {
    display: flex;
    align-items: center;
    background-color: #f3f3f3;
    border: 1px solid #f3f3f3;
    border-bottom: 0;
    height: 32px;
  }
  .units-title {
    padding: 5px 10px;

    // color: #17a2b8;
    // color: black;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: bolder;
  }
  .btn-units {
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      opacity: 0.6;
    }
  }
  .units-content {
    height: calc(100% - 65px);
    overflow: auto;
    // border: 1px solid #dee2e6;
    border-top: 0;
    // padding: 5px 10px;
  }
  .units-item {
    display: flex;
    justify-content: space-between;
    // margin-bottom: 10px;
    padding: 5px 10px;

    i {
      font-size: 11px;
    }

    &:hover {
      background-color: #f3f3f3;
      color: black;
    }
    &.active {
      background-color: #f3f3f3;
      color: black;
      // background-color: #005aab;
      // color: white;
    }
  }
  .b-table-sticky-header {
    margin-bottom: 0;
  }
}
</style>
