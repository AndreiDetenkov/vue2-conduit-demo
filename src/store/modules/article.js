import articleApi from '@/api/article'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailure: '[article] getArticleFailure'
}

export const actionTypes = {
  getArticle: '[article] getArticle'
}

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getArticle]({commit}, {slug}) {
    return new Promise(resolve => {
      commit(mutationTypes.getArticleStart)
      articleApi
        .getArticle(slug)
        .then(article => {
          commit(mutationTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch(() => {
          commit(mutationTypes.getArticleFailure)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
