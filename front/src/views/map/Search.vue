<template>
    <b-card class="card">
      <b-row class="row_input">
        <b-col>
          <b-input-group class="mb-2">
            <b-form-input placeholder='식당 이름' type="search" v-model="restNm" @keyup.enter="keywordSearch()">
            </b-form-input>
            <b-input-group-prepend is-text @click="keywordSearch()">
              <b-icon icon="search"></b-icon>
            </b-input-group-prepend>
          </b-input-group>
        </b-col>
      </b-row>
      <search-result-component
        :res-search="resSearch"
        @set-center="setCenter"
        @get-fav-rest-info="getFavRestInfo"
     ></search-result-component>
    </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { showToast } from '@/plugins/toast'
import { getKakaoPlaceInfo } from '@/api/kakao'
import SearchResultComponent from './SearchResult'

export default {
  name: 'Search',
  props: {
    favRestId: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    SearchResultComponent
  },
  data () {
    return {
      // search
      restNm: '',
      searchOptions: {
        category_group_code: 'FD6',
        x: 126.86483931801229,
        y: 37.55108043514493
      },
      resSearch: [],

      // map
      marker: {},
      markers: [],

      // modal
      showModal: false,

      // login
      loginYn: false
    }
  },
  computed: {
    ...mapGetters(['getLoginFlag', 'getInitMap', 'getFavRest'])
  },
  methods: {
    /* global kakao */

    /* kakao.maps API */
    keywordSearch () {
      // Init data
      this.hideMarker()
      this.markers = []
      // Search
      const places = new kakao.maps.services.Places()
      places.keywordSearch(this.restNm, this.keywordSearchCallBack, this.searchOptions)
    },

    keywordSearchCallBack (res, status) {
      const resStatus = kakao.maps.services.Status
      if (status === resStatus.OK) {
        this.resSearch = res
        this.setCenter(0)

        // Processing search results
        for (let i = 0; i < res.length; i++) {
          // 1. Check if there's a favotite restaurant.
          this.checkFavRest(i)
          // 2. Mark the results on the map.
          this.showMarker(res[i])
          // 3. Inquire detailed information about the result.
          this.getPlaceDetail(res[i], i)
        }

        showToast('success', `${res.length} 건의 검색결과가 있습니다.`)
      } else if (status === resStatus.ZERO_RESULT) {
        showToast('warning', '검색 결과가 없습니다.')
      } else if (status === resStatus.ERROR) {
        showToast('danger', '서버 응답에 문제가 있습니다.')
      }
    },

    /* Marker */
    showMarker (place) {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(place.y, place.x),
        clickable: true
      })
      marker.setMap(this.getInitMap)
      this.markers.push(marker)
    },

    hideMarker () {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null)
      }
    },

    /* Center */
    setCenter (index) {
      this.getInitMap.setCenter(
        new kakao.maps.LatLng(
          this.resSearch[index].y,
          this.resSearch[index].x
        ))
    },

    /* map.place.kakao API */
    getPlaceDetail (place, i) {
      getKakaoPlaceInfo(place.id).then(res => {
        if (res.data.code === 30000) {
          showToast('warning', res.data.msg)
        } else if (res.data.code === 10001) {
          this.$set(this.resSearch[i], 'cateId', res.data.list.basicInfo.cateid)
          this.$set(this.resSearch[i], 'cateName', res.data.list.basicInfo.catename)
          this.$set(this.resSearch[i], 'starRating', res.data.list.comment.scoresum / res.data.list.comment.scorecnt)
          this.$set(this.resSearch[i], 'scoreCnt', res.data.list.comment.scorecnt)
        } else {
          showToast('danger', res.data.msg)
        }
      })
    },

    /* FavRest */
    getFavRestInfo (userId) {
      this.$emit('get-fav-rest-info', userId)
    },

    checkFavRest (i) {
      if (this.getLoginFlag && this.getFavRest.length !== 0) {
        this.$set(this.resSearch[i], 'isFavRest', this.favRestId.includes(parseInt(this.resSearch[i].id)))
      } else {
        this.$set(this.resSearch[i], 'isFavRest', false)
      }
    }
  }
}
</script>

<style>

</style>
