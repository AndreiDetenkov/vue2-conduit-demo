import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
}

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[aut] registerFailure'
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

export const actionTypes = {
  register: '[auth] register'
}

const actions = {
  [actionTypes.register]({commit}, credentials) {
    return new Promise(resolve => {
      commit(mutationTypes.registerStart)
      authApi
        .register(credentials)
        .then(response => {
          commit(mutationTypes.registerSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch(error => {
          commit(mutationTypes.registerFailure, error.response.data.errors)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
