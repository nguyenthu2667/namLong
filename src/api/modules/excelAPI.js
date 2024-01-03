import axiosClient from "../index";

const collectAPI = {
  /** Component: dashboards/CollectType **/
  importExcelTemplateList: () => {
    const url = "/api/ExcelTemplates/GetListImportExcelTemplate";
    return axiosClient.post(url);
  },

  excelTemplateChangeStatus: (body) => {
    const url = "/api/ExcelTemplates/ChangeStatusExcelTemplate";
    return axiosClient.post(url, body);
  },

  /** Component: category/collect/CollectType **/

  excelTemplateRemove: (body) => {
    const url = "('/api/ExcelTemplates/DeleteExcelTemplate";
    return axiosClient.post(url, body);
  },

  excelTemplateByID: (body) => {
    const url = "/api/ExcelTemplates/GetExcelTemplateById";
    return axiosClient.post(url, body);
  },
  exportExcelTemplateList: (body) => {
    const url = "/api/ExcelTemplates/GetListExportExcelTemplate";
    return axiosClient.post(url, body);
  },
  exportExcel: (body) => {
    const url = "/api/ExportExcel/Export";
    return axiosClient.post(url, body);
  },
  listExportExcelManager: (body) => {
    const url = "/api/ExportExcel/GetListExportExcel";
    return axiosClient.post(url, body);
  },

  /** Component: category/collect/TreeRoute **/
  excelManagerRemove: (body) => {
    const url = "/api/ExportExcel/DeleteExcelTemplate";
    return axiosClient.post(url, body);
  },
  // end
};

export default collectAPI;
