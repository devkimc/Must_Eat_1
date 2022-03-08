<template>
  <!-- Map-->
  <div class="indexmap_view">
    <map-component></map-component>
    <search-component></search-component>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import MapComponent from './Map'
import SearchComponent from './Search'
import { getFavRestInfo } from '@/api/favRest'
import { showToast } from '@/plugins/toast'

export default {
  name: 'MapIndex',
  components: {
    MapComponent,
    SearchComponent
  },
  created () {
    this.getFavRestInfo()
  },
  methods: {
    ...mapMutations(['setFavRest']),

    getFavRestInfo () {
      getFavRestInfo(this.userId).then(res => {
        if (res.data.code === 10001) {
          this.setFavRest(res.data.list)
        } else if (res.data.code !== 40000 && res.data.code !== 10001) {
          showToast('warning', res.data.msg)
        }
      })
    }
  }
}
</script>

<style>

</style>
