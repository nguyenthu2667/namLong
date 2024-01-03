import axiosClient from '../index'

const aquaAPI = {
  //get-DataTypeID-byCreenID
  getDataTypeByID: (body = {}) => {
    const url = '/api/DataTypes/GetDataTypeByScreen'
    return axiosClient.post(url, body)
  },
  /** Component: dashboards/aqua/DashboardAnalytics **/
  aquaDashboardAnalytics: (body = {}) => {
    const url = '/api/AquaCharts/Stations'
    return axiosClient.post(url, body)
  },
  nodeDashboardAnalytics: (body = {}) => {
    const url = '/api/AquaCharts/Nodes'
    return axiosClient.post(url, body)
  },
  /** Component: dashboard/aqua/DashboardFollow **/
  aquaDashboardFollow: (body = {}) => {
    const url = '/api/Dashboard/GetDashboard_ByAquaculture'
    return axiosClient.post(url, body)
  },
  //value-station
  dataStationDay: (body = {}) => {
    const url = '/api/AquaStationCharts/Day'
    return axiosClient.post(url, body)
  },
  dataStationMonth: (body = {}) => {
    const url = '/api/AquaStationCharts/Month'
    return axiosClient.post(url, body)
  },
  dataStationYear: (body = {}) => {
    const url = '/api/AquaStationCharts/Year'
    return axiosClient.post(url, body)
  },
  //value-node
  dataNodeDay: (body = {}) => {
    const url = '/api/AquaNodeCharts/Day'
    return axiosClient.post(url, body)
  },
  dataNodeMonth: (body = {}) => {
    const url = '/api/AquaNodeCharts/Month'
    return axiosClient.post(url, body)
  },
  dataNodeYear: (body = {}) => {
    const url = '/api/AquaNodeCharts/Year'
    return axiosClient.post(url, body)
  },
  /** CATEGORY : category/aqua/Aquaculture **/
  AquaPondGet: (body = {}) => {
    const url = '/api/AquaStations/Get'
    return axiosClient.post(url, body)
  },
  //&& aquaFinishedFinishedProductByID
  aquaStationByID: (body = {}) => {
    const url = '/api/AquaStations/GetById'
    return axiosClient.post(url, body)
  },
  AquaPondChangeStatus: (body = {}) => {
    const url = '/api/AquaStations/ChangeStatus'
    return axiosClient.post(url, body)
  },

  AquaPondRemove: (body = {}) => {
    const url = '/api/AquaStations/Delete'
    return axiosClient.post(url, body)
  },
  //FinishedProduct
  aquaFinishedProductGet: (body = {}) => {
    const url = '/api/AquaStations/GetListExport'
    return axiosClient.post(url, body)
  },
  aquaFinishedFinishedProductRemove: (body = {}) => {
    const url = '/api/AquaStations/DeleteDeploy'
    return axiosClient.post(url, body)
  },
  //node
  NodeListAquaByID: (body = {}) => {
    const url = '/api/StationNodes/Get'
    return axiosClient.post(url, body)
  },

  NodeChangeStatus: (body = {}) => {
    const url = '/api/StationNodes/ChangeStatus'
    return axiosClient.post(url, body)
  },
  NodeByID: (body = {}) => {
    const url = '/api/StationNodes/GetById'
    return axiosClient.post(url, body)
  },

  NodeRemove: (body = {}) => {
    const url = '/api/StationNodes/Delete'
    return axiosClient.post(url, body)
  },
  //extras
  ExtrasListAquaByID: (body = {}) => {
    const url = '/api/StationExtras/Get'
    return axiosClient.post(url, body)
  },
  ExtrasChangeStatus: (body = {}) => {
    const url = '/api/StationExtras/ChangeStatus'
    return axiosClient.post(url, body)
  },
  ExtrasByID: (body = {}) => {
    const url = '/api/StationExtras/GetById'
    return axiosClient.post(url, body)
  },
  ExtrasRemove: (body = {}) => {
    const url = '/api/StationExtras/Delete'
    return axiosClient.post(url, body)
  },
  /** Component: report/aqua/CurrentAquaReport **/
  getActiveStations: (body = {}) => {
    const url = '/api/AquaStations/GetActive'
    return axiosClient.post(url, body)
  },
  CurrentAquaReport: (body = {}) => {
    const url = '/api/AquaReports/Current'
    return axiosClient.post(url, body)
  },
  TotalAquaReport: (body = {}) => {
    const url = '/api/AquaReports/Total'
    return axiosClient.post(url, body)
  },
  DetailAquaReport: (body = {}) => {
    const url = '/api/AquaReports/Detail'
    return axiosClient.post(url, body)
  },
  ErrAquaReport: (body = {}) => {
    const url = '/api/AquaReports/Error'
    return axiosClient.post(url, body)
  },
  WarningAquaReport: (body = {}) => {
    const url = '/api/AquaReports/Warning'
    return axiosClient.post(url, body)
  },
  /**  get list node active **/
  getNodeActive: (body = {}) => {
    const url = '/api/StationNodes/GetActive'
    return axiosClient.post(url, body)
  },
  listUnit: (body = {}) => {
    const url = '/api/AquaReports/GetListForDetail'
    return axiosClient.post(url, body)
  },
}

export default aquaAPI