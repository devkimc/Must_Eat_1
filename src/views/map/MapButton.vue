<template>
  <div class="map_button_view">
    <div class="cate_list" v-for="(item, index) in cateList" :key="index">
      <b-button v-show="index !== 0" @click="showFavRestCateMarker(item)" variant="primary" size="sm">{{item}}</b-button>
      <b-button v-show="index === 0" @click="showFavRestCateMarker(item)" variant="light" size="sm">{{item}}</b-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MapButton',
  props: {
    cateList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    showFavRestCateMarker (cate) {
      this.$emit('show-fav-rest-cate-marker', cate)
    }
  }
}
</script>
