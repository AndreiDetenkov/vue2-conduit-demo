<template>
  <div>
    <mcv-loading v-if="isLoading" />

    <mcv-error-message v-if="error" />

    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username}
              }"
              class="author"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            ADD TO FAVORITES
          </div>
        </div>

        <router-link
          :to="{name: 'userProfile', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          TAG LIST
        </router-link>
      </div>

      <mcv-pagination :total="feed.articlesCount" :limit="limit" :current-page="currentPage" :url="baseUrl" />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {stringify, parseUrl} from 'query-string'
import {actionTypes} from '@/store/modules/feed'
import {limit} from '@/helpers/variables'
import McvPagination from '@/components/Pagination'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'


export default {
  name: 'McvFeed',
  components: {McvErrorMessage, McvPagination, McvLoading},
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.fetchFeed()
  },
  watch: {
    currentPage() {
      this.fetchFeed()
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    }),
    limit() {
      return limit
    },
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    baseUrl() {
      return this.$route.path
    },
    offset() {
      return this.currentPage * 10 - 10
    }
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifyParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifyParams}`

      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
    }
  }
}
</script>

<style lang="scss" scoped></style>
