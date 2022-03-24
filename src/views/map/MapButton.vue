<template>
  <div class="map_button_view">
    <div class="category_list" v-for="(item, index) in categoryList" :key="index">
      <b-button v-show="index !== 0" variant="primary" size="sm">{{item}}</b-button>
      <b-button v-show="index === 0" variant="light" size="sm">{{item}}</b-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MapButton',
  props: {
    categoryList: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
