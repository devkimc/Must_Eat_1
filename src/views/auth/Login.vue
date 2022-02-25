<template>
  <div class="login_views">
    <b-col sm="3">
      <b-form-input size='sm' placeholder='id' v-model="userId"></b-form-input>
      <b-form-input size='sm' placeholder='pw' v-model="userPw"></b-form-input>
      <b-button variant="outline-primary" @click="goLogin" class="mb-2">Login</b-button>
    </b-col>
  </div>
</template>

<script>
import { Login } from '@/api/auth'

export default {
  name: 'Login',
  data () {
    return {
      userId: '',
      userPw: ''
    }
  },
  methods: {
    goLogin () {
      Login(this.userId, this.userPw).then()
      this.makeToast('success')
    },
    makeToast (variant = null) {
      this.$bvToast.toast('Toast body content', {
        title: `Variant ${variant || 'default'}`,
        variant: variant,
        solid: true
      })
    }
  }
}
</script>
