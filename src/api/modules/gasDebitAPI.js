import axiosClient from "../index";

const gasDebitAPI = {
  debitValueGasList: () => {
    const url = "/api/DebitGasValues/Get";
    return axiosClient.post(url);
  },
  debitValueGasByID: (body) => {
    const url = "/api/DebitGasValues/GetById";
    return axiosClient.post(url, body);
  },
  debitValueGasRemove: (body = null) => {
    const url = "/api/DebitGasValues/Delete";
    return axiosClient.post(url, body);
  },
};

export default gasDebitAPI;
