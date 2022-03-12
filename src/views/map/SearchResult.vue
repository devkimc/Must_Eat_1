<template>
  <b-row v-if="resSearch.length !== 0" class="row_list_group">
    <b-col>
      <b-list-group v-for="(item, index) in resSearch" :key="index">
        <b-list-group-item button @click="setCenter(index)" style="margin-bottom: 1%">
          <b-row>
            <b-col cols="10">
              <h6>
                {{item.place_name}}
              </h6>
            </b-col>
            <b-col cols="1">
              <b-icon icon="bookmarks" @click="setProcFavRest(index)"></b-icon>
            </b-col>
          </b-row>
          <b-row style="padding-left: 7%">
            <p style="font-size: 0.8rem">
              {{item.address_name}}
            </p>
          </b-row>
          <b-row>
            <b-col cols="7">
              <b-form-rating id="rating-sm-no-border" v-model="item.starRating" no-border size="sm" variant="warning"></b-form-rating>
            </b-col>
            <b-col cols="4">
              <label for="rating-sm-no-border" style="font-size: 11px">{{item.scorecnt}} 건</label>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { checkToken } from '@/api/auth'
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
      favRest: '',
      favRestIndex: [],
      info: {},
      comment: {},
      addrNm: '',
      latCdnt: 0,
      lngCdnt: 0,
      loginYn: false,
      starRating: 0
    }
  },
  computed: {
    ...mapGetters(['getFavRest'])
  },
  methods: {
    setCenter (index) {
      this.$emit('set-center', index)
    },

    setProcFavRest (index) {
      checkToken().then(res => {
        if (res.data.code === 10000) {
          const vm = this.resSearch[index]
          procFavRest(vm.id, vm.place_name, vm.address_name,
            vm.cateId, vm.cateName, vm.x, vm.y,
            this.userId, this.insYn).then(res => {
            showToast('success', res.data.msg)
          })
        } else {
          showToast('danger', res.data.msg)
        }
      })
    }
  }
}
</script>

<style>

</style>
