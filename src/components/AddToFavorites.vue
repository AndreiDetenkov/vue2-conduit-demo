<template>
  <button
    @click="handleLike"
    :class="{
      btn: true,
      'btn-sm': true,
      'btn-primary': isFavoritedOptimistic,
      'btn-outline-primary': !isFavoritedOptimistic
    }"
    style="outline: none"
  >
    <i class="ion-heart" />
    <span>&nbsp; {{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites'

export default {
  name: 'McvAddToFavorites',
  props: {
    isFavorited: {
      style: Boolean,
      required: true
    },
    articleSlug: {
      style: String,
      required: true
    },
    favoritesCount: {
      style: Number,
      required: true
    }
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount
    }
  },
  methods: {
    handleLike() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOptimistic
      })

      this.isFavoritedOptimistic
        ? (this.favoritesCountOptimistic -= 1)
        : (this.favoritesCountOptimistic += 1)

      this.isFavoritedOptimistic = !this.isFavoritedOptimistic
    }
  }
}
</script>

<style lang="scss" scoped></style>
