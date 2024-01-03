import axiosClient from "../index";

/** Component: category/shared/PowerType **/
const shipperAPI = {
  shipperByStoreID: (body) => {
    const url = "/api/Shippers/GetByStoreID";
    return axiosClient.post(url, body);
  },
  shipperGet: () => {
    const url = "/api/Shippers/Get";
    return axiosClient.post(url);
  },
  shipperGetActive: () => {
    const url = "/api/Shippers/GetActive";
    return axiosClient.post(url);
  },

  /** Component: category/shared/ConnectType **/
  shipperByID: () => {
    const url = "/api/Shippers/GetByID";
    return axiosClient.post(url);
  },
  shipperRemove: (body) => {
    const url = "/api/Shippers/Delete";
    return axiosClient.post(url, body);
  },
  shipperChangeStatus: (body) => {
    const url = "/api/Shippers/ChangeStatus";
    return axiosClient.post(url, body);
  },
  employerResetPassword: (body) => {
    const url = "/api/Shippers/ResetPassword";
    return axiosClient.post(url, body);
  },
};

export default shipperAPI;
