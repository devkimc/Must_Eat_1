<template>
  <b-row v-if="resSearch.length !== 0" class="row_list_group">
    <b-col>
      <b-list-group v-for="(item, index) in resSearch" :key="index">
        <b-list-group-item button @click="setCenter(index)">
          <b-row class="header">
            <b-col cols="10">
              <h6>
                {{item.place_name}}
              </h6>
            </b-col>
            <b-col cols="1">
              <b-icon v-if="item.isFavRest" icon="bookmarks-fill" @click="setProcFavRest(index)"></b-icon>
              <b-icon v-else icon="bookmarks" @click="setProcFavRest(index)"></b-icon>
            </b-col>
          </b-row>
          <b-row class="sub">
            <p>
              {{item.address_name}}
            </p>
          </b-row>
          <b-row class="footer">
            <b-col cols="7" class="star_rating">
              <b-form-rating id="rating-sm-no-border" v-model="item.starRating" no-border size="sm" variant="warning"></b-form-rating>
            </b-col>
            <b-col cols="4" class="score_cnt">
              <label for="rating-sm-no-border">{{item.scoreCnt}} 건</label>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { procFavRest } from '@/api/favRest'
import { showToast } from '@/plugins/toast'

export default {
  name: 'SearchResult',
  props: {
    resSearch: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // favRest
      isFavRest: ''
    }
  },
  computed: {
    ...mapGetters(['getLoginFlag', 'getUserId', 'getResMsgCheckToken'])
  },
  methods: {
    ...mapMutations(['checkToken']),

    setCenter (index) {
      this.$emit('set-center', index)
    },

    getFavRestInfo (userId) {
      this.$emit('get-fav-rest-info', userId)
    },

    setProcFavRest (index) {
      this.checkToken()
      if (this.getLoginFlag) {
        const vm = this.resSearch[index]
        // 1. If the search result exits in the bookmark, delete it.
        // 2. If the search result does not exist in the bookmark, insert it.
        this.isFavRest = !vm.isFavRest
        const insYn = this.isFavRest === true ? 'Y' : 'N'

        procFavRest(vm.id, vm.place_name, vm.address_name, vm.cateId,
          vm.cateName, vm.x, vm.y, this.getUserId, insYn).then(res => {
          this.$set(vm, 'isFavRest', this.isFavRest)
          this.getFavRestInfo(this.getUserId)
          showToast('success', res.data.msg)
        })
      } else {
        showToast('danger', this.getResMsgCheckToken)
      }
    }
  }
}
</script>

<style>

</style>
