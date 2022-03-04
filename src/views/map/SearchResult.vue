<template>
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
</template>

<script>

export default {
  name: 'SearchResult',
  props: {
    resSearch: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    setCenter (index) {
      this.$emit('set-center', index)
    }
  }
}
</script>

<style>

</style>
