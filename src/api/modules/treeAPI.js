import axiosClient from "../index";

const treeAPI = {
  /** Component: dashboards/tree/DashboardFollow **/
  treeDashboardFollow: () => {
    const url = "/api/Dashboard/GetDashboard_ByTree";
    return axiosClient.post(url);
  },
  treeDashboardAnalytics: () => {
    const url = "/api/ChartTrees/GetChartData";
    return axiosClient.post(url);
  },

  /** Component: category/tree/Color **/
  treeColorList: () => {
    const url = "/api/Colors/GetListColor";
    return axiosClient.post(url);
  },
  treeColorByID: (body) => {
    const url = "/api/Colors/GetColorById";
    return axiosClient.post(url, body);
  },
  treeColorChangeStatus: (body) => {
    const url = "/api/Colors/ChangeStatusColor";
    return axiosClient.post(url, body);
  },
  treeColorRemove: (body) => {
    const url = "/api/Colors/DeleteColor";
    return axiosClient.post(url, body);
  },
  /** Component: category/tree/Crown **/
  treeCrownList: () => {
    const url = "/api/Crowns/GetCrownList";
    return axiosClient.post(url);
  },
  treeCrownByID: (body) => {
    const url = "/api/Crowns/GetCrownById";
    return axiosClient.post(url, body);
  },

  treeCrownChangeStatus: (body) => {
    const url = "/api/Crowns/ChangeStatus";
    return axiosClient.post(url, body);
  },

  treeCrownRemove: (body) => {
    const url = "/api/Crowns/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: category/tree/Land **/
  treeLandList: () => {
    const url = "/api/Lands/GetListLand";
    return axiosClient.post(url);
  },
  treeLandByID: (body) => {
    const url = "/api/Lands/GetLandById";
    return axiosClient.post(url, body);
  },
  treeLandChangeStatus: (body) => {
    const url = "/api/Lands/ChangeStatusLand";
    return axiosClient.post(url, body);
  },
  treeLandRemove: (body) => {
    const url = "/api/Lands/DeleteLand";
    return axiosClient.post(url, body);
  },

  /** Component: category/tree/Leaf **/
  treeLeafList: (body) => {
    const url = "/api/Leafs/GetListLeaf";
    return axiosClient.post(url, body);
  },

  treeLeafByID: (body) => {
    const url = "/api/Leafs/GetLeafById";
    return axiosClient.post(url, body);
  },
  treeLeafChangeStatus: (body) => {
    const url = "/api/Leafs/ChangeStatus";
    return axiosClient.post(url, body);
  },
  treeLeafRemove: (body) => {
    const url = "/api/Leafs/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: category/tree/Tree **/
  treeList: () => {
    const url = "/api/Trees/GetListTree";
    return axiosClient.post(url);
  },
  treeByID: (body) => {
    const url = "/api/Trees/GetTreeById";
    return axiosClient.post(url, body);
  },
  treeChangeStatus: (body) => {
    const url = "/api/Trees/ChangeStatus";
    return axiosClient.post(url, body);
  },
  treeRemove: (body) => {
    const url = "/api/Trees/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: category/tree/TreeCategory **/
  treeCategoryList: () => {
    const url = "/api/TreeCategories/GetListTreeCategory";
    return axiosClient.post(url);
  },

  treeCategoryByID: (body) => {
    const url = "/api/TreeCategories/GetTreeCategoryById";
    return axiosClient.post(url, body);
  },

  treeCategoryChangeStatus: (body) => {
    const url = "/api/TreeCategories/ChangeStatus";
    return axiosClient.post(url, body);
  },

  treeCategoryRemove: (body) => {
    const url = "/api/TreeCategories/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: category/tree/TreeGroup **/
  treeGroupList: () => {
    const url = "/api/TreeGroups/GetTreeGroupList";
    return axiosClient.post(url);
  },

  treeGroupByID: (body) => {
    const url = "/api/TreeGroups/GetTreeGroupById";
    return axiosClient.post(url, body);
  },

  treeGroupChangeStatus: (body) => {
    const url = "/api/TreeGroups/ChangeStatus";
    return axiosClient.post(url, body);
  },

  getTreeGroupActive: (body) => {
    const url = "/api/TreeGroups/GetTreeGroupActive";
    return axiosClient.post(url, body);
  },

  /** Component: category/tree/TreeStatus **/
  treeStatusList: () => {
    const url = "/api/TreeStatus/GetListTreeStatus";
    return axiosClient.post(url);
  },

  treeStatusByID: (body) => {
    const url = "/api/TreeStatus/GetTreeStatusById";
    return axiosClient.post(url, body);
  },

  treeStatusChangeStatus: (body) => {
    const url = "/api/TreeStatus/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: category/tree/TreeType **/
  getTreeType: () => {
    const url = "/api/TreeTypes/GetTreeTypeActive";
    return axiosClient.post(url);
  },

  treeTypeList: () => {
    const url = "/api/TreeTypes/GetTreeTypeList";
    return axiosClient.post(url);
  },

  treeTypeByID: (body) => {
    const url = "/api/TreeTypes/GetTreeTypeById";
    return axiosClient.post(url, body);
  },

  treeTypeChangeStatus: (body) => {
    const url = "/api/TreeTypes/ChangeStatus";
    return axiosClient.post(url, body);
  },
  treeTypeRemove: (body) => {
    const url = "/api/TreeTypes/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: function/tree/TreeData **/
  treeDataList: () => {
    const url = "/api/TreeDataCurrents/Get";
    return axiosClient.post(url);
  },
  treeDataByID: (body) => {
    const url = "/api/TreeDataCurrents/GetTreeCurrentDetailByID";
    return axiosClient.post(url, body);
  },
  treeDataRemove: (body) => {
    const url = "/api/TreeDataCurrents/Delete";
    return axiosClient.post(url, body);
  },
  treeDataByRouteID: (body) => {
    const url = "/api/TreeDataCurrents/GetByRouteID";
    return axiosClient.post(url, body);
  },
  getDataMapByID: (body) => {
    const url = "/api/TreeDataCurrents/GetMapByID";
    return axiosClient.post(url, body);
  },

  //category-ManagementUnit
  managementUnitList: () => {
    const url = "/api/ManagementUnit/Get";
    return axiosClient.post(url);
  },

  managementUnitListActive: (body) => {
    const url = "/api/ManagementUnit/GetActive";
    return axiosClient.post(url, body);
  },
  managementUnitByID: (body) => {
    const url = "/api/ManagementUnit/GetById";
    return axiosClient.post(url, body);
  },
  managementUnitChangeStatus: (body) => {
    const url = "/api/ManagementUnit/ChangeStatus";
    return axiosClient.post(url, body);
  },

  managementUnitRemove: (body) => {
    const url = "/api/ManagementUnit/Delete";
    return axiosClient.post(url, body);
  },

  //category-AreaMaintenance
  areaMaintenanceList: (body) => {
    const url = "/api/MaintenanceArea/Get";
    return axiosClient.post(url, body);
  },

  areaMaintenanceListActive: (body) => {
    const url = "/api/MaintenanceArea/GetActive";
    return axiosClient.post(url, body);
  },

  areaMaintenanceByID: (body) => {
    const url = "/api/MaintenanceArea/GetById";
    return axiosClient.post(url, body);
  },

  areaMaintenanceChangeStatus: (body) => {
    const url = "/api/MaintenanceArea/ChangeStatus";
    return axiosClient.post(url, body);
  },

  areaMaintenanceRemove: (body) => {
    const url = "/api/MaintenanceArea/Delete";
    return axiosClient.post(url, body);
  },

  //category-MaintenanceRequestType
  maintenanceRequestTypeList: () => {
    const url = "/api/MaintenanceRequestType/Get";
    return axiosClient.post(url);
  },

  maintenanceRequestTypeListActive: () => {
    const url = "/api/MaintenanceRequestType/GetActive";
    return axiosClient.post(url);
  },

  maintenanceRequestTypeByID: (body) => {
    const url = "/api/MaintenanceRequestType/GetById";
    return axiosClient.post(url, body);
  },
  maintenanceRequestTypeChangeStatus: (body) => {
    const url = "/api/MaintenanceRequestType/ChangeStatus";
    return axiosClient.post(url, body);
  },
  maintenanceRequestTypeRemove: (body) => {
    const url = "/api/MaintenanceRequestType/Delete";
    return axiosClient.post(url, body);
  },
  //function-MaintenanceRequests
  maintenanceRequestsList: () => {
    const url = "/api/MaintenanceRequests/Get";
    return axiosClient.post(url);
  },
  maintenanceRequestsByID: (body) => {
    const url = "/api/MaintenanceRequests/GetById";
    return axiosClient.post(url, body);
  },
  maintenanceRequestsRemove: (body) => {
    const url = "/api/MaintenanceRequests/Delete";
    return axiosClient.post(url, body);
  },

  //dashboard
  maintenanceDashboard: (body) => {
    const url = "/api/Dashboard/GetDashboard_TreeMaintenance";
    return axiosClient.post(url, body);
  },

  currentDashboard: (body) => {
    const url = "/api/Dashboard/GetDashboard_TreeDataCurrents";
    return axiosClient.post(url, body);
  },

  //tree
  treeChartMaintenance: (body) => {
    const url = "/api/ChartTreeMaintenance/GetChartMaintenance";
    return axiosClient.post(url, body);
  },
  treeDetailByID: (body) => {
    const url = "/api/MaintenanceRequests/GetByDetailID";
    return axiosClient.post(url, body);
  },

  //open/close
  isRequest: (body) => {
    const url = "/api/MaintenanceRequests/Close";
    return axiosClient.post(url, body);
  },
  //Approval/Return
  postApproval: (body) => {
    const url = "/api/MaintenanceRequests/Commit";
    return axiosClient.post(url, body);
  },
  postReturn: (body) => {
    const url = "/api/MaintenanceRequests/Return";
    return axiosClient.post(url, body);
  },
  reportTreeMaintenace: (body) => {
    const url = "/api/ReportTreeMaintenance/GetReportTreeMaintenance";
    return axiosClient.post(url, body);
  },
  reportTreeCategories: (body) => {
    const url = "/api/ReportTreeMaintenance/GetReportTreeCategories";
    return axiosClient.post(url, body);
  },
  treeGroupListActive: (body) => {
    const url = "/api/TreeTypes/GetTreeTypeActive";
    return axiosClient.post(url, body);
  },
  treeTypeListActive: (body) => {
    const url = "/api/TreeTypes/GetTreeTypeActive";
    return axiosClient.post(url, body);
  },
  treeRouteListActive: (body) => {
    const url = "/api/TreeRoutes/GetListTreeRouteActive";
    return axiosClient.post(url, body);
  },
  treeManagementListActive: (body) => {
    const url = "/api/ManagementUnit/GetActive";
    return axiosClient.post(url, body);
  },
  // report
  reportTreeTypes: (body) => {
    const url = "/api/ReportTreeMaintenance/GetReportTreeTypes";
    return axiosClient.post(url, body);
  },
  ReportTreeGroups: (body) => {
    const url = "/api/ReportTreeMaintenance/GetReportTreeGroups";
    return axiosClient.post(url, body);
  },
  ReportTreeStatus: (body) => {
    const url = "/api/ReportTreeMaintenance/GetReportTreeStatus";
    return axiosClient.post(url, body);
  },
  ReportTreeRoute: (body) => {
    const url = "/api/ReportTreeMaintenance/GetReportTreeRoute";
    return axiosClient.post(url, body);
  },
  reportTreeManagement: (body) => {
    const url = "/api/ReportTreeMaintenance/GetReportManagementUnit";
    return axiosClient.post(url, body);
  },

  /** Component: category/tree/Roots **/
  treeRootsList: (body) => {
    const url = "/api/TreeRoots/Get";
    return axiosClient.post(url, body);
  },
  treeRootsByID: (body) => {
    const url = "/api/TreeRoots/GetById";
    return axiosClient.post(url, body);
  },

  treeRootsChangeStatus: (body) => {
    const url = "/api/TreeRoots/ChangeStatus";
    return axiosClient.post(url, body);
  },

  treeRootsRemove: (body) => {
    const url = "/api/TreeRoots/Delete";
    return axiosClient.post(url, body);
  },
  treeStationByRegionID: (body) => {
    const url = "/api/TreeDataCurrents/GetByRouteID";
    return axiosClient.post(url, body);
  },

  //tree-color
  getListColor: (body = null) => {
    const url = "/api/Colors/GetListColor";
    return axiosClient.post(url, body);
  },
  getColorByID: (body) => {
    const url = "/api/Colors/GetColorById";
    return axiosClient.post(url, body);
  },
  addListColor: (body) => {
    const url = "/api/Colors/AddColor";
    return axiosClient.post(url, body);
  },
  editColor: (body) => {
    const url = "/api/Colors/EditColor";
    return axiosClient.post(url, body);
  },
  deleteColor: (body) => {
    const url = "/api/Colors/DeleteColor";
    return axiosClient.post(url, body);
  },
  //attachFile
  getAttachFile: (body) => {
    const url = "/api/AttachFiles/Get";
    return axiosClient.post(url, body);
  },
  addAttachFile: (body) => {
    const url = "/api/AttachFiles/Add";
    return axiosClient.post(url, body);
  },
  editAttachFile: (body) => {
    const url = "/api/AttachFiles/Edit";
    return axiosClient.post(url, body);
  },
  deleteAttachFile: (body) => {
    const url = "/api/AttachFiles/Delete";
    return axiosClient.post(url, body);
  },
  //print
  getFormPrint: (body) => {
    const url = "/api/FormPrint/Get";
    return axiosClient.post(url, body);
  },
  //find
  search: (body) => {
    const url = "/api/Search/Get";
    return axiosClient.post(url, body);
  },
  //importExcel
  importExcel: (body) => {
    const url = "/api/ImportData/ImportExcel";
    return axiosClient.post(url, body);
  },

  //search
  /**method(co- bang- khong co) */
  getMethodSearch: (body) => {
    const url = "/api/customize/GetMethod";
    return axiosClient.post(url, body);
  },

  // end
};

export default treeAPI;
