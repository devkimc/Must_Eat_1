<template>
  <div id="app">
    <nav-view></nav-view>
    <router-view></router-view>
  </div>
</template>

<script>
import NavView from '@/layouts/Nav'
import { Login } from '@/api/auth.js'

export default {

  name: 'App',
  components: {
    NavView
  },
  methods: {
  },
  mounted () {
    Login().then(res => {
      console.log(res.data)
    })
  }
}
</script>

<style>

</style>
