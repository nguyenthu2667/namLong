import axiosClient from "../index";

/** Component: category/shared/PowerType **/
const dataBeginStartsVehiclesAPI = {
    //Data Gas
  getListDataGas: (body) => {
    const url = "/api/DataBeginStartsVehicles/Get";
    return axiosClient.post(url, body);
  },
  getDataGasByID: (body) => {
    const url = "/api/DataBeginStartsVehicles/GetById";
    return axiosClient.post(url, body);
  },
  addDataGas: (body) => {
    const url = "/api/DataBeginStartsVehicles/Add";
    return axiosClient.post(url, body);
  },
  editDataGas: (body) => {
    const url = "/api/DataBeginStartsVehicles/Edit";
    return axiosClient.post(url, body);
  },
  deleteDataGas: (body) => {
    const url = "/api/DataBeginStartsVehicles/Delete";
    return axiosClient.post(url, body);
  },
  dataBlock: (body) => {
    const url = "/api/DataBeginStartsVehicles/ChangeStatus";
    return axiosClient.post(url, body);
  },  
  dataCopy: (body) => {
    const url = "/api/DataBeginStartsVehicles/Copy";
    return axiosClient.post(url, body);
  },  
};

export default dataBeginStartsVehiclesAPI;
