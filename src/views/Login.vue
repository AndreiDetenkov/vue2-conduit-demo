<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-xl-4 offset-xl-4 col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sing in</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'register'}">
              Need an account?
            </router-link>
          </p>

          <mcv-validation-errors
            v-if="validationErrors"
            :errors="validationErrors"
          >
          </mcv-validation-errors>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control"
                type="email"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button
              :disabled="isSubmitting"
              class="btn btn-primary pull-xs-right"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import McvValidationErrors from '@/components/ValidationErrors.vue'
import {actionTypes} from '@/store/modules/auth'

export default {
  name: 'McvLogin',
  components: {
    McvValidationErrors
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.login, {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({name: 'home'})
        })
    }
  }
}
</script>
