import axiosClient from '../index'

const notificationAPI = {
  getNotify: (body = null) => {
    const url = '/api/Notify/Get'
    return axiosClient.post(url, body)
  },
  tokenAdd: (body = null) => {
    const url = '/api/TokenApp/Add'
    return axiosClient.post(url, body)
  },
  tokenDelete: (body = null) => {
    const url = '/api/TokenApp/Delete'
    return axiosClient.post(url, body)
  },
  tokenEditLanguage: (body = null) => {
    const url = '/api/TokenApp/EditLanguage'
    return axiosClient.post(url, body)
  },
  getTotalNotify: (body = null) => {
    const url = '/api/Notify/GetTotal'
    return axiosClient.post(url, body)
  },
  updateViewNotify: (body = null) => {
    const url = '/api/Notify/UpdateView'
    return axiosClient.post(url, body)
  },
  getTop30: (body = null) => {
    const url = '/api/Notify/GetTop30'
    return axiosClient.post(url, body)
  },
  //Internal-Notifications
  getInternalNotifications: (body = null) => {
    const url = '/api/InternalNotifications/Get'
    return axiosClient.post(url, body)
  },
  getInternalNotificationsByID: (body = null) => {
    const url = '/api/InternalNotifications/GetById'
    return axiosClient.post(url, body)
  },
  removeInternalNotifications: (body = null) => {
    const url = '/api/InternalNotifications/Delete'
    return axiosClient.post(url, body)
  },
  changeStatusInternalNotifications: (body = null) => {
    const url = '/api/InternalNotifications/ChangeStatus'
    return axiosClient.post(url, body)
  },
  resetSendInternalNotifications: (body = null) => {
    const url = '/api/InternalNotifications/ResetSend'
    return axiosClient.post(url, body)
  },
  //Customer-Notifications
  getCustomerNotifications: (body = null) => {
    const url = '/api/CustomerNotifications/Get'
    return axiosClient.post(url, body)
  },
  getCustomerNotificationsByID: (body = null) => {
    const url = '/api/CustomerNotifications/GetById'
    return axiosClient.post(url, body)
  },
  removeCustomerNotifications: (body = null) => {
    const url = '/api/CustomerNotifications/Delete'
    return axiosClient.post(url, body)
  },
  changeStatusCustomerNotifications: (body = null) => {
    const url = '/api/CustomerNotifications/ChangeStatus'
    return axiosClient.post(url, body)
  },
  resetSendCustomerNotifications: (body = null) => {
    const url = '/api/CustomerNotifications/ResetSend'
    return axiosClient.post(url, body)
  },
}

export default notificationAPI
