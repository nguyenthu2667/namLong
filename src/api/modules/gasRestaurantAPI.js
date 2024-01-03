import axiosClient from "../index";

const gasRestaurantAPI = {
  /** Component: dashboards/light/DashboardFollow **/
  gasRestaurantFinishedProductGet: (body) => {
    const url = "/api/StationByRestaurents/GetListExport";
    return axiosClient.post(url, body);
  },
  gasRestaurantFinishedProductRemove: (body) => {
    const url = "/api/StationByRestaurents/DeleteDeploy";
    return axiosClient.post(url, body);
  },

  //LightWarning
  gasRestaurantFinishedProductByID: (body) => {
    const url = "/api/StationByRestaurents/GetById";
    return axiosClient.post(url, body);
  },
  gasRestaurantCustomerGet: () => {
    const url = "/api/StationByRestaurents/Get";
    return axiosClient.post(url);
  },
  gasRestaurantCustomerChangeStatus: (body = {}) => {
    const url = "/api/StationByRestaurents/ChangeStatus";
    return axiosClient.post(url, body);
  },
  gasRestaurantCustomerRemove: (body = {}) => {
    const url = "/api/StationByRestaurents/Delete";
    return axiosClient.post(url, body);
  },
  gasRestaurantMonitor: (body) => {
    const url = "/api/GasRestaurentMonitor/GetMonitor";
    return axiosClient.post(url, body);
  },

  gasRestaurantReset: (body = {}) => {
    const url = "/api/GasRestaurentMonitor/SetRestart";
    return axiosClient.post(url, body);
  },

  gasRestaurantRefresh: (body) => {
    const url = "/api/GasRestaurentMonitor/SetRefresh";
    return axiosClient.post(url, body);
  },

  gasRestaurantLock: (body = {}) => {
    const url = "/api/GasRestaurentMonitor/SetLock";
    return axiosClient.post(url, body);
  },

  gasRestaurantGasUse: (body = {}) => {
    const url = "/api/GasRestaurentMonitor/SetGasUse";
    return axiosClient.post(url, body);
  },

  /** Component: dashboards/light/DashboardAnalytics CabinetInfo **/
  gasRestaurantLogDetected: (body = {}) => {
    const url = "/api/StationDataGasRestaurent/LogDetected";
    return axiosClient.post(url, body);
  },

  gasRestaurantLogEndGas: (body = {}) => {
    const url = "/api/StationDataGasRestaurent/LogEndGas";
    return axiosClient.post(url, body);
  },
  gasRestaurantDashboard: (body) => {
    const url = "/api/Dashboard/GetDashboard_ByGasRestaurent";
    return axiosClient.post(url, body);
  },
  gasRestaurantChart: (body = {}) => {
    const url = "/api/ChartGasRestaurent/Get";
    return axiosClient.post(url, body);
  },

  /** Component: category/light/ScheduleOptions **/
  gasRestaurantHistory: () => {
    const url = "/api/StationDataGasRestaurent/HistoryGasRestaurent";
    return axiosClient.post(url);
  },
  gasRestaurantReportDetected: (body = {}) => {
    const url = "/api/StationDataGasRestaurent/ReportDetected";
    return axiosClient.post(url, body);
  },

  gasRestaurantReportEndGas: (body) => {
    const url = "/api/StationDataGasRestaurent/ReportEndGas";
    return axiosClient.post(url, body);
  },

  gasUnitGet: (body = {}) => {
    const url = "/api/GasUnits/Get";
    return axiosClient.post(url, body);
  },

  /** Component: category/light/LightLevels **/
  gasUnitActive: () => {
    const url = "/api/GasUnits/GetActive";
    return axiosClient.post(url);
  },
  gasUnitChangeStatus: (body) => {
    const url = "/api/GasUnits/ChangeStatus";
    return axiosClient.post(url, body);
  },

  gasUnitRemove: (body = {}) => {
    const url = "/api/GasUnits/Delete";
    return axiosClient.post(url, body);
  },
  gasUnitByID: (body = {}) => {
    const url = "/api/GasUnits/GetByID";
    return axiosClient.post(url, body);
  },

  /** Component: category/light/CabinetFishnededProduct **/
  gasGroupItemGet: () => {
    const url = "/api/GasItemGroups/Get";
    return axiosClient.post(url);
  },
  gasGroupItemActive: () => {
    const url = "/api/GasItemGroups/GetActive";
    return axiosClient.post(url);
  },

  /** Component: category/light/LightCabinets **/
  gasGroupItemChangeStatus: (body) => {
    const url = "/api/GasItemGroups/ChangeStatus";
    return axiosClient.post(url, body);
  },
  gasGroupItemRemove: (body) => {
    const url = "/api/GasItemGroups/Delete";
    return axiosClient.post(url, body);
  },
  gasGroupItemByID: (body = {}) => {
    const url = "/api/GasItemGroups/GetByID";
    return axiosClient.post(url, body);
  },
  gasItemGet: () => {
    const url = "/api/GasItems/Get";
    return axiosClient.post(url);
  },
  gasItemActive: () => {
    const url = "/api/GasItems/GetActive";
    return axiosClient.post(url);
  },

  gasItemChangeStatus: (body) => {
    const url = "/api/GasItems/ChangeStatus";
    return axiosClient.post(url, body);
  },
  gasItemRemove: (body) => {
    const url = "/api/GasItems/Delete";
    return axiosClient.post(url, body);
  },
  gasItemByID: (body = {}) => {
    const url = "/api/GasItems/GetByID";
    return axiosClient.post(url, body);
  },

  //category-MaintenanceErrors
  gasItemByStationID: (body) => {
    const url = "/api/GasContracts/GetItemPrices";
    return axiosClient.post(url, body);
  },
  gasAdjustPriceGet: (body = {}) => {
    const url = "/api/AdjustPrices/Get";
    return axiosClient.post(url, body);
  },

  gasAdjustPriceRemove: (body) => {
    const url = "/api/AdjustPrices/Delete";
    return axiosClient.post(url, body);
  },
  gasAdjustPriceByID: (body) => {
    const url = "/api/AdjustPrices/GetByID";
    return axiosClient.post(url, body);
  },

  /** Component: function/light/CabinetSchedules **/
  gasSaleGet: (body) => {
    const url = "/api/GasContracts/GetSale";
    return axiosClient.post(url, body);
  },
  gasSaleRemove: (body) => {
    const url = "/api/GasContracts/Delete";
    return axiosClient.post(url, body);
  },
  gasLastSale: (body = {}) => {
    const url = "/api/GasContracts/getLastSale";
    return axiosClient.post(url, body);
  },
  gasOrderAndSaleCancel: (body = {}) => {
    const url = "/api/GasContracts/Edit_Cancel";
    return axiosClient.post(url, body);
  },

  gasOrderAndSaleByID: (body) => {
    const url = "/api/GasContracts/GetByID";
    return axiosClient.post(url, body);
  },
  gasOrderGet: (body = {}) => {
    const url = "/api/GasContracts/GetContract";
    return axiosClient.post(url, body);
  },
  gasOrderApproval: (body = {}) => {
    const url = "/api/GasContracts/Edit_Approval";
    return axiosClient.post(url, body);
  },
  gasOrderHistory: (body) => {
    const url = "/api/StationDataGasRestaurent/GasOrderHistory";
    return axiosClient.post(url, body);
  },
  gasDeliveryGet: (body) => {
    const url = "/api/GasDeliverys/Get";
    return axiosClient.post(url, body);
  },

  gasDeliveryByStoreID: (body = {}) => {
    const url = "/api/GasDeliverys/GetByStoreID";
    return axiosClient.post(url, body);
  },
  gasDeliveryByID: (body = {}) => {
    const url = "/api/GasDeliverys/GetByID";
    return axiosClient.post(url, body);
  },
  gasDeliveryDetail: (body) => {
    const url = "/api/GasDeliverys/Detail_GetByID";
    return axiosClient.post(url, body);
  },

  gasDeliveryRemove: (body) => {
    const url = "/api/GasDeliverys/Delete";
    return axiosClient.post(url, body);
  },

  gasOrderAndSaleByStoreID: (body) => {
    const url = "/api/GasDeliverys/Delete";
    return axiosClient.post(url, body);
  },
  gasAdjustDebitGet: (body) => {
    const url = "/api/AdjustDebits/Get";
    return axiosClient.post(url, body);
  },
  gasAdjustDebitRemove: (body) => {
    const url = "/api/AdjustDebits/Delete";
    return axiosClient.post(url, body);
  },

  gasAdjustDebitByID: (body) => {
    const url = "/api/AdjustDebits/GetByID";
    return axiosClient.post(url, body);
  },
};

export default gasRestaurantAPI;
