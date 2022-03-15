<template>
  <!-- Map-->
  <div class="indexmap_view">
    <map-component></map-component>
    <search-component></search-component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MapComponent from './Map'
import SearchComponent from './Search'

export default {
  name: 'MapIndex',
  components: {
    MapComponent,
    SearchComponent
  },
  computed: {
    ...mapGetters(['getLoginFlag', 'getFavRest'])
  },
  mounted () {
    this.setFavRestId()
  },
  methods: {
    setFavRestId () {
      if (this.getLoginFlag && this.getFavRest.length !== 0) {
        for (let i = 0; i < this.getFavRest.length; i++) {
          this.favRestId.push(this.getFavRest[i].REST_ID)
        }
      }
    }
  }
}
</script>

<style>

</style>
