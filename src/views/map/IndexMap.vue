<template>
  <!-- Map-->
  <div class="indexmap_view">
    <div id="map"></div>
    <b-card class="card">
      <b-row class="row_input">
        <b-col>
          <b-form-input placeholder='식당 이름' v-model="restNm"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="row_input">
        <b-col>
          <b-form-input placeholder='음식 구분' v-model="foodTp"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="row_input">
        <b-col>
          <b-form-input placeholder='대표 메뉴' v-model="MainMn"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="row_button">
        <b-col>
          <b-button block variant="primary">추가하기</b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'IndexMap',
  data () {
    return {
      restNm: '',
      foodTp: '',
      MainMn: '',
      map: '',
      markers: [],
      latLng: '',
      latCdnt: '',
      lngCdnt: '',
      apiKey: '',
      apiUrl: 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=',
      apiServices: '&libraries=services'
    }
  },
  mounted () {
    // Set api_key for kakao map
    this.apiKey = process.env.API_KEY_KAKAO_MAP

    // Show kakao map
    if (window.kakao && window.kakao.maps) {
      this.initMap()
    } else {
      const script = document.createElement('script')
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap)
      script.src = this.apiUrl + this.apiKey + this.apiServices
      document.head.appendChild(script)
    }
  },
  methods: {
    initMap () {
      const container = document.getElementById('map')
      const options = {
        center: new kakao.maps.LatLng(33.497118, 126.530588),
        level: 2
      }
      this.map = new kakao.maps.Map(container, options)
      // 장소 검색 객체를 생성합니다
      const ps = new kakao.maps.services.Places(this.map)

      // 카테고리로 은행을 검색합니다
      ps.categorySearch('FD6', this.placesSearchCB, {useMapBounds: true})

      window.kakao.maps.event.addListener(this.map, 'click', mouseEvent => {
        this.addMarker(mouseEvent.latLng)
        const latLng = mouseEvent.latLng
        this.latCdnt = latLng.getLat()
        this.lngCdnt = latLng.getLng()
      })
    },
    addMarker (position) {
      const marker = new kakao.maps.Marker({
        position: position
      })
      marker.setMap(this.map)
      this.markers.push(marker)
    },
    placesSearchCB (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < data.length; i++) {
          this.displayMarker(data[i])
        }
      }
    },
    displayMarker (place) {
    // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(place.y, place.x)
      })
      marker.setMap(this.map)
      this.markers.push(marker)
    }
  }
}
</script>

<style>

</style>
