import axiosClient from "../index";

const indicatorAPI = {
  indicatorListRange: (body) => {
    const url = "/api/Indicators/GetListIndicatorRanges";
    return axiosClient.post(url, body);
  },
  indicatorByIDRange: (body) => {
    const url = "/api/Indicators/GetIndicatorRangesByID";
    return axiosClient.post(url, body);
  },
  indicatorRemoveRanges: (body) => {
    const url = "/api/Indicators/DeleteIndicatorRanges";
    return axiosClient.post(url, body);
  },
  indicatorList: (body = {}) => {
    const url = "/api/Indicators/GetListIndicators";
    return axiosClient.post(url, body ?? {});
  },
  indicatorListActive: (body = {}) => {
    const url = "/api/Indicators/GetListIndicatorsActive";
    return axiosClient.post(url, body);
  },
  indicatorByID: (body = {}) => {
    const url = "/api/Indicators/GetListIndicatorsById";
    return axiosClient.post(url, body);
  },
  indicatorChangeStatus: (body = {}) => {
    const url = "/api/Indicators/ChangeStatusIndicators";
    return axiosClient.post(url, body);
  },
  indicatorRemove: (body = {}) => {
    const url = "/api/Indicators/DeleteIndicators";
    return axiosClient.post(url, body);
  },
  indicatorListRange: (body = {}) => {
    const url = "/api/Indicators/GetListIndicatorRanges";
    return axiosClient.post(url, body);
  },
  indicatorByIDRange: (body = {}) => {
    const url = "/api/Indicators/GetIndicatorRangesByID";
    return axiosClient.post(url, body);
  },
  indicatorRemoveRanges: (body = {}) => {
    const url = "/api/Indicators/DeleteIndicatorRanges";
    return axiosClient.post(url, body);
  },
  indicatorEditRanges: (body = {}) => {
    const url = "/api/Indicators/EditIndicatorRanges";
    return axiosClient.post(url, body);
  },
  //IndicatorWarningByStations
  getIndicatorWarningByStations: (body = {}) => {
    const url = "/api/IndicatorWarningByStations/Get";
    return axiosClient.post(url, body);
  },
  getIndicatorWarningByStationsByID: (body = {}) => {
    const url = "/api/IndicatorWarningByStations/GetById";
    return axiosClient.post(url, body);
  },
  removeIndicatorWarningByStation: (body = {}) => {
    const url = "/api/IndicatorWarningByStations/Delete";
    return axiosClient.post(url, body);
  },
  changeStatusIndicatorWarningByStation: (body = {}) => {
    const url = "/api/IndicatorWarningByStations/ChangeStatus";
    return axiosClient.post(url, body);
  },
  indicatorWarningList: (body = {}) => {
    const url = "/api/IndicatorWarnings/GetListIndicatorWarning";
    return axiosClient.post(url, body);
  },
  indicatorWarningByID: (body = {}) => {
    const url = "/api/IndicatorWarnings/GetIndicatorWarningById";
    return axiosClient.post(url, body);
  },
  indicatorWarningChangeStatus: (body = {}) => {
    const url = "/api/IndicatorWarnings/ChangeStatusIndicatorWarning";
    return axiosClient.post(url, body);
  },
  indicatorWarningRemove: (body = {}) => {
    const url = "/api/IndicatorWarnings/DeleteIndicatorWarning";
    return axiosClient.post(url, body);
  },
};

export default indicatorAPI;
