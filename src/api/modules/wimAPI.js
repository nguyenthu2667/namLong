import axiosClient from '../index'


const wimAPI = {
  //options
  getLanes: (body = {}) => {
    const url = '/api/WimDatas/GetLaneList'
    return axiosClient.post(url, body)
  },
  getVehicleTypeActive: (body = {}) => {
    const url = '/api/WimDatas/GetVehicleTypeList'
    return axiosClient.post(url, body)
  },
  //dashboard
  wimDashboard: (body = {}) => {
    const url = '/api/Dashboard/GetDashboard_ByWIM'
    return axiosClient.post(url, body)
  },
  getWeather: (body = {}) => {
    const url = '/api/WimDatas/GetWeather'
    return axiosClient.post(url, body)
  },
  //function
  wimDatas: (body = {}) => {
    const url = '/api/WimDatas/Get'
    return axiosClient.post(url, body)
  },
  wimDatasMore: (body = {}) => {
    const url = '/api/WimDatas/GetMore'
    return axiosClient.post(url, body)
  },
  wimByID: (body = {}) => {
    const url = '/api/WimDatas/GetByID'
    return axiosClient.post(url, body)
  },
  wimReportByID: (body = {}) => {
    const url = '/api/WimDatas/GetForReport'
    return axiosClient.post(url, body)
  },
  wimPunishment: (body = {}) => {
    const url = '/api/WimDatas/GetReport'
    return axiosClient.post(url, body)
  },
  wimOverload: (body = {}) => {
    const url = '/api/WimDatas/GetOverload'
    return axiosClient.post(url, body)
  },
  wimHistory: (body = {}) => {
    const url = '/api/WimDatas/GetHistories'
    return axiosClient.post(url, body)
  },
  addReportVim: (body = {}) => {
    const url = '/api/WimDatas/AddWimReport'
    return axiosClient.post(url, body)
  },
  editReportVim: (body = {}) => {
    const url = '/api/WimDatas/EditWimReport'
    return axiosClient.post(url, body)
  },
}

export default wimAPI