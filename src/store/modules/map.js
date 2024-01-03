import { defaultMapType, defaultRegionCode } from '../../constants/config'

export default {
    state: {
        regionCenter: defaultRegionCode,
        layers: [],
        dataLayers: [],
        type: defaultMapType
    },
    getters: {
        layers: state => state.layers,
        typeMap: state => state.type,
        regionCenter: state => state.regionCenter,
    },
    mutations: {
        SET_LAYER(state, payload) {
            state.layers = payload
        },
        SET_TYPE_MAP(state, payload) {
            state.type = payload
        }
    },
    actions: {
        setLayer({ commit }, payload) {
            commit('SET_LAYER', payload)
        },
        setTypeMap({ commit }, payload) {
            commit('SET_TYPE_MAP', payload)
        }
    }
}