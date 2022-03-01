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
            <b-list-group-item button>
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
        category_group_code: 'FD6',
        location: ''
      },
      resSearch: [],
      resMsgSearch: '',
      // map
      map: '',
      mapOptions: {
        center: '',
        level: ''
      },
      latLng: '',
      // api
      apiKey: '',
      apiUrl: 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=',
      apiServices: '&libraries=services'
    }
  },
  created () {
    this.apiKey = process.env.API_KEY_KAKAO_MAP
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
        center: new kakao.maps.LatLng(37.55108043514493, 126.86483931801229),
        level: 2
      }
      this.map = new kakao.maps.Map(container, this.mapOptions)
    },
    keywordSearch () {
      const callback = (res, status) => {
        const resStatus = kakao.maps.services.Status
        if (status === resStatus.OK) {
          this.resSearch = res
          showToast('success', res.length + ' 건의 검색결과가 있습니다.')
        } else if (status === resStatus.ZERO_RESULT) {
          showToast('warning', '검색 결과가 없습니다.')
        } else if (status === resStatus.ERROR) {
          showToast('danger', '서버 응답에 문제가 있습니다.')
        }
      }
      const places = new kakao.maps.services.Places()
      this.searchOptions.location = this.mapOptions.center
      places.keywordSearch(this.restNm, callback, this.searchOptions)
    }
  }
}
</script>

<style>

</style>
