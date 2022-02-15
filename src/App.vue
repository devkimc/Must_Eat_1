<template>
  <div id="app">
    <nav-view></nav-view>
    <router-view></router-view>
  </div>
</template>

<script>
import NavView from '@/layouts/Nav'

export default {

  name: 'App',
  components: {
    NavView
  }
}
</script>

<style>

</style>
