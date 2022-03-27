import Vue from 'vue'
import { ToastPlugin } from 'bootstrap-vue'
Vue.use(ToastPlugin)

const vm = new Vue({})

export const showToast = (variant, msg) => {
  vm.$bvToast.toast(msg, {
    title: 'Notice',
    variant: variant,
    solid: true
  })
}
