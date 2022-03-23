<template>
  <div class="map_button_view">
    <div v-for="(item, index) in categoryList" :key="index">
      <b-badge pill variant="primary" size="sm">{{item}}</b-badge>
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
