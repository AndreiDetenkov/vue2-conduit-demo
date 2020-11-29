import articleApi from '@/api/article'

export const mutationTypes = {
  createArticleStart: '[createArticle] createArticleStart',
  createArticleSuccess: '[createArticle] createArticleSuccess',
  createArticleFailure: '[createArticle] createArticleFailure'
}

export const actionTypes = {
  createArticle: '[createArticle] createArticle'
}

const state = {
  isSubmitting: false,
  validationErrors: null
}

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createArticleSuccess](state) {
    state.isSubmitting = false
  },

  [mutationTypes.createArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createArticle]({commit}, {articleInput}) {
    return new Promise(resolve => {
      commit(mutationTypes.createArticleStart)
      articleApi
        .createArticle(articleInput)
        .then(article => {
          commit(mutationTypes.createArticleSuccess)
          resolve(article)
        })
        .catch(errors => {
          commit(
            mutationTypes.createArticleFailure,
            errors.response.data.errors
          )
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
