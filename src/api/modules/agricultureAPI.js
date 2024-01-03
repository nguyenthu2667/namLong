import axiosClient from "../index";

const agricultureAPI = {
  /** Component: dashboards/agriculture/agriculture/DashboardMaster **/
  agriStationGet: () => {
    const url = "/api/agriStations/Get";
    return axiosClient.post(url);
  },
  agriStationChart: (type, body = {}) => {
    let path;
    switch (type) {
      case "DAY":
        path = "/api/AquaStationCharts/Day";
        break;
      case "MONTH":
        path = "/api/AquaStationCharts/Month";
        break;
      case "YEAR":
        path = "/api/AquaStationCharts/Year";
        break;
    }
    return axiosClient.post(path, body);
  },
  agriNodeChart: (type, body = {}) => {
    let path;
    switch (type) {
      case "DAY":
        path = "/api/AquaNodeCharts/Day";
        break;
      case "MONTH":
        path = "/api/AquaNodeCharts/Month";
        break;
      case "YEAR":
        path = "/api/AquaNodeCharts/Year";
        break;
    }
    return axiosClient.post(url, body);
  },
  agriDashboard: () => {
    const url = "/api/Dashboard/GetDashboard_ByAgriculture";
    return axiosClient.post(url);
  },
  agriStationExtrasControl: (body = {}) => {
    const url = "/api/StationExtras/Control";
    return axiosClient.post(url, body);
  },
  /** Component: category/aqua/Agriculture **/
  AgriPondGet: (body = {}) => {
    const url = "/api/AgriStations/Get";
    return axiosClient.post(url, body);
  },
  AgriPondByID: (body = {}) => {
    const url = "/api/AgriStations/GetById";
    return axiosClient.post(url, body);
  },
  AgriPondChangeStatus: (body = {}) => {
    const url = "/api/AgriStations/ChangeStatus";
    return axiosClient.post(url, body);
  },
  AgriPondRemove: (body = {}) => {
    const url = "/api/AgriStations/Delete";
    return axiosClient.post(url, body);
  },

  //node
  NodeListByID: (body = {}) => {
    const url = "/api/StationNodes/Get";
    return axiosClient.post(url, body);
  },
  NodeChangeStatus: (body = {}) => {
    const url = "/api/StationNodes/ChangeStatus";
    return axiosClient.post(url, body);
  },
  NodeByID: (body = {}) => {
    const url = "/api/StationNodes/GetById";
    return axiosClient.post(url, body);
  },
  NodeRemove: (body = {}) => {
    const url = "/api/StationNodes/Delete";
    return axiosClient.post(url, body);
  },

  //extras
  ExtrasListByID: (body = {}) => {
    const url = "/api/StationExtras/Get";
    return axiosClient.post(url, body);
  },

  ExtrasChangeStatus: (body = {}) => {
    const url = "/api/StationExtras/ChangeStatus";
    return axiosClient.post(url, body);
  },
  //FinishedProduct
  ExtrasByID: (body = {}) => {
    const url = "/api/StationExtras/GetById";
    return axiosClient.post(url, body);
  },
  ExtrasRemove: (body = {}) => {
    const url = "/api/StationExtras/Delete";
    return axiosClient.post(url, body);
  },
  stationExtrasControl: (body = {}) => {
    const url = "/api/StationExtras/Control";
    return axiosClient.post(url, body);
  },
  /** Component: funtion/Agri **/
  agriList: () => {
    const url = "/api/Monitors/GetAgriculture";
    return axiosClient.post(url);
  },
};

export default agricultureAPI;
