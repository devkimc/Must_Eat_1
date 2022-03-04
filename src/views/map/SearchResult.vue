<template>
  <b-row v-if="resSearch.length !== 0" class="row_list_group">
    <b-col>
      <b-list-group v-for="(item, index) in resSearch" :key="index">
        <b-list-group-item button @click="setCenter(index)" style="margin-bottom: 1%">
          <b-row>
            <b-col cols="10">
              <h6>
                {{item.place_name}}
              </h6>
            </b-col>
            <b-col cols="1">
              <b-icon icon="bookmarks" v-b-toggle.sidebar-no-header @click="setRest(item.place_name)"></b-icon>
            </b-col>
          </b-row>
          <b-row style="padding-left: 7%">
            <p style="font-size: 0.8rem">
              {{item.address_name}}
            </p>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" right shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <h5 id="sidebar-no-header-title">{{favRest}}</h5>
          <p>
            카테고리를 선택해주세요.
          </p>
          <nav class="mb-3">
            <b-nav vertical v-for="(item, index) in foodTp" :key="index">
              <b-nav-item active @click="hide">
                <b-row>
                  <b-col cols="1">
                    <b-icon icon="house" font-scale="1"></b-icon>
                  </b-col>
                  <b-col>
                    {{item.foodCategory}}
                  </b-col>
                </b-row>
              </b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="outline-primary" block @click="hide">Close Sidebar</b-button>
        </div>
      </template>
    </b-sidebar>
    <b-sidebar id="sidebar-right" title="맛집 추가하기" right shadow>
      <div class="px-3 py-2">
        <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
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
  data () {
    return {
      favRest: '',
      foodTp: [
        {
          foodCd: '01',
          foodCategory: '한식'
        },
        {
          foodCd: '02',
          foodCategory: '양식'
        },
        {
          foodCd: '03',
          foodCategory: '중식'
        },
        {
          foodCd: '04',
          foodCategory: '일식'
        },
        {
          foodCd: '05',
          foodCategory: '분식'
        },
        {
          foodCd: '06',
          foodCategory: '아시안'
        },
        {
          foodCd: '07',
          foodCategory: '카페·디저트'
        },
        {
          foodCd: '08',
          foodCategory: '기타'
        }
      ]
    }
  },
  methods: {
    setCenter (index) {
      this.$emit('set-center', index)
    },
    setRest (rest) {
      this.favRest = rest
    }
  }
}
</script>

<style>

</style>
