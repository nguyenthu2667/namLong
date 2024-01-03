<template>
  <div>
    <form ref="form" @submit.stop.prevent="emitSubmit">
      <b-row>
        <b-col lg="3">
          <b-form-group :label="'Mã chương trình:'">
            <b-form-input
              :id="'ID-input'"
              value="AUTO"
              disabled
              class="text-center"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="9">
          <b-form-group :label="'Tên lịch điều khiển:'">
            <b-form-input
              :id="'Name-input'"
              v-model="form.OName"
              :disabled="disabled"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group :label="'Thông tin điều khiển:'">
            <b-form-select
              class="text-left"
              v-model="form.ActionID"
              :options="ActionID"
              size="sm"
              :id="'RelayID-input'"
              :disabled="disabled"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group :label="'Thời gian bắt đầu:'">
            <b-form-timepicker
              class="cus-form-group"
              v-model="timeNow"
              locale="vi"
              :disabled="disabled"
            ></b-form-timepicker>
          </b-form-group>
        </b-col>
        <b-col lg="6" v-if="form.ActionID === 5">
          <b-form-group :label="'Chế độ tùy chọn:'">
            <b-form-select
              class="text-left"
              v-model="form.CustomAction"
              :options="CustomAction"
              size="sm"
              :id="'RelayID-input'"
              :disabled="disabled"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col lg="6" v-if="form.ActionID !== 5">
          <b-form-group :label="'Mức sáng:'">
            <b-form-select
              class="text-left"
              v-model="form.LightID"
              :options="LightID"
              size="sm"
              :id="'RelayID-input'"
              :disabled="disabled"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <div>
            <h6 class="small-title-led">Thông tin lịch điều khiển</h6>
            <b-form-group class="mb-0">
              <div class="d-flex align-items-center">
                <label class="mb-0">Chế độ:</label>
                <b-form-radio-group
                  class="ml-2"
                  v-model="form.SelectID"
                  :options="optionsMode"
                  name="radio-inline"
                  :disabled="disabled"
                >
                </b-form-radio-group>
              </div>
            </b-form-group>
            <div v-if="form.SelectID == 2">
              <div class="d-flex frame-choose-all-week" @click="isSelectedAll">
                <b-form-checkbox
                  class="mr-2"
                  :checked="autoChecked"
                  :disabled="disabled"
                  ><span style="font-weight: 600"
                    >Tất cả các thứ trong tuần</span
                  >
                </b-form-checkbox>
              </div>
              <b-form-checkbox-group
                id="checkbox-group-light"
                v-model="selectedDay"
                :options="optionsDay"
                name="checkbox-group"
                class="choose-day"
                :disabled="disabled"
              ></b-form-checkbox-group>
            </div>
          </div>
        </b-col>
        <b-col lg="12">
          <b-form-group :label="'Ghi chú:'">
            <b-form-textarea
              :id="'Note-input'"
              class="text-left"
              v-model="form.Note"
              rows="3"
              max-rows="6"
              :disabled="disabled"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <div class="d-flex frame-choose-all-week" @click="isSelectTableAll">
            <b-form-checkbox
              :checked="autoCheckedTable"
              size="md"
              class="mb-2"
              :disabled="disabled"
            >
              <b>{{ $t("all").toUpperCase() }} (CHỌN VỊ TRÍ PHÁT)</b>
            </b-form-checkbox>
          </div>
          <b-table
            :sticky-header="true"
            :no-border-collapse="true"
            :bordered="true"
            :hover="true"
            :items="dataTable"
            :fields="fieldTable"
            selectable
            selectedVariant="primary"
            select-mode="multi"
            head-variant="light"
            class="mb-0"
            thead-class="text-center"
            sort-by="title"
            :current-page="isPagination ? currentPage : null"
            :per-page="isPagination ? perPage : null"
          >
            <template #head()="scope">
              <div class="text-nowrap">{{ scope.label }}</div>
            </template>
            <template v-slot:cell(Actions)="row">
              <b-form-checkbox
                v-if="isShow"
                v-model="row.item.IsSelected"
                @change="handleChangeIsSelect(row.item)"
                size="md"
                :disabled="disabled"
              ></b-form-checkbox>
            </template>
          </b-table>
          <template v-if="dataTable && dataTable.length > 0">
            <b-pagination
              v-show="isPagination"
              align="center"
              :total-rows="dataTable.length"
              :per-page="perPage"
              v-model="currentPage"
              size="sm"
            >
              <template v-slot:next-text>
                <i class="simple-icon-arrow-right" />
              </template>
              <template v-slot:prev-text>
                <i class="simple-icon-arrow-left" />
              </template>
              <template v-slot:first-text>
                <i class="simple-icon-control-start" />
              </template>
              <template v-slot:last-text>
                <i class="simple-icon-control-end" />
              </template>
            </b-pagination>
          </template>
        </b-col>
      </b-row>
    </form>
  </div>
</template>

<script>
import moment from "moment";
import handling from "@/constants/handling";
import Treeselect from "@riophae/vue-treeselect";
import "@/assets/vue-treeselect/vue-treeselect.css";
import CustomTable from "./CustomTables.vue";
import lightAPI from "@/api/modules/lightAPI";

export default {
  components: { Treeselect, "custom-table": CustomTable },
  props: [
    "nameForm",
    "titleForm",
    "dataForm",
    "dataFormOption",
    "stateForm",
    "apiForm",
    "idForm",
    "typeForm",
    "menuCurrent",
    "days",
    "t2",
    "t3",
    "t4",
    "t5",
    "t6",
    "t7",
    "cN",
    "_isDisabled",
    "clearDayChk",
    "showSelectID",
    "CustomAction",
    "LightID",
    "ActionID",
    "isPagination",
    "disabled",
  ],
  data() {
    return {
      dataTable: null,
      isShow: true,
      T2: this.t2,
      T3: this.t3,
      T4: this.t4,
      T5: this.t5,
      T6: this.t6,
      T7: this.t7,
      CN: this.cN,
      isDisabled: this._isDisabled,
      // CustomActionValue: 1,
      form: this.dataForm ?? {
        OName: "",
        SelectID: 1, //0: một lần |1:lặp lại
        T2: 0,
        T3: 0,
        T4: 0,
        T5: 0,
        T6: 0,
        T7: 0,
        CN: 0,
        Hour: moment(new Date()).format("HH"),
        Minute: moment(new Date()).format("mm"),
        Note: "",
        CabinetID: [], //arrID,
        LightID: 0,
        ActionID: 0,
        CustomAction: 1,
      },
      optionsMode: [
        { text: "Một lần", value: 1 },
        { text: "Lặp lại", value: 2 },
      ],
      optionsDay: [
        { text: "CN", value: 1 },
        { text: "T2", value: 2 },
        { text: "T3", value: 3 },
        { text: "T4", value: 4 },
        { text: "T5", value: 5 },
        { text: "T6", value: 6 },
        { text: "T7", value: 7 },
      ],
      selectedDay: [],
      timeNow: "",
      fieldTable: [
        {
          key: "Actions",
          label: "Chọn",
          tdClass: "text-center",
        },
        {
          key: "CabinetID",
          label: "Mã quản lý",
        },
        {
          key: "CabinetName",
          label: "Tên quản lý",
        },
        {
          key: "RegionName",
          label: "Khu vực/ nhóm",
        },
        {
          key: "CabinetAddress",
          label: "Địa chỉ lắp đặt",
        },
      ],
      filterOn: [],
      currentPage: 1,
      perPage: 10,
    };
  },
  computed: {
    autoChecked() {
      return this.selectedDay.length === this.optionsDay.length ? true : false;
    },
    autoCheckedTable() {
      return this.form?.CabinetID?.length === this.dataTable?.length
        ? true
        : false;
    },
  },
  watch: {
    "form.SelectID"(to, from) {
      if (to !== from && this.typeForm?.toUpperCase() !== "EDIT") {
        this.selectedDay = [];
      }
    },
    "form.ActionID"(to, from) {
      let customControl = 5; // thông tin lịch điều khiển
      if (to === customControl) {
        this.form.LightID = 0;
      }
    },
    timeNow(time) {
      this.form.Hour = moment(time, "HH:mm:ss").format("HH");
      this.form.Minute = moment(time, "HH:mm:ss").format("mm");
    },
    selectedDay(days) {
      this.form.CN = 0;
      this.form.T2 = 0;
      this.form.T3 = 0;
      this.form.T4 = 0;
      this.form.T5 = 0;
      this.form.T6 = 0;
      this.form.T7 = 0;
      days.forEach((value) => {
        if (value == 1) {
          this.form.CN = 1;
        }
        if (value == 2) {
          this.form.T2 = 1;
        }
        if (value == 3) {
          this.form.T3 = 1;
        }
        if (value == 4) {
          this.form.T4 = 1;
        }
        if (value == 5) {
          this.form.T5 = 1;
        }
        if (value == 6) {
          this.form.T6 = 1;
        }
        if (value == 7) {
          this.form.T7 = 1;
        }
      });
    },
  },
  async created() {
    await this.getDataTable();
    await this.handleDefaultDay();
    this.timeNow = `${this.form.Hour}:${this.form.Minute}`;
  },
  methods: {
    isSelectTableAll(bol) {
      if (!this.disabled) {
        if (this.form.CabinetID.length !== this.dataTable.length) {
          this.dataTable = this.dataTable.map((item) => {
            this.add(item);
            return {
              ...item,
              IsSelected: true,
            };
          });
        } else {
          this.form.CabinetID.length = 0;
          this.dataTable = this.dataTable.map((item) => {
            return {
              ...item,
              IsSelected: false,
            };
          });
        }
      }
    },
    isSelectedAll() {
      if (!this.disabled) {
        if (this.selectedDay.length !== this.optionsDay.length) {
          this.selectedDay = this.optionsDay.map((d) => d.value);
        } else {
          this.selectedDay = [];
        }
      }
    },
    handleDefaultDay() {
      if (this.form.CN == 1) {
        this.selectedDay.push(1);
      }
      if (this.form.T2 == 1) {
        this.selectedDay.push(2);
      }
      if (this.form.T3 == 1) {
        this.selectedDay.push(3);
      }
      if (this.form.T4 == 1) {
        this.selectedDay.push(4);
      }
      if (this.form.T5 == 1) {
        this.selectedDay.push(5);
      }
      if (this.form.T6 == 1) {
        this.selectedDay.push(6);
      }
      if (this.form.T7 == 1) {
        this.selectedDay.push(7);
      }
    },
    emitSubmit(keyStringDetele) {
      if (keyStringDetele?.toUpperCase() === "DELETE") {
        this.$emit("submit", this.form, "DELETE", this.id);
      } else {
        this.$emit("submit", this.form, this.typeForm, this.id);
      }
    },
    getDataTable() {
      lightAPI
        .lightCabinetList()
        .then((val) => {
          this.dataTable = val.status && val.data.length > 0 ? val.data : [];
          this.dataTable.forEach((e) => (e.IsSelected = false));
          if (this.autoCheckedTable) {
            this.form.CabinetID = [];
            this.dataTable.forEach((e) => {
              e.IsSelected = true;
              this.form.CabinetID.push(e.CabinetID);
            });
          } else {
            this.form.CabinetID.forEach((id) => {
              this.dataTable.forEach((e) => {
                if (e.CabinetID == id) {
                  e.IsSelected = true;
                }
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHours(string) {
      let time = moment(string, "HH:mm:ss");
      return time.format("HH");
    },
    getMinute(string) {
      let time = moment(string, "HH:mm:ss");
      return time.format("mm");
    },
    convertDate(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("DD/MM/YYYY");
    },
    resetModal() {
      for (let i = 0; i < Object.keys(this.dataForm).length; i++) {
        this.dataForm[Object.keys(this.dataForm)[i]][1] = null;
        this.stateForm[Object.keys(this.dataForm)[i]] = null;
      }
      this.typeDay = null;
      this.T2 = null;
      this.T3 = null;
      this.T4 = null;
      this.T5 = null;
      this.T6 = null;
      this.T7 = null;
      this.CN = null;
    },
    checkFormValidityModal() {
      let valid = this.$refs.form.checkValidity();
      let pattern = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      for (let i = 0; i < Object.keys(this.dataForm).length; i++) {
        let key = Object.keys(this.dataForm)[i];
        if (
          key.toUpperCase().search("NOTE") === -1 &&
          key.toUpperCase().search("DESCRIPTION") === -1
        ) {
          if (
            this.dataForm[key][2].toUpperCase() !== "SELECT" &&
            this.dataForm[key][2].toUpperCase() !== "SELECT-TREE" &&
            this.dataForm[key][2].toUpperCase() !== "DATE" &&
            this.dataForm[key][2].toUpperCase() !== "BIT" &&
            this.dataForm[key][2].toUpperCase() !== "KEY" &&
            this.dataForm[key][2].toUpperCase() !== "IMAGE" &&
            this.dataForm[key][2].toUpperCase() !== "AVATAR"
          ) {
            if (this.dataForm[key][2].toUpperCase() === "PHONE") {
              if (
                !pattern.test(this.dataForm[key][1]) ||
                this.dataForm[key][1].length !== 10
              ) {
                valid = false;
                this.stateForm[key] = false;
              } else {
                this.stateForm[key] = true;
              }
            } else {
              this.stateForm[key] = document
                .getElementById(key + "-input")
                .checkValidity();
            }
          }
        }
      }
      return valid;
    },
    convertBody(body) {
      if (body.hasOwnProperty("CabinetStatus")) {
        body.CabinetStatus = handling.convertBooleanToBit(body.CabinetStatus);
      }
      body.CustomAction = this.CustomActionValue;
      return body;
    },
    convertBitToBoolean: (value) => !!value,
    handleChangeIsSelect(item) {
      if (item.IsSelected == true) {
        this.add(item);
      } else {
        this.remove(item);
      }
    },
    add(item) {
      let id = item.CabinetID;
      this.form.CabinetID.push(id);
      this.form.CabinetID = [...new Set(this.form.CabinetID)];
    },
    remove(item) {
      const index = this.form.CabinetID.findIndex((id) => id == item.CabinetID);
      this.form.CabinetID.splice(index, 1);
      this.form.CabinetID = [...new Set(this.form.CabinetID)];
    },
  },
};
</script>
<style>
.cus-form-group {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}
.cus-form-group button {
  background: #c8ced3;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}
.cus-form-group label {
  text-align: center;
}

#checkbox-group-light .custom-control-inline {
  margin-right: 0.5rem !important;
}
</style>
<style scoped>
.small-title-led {
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}

.frame-choose-all-week {
  position: relative;
  cursor: pointer;
}

.frame-choose-all-week::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
