<template>
  <!-- Map-->
  <div class="indexmap_view">
    <search-component></search-component>
    <map-component></map-component>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
  computed: {
    ...mapGetters(['getLoginFlag', 'getFavRest'])
  },
  mounted () {
    if (this.getLoginFlag) {
      this.getFavRestInfo()
    }
  },
  methods: {
    ...mapMutations(['setFavRest']),

    getFavRestInfo () {
      getFavRestInfo('TEST_ID').then(res => {
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
