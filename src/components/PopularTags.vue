<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <template v-if="isLoading">Loading tags...</template>

    <div v-if="error">Error</div>

    <div v-if="popularTags" class="tags-list">
      <router-link
        class="tag-default tag-pill"
        v-for="(tag, index) in popularTags"
        :key="index"
        :to="{name: 'tag', params: {slug: tag}}"
      >
        {{tag}}
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/popularTags'

export default {
  name: 'McvPopularTags',
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags)
  },
  computed: {
    ...mapState({
      isLoading: state => state.popularTags.isLoading,
      popularTags: state => state.popularTags.data,
      error: state => state.popularTags.error
    })
  }
}
</script>
