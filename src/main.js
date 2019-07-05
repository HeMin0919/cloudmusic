// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//基于 Vue 2.0 优雅的 Material Design UI 组件库
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI);
// 使用 Mint UI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);
// 使用 bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
// vue 播放器插件
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

import artists from './components/artists.vue'
Vue.component('artists', artists)

//Axios:引入axios
import Axios from 'axios';
//挂载原型
Vue.prototype.$http = Axios
Axios.defaults.withCredentials = true
// 懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload);
Vue.use(VueLazyload, {
  error: require('./assets/imgs/404.png'),
  loading: require('./assets/imgs/loading.jpg'),
  attempt: 1
})
//Vuex
import store from './vuex/store.js'
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { App },
  template: '<App/>'
})
