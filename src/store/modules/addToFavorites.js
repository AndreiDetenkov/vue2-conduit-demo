import addToFavoritesApi from '@/api/addToFavorites'

const mutationTypes = {
  addToFavoritesStart: '[addToFavorites] addToFavoritesStart',
  addToFavoritesSuccess: '[addToFavorites] addToFavoritesSuccess',
  addToFavoritesFailure: '[addToFavorites] addToFavoritesFailure'
}

const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess]() {},
  [mutationTypes.addToFavoritesFailure]() {}
}

export const actionTypes = {addToFavorites: '[addToFavorites] addToFavorites'}

const actions = {
  [actionTypes.addToFavorites]({commit}, {slug, isFavorited}) {
    commit(mutationTypes.addToFavoritesStart)
    return new Promise(resolve => {
      const promise = isFavorited
        ? addToFavoritesApi.removeFromFavorites(slug)
        : addToFavoritesApi.addToFavorites(slug)

      promise
        .then(article => {
          commit(mutationTypes.addToFavoritesSuccess)
          resolve(article)
        })
        .catch(() => {
          commit(mutationTypes.addToFavoritesFailure)
        })
    })
  }
}

export default {
  mutations,
  actions
}
