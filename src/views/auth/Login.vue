<template>
  <div class="login_views" align="center">
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
            <b-form-input placeholder='비밀번호' v-model="userPw"></b-form-input>
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
import { Login } from '@/api/auth'

export default {
  name: 'Login',
  data () {
    return {
      userId: '',
      userPw: '',
      resMsgLogin: ''
    }
  },
  methods: {
    goLogin () {
      Login(this.userId, this.userPw).then(res => {
        this.resMsgLogin = res.data.msg
        if (res.data.code === 10000) {
          this.makeToast('success')
        } else if (res.data.code === 20001) {
          this.makeToast('danger')
        } else {
          this.makeToast('warning')
        }
      })
    },
    makeToast (variant) {
      this.$bvToast.toast(this.resMsgLogin, {
        title: 'Notice',
        variant: variant,
        solid: true
      })
    }
  }
}
</script>
