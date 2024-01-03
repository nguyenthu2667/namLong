import axiosClient from "../index";

const userAPI = {
  login: (body) => {
    const url = "/api/authentication/LoginUser";
    return axiosClient.post(url, body);
  },
  userList: () => {
    const url = "/api/user/GetListUser";
    return axiosClient.post(url);
  },
  userByID: (body) => {
    const url = "/api/user/GetUserByUserID";
    return axiosClient.post(url, body);
  },
  addUser: (body) => {
    const url = "/api/user/AddUser";
    return axiosClient.post(url, body);
  },
  editUser: (body) => {
    const url = "/api/user/EditUser";
    return axiosClient.post(url, body);
  },
  deleteUser: (body) => {
    const url = "/api/user/DelUser";
    return axiosClient.post(url, body);
  },
  userChangeStatus: (body) => {
    const url = "/api/user/EditStatusUser";
    return axiosClient.post(url, body);
  },
  userRemove: (body) => {
    const url = "/api/user/DelUser";
    return axiosClient.post(url, body);
  },
  userResetPassword: (body) => {
    const url = "/api/user/ResetPasswordUser";
    return axiosClient.post(url, body);
  },
  //maintain-deploy-employer
  employerList: (body = {}) => {
    const url = "/api/Employers/GetEmployerList";
    return axiosClient.post(url, body);
  },
  employerByID: (body = {}) => {
    const url = "/api/Employers/GetEmployerById";
    return axiosClient.post(url, body);
  },
  employerChangeStatus: (body = {}) => {
    const url = "/api/Employers/ChangeStatus";
    return axiosClient.post(url, body);
  },
  employerRemove: (body = {}) => {
    const url = "/api/Employers/Delete";
    return axiosClient.post(url, body);
  },
  employerResetPassword: (body = {}) => {
    const url = "/api/Employers/ResetPassword";
    return axiosClient.post(url, body);
  },

  //clients
  getCustomerList: (body = {}) => {
    const url = "/api/Customers/Get";
    return axiosClient.post(url, body);
  },
  getCustomerByID: (body = {}) => {
    const url = "/api/Customers/GetById";
    return axiosClient.post(url, body);
  },
  customerChangeStatus: (body = {}) => {
    const url = "/api/Customers/ChangeStatus";
    return axiosClient.post(url, body);
  },
  customerRemove: (body = {}) => {
    const url = "/api/Customers/Delete";
    return axiosClient.post(url, body);
  },

  userChangePassword: (body = {}) => {
    const url = "/api/authentication/ChangePasswordUser";
    return axiosClient.post(url, body);
  },
  userLogin: (body = {}) => {
    const url = "/api/authentication/LoginUser";
    return axiosClient.post(url, body);
  },
  getSalerByStoreID: (body = {}) => {
    const url = "/api/user/GetSalerByStore";
    return axiosClient.post(url, body);
  },
};

export default userAPI;
