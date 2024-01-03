import axiosClient from "../index";

const collectAPI = {
  /** Component: dashboards/CollectType **/
  getDashboard: () => {
    const url = "/api/Dashboard/GetDashboard_ByCollect";
    return axiosClient.post(url);
  },

  getCollectChart: (body) => {
    const url = "/api/CollectCharts/Get";
    return axiosClient.post(url, body);
  },

  /** Component: category/collect/CollectType **/

  collectTypeList: (body) => {
    const url = "/api/CollectTypes/GetListCollectType";
    return axiosClient.post(url, body);
  },

  collectTypeListActive: (body) => {
    const url = "/api/CollectTypes/GetListCollectTypeActive";
    return axiosClient.post(url, body);
  },
  collectTypeByID: (body) => {
    const url = "/api/CollectTypes/GetCollectTypeById";
    return axiosClient.post(url, body);
  },
  collectTypeChangeStatus: (body) => {
    const url = "/api/CollectTypes/ChangeStatusCollectType";
    return axiosClient.post(url, body);
  },
  collectTypeRemove: (body) => {
    const url = "/api/CollectTypes/DeleteCollectType";
    return axiosClient.post(url, body);
  },

  /** Component: category/collect/TreeRoute **/
  collectTreeRouteList: (body) => {
    const url = "/api/TreeRoutes/GetListTreeRoute";
    return axiosClient.post(url, body);
  },
  collectTreeRouteListActive: (body) => {
    const url = "/api/TreeRoutes/GetListTreeRouteActive";
    return axiosClient.post(url, body);
  },
  collectTreeRouteByID: (body) => {
    const url = "/api/TreeRoutes/GetTreeRouteByID";
    return axiosClient.post(url, body);
  },
  collectTreeRouteChangeStatus: (body) => {
    const url = "/api/TreeRoutes/ChangeStatusTreeRoute";
    return axiosClient.post(url, body);
  },

  collectTreeRouteRemove: (body) => {
    const url = "/api/TreeRoutes/DeleteTreeRoute";
    return axiosClient.post(url, body);
  },

  /** Component: function/collect/CollectData **/
  collectDataList: (body) => {
    const url = "/api/collect/GetListCollect";
    return axiosClient.post(url, body);
  },
  collectDataByOID: (body) => {
    const url = "/api/collect/GetCollectByOID";
    return axiosClient.post(url, body);
  },
  collectDataClose: (body) => {
    const url = "/api/collect/EditIsCloseCollection";
    return axiosClient.post(url, body);
  },
  collectDataRemove: (body) => {
    const url = "/api/collect/DelCollect";
    return axiosClient.post(url, body);
  },
  collectDataTreeUpdateView: (body) => {
    const url = "/api/collecttree/UpdateIsViewDataCollect";
    return axiosClient.post(url, body);
  },
  collectDataTreeUpdateApproval: (body) => {
    const url = "/api/collecttree/UpdateIsApprovalDataCollect";
    return axiosClient.post(url, body);
  },
  collectDataTreeUpdateReturn: (body) => {
    const url = "/api/collecttree/UpdateIsReturnDataCollect";
    return axiosClient.post(url, body);
  },
  collectDataTreeByOID: (body) => {
    const url = "/api/collecttree/GetListDataCollectDetailByOID";
    return axiosClient.post(url, body);
  },
  collectDataTreeDetailByID: (body) => {
    const url = "/api/collecttree/GetDataCollectDetailByID";
    return axiosClient.post(url, body);
  },
  // end
};

export default collectAPI;
