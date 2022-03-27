<template>
  <div class="login_view" align="center">
    <b-container fluid class="cont">
      <header class="head">
        Must Eat
      </header>
      <b-card class="card">
        <b-col cols="10">
          <b-row class="row_info">
            Your ID
          </b-row>
          <b-row class="row_input">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="person-fill" font-scale="0.9"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="userId" type="text" @keyup.enter="goLogin">
              </b-form-input>
            </b-input-group>
          </b-row>
          <b-row class="row_info">
            Password
          </b-row>
          <b-row class="row_input">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="lock-fill" font-scale="0.9"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="userPw" type="password" @keyup.enter="goLogin">
              </b-form-input>
            </b-input-group>
          </b-row>
          <b-row class="row_button">
            <b-button block variant="primary" @click="goLogin">Login</b-button>
          </b-row>
        </b-col>
      </b-card>
      <footer class="footer">
        <a href="/auth/signup">Sign up</a>
      </footer>
    </b-container>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { login } from '@/api/auth'
import { showToast } from '@/plugins/toast'

export default {
  name: 'Login',
  data () {
    return {
      userId: '',
      userPw: ''
    }
  },
  methods: {
    ...mapMutations(['setLoginFlag', 'setUserId']),

    goLogin () {
      login(this.userId, this.userPw).then(res => {
        if (res.data.code === 20000) {
          showToast('danger', res.data.msg)
        } else if (res.data.code === 20001) {
          localStorage.setItem('jwt', res.data.token)
          this.setLoginFlag(true)
          this.setUserId(this.userId)
          this.$router.push('/')
          showToast('success', res.data.msg)
        } else {
          showToast('warning', res.data.msg)
        }
      })
    }
  }
}
</script>
