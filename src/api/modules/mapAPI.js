import axiosClient from '../index'

const mapAPI = {
    mapNowByCode: (body) => {
        const url = '/api/Maps/GetMapNow_ByDataCode'
        return axiosClient.post(url, body)
    },
    getOptionFilterByCode: (body) => {
        const url = '/api/Maps/GetFilter_ByDataCode'
        return axiosClient.post(url, body)
    },
}

export default mapAPI