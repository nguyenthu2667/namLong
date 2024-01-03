import axiosClient from "../index";

const monitorAPI = {
  //edit-isWarning
  setWarning: (body) => {
    const url = "/api/ConfigMaintains/EditMonitorWarning";
    return axiosClient.post(url, body);
  },

  //** Component: dashboards/monitor/DashboardFollow **/
  monitorDataCodeOptions: () => {
    const url = "/api/Dashboard/GetListDataCode";
    return axiosClient.post(url);
  },
  monitorDashboardFollow: (body) => {
    const url = "/api/Dashboard/GetDashboard_ByMonitor";
    return axiosClient.post(url, body);
  },
  /** Component: dashboards/monitor/DashboardAnalytics **/
  monitorDashboardAnalytics: (body) => {
    const url = "/api/ChartMonitors/GetChart_Monitors";
    return axiosClient.post(url, body);
  },
  monitorList: (body) => {
    const url = "/api/Monitors/GetMonitor";
    return axiosClient.post(url, body);
  },

  /** Component: category/monitor/Indicators **/
  monitorIndicatorList: () => {
    const url = "/api/Indicators/GetListIndicators";
    return axiosClient.post(url);
  },
  monitorIndicatorByID: (body) => {
    const url = "/api/Indicators/GetListIndicatorsById";
    return axiosClient.post(url, body);
  },
  monitorIndicatorChangeStatus: (body) => {
    const url = "/api/Indicators/ChangeStatusIndicators";
    return axiosClient.post(url, body);
  },
  monitorIndicatorRemove: (body) => {
    const url = "/api/Indicators/DeleteIndicators";
    return axiosClient.post(url, body);
  },
  /** Component: category/monitor/Stations **/
  monitorStationList: () => {
    const url = "/api/Stations/GetListStation";
    return axiosClient.post(url);
  },
  monitorStationByID: (body) => {
    const url = "/api/Stations/GetStationById";
    return axiosClient.post(url, body);
  },
  monitorStationChangeStatus: (body) => {
    const url = "/api/Stations/ChangeStatus";
    return axiosClient.post(url, body);
  },
  monitorStationRemove: (body) => {
    const url = "/api/Stations/Delete";
    return axiosClient.post(url, body);
  },
  /** Component: category/monitor/StationRight **/

  monitorStationByInfoAuthorization: (body) => {
    const url = "/api/StationRights/GetStationRightByInfos";
    return axiosClient.post(url, body);
  },
  monitorEditStationByInfoAuthorization: (body) => {
    const url = "/api/StationRights/EditStationRightByInfos";
    return axiosClient.post(url, body);
  },
  monitorStationByMonitorAuthorization: (body) => {
    const url = "/api/StationRights/GetStationRightByMonitorings";
    return axiosClient.post(url, body);
  },
  monitorEditStationByMonitorAuthorization: (body) => {
    const url = "/api/StationRights/EditStationRightByMonitorings";
    return axiosClient.post(url, body);
  },
  /** Component: report/monitor **/
  currentMonitorReport: () => {
    const url = "/api/MonitorReports/Current";
    return axiosClient.post(url);
  },
  TotalMonitorReport: (body) => {
    const url = "/api/MonitorReports/Total";
    return axiosClient.post(url, body);
  },
  listUnit: (body) => {
    const url = "/api/MonitorReports/GetListForDetail";
    return axiosClient.post(url, body);
  },
  DetailMonitorReport: (body) => {
    const url = "/api/MonitorReports/Detail";
    return axiosClient.post(url, body);
  },
  ErrMonitorReport: (body) => {
    const url = "/api/MonitorReports/Error";
    return axiosClient.post(url, body);
  },
  WarningMonitorReport: (body) => {
    const url = "/api/MonitorReports/Warning";
    return axiosClient.post(url, body);
  },
  masterMonitorReport: (body) => {
    const url = "/api/MonitorReports/ReportMaster";
    return axiosClient.post(url, body);
  },

  /** Component: category/monitor/Locations **/
  monitorLocationList: () => {
    const url = "/api/MonitorLocations/Get";
    return axiosClient.post(url);
  },
  monitorLocationByID: (body) => {
    const url = "/api/MonitorLocations/GetById";
    return axiosClient.post(url, body);
  },
  monitorLocationChangeStatus: (body) => {
    const url = "/api/MonitorLocations/ChangeStatus";
    return axiosClient.post(url, body);
  },
  monitorLocationRemove: (body) => {
    const url = "/api/MonitorLocations/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: category/monitor/Locations, Category.StationLinks **/
  cameraStationsByID: (body) => {
    const url = "/api/StationLinks/GetDeviceLink";
    return axiosClient.post(url, body);
  },
  cameraStationsDevicesByID: (body) => {
    const url = "/api/StationLinks/GetStationDevice";
    return axiosClient.post(url, body);
  },
  speakerStationsByID: (body) => {
    const url = "/api/StationLinks/GetDeviceLink";
    return axiosClient.post(url, body);
  },
  speakerStationsDevicesByID: (body) => {
    const url = "/api/StationLinks/GetStationSpeaker";
    return axiosClient.post(url, body);
  },
  linkStationsByID: (body) => {
    const url = "/api/StationLinks/GetStationLink";
    return axiosClient.post(url, body);
  },
  linkStationsDevicesByID: (body) => {
    const url = "/api/StationLinks/GetStations";
    return axiosClient.post(url, body);
  },
  /** Component: category/monitor/cameras **/
  stationDevicesList: () => {
    const url = "/api/StationDevices/Get";
    return axiosClient.post(url);
  },
  stationDevicesByID: (body) => {
    const url = "/api/StationDevices/GetById";
    return axiosClient.post(url, body);
  },
  stationDevicesChangeStatus: (body) => {
    const url = "/api/StationDevices/ChangeStatus";
    return axiosClient.post(url, body);
  },
  stationDevicesTypeList: (body) => {
    const url = "/api/StationDevices/GetDeviceType";
    return axiosClient.post(url, body);
  },
  stationDevicesRemove: (body) => {
    const url = "/api/StationDevices/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: category/monitor/speakers **/
  stationSpeakersList: () => {
    const url = "/api/StationSpeakers/Get";
    return axiosClient.post(url);
  },
  stationSpeakersByID: (body) => {
    const url = "/api/StationSpeakers/GetById";
    return axiosClient.post(url, body);
  },
  stationSpeakersChangeStatus: (body) => {
    const url = "/api/StationSpeakers/ChangeStatus";
    return axiosClient.post(url, body);
  },
  stationSpeakersTypeList: (body) => {
    const url = "/api/StationSpeakers/GetDeviceType";
    return axiosClient.post(url, body);
  },
  stationSpeakersRemove: (body) => {
    const url = "/api/StationSpeakers/Delete";
    return axiosClient.post(url, body);
  }
};

export default monitorAPI;
