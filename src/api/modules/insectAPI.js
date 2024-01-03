import axiosClient from "../index";

const insectAPI = {
  /** Component: category/camera/CameraSecurity, security/decentralization/CameraSecurity **/
  insectOneList: (body) => {
    const url = "/api/InsectOneStations/GetList";
    return axiosClient.post(url, body);
  },
  /** Component: category/camera/CameraSecurity **/
  insectOneByID: () => {
    const url = "/api/InsectOneStations/GetById";
    return axiosClient.post(url);
  },

  insectOneChangeStatus: (body) => {
    const url = "/api/InsectOneStations/ChangeStatus";
    return axiosClient.post(url, body);
  },
  insectOneRemove: (body = {}) => {
    const url = "/api/InsectOneStations/Delete";
    return axiosClient.post(url, body);
  },
};

export default insectAPI;
