import axiosClient from "../index";

const cameraAPI = {
  /** Component: category/camera/CameraSecurity, security/decentralization/CameraSecurity **/
  cameraSecurityList: (body) => {
    const url = "/api/CameraRight/GetView";
    return axiosClient.post(url, body);
  },
  /** Component: category/camera/CameraSecurity **/
  cameraSecurityGet: () => {
    const url = "/api/Cameras/Get";
    return axiosClient.post(url);
  },

  cameraSecurityByID: (body) => {
    const url = "/api/Cameras/GetById";
    return axiosClient.post(url, body);
  },
  cameraSecurityChangeStatus: (body = {}) => {
    const url = "/api/Cameras/ChangeStatus";
    return axiosClient.post(url, body);
  },
  cameraSecurityRemove: (body = {}) => {
    const url = "/api/Cameras/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: security/decentralization/CameraSecurity **/
  cameraSecurityRight: (body = {}) => {
    const url = "/api/CameraRight/GetEdit";
    return axiosClient.post(url, body);
  },
  cameraSecurityRightEdit: (body = {}) => {
    const url = "/api/CameraRight/Edit";
    return axiosClient.post(url, body);
  },
};

export default cameraAPI;
