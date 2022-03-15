<template>
  <div id="app">
    <nav-view></nav-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import NavView from '@/layouts/Nav'

export default {

  name: 'App',
  components: {
    NavView
  },
  mounted () {
    this.setLoginFlag()
  },
  methods: {
    ...mapMutations(['setLoginFlag'])
  }
}
</script>

<style>

</style>
