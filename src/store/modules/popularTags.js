import popularTagsApi from '@/api/popularTags'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getPopularTagsStart: '[popularTags] getPopularTagsStart',
  getPopularTagsSuccess: '[popularTags] getPopularTagsSuccess',
  getPopularTagsFailure: '[popularTags] getPopularTagsFailure'
}

export const actionTypes = {
  getPopularTags: '[PopularTags] getPopularTags'
}

const mutations = {
  [mutationTypes.getPopularTagsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getPopularTagsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getPopularTagsFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getPopularTags]({commit}) {
    return new Promise(resolve => {
      commit(mutationTypes.getPopularTagsStart)
      popularTagsApi.getPopularTags().then(tags => {
        commit(mutationTypes.getPopularTagsSuccess, tags)
        resolve(tags)
      }).catch(() => {
        commit(mutationTypes.getPopularTagsFailure)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
