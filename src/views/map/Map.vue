<template>
  <div id="map"></div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'KakaoMap',
  data () {
    return {
      // api
      apiKey: process.env.API_KEY_KAKAO_MAP,
      apiUrl: 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=',
      apiServices: '&libraries=services',

      // map
      mapOptions: {
        center: '',
        level: ''
      },
      initLatCdnt: 37.55108043514493,
      initLngCdnt: 126.86483931801229
    }
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
    ...mapMutations(['setMap']),

    initMap () {
      const container = document.getElementById('map')
      this.mapOptions = {
        center: new kakao.maps.LatLng(this.initLatCdnt, this.initLngCdnt),
        level: 2
      }
      const map = new kakao.maps.Map(container, this.mapOptions)
      this.setMap(map)
    }
  }
}
</script>

<style>

</style>
