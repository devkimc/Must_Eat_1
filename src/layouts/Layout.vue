<template>
  <div class='layout_container'>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      width: '500px',
      path: ''
    }
  },
  created () {
    const originPath = this.$router.history.current.path
    console.log('originPath: ' + originPath)
    this.path = originPath
  }
}
</script>

<style>

</style>
