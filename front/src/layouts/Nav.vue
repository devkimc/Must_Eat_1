<template>
  <div class='layout_nav'>
    <b-nav tabs>
      <b-nav-item>
        <b-avatar v-if="getLoginFlag" badge size="27px"></b-avatar>
        <b-avatar v-else-if="!getLoginFlag" badge size="27px" badge-variant="danger"></b-avatar>
      </b-nav-item>
      <b-nav-item href="/">Home</b-nav-item>
      <b-nav-item v-if="getLoginFlag" @click="logout()">Logout</b-nav-item>
      <b-nav-item v-else href="/auth/login">Login</b-nav-item>
      <b-nav-item href="/map/index">Map</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Nav',
  data () {
    return {
      path: ''
    }
  },
  computed: {
    ...mapGetters(['getLoginFlag'])
  },
  methods: {
    ...mapMutations(['setLoginFlag', 'setUserId']),

    logout () {
      localStorage.removeItem('jwt')
      this.setLoginFlag(false)
      this.setUserId('')
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
