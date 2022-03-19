<template>
  <div class="login_view" align="center">
    <b-container fluid class="cont">
      <div class="head">
        Must Eat
      </div>
      <b-card class="card">
        <b-row class="row_input">
          <b-col>
            <b-form-input placeholder='아이디' v-model="userId"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="row_input">
          <b-col>
            <b-form-input placeholder='비밀번호' v-model="userPw" @keyup.enter="goLogin"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="row_button">
          <b-col>
            <b-button block variant="primary" @click="goLogin">Login</b-button>
          </b-col>
        </b-row>
      </b-card>
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
    ...mapMutations(['setLoginFlag']),

    goLogin () {
      login(this.userId, this.userPw).then(res => {
        if (res.data.code === 20000) {
          showToast('danger', res.data.msg)
        } else if (res.data.code === 20001) {
          localStorage.setItem('jwt', res.data.token)
          this.setLoginFlag(true)
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
