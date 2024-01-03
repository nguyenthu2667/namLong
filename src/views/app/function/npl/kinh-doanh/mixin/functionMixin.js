import moment from "moment";
import { en, vi } from "vuejs-datepicker/dist/locale";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import handling from "@/constants/handling.js";
import systemAPI from "@/api/modules/systemAPI";
import nplAPI from "@/api/modules/nplAPI";
import { mapGetters } from "vuex";

// import ActionsHeaderNPL from "@/containers/npl/ActionsHeaderNPL";
// import ActionsFooterNPL from "@/containers/npl/ActionsFooterNPL";
import CustomTable from "@/views/app/function/npl/kinh-doanh/component/CustomTable";
import ActionsHeaderNPL from "@/views/app/function/npl/kinh-doanh/component/ActionsHeaderNPL";
import ActionsFooterNPL from "@/views/app/function/npl/kinh-doanh/component/ActionsFooterNPL";
import Status from "@/components/Badges/StatusColor.vue";
import Title from "@/views/app/function/npl/kinh-doanh/component/Title.vue";
import TableHistory from "@/views/app/category/npl/component/TableHistory.vue";
import TableListFile from "@/views/app/category/npl/component/TableListFile.vue";

import ModalAttachFile from "@/views/app/category/npl/component/ModalAttachFile";
import ModalPrint from "@/views/app/category/npl/component/ModalPrint";
import ModalFind from "@/views/app/category/npl/component/ModalFind";
import ModalImportExcel from "@/views/app/category/npl/component/ModalImportExcel";
import ModalNotifyImportExcel from "@/views/app/category/npl/component/ModalNotifyImportExcel";

import FormTarpaulin from "@/views/app/function/npl/kinh-doanh/component/FormTarpaulin.vue";
import FormCrane from "@/views/app/function/npl/kinh-doanh/component/FormCrane.vue";
import FormContPair from "@/views/app/function/npl/kinh-doanh/component/FormContPair.vue";
import FormAssistantDriver from "@/views/app/function/npl/kinh-doanh/component/FormAssistantDriver.vue";
import FormMeal from "@/views/app/function/npl/kinh-doanh/component/FormMeal.vue";
import FormTire from "@/views/app/function/npl/kinh-doanh/component/FormTire.vue";
import FormTripPair from "@/views/app/function/npl/kinh-doanh/component/FormTripPair.vue";
import FormVehicleOutside from "@/views/app/function/npl/kinh-doanh/component/FormVehicleOutside.vue";
import FormMaintenance from "@/views/app/function/npl/kinh-doanh/component/FormMaintenance.vue";
import FormOil from "@/views/app/function/npl/kinh-doanh/component/FormOil.vue";
import FormRouteCost from "@/views/app/function/npl/kinh-doanh/component/FormRouteCost.vue";

export default {
  components: {
    "v-select": vSelect,
    CustomTable,
    Status,
    ActionsHeaderNPL,
    ActionsFooterNPL,
    "table-history": TableHistory,
    "table-list-file": TableListFile,
    Title,
    ModalAttachFile,
    ModalPrint,
    ModalFind,
    ModalImportExcel,
    ModalNotifyImportExcel,

    FormTarpaulin,
    FormCrane,
    FormContPair,
    FormAssistantDriver,
    FormMeal,
    FormTire,
    FormTripPair,
    FormVehicleOutside,
    FormMaintenance,
    FormOil,
    FormRouteCost
  },
  data() {
    return {
      locale: localStorage.getItem("currentLanguage") == "vn" ? vi : en,
      datePickerFormat: "dd/MM/yyyy",
      currentTab: 0,
      currentPage: 1,
      perPage: 10,

      /////
      heightContent: "",
      heightContent2: "",
      menuRight: [],
      colTypes: [],
      dataTable: [],
      objectKeys: [],
      columnAdd: [],
      currentIndex: -1,
      dataForm: null,
      isCheckIsValid: false,
      isDisabledAdd: false,
      isDisabledEdit: false,
      isDisabledDelete: false,
      isDisabledSave: true,
      isDisabledCancel: true,
      isDisabledLock: false,
      isDisabledCopy: false,
      isDisabledAttachFile: false,
      isDisabledPrint: false,
      isDisabledImportExcel: false,
      isDisabledSearch: false,
      currentMode: "readOnly", //readOnly, adding, editing

      showModalAttachFile: false,
      showModalPrint: false,
      showModalImportExcel: false,
      showModalFind: false,

      dataPrint: [],
      dataHistory: [],
      fieldsHistoryVN: [
        { key: "CreateDate", label: "Thời gian" },
        { key: "UserFullName", label: "Người thực hiện" },
        { key: "ActionTypeName", label: "Thao tác" },
        { key: "Note", label: "Ghi chú" },
      ],
      fieldsHistoryEN: [
        { key: "CreateDate", label: "Time" },
        { key: "UserFullName", label: "Performer" },
        { key: "ActionTypeName", label: "Action" },
        { key: "Note", label: "Note" },
      ],
      fieldsHistory: [],
      dataAttachFile: [],
      fieldsAttachFileVN: [
        { key: "CreateDate", label: "Thời gian" },
        { key: "UserFullName", label: "Người thực hiện" },
        { key: "Name", label: "Tiêu đề" },
        { key: "FileName", label: "", thClass: "d-none", tdClass: "d-none" },
        { key: "LinkFile", label: "File đính kèm" },
        { key: "Note", label: "Ghi chú" },
        { key: "Action", label: "Thao tác" },
      ],
      fieldsAttachFileEN: [
        { key: "CreateDate", label: "Time" },
        { key: "UserFullName", label: "Performer" },
        { key: "Name", label: "Title" },
        { key: "FileName", label: "", thClass: "d-none", tdClass: "d-none" },
        { key: "LinkFile", label: "File attach" },
        { key: "Note", label: "Note" },
        { key: "Action", label: "Action" },
      ],
      fieldsAttachFile: [],

      formEditAttachFile: null,
      //SEARCH
      methodSearch: [],
      dataSearch: [],
      isSearching: false,
      notRequired: ["ID", "Note", "NameExtention1", "AddressExtention1"],

      //NOTIFY IMPORT EXCEL
      showModalNotifyImportExcel: false,
      dataNotifyImportExcel: null,

      //thay đổi 1 số thứ
      isTakeDataForm: false,
      dataChildTable: [],
      formatCurrency: '',
      formatDecimal: '',
      isTakeNewIndex: false
    };
  },
  computed: {
    ...mapGetters(["currentUser", "getMenuType"]),
    fieldsTable() {
      if (this.objectKeys.length > 0 && this.colTypes.length > 0) {
        let result = handling.mergeKeyDynamic(this.objectKeys, this.colTypes);
        result.forEach(item => {
          if (item.key.toUpperCase() === 'ODATE') {
            item.sortable = false
            item.typeCol = 'date'
          }
          else {
            item.sortable = false
            item.tdClass = item.tdClass.replace('pt-2', '')
          }
        })
        return result
      }
    },
    objectData() {
      if (this.menuRight.length) {
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
      }
      return {
        menuIDCurrent: '',
        formName: '',
        accessWrite: '',
      }
    },
    FactorID() {
      const path = this.$route.fullPath;
      if (path.includes("admin/category")) {
        return "Category";
      }
      else if (path.includes("admin/security")) {
        return "SystemSecurity"
      }
      else if (path.includes("admin/function")) {
        // return "ALLOWANCE"
        switch (this.EntryID) {
          case 'RQ_COATTARP':
            return 'ALLOWANCE-COATTARP'
          case 'RQ_CRANE':
            return 'ALLOWANCE-CRANE'
          case 'RQ_DOUCONT_OVERLOAD':
            return 'ALLOWANCE-DOUCONT_OVERLOAD'
          case 'RQ_DRIVERHELPER':
            return 'ALLOWANCE-DRIVERHELPER'
          case 'RQ_MEAL':
            return 'ALLOWANCE-MEAL'
          case 'RQ_PIECETIRE':
            return 'ALLOWANCE-PIECETIRE'
          case 'CV_PAIRSHIP':
            return 'ALLOWANCE-PAIRSHIP'
          case 'ASSISTOUTSIDEVEHICLE':
            return 'ALLOWANCE-ASSISTOUTSIDEVEHICLE'
          case 'RQ_MAINTENANCE':
            return 'ALLOWANCE-MAINTENANCE'
          case 'RQ_CONSUME_OILBYTRANS':
            return 'ALLOWANCE-OILBYTRANS'
          case 'RQ_FEEOFROUTE':
            return 'ALLOWANCE-ROUTE'
          default:
            return '';
        }
      }
      return "";
    },
    EntryID() {
      return this.$route.name;
    },
    fieldsTableAndMethodSearch() {
      return {
        fieldsTable: this.fieldsTable,
        methodSearch: this.methodSearch,
      };
    },
    renderForm() {
      switch (this.EntryID) {
        case 'RQ_COATTARP':
          return 'FormTarpaulin'
        case 'RQ_CRANE':
          return 'FormCrane'
        case 'RQ_DOUCONT_OVERLOAD':
          return 'FormContPair'
        case 'RQ_DRIVERHELPER':
          return 'FormAssistantDriver'
        case 'RQ_MEAL':
          return 'FormMeal'
        case 'RQ_PIECETIRE':
          return 'FormTire'
        case 'CV_PAIRSHIP':
          return 'FormTripPair'
        case 'ASSISTOUTSIDEVEHICLE':
          return 'FormVehicleOutside'
        case 'RQ_MAINTENANCE':
          return 'FormMaintenance'
        case 'RQ_CONSUME_OILBYTRANS':
          return 'FormOil'
        case 'RQ_FEEOFROUTE':
          return 'FormRouteCost'
        default:
          return '';
      }
    },
    //thay đổi 1 số thứ
    statusLock() {
      if (this.dataForm && this.dataForm.IsActive) {
        const value = this.dataForm.IsActive[1]
        if (value == 0 || value == false) {
          return 'notLock'
        }
        else {
          //khi ở trạng thái đã lock thì không cho chỉnh sửa, xóa
          return 'locked'
        }
      }
      return 'notLock'
    },
    newIndex() {
      if (this.dataTable.length > 0 && this.dataForm) {
        const index = this.dataTable.findIndex(item => item.ID == this.dataForm.ID[1])
        return index
      }
    }
  },
  created() {
    this.setUp()
    this.getCompanyConfig()
  },
  watch: {
    "$i18n.locale"(to, from) {
      if (from !== to) {
        this.setUp()
      }
    },
    getMenuType(to) {
      setTimeout(() => {
        this.setHeightContent()
      }, 400)
    },
    $route() {
      //reset lại dữ liệu khi thay đổi route
      this.currentTab = 0
      this.currentPage = 0
      this.currentIndex = -1

      this.dataForm = null
      this.isCheckIsValid = false

      this.isDisabledAdd = false
      this.isDisabledEdit = false
      this.isDisabledDelete = false
      this.isDisabledSave = true
      this.isDisabledCancel = true
      this.isDisabledLock = false
      this.isDisabledCopy = false
      this.isDisabledAttachFile = false
      this.isDisabledPrint = false
      this.isDisabledImportExcel = false
      this.isDisabledSearch = false
      this.currentMode = "readOnly" //readOnly, adding, editing

      this.showModalAttachFile = false
      this.showModalPrint = false
      this.showModalImportExcel = false
      this.showModalNotifyImportExcel = false
      this.showModalFind = false

      this.dataPrint = []
      this.dataHistory = []
      this.dataAttachFile = []
      this.formEditAttachFile = null,
        this.dataSearch = [],
        this.isSearching = false,
        this.dataNotifyImportExcel = null

      ///thay đổi 1 số thứ
      this.isTakeDataForm = false
      this.dataChildTable = []
      this.isTakeNewIndex = false

      this.getListMenuRight();
      this.getMethodSearch();
      this.getColTypes(this.EntryID);
      this.getDataAndLastDocument();
      this.getDynamicFormAdd(this.EntryID);
    },
    currentTab() {
      this.isCheckIsValid = false;
    },
    currentMode(newVal) {
      switch (newVal) {
        case "readOnly":
          this.isDisabledAdd = false;
          // this.isDisabledEdit = false;
          // this.isDisabledDelete = false;
          this.isDisabledEdit = this.currentIndex < 0 ? true : false;
          this.isDisabledDelete = this.currentIndex < 0 ? true : false;
          this.isDisabledSave = true;
          this.isDisabledCancel = true;
          // this.isDisabledLock = false
          // this.isDisabledAttachFile = false
          this.isDisabledLock = this.currentIndex < 0 ? true : false;
          this.isDisabledCopy = this.currentIndex < 0 ? true : false;
          this.isDisabledAttachFile = this.currentIndex < 0 ? true : false;
          this.isDisabledPrint = false;
          this.isDisabledImportExcel = false;
          this.isDisabledSearch = false;
          break;
        case "adding":
          this.isDisabledAdd = true;
          this.isDisabledEdit = true;
          this.isDisabledDelete = true;
          this.isDisabledSave = false;
          this.isDisabledCancel = false;
          this.isDisabledLock = true;
          this.isDisabledCopy = true;
          this.isDisabledAttachFile = true;
          this.isDisabledPrint = true;
          this.isDisabledImportExcel = true;
          this.isDisabledSearch = true;
          break;
        case "editing":
          this.isDisabledAdd = true;
          this.isDisabledEdit = true;
          this.isDisabledDelete = true;
          this.isDisabledSave = false;
          this.isDisabledCancel = false;
          this.isDisabledLock = true;
          this.isDisabledCopy = true;
          this.isDisabledAttachFile = true;
          this.isDisabledPrint = true;
          this.isDisabledImportExcel = true;
          this.isDisabledSearch = true;
          break;
        default:
          break;
      }
    },
    dataTable(newVal) {
      if (newVal.length === 0) {
        this.currentIndex = -1;
        this.dataForm = null;
        this.dataChildTable = []
        this.dataHistory = [];
        this.dataAttachFile = [];

        this.isDisabledAdd = false;
        this.isDisabledEdit = true;
        this.isDisabledDelete = true;
        this.isDisabledSave = true;
        this.isDisabledCancel = true;
        this.isDisabledLock = true;
        this.isDisabledCopy = true;
        this.isDisabledAttachFile = true;
        this.isDisabledPrint = false;
        this.isDisabledImportExcel = false;
        this.isDisabledSearch = false;
      } else {
        this.objectKeys = Object.keys(this.dataTable[0]);

        this.isDisabledAdd = false;
        this.isDisabledEdit = false;
        this.isDisabledDelete = false;
        this.isDisabledSave = true;
        this.isDisabledCancel = true;
        this.isDisabledLock = false;
        this.isDisabledCopy = false;
        this.isDisabledAttachFile = false;
        this.isDisabledPrint = false;
        this.isDisabledImportExcel = false;
        this.isDisabledSearch = false;
      }
    },
    showModalNotifyImportExcel(newVal) {
      if (!newVal) {
        this.dataNotifyImportExcel = null
      }
    },
    newIndex(newVal) {
      //sử dụng khi add 1 chứng từ mới, cái mới vừa add không phải nằm ở cái index cuối cùng của danh sách trả về
      if (this.isTakeNewIndex && this.currentIndex >= 0) {
        this.currentIndex = newVal
        this.isTakeNewIndex = false
      }
    }
  },
  mounted() {
    this.setHeightContent();
    window.addEventListener("resize", this.setHeightContent);
  },
  destroyed() {
    window.removeEventListener("resize", this.setHeightContent);
  },
  updated() {
    this.setHeightContent()
    // setTimeout(() => {
    //   this.setHeightContent()
    // }, 300)
  },
  methods: {
    setUp() {
      this.getListMenuRight();
      this.getMethodSearch();
      this.getColTypes(this.EntryID);
      this.getDataAndLastDocument();
      this.getDynamicFormAdd(this.EntryID);

      if (this.$i18n.locale === 'vn') {
        this.fieldsHistory = [...this.fieldsHistoryVN]
        this.fieldsAttachFile = [...this.fieldsAttachFileVN]
      }
      else if (this.$i18n.locale === 'en') {
        this.fieldsHistory = [...this.fieldsHistoryEN]
        this.fieldsAttachFile = [...this.fieldsAttachFileEN]
      }
    },
    handleDbClick(row) {
      const index = this.dataTable.findIndex((item) => item.ID == row.ID);
      this.currentTab = 1;
      this.loadDocumentByIndex(index);
    },
    updateTab(value) {
      if (this.currentMode == "adding" || this.currentMode == "editing") {
        return this.updateTabWhenNotSave(value);
      }
      this.currentTab = value;
      this.currentMode = 'readOnly'
    },
    handleAdd() {
      if (this.columnAdd && this.columnAdd.length > 0) {
        let newObj = {};
        this.columnAdd.forEach((item) => {
          if (item.ClName.toUpperCase() == 'OID') {
            newObj = {
              ...newObj,
              ID: [item.ShwName, '', item.TypeCol, null],
            };
          }
          else {
            newObj = {
              ...newObj,
              [item.ClName]: [item.ShwName, '', item.TypeCol, null],
            };
          }
        });
        this.dataForm = { ...newObj };
        this.dataChildTable = []
      } else {
        this.dataForm = null;
      }
    },
    handleEdit() {
      const item = this.dataTable[this.currentIndex];
      // this.getByID(item.ID, item.IsActive);
      this.getByID(item.ID);
    },
    handleSave(obj) {
      this.isTakeDataForm = false
      if (!obj) return

      let body = {
        ...obj,
        EntryID: this.EntryID,
      };
      this.currentMode = "readOnly";

      if (body.ID) {
        body.OID = body.ID
        nplAPI
          .editAllowances(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              this.getData();
              this.getByID(val.data[0].OID)
              this.getAttachFile(val.data[0].OID);
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
          })
          .catch((err) => console.log(err));
      } else {
        delete body.ID
        nplAPI
          .addAllowances(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              this.getData();
              this.getByID(val.data[0].OID)
              this.getAttachFile(val.data[0].OID);
              this.isTakeNewIndex = true
              // this.getDataAndLastDocument();
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
          })
          .catch((err) => console.log(err));
      }
    },
    handleCancel() {
      if (this.currentIndex >= 0) {
        const item = this.dataTable[this.currentIndex];
        // this.getByID(item.ID, item.IsActive);
        this.getByID(item.ID);
      }
      else {
        this.dataForm = null
      }
      this.currentMode = 'readOnly'
    },
    handleDelete(id) {
      this.$bvModal
        .msgBoxConfirm(`${this.$t("modal.confirm-delete")} ${id} ?`, {
          title: this.$t('toast.message'),
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
            let body = {
              OID: id,
            };
            nplAPI
              .deleteAllowances(body)
              .then((val) => {
                if (val.status) {
                  this.showNotify(
                    "success",
                    this.$t("toast.message"),
                    val.message
                  );
                  this.getDataAndLastDocument();
                } else {
                  this.showNotify("error", this.$t("toast.message"), val.message);
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
    handleLock(id, isActive) {
      this.$bvModal
        .msgBoxConfirm(`${this.$t("modal.confirm-lock")} ${id} ?`, {
          title: this.$t('toast.message'),
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
            let body = {
              OID: id,
              IsActive: isActive == false || isActive == 0 ? 1 : 0
            };
            nplAPI
              .changeStatusAllowances(body)
              .then((val) => {
                if (val.status) {
                  this.showNotify(
                    "success",
                    this.$t("toast.message"),
                    val.message
                  );
                  this.getData()
                  this.getByID(val.data[0].OID)
                  this.getAttachFile(val.data[0].OID);
                  // this.getDataAndLastDocument();
                } else {
                  this.showNotify("error", this.$t("toast.message"), val.message);
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
    handleCopy(id) {
      this.$bvModal
        .msgBoxConfirm(`${this.$t("modal.confirm-copy")} ${id} ?`, {
          title: this.$t('toast.message'),
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
            let body = {
              OID: id,
            };
            nplAPI
              .copyAllowances(body)
              .then((val) => {
                if (val.status) {
                  this.showNotify(
                    "success",
                    this.$t("toast.message"),
                    val.message
                  );
                  this.getData();
                  this.getByID(val.data[0].OID)
                  this.getAttachFile(val.data[0].OID);
                  this.isTakeNewIndex = true
                  // this.getDataAndLastDocument()
                } else {
                  this.showNotify("error", this.$t("toast.message"), val.message);
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
    async handleAttachFile(obj) {
      this.showModalAttachFile = false;
      try {
        const id = this.dataTable[this.currentIndex].ID;
        const newObj = {
          ...obj,
          OID: id,
          FactorID: this.FactorID,
          EntryID: this.EntryID,
        };
        let formData = new FormData();
        for (const key in newObj) {
          if (key === "File" && newObj[key] && newObj[key].length > 0) {
            //formData ko có support FileList nên phải chạy thêm vòng for nữa
            for (let i = 0; i < newObj[key].length; i++) {
              formData.append("File", newObj[key][i]);
            }
          } else {
            formData.append(key, newObj[key]);
          }
        }
        let res;
        if (obj.ID) {
          res = await nplAPI.editAttachFile(formData);
        } else {
          res = await nplAPI.addAttachFile(formData);
        }
        if (res.status) {
          this.getAttachFile(id);
          this.showNotify("success", this.$t("toast.message"), res.message);
        } else {
          this.showNotify("error", this.$t("toast.message"), res.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    getFormPrint() {
      const body = {
        FactorID: this.FactorID,
        EntryID: this.EntryID,
      };
      nplAPI
        .getFormPrint(body)
        .then((val) => {
          this.dataPrint = val.status ? val.data : [];
          this.showModalPrint = true;
        })
        .catch((err) => console.log(err));
    },
    handlePrint(obj) {
      switch (obj.PrintType.toUpperCase()) {
        case "DOWNLOAD":
          const link = document.createElement("a");
          link.download = obj.FormPrintName;
          link.href = obj.PrintAction;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          break;
        case "CLIENT":
          handling.printExcel(
            "npl-table-basic-form",
            this.objectData.formName,
            null,
            null
            // this.$t("form.page") + " " + this.currentPage
          );
        case "SERVER":
        default:
          break;
      }
      if (obj.PrintType.toUpperCase() === "DOWNLOAD") {
        const link = document.createElement("a");
        link.download = obj.FormPrintName;
        link.href = obj.PrintAction;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      this.showModalPrint = false;
    },
    handleImportExcel(file) {
      let formData = new FormData();
      formData.append("FactorID", this.FactorID)
      formData.append("EntryID", this.EntryID)
      formData.append("File", file)
      nplAPI
        .importExcel(formData)
        .then((val) => {
          if (val.status) {
            // this.showNotify("success", this.$t("toast.message"), val.message);
            this.dataNotifyImportExcel = val.data
            this.showModalNotifyImportExcel = true
            this.currentTab = 0
            this.getDataAndLastDocument()
          }
          else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.showModalImportExcel = false;
        })
        .catch((err) => console.log(err));
    },
    handleSearch(arr) {
      // this.dataSearchCurrent = [...arr]
      this.isSearching = true
      const ListSearch = [];
      arr.forEach((item) => {
        if (item.Operator) {
          if (item.Param1 || item.Param1 === 0) {
            ListSearch.push({
              Name: item.Name,
              Operator: item.Operator,
              Param1: item.Param1.toString(),
              Param2: item.Param2 ? item.Param2.toString() : "",
            });
          }
        }
      });
      // console.log(ListSearch);
      if (ListSearch.length) {
        this.currentTab = 0;
        const body = {
          ListSearch,
          FactorID: this.FactorID,
          EntryID: this.EntryID,
        };
        nplAPI
          .search(body)
          .then((val) => {
            this.currentPage = 1;
            // this.dataTable = val.status ? val.data : [];
            const arr = val.status ? val.data : [];
            if (arr.length) {
              arr.forEach(item => {
                item.ID = item.OID
              })
            }
            this.dataTable = arr
            if (this.dataTable.length) {
              this.loadDocumentByIndex(this.dataTable.length - 1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.getDataAndLastDocument();
      }
    },
    resetSearch() {
      this.isSearching = false
      this.setDataSearch(this.fieldsTable);
    },
    /////
    setHeightContent() {
      //set cái chiều cao của phần content chính giữa 2 header và footer
      const actionHeader = this.$refs["action-header"];
      const actionFooter = this.$refs["action-footer"];
      const formBasic = this.$refs["form-basic"];
      const height =
        formBasic.offsetHeight -
        actionHeader.offsetHeight -
        actionFooter.offsetHeight;
      this.heightContent = `${height}px`;
      this.heightContent2 = `${height - 37}px`;
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
    getColTypes(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.colTypes = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      let body = {
        EntryID: this.EntryID,
      };
      nplAPI
        .getAllowances(body)
        .then((val) => {
          // this.dataTable = val.status ? val.data : [];
          const arr = val.status ? val.data : [];
          if (arr.length) {
            arr.forEach(item => {
              item.ID = item.OID
            })
          }
          this.dataTable = arr
        })
        .catch((err) => console.log(err));
    },
    getDataAndLastDocument() {
      let body = {
        EntryID: this.EntryID,
      };
      nplAPI
        .getAllowances(body)
        .then((val) => {
          // this.dataTable = val.status ? val.data : [];
          const arr = val.status ? val.data : [];
          if (arr.length) {
            arr.forEach(item => {
              item.ID = item.OID
            })
          }
          this.dataTable = arr
          if (this.dataTable.length) {
            this.loadDocumentByIndex(this.dataTable.length - 1);
          }
        })
        .catch((err) => console.log(err));
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
    getByID(id, isActive) {
      let body = {
        OID: id,
      };
      nplAPI
        .getAllowancesByID(body)
        .then((val) => {
          let obj = val.status ? val.data : null;
          if (obj) {
            let newObj = handling.showExtensionFormEdit(obj);
            const labelID = newObj?.OID ? newObj?.OID[0] : 'cl.OID'
            this.dataForm = {
              ...newObj,
              ID: [labelID, id, "ID", null],
              IsActive: [this.$t("status.status"), obj.IsActive, 'IsActive', null],
            };
            if (obj.Histories) {
              const arr = [];
              obj.Histories.forEach((item) => {
                arr.push({
                  ...item,
                  CreateDate: handling.convertDateTime(item.CreateDate),
                });
              });
              this.dataHistory = arr;
            }
            //thay đổi 1 số thứ
            this.dataChildTable = obj?.Details || []
          } else {
            this.dataForm = null;
            this.dataChildTable = []
            this.dataHistory = [];
            this.dataAttachFile = [];
          }
        })
        .catch((err) => console.log(err));
    },
    getAttachFile(id) {
      //gọi file đính kèm
      let body = {
        OID: id.toString(),
        FactorID: this.FactorID,
        EntryID: this.EntryID,
      };
      nplAPI
        .getAttachFile(body)
        .then((val) => {
          const arr = val.status ? val.data : [];
          this.dataAttachFile = arr.map((item) => ({
            ...item,
            CreateDate: handling.convertDateTime(item.CreateDate),
          }));
        })
        .catch((err) => console.log(err));
    },
    getMethodSearch() {
      nplAPI
        .getMethodSearch()
        .then((val) => {
          let data = val.status ? val.data : [];
          if (data.length > 0) {
            const arr = [];
            data.forEach((item) => {
              if (item.Valu) {
                arr.push({
                  text: item.Shw,
                  value: item.Valu,
                });
              }
            });
            this.methodSearch = [...arr];
          }
        })
        .catch((err) => console.log(err));
    },
    handleChangeIndex(index) {
      if (this.currentTab === 0) {
        this.currentTab = 1;
      }
      if (this.currentMode == "adding" || this.currentMode == "editing") {
        return this.changeIndexWhenNotSave(index);
      }
      this.loadDocumentByIndex(index);
    },
    handleChangeAction(type) {
      switch (type) {
        case "add":
          this.currentMode = "adding";
          this.currentTab = 1;
          this.handleAdd();
          break;
        case "edit":
          this.currentTab = 1;
          this.currentMode = "editing";
          // this.dataForm = { ...this.dataCurrentIndex }; --> dùng như thế này khi dataForm thay đổi dataCurrentIndex cũng thay đổi theo
          this.handleEdit();
          break;
        case "save":
          this.isTakeDataForm = true
          // this.handleSave();
          break;
        case "cancel":
          // this.currentMode = "readOnly";
          this.handleCancel();
          break;
        case "delete":
          this.currentTab = 1;
          this.currentMode = "readOnly";
          this.handleDelete(this.dataForm.ID[1]);
          break;
        case "lock":
          this.currentTab = 1
          this.currentMode = 'readOnly'
          this.handleLock(this.dataForm.ID[1], this.dataForm.IsActive[1])
          break;
        case "copy":
          this.currentTab = 1
          this.handleCopy(this.dataForm.ID[1])
          break;
        case "attachFile":
          this.currentTab = 3;
          this.currentMode = "readOnly";
          this.showModalAttachFile = true;
          break;
        case "print":
          this.getFormPrint();
          break;
        case "importExcel":
          this.showModalImportExcel = true
          break;
        case "find":
          this.showModalFind = true;
          // if(this.dataSearchCurrent.length > 0) {
          if (!this.isSearching) {
            // this.dataSearch = [...this.dataSearchCurrent]
            this.setDataSearch(this.fieldsTable)
          }
          break;
        default:
          break;
      }
    },
    loadDocumentByIndex(index) {
      this.currentMode = "readOnly";
      this.currentIndex = index;
      const item = this.dataTable[index];
      // this.getByID(item.ID, item.IsActive);
      this.getByID(item.ID);
      this.getAttachFile(item.ID);
    },
    changeIndexWhenNotSave(index) {
      if (this.currentMode === 'adding' || this.currentMode === 'editing') {
        //đang có dữ liệu sửa chưa save
        this.$bvModal
          .msgBoxConfirm(this.$t("modal.question-skip") + "?", {
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
              this.loadDocumentByIndex(index);
              this.currentTab = 1;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.loadDocumentByIndex(index);
        this.currentTab = 1;
      }
    },
    updateTabWhenNotSave(indexTab) {
      if (this.currentMode === 'adding' || this.currentMode === 'editing') {
        //đang có dữ liệu chưa save
        this.$bvModal
          .msgBoxConfirm(this.$t("modal.question-skip") + "?", {
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
              this.currentTab = indexTab;
              this.handleCancel();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.currentTab = indexTab;
        this.handleCancel();
      }
    },
    removeAttachFile(item) {
      let body = {
        ID: item.ID,
      };
      nplAPI
        .deleteAttachFile(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getAttachFile(this.dataTable[this.currentIndex].ID);
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
        })
        .catch((err) => console.log(err));
    },
    editAttachFile(item) {
      this.showModalAttachFile = true;
      this.formEditAttachFile = { ...item };
    },
    //SEARCH
    setDataSearch(arr) {
      const newArr = [];
      //gán mặc định lựa chọn tìm kiếm
      arr.forEach((item) => {
        const obj = {
          Label: item.label,
          Name: item.key,
          Type: item.typeCol,
          Operator: "like",
          OperatorDescription: this.$t('like'),
          SearchOption: this.getSearchOptionByType(
            item.typeCol,
            this.methodSearch
          ),
          Param1: null,
          Param2: null,
        }
        //sửa lại các field 'Operator', 'OperatorDescription', 'SearchOption' 
        if (item.key.toUpperCase() === "ISACTIVE") {
          obj.Operator = "="
          obj.OperatorDescription = this.$t('equal')
          obj.SearchOption = [
            { text: this.$t('npl.locked'), value: 1 },
            { text: this.$t('npl.not-lock'), value: 0 },
          ]
        }
        if (item.key.toUpperCase() === "ISATTACHFILE") {
          obj.Operator = "="
          obj.OperatorDescription = this.$t('equal')
          obj.SearchOption = [
            { text: this.$t('template.yes'), value: 1 },
            { text: this.$t('template.no'), value: 0 },
          ]
        }
        else if (item.typeCol.toUpperCase() === 'DATE') {
          obj.Operator = "="
          obj.OperatorDescription = this.$t('equal')
        }
        newArr.push(obj)
      });
      this.dataSearch = newArr;
    },
    getSearchOptionByType(type, arr) {
      let option = [...arr];
      if (type.toUpperCase() === "STRING" || type.toUpperCase() === "NOTE") {
        option = arr.filter(
          (item) =>
            item.value === "=" ||
            item.value === "like" ||
            item.value === "not like"
        );
      }
      else if (type.toUpperCase() === 'DATE') {
        option = arr.filter(item => item.value !== "like" && item.value !== "not like")
      }
      return option;
    },
    getCompanyConfig() {
      nplAPI
        .getCompanyConfig()
        .then((val) => {
          let obj = val.status ? val.data : null;
          if (obj) {
            this.formatCurrency = obj.CompanyInfo[0].FormatCurrency
            this.formatDecimal = obj.CompanyInfo[0].FormatDecimal
          }
          else {
            this.formatCurrency = ''
            this.formatDecimal = ''
          }
        })
        .catch((err) => console.log(err));
    },
    //NOTIFY IMPORT EXCEL
    hiddenModalNotifyImportExcel() {
      this.showModalNotifyImportExcel = false
    },
    showNotify(type, titleMessage, message) {
      this.$notify(type, titleMessage, message, {
        duration: 3000,
        permanent: false,
      });
    },
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
    convertDate(string) {
      if (string) {
        return moment(string).format('DD/MM/YYYY')
      }
      return string
    }
  },
};