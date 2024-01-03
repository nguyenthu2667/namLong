import axiosClient from "../index";

const contactAPI = {
  getContacts: (body) => {
    const url = "/api/Contacts/Get";
    return axiosClient.post(url, body);
  },

  getContactByID: (body) => {
    const url = "/api/Contacts/GetById";
    return axiosClient.post(url, body);
  },

  updateApproval: (body) => {
    const url = "/api/Contacts/UpdateApproval";
    return axiosClient.post(url, body);
  },

  updateNote: (body) => {
    const url = "/api/Contacts/UpdateNote";
    return axiosClient.post(url, body);
  },
};

export default contactAPI;
