<template>
  <div class="login_views">
    <b-form-input size='sm' placeholder='id' v-model="userId"></b-form-input>
    <b-form-input size='sm' placeholder='pw' v-model="userPw"></b-form-input>
    <b-button variant="success" @click="goLogin">Login</b-button>
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
    }
  }
}
</script>
