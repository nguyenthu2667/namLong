import axiosClient from "../index";

const thermalAPI = {
  thermalCameraGet: () => {
    const url = "/api/StationByThermalCameras/Get";
    return axiosClient.post(url);
  },

  /** Component: category/thermal/ThermalCamera **/
  thermalCameraByID: (body = {}) => {
    const url = "/api/StationByThermalCameras/GetById";
    return axiosClient.post(url, body);
  },
  thermalCameraChangeStatus: (body) => {
    const url = "/api/StationByThermalCameras/ChangeStatus";
    return axiosClient.post(url, body);
  },
  thermalCameraRemove: (body) => {
    const url = "/api/StationByThermalCameras/Delete";
    return axiosClient.post(url, body);
  },
  thermalKioskGet: () => {
    const url = "/api/StationByKioskCameras/Get";
    return axiosClient.post(url);
  },
  /** Component: category/thermal/ThermalKiosk **/
  thermalKioskByID: (body = {}) => {
    const url = "/api/StationByKioskCameras/GetById";
    return axiosClient.post(url, body);
  },
  thermalKioskChangeStatus: (body = {}) => {
    const url = "/api/StationByKioskCameras/ChangeStatus";
    return axiosClient.post(url, body);
  },
  thermalKioskRemove: (body = {}) => {
    const url = "/api/StationByKioskCameras/Delete";
    return axiosClient.post(url, body);
  },
  /** Component: dashboards/thermal/kiosk/DashboardFollow **/
  thermalDashboardFollow: () => {
    const url = "/api/Dashboard/GetDashboard_ByKiosk";
    return axiosClient.post(url);
  },
  thermalDashboardAnalytics: (body = {}) => {
    const url = "/api/ChartKiosks/Get";
    return axiosClient.post(url, body);
  },
  thermalReportTop: (body = {}) => {
    const url = "/api/ReportKiosks/GetTop";
    return axiosClient.post(url, body);
  },

  /** Component: function/thermal/ThermalKiosk **/
  thermalKioskMonitor: () => {
    const url = "/api/MonitorKiosks/Get";
    return axiosClient.post(url);
  },

  /** Component: category/waterways/WaterWayType **/
  thermalKioskReset: (body) => {
    const url = "/api/StationMonitorByKiosks/SetRestart";
    return axiosClient.post(url, body);
  },
  thermalKioskCallback: (body) => {
    const url = "/api/StationMonitorByKiosks/SetCallBack";
    return axiosClient.post(url, body);
  },

  /** Component: report/thermal/ThermalKiosk **/
  thermalKioskReportList: () => {
    const url = "/api/ReportKiosks/GetList_CameraKiosk";
    return axiosClient.post(url);
  },
  thermalKioskReportData: (body = {}) => {
    const url = "/api/WaterwayTypes/ChangeStatus";
    return axiosClient.post(url, body);
  },
  thermalKioskReportNoData: (body = {}) => {
    const url = "/api/ReportKiosks/GetNoFace";
    return axiosClient.post(url, body);
  },

  /** Component: function/thermal/ThermalCamera **/
  thermalCameraMonitor: () => {
    const url = "/api/MonitorCameraThermals/Get";
    return axiosClient.post(url);
  },
  thermalCameraReset: (body = {}) => {
    const url = "/api/StationMonitorByCameraThermals/SetRestart";
    return axiosClient.post(url, body);
  },
  thermalEmployerReportData: (body = {}) => {
    const url = "/api/ReportKiosks/GetDataByDateByFaceID";
    return axiosClient.post(url, body);
  },
  thermalCameraDashboardFollow: () => {
    const url = "/api/Dashboard/GetDashboard_ByCameraThermal";
    return axiosClient.post(url);
  },

  /** Component: category/waterways/WaterWaySignType **/
  thermalCameraDashboardAnalytics: (body = {}) => {
    const url = "/api/ChartCameraThermals/Get";
    return axiosClient.post(url, body);
  },
  thermalCameraReportTop: (body = {}) => {
    const url = "/api/ReportCameraThermals/GetTop";
    return axiosClient.post(url, body);
  },
  thermalCamerakReportList: (body) => {
    const url = "/api/ReportCameraThermals/GetList_CameraThermal";
    return axiosClient.post(url, body);
  },
  thermalCameraReportData: (body) => {
    const url = "/api/ReportCameraThermals/GetDataByDate";
    return axiosClient.post(url, body);
  },
};

export default thermalAPI;
