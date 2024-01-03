
export default {
    state: {
        stateNotification: false
    },
    getters: {
        notification: state => state.stateNotification,
    },
    mutations: {
        changeStateNotification(state, payload) {
            state.stateNotification = payload
        }
    },
    actions: {
        setNotification({ commit }, payload) {
            commit('changeStateNotification', payload)
        }
    },
}