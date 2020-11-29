import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null
}

export const mutationTypes = {
  updateArticleStart: '[updateArticle] updateArticleStart',
  updateArticleSuccess: '[updateArticle] updateArticleSuccess',
  updateArticleFailure: '[updateArticle] updateArticleFailure',

  getArticleStart: '[getArticle] getArticleStart',
  getArticleSuccess: '[getArticle] getArticleSuccess',
  getArticleFailure: '[getArticle] getArticleFailure'
}

const mutations = {
  [mutationTypes.updateArticleStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.updateArticleSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.updateArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true
    state.article = null
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.article = payload
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false
  }
}

export const actionTypes = {
  getArticle: '[getArticle] getArticle',
  updateArticle: '[updateArticle] updateArticle'
}

const actions = {
  [actionTypes.updateArticle]({commit}, {slug, articleInput}) {
    return new Promise(resolve => {
      commit(mutationTypes.updateArticleStart)
      articleApi
        .updateArticle(slug, articleInput)
        .then(article => {
          commit(mutationTypes.updateArticleSuccess)
          resolve(article)
        })
        .catch(errors => {
          commit(
            mutationTypes.updateArticleFailure,
            errors.response.data.errors
          )
        })
    })
  },
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
