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
      apiKey: ''
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
      script.src =
      'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=' + this.apiKey
      document.head.appendChild(script)
    }
  },
  methods: {
    initMap () {
      const container = document.getElementById('map')
      const options = {
        center: new window.kakao.maps.LatLng(33.497118, 126.530588),
        level: 2
      }
      this.map = new window.kakao.maps.Map(container, options)
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
    }
  }
}
</script>

<style>

</style>
