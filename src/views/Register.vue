<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sing up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">
              Need an account?
            </router-link>
          </p>
          VALIDATION ERRORS

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                v-model="username"
              />
            </fieldset>
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'McvRegister',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting
    }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch('register', {
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(user => {
          console.log('register user successfully ', user)
          this.$router.push({name: 'home'})
        })
    }
  }
}
</script>
