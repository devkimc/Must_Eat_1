<template>
  <div class="sign_up_view" align="center">
    <b-container fluid class="cont">
      <header>
        Must Eat
      </header>
      <b-card class="card">
        <b-col cols="10">
          <!-- Input ID -->
          <b-row class="row_info">
            Your ID
          </b-row>
          <b-row class="row_input">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="person-fill" font-scale="0.9"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="userId" type="text" @keyup.enter="goSignUp">
              </b-form-input>
            </b-input-group>
          </b-row>
          <!-- Input Password -->
          <b-row class="row_info">
            Password
          </b-row>
          <b-row class="row_input">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="lock-fill" font-scale="0.9"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="userPw" type="password" @keyup.enter="goSignUp">
              </b-form-input>
            </b-input-group>
          </b-row>
          <!-- Input Email -->
          <b-row class="row_info">
            Email
          </b-row>
          <b-row class="row_input">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="envelope-fill" font-scale="0.9"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="userEmail" type="email" @keyup.enter="goSignUp">
              </b-form-input>
            </b-input-group>
          </b-row>
          <!-- Input Mobile number -->
          <b-row class="row_info">
            Cell phone number
          </b-row>
          <b-row class="row_input">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="telephone-fill" font-scale="0.9"></b-icon>
              </b-input-group-prepend>
              <b-form-input v-model="mobNo" type="text" @keyup.enter="goSignUp">
              </b-form-input>
            </b-input-group>
          </b-row>
          <b-row class="row_button">
            <b-button block variant="primary" @click="goSignUp">Sign up</b-button>
          </b-row>
        </b-col>
      </b-card>
      <footer>
        <a href="/auth/login">Login</a>
      </footer>
    </b-container>
  </div>
</template>

<script>
import { signup } from '@/api/auth'
import { showToast } from '@/plugins/toast'

export default {
  name: 'SignUp',
  data () {
    return {
      userId: '',
      userPw: '',
      userEmail: '',
      mobNo: ''
    }
  },
  methods: {
    goSignUp () {
      signup(this.userId, this.userPw, this.userEmail, this.mobNo).then(res => {
        if (res.data.code === 20005) {
          showToast('success', res.data.msg)
          this.$router.push('/auth/login')
        } else {
          showToast('danger', res.data.msg)
        }
      })
    }
  }
}
</script>

<style>

</style>
