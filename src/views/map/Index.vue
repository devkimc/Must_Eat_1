<template>
  <!-- Map-->
  <div class="indexmap_view">
    <search-component
      :fav-rest-id="favRestId"
      @get-fav-rest-info="getFavRestInfo"
    ></search-component>
    <map-component
      :cate-list="cateList"
    ></map-component>
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
  data () {
    return {
      favRestId: [],
      cateList: []
    }
  },
  computed: {
    ...mapGetters(['getLoginFlag', 'getUserId', 'getFavRest'])
  },
  mounted () {
    if (this.getLoginFlag) {
      this.getFavRestInfo()
    }
  },
  methods: {
    ...mapMutations(['setFavRest']),

    getFavRestInfo () {
      getFavRestInfo(this.getUserId).then(res => {
        if (res.data.code === 10001) {
          this.setFavRest(res.data.list)
          // To mark a bookmarks
          this.setFavRestId()
          // To show categories
          this.setCateList()
        } else if (res.data.code !== 40000 && res.data.code !== 10001) {
          showToast('warning', res.data.msg)
        }
      })
    },

    setFavRestId () {
      for (let i = 0; i < this.getFavRest.length; i++) {
        this.favRestId.push(this.getFavRest[i].REST_ID)
      }
    },

    setCateList () {
      if (this.getFavRest.length !== 0) {
        this.cateList.push('전체')
      }
      for (let i = 0; i < this.getFavRest.length; i++) {
        if (!this.cateList.includes(this.getFavRest[i].CATE_NM)) {
          this.cateList.push(this.getFavRest[i].CATE_NM)
        }
      }
    }
  }
}
</script>

<style>

</style>
