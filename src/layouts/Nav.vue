<template>
  <div class='layout_nav'>
    <b-nav tabs align='right' style="padding-top:15px;padding-bottom:15px">
      <b-nav-item href="/">Home</b-nav-item>
      <b-nav-item href="/auth/login">
        <div v-if="getLoginFlag">Logout</div>
        <div v-else>Login</div>
      </b-nav-item>
      <b-nav-item href="/map/index">Map</b-nav-item>
      <b-nav-item href="/management/registrest">Management</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Nav',
  data () {
    return {
      width: '500px',
      path: ''
    }
  },
  computed: {
    ...mapGetters(['getLoginFlag'])
  }
}
</script>

<style>

</style>
