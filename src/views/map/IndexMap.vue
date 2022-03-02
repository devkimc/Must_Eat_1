<template>
  <!-- Map-->
  <div class="indexmap_view">
    <b-card class="card">
      <b-row class="row_input">
        <b-col>
          <b-form-input placeholder='식당 이름' v-model="restNm"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="row_button">
        <b-col>
          <b-button block variant="primary" @click="keywordSearch()">검색하기</b-button>
        </b-col>
      </b-row>
      <b-row v-if="resSearch.length !== 0" class="row_list_group">
        <b-col>
          <b-list-group v-for="(item, index) in resSearch" :key="index">
            <b-list-group-item button @click="setCenter(index)">
              <h5>
                {{item.place_name}}
              </h5>
              <p>
                {{item.address_name}}
              </p>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-card>
    <div id="map"></div>
  </div>
</template>

<script>
import { showToast } from '@/plugins/toast'

export default {
  name: 'IndexMap',
  data () {
    return {
      // search
      restNm: '',
      searchOptions: {
        category_group_code: '',
        location: ''
      },
      resSearch: [],
      resMsgSearch: '',

      // map
      map: '',
      markers: [],
      mapOptions: {
        center: '',
        level: ''
      },
      initLatCdnt: 0,
      initLngCdnt: 0,
      latLng: '',

      // api
      apiKey: '',
      apiUrl: '',
      apiServices: ''
    }
  },
  created () {
    this.initLatCdnt = 37.55108043514493
    this.initLngCdnt = 126.86483931801229
    this.apiKey = process.env.API_KEY_KAKAO_MAP
    this.apiUrl = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey='
    this.apiServices = '&libraries=services'
    this.searchOptions.category_group_code = 'FD6'
  },
  mounted () {
    /* global kakao */
    if (window.kakao && kakao.maps) {
      this.initMap()
    } else {
      const script = document.createElement('script')
      script.onload = () => kakao.maps.load(this.initMap)
      script.src = this.apiUrl + this.apiKey + this.apiServices
      document.head.appendChild(script)
    }
  },
  methods: {
    initMap () {
      const container = document.getElementById('map')
      this.mapOptions = {
        center: new kakao.maps.LatLng(this.initLatCdnt, this.initLngCdnt),
        level: 3
      }
      this.map = new kakao.maps.Map(container, this.mapOptions)
    },

    keywordSearch () {
      this.hideMarker()
      const places = new kakao.maps.services.Places()
      const callback = (res, status) => {
        const resStatus = kakao.maps.services.Status
        if (status === resStatus.OK) {
          this.resSearch = res
          this.setCenter(0)
          for (let i = 0; i < res.length; i++) {
            this.showMarker(res[i])
          }
          showToast('success', `${res.length} 건의 검색결과가 있습니다.`)
        } else if (status === resStatus.ZERO_RESULT) {
          showToast('warning', '검색 결과가 없습니다.')
        } else if (status === resStatus.ERROR) {
          showToast('danger', '서버 응답에 문제가 있습니다.')
        }
      }
      this.searchOptions.location = this.mapOptions.center
      places.keywordSearch(this.restNm, callback, this.searchOptions)
    },

    showMarker (place) {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(place.y, place.x)
      })
      marker.setMap(this.map)
      this.markers.push(marker)
    },

    hideMarker () {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null)
      }
    },

    setCenter (index) {
      this.map.setCenter(new kakao.maps.LatLng(this.resSearch[index].y, this.resSearch[index].x))
    }
  }
}
</script>

<style>

</style>
