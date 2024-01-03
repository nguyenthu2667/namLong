import moment from "moment";
import momentTimeZone from "moment-timezone";
const handleCustom = {
  /** Kiểm tra image có tồn tại **/
  checkIfImageExists: (url, callback) => {
    const img = new Image();
    img.src = url;
    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };
      img.onerror = () => {
        callback(false);
      };
    }
  },
  /** Xuất Excel **/
  printExcel: (table, name, from = null, to = null, page = null) => {
    let nameFile;
    if (!from || !to) {
      if (page) {
        nameFile = name + " " + page + ".xls";
      } else {
        nameFile = name + ".xls";
      }
    } else {
      if (page) {
        nameFile = name + " " + from + "-" + to + " " + page + ".xls";
      } else {
        nameFile = name + " " + from + "-" + to + ".xls";
      }
    }
    let uri = "data:application/vnd.ms-excel;base64,",
      template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">' +
        "<head>" +
        "<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->" +
        '<meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>' +
        "</head>" +
        "<body><table>{table}</table></body>" +
        "</html>",
      base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      },
      format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p];
        });
      };
    if (!table.nodeType) table = document.getElementById(table);
    let ctx = { worksheet: name || "Worksheet", table: table.innerHTML };
    let a = document.createElement("a");
    a.href = uri + base64(format(template, ctx));
    a.download = nameFile;
    a.click();
  },
  /** Sắp xếp theo JSON thứ tự Key Attribute **/
  GetSortOrder: (prop) => {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  },
  /** Đệ quy menu **/
  recursiveMenuRight: (a, i, r) => {
    if (!a) return;
    a.forEach((element) => {
      if (element["ParentID"] !== i) return;
      let n = [];
      handleCustom.recursiveMenuRight(a, element["MenuID"], n);
      if (n.length > 0) {
        r.push({
          id: element["MenuID"],
          icon: element["MenuIcon"],
          label: element["MenuName"],
          to: element["Link"],
          action: element["MenuAction"],
          controller: element["MenuController"],
          access: element["AccessWrite"],
          isChecked: false,
          subs: n,
        });
      } else {
        r.push({
          id: element["MenuID"],
          icon: element["MenuIcon"],
          label: element["MenuName"],
          to: element["Link"],
          action: element["MenuAction"],
          controller: element["MenuController"],
          access: element["AccessWrite"],
          isChecked: false,
          subs: [],
        });
      }
    });
  },
  /** Đệ quy form menu-right **/
  recursiveMenuRightEdit: (a, i, r) => {
    if (!a) return;
    a.forEach((element) => {
      if (element["ParentID"] !== i) return;
      let n = [];
      handleCustom.recursiveMenuRightEdit(a, element["MenuID"], n);
      let access_boolean = false;
      if (element["AccessWrite"] === 1) access_boolean = true;
      if (n.length > 0) {
        r.push({
          id: element["MenuID"],
          label: element["MenuName"],
          menuSelected: element["IsSelected"],
          menuAccess: access_boolean,
          subs: n,
        });
      } else {
        r.push({
          id: element["MenuID"],
          label: element["MenuName"],
          menuSelected: element["IsSelected"],
          menuAccess: access_boolean,
          subs: [],
        });
      }
    });
  },
  /** Đệ quy form menu **/
  recursiveMenu: (a, i, r) => {
    if (!a) return;
    a.forEach((element) => {
      if (element["ParentID"] !== i) return;
      let n = [];
      handleCustom.recursiveMenu(a, element["MenuID"], n);
      let active_boolean = false;
      if (element["IsActive"] === 1) active_boolean = true;
      if (n.length > 0) {
        r.push({
          id: element["MenuID"],
          label: element["Name"],
          active: active_boolean,
          subs: n,
        });
      } else {
        r.push({
          id: element["MenuID"],
          label: element["Name"],
          active: active_boolean,
          subs: [],
        });
      }
    });
  },

  /** Đệ quy chung */
 recursiveArray2 : (array, parentID, result, string1, string2, key) => {
  if (!array || array?.length === 0) return
  array.forEach((element, _i) => {
    if (element[string1] !== parentID) return
    let _array = []
    handleCustom.recursiveArray2(array, element[string2], _array, string1, string2, key === "" ? key + result.length : key + "-" + result.length)
    result.push({
      key: key === "" ? key + result.length : key + "-" + result.length,
      data: {
        id : element["RegionID"],
        name: element["RegionName"],
        note: element["Note"],
        isActive: element["IsActive"]
      },
      children: _array,
    })
    // console.log(result);
  })
},

  /** Đệ quy input select region trong form light-cabinets **/
  recursiveTreeSelectRegion: (a, i, r) => {
    if (!a) return;
    a.forEach((element) => {
      if (element["RegionParentID"] !== i) return;
      let n = [];
      handleCustom.recursiveTreeSelectRegion(a, element["RegionID"], n);
      if (n.length > 0) {
        r.push({
          id: element["RegionID"],
          label: element["RegionName"],
          children: n,
        });
      } else {
        r.push({
          id: element["RegionID"],
          label: element["RegionName"],
        });
      }
    });
  },
  /** Đệ quy input select route trong form tree-route **/
  recursiveTreeSelectRoute: (a, i, r, c) => {
    if (!a) return;
    a.forEach((element) => {
      if (element["ParentID"] != i || element["IsActive"] === false) return;
      let n = [];
      handleCustom.recursiveTreeSelectRoute(
        a,
        element["TreeRouteID"],
        n,
        c + 1
      );
      if (n.length > 0) {
        r.push({
          id: element["TreeRouteID"],
          label: element["TreeRouteName"],
          parent: element["ParentID"],
          key: c,
          children: n,
        });
      } else {
        r.push({
          id: element["TreeRouteID"],
          label: element["TreeRouteName"],
          parent: element["ParentID"],
          key: c,
        });
      }
    });
  },
  /** Đệ quy input select region trong form light-region **/
  recursiveRegionParent: (a, i, r, c) => {
    if (!a) return;
    a.forEach((element) => {
      if (element["RegionParentID"] !== i || element["IsActive"] === false)
        return;
      let n = [];
      handleCustom.recursiveRegionParent(a, element["RegionID"], n, c + 1);
      if (n.length > 0) {
        r.push({
          id: element["RegionID"],
          label: element["RegionName"],
          parent: element["RegionParentID"],
          key: c,
          children: n,
        });
      } else {
        r.push({
          id: element["RegionID"],
          label: element["RegionName"],
          parent: element["RegionParentID"],
          key: c,
        });
      }
    });
  },

  /** Đệ quy input select parentid trong form group customer **/
  recursiveTreeSelectParentCustomerGroup: (a, i, r, c) => {
    if (!a) return;
    a.forEach((element) => {
      if (element["ParentID"] != i || element["IsActive"] == false) return;
      let n = [];
      handleCustom.recursiveTreeSelectParentCustomerGroup(
        a,
        element["GroupID"],
        n,
        c + 1
      );
      if (n.length > 0) {
        r.push({
          id: element["GroupID"],
          label: element["GroupName"],
          parent: element["ParentID"],
          key: c,
          children: n,
        });
      } else {
        r.push({
          id: element["GroupID"],
          label: element["GroupName"],
          parent: element["ParentID"],
          key: c,
        });
      }
    });
  },

  /** Các hàm convert dữ liệu trong body và result khi get dữ liệu về và push dữ liệu lên **/
  convertBooleanToBit: (value) => (value ? 1 : 0),

  convertBitToBoolean: (value) => !!value,

  /** Các hàm convert dữ liệu trong form với type Date, Datetime **/
  convertDateNPL: (string) =>
    moment(string, "YYYY-MM-DD'T'HH:mm:ss").format("MM-DD-YYYY"),

  convertDate: (string) =>
    moment(string, "YYYY-MM-DD'T'HH:mm:ss").format("DD-MM-YYYY"),

  convertTime: (string) =>
    moment(string, "YYYY-MM-DD'T'HH:mm:ss").format("HH:mm:ss"),

  convertDateTime: (string) =>
    moment(string, "YYYY-MM-DD'T'HH:mm:ss").format("HH:mm:ss DD/MM/YYYY"),

  getDateNow: () => moment(new Date()).format("DD/MM/YYYY"),

  getMonth: () => moment(new Date()).format("MM"),

  getDay: () => moment(new Date()).format("DD"),

  getDateTimeNow: () => moment(new Date()).format("HH:mm DD/MM/YYYY"),

  durationDay: (now, end) => moment(now).diff(end, "days"),

  convertDateToPicker: (string) =>
    moment(string, "DD/MM/YYYY").format("YYYY-MM-DD"),

  convertPickerToDate: (string) =>
    moment(string, "YYYY-MM-DD").format("DD/MM/YYYY"),

  getDateSubtract: (day) => moment().subtract(day, "days").format("DD/MM/YYYY"),

  convertDateTimeYear: (string) =>
    moment(string, "YYYY-MM-DD'T'HH:mm:ss").format("YYYY"),

  /** Sử dụng cho ApexChart **/
  convertDateToTimeStamp: (date) =>
    momentTimeZone(date, "YYYY/MM/DD")
      .tz("Asia/Ho_Chi_Minh")
      .format()
      .valueOf(),

  /** Sử dụng trong component form custom **/
  convertDateForm: (string) =>
    moment(string, "YYYY-MM-DD'T'HH:mm:ss").format("YYYY-MM-DD"),

  /** Convert tiền tệ **/
  convertFloat: (n) =>
    Number(n)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","),

  convertMoney: (n, country) =>
    country?.currency === "VN"
      ? Number(n).toLocaleString("vi-VN")
      : Number(n).toLocaleString("en-US"),

  revertFloat: (n) => Number(n.replace(/[^0-9.-]+/g, "")),

  /** Sử dụng để convert lại dữ liệu cột trạng thái của các API GetList **/
  convertDataBitToBoolean(data) {
    if (!data) return;
    let array = [];
    data.forEach((element) => {
      switch (element["IsSpeaker"]) {
        case 1:
          element["IsSpeaker"] = true;
          break;
        case 0:
          element["IsSpeaker"] = false;
          break;
        default:
          break;
      }
      switch (element["IsTest"]) {
        case 1:
          element["IsTest"] = true;
          break;
        case 0:
          element["IsTest"] = false;
          break;
        default:
          break;
      }
      switch (element["IsActive"]) {
        case 1:
          element["IsActive"] = true;
          break;
        case 0:
          element["IsActive"] = false;
          break;
        default:
          break;
      }
      switch (element["IsClose"]) {
        case 1:
          element["IsClose"] = true;
          break;
        case 0:
          element["IsClose"] = false;
          break;
        default:
          break;
      }
      switch (element["IsSelected"]) {
        case 1:
          element["IsSelected"] = true;
          break;
        case 0:
          element["IsSelected"] = false;
          break;
        default:
          break;
      }
      switch (element["IsDeploy"]) {
        case 1:
          element["IsDeploy"] = true;
          break;
        case 0:
          element["IsDeploy"] = false;
          break;
        default:
          break;
      }
      switch (element["HasMarker"]) {
        case 1:
          element["HasMarker"] = true;
          break;
        case 0:
          element["HasMarker"] = false;
          break;
        default:
          break;
      }

      switch (element["SpeakerStatus"]) {
        case 1:
          element["SpeakerStatus"] = true;
          break;
        case 0:
          element["SpeakerStatus"] = false;
          break;
        default:
          break;
      }

      switch (element["DeviceStatus"]) {
        case 1:
          element["DeviceStatus"] = true;
          break;
        case 0:
          element["DeviceStatus"] = false;
          break;
        default:
          break;
      }

      array.push(element);
    });
    return array;
  },

  /** Trả về mảng dữ liệu sử dụng hiển thị động column table trong tất cả component **/
  mergeTableAndData: (fArray, sArray) => {
    if (!fArray || !sArray) return;
    if (fArray.length > 0 && sArray.length > 0) {
      let nArray = [];
      fArray.forEach((item) => {
        let active = false;
        let object = {
          key: item,
          sortable: true,
          tdClass: "text-right pt-3",
        };
        sArray.forEach((_item) => {
          if (active) return;
          if (_item["ClName"].toUpperCase() === item.toUpperCase()) {
            Object.assign(object, { label: _item["ShwName"] });
            object.sortNum = _item.SortNum;
            switch (_item["TypeCol"].toUpperCase()) {
              case "NUMBER":
                object.tdClass = "text-right pt-3";
                break;
              case "MUTEDNUMBER":
                object.tdClass = "text-right text-muted pt-3";
                break;
              case "STRING":
              case "STRING-TREE":
                object.tdClass = "text-left pt-3 position-relative";
                break;
              case "MUTEDSTRING":
                object.tdClass = "text-left text-muted pt-3";
                break;
              case "PHONE":
              case "EMAIL":
              case "MUTEDNUMBERCENTER":
              case "MUTEDSTRINGCENTER":
                object.tdClass = "text-center text-muted pt-3";
                break;
              default:
                if (
                  _item["TypeCol"].toUpperCase().search("FLOAT") > -1 ||
                  _item["TypeCol"].toUpperCase().search("MONEY") > -1
                ) {
                  object.tdClass = "text-right pt-3";
                } else {
                  object.tdClass = "text-center";
                  object.sortable = false;
                }
                break;
            }
            active = true;
          }
        });
        if (active) nArray.push(object);
      });
      return nArray;
    }
  },
  //ver_2
  mergeKeyDynamic: (arrKey, arrType, sortable = true) => {
    if (!arrKey || !arrType) return;
    let result = [];
    arrKey.map((key) => {
      let obj = {
        key: key,
        sortable: sortable,
      };
      let objType = arrType.find(
        (e) => e["ClName"].toUpperCase() == key.toUpperCase()
      );
      if (objType && objType["IsHide"] == 0) {
        obj.label = objType["ShwName"];
        obj.sortNum = objType["SortNum"];
        obj.typeCol = objType["TypeCol"];
        switch (objType["TypeCol"].toUpperCase()) {
          case "NUMBER":
            obj.tdClass = "text-right pt-2";
            break;
          case "NUMBERBOLDVN":
          case "NUMBERBOLD":
            obj.tdClass = "text-right pt-2 font-weight-bold";
            break;
          case "NUMBERBOLDCENTER":
            obj.tdClass = "text-center pt-2 font-weight-bold";
            break;
          case "MUTEDNUMBER":
            obj.tdClass = "text-right text-muted pt-3";
            break;
          case "NOTE":
            obj.tdClass = "text-left pt-2";
            break;
          case "STRING":
            obj.tdClass = "text-left pt-2";
            break;
          case "STRINGCENTER":
            obj.tdClass = "text-center pt-2";
            break;
          case "STRINGRIGHT":
            obj.tdClass = "text-right pt-2";
            break;
          case "STRING-TREE":
            obj.tdClass = "text-left pt-2 position-relative";
            break;
          case "MUTEDSTRING":
            obj.tdClass = "text-left text-muted pt-2";
            break;
          case "AVATAR":
          case "IMAGE":
            obj.tdClass = "text-center p-1";
            break;
          case "PHONE":
          case "EMAIL":
          case "MUTEDNUMBERCENTER":
          case "MUTEDSTRINGCENTER":
            obj.tdClass = "text-center text-muted pt-2";
            break;
          default:
            if (
              objType["TypeCol"].toUpperCase().search("FLOAT") > -1 ||
              objType["TypeCol"].toUpperCase().search("MONEY") > -1
            ) {
              obj.tdClass = "text-right pt-2";
            } else {
              obj.tdClass = "text-center";
              obj.sortable = false;
            }
            break;
        }
        result.push(obj);
      }
    });
    return result;
  },

  /** Trả về mảng dữ liệu sử dụng hiển thị động form search trong tất cả component **/
  filterSearchDynamic: (arrFields, arrSearchs, context) => {
    if (!arrFields && !arrSearchs) return;
    return arrFields.map(({ sortable, tdClass, sortNum, ...field }) => {
      let result = null;
      let newArr = null;
      switch (field.typeCol?.toUpperCase()) {
        case "DATE":
          newArr = arrSearchs;
          result = {
            ...field,
            Operator: "=",
            OperatorDescription: "Bằng",
            SearchOption: newArr,
            Param1: null,
            Param2: null,
          };
          break;
        case "ISCHECK":
          result = {
            ...field,
            Operator: "=",
            OperatorDescription: "Bằng",
            SearchOption: [
              { text: context.$t("template.yes"), value: 1 },
              { text: context.$t("template.no"), value: 0 },
            ],
            Param1: null,
            Param2: null,
          };
          break;
        case "BIT":
          result = {
            ...field,
            Operator: "=",
            OperatorDescription: "Bằng",
            SearchOption: [
              { text: context.$t("npl.using"), value: 1 },
              { text: context.$t("npl.not-use"), value: 0 },
            ],
            Param1: null,
            Param2: null,
          };
          break;

        default:
          newArr = arrSearchs.filter(
            (search) =>
              search.value === "=" ||
              search.value === "like" ||
              search.value === "not like"
          );
          result = {
            ...field,
            Operator: "like",
            OperatorDescription: "Có",
            SearchOption: newArr,
            Param1: null,
            Param2: null,
          };
          break;
      }
      return {
        ...field,
        ...result,
      };
    });
  },

  formatCurrency: (value, currencyAPI, decimalCondition = 2) => {
    let condition = currencyAPI === "VN" ? "," : ".";
    let result = null;
    let regex = condition === "." ? /,/g : /\./g;
    if (!value.includes(`${condition}`)) {
      let detectCondition = String(value).replace(regex, "");
      result = Number(detectCondition).toLocaleString(
        `${condition === "." ? "en-US" : "vi-VN"}`
      );
    } else {
      if (!(value.split(`${condition}`)[1].length > decimalCondition)) {
        result = value;
      } else {
        result = value.slice(0, -1);
      }
    }
    return result;
  },
  changeKeyDynamicSearch: (arrType) => {
    if (!arrType) return;
    if (arrType.length > 0) {
      const newArr = [];
      arrType.forEach((e) => {
        // let objType = arrType.
        let obj = {};
        switch (e.typeCol.toUpperCase()) {
          case "KEY":
            obj.label = e.label;
            obj.key = e.key;
            obj.typeCol = e.typeCol;
            obj.operator = "Like";
            obj.operatorDescription = "Có";
            obj.param1 = null;
            obj.param2 = null;
            break;
          case "DATE":
            obj.label = e.label;
            obj.key = e.key;
            obj.typeCol = e.typeCol;
            obj.operator = "Like";
            obj.operatorDescription = "Có";
            obj.param1 = null;
            obj.param2 = null;
            break;
          case "NUMBER":
            obj.label = e.label;
            obj.key = e.key;
            obj.typeCol = e.typeCol;
            obj.operator = "Like";
            obj.operatorDescription = "Có";
            obj.param1 = null;
            obj.param2 = null;
            break;
          case "SELECT":
            obj.label = e.label;
            obj.key = e.key;
            obj.typeCol = e.typeCol;
            obj.operator = "Like";
            obj.operatorDescription = "Có";
            obj.param1 = null;
            obj.param2 = null;
            break;
          case "DESCRIPTION":
          case "NOTE":
            obj.label = e.label;
            obj.key = e.key;
            obj.typeCol = e.typeCol;
            obj.operator = "Like";
            obj.operatorDescription = "Có";
            obj.param1 = null;
            obj.param2 = null;
            break;
          default:
            obj.label = e.label;
            obj.key = e.key;
            obj.typeCol = e.typeCol;
            obj.operator = "Like";
            obj.operatorDescription = "Có";
            obj.param1 = null;
            obj.param2 = null;
            break;
        }
        newArr.push(obj);
      });
      newArr.sort((min, max) => {
        return min.sortNum - max.sortNum;
      });
      return newArr;
    }
  },

  /** Trả về mảng dữ liệu động sử dụng cho các modal info, add, edit **/
  showExtensionFormInfo: (iArray, sArray) => {
    if (!iArray || !sArray) return;
    if (iArray.length > 0 && sArray.length > 0) {
      let fObject = {};
      let kArray = Object.keys(iArray[0]);
      kArray.forEach((item) => {
        let active = false;
        let obj = {};
        sArray.forEach((_item) => {
          if (active) return;
          if (_item["ClName"].toUpperCase() === item.toUpperCase()) {
            obj[item] = [_item["ShwName"], iArray[0][item], _item["TypeCol"]];
            active = true;
          }
        });
        if (active) Object.assign(fObject, obj);
      });
      return fObject;
    }
  },

  showExtensionFormAdd: (fArray, sObject = {}) => {
    if (!fArray) return;
    if (fArray.length > 0) {
      let key,
        formula,
        nObject = {};
      fArray.forEach((item) => {
        if (item["IsHide"] === 0) {
          key = item["ClName"];
          formula =
            item["Formula"] && item["Formula"].length > 0
              ? item["Formula"]
              : null;
          if (sObject[key]?.length > 0) {
            switch (item["TypeCol"].toUpperCase()) {
              case "SELECT-TREE":
                nObject[key] = [
                  item["ShwName"],
                  sObject[key][0]["id"],
                  item["TypeCol"],
                  formula,
                ];
                break;
              default:
                if (item["TypeCol"].toUpperCase().search("SELECT") === -1) {
                  nObject[key] = [
                    item["ShwName"],
                    null,
                    item["TypeCol"],
                    formula,
                  ];
                } else {
                  nObject[key] = [
                    item["ShwName"],
                    sObject[key][0]["value"],
                    item["TypeCol"],
                    formula,
                  ];
                }
                break;
            }
          } else {
            switch (item["TypeCol"].toUpperCase()) {
              case "DATE":
                nObject[key] = [
                  item["ShwName"],
                  moment(new Date()).format("YYYY-MM-DD"),
                  item["TypeCol"],
                  formula,
                ];
                break;
              case "KEY":
                nObject[key] = [
                  item["ShwName"],
                  "AUTO",
                  item["TypeCol"],
                  formula,
                ];
                break;
              default:
                if (item["TypeCol"].toUpperCase().search("NUMBER") > -1) {
                  nObject[key] = [item["ShwName"], 1, item["TypeCol"], formula];
                } else {
                  nObject[key] = [
                    item["ShwName"],
                    null,
                    item["TypeCol"],
                    formula,
                  ];
                }
                break;
            }
          }
        }
      });
      return nObject;
    }
  },
  //ver_2
  showDynamicFormAdd: (array) => {
    if (!array) return;
    if (array.length > 0) {
      const newArr = [];
      array.forEach((e) => {
        if (e.IsHide == 0) {
          let obj = {};
          switch (e.TypeCol.toUpperCase()) {
            case "KEY":
              obj.name = e.ClName;
              obj.label = e.ShwName;
              obj.value = "AUTO";
              obj.type = e.TypeCol.toUpperCase();
              obj.sortNum = e.SortNum ?? 0;
              obj.sizeCol = e.SizeCol ?? 6;
              obj.isValid = e.IsValid ?? false;
              break;
            case "DATE":
              obj.name = e.ClName;
              obj.label = e.ShwName;
              obj.value = moment(new Date()).format("YYYY-MM-DD");
              obj.type = e.TypeCol.toUpperCase();
              obj.sortNum = e.SortNum;
              obj.sizeCol = e.SizeCol ?? 6;
              obj.isValid = e.IsValid ?? true;
              break;
            case "NUMBER":
              obj.name = e.ClName;
              obj.label = e.ShwName;
              obj.value = 0;
              obj.type = e.TypeCol.toUpperCase();
              obj.sortNum = e.SortNum;
              obj.sizeCol = e.SizeCol ?? 6;
              obj.isValid = e.IsValid ?? true;
              break;
            case "SELECT":
              obj.name = e.ClName;
              obj.label = e.ShwName;
              obj.value = null;
              obj.type = e.TypeCol.toUpperCase();
              obj.sortNum = e.SortNum;
              obj.sizeCol = e.SizeCol ?? 6;
              obj.isValid = e.IsValid ?? true;
              break;
            case "DESCRIPTION":
            case "NOTE":
              obj.name = e.ClName;
              obj.label = e.ShwName;
              obj.value = "";
              obj.type = e.TypeCol.toUpperCase();
              obj.sortNum = e.SortNum;
              obj.sizeCol = e.SizeCol ?? 12;
              obj.isValid = e.IsValid ?? false;
              break;
            default:
              obj.name = e.ClName;
              obj.label = e.ShwName;
              obj.value = null;
              obj.type = e.TypeCol.toUpperCase();
              obj.sortNum = e.SortNum;
              obj.sizeCol = e.SizeCol ?? 6;
              obj.isValid = e.IsValid ?? true;
              break;
          }
          newArr.push(obj);
        }
      });
      newArr.sort((min, max) => {
        return min.sortNum - max.sortNum;
      });
      return newArr;
    }
  },
  showDynamicFormEdit: (array, data) => {
    if (!array) return;
    if (array.length > 0) {
      const newArr = [];
      array.forEach((e) => {
        if (e.IsHide == 0) {
          let obj = {};
          switch (e.TypeCol.toUpperCase()) {
            case "KEY":
              obj.name = e.ClName;
              obj.label = e.ShwName;
              obj.value = "AUTO";
              obj.type = e.TypeCol.toUpperCase();
              obj.sortNum = e.SortNum ?? 0;
              obj.sizeCol = e.SizeCol ?? 6;
              obj.isValid = e.IsValid ?? true;
              break;
            case "DATE":
              obj.name = e.ClName;
              obj.label = e.ShwName;
              obj.value = moment(new Date()).format("YYYY-MM-DD");
              obj.type = e.TypeCol.toUpperCase();
              obj.sortNum = e.SortNum;
              obj.sizeCol = e.SizeCol ?? 6;
              obj.isValid = e.IsValid ?? true;
              break;
            case "NUMBER":
              obj.name = e.ClName;
              obj.label = e.ShwName;
              obj.value = 0;
              obj.type = e.TypeCol.toUpperCase();
              obj.sortNum = e.SortNum;
              obj.sizeCol = e.SizeCol ?? 6;
              obj.isValid = e.IsValid ?? true;
              break;
            case "SELECT":
              obj.name = e.ClName;
              obj.label = e.ShwName;
              obj.value = null;
              obj.type = e.TypeCol.toUpperCase();
              obj.sortNum = e.SortNum;
              obj.sizeCol = e.SizeCol ?? 6;
              obj.isValid = e.IsValid ?? true;
              break;
            case "DESCRIPTION":
            case "NOTE":
              obj.name = e.ClName;
              obj.label = e.ShwName;
              obj.value = "";
              obj.type = e.TypeCol.toUpperCase();
              obj.sortNum = e.SortNum;
              obj.sizeCol = e.SizeCol ?? 12;
              obj.isValid = e.IsValid ?? false;
              break;
            default:
              obj.name = e.ClName;
              obj.label = e.ShwName;
              obj.value = null;
              obj.type = e.TypeCol.toUpperCase();
              obj.sortNum = e.SortNum;
              obj.sizeCol = e.SizeCol ?? 6;
              obj.isValid = e.IsValid ?? true;
              break;
          }
          newArr.push(obj);
        }
      });
      for (const key in data) {
        newArr.forEach((f) => {
          if (f.name == key) {
            f.value = data[key];
          }
        });
      }
      newArr.sort((min, max) => {
        return min.sortNum - max.sortNum;
      });
      return newArr;
    }
  },

  showExtensionFormEdit: (data) => {
    if (!data) return;
    let nObject = {};
    if (data["Properties"].length > 0) {
      data["Properties"].forEach((item) => {
        if (item["IsHide"] === 0) {
          let key = item["ClName"];
          let formula =
            item["Formula"] && item["Formula"].length > 0
              ? item["Formula"]
              : null;
          switch (item["TypeCol"].toUpperCase()) {
            case "DATE":
              nObject[key] = [
                item["ShwName"],
                handleCustom.convertDateForm(data[key]),
                item["TypeCol"],
                formula,
              ];
              break;
            default:
              if (item["TypeCol"].toUpperCase().search("NUMBER") > -1) {
                nObject[key] = [
                  item["ShwName"],
                  parseInt(data[key]),
                  item["TypeCol"],
                  formula,
                ];
              } else {
                nObject[key] = [
                  item["ShwName"],
                  data[key],
                  item["TypeCol"],
                  formula,
                ];
              }
              break;
          }
        }
      });
    }
    return nObject;
  },
};

export default handleCustom;
