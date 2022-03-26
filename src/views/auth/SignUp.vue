<template>
  <div class="sign_up_view" align="center">
    <b-container fluid class="cont">
      <header>
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
            <b-button block variant="primary" @click="goLogin">Sign up</b-button>
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
export default {
  name: 'SignUp'
}
</script>

<style>

</style>
