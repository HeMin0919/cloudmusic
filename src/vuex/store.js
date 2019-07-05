// Vuex 应用的状态 state 都应当存放在 store.js 里面，Vue 组件可以从 store.js 里面获取状态，可以把 store 通俗的理解为一个全局变量的仓库。

// 但是和单纯的全局变量又有一些区别， 主要体现在当 store 中的状态发生改变时， 相应的 vue 组件也会得到高效更新。

import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
const store = new vuex.Store({
  state: {
    musicUrlList: [],
    isPlaying: true,
    isController: false,
    nowMusic: {
      ind: '',
      id: '',
      nowMusicUrl: '',
      nowName: '',
      nowArtists: '',
      nowImgurl: '',
      isPlaying: false
    },
    full: {
      fullTime: '',
      fullMin: '',
      fullSec: ''
    },
    current: {
      currentTime: '',
      currentMin: '',
      currentSec: '',
      value1: ''
    },
    mvId: 0,
    moreMsg: {},
    // 播放模式, 0代表列表顺序播放，1随机播放，2单曲循环
    playModel: 0,
    // 存储comment页面的来源, 0代表音乐，1代表歌单，2代表专辑，3代表mv
    commentType: 0,
    // 存储评论页面头部信息
    commentHeader: {},
    // 初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
    cellphone: window.sessionStorage.getItem('cellphone'),
    token: window.sessionStorage.getItem('token')
  },
  mutations: {
    oldMusicList(state) {
      state.musicUrlList = []
    },
    newMusicList(state, obj) {
      state.musicUrlList.push(obj)
    },
    insertMusic(state, obj) {
      state.musicUrlList.splice(obj.ind + 1, 0, obj)
    },
    musicPush(state, obj) {
      state.musicUrlList.push(obj)
    },
    nowMusicUrl(state, obj) {
      state.nowMusic.ind = obj.ind
      state.nowMusic.id = obj.id
      state.nowMusic.nowMusicUrl = obj.nowMusicUrl
      state.nowMusic.nowName = obj.nowName
      state.nowMusic.nowArtists = obj.nowArtists
      state.nowMusic.nowImgurl = obj.nowImgurl
    },
    full(state, obj) {
      state.full.fullTime = obj.fullTime
      state.full.fullMin = obj.fullMin
      state.full.fullSec = obj.fullSec
    },
    current(state, obj) {
      state.current.currentTime = obj.currentTime
      state.current.currentMin = obj.currentMin
      state.current.currentSec = obj.currentSec
      state.current.value1 = obj.value1
    },
    play(state, bol) {
      state.isPlaying = bol
    },
    showController(state, playMusic) {
      state.isController = playMusic
    },
    saveMvId(state, obj) {
      state.mvId = obj
    },
    saveMoreMsg(state, obj) {
      state.moreMsg = obj
    },
    changePlayModel(state, num) {
      state.playModel = num
    },
    changeCommentType(state, num) {
      state.commentType = num
    },
    changeCommentHeader(state, obj) {
      state.commentHeader = obj
    },
    //将token保存到sessionStorage里，token表示登陆状态
    SET_TOKEN: (state, data) => {
        state.token = data
        window.sessionStorage.setItem('token', data)
      },
      //获取用户名
      GET_CELLPHONE: (state, data) => {
        // 把用户名存起来
        state.cellphone = data
        window.sessionStorage.setItem('cellphone', data)
      },
      //登出
      LOGOUT: (state) => {
        // 登出的时候要清除token
        state.token = null
        state.cellphone = null
        window.sessionStorage.removeItem('token')
        window.sessionStorage.removeItem('cellphone')
      }
  },
  actions: {
    clearMusicList(context) {
      context.commit('oldMusicList')
    },
    getMusicList(context, obj) {
      context.commit('newMusicList', obj)
    },
    changeMusic(context, obj) {
      context.commit('nowMusicUrl', obj)
    },
    getFull(context, obj) {
      context.commit('full', obj)
    },
    changeCurrent(context, obj) {
      context.commit('current', obj)
    },
    changePlayStatus(context, bol) {
      context.commit('play', bol)
    },
    pushMusic(context, obj) {
      context.commit('musicPush', obj)
    },
    changeControllerStatus(context, obj) {
      context.commit('showController', obj)
    },
    getmvId(context, obj) {
      context.commit('saveMvId', obj) //通过context.commit()方法触发mutations属性函数
    },
    getMoreMsg(context, obj) {
      context.commit('saveMoreMsg', obj)
    },
    nextPlayMusic(context, obj) {
      context.commit('insertMusic', obj)
    },
    genghuanPlayModel(context, num) {
      context.commit('changePlayModel', num)
    },
    saveCommentType(context, num) {
      context.commit('changeCommentType', num)
    },
    saveCommentHeader(context, obj) {
      context.commit('changeCommentHeader', obj)
    },
  }
})
export default store
