<template>
  <div class="home-page">
    <mcv-banner />

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <mcv-popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed.vue'
import McvBanner from '@/components/Banner'
import McvPopularTags from '@/components/PopularTags'

export default {
  name: 'McvGlobalFeed',
  components: {
    McvFeed,
    McvBanner,
    McvPopularTags
  },
  computed: {
    apiUrl() {
      const tagName = this.$route.params.slug
      return `/articles?tag=${tagName}`
    }
  }
}
</script>

<style lang="scss" scoped></style>
