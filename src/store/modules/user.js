import Axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/auth'
import { currentUser, isAuthGuardActive } from '../../constants/config'
import { setCurrentUser, getCurrentUser } from '../../utils'
import userAPI from "@/api/modules/userAPI";



export default {
  state: {
    currentUser: isAuthGuardActive ? getCurrentUser() : null,
    loginError: null,
    processing: false,
    forgotMailSuccess: null,
    resetPasswordSuccess: null
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError,
    forgotMailSuccess: state => state.forgotMailSuccess,
    resetPasswordSuccess: state => state.resetPasswordSuccess,
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload
      state.processing = false
      state.loginError = null
    },
    setLogout(state) {
      state.currentUser = null
      state.processing = false
      state.loginError = null
    },
    setProcessing(state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError(state, payload) {
      state.loginError = payload
      state.currentUser = null
      state.processing = false
    },
    setForgotMailSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.forgotMailSuccess = true
    },
    setResetPasswordSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.resetPasswordSuccess = true
    },
    clearError(state) {
      state.loginError = null
    }
  },
  actions: {
    login({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      userAPI.login(payload)
        .then(
          res => {
            if (res.status && res.data?.length > 0) {
              let obj = res.data[0]
              const item = {
                ...obj,
                id: obj.UserID,
                title: obj.UserName,
                date: obj.CreateDate,
                img: 'https://dashboard.rtta.rw/public/assets/img/avatar.png',
                role: 0,
              }
              const token = item.Token
              setCurrentUser(item)
              localStorage.setItem('token', token)
              commit('setUser', item)
            } else {
              setCurrentUser(null);
              localStorage.removeItem('token')
              commit('setError', res.message)
              setTimeout(() => {
                commit('clearError')
              }, 3000)
            }
          },
          err => {
            setCurrentUser(null);
            localStorage.removeItem('token')
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },
    forgotPassword({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      firebase
        .auth()
        .sendPasswordResetEmail(payload.email)
        .then(
          user => {
            commit('clearError')
            commit('setForgotMailSuccess')
          },
          err => {
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },
    resetPassword({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      firebase
        .auth()
        .confirmPasswordReset(payload.resetPasswordCode, payload.newPassword)
        .then(
          user => {
            commit('clearError')
            commit('setResetPasswordSuccess')
          },
          err => {
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },
    signOut({ commit }) {
      setCurrentUser(null);
      localStorage.removeItem('token')
      delete Axios.defaults.headers.common['Authorization']
      commit('setLogout')
    }
  }
}
