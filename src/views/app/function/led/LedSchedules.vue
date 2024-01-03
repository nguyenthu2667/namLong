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
                &emsp; {{ $t("pages.add") }}
              </b-dropdown-item>
              <!-- <b-dropdown-item
                @click="editModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-edit"></i>
                &emsp;{{ $t('pages.edit') }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-edit"></i>
                &emsp;{{ $t('pages.edit') }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="deleteModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-trash-alt"></i>
                &emsp; {{ $t('dropdown.delete') }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-trash-alt"></i>
                &emsp; {{ $t('dropdown.delete') }}
              </b-dropdown-item> -->
              <!-- <b-dropdown-item
                @click="deleteModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t('dropdown.delete') }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t('dropdown.delete') }}
              </b-dropdown-item> -->
              <b-dropdown-item
                @click="printExternalExcel('dynamic-table')"
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
          <dynamic-table
            ref="tableForm"
            id="dynamic-table"
            :data-table="items"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            @selected="rowSelected"
            @status-edit="statusEdit"
            @dbclick="dbclick"
          ></dynamic-table>
        </b-card>
      </b-colxx>
    </b-row>
    <b-modal
      id="form-led-schedule"
      :title="createOrEdit == 'edit' ? 'Chỉnh sửa' : 'Thêm'"
      size="lg"
      scrollable
      hide-footer
      hide-header
      @hidden="hiddenModal"
    >
      <form-led-schedule
        :createOrEdit="createOrEdit"
        :dataByID="dataByID"
        :ledStationsList="ledStationsList"
        :fieldsStationSelect="fieldsStationSelect"
        :showLoadingSubmit="showLoadingSubmit"
        @cancelForm="cancelForm"
        @submitData="submitData"
        @deleteData="deleteData"
      />
    </b-modal>
  </div>
</template>
<script>
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
// import { getMenus} from '@/api/modules/systemAPI'
import systemAPI from "@/api/modules/systemAPI";
import ledAPI from "@/api/modules/ledAPI";
import FormLedSchedule from "./components/FormLedSchedule";
import DynamicTable from "./components/LedSchedulesDynamicTable";
// import DynamicTable from '@/components/Table/DynamicTable'

export default {
  components: {
    "dynamic-table": DynamicTable,
    "form-led-schedule": FormLedSchedule,
  },
  data() {
    return {
      timer,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: [],
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
      nameDevice: "",
      nameState: null,
      dataTypeDefault: null,
      createOrEdit: "",

      ledStationsList: [],
      objectKeyStationSelect: [],
      listColumnShowStationSelect: [],
      showLoadingSubmit: false,
    };
  },
  methods: {
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
      this.createOrEdit = "create";

      setTimeout(() => {
        this.$bvModal.show("form-led-schedule");
      }, timer);
    },
    async deleteData(id) {
      this.$bvModal.hide("form-led-schedule");

      let body = {
        OID: id.toString(),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      ledAPI
        .scheduleDelete(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("ScheduleSlideShows");
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
        OID: data.OID.toString(),
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      ledAPI
        .scheduleChangeStatus(body)
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
    getDataByID(id) {
      let body = {
        OID: id.toString(),
      };
      ledAPI
        .scheduleByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      ledAPI
        .scheduleList()
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
      ledAPI
        .scheduleList()
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
    getDataStationSelect() {
      ledAPI
        .stationSelect()
        .then((val) => {
          this.ledStationsList = val.status ? val.data : [];
          this.objectKeyStationSelect =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumnStationSelect(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShowStationSelect = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitData(obj) {
      this.showLoadingSubmit = true;
      // this.$bvModal.hide('form-led-schedule')

      let formData = new FormData();
      for (const key in obj) {
        formData.append(key, obj[key]);
      }
      if (obj.OID) {
        ledAPI
          .scheduleEdit(formData)
          .then((val) => {
            if (val.status) {
              this.makeToast("success", this.$t("toast.success"), val.message);
              this.getData();
            } else {
              this.makeToast("danger", this.$t("toast.fail"), val.message);
            }
            this.showLoadingSubmit = false;
            this.$bvModal.hide("form-led-schedule");
          })
          .catch((err) => {
            console.log(err);
            this.showLoadingSubmit = false;
            this.$bvModal.hide("form-led-schedule");
          });
      } else {
        ledAPI
          .scheduleAdd(formData)
          .then((val) => {
            if (val.status) {
              this.makeToast("success", this.$t("toast.success"), val.message);
              this.getData();
            } else {
              this.makeToast("danger", this.$t("toast.fail"), val.message);
            }
            this.showLoadingSubmit = false;
            this.$bvModal.hide("form-led-schedule");
          })
          .catch((err) => {
            console.log(err);
            this.showLoadingSubmit = false;
            this.$bvModal.hide("form-led-schedule");
          });
      }
    },
    cancelForm() {
      this.$bvModal.hide("form-led-schedule");
    },
    hiddenModal() {
      this.dataByID = null;
    },
    dbclick(row) {
      this.createOrEdit = "edit";
      this.getDataByID(row.OID);
      setTimeout(() => {
        this.$bvModal.show("form-led-schedule");
      }, this.timer);
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("ScheduleSlideShows");
    await this.getKeyTable();
    await this.getData();

    await this.getDataStationSelect();
    await this.getColumnStationSelect("LedStations");
  },
  watch: {
    items() {
      this.getColumn("ScheduleSlideShows");
      this.getKeyTable();
    },
  },
  computed: {
    fields: function () {
      return handling.mergeKeyDynamic(this.objectKey, this.listColumnShow);
    },
    fieldsStationSelect: function () {
      return handling.mergeKeyDynamic(
        this.objectKeyStationSelect,
        this.listColumnShowStationSelect
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
