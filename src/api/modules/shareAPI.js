import axiosClient from "../index";

/** Component: category/shared/PowerType **/
const shareAPI = {
  sharePowerTypeByID: (body) => {
    const url = "/api/PowerTypes/GetPowerTypeById";
    return axiosClient.post(url, body);
  },
  sharePowerTypeChangeStatus: (body) => {
    const url = "/api/PowerTypes/ChangeStatusPowerType";
    return axiosClient.post(url, body);
  },
  sharePowerTypeRemove: (body) => {
    const url = "/api/PowerTypes/DeletePowerType";
    return axiosClient.post(url, body);
  },
  sharePowerTypeEdit: (body) => {
    const url = "/api/PowerTypes/EditPowerType";
    return axiosClient.post(url, body);
  },
  sharePowerTypeAdd: (body) => {
    const url = "/api/PowerTypes/AddPowerType";
    return axiosClient.post(url, body);
  },

  /** Component: category/shared/ConnectType **/
  shareConnectTypeList: () => {
    const url = "/api/ConnectTypes/GetListConnectType";
    return axiosClient.post(url);
  },
  shareConnectTypeByID: (body) => {
    const url = "/api/ConnectTypes/GetConnectTypeTypeById";
    return axiosClient.post(url, body);
  },
  shareConnectTypeChangeStatus: (body) => {
    const url = "/api/ConnectTypes/ChangeStatusConnectType";
    return axiosClient.post(url, body);
  },
  shareConnectTypeRemove: (body) => {
    const url = "/api/ConnectTypes/DeleteConnectType";
    return axiosClient.post(url, body);
  },
  shareConnectTypeEdit: (body) => {
    const url = "/api/ConnectTypes/EditConnectType";
    return axiosClient.post(url, body);
  },
  shareConnectTypeAdd: (body) => {
    const url = "/api/ConnectTypes/AddConnectType";
    return axiosClient.post(url, body);
  },
  /** Component: category/shared/Devices **/
  shareDeviceList: (body) => {
    const url = "/api/DeviceInfos/GetListDeviceInfo";
    return axiosClient.post(url, body);
  },
  shareDeviceByID: (body) => {
    const url = "/api/DeviceInfos/GetListDeviceInfosById";
    return axiosClient.post(url, body);
  },
  shareDeviceChangeStatus: (body) => {
    const url = "/api/DeviceInfos/ChangeStatusDeviceInfo";
    return axiosClient.post(url, body);
  },
  shareDeviceRemove: (body) => {
    const url = "/api/DeviceInfos/DeleteDeviceInfo";
    return axiosClient.post(url, body);
  },

  /** Component: category/shared/Region **/
  shareRegionList: (body) => {
    const url = "/api/Regions/GetRegionList";
    return axiosClient.post(url, body);
  },
  shareRegionByID: (body) => {
    const url = "/api/Regions/GetSRegionById";
    return axiosClient.post(url, body);
  },
  shareRegionChangeStatus: (body) => {
    const url = "/api/Regions/ChangeStatus";
    return axiosClient.post(url, body);
  },
  shareRegionRemove: (body) => {
    const url = "/api/Regions/Delete";
    return axiosClient.post(url, body);
  },
  shareRegionEdit: (body) => {
    const url = "/api/Regions/Edit";
    return axiosClient.post(url, body);
  },
  shareRegionAdd: (body) => {
    const url = "/api/Regions/Add";
    return axiosClient.post(url, body);
  },

  /** Component: category/shared/Waterway **/
  shareWaterWayList: (body) => {
    const url = "/api/WaterwayRoutes/GetActive";
    return axiosClient.post(url, body);
  },
  /** Component: category/shared/Waterway **/
  shareWaterWaySizeList: (body) => {
    const url = "/api/WaterwayTypes/GetSize";
    return axiosClient.post(url, body);
  },
  shareWaterWayActiveList: () => {
    const url = "/api/WaterwayTypes/GetActive";
    return axiosClient.post(url);
  },

  //other
  sharePowerTypeList: (body = {}) => {
    const url = "/api/PowerTypes/GetListPowerType";
    return axiosClient.post(url, body);
  },
};

export default shareAPI;
