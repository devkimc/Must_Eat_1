<template>
  <!-- Map-->
  <div class="indexmap_view">
    <map-component></map-component>
    <search-component></search-component>
  </div>
</template>

<script>
import MapComponent from './Map.vue'
import SearchComponent from './Search.vue'

export default {
  name: 'MapIndex',
  components: {
    MapComponent,
    SearchComponent
  }
}
</script>

<style>

</style>
