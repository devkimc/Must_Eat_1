<template>
  <div class='layout_nav'>
    <b-nav tabs align='right' style="padding-top:15px;padding-bottom:15px">
      <b-nav-item href="/">Home</b-nav-item>
      <b-nav-item v-if="getLoginFlag" @click="logout()">Logout</b-nav-item>
      <b-nav-item v-else href="/auth/login">Login</b-nav-item>
      <b-nav-item href="/map/index">Map</b-nav-item>
      <b-nav-item href="/management/registrest">Management</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Nav',
  data () {
    return {
      width: '500px',
      path: '',
      loginFlag: false
    }
  },
  computed: {
    ...mapGetters(['getLoginFlag'])
  },
  methods: {
    ...mapMutations(['setLoginFlag']),

    logout () {
      localStorage.removeItem('jwt')
      this.setLoginFlag(false)
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
