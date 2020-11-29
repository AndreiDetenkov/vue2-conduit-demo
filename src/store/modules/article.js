import articleApi from '@/api/article'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailure: '[article] getArticleFailure',

  deleteArticleStart: '[article] deleteArticleStart',
  deleteArticleSuccess: '[article] deleteArticleSuccess',
  deleteArticleFailure: '[article] deleteArticleFailure'
}

export const actionTypes = {
  getArticle: '[article] getArticle',
  deleteArticle: '[article] deleteArticle'
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
  },
  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deleteArticleSuccess]() {},
  [mutationTypes.deleteArticleFailure]() {}
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
  },
  [actionTypes.deleteArticle]({commit}, {slug}) {
    return new Promise(resolve => {
      commit(mutationTypes.deleteArticleStart)
      articleApi
        .deleteArticle(slug)
        .then(() => {
          commit(mutationTypes.deleteArticleSuccess)
          resolve()
        })
        .catch(() => {
          commit(mutationTypes.deleteArticleFailure)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
