import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import app from '../main'
import menu from './modules/menu'
import user from './modules/user'
import map from './modules/map'
import chat from './modules/chat'
import todo from './modules/todo'
import survey from './modules/survey'
import notification from './modules/notification'
import { setCurrentLanguage } from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    changeLang(state, payload) {
      app.$i18n.locale = payload
      setCurrentLanguage(payload);
    }
  },
  actions: {
    setLang({ commit }, payload) {
      commit('changeLang', payload)
    }
  },
  modules: {
    user,
    menu,
    map,
    notification,
    chat,
    todo,
    survey
  },
  plugins: [createPersistedState()],
})