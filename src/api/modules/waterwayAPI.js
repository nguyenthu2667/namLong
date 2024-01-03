import axiosClient from "../index";

const waterwayAPI = {
  waterWaySizeList: () => {
    const url = "/api/WaterwayTypes/GetSize";
    return axiosClient.post(url);
  },
  /** Component: category/waterways/WaterWayCabinets **/
  /** CABINET **/
  waterWayCabinetList: () => {
    const url = "/api/WaterwayCabinets/Get";
    return axiosClient.post(url);
  },
  waterWayCabinetExportList: () => {
    const url = "/api/WaterwayCabinets/GetExport";
    return axiosClient.post(url);
  },
  waterWayCabinetActiveOption: () => {
    const url = "/api/WaterwayCabinets/GetActive";
    return axiosClient.post(url);
  },
  waterWayCabinetByID: (body = {}) => {
    const url = "/api/WaterwayCabinets/GetById";
    return axiosClient.post(url, body);
  },
  waterWayCabinetChangeStatus: (body = {}) => {
    const url = "/api/WaterwayCabinets/ChangeStatus";
    return axiosClient.post(url, body);
  },
  waterWayCabinetRemove: (body = {}) => {
    const url = "/api/WaterwayCabinets/Delete";
    return axiosClient.post(url, body);
  },
  /** STATION **/
  waterWayStationListByCabinetID: (body = {}) => {
    const url = "/api/WaterwayStations/Get";
    return axiosClient.post(url, body);
  },
  waterWayStationExportList: () => {
    const url = "/api/WaterwayStations/GetExport";
    return axiosClient.post(url);
  },
  waterWayStationByID: (body = {}) => {
    const url = "/api/WaterwayStations/GetById";
    return axiosClient.post(url, body);
  },
  waterWayStaionChangeStatus: (body = {}) => {
    const url = "/api/WaterwayStations/ChangeStatus";
    return axiosClient.post(url, body);
  },
  waterWayStationRemove: (body = {}) => {
    const url = "/api/WaterwayStations/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: category/waterways/WaterWayType **/
  waterWayTypeList: () => {
    const url = "/api/WaterwayTypes/Get";
    return axiosClient.post(url);
  },
  waterWayTypeListActive: () => {
    const url = "/api/WaterwayTypes/GetActive";
    return axiosClient.post(url);
  },
  waterWayTypeByID: (body = {}) => {
    const url = "/api/WaterwayTypes/GetById";
    return axiosClient.post(url, body);
  },
  waterWayTypeChangeStatus: (body = {}) => {
    const url = "/api/WaterwayTypes/ChangeStatus";
    return axiosClient.post(url, body);
  },
  waterWayTypeRemove: (body = {}) => {
    const url = "/api/WaterwayTypes/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: category/waterways/WaterWaySigns **/
  waterWaySignList: () => {
    const url = "/api/WaterwaySign/Get";
    return axiosClient.post(url);
  },
  waterWaySignByID: (body = {}) => {
    const url = "/api/WaterwaySign/GetById";
    return axiosClient.post(url, body);
  },
  waterWaySignChangeStatus: (body = {}) => {
    const url = "/api/WaterwaySign/ChangeStatus";
    return axiosClient.post(url, body);
  },
  waterWaySignRemove: (body = {}) => {
    const url = "/api/WaterwaySign/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: category/waterways/WaterWaySignType **/
  waterWaySignTypeList: (body = {}) => {
    const url = "/api/WaterwaySignTypes/Get";
    return axiosClient.post(url, body);
  },
  waterWaySignTypeListActive: (body = {}) => {
    const url = "/api/WaterwaySignTypes/GetActive";
    return axiosClient.post(url, body);
  },
  waterWaySignTypeByID: (body = {}) => {
    const url = "/api/WaterwaySignTypes/GetById";
    return axiosClient.post(url, body);
  },
  waterWaySignTypeChangeStatus: (body = {}) => {
    const url = "/api/WaterwaySignTypes/Delete";
    return axiosClient.post(url, body);
  },
  waterWaySignTypeRemove: (body = {}) => {
    const url = "/api/IndicatorWarnings/GetIndicatorWarningById";
    return axiosClient.post(url, body);
  },

  /** Component: category/waterways/WaterWayRoutes **/
  waterWayRoutesList: () => {
    const url = "/api/WaterwayRoutes/Get";
    return axiosClient.post(url);
  },
  waterWayRoutesListActive: () => {
    const url = "/api/WaterwayRoutes/GetActive";
    return axiosClient.post(url);
  },
  waterWayRoutesByID: (body = {}) => {
    const url = "/api/WaterwayRoutes/GetById";
    return axiosClient.post(url, body);
  },
  waterWayRoutesChangeStatus: (body = {}) => {
    const url = "/api/WaterwayRoutes/ChangeStatus";
    return axiosClient.post(url, body);
  },
  waterWayRoutesRemove: (body = {}) => {
    const url = "/api/WaterwayRoutes/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: category/waterways/WaterWayRoutes **/
  waterWayClearanceHeightList: () => {
    const url = "/api/WaterwayClearanceHeights/Get";
    return axiosClient.post(url);
  },
  waterWayClearanceHeightListActive: () => {
    const url = "/api/WaterwayClearanceHeights/GetActive";
    return axiosClient.post(url);
  },
  waterWayClearanceHeightByID: (body = {}) => {
    const url = "/api/WaterwayClearanceHeights/GetById";
    return axiosClient.post(url, body);
  },
  waterWayClearanceHeightChangeStatus: (body = {}) => {
    const url = "/api/WaterwayClearanceHeights/ChangeStatus";
    return axiosClient.post(url, body);
  },
  waterWayClearanceHeightRemove: (body = {}) => {
    const url = "/api/WaterwayClearanceHeights/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: category/waterways/Beacons **/
  waterWayBeaconsList: () => {
    const url = "/api/WaterwayBeaconFlashs/Get";
    return axiosClient.post(url);
  },
  waterWayBeaconsListColor: () => {
    const url = "/api/WaterwayBeaconFlashs/GetColor";
    return axiosClient.post(url);
  },
  waterWayBeaconsListActive: (body = {}) => {
    const url = "/api/WaterwayBeaconFlashs/GetActive";
    return axiosClient.post(url, body);
  },
  waterWayBeaconsByID: (body = {}) => {
    const url = "/api/WaterwayBeaconFlashs/GetById";
    return axiosClient.post(url, body);
  },
  waterWayBeaconsChangeStatus: (body = {}) => {
    const url = "/api/WaterwayBeaconFlashs/ChangeStatus";
    return axiosClient.post(url, body);
  },
  waterWayBeaconsRemove: (body = {}) => {
    const url = "/api/WaterwayBeaconFlashs/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: function/water-way/WaterwaySchedules **/
  waterWayCabinetSchedulesList: () => {
    const url = "/api/WaterwaySchedules/GetCabinetScheduleList";
    return axiosClient.post(url);
  },
  waterWayCabinetSchedulesByID: (body = {}) => {
    const url = "/api/WaterwaySchedules/GetSCabinetScheduleById";
    return axiosClient.post(url, body);
  },
  waterWayCabinetSchedulesChangeStatus: (body = {}) => {
    const url = "/api/WaterwaySchedules/ChangeStatus";
    return axiosClient.post(url, body);
  },
  waterWayCabinetSchedulesRemove: (body = {}) => {
    const url = "/api/WaterwaySchedules/Delete";
    return axiosClient.post(url, body);
  },
  waterWayCabinetSchedulesSelectTable: (body = {}) => {
    const url = "/api/WaterwaySchedules/GetSelectTable";
    return axiosClient.post(url, body);
  },

  /** Component: function/water-ways/EnvironmentWaterway **/
  waterWayMonitorList: (body = {}) => {
    const url = "/api/WaterwayMonitors/Waterway";
    return axiosClient.post(url, body);
  },
  clearanceHeightMonitorList: (body = {}) => {
    const url = "/api/WaterwayMonitors/ClearanceHeight";
    return axiosClient.post(url, body);
  },
  /** Component: map/index
   * pop-up/WaterwayCabinet **/
  mapCabinetActionSchedules: (body = {}) => {
    const url = "/api/WaterwayActions/EditSchedule";
    return axiosClient.post(url, body);
  },

  mapCabinetChangeStatus: (body = {}) => {
    const url = "/api/WaterwayActions/CabinetAction";
    return axiosClient.post(url, body);
  },

  /** Component:dashboards/water-ways/DashboardMaster  **/
  waterWayDashboardFollow: (body = {}) => {
    const url = "/api/Dashboard/GetDashboard_ByWaterway";
    return axiosClient.post(url, body);
  },
  waterWayDashboardAnalytics: (body = {}) => {
    const url = "/api/WaterwayCharts/Waterway";
    return axiosClient.post(url, body);
  },
  clearanceHeightDashboardAnalytics: (body = {}) => {
    const url = "/api/WaterwayCharts/ClearanceHeight";
    return axiosClient.post(url, body);
  },

  /** Component:report/water-ways/  **/
  /**Current **/
  waterWayReportCurrent: () => {
    const url = "/api/WaterwayReports/Current";
    return axiosClient.post(url);
  },
  waterWayReportDistanceTotal: (body = {}) => {
    const url = "/api/WaterwayReports/DistanceTotal";
    return axiosClient.post(url, body);
  },
  waterWayReportDistanceDetail: (body = {}) => {
    const url = "/api/WaterwayReports/DistanceDetail";
    return axiosClient.post(url, body);
  },
  waterWayReportLampErrorTotal: (body = {}) => {
    const url = "/api/WaterwayReports/LampErrorTotal";
    return axiosClient.post(url, body);
  },
  waterWayReportLampErrorDetail: (body = {}) => {
    const url = "/api/WaterwayReports/LampErrorDetail";
    return axiosClient.post(url, body);
  },
};

export default waterwayAPI;
