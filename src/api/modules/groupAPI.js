import axiosClient from "../index";

const groupAPI = {
  /** Component: security/manager/Group, security/manager/User, security/manager/MenuRight **/
  groupUserList: () => {
    const url = "/api/groupuser/GetListGroupUser";
    return axiosClient.post(url);
  },

  groupUserListActive: () => {
    const url = "/api/groupuser/GetGroupUserActive";
    return axiosClient.post(url);
  },

  /** Component: security/manager/Group **/

  groupUserByID: (body) => {
    const url = "/api/groupuser/GetGroupUserByID";
    return axiosClient.post(url, body);
  },
  addGroupUser: (body) => {
    const url = "/api/groupuser/AddGroupUser";
    return axiosClient.post(url, body);
  },
  editGroupUser: (body) => {
    const url = "/api/groupuser/EditGroupUser";
    return axiosClient.post(url, body);
  },
  deleteGroupUser: (body) => {
    const url = "/api/groupuser/DelGroupUser";
    return axiosClient.post(url, body);
  },
  groupUserChangeStatus: (body) => {
    const url = "/api/groupuser/EditStatusGroupUser";
    return axiosClient.post(url, body);
  },
  groupUserRemove: (body) => {
    const url = "/api/groupuser/DelGroupUser";
    return axiosClient.post(url, body);
  },
  /** Component: security/employer/GroupEmployer, security/employer/Employer **/
  groupEmployerList: (body = {}) => {
    const url = "/api/GroupEmployers/GetGroupEmployerList";
    return axiosClient.post(url, body);
  },
  groupEmployerListActive: (body) => {
    const url = "/api/GroupEmployers/GetGroupEmployerActive";
    return axiosClient.post(url, body);
  },

  /** Component: security/employer/GroupEmployer **/
  groupEmployerByID: (body) => {
    const url = "/api/GroupEmployers/GetGroupEmployerById";
    return axiosClient.post(url, body);
  },
  groupEmployerChangeStatus: (body) => {
    const url = "/api/GroupEmployers/ChangeStatus";
    return axiosClient.post(url, body);
  },
  groupEmployerRemove: (body) => {
    const url = "/api/GroupEmployers/Delete";
    return axiosClient.post(url, body);
  },

  /** Component: security/customer/GroupCustomer, security/customer/Customer **/
  groupCustomerList: (body) => {
    const url = "/api/GroupCustomers/Get";
    return axiosClient.post(url, body);
  },

  groupCustomerByID: (body) => {
    const url = "/api/GroupCustomers/GetById";
    return axiosClient.post(url, body);
  },

  groupCustomerChangeStatus: (body) => {
    const url = "/api/GroupCustomers/ChangeStatus";
    return axiosClient.post(url, body);
  },
  groupCustomerRemove: (body) => {
    const url = "/api/GroupCustomers/Delete";
    return axiosClient.post(url, body);
  },
  groupCustomerListActive: (body) => {
    const url = "/api/GroupCustomers/GetActive";
    return axiosClient.post(url, body);
  },
  recursiveGroupCustomersActiveAll: (body) => {
    const url = "/api/GroupCustomers/GetActiveAll";
    return axiosClient.post(url, body);
  },
  recursiveGroupsActiveAll: (body) => {
    const url = "/api/groupuser/GetActiveAll";
    return axiosClient.post(url, body);
  },
  // end
};

export default groupAPI;
