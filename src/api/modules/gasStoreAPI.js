import axiosClient from "../index";

const gasStoreAPI = {
  gasStoreList: () => {
    const url = "/api/Stores/Get";
    return axiosClient.post(url);
  },
  gasStoreListActive: () => {
    const url = "/api/Stores/GetActive";
    return axiosClient.post(url);
  },
  gasStoreByID: (body = null) => {
    const url = "/api/Stores/GetById";
    return axiosClient.post(url, body);
  },
  gasStoreChangeStatus: (body = null) => {
    const url = "/api/Stores/ChangeStatus";
    return axiosClient.post(url, body);
  },
  gasStoreRemove: (body = null) => {
    const url = "/api/Stores/Delete";
    return axiosClient.post(url, body);
  },
  gasStoreRight: (body = null) => {
    const url = "/api/StationRights_ByGroup/Get";
    return axiosClient.post(url, body);
  },
  gasStoreRightEdit: (body = null) => {
    const url = "/api/StationRights_ByGroup/Edit";
    return axiosClient.post(url, body);
  },
};

export default gasStoreAPI;
