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
    </b-card>
    <div id="map"></div>
  </div>
</template>

<script>

export default {
  name: 'IndexMap',
  data () {
    return {
      // search
      restNm: '',
      searchOptions: {category_group_code: 'FD6'},
      resSearch: [],
      // map
      map: '',
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
    if (kakao && kakao.maps) {
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
      const options = {
        center: new kakao.maps.LatLng(37.55108043514493, 126.86483931801229),
        level: 2
      }
      this.map = new kakao.maps.Map(container, options)
    },
    keywordSearch () {
      const places = new kakao.maps.services.Places()
      const callback = (res, status) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log(res)
          this.resSearch = res
        }
      }
      places.keywordSearch(this.restNm, callback, this.searchOptions)
    }
  }
}
</script>

<style>

</style>
