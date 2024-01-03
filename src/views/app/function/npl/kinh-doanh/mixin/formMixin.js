import moment from "moment";
import { en, vi } from "vuejs-datepicker/dist/locale";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
// import handling from "@/constants/handling.js";
import systemAPI from "@/api/modules/systemAPI";
import nplAPI from "@/api/modules/nplAPI";
import { mapGetters } from "vuex";

import ChildTable from '@/views/app/function/npl/kinh-doanh/component/ChildTable'

export default {
  props: [
    "dataForm",
    "currentMode",
    "isTakeDataForm",
    "dataChildTable",
    "formatCurrency",
    "formatDecimal",
  ],
  components: {
    "v-select": vSelect,
    ChildTable,
  },
  data() {
    return {
      locale: this.$t('language') == "vn" ? vi : en,
      datePickerFormat: "dd/MM/yyyy",
      dataFormOptions: {},
      modifyDataForm: null,
      isCheckIsValid: false,
      notRequired: ["ID", "OID", "Note", "NameExtention1", "AddressExtention1"],

      //child table
      formModalAdd: null,
      isCheckIsValidChildTable: false,
      tableName: '',
    }
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  created() {
    this.locale = this.$i18n.locale === 'vn' ? vi : en
  },
  watch: {
    "$i18n.locale"() {
      this.locale = this.$i18n.locale === 'vn' ? vi : en
    },
  },
  methods: {
    resetStateInput(field, form) {
      //reset lại state khi có input để nó mất cái dòng cảnh báo đi
      if (this[form][field][3] === false) {
        this[form][field][3] = true;
      }
    },
    getSelect(type, nameKey, option) {
      let body = {
        CategoryType: type,
      };
      nplAPI
        .getCategoryActive(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          let newArr = [];
          if (data.length > 0) {
            data.forEach((item) => {
              if (type == 'GoodsTypes') {
                newArr.push({
                  label: item[nameKey],
                  value: Number(item.ID),
                })
              }
              else if (type == 'MaintenanceJobs') {
                newArr.push({
                  label: item[nameKey],
                  value: Number(item.ID),
                  supplies: item.MaintenanceSuppliesName,
                  supplyAmount: item.MaintenanceSupplyAmount
                })
              }
              else if(type == 'ChargingStations') {
                newArr.push({
                  label: item[nameKey],
                  value: item.ID,
                  dailyFare: item.DailyFare,
                })
              }
              else {
                newArr.push({
                  label: item[nameKey],
                  value: item.ID,
                })
              }
            });
          }
          // this.dataFormOptions[option] = newArr //--> cái này có khi nó sẽ ko cập nhật lại
          this.dataFormOptions = {
            ...this.dataFormOptions,
            [option]: newArr,
          };
        })
        .catch((err) => console.log(err));
    },
    customDataFormToShow(obj) {
      if (!obj) return null
      const newObj = JSON.parse(JSON.stringify(obj))
      for (let key in newObj) {
        const value = newObj[key][1];
        const type = newObj[key][2];
        if (key === "Odate" && !value) {
          //mặc định ngày áp dụng nếu ko có là ngày hôm nay
          newObj[key][1] = moment().format("YYYY-MM-DD");
        } else if (key === "VehicleTypeID" && value) {
          newObj[key][1] = newObj[key][1].toString();
        } else if (key === "VehicleGroupID" && value) {
          newObj[key][1] = newObj[key][1].toString().split(",");
        } else if (
          type.toUpperCase() === "MONEY" ||
          type.toUpperCase() === "CURRENCY"
        ) {
          newObj[key][1] = this.convertCurrency(value);
        }
      }
      return newObj
    },
    customDataFormToServer(obj) {
      //vadidate và thay đổi data được truyền tới server
      if (!obj) return null
      console.log(obj);
      this.isCheckIsValid = true;
      if (!this.checkFormValidate()) {
        console.log('dddd');
        this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("toast.content")
        )
        return null
      }
      console.log(obj);
      let newObj = {};
      for (const key in obj) {
        const value = obj[key][1];
        const type = obj[key][2];
        if (key === "VehicleGroupID") {
          newObj = {
            ...newObj,
            [key]: value ? value.join(",") : ''
          }
        } else if (
          type.toUpperCase() === "MONEY" ||
          type.toUpperCase() === "CURRENCY") {
          newObj = {
            ...newObj,
            [key]: this.revertCurrency(value)
          }
        } else {
          newObj = {
            ...newObj,
            [key]: value,
          };
        }
      }
      return newObj
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
      const value = this.modifyDataForm[key][1];
      if (Array.isArray(value)) {
        if (value.length > 0) {
          return true
        }
        else {
          return false
        }
      }
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
      for (const key in this.modifyDataForm) {
        // console.log(key);
        let result = this.checkIsValid(key);
        this.modifyDataForm[key][3] = result;
        // console.log(result);
        if (!result) {
          console.log("invaildKey:", key);
          // break;
        }
      }
      this.modifyDataForm = { ...this.modifyDataForm }; //--> gán lại để render lại modifyDataForm
      for (const key in this.modifyDataForm) {
        if (!this.modifyDataForm[key][3]) {
          return false;
        }
      }
      return true;
      // return result;
    },
    //liên quan đến child table
    addChildTable(name) {
      if (this.currentMode === 'adding' || this.currentMode === 'editing') {
        const obj = this.getFieldsModal(name)
        this.formModalAdd = obj
        this.tableName = name
        this.$bvModal.show("modal-child-table");
      }
    },
    editChildTable(data) {
      if (this.currentMode === 'adding' || this.currentMode === 'editing') {
        // if (data.tableName == 'MaintenanceAllowancesWorks') {
        //   this.selectedPeriod = data.item
        //   // console.log(this.selectedPeriod);
        // }
        const obj = this.getFieldsModal(data.tableName, data.item)
        this.formModalAdd = obj
        this.tableName = data.tableName
        this.$bvModal.show("modal-child-table");
      }
    },
    handleModalChildTable(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (!this.formModalAdd) return;
      this.isCheckIsValidChildTable = true;
      if (!this.checkFormValidateChildTable()) {
        this.$emit("getDataForm", null);
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("toast.content")
        );
      }
      let obj = {};
      for (const key in this.formModalAdd) {
        const value = this.formModalAdd[key][1]
        const type = this.formModalAdd[key][2]
        if (type.toUpperCase() == 'CURRENCY' ||
          type.toUpperCase() == 'MONEY') {
          obj[key] = this.revertCurrency(value)
        }
        else if (type.toUpperCase() == 'SELECT') {
          const relativeKey = this.formModalAdd[key][4]
          const label = this.dataFormOptions[key].find(item => item.value == value)?.label
          obj[key] = value
          obj[relativeKey] = label
        }
        else if (type.toUpperCase() == 'RELATIVEKEY') {
          //trường dùng để show ra khi lựa chọn theo key select liên quan
        }
        else {
          obj[key] = value
        }
      }

      if (obj.ID) {
        const arr = this.childTable[this.tableName].items
        const index = arr.findIndex(item => item.ID == obj.ID)
        arr[index] = obj
        this.childTable[this.tableName].items = [...arr]
      }
      else {
        obj.ID = this.randomString(10)
        this.childTable[this.tableName].items.push(obj)
        //trường hợp table chỉ mới có obj mới vừa add, cái objectKeys đang bằng []
        if (this.childTable[this.tableName].objectKeys.length == 0) {
          this.childTable[this.tableName].objectKeys = Object.keys(this.childTable[this.tableName].items[0])
        }
      }

      this.$nextTick(() => {
        this.$bvModal.hide('modal-child-table')
      })
    },
    removeChildTable(obj) {
      const arr = [...this.childTable[obj.tableName].items]
      const newArr = arr.filter(item => item.ID !== obj.item.ID)
      this.childTable[obj.tableName].items = newArr
    },
    hiddenModalChildTable() {
      this.formModalAdd = null
      this.isCheckIsValidChildTable = false
      this.tableName = ''
    },
    checkIsValidChildTable(key) {
      //có bắt đầu kiểm có giá trị
      // let isValid = true
      if (!this.isCheckIsValidChildTable) {
        // isValid = true
        return true;
      }
      // const notRequired = ["ID", "Note"];
      if (this.notRequiredChildTable.includes(key)) {
        // isValid = true
        return true;
      }
      const value = this.formModalAdd[key][1];
      if (Array.isArray(value)) {
        if (value.length > 0) {
          return true
        }
        else {
          return false
        }
      }
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
    checkFormValidateChildTable() {
      // let result = true;
      for (const key in this.formModalAdd) {
        // console.log(key);
        let result = this.checkIsValidChildTable(key);
        this.formModalAdd[key][3] = result;
        // console.log(result);
        if (!result) {
          console.log("invaildKey:", key);
          // break;
        }
      }
      this.formModalAdd = { ...this.formModalAdd }; //--> gán lại để render lại formModalAdd
      for (const key in this.formModalAdd) {
        if (!this.formModalAdd[key][3]) {
          return false;
        }
      }
      return true;
      // return result;
    },
    showNotify(type, titleMessage, message) {
      this.$notify(type, titleMessage, message, {
        duration: 3000,
        permanent: false,
      });
    },
    convertDate(string) {
      return moment(string).format('DD/MM/YYYY')
    },
    formatDateToServer(value, field, form) {
      console.log(moment(value).format("YYYY-MM-DD"));
      this[form][field][1] = moment(value).format("YYYY-MM-DD");
    },
    //liên quan đến convert tiền tệ
    convertCurrency(value) {
      if (!value) {
        return 0
      }
      if (this.formatCurrency.toUpperCase() == 'VN') {
        return Number(value).toLocaleString('vi-VN')
      }
      else if (this.formatCurrency.toUpperCase() == 'EN') {
        return Number(value).toLocaleString('en-US')
      }
    },
    revertCurrency(val) {
      let value = val.toString()
      if (!value) {
        return 0
      }
      let newNumb
      if (this.formatCurrency.toUpperCase() == 'VN') {
        newNumb = value.replace(/\./g, '')
        newNumb = newNumb.replace(/,/g, '.')
      }
      else if (this.formatCurrency.toUpperCase() == 'EN') {
        newNumb = value.replace(/,/g, '')
      }
      return newNumb
    },
    currencyFormatInput(value, field, form) {
      if (this[form][field][3] === false) {
        this[form][field][3] = true;
      }

      if (!value) {
        this[form][field][1] = 0
        return 0
      }

      const rgx = /^[0-9\.,]*$/; //dãy số chứa dấu chấm, dấu phẩy
      if (!rgx.test(value)) {
        //thay thế các chỗ không phải là dãy số chứa dấu phẩm dấu chấm thành rỗng
        const newNumb = value.toString().replace(/[^0-9\.,]/g, '')
        this[form][field][1] = newNumb
        return newNumb
      }
      let newNumb = this.revertCurrency(value)
      newNumb = Number(newNumb).toFixed(this.formatDecimal)
      newNumb = this.convertCurrency(newNumb)

      //kiểm tra có dấu chấm hoặc dấu phẩy cuối cùng ko
      const lastSeparator = value.toString()[value.toString().length - 1]
      if (lastSeparator === '.' || lastSeparator === ',') {
        newNumb = newNumb + lastSeparator
      }
      this[form][field][1] = newNumb
      return newNumb
    },
    ////////////////
    randomString(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    getColTypesChildTable(string, tableName) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          // this.colTypes = val.status ? val.data : null;
          this.childTable[tableName].colTypes = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDynamicFormAddChildTable(string, tableName) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          const arr = val.status ? val.data : [];
          if (tableName == 'OilAllowancesRoutes') {
            console.log(arr);
          }
          this.childTable[tableName].columnAdd = arr.filter((item) => item.IsHide == 0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    mergeKeyDynamic(arrKey, arrType) {
      if (!arrKey || !arrType) return;
      let result = [];
      arrKey.map((key) => {
        if(key.toUpperCase() !== 'NOTE') {
          let obj = {
            key: key,
            // sortable: true,
          };
          let objType = arrType.find(
            (e) => e["ClName"].toUpperCase() == key.toUpperCase()
          );
          if (objType && objType["IsHide"] == 0) {
            obj.label = objType["ShwName"];
            obj.sortNum = objType["SortNum"];
            obj.type = objType["TypeCol"];
            switch (objType["TypeCol"].toUpperCase()) {
              case "NUMBER":
                obj.tdClass = "text-right";
                break;
              case "STRINGCENTER":
                obj.tdClass = "text-center";
                break;
            }
            result.push(obj);
          }
          else if (objType && objType["IsHide"] == 1) {
          }
          // else {
          //   if (key.toUpperCase() !== 'OID' && key.toUpperCase() !== 'ID') {
          //     obj.label = 'cl.' + key;
          //     obj.sortNum = 9999;
          //     obj.type = 'STRING';
          //     obj.tdClass = "text-left";
          //     obj.sortable = false;
          //     result.push(obj);
          //   }
          // }
        }
      });
      return result;
    },
    mergeKeyValue(columnAdd, obj) {
      const result = {}
      columnAdd.forEach(item => {
        let value = ''
        if (obj) {
          if (obj[item.ClName] || obj[item.ClName] == 0 || obj[item.ClName] == false) {
            value = obj[item.ClName]
          }
        }
        // const value = obj && obj[item.ClName] ? obj[item.ClName] : ''
        // const value = itemFromTable[item.key]
        const type = item.TypeCol
        // console.log(item);
        if (type.toUpperCase() == 'CURRENCY' ||
          type.toUpperCase() == 'MONEY') {
          result[item.ClName] = [item.ShwName, this.convertCurrency(value), type, null]
        }
        // else if (type.toUpperCase() == 'SELECT') {
        //   result[item.key] = [item.label, value, type, null, item.relativeKey]
        // }
        // else if (type.toUpperCase() == 'RELATIVEKEY') {
        //   //trường dùng để show ra khi lựa chọn theo key select liên quan
        // }
        else {
          // result[item.key] = [item.label, value, type, null]
          result[item.ClName] = [item.ShwName, value, type, null]
        }

        if (obj) {
          result.ID = ['ID', obj.ID, 'ID', null]
        }
      })
      return result
    },
    getFieldsModal(name, obj) {
      let result = this.mergeKeyValue(this.childTable[name].columnAdd, obj)
      switch (name) {
        case 'CoatTarpAllowanceDetails':
          result.GoodsTypeID[2] = "Select"
          result.GoodsTypeID[4] = "GoodsTypeName"
          return result
        case 'PieceTireAllowancesDetails':
          return result
        case 'OutSideVehiclesAllowancesDetails':
          result.RegionID[2] = "Select"
          result.RegionID[4] = "RegionName"
          return result

        case 'MaintenanceAllowancesPeriods':
          result.STT[2] = "Select"
          result.STT[4] = "STTName"
          return result
        case 'MaintenanceAllowancesWorks':
          result.STT[2] = "Select"
          result.STT[4] = "STTName"
          result.MaintenanceJobsID[2] = "Select"
          result.MaintenanceJobsID[4] = "MaintenanceJobsName"
          const valueMaintenanceSuppliesName = obj?.MaintenanceSuppliesName || ''
          result.MaintenanceSuppliesName = [this.$t('npl.supplies'), valueMaintenanceSuppliesName, 'String', null]
          return result
        case 'NotOverloadNotContGoodTypes':
        case 'NotOverloadContGoodTypes':
        case 'OverloadNotContGoodTypes':
        case 'OverloadContGoodTypes':
          result.GoodsTypeID[2] = "Select"
          result.GoodsTypeID[4] = "GoodsTypeName"
          return result
        case 'OilAllowancesRoutes':
          result.RouteID[2] = "Select"
          result.RouteID[4] = "RoutesName"
          return result
        case 'OilAllowancesVehicles':
          result.VehicleID[2] = "Select"
          result.VehicleID[4] = "VehicleTypeName"
          return result
        case 'RouteAllowancesDetails':
          result.ChargingStationID[2] = 'Select'
          result.ChargingStationID[4] = 'ChargingStationsName'
          return result
        default:
          return [];
      }
    },
    getFieldsChildTable(name) {
      //để khi thay đổi đa ngôn ngữ nó load lại
      let result = this.mergeKeyDynamic(this.childTable[name].objectKeys, this.childTable[name].colTypes)
      switch (name) {
        case 'CoatTarpAllowanceDetails':
          result.forEach(item => {
            if (item.key.toUpperCase() === 'GOODSTYPEID') {
              item.type = "Select"
              item.relativeKey = "GoodsTypeName"
            }
          })
          break
        case 'OutSideVehiclesAllowancesDetails':
          result.forEach(item => {
            if (item.key.toUpperCase() === 'REGIONID') {
              item.type = "Select"
              item.relativeKey = "RegionName"
            }
          })
          break
        case 'PieceTireAllowancesDetails':
          break
        case 'MaintenanceAllowancesPeriods':
          result.forEach(item => {
            if (item.key.toUpperCase() === 'STT') {
              item.type = "Select"
              item.relativeKey = "STTName"
            }
          })
          break
        case 'MaintenanceAllowancesWorks':
          result.forEach(item => {
            if (item.key.toUpperCase() === 'STT') {
              item.type = "Select"
              item.relativeKey = "STTName"
            }
            else if (item.key.toUpperCase() === 'MAINTENANCEJOBSID') {
              item.type = "Select"
              item.relativeKey = "MaintenanceJobsName"
            }
          })
          break
        case 'NotOverloadNotContGoodTypes':
        case 'NotOverloadContGoodTypes':
        case 'OverloadNotContGoodTypes':
        case 'OverloadContGoodTypes':
          result.forEach(item => {
            if (item.key.toUpperCase() === 'GOODSTYPEID') {
              item.type = "Select"
              item.relativeKey = "GoodsTypeName"
              // item.thClass = "d-none"
              // item.tdClass = "d-none"
            }
          })
          break
        case 'OilAllowancesRoutes':
          result.forEach(item => {
            if (item.key.toUpperCase() === 'ROUTEID') {
              item.type = "Select"
              item.relativeKey = "RoutesName"
              // item.thClass = "d-none"
              // item.tdClass = "d-none"
            }
          })
          break
        case 'OilAllowancesVehicles':
          result.forEach(item => {
            if (item.key.toUpperCase() === 'VEHICLEID') {
              item.type = "Select"
              item.relativeKey = "LicensePlates"
              // item.thClass = "d-none"
              // item.tdClass = "d-none"
            }
          })
          break
        case 'RouteAllowancesDetails':
          result.forEach(item => {
            if (item.key.toUpperCase() === 'CHARGINGSTATIONID') {
              item.type = "Select"
              item.relativeKey = "ChargingStationsName"
              // item.thClass = "d-none"
              // item.tdClass = "d-none"
            }
          })
          break
        default:
          return [];
      }
      return [
        ...result,
        {
          key: "Action",
          label: this.$t("npl.action"),
          type: "Action",
          thClass: "text-center",
          tdClass: "text-center",
        },
      ];
    }
  },
}