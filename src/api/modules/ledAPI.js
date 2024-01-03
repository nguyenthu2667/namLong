import axiosClient from '../index'

const ledAPI = {
  //category
  getLedStationsList: (body = {}) => {
    const url = '/api/LedStations/Get'
    return axiosClient.post(url, body)
  },
  getLedStationsListActive: (body = {}) => {
    const url = '/api/LedStations/GetActive'
    return axiosClient.post(url, body)
  },
  getLedStationsByID: (body = {}) => {
    const url = '/api/LedStations/GetByID'
    return axiosClient.post(url, body)
  },
  ledStationsAdd: (body = {}) => {
    const url = '/api/LedStations/Add'
    return axiosClient.post(url, body)
  },
  ledStationsEdit: (body = {}) => {
    const url = '/api/LedStations/Edit'
    return axiosClient.post(url, body)
  },
  ledStationsChangeStatus: (body = {}) => {
    const url = '/api/LedStations/ChangeStatus'
    return axiosClient.post(url, body)
  },
  ledStationsRemove: (body = {}) => {
    const url = '/api/LedStations/Delete'
    return axiosClient.post(url, body)
  },
  getExport: (body = {}) => {
    const url = '/api/LedStations/GetExport'
    return axiosClient.post(url, body)
  },
  exportProduct: (body = {}) => {
    const url = '/api/LedStations/ExportProduct'
    return axiosClient.post(url, body)
  },
  //function
  scheduleList: (body = {}) => {
    const url = '/api/ScheduleSlideShows/Get'
    return axiosClient.post(url, body)
  },
  scheduleByID: (body = {}) => {
    const url = '/api/ScheduleSlideShows/GetByID'
    return axiosClient.post(url, body)
  },
  stationSelect: (body = {}) => {
    const url = '/api/ScheduleSlideShows/GetStationSelect'
    return axiosClient.post(url, body)
  },
  scheduleChangeStatus: (body = {}) => {
    const url = '/api/ScheduleSlideShows/EditStatus'
    return axiosClient.post(url, body)
  },
  scheduleAdd: (body = {}) => {
    const url = '/api/ScheduleSlideShows/Add'
    return axiosClient.post(url, body)
  },
  scheduleEdit: (body = {}) => {
    const url = '/api/ScheduleSlideShows/Edit'
    return axiosClient.post(url, body)
  },
  scheduleDelete: (body = {}) => {
    const url = '/api/ScheduleSlideShows/Del'
    return axiosClient.post(url, body)
  },
  //dashboard
  ledStationHistory: (body = {}) => {
    const url = '/api/SlideShowReports/Get'
    return axiosClient.post(url, body)
  },
  scheduleChart: (body = {}) => {
    const url = '/api/SlideShowReports/Chart'
    return axiosClient.post(url, body)
  },
  //report
  ledStationReport: (body = {}) => {
    const url = '/api/SlideShowReports/Get'
    return axiosClient.post(url, body)
  },
  //other
  sharePowerTypeList: (body = {}) => {
    const url = '/api/PowerTypes/GetListPowerType'
    return axiosClient.post(url, body)
  },
  shareConnectTypeList: (body = {}) => {
    const url = '/api/ConnectTypes/GetListConnectType'
    return axiosClient.post(url, body)
  },
}

export default ledAPI