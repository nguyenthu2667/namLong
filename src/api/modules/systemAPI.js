import axiosClient from "../index";

const systemAPI = {
  getLanguages: () => {
    const url = "/api/config/ChoseLanguage";
    return axiosClient.post(url);
  },
  //menu
  getMenus: (body = {}) => {
    const url = "/api/menu/GetMenuRightByGroupID";
    return axiosClient.post(url, body);
  },
  menuByGroupID: (body) => {
    const url = "/api/menu/GetListMenuByGroupID";
    return axiosClient.post(url, body);
  },
  menuEditAuthorization: (body) => {
    const url = "/api/menu/EditMenuRightByGroupID";
    return axiosClient.post(url, body);
  },
  //other
  tableFields: (body) => {
    const url = "/api/customize/GetColumnShow";
    return axiosClient.post(url, body);
  },
  modalFields: (body) => {
    const url = "/api/customize/GetColumnShowByObjectName";
    return axiosClient.post(url, body);
  },
  getConnectType: () => {
    const url = "/api/ConnectTypes/GetListConnectType";
    return axiosClient.post(url);
  },
  //get options LayersByCreen
  getDataTypeByID: (body) => {
    const url = "/api/DataTypes/GetDataTypeByScreen";
    return axiosClient.post(url, body);
  },
  //regions
  regionList: (body) => {
    const url = "/api/Regions/GetRegionListActive";
    return axiosClient.post(url, body);
  },
  /** Submit All Form **/
  submitData: (url, body) => {
    return axiosClient.post(url, body);
  },
  /** Component:  config/system/Menu  **/
  menuList: () => {
    const url = "/api/menu/GetListMenu";
    return axiosClient.post(url);
  },
  menuByID: (body) => {
    const url = "/api/menu/GetMenuById";
    return axiosClient.post(url, body);
  },
  menuChangeStatus: (body) => {
    const url = "/api/menu/EditStatus";
    return axiosClient.post(url, body);
  },

  //Data Type
  dataTypeList: () => {
    const url = "/api/DataTypes/GetListDataType";
    return axiosClient.post(url, {});
  },
  dataTypeListActive: () => {
    const url = "/api/DataTypes/GetListDataTypeActive";
    return axiosClient.post(url, {});
  },
  dataTypeByID: (body) => {
    const url = "/api/DataTypes/GetDataTypeById";
    return axiosClient.post(url, body);
  },
  dataTypeChangeStatus: (body) => {
    const url = "/api/DataTypes/ChangeStatusDatatype";
    return axiosClient.post(url, body);
  },
  dataTypeRemove: (body) => {
    const url = "/api/DataTypes/DeleteDataType";
    return axiosClient.post(url, body);
  },

  //Backups
  getBackups: () => {
    const url = "/api/Backups/Get";
    return axiosClient.post(url);
  },
  updateBackups: (body) => {
    const url = "/api/Backups/Update";
    return axiosClient.post(url, body);
  },

  //Device index
  shareDeviceList: () => {
    const url = "/api/DeviceInfos/GetListDeviceInfo";
    return axiosClient.post(url, {});
  },
  shareDeviceByID: (body) => {
    const url = "/api/DeviceInfos/GetListDeviceInfosById";
    return axiosClient.post(url, body);
  },
  shareDeviceChangeStatus: (body) => {
    const url = "/api/DeviceInfos/ChangeStatusDeviceInfo";
    return axiosClient.post(url, body);
  },
  shareDeviceRemove: (body) => {
    const url = "/api/DeviceInfos/DeleteDeviceInfo";
    return axiosClient.post(url, body);
  },

  //Get list GeoCode
  getListGeoCode: () => {
    const url = "/api/StationRights_ByGroup/GetGeoCode";
    return axiosClient.post(url);
  },

  //upload-images-base64
  uploadImagesBase64: (body = {}) => {
    const url = "/api/StationImages/UploadBase64Strings";
    return axiosClient.post(url, body);
  },
  getImagesByID: (body = {}) => {
    const url = "/api/StationImages/GetByID";
    return axiosClient.post(url, body);
  },

  //group-user
  groupUserList: () => {
    const url = "/api/groupuser/GetListGroupUser";
    return axiosClient.post(url);
  },
  groupUserByID: (body = {}) => {
    const url = "/api/groupuser/GetGroupUserByID";
    return axiosClient.post(url, body);
  },
  groupUserChangeStatus: (body = {}) => {
    const url = "/api/groupuser/EditStatusGroupUser";
    return axiosClient.post(url, body);
  },
  groupUserRemove: (body = {}) => {
    const url = "/api/groupuser/DelGroupUser";
    return axiosClient.post(url, body);
  },

  //maintain-deploy
  groupEmployerList: (body = {}) => {
    const url = "/api/GroupEmployers/GetGroupEmployerList";
    return axiosClient.post(url, body);
  },
  groupEmployerListActive: (body = {}) => {
    const url = "/api/GroupEmployers/GetGroupEmployerActive";
    return axiosClient.post(url, body);
  },
  groupEmployerByID: (body = {}) => {
    const url = "/api/GroupEmployers/GetGroupEmployerById";
    return axiosClient.post(url, body);
  },
  groupEmployerChangeStatus: (body = {}) => {
    const url = "/api/GroupEmployers/ChangeStatus";
    return axiosClient.post(url, body);
  },
  groupEmployerRemove: (body = {}) => {
    const url = "/api/GroupEmployers/Delete";
    return axiosClient.post(url, body);
  },
  //decentralization
  stationRights: (body = {}) => {
    const url = "/api/StationRights_ByGroup/Get";
    return axiosClient.post(url, body);
  },
  editStationRights: (body = {}) => {
    const url = "/api/StationRights_ByGroup/Edit";
    return axiosClient.post(url, body);
  },

  //clients
  groupgetCustomerListActive: (body = {}) => {
    const url = "/api/GroupCustomers/GetActive";
    return axiosClient.post(url, body);
  },
  layerRight: (body = {}) => {
    const url = "/api/StationRights_ByGroup/Get";
    return axiosClient.post(url, body);
  },
  layerRightEdit: (body = {}) => {
    const url = "/api/StationRights_ByGroup/Edit";
    return axiosClient.post(url, body);
  },
  postExcel: (body = {}) => {
    const url = "/api/ImportData/NLImportExcel";
    return axiosClient.post(url, body);
  },

  getCompanyConfig: (body) => {
    const url = "/api/CompanyConfig/Get";
    return axiosClient.post(url, body);
  },
};

export default systemAPI;
