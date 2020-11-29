<template>
  <div>
    Create article
    <mcv-article-form
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @article-submit="onSubmit"
    />
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm'

export default {
  name: 'McvCreateArticle',
  components: {McvArticleForm},
  data() {
    return {
      initialValues: {
        title: '',
        descrition: '',
        body: '',
        tagList: []
      },
      validationErrors: null,
      isSubmitting: false
    }
  },
  methods: {
    onSubmit(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped></style>
