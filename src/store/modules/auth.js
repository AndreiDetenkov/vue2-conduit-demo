import authApi from '@/api/auth'

const state = {
  isSubmitting: false
}

const mutations = {
  registerStart(state) {
    state.isSubmitting = true
  },
  registerSucceess(state) {
    state.isSubmitting = false
  },
  registerFailure(state) {
    state.isSubmitting = false
  }
}

const actions = {
  register({commit}, credentials) {
    return new Promise(resolve => {
      commit('registerStart')
      authApi
        .register(credentials)
        .then(response => {
          commit('registerSucceess', response.data.user)
          resolve(response.data.user)
        })
        .catch(error => {
          commit('registerFailure', error.response.data.errors)
        })
    })
    // commit('registerStart')
  }
}

export default {
  state,
  mutations,
  actions
}
