import axiosClient from '../index'

const warningAPI = {
    levelWarningList: (body = {}) => {
        const url = '/api/LevelWarnings/GetListLevelWarning'
        return axiosClient.post(url, body)
    },
    levelWarningListActive: (body = {}) => {
        const url = '/api/LevelWarnings/GetListLevelWarningActive'
        return axiosClient.post(url, body)
    },
    levelWarningByID: (body = {}) => {
        const url = '/api/LevelWarnings/GetLevelWarningById'
        return axiosClient.post(url, body)
    },
    levelWarningChangeStatus: (body = {}) => {
        const url = '/api/LevelWarnings/ChangeStatusLevelWarning'
        return axiosClient.post(url, body)
    },
    levelWarningRemove: (body = {}) => {
        const url = '/api/LevelWarnings/DeleteLevelWarning'
        return axiosClient.post(url, body)
    },

}

export default warningAPI