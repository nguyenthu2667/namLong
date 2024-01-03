import axios from 'axios'
import { BASE_API } from '../../constants/config'

const state = {
  isLoadContacts: false,
  isLoadConversations: false,
  error: '',
  contacts: null,
  contactsSearchResult: null,
  conversations: null
}

const getters = {
  isLoadContacts: state => state.isLoadContacts,
  isLoadConversations: state => state.isLoadConversations,
  error: state => state.error,
  contacts: state => state.contacts,
  conversations: state => state.conversations,
  contactsSearchResult: state => state.contactsSearchResult

}

const mutations = {
  getContactsSuccess(state, payload) {
    state.isLoadContacts = true
    state.contacts = payload.contacts
    state.contactsSearchResult = payload.contacts
  },
  getContactsSearchSuccess(state, payload) {
    state.contactsSearchResult = payload.contacts
  },
  getContactsError(state, error) {
    state.isLoadContacts = false
    state.error = error
  },
  getConversationsSuccess(state, payload) {
    state.isLoadConversations = true
    state.conversations = payload.conversations
  },
  getConversationsError(state, error) {
    state.isLoadConversations = false
    state.error = error
  }
}

const actions = {
  searchContacts({ commit, state }, { userId, searchKey }) {
    if (searchKey.length > 0) {
      axios
        .get(`${BASE_API}/contacts?search=${searchKey}`)
        .then(r => r.data)
        .then(res => {
          if (res.status) {
            commit('getContactsSearchSuccess', {
              contacts: res.data.map(x => {
                return {
                  ...x,
                  img: x.img.replace('profile-pic-', 'profiles/')
                }
              }), userId: userId
            })
          } else {
            commit('getContactsError', 'error:getContacts')
          }
        })
    } else {
      commit('getContactsSearchSuccess', { contacts: state.contacts, userId: userId })
    }
  },
  getContacts({ commit }, userId) {
    axios
      .get(`${BASE_API}/contacts`)
      .then(r => r.data)
      .then(res => {
        if (res.status) {
          commit('getContactsSuccess', {
            contacts: res.data.map(x => {
              return {
                ...x,
                img: x.img.replace('profile-pic-', 'profiles/')
              }
            }), userId: userId
          })
        } else {
          commit('getContactsError', 'error:getContacts')
        }
      })
  },
  getConversations({ commit }, userId) {
    axios
      .get(`${BASE_API}/conversations`)
      .then(r => r.data)
      .then(res => {
        if (res.status) {
          commit('getConversationsSuccess', { conversations: res.data, userId: userId })
        } else {
          commit('getConversationsError', 'error:getConversations')
        }
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
