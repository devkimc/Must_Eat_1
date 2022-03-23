<template>
  <div class="map_view">
    <map-button-component
      v-if="getLoginFlag"
      :category-list="categoryList"
    >
    </map-button-component>
    <div id="map"></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MapButtonComponent from './MapButton'

export default {
  name: 'KakaoMap',
  components: {
    MapButtonComponent
  },
  props: {
    categoryList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // api
      apiKey: process.env.API_KEY_KAKAO_MAP,
      apiUrl: 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=',
      apiServices: '&libraries=services',

      // map
      map: '',
      mapOptions: {
        center: '',
        level: ''
      },
      initLatCdnt: 37.55108043514493,
      initLngCdnt: 126.86483931801229,

      favImgSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'
    }
  },
  computed: {
    ...mapGetters(['getLoginFlag', 'getFavRest'])
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
    ...mapMutations(['setInitMap']),

    initMap () {
      const container = document.getElementById('map')
      this.mapOptions = {
        center: new kakao.maps.LatLng(this.initLatCdnt, this.initLngCdnt),
        level: 5
      }
      this.map = new kakao.maps.Map(container, this.mapOptions)
      this.setInitMap(this.map)
      this.showFavRestMarker()
    },

    showFavRestMarker () {
      for (let i = 0; i < this.getFavRest.length; i++) {
        const imgSize = new kakao.maps.Size(24, 35)
        const markerImg = new kakao.maps.MarkerImage(this.favImgSrc, imgSize)
        const marker = new kakao.maps.Marker({
          map: this.map,
          position: new kakao.maps.LatLng(this.getFavRest[i].LNG_CDNT, this.getFavRest[i].LAT_CDNT),
          title: this.getFavRest[i].REST_NM,
          image: markerImg
        })
        marker.setMap(this.map)
      }
    }

  }
}
</script>

<style>

</style>
