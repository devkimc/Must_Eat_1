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
            <b-nav vertical v-for="(item, index) in restCategory" :key="index">
              <b-nav-item active @click="hide">
                <b-row>
                  <b-col cols="1">
                    <b-icon icon="house" font-scale="1"></b-icon>
                  </b-col>
                  <b-col>
                    {{item.restTp}}
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
import { procFavRest } from '@/api/favRest'
import { showToast } from '@/plugins/toast'

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
      restCategory: [
        {
          restCd: '01',
          restTp: '한식'
        },
        {
          restCd: '02',
          restTp: '양식'
        },
        {
          restCd: '03',
          restTp: '중식'
        },
        {
          restCd: '04',
          restTp: '일식'
        },
        {
          restCd: '05',
          restTp: '분식'
        },
        {
          restCd: '06',
          restTp: '아시안'
        },
        {
          restCd: '07',
          restTp: '카페·디저트'
        },
        {
          restCd: '08',
          restTp: '기타'
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
    },
    setProcFavRest () {
      procFavRest(this.restId, this.restNm, this.addr, this.latCdnt, this.lngCdnt,
        this.userId, this.restTp, this.favMenu, this.favRestYn).then(res => {
        if (res.data.code === 10000) {
          showToast('success', res.data.msg)
        } else {
          showToast('warning', res.data.msg)
        }
      })
    }
  }
}
</script>

<style>

</style>
