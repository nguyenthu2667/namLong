import axiosClient from "../index";

const gasSalesAPI = {
  //category
  getStoreList: () => {
    const url = "/api/Stores/GetStoreByUser";
    return axiosClient.post(url);
  },
  getImagesByID: (body = {}) => {
    const url = "/api/Stores/GetImagesByStore";
    return axiosClient.post(url, body);
  },
  getEmployersByID: (body) => {
    const url = "/api/Stores/GetEmployeeByStore";
    return axiosClient.post(url, body);
  },
  getDashboard: (body = {}) => {
    const url = "/api/Dashboard/GetDashboard_ByGasRestaurent_ForSale";
    return axiosClient.post(url, body);
  },
  getChart: (body = {}) => {
    const url = "/api/GasCharts/Getchart_ForSale";
    return axiosClient.post(url, body);
  },
  getSales: (body = {}) => {
    const url = "/api/GasReports/GetSales";
    return axiosClient.post(url, body);
  },
  getDeliverys: (body) => {
    const url = "/api/GasReports/GetDeliverys";
    return axiosClient.post(url, body);
  },
  getDebits: (body = {}) => {
    const url = "/api/GasReports/GetDebits";
    return axiosClient.post(url, body);
  },
  gasReturnTankGet: (body = {}) => {
    const url = "/api/GasReturnTanks/Get";
    return axiosClient.post(url, body);
  },
  //components:../report/gas-food-court
  gasReturnTankByID: (body = {}) => {
    const url = "/api/GasReturnTanks/GetById";
    return axiosClient.post(url, body);
  },
  gasReturnTankRemove: (body = {}) => {
    const url = "/api/GasReturnTanks/Delete";
    return axiosClient.post(url, body);
  },
  getDebitTanks: (body = {}) => {
    const url = "/api/GasReports/GetDebitTanks";
    return axiosClient.post(url, body);
  },
  gasAdjustPriceTotalGet: (body = {}) => {
    const url = "/api/AdjustPriceTotals/Get";
    return axiosClient.post(url, body);
  },
  gasAdjustPriceTotalRemove: (body) => {
    const url = "/api/AdjustPriceTotals/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: category/gas-food-court/AreaGasFoodCourt **/
  gasAdjustPriceTotalByID: (body) => {
    const url = "/api/AdjustPriceTotals/GetById";
    return axiosClient.post(url, body);
  },
  priceListItem: () => {
    const url = "/api/AdjustPriceTotals/GetLastAdjustPrice_ByAllCus";
    return axiosClient.post(url);
  },
  //dashboard
  balanceDebitsGet: () => {
    const url = "/api/BalanceDebits/Get";
    return axiosClient.post(url);
  },
  balanceDebitsRemove: (body = {}) => {
    const url = "/api/BalanceDebits/Delete";
    return axiosClient.post(url, body);
  },
  //report
  balanceDebitsByID: (body = {}) => {
    const url = "/api/BalanceDebits/GetById";
    return axiosClient.post(url, body);
  },
  //other
  balanceDebitTanksGet: () => {
    const url = "/api/BalanceDebitTanks/Get";
    return axiosClient.post(url);
  },
  balanceDebitTanksRemove: (body = {}) => {
    const url = "/api/BalanceDebitTanks/Delete";
    return axiosClient.post(url, body);
  },
  balanceDebitTanksByID: (body = {}) => {
    const url = "/api/BalanceDebitTanks/GetById";
    return axiosClient.post(url, body);
  },
  editSendNotify: (body = {}) => {
    const url = "/api/AdjustPriceTotals/EditSendNotify";
    return axiosClient.post(url, body);
  },
};

export default gasSalesAPI;
