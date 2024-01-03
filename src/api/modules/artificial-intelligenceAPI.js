import axiosClient from "../index";

const artificialIntelligenceAPI = {
  /** Component: category/thermal/FaceData, report/thermal/ThermalEmployer **/
  dataFaceList: (body) => {
    const url = "/api/FaceDatas/Get";
    return axiosClient.post(url, body);
  },
  /** Component: category/thermal/FaceData **/
  dataFaceByID: (body) => {
    const url = "/api/FaceDatas/GetById";
    return axiosClient.post(url, body);
  },

  dataFaceChangeStatus: (body) => {
    const url = "/api/FaceDatas/ChangeStatus";
    return axiosClient.post(url, body);
  },
  dataFaceRemove: (body = {}) => {
    const url = "/api/FaceDatas/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: category/thermal/BlackList **/
  dataBlackList: () => {
    const url = "/api/BlackLists/Get";
    return axiosClient.post(url);
  },

  dataBlackListByID: (body = {}) => {
    const url = "/api/BlackLists/GetById";
    return axiosClient.post(url, body);
  },
  dataBlackListChangeStatus: (body = {}) => {
    const url = "/api/BlackLists/ChangeStatus";
    return axiosClient.post(url, body);
  },
  dataBlackListRemove: (body = {}) => {
    const url = "/api/BlackLists/Delete";
    return axiosClient.post(url, body);
  },
  /** Component: category/thermal/Position **/
  dataPosition: (body = {}) => {
    const url = "/api/Positions/Get";
    return axiosClient.post(url, body);
  },

  dataPositionByID: (body = {}) => {
    const url = "/api/Positions/GetById";
    return axiosClient.post(url, body);
  },

  dataPositionChangeStatus: (body = {}) => {
    const url = "/api/Positions/ChangeStatus";
    return axiosClient.post(url, body);
  },

  dataPositionRemove: (body = {}) => {
    const url = "/api/Positions/Delete";
    return axiosClient.post(url, body);
  },
};

export default artificialIntelligenceAPI;
