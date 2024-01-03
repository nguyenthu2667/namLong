import axiosClient from "../index";

const lightAPI = {
  /** Component: dashboards/light/DashboardFollow **/
  lightDashboardFollow: () => {
    const url = "/api/Dashboard/GetDashboard_ByLighting";
    return axiosClient.post(url);
  },
  lightDashboardTest: () => {
    const url = "/api/Dashboard/GetDashboard_ByLightingTest";
    return axiosClient.post(url);
  },

  //LightWarning
  levelWarningList: () => {
    const url = "/api/LightLevelWarnings/Get";
    return axiosClient.post(url);
  },
  levelWarningByID: (body) => {
    const url = "/api/LightLevelWarnings/GetById";
    return axiosClient.post(url, body);
  },
  levelWarningChangeStatus: (body = {}) => {
    const url = "/api/LightLevelWarnings/ChangeStatus";
    return axiosClient.post(url, body);
  },
  levelWarningRemove: (body = {}) => {
    const url = "/api/LightLevelWarnings/Delete";
    return axiosClient.post(url, body);
  },
  indicatorWarningListActive: () => {
    const url = "/api/LightIndicatorWarnings/GetActive";
    return axiosClient.post(url);
  },

  indicatorWarningByID: (body = {}) => {
    const url = "/api/LightIndicatorWarnings/GetById";
    return axiosClient.post(url, body);
  },

  indicatorWarningChangeStatus: (body) => {
    const url = "/api/LightIndicatorWarnings/ChangeStatus";
    return axiosClient.post(url, body);
  },

  indicatorWarningRemove: (body = {}) => {
    const url = "/api/LightIndicatorWarnings/Delete";
    return axiosClient.post(url, body);
  },

  lampHistory: (body = {}) => {
    const url = "/api/LightingHistories/GetLampHistories";
    return axiosClient.post(url, body);
  },

  /** Component: dashboards/light/DashboardAnalytics CabinetInfo **/
  lightChart: (body = {}) => {
    const url = "/api/LightingCharts/Get";
    return axiosClient.post(url, body);
  },

  lightChartRegion: (body = {}) => {
    const url = "/api/LightingCharts/Region";
    return axiosClient.post(url, body);
  },
  lightDashboardAnalytics: (type, body) => {
    type = type.toUpperCase();
    let path;
    switch (type) {
      case "WEEK":
        path = "/api/LightingCharts/Week";
        break;
      case "MONTH":
        path = "/api/LightingCharts/Month";
        break;
      case "YEAR":
        path = "/api/LightingCharts/Year";
        break;
    }
    return axiosClient.post(path, body);
  },
  lightDashboardAnalyticsTotal: (body = {}) => {
    const url = "/api/LightingCharts/Total";
    return axiosClient.post(url, body);
  },

  /** Component: category/light/ScheduleOptions **/
  scheduleOptionList: () => {
    const url = "/api/CustomActions/Get";
    return axiosClient.post(url);
  },
  scheduleOptionByID: (body = {}) => {
    const url = "/api/CustomActions/GetById";
    return axiosClient.post(url, body);
  },

  scheduleOptionChangeStatus: (body) => {
    const url = "/api/CustomActions/ChangeStatus";
    return axiosClient.post(url, body);
  },

  scheduleOptionRemove: (body = {}) => {
    const url = "/api/CustomActions/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: category/light/LightLevels **/
  lightLevelList: () => {
    const url = "/api/SLLightLevels/GetSLLightLevelList";
    return axiosClient.post(url);
  },
  lightLevelListActive: (body) => {
    const url = "/api/SLLightLevels/GetSLLightLevelListActive";
    return axiosClient.post(url, body);
  },

  lightLevelByID: (body = {}) => {
    const url = "/api/SLLightLevels/GetSLightLevelById";
    return axiosClient.post(url, body);
  },
  lightLevelChangeStatus: (body = {}) => {
    const url = "/api/SLLightLevels/ChangeStatus";
    return axiosClient.post(url, body);
  },
  lightLevelRemove: (body = {}) => {
    const url = "/api/SLLightLevels/Delete";
    return axiosClient.post(url, body);
  },
  lightLevelAdd: (body = {}) => {
    const url = "/api/SLLightLevels/Add";
    return axiosClient.post(url, body);
  },  
  lightLevelEdit: (body = {}) => {
    const url = "/api/SLLightLevels/Edit";
    return axiosClient.post(url, body);
  },

  /** Component: category/light/CabinetFishnededProduct **/
  lightCabinetExportList: () => {
    const url = "/api/SLCabinets/GetSLCabinetExportList";
    return axiosClient.post(url);
  },
  lightLampExportList: () => {
    const url = "/api/SLLamps/GetSLLampExportList";
    return axiosClient.post(url);
  },

  /** Component: category/light/LightCabinets **/
  lightCabinetList: () => {
    const url = "/api/SLCabinets/GetSLCabinetList";
    return axiosClient.post(url);
  },
  lightCabinetByID: (body) => {
    const url = "/api/SLCabinets/GetSLCabinetById";
    return axiosClient.post(url, body);
  },
  lightCabinetChangeStatus: (body = {}) => {
    const url = "/api/SLCabinets/ChangeStatus";
    return axiosClient.post(url, body);
  },
  lightCabinetRemove: (body = {}) => {
    const url = "/api/SLCabinets/Delete";
    return axiosClient.post(url, body);
  },
  lightLampByCabinetID: (body = {}) => {
    const url = "/api/SLLamps/GetSLLampListByCabinetId";
    return axiosClient.post(url, body);
  },

  lightLampByID: (body) => {
    const url = "/api/SLLamps/GetSLLampById";
    return axiosClient.post(url, body);
  },
  lightLampChangeStatus: (body) => {
    const url = "/api/SLLamps/ChangeStatus";
    return axiosClient.post(url, body);
  },
  lightLampRemove: (body = {}) => {
    const url = "/api/SLLamps/Delete";
    return axiosClient.post(url, body);
  },

  //category-MaintenanceErrors
  maintenanceErrorTypeList: () => {
    const url = "/api/LightingMaintenanceErrors/Get";
    return axiosClient.post(url);
  },
  maintenanceErrorTypeByID: (body = {}) => {
    const url = "/api/LightingMaintenanceErrors/GetById";
    return axiosClient.post(url, body);
  },

  maintenanceErrorTypeRemove: (body) => {
    const url = "/api/LightingMaintenanceErrors/Delete";
    return axiosClient.post(url, body);
  },
  maintenanceErrorTypeChangeStatus: (body) => {
    const url = "/api/LightingMaintenanceErrors/ChangeStatus";
    return axiosClient.post(url, body);
  },

  /** Component: function/light/CabinetSchedules **/
  lightCabinetSchedulesList: () => {
    const url = "/api/CabinetSchedules/GetCabinetScheduleList";
    return axiosClient.post(url);
  },
  lightCabinetSchedulesListActive: () => {
    const url = "/api/CabinetSchedules/GetCabinetScheduleListActive";
    return axiosClient.post(url);
  },
  lightCabinetSchedulesByID: (body = {}) => {
    const url = "/api/CabinetSchedules/GetSCabinetScheduleById";
    return axiosClient.post(url, body);
  },
  lightCabinetSchedulesChangeStatus: (body = {}) => {
    const url = "/api/CabinetSchedules/ChangeStatus";
    return axiosClient.post(url, body);
  },

  lightCabinetSchedulesAdd: (body) => {
    const url = "/api/CabinetSchedules/Add";
    return axiosClient.post(url, body);
  },
  lightCabinetSchedulesEdit: (body = {}) => {
    const url = "/api/CabinetSchedules/Edit";
    return axiosClient.post(url, body);
  },
  lightCabinetSchedulesRemove: (body = {}) => {
    const url = "/api/CabinetSchedules/Delete";
    return axiosClient.post(url, body);
  },
  lightCabinetSchedulesSelectTable: () => {
    const url = "/api/CabinetSchedules/GetSelectTable";
    return axiosClient.post(url);
  },
  lightCabinetActionList: () => {
    const url = "/api/CabinetActions/GetActionList";
    return axiosClient.post(url);
  },

  /** Component: report/report-lighting/ReportLight **/
  reportLightTotal: (body = {}) => {
    const url = "/api/LightingReports/Totals";
    return axiosClient.post(url, body);
  },
  reportLightDetails: (body = {}) => {
    const url = "/api/LightingReports/Details";
    return axiosClient.post(url, body);
  },
  reportLightCurrentTotals: () => {
    const url = "/api/LightingReports/CurrentTotals";
    return axiosClient.post(url);
  },

  reportLightCurrentDetails: () => {
    const url = "/api/LightingReports/CurrentDetails";
    return axiosClient.post(url);
  },

  reportLightTotalByRegion: () => {
    const url = "/api/LightingReports/ReportTotalByRegion";
    return axiosClient.post(url);
  },
  reportLightTotalByCabinet: () => {
    const url = "/api/LightingReports/ReportTotalByCabinet";
    return axiosClient.post(url);
  },
  reportLightDetail: () => {
    const url = "/api/LightingReports/ReportDetail";
    return axiosClient.post(url);
  },

  DisconnectLight: (body) => {
    const url = "/api/LightingReports/ReportDisconnected";
    return axiosClient.post(url, body);
  },
  MovedLight: (body = {}) => {
    const url = "/api/LightingReports/ReportMoved";
    return axiosClient.post(url, body);
  },
  LampErrLight: (body = {}) => {
    const url = "/api/LightingReports/ReportLampError";
    return axiosClient.post(url, body);
  },
  getReportTotals: (body = {}) => {
    const url = "/api/LightingMaintenances/ReportTotals";
    return axiosClient.post(url, body);
  },

  getReportDetails: (body = {}) => {
    const url = "/api/LightingMaintenances/ReportDetails";
    return axiosClient.post(url, body);
  },

  // MaintenanceOthers
  getReportTotalsAndDetail: (body = {}) => {
    const url = "/api/LightingMaintenanceOthers/ReportTotal";
    return axiosClient.post(url, body);
  },

  /** Component: map/index **/
  mapCabinetGetActionLamp: (body = {}) => {
    const url = "/api/CabinetActions/GetLampAction";
    return axiosClient.post(url, body);
  },

  mapCabinetActionList: () => {
    const url = "/api/CabinetActions/GetActionList";
    return axiosClient.post(url);
  },

  mapCabinetActionControl: (body = {}) => {
    const url = "/api/CabinetActions/CabinetAction";
    return axiosClient.post(url, body);
  },

  mapCabinetActionSchedules: (body = {}) => {
    const url = "/api/CabinetActions/EditSchedule";
    return axiosClient.post(url, body);
  },

  mapCabinetActionLamp: (body = {}) => {
    const url = "/api/CabinetActions/LampAction";
    return axiosClient.post(url, body);
  },

  monitorList: () => {
    const url = "/api/LightMonitors/Get";
    return axiosClient.post(url);
  },

  /** Component: security/decentralization/GasStore **/

  lightRight: (body = {}) => {
    const url = "/api/StationRights_ByGroup/Get";
    return axiosClient.post(url, body);
  },

  lightRightEdit: (body = {}) => {
    const url = "/api/StationRights_ByGroup/Edit";
    return axiosClient.post(url, body);
  },

  //maintenance
  maintenanceDashboard: () => {
    const url = "/api/LightingMaintenances/Dashboard";
    return axiosClient.post(url);
  },

  maintenanceList: () => {
    const url = "/api/LightingMaintenances/Get";
    return axiosClient.post(url);
  },

  maintenanceByID: (body = {}) => {
    const url = "/api/LightingMaintenances/GetById";
    return axiosClient.post(url, body);
  },

  lightDataByRegionID: (body = {}) => {
    const url = "/api/LightingMaintenances/GetReference";
    return axiosClient.post(url, body);
  },

  maintenanceRemove: (body = {}) => {
    const url = "/api/LightingMaintenances/Delete";
    return axiosClient.post(url, body);
  },

  lightingChartMaintenance: (body = {}) => {
    const url = "/api/LightingMaintenances/Charts";
    return axiosClient.post(url, body);
  },

  lightingGetDetails: (body = {}) => {
    const url = "/api/LightingMaintenances/GetDetails";
    return axiosClient.post(url, body);
  },

  lightingGetEditDetails: (body = {}) => {
    const url = "/api/LightingMaintenances/GetEditDetails";
    return axiosClient.post(url, body);
  },

  areaLightingMaintenancesList: () => {
    const url = "/api/Regions/GetRegionListActive";
    return axiosClient.post(url);
  },

  isRequest: (body = {}) => {
    const url = "/api/LightingMaintenances/EditClose";
    return axiosClient.post(url, body);
  },

  postApproval: (body = {}) => {
    const url = "/api/LightingMaintenances/Approval";
    return axiosClient.post(url, body);
  },

  // LightLevel
  getDeployCabinet: (body = {}) => {
    const url = "/api/SLCabinets/GetDeploy";
    return axiosClient.post(url, body);
  },

  cabinetExportProduct: (body = null) => {
    const url = "/api/SLCabinets/Export";
    return axiosClient.post(url, body);
  },

  cabinetRemove: (body = {}) => {
    const url = "/api/SLCabinets/Delete";
    return axiosClient.post(url, body);
  },

  getDeployLamps: (body = {}) => {
    const url = "/api/SLLamps/GetDeploy";
    return axiosClient.post(url, body);
  },

  lampsExportProduct: (body = {}) => {
    const url = "/api/SLLamps/Export";
    return axiosClient.post(url, body);
  },

  lampsRemove: (body = {}) => {
    const url = "/api/SLLamps/Delete";
    return axiosClient.post(url, body);
  },
};

export default lightAPI;
