import axiosClient from "../index";

const fireAPI = {
  getDashboard: () => {
    const url = "/api/DashboardFires/Get";
    return axiosClient.post(url);
  },
  getHistory: () => {
    const url = "/api/DashboardFires/GetHistoryFire";
    return axiosClient.post(url);
  },
  getStatusColors: (body) => {
    const url = "/api/DashboardFires/GetFireWarningStatus";
    return axiosClient.post(url, body);
  },
  getRoomByID: (body) => {
    const url = "/api/DashboardFires/GetDetails";
    return axiosClient.post(url, body);
  },
  getReportTotal: (body) => {
    const url = "/api/ReportFires/Totals";
    return axiosClient.post(url, body);
  },
  //category
  fireLocationGet: (body = null) => {
    const url = "/api/FireLocations/Get";
    return axiosClient.post(url, body);
  },
  fireLocationActive: (body = null) => {
    const url = "/api/FireLocations/GetActive";
    return axiosClient.post(url, body);
  },
  fireLocationByID: (body = null) => {
    const url = "/api/FireLocations/GetById";
    return axiosClient.post(url, body);
  },
  fireLocationChangeStatus: (body = null) => {
    const url = "/api/FireLocations/ChangeStatus";
    return axiosClient.post(url, body);
  },
  addFireLocation: (body = null) => {
    const url = "/api/FireLocations/Add";
    return axiosClient.post(url, body);
  },
  editFireLocation: (body = null) => {
    const url = "/api/FireLocations/Edit";
    return axiosClient.post(url, body);
  },
  fireLocationRemove: (body = null) => {
    const url = "/api/FireLocations/Delete";
    return axiosClient.post(url, body);
  },

  //station
  fireStationGet: (body = null) => {
    const url = "/api/FireStations/Get";
    return axiosClient.post(url, body);
  },
  fireStationByID: (body = null) => {
    const url = "/api/FireStations/GetById";
    return axiosClient.post(url, body);
  },
  fireStationGetActive: (body = null) => {
    const url = "/api/FireStations/GetActive";
    return axiosClient.post(url, body);
  },
  fireStationChangeStatus: (body = null) => {
    const url = "/api/FireStations/ChangeStatus";
    return axiosClient.post(url, body);
  },
  otherStatusChangeStatus: (body = null) => {
    const url = "/api/FireStations/ChangeTest";
    return axiosClient.post(url, body);
  },
  nodeStatusChangeStatus: (body = null) => {
    const url = "/api/FireNodes/ChangeStatus";
    return axiosClient.post(url, body);
  },
  fireStationRemove: (body = null) => {
    const url = "/api/FireStations/Delete";
    return axiosClient.post(url, body);
  },
  fireStationExportProduct: (body = null) => {
    const url = "/api/FireStations/ExportProduct";
    return axiosClient.post(url, body);
  },
  fireStationGetDeploy: (body = null) => {
    const url = "/api/FireStations/GetDeploy";
    return axiosClient.post(url, body);
  },
  fireStationEditLocation: (body = null) => {
    const url = "/api/FireStations/EditLocation";
    return axiosClient.post(url, body);
  },
  fireStationDelLocation: (body = null) => {
    const url = "/api/FireStations/DelLocation";
    return axiosClient.post(url, body);
  },
  fireStationEditDeploy: (body = null) => {
    const url = "/api/FireStations/EditDeploy";
    return axiosClient.post(url, body);
  },
  fireStationsByLocationID: (body = null) => {
    const url = "/api/FireStations/Get_ByLocationID";
    return axiosClient.post(url, body);
  },
  //node
  nodeByID: (body = null) => {
    const url = "/api/FireNodes/GetById";
    return axiosClient.post(url, body);
  },
  nodeStatusChangeStatus: (body = null) => {
    const url = "/api/FireNodes/ChangeStatus";
    return axiosClient.post(url, body);
  },
  nodeRemove: (body = null) => {
    const url = "/api/FireNodes/Delete";
    return axiosClient.post(url, body);
  },
  getNodesByID: (body = null) => {
    const url = "/api/FireNodes/Get";
    return axiosClient.post(url, body);
  },
  getExportList: (body = null) => {
    const url = "/api/FireStations/GetListExport";
    return axiosClient.post(url, body);
  },
  fireNodesExport: (body = null) => {
    const url = "/api/FireNodes/Export";
    return axiosClient.post(url, body);
  },
  fireNodesGetTypeID: (body = null) => {
    const url = "/api/FireNodes/GetTypeID";
    return axiosClient.post(url, body);
  },
  fireNodesGetByLocationID: (body = null) => {
    const url = "/api/FireNodes/GetByLocationID";
    return axiosClient.post(url, body);
  },
  fireNodesGetDeploy: (body = null) => {
    const url = "/api/FireNodes/GetDeploy";
    return axiosClient.post(url, body);
  },
  fireNodesEditLocation: (body = null) => {
    const url = "/api/FireNodes/EditLocation";
    return axiosClient.post(url, body);
  },
  fireNodesDelLocation: (body = null) => {
    const url = "/api/FireNodes/DelLocation";
    return axiosClient.post(url, body);
  },
  fireNodesEditDeploy: (body = null) => {
    const url = "/api/FireNodes/EditDeploy";
    return axiosClient.post(url, body);omm
  },

  //location detail
  fireLocationDetailGet: (body = null) => {
    const url = "/api/FireLocationDetails/Get";
    return axiosClient.post(url, body);
  },
  fireLocationDetailGetActive: (body = null) => {
    const url = "/api/FireLocationDetails/GetActive";
    return axiosClient.post(url, body);
  },
  fireLocationDetailByID: (body = null) => {
    const url = "/api/FireLocationDetails/GetById";
    return axiosClient.post(url, body);
  },
  fireLocationDetailChangeStatus: (body = null) => {
    const url = "/api/FireLocationDetails/ChangeStatus";
    return axiosClient.post(url, body);
  },
  fireLocationDetailDelete: (body = null) => {
    const url = "/api/FireLocationDetails/Delete";
    return axiosClient.post(url, body);
  },
  fireLocationDetailsGetType1: (body = null) => {
    const url = "/api/FireLocationDetails/GetType1";
    return axiosClient.post(url, body);
  },
  fireLocationDetailsGetType2: (body = null) => {
    const url = "/api/FireLocationDetails/GetType2";
    return axiosClient.post(url, body);
  },
  fireLocationEditNameLocationDetails: (body = null) => {
    const url = "/api/FireLocationDetails/EditNameLocationDetails";
    return axiosClient.post(url, body);
  },
};

export default fireAPI;
