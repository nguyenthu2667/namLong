import axiosClient from "../index";

const aquacultureAPI = {
  /** Component: dashboards/agriculture/aquaculture/DashboardMaster **/
  aquaStationGet: () => {
    const url = "/api/AquaStations/Get";
    return axiosClient.post(url);
  },
  aquaStationChart: (type, body) => {
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
  aquaNodeChart: (type, body) => {
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
    return axiosClient.post(path, body);
  },
  aquaDashboard: () => {
    const url = "/api/Dashboard/GetDashboard_ByAquaculture";
    return axiosClient.post(url);
  },
  aquaStationExtrasControl: (body) => {
    const url = "/api/StationExtras/Control";
    return axiosClient.post(url, body);
  },
  /** Component: funtion/Aqua **/
  aquaList: (body = null) => {
    const url = "/api/Monitors/GetAquaculture";
    return axiosClient.post(url, body);
  },
};

export default aquacultureAPI;
