<template>
  <b-row v-if="resSearchDetail.length !== 0" class="row_list_group">
    <b-col>
      <b-list-group v-for="(item, index) in resSearchDetail" :key="index">
        <b-list-group-item button @click="setCenter(index)" style="margin-bottom: 1%">
          <b-row>
            <b-col cols="10">
              <h6>
                {{item.basicInfo.placenamefull}}
              </h6>
            </b-col>
            <b-col cols="1">
              <b-icon icon="bookmarks" @click="setProcFavRest(index)"></b-icon>
            </b-col>
          </b-row>
          <b-row style="padding-left: 7%">
            <p style="font-size: 0.8rem">
              {{item.basicInfo.address.region.fullname}} {{item.basicInfo.address.addrbunho}}
            </p>
          </b-row>
          <b-row>
            <b-col cols="7">
              <b-form-rating id="rating-sm-no-border" value="4" no-border size="sm" variant="warning"></b-form-rating>
            </b-col>
            <b-col cols="4">
              <label for="rating-sm-no-border" style="font-size: 11px">{{item.comment.scorecnt}} 건</label>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
import { procFavRest } from '@/api/favRest'
// import { showToast } from '@/plugins/toast'

export default {
  name: 'SearchResult',
  props: {
    resSearchDetail: {
      type: Array,
      default () {
        return []
      }
    },
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
      info: {},
      comment: {},
      addrNm: '',
      latCdnt: 0,
      lngCdnt: 0
    }
  },
  methods: {
    setCenter (index) {
      this.$emit('set-center', index)
    },
    setIndex (index) {
      this.info = this.resSearchDetail[index].basicInfo
      this.comment = this.resSearchDetail[index].comment
      this.addrNm = this.resSearch[index].address_name
      this.latCdnt = this.resSearch[index].y
      this.lngCdnt = this.resSearch[index].x
    },
    setProcFavRest (index) {
      this.setIndex(index)
      console.log(this.info.cid)
      console.log(this.info.placenamefull)
      console.log(this.addrNm)
      console.log(this.info.cateid)
      console.log(this.info.catename)
      console.log(this.latCdnt)
      console.log(this.lngCdnt)

      procFavRest(this.info.cid, this.info.placenamefull, this.addrNm,
        this.info.cateid, this.info.catename, this.latCdnt, this.lngCdnt,
        this.userId, this.insYn).then(res => {
        // if (res.data.code === 10000) {
        //   showToast('success', res.data.msg)
        // } else {
        //   showToast('warning', res.data.msg)
        // }
      })
    }
  }
}
</script>

<style>

</style>
