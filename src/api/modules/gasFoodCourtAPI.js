import axiosClient from "../index";

const gasFoodCourtAPI = {
  //category
  gasFoodCourtDashboard: () => {
    const url = "/api/Dashboard/GetDashboard_ByGasFoodCourt";
    return axiosClient.post(url);
  },
  gasFoodCourtChart: (body = {}) => {
    const url = "/api/ChartGasFoodCourt/Get";
    return axiosClient.post(url, body);
  },
  historyGasFoodCourt: () => {
    const url = "/api/StationDataGasFoodCourt/HistoryGasFoodCourt";
    return axiosClient.post(url);
  },
  gasFoodCourtFinishedProductGet: (body = {}) => {
    const url = "/api/StationByGasFoodCourts/GetListExport";
    return axiosClient.post(url, body);
  },
  gasFoodCourtFinishedProductRemove: (body = {}) => {
    const url = "/api/StationByGasFoodCourts/DeleteDeploy";
    return axiosClient.post(url, body);
  },
  gasFoodCourtFinishedProductByID: (body = {}) => {
    const url = "/api/StationByGasFoodCourts/GetById";
    return axiosClient.post(url, body);
  },
  gasFoodCourtCustomerGet: () => {
    const url = "/api/StationByGasFoodCourts/Get";
    return axiosClient.post(url);
  },
  gasFoodCourtCustomerChangeStatus: (body = {}) => {
    const url = "/api/StationByGasFoodCourts/ChangeStatus";
    return axiosClient.post(url, body);
  },
  gasFoodCourtCustomerRemove: (body = {}) => {
    const url = "/api/StationByGasFoodCourts/Delete";
    return axiosClient.post(url, body);
  },
  //components:../report/gas-food-court
  reportDetected: (body = {}) => {
    const url = "/api/StationDataGasFoodCourt/ReportDetected";
    return axiosClient.post(url, body);
  },
  reportUseGas: (body = {}) => {
    const url = "/api/StationDataGasFoodCourt/ReportUsed";
    return axiosClient.post(url, body);
  },
  reportDebit: (body = {}) => {
    const url = "/api/StationDataGasFoodCourt/ReportDebits";
    return axiosClient.post(url, body);
  },
  reportLogDetected: (body = {}) => {
    const url = "/api/StationDataGasFoodCourt/LogDetected";
    return axiosClient.post(url, body);
  },
  listExportGasFoodCourt: () => {
    const url = "/api/StationByGasFoodCourts/GetListExport";
    return axiosClient.post(url);
  },

  /** Component: category/gas-food-court/AreaGasFoodCourt **/
  gasAreaFoodCourtGet: () => {
    const url = "/api/FoodCourts/Get";
    return axiosClient.post(url);
  },
  gasAreaFoodCourtByID: (body = {}) => {
    const url = "/api/FoodCourts/GetById";
    return axiosClient.post(url, body);
  },
  //dashboard
  gasAreaFoodCourtChangeStatus: (body = {}) => {
    const url = "/api/FoodCourts/ChangeStatus";
    return axiosClient.post(url, body);
  },
  gasAreaFoodCourtRemove: (body = {}) => {
    const url = "/api/FoodCourts/Delete";
    return axiosClient.post(url, body);
  },
  //report
  gasFoodCourtReset: (body = {}) => {
    const url = "/api/GasFoodCourtMonitor/SetRestart";
    return axiosClient.post(url, body);
  },
  //other
  gasFoodCourtRefresh: (body = {}) => {
    const url = "/api/GasFoodCourtMonitor/SetRefresh";
    return axiosClient.post(url, body);
  },
  gasFoodCourtLock: (body = {}) => {
    const url = "/api/GasFoodCourtMonitor/SetLock";
    return axiosClient.post(url, body);
  },
  gasAdjustPriceGet: (body = {}) => {
    const url = "/api/AdjustPricesFoodCourts/Get";
    return axiosClient.post(url, body);
  },
  gasAdjustPriceRemove: (body = {}) => {
    const url = "/api/AdjustPricesFoodCourts/Delete";
    return axiosClient.post(url, body);
  },
  gasAdjustPriceByID: (body = {}) => {
    const url = "/api/AdjustPricesFoodCourts/GetById";
    return axiosClient.post(url, body);
  },
  gasItemActive: (body = {}) => {
    const url = "/api/GasItems/GetActive";
    return axiosClient.post(url, body);
  },
  gasAdjustDebitGet: () => {
    const url = "/api/AdjustDebitsFoodCourts/Get";
    return axiosClient.post(url);
  },
  gasAdjustDebitRemove: (body = {}) => {
    const url = "/api/AdjustDebitsFoodCourts/Delete";
    return axiosClient.post(url, body);
  },
  gasAdjustDebitByID: (body = {}) => {
    const url = "/api/AdjustDebitsFoodCourts/GetById";
    return axiosClient.post(url, body);
  },
  getDataChartByStation: (body = {}) => {
    const url = "/api/ChartGasFoodCourt/GetByStation";
    return axiosClient.post(url, body);
  },
};

export default gasFoodCourtAPI;
