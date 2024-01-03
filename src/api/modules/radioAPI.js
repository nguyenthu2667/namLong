import axiosClient from '../index'

const radioAPI = {
    radioStationByID: (body) => {
        const url = '/api/RadioStations/GetByRegionID'
        return axiosClient.post(url, body)
    },
    changePlaybackAndVocal: (body) => {
        const url = '/api/RadioSchedules/UpdatePlayback'
        return axiosClient.post(url, body)
    },

    //function
    radioScheduleList: (body) => {
        const url = '/api/RadioSchedules/GetRadioScheduleList'
        return axiosClient.post(url, body)
    },
    radioScheduleByID: (body) => {
        const url = '/api/RadioSchedules/GetRadioScheduleById'
        return axiosClient.post(url, body)
    },
    radioSchedulesAdd: (body) => {
        const url = '/api/RadioSchedules/Add'
        return axiosClient.post(url, body)
    },
    radioSchedulesEdit: (body) => {
        const url = '/api/RadioSchedules/Edit'
        return axiosClient.post(url, body)
    },
    radioSchedulesChangeStatus: (body) => {
        const url = '/api/RadioSchedules/ChangeStatus'
        return axiosClient.post(url, body)
    },
    radioSchedulesDelete: (body) => {
        const url = '/api/RadioSchedules/Delete'
        return axiosClient.post(url, body)
    },
    getRadioListActive: (body) => {
        const url = '/api/RadioStations/GetActive'
        return axiosClient.post(url, body)
    },
    radioRelayListActive: (body) => {
        const url = '/api/RadioRelay/GetActive'
        return axiosClient.post(url, body)
    },
    radioFMListActive: (body) => {
        const url = '/api/RadioFMTransceiver/GetActive'
        return axiosClient.post(url, body)
    },
    //get history-play
    getReportHistoryPlay: (body) => {
        const url = '/api/RadioSchedulesReports/Get'
        return axiosClient.post(url, body)
    },
}

export default radioAPI