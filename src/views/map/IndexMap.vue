<template>
  <!-- Map-->
  <div class="map" id="contact">
    <div id="map" style="width:700px;height:500px;"></div>
  </div>
</template>

<script>
import jeongdae36 from '@/assets/img/jeongdae36.jpg'

export default {
  name: 'IndexMap',
  data () {
    return {
      apiKey: ''
    }
  },
  mounted () {
    // Set api_key for kakao map
    if (process.env.NODE_ENV === 'development') {
      this.apiKey = process.env.VUE_APP_LOCAL_API_KEY
    } else if (process.env.NODE_ENV === 'production') {
      this.apiKey = process.env.VUE_APP_PROD_API_KEY
    } else {
      alert('카카오 맵 api_key 에러!')
    }

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
      const map = new window.kakao.maps.Map(container, options)

      const imageSrc = jeongdae36 // 마커이미지의 주소입니다
      const imageSize = new window.kakao.maps.Size(64, 69) // 마커이미지의 크기입니다
      const imageOption = {offset: new window.kakao.maps.Point(27, 69)} // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
      const markerPosition = new window.kakao.maps.LatLng(33.497118, 126.530588)

      // 마커를 생성합니다
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage // 마커이미지 설정
      })

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map)
    }
  }
}
</script>

<style>

</style>
