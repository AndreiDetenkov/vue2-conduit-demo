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
  registerFailure: '[aut] registerFailure',
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[aut] loginFailure'
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login'
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
  },
  [actionTypes.login]({commit}, credentials) {
    return new Promise(resolve => {
      commit(mutationTypes.loginStart)
      authApi
        .login(credentials)
        .then(response => {
          commit(mutationTypes.loginSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch(error => {
          commit(mutationTypes.loginFailure, error.response.data.errors)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
