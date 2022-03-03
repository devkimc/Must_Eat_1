<template>
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
</template>

<script>
import { mapGetters } from 'vuex'
import { showToast } from '@/plugins/toast'
import { getRestInfo } from '@/api/map'

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

      // map
      marker: {},
      markers: []
    }
  },
  computed: {
    ...mapGetters(['getInitMap'])
  },
  methods: {
    /* global kakao */
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
      places.keywordSearch(this.restNm, callback, this.searchOptions)
    },

    showMarker (place) {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(place.y, place.x),
        clickable: true
      })
      marker.setMap(this.getInitMap)
      this.clickMarker(marker, place)
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

    clickMarker (marker, place) {
      kakao.maps.event.addListener(marker, 'click', () => {
        getRestInfo(place.id).then(res => {
          console.log(res)
          console.log(res.data.comment.scoresum)
        })
      })
    }
  }
}
</script>

<style>

</style>
