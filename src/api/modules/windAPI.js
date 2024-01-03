import axiosClient from "../index";

const windAPI = {
  /** Component: dashboards/wind/DashboardWind **/
  windDashboard: () => {
    const url = "/api/Dashboard/GetDashboard_Wind";
    return axiosClient.post(url);
  },
  windDashboardCCTV: () => {
    const url = "/api/Dashboard/GetCCTV";
    return axiosClient.post(url);
  },
  /** Component: report/wind/WindElectricReport **/

  getActiveMonitorLocation: () => {
    const url = "/api/MonitorLocations/GetActive";
    return axiosClient.post(url);
  },
  getReportCameraOrSpeaker: (body = {}) => {
    const url = "/api/ReportWinds/Get";
    return axiosClient.post(url, body);
  },
};

export default windAPI;
