<template>
    <b-card class="card">
      <b-row class="row_input">
        <b-col>
          <b-input-group class="mb-2">
            <b-form-input placeholder='식당 이름' v-model="restNm" @keyup.enter="keywordSearch()">
            </b-form-input>
            <b-input-group-prepend is-text @click="keywordSearch()">
              <b-icon icon="search"></b-icon>
            </b-input-group-prepend>
          </b-input-group>
        </b-col>
      </b-row>
      <search-result-component
        :res-search-detail="resSearchDetail"
        :res-search="resSearch"
        @set-center="setCenter" >
      </search-result-component>
    </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { showToast } from '@/plugins/toast'
import { getKakaoPlaceInfo } from '@/api/kakao'
import SearchResultComponent from './SearchResult'

export default {
  name: 'Search',
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
      resSearchDetail: [],
      rate: 0,

      // map
      marker: {},
      markers: [],

      // modal
      showModal: false
    }
  },
  components: {
    SearchResultComponent
  },
  computed: {
    ...mapGetters(['getInitMap'])
  },
  methods: {
    /* global kakao */
    keywordSearch () {
      // init
      this.hideMarker()
      this.resSearchDetail = []

      const places = new kakao.maps.services.Places()
      const callback = (res, status) => {
        const resStatus = kakao.maps.services.Status
        if (status === resStatus.OK) {
          this.resSearch = res
          this.setCenter(0)
          for (let i = 0; i < res.length; i++) {
            this.showMarker(res[i])
            this.getPlaceDetail(res[i], i)
          }
          showToast('success', `${res.length} 건의 검색결과가 있습니다.`)
        } else if (status === resStatus.ZERO_RESULT) {
          showToast('warning', '검색 결과가 없습니다.')
        } else if (status === resStatus.ERROR) {
          showToast('danger', '서버 응답에 문제가 있습니다.')
        }
      }
      places.keywordSearch(this.restNm, callback, this.searchOptions)
    },

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

    setCenter (index) {
      this.getInitMap.setCenter(
        new kakao.maps.LatLng(
          this.resSearch[index].y,
          this.resSearch[index].x
        ))
    },

    getPlaceDetail (place, index) {
      getKakaoPlaceInfo(place.id).then(res => {
        if (res.data.code === 30000) {
          showToast('warning', res.data.msg)
        } else if (res.data.code === 30001) {
          this.resSearchDetail.push(res.data.list)
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
