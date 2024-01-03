import axiosClient from "../index";

const nplAPI = {
  //map
  //dashboards
  //category-global-category
  getCategoryList: (body = null) => {
    const url = "/api/NPLCategories/Get";
    return axiosClient.post(url, body);
  },
  getCategoryActive: (body) => {
    const url = "/api/NPLCategories/GetActive";
    return axiosClient.post(url, body);
  },
  getCategoryByID: (body) => {
    const url = "/api/NPLCategories/GetById";
    return axiosClient.post(url, body);
  },
  addCategory: (body) => {
    const url = "/api/NPLCategories/Add";
    return axiosClient.post(url, body);
  },
  editCategory: (body) => {
    const url = "/api/NPLCategories/Edit";
    return axiosClient.post(url, body);
  },
  deleteCategory: (body) => {
    const url = "/api/NPLCategories/Delete";
    return axiosClient.post(url, body);
  },
  changeStatusCategory: (body) => {
    const url = "/api/NPLCategories/ChangeStatus";
    return axiosClient.post(url, body);
  },
  // customer-category
  getCustomerList: (body) => {
    const url = "/api/nPLCustomers/Get";
    return axiosClient.post(url, body);
  },
  getCustomerByID: (body) => {
    const url = "/api/nPLCustomers/GetById";
    return axiosClient.post(url, body);
  },
  changeStatusCustomer: (body) => {
    const url = "/api/nPLCustomers/ChangeStatus";
    return axiosClient.post(url, body);
  },
  deleteCustomer: (body) => {
    const url = "/api/nPLCustomers/Delete";
    return axiosClient.post(url, body);
  },
  editCustomer: (body) => {
    const url = "/api/nPLCustomers/Edit";
    return axiosClient.post(url, body);
  },
  addCustomer: (body) => {
    const url = "/api/nPLCustomers/Add";
    return axiosClient.post(url, body);
  },
  resetPasswordCustomer: (body) => {
    const url = "/api/nPLCustomers/ResetPassword";
    return axiosClient.post(url, body);
  },
  searchCustomer: (body) => {
    const url = "/api/nPLCustomers/Search";
    return axiosClient.post(url, body);
  },
  getCustomersDetail: (body) => {
    const url = "/api/nPLCustomersDetails/Get";
    return axiosClient.post(url, body);
  },
  getCustomersDetailsByID: (body) => {
    const url = "/api/nPLCustomersDetails/GetById";
    return axiosClient.post(url, body);
  },
  addCustomersDetails: (body) => {
    const url = "/api/nPLCustomersDetails/Add";
    return axiosClient.post(url, body);
  },
  editCustomersDetails: (body) => {
    const url = "/api/nPLCustomersDetails/Edit";
    return axiosClient.post(url, body);
  },
  deleteCustomersDetails: (body) => {
    const url = "/api/nPLCustomersDetails/Delete";
    return axiosClient.post(url, body);
  },
  // driver-category
  getDriverList: (body) => {
    const url = "/api/NPLDrivers/Get";
    return axiosClient.post(url, body);
  },
  getDriverByID: (body) => {
    const url = "/api/NPLDrivers/GetById";
    return axiosClient.post(url, body);
  },
  addDriver: (body) => {
    const url = "/api/NPLDrivers/Add";
    return axiosClient.post(url, body);
  },
  editDriver: (body) => {
    const url = "/api/NPLDrivers/Edit";
    return axiosClient.post(url, body);
  },
  deleteDriver: (body) => {
    const url = "/api/NPLDrivers/Delete";
    return axiosClient.post(url, body);
  },
  resetPasswordDriver: (body) => {
    const url = "/api/NPLDrivers/ResetPassword";
    return axiosClient.post(url, body);
  },
  changeStatusDriver: (body) => {
    const url = "/api/NPLDrivers/ChangeStatus";
    return axiosClient.post(url, body);
  },
  //DriveHelper-category
  getDriveHelperList: (body) => {
    const url = "/api/NPLDriveHelpers/Get";
    return axiosClient.post(url, body);
  },
  getDriveHelperActive: (body) => {
    const url = "/api/NPLDriveHelpers/GetActive";
    return axiosClient.post(url, body);
  },
  getDriveHelperByID: (body) => {
    const url = "/api/NPLDriveHelpers/GetById";
    return axiosClient.post(url, body);
  },
  addDriveHelper: (body) => {
    const url = "/api/NPLDriveHelpers/Add";
    return axiosClient.post(url, body);
  },
  editDriveHelper: (body) => {
    const url = "/api/NPLDriveHelpers/Edit";
    return axiosClient.post(url, body);
  },
  deleteDriveHelper: (body) => {
    const url = "/api/NPLDriveHelpers/Delete";
    return axiosClient.post(url, body);
  },
  changeStatusDriveHelper: (body) => {
    const url = "/api/NPLDriveHelpers/ChangeStatus";
    return axiosClient.post(url, body);
  },
  //Routes-category
  getRoutesList: (body) => {
    const url = "/api/nPLRoutes/Get";
    return axiosClient.post(url, body);
  },
  getRoutesActive: (body) => {
    const url = "/api/nPLRoutes/GetActive";
    return axiosClient.post(url, body);
  },
  getRoutesByID: (body) => {
    const url = "/api/nPLRoutes/GetById";
    return axiosClient.post(url, body);
  },
  changeStatusRoutes: (body) => {
    const url = "/api/nPLRoutes/ChangeStatus";
    return axiosClient.post(url, body);
  },
  deleteRoutes: (body) => {
    const url = "/api/nPLRoutes/Delete";
    return axiosClient.post(url, body);
  },
  addRoutes: (body) => {
    const url = "/api/nPLRoutes/Add";
    return axiosClient.post(url, body);
  },
  editRoutes: (body) => {
    const url = "/api/nPLRoutes/Edit";
    return axiosClient.post(url, body);
  },
  checkRoutes: (body) => {
    const url = "/api/nPLRoutes/Check";
    return axiosClient.post(url, body);
  },
  //SMRM-category
  getVehiclesList: (body) => {
    const url = "/api/nPLVehicles/Get";
    return axiosClient.post(url, body);
  },
  getVehiclesListActive: (body) => {
    const url = "/api/nPLVehicles/GetActive";
    return axiosClient.post(url, body);
  },
  getVehiclesByID: (body) => {
    const url = "/api/nPLVehicles/GetById";
    return axiosClient.post(url, body);
  },
  addVehicles: (body) => {
    const url = "/api/nPLVehicles/Add";
    return axiosClient.post(url, body);
  },
  editVehicles: (body) => {
    const url = "/api/nPLVehicles/Edit";
    return axiosClient.post(url, body);
  },
  deleteVehicles: (body) => {
    const url = "/api/nPLVehicles/Delete";
    return axiosClient.post(url, body);
  },
  changeStatusVehicles: (body) => {
    const url = "/api/nPLVehicles/ChangeStatus";
    return axiosClient.post(url, body);
  },
  getByTeamVehicleID: (body) => {
    const url = "/api/nPLVehicles/GetByTeamVehicleID";
    return axiosClient.post(url, body);
  },
  getByStationVehicleID: (body) => {
    const url = "/api/nPLVehicles/GetByStationVehicleID";
    return axiosClient.post(url, body);
  },
  getCustom: () => {
    const url = "";
    return axiosClient.post(url);
  },
  //region
  getRegionsByID: (body) => {
    const url = "/api/NPLRegions/GetById";
    return axiosClient.post(url, body);
  },
  addRegions: (body) => {
    const url = "/api/NPLRegions/Add";
    return axiosClient.post(url, body);
  },
  editRegions: (body) => {
    const url = "/api/NPLRegions/Edit";
    return axiosClient.post(url, body);
  },
  deleteRegions: (body) => {
    const url = "/api/NPLRegions/Delete";
    return axiosClient.post(url, body);
  },
  // security
  getCustom: () => {
    const url = "";
    return axiosClient.post(url);
  },
  // report
  getCustom: () => {
    const url = "";
    return axiosClient.post(url);
  },
  //other
  getUserList: (body) => {
    const url = "/api/user/GetListUser";
    return axiosClient.post(url, body);
  },
  getRegionList: (body) => {
    const url = "/api/NPLRegions/Get";
    return axiosClient.post(url, body);
  },
  getMethodSearch: (body) => {
    const url = "/api/customize/GetMethod";
    return axiosClient.post(url, body);
  },
  getCities: (body) => {
    const url = "/api/NPLRegions/GetByLevel";
    return axiosClient.post(url, body);
  },
  getDistrictsWards: (body) => {
    const url = "/api/NPLRegions/GetByParentID";
    return axiosClient.post(url, body);
  },
  //attachFile
  getAttachFile: (body) => {
    const url = '/api/AttachFiles/Get'
    return axiosClient.post(url, body);
  },
  addAttachFile: (body) => {
    const url = '/api/AttachFiles/Add'
    return axiosClient.post(url, body);
  },
  editAttachFile: (body) => {
    const url = '/api/AttachFiles/Edit'
    return axiosClient.post(url, body);
  },
  deleteAttachFile: (body) => {
    const url = '/api/AttachFiles/Delete'
    return axiosClient.post(url, body);
  },
  //print
  getFormPrint: (body) => {
    const url = '/api/FormPrint/Get'
    return axiosClient.post(url, body);
  },
  //find
  search: (body) => {
    const url = '/api/Search/Get'
    return axiosClient.post(url, body);
  },
  //importExcel
  importExcel: (body) => {
    const url = '/api/ImportData/ImportExcel'
    return axiosClient.post(url, body);
  },
  //config company
  getCompanyConfig: (body) => {
    const url = '/api/CompanyConfig/Get'
    return axiosClient.post(url, body);
  },
  editCompanyConfig: (body) => {
    const url = '/api/CompanyConfig/Edit'
    return axiosClient.post(url, body);
  },
  //allowances-function
  getAllowances: (body) => {
    const url = '/api/Allowances/Get'
    return axiosClient.post(url, body);
  },
  getAllowancesByID: (body) => {
    const url = '/api/Allowances/GetById'
    return axiosClient.post(url, body);
  },
  addAllowances: (body) => {
    const url = '/api/Allowances/Add'
    return axiosClient.post(url, body);
  },
  editAllowances: (body) => {
    const url = '/api/Allowances/Edit'
    return axiosClient.post(url, body);
  },
  deleteAllowances: (body) => {
    const url = '/api/Allowances/Delete'
    return axiosClient.post(url, body);
  },
  copyAllowances: (body) => {
    const url = '/api/Allowances/Copy'
    return axiosClient.post(url, body);
  },
  changeStatusAllowances: (body) => {
    const url = '/api/Allowances/ChangeStatus'
    return axiosClient.post(url, body);
  },
  //bảo trì, bảo dưỡng
  getMaintenance: (body) => {
    const url = '/api/MaintenanceAllowances/Get'
    return axiosClient.post(url, body);
  },
  getAlloMaintenanceByID: (body) => {
    const url = '/api/MaintenanceAllowances/GetById'
    return axiosClient.post(url, body);
  },
  addMaintenance: (body) => {
    const url = '/api/MaintenanceAllowances/Add'
    return axiosClient.post(url, body);
  },
  editMaintenance: (body) => {
    const url = '/api/MaintenanceAllowances/Edit'
    return axiosClient.post(url, body);
  },
  deleteMaintenance: (body) => {
    const url = '/api/MaintenanceAllowances/Delete'
    return axiosClient.post(url, body);
  },
  copyMaintenance: (body) => {
    const url = '/api/MaintenanceAllowances/Copy'
    return axiosClient.post(url, body);
  },
  changeStatusMaintenance: (body) => {
    const url = '/api/MaintenanceAllowances/ChangeStatus'
    return axiosClient.post(url, body);
  },
  //phụ cấp dầu
  oilAllowancesGet: (body) => {
    const url = 'api/OilAllowances/Get'
    return axiosClient.post(url, body);
  },
  oilAllowancesGetById: (body) => {
    const url = 'api/OilAllowances/GetById'
    return axiosClient.post(url, body);
  },
  oilAllowancesAdd: (body) => {
    const url = 'api/OilAllowances/Add'
    return axiosClient.post(url, body);
  },
  oilAllowancesEdit: (body) => {
    const url = 'api/OilAllowances/Edit'
    return axiosClient.post(url, body);
  },
  oilAllowancesDelete: (body) => {
    const url = 'api/OilAllowances/Delete'
    return axiosClient.post(url, body);
  },
  oilAllowancesCopy: (body) => {
    const url = 'api/OilAllowances/Copy'
    return axiosClient.post(url, body);
  },
  oilAllowancesGoodsTypes: (body) => {
    const url = 'api/OilAllowances/GoodTypes'
    return axiosClient.post(url, body);
  },
  oilAllowancesRoutes: (body) => {
    const url = 'api/OilAllowances/Routes'
    return axiosClient.post(url, body);
  },
  oilAllowancesVehicles: (body) => {
    const url = 'api/OilAllowances/Vehicles'
    return axiosClient.post(url, body);
  },
  oilAllowancesChangeStatus: (body) => {
    const url = 'api/OilAllowances/ChangeStatus'
    return axiosClient.post(url, body);
  },
  //chi phí cho tuyến đường
  routeAllowancesGet: (body) => {
    const url = '/api/RouteAllowances/Get'
    return axiosClient.post(url, body)
  },
  routeAllowancesGetById: (body) => {
    const url = '/api/RouteAllowances/GetById'
    return axiosClient.post(url, body)
  },
  routeAllowancesAdd: (body) => {
    const url = '/api/RouteAllowances/Add'
    return axiosClient.post(url, body)
  },
  routeAllowancesEdit: (body) => {
    const url = '/api/RouteAllowances/Edit'
    return axiosClient.post(url, body)
  },
  routeAllowancesDelete: (body) => {
    const url = '/api/RouteAllowances/Delete'
    return axiosClient.post(url, body)
  },
  routeAllowancesCopy: (body) => {
    const url = '/api/RouteAllowances/Copy'
    return axiosClient.post(url, body)
  },
  routeAllowancesChangeStatus: (body) => {
    const url = '/api/RouteAllowances/ChangeStatus'
    return axiosClient.post(url, body)
  },
};

export default nplAPI;