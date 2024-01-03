import axiosClient from "../index";

const gasFamilyAPI = {
  gasFamilyTypeGet: () => {
    const url = "/api/GasTypes/Get";
    return axiosClient.post(url);
  },

  /** Component: category/thermal/ThermalCamera **/
  gasFamilyTypeGetActive: () => {
    const url = "/api/GasTypes/GetActive";
    return axiosClient.post(url);
  },
  gasFamilyTypeByID: (body) => {
    const url = "/api/GasTypes/GetById";
    return axiosClient.post(url, body);
  },
  gasFamilyTypeChangeStatus: (body) => {
    const url = "/api/GasTypes/ChangeStatus";
    return axiosClient.post(url, body);
  },
  gasFamilyTypeRemove: (body) => {
    const url = "/api/GasTypes/Delete";
    return axiosClient.post(url, body);
  },
  /** Component: category/thermal/ThermalKiosk **/
  gasFamilyFinishedProductGet: (body = {}) => {
    const url = "/api/StationByGasFamilys/GetListExport";
    return axiosClient.post(url, body);
  },
  gasFamilyFinishedProductRemove: (body = {}) => {
    const url = "/api/StationByGasFamilys/DeleteDeploy";
    return axiosClient.post(url, body);
  },
  gasFamilyFinishedProductByID: (body = {}) => {
    const url = "/api/StationByGasFamilys/GetById";
    return axiosClient.post(url, body);
  },
  /** Component: dashboards/thermal/kiosk/DashboardFollow **/
  gasFamilyCustomerGet: (body) => {
    const url = "/api/StationByGasFamilys/Get";
    return axiosClient.post(url, body);
  },
  gasFamilyCustomerChangeStatus: (body = {}) => {
    const url = "/api/StationByGasFamilys/ChangeStatus";
    return axiosClient.post(url, body);
  },
  gasFamilyCustomerRemove: (body = {}) => {
    const url = "/api/StationByGasFamilys/Delete";
    return axiosClient.post(url, body);
  },

  gasCustomerGetListDetect: (body) => {
    const url = "/api/GasDetectorByStations/Get";
    return axiosClient.post(url, body);
  },

  /** Component: category/waterways/WaterWayType **/
  gasCustomerGetLevelDetect: () => {
    const url = "/api/GasDetectorByStations/GetLevelDetect";
    return axiosClient.post(url);
  },
  gasCustomerDetectByID: (body) => {
    const url = "/api/GasDetectorByStations/GetById";
    return axiosClient.post(url, body);
  },

  /** Component: report/thermal/ThermalKiosk **/
  gasCustomerDetectChangeStatus: (body) => {
    const url = "/api/GasDetectorByStations/ChangeStatus";
    return axiosClient.post(url, body);
  },
  gasCustomerDetectRemove: (body = {}) => {
    const url = "/api/GasDetectorByStations/Delete";
    return axiosClient.post(url, body);
  },
  gasFamilyMonitor: (body = {}) => {
    const url = "/api/MonitorGasFamily/GetMonitor";
    return axiosClient.post(url, body);
  },

  /** Component: function/thermal/ThermalCamera **/
  gasFamilyReset: (body) => {
    const url = "/api/MonitorGasFamily/RestartStation";
    return axiosClient.post(url, body);
  },
  gasFamilyLogDetected: (body = {}) => {
    const url = "/api/ReportGasFamily/LogDetected";
    return axiosClient.post(url, body);
  },
  gasFamilyLogEndGas: (body = {}) => {
    const url = "/api/ReportGasFamily/LogEndGas";
    return axiosClient.post(url, body);
  },
  gasDetectorLeak: (body) => {
    const url = "/api/GasDetectorMonitors/GetDetectorByStationID";
    return axiosClient.post(url, body);
  },

  /** Component: category/waterways/WaterWaySignType **/
  gasFamilyDashboard: () => {
    const url = "/api/Dashboard/GetDashboard_ByGasFamily";
    return axiosClient.post(url);
  },
  gasFamilyChart: (body = {}) => {
    const url = "/api/ChartGasFamily/Get";
    return axiosClient.post(url, body);
  },
  gasFamilyHistory: () => {
    const url = "/api/ReportGasFamily/HistoryGasFamily";
    return axiosClient.post(url);
  },
  gasFamilyReportDetected: (body) => {
    const url = "/api/ReportGasFamily/ReportDetected";
    return axiosClient.post(url, body);
  },
  gasFamilyReportEndGas: (body) => {
    const url = "/api/ReportGasFamily/ReportEndGas";
    return axiosClient.post(url, body);
  },
};

export default gasFamilyAPI;
