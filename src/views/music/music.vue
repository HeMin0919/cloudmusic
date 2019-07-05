<template>
  <div class="music-audio-wrap">
    <header>
      <div class="header-iconback" @click="back">
        <span class="icon-Left-arrow"></span>
      </div>
      <div class="header-title">
        <span class="header-music-name">
          {{musicName}}
        </span>
        <artists :artists="artists" fontcolor="white"></artists>
      </div>
    </header>
    <div class="bar-line"></div>
    <section class="music-main">
      <img src="../../assets/imgs/stick_bg.png" class="music-main-stick">
      <div class="music-main-pic">
        <img v-lazy="imgUrl">
      </div>
    </section>
    <section class="music-section-icon">
      <span class="icon-aixin"></span>
      <span class="icon-comment" @click="getComment"></span>
      <span class="icon-bypass"></span>
    </section>
    <section class="music-section-time">
      <span>{{currentMin}}:{{currentSec}}</span>
      <!-- 滑块:用于在一个固定区间内进行选择 -->
      <mu-slider v-model="value" class="slider" @change="hi"></mu-slider>
      <span>{{fullMin}}:{{fullSec}}</span>
    </section>
    <div class="lyric-content">
      <span v-for="(item, index) of arr" :key="index" v-show="(currentMin >= item.currentMin)&&(currentSec >= item.currentSec)&&(currentSec<=arr[index+1].currentSec)&&(currentMin<=arr[index+1].currentMin)">
        {{item.lyric}}
      </span>
    </div>
    <section class="music-section-contro">
      <!-- 列表循环 -->
      <span class="icon-Listloop" v-if="playModelNum === 0" @click="changePlayModel(1)"></span>
      <!-- 随机播放 -->
      <span class="icon-ShufflePlayback" v-if="playModelNum === 1" @click="changePlayModel(2)"></span>
      <!-- 单曲循环 -->
      <span class="icon-singlecycle" v-if="playModelNum === 2" @click="changePlayModel(0)"></span>
      <!-- 上一首 -->
      <span class="icon-prewmusic" @click="prew"></span>
      <!-- 播放暂停 -->
      <span class="icon-pause" @click="play(false)" v-if="isPlaying"></span>
      <!-- 播放开始 -->
      <span class="icon-play" @click="play(true)" v-else></span>
      <!-- 下一首 -->
      <span class="icon-next" @click="next"></span>
      <!-- 打开播放列表 -->
      <span class="icon-list" @click="openBottomSheet"></span>
    </section>
    <!-- 底部表单：从屏幕底部边缘向上滑出的一个面板 -->
    <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
      <mu-list :value="musicId" @itemClick="closeBottomSheet">
        <mu-sub-header>播放列表({{musicUrlList.length}})</mu-sub-header>
        <mu-list-item v-for="(item, index) of musicUrlList" :key="index"
          :title="item.name + ' - ' + item.artists[0].name"
          :value="item.id"
          class="demo-list">
          <mu-list-item-title @click="changeMusic(index, item.id)">{{item.name + ' - ' + item.artists[0].name}}</mu-list-item-title>
          <!-- <mu-list-item-action>
              <mu-icon value="ic_close" slot="right"/>
        </mu-list-item-action> -->
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
    <div class="mask">
      <div class="music-bg" :style="{'background-image':'url(' + imgUrl + '?param=500y500' + ')'}"></div>
    </div>
  </div>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
  import { mapState } from 'vuex'; //使用 mapState 辅助函数生成计算属性
  import { Toast } from 'mint-ui'; //简短的消息提示框
  export default {
    data () {
      return {
        musicUrl: '',
        urlArr: [],
        // ind是播放的曲目，在当前播放列表的序列
        ind: null,
        artistsArr: [],
        // pattern,0代表列表循环模式，1代表随机播放，2代表单曲循环
        pattern: 0,
        lyric: '',
        arr: [],
        // 代表三种模式，1.列表循环 2.随机播放 3.单曲循环
        playModel: [false, false, false],
        bottomSheet: false,
        playType: '1'
      }
    },
    computed: mapState({
      id: state => state.nowMusic.id,
      musicName: state => state.nowMusic.nowName,
      artists: state => state.nowMusic.nowArtists,
      imgUrl: state => state.nowMusic.nowImgurl,
      currentMin: state => state.current.currentMin,
      currentSec: state => state.current.currentSec,
      fullTime: state => state.full.fullTime,
      fullMin: state => state.full.fullMin,
      fullSec: state => state.full.fullSec,
      value1: state => state.current.value1,
      isPlaying: state => state.isPlaying,
      playModelNum: state => state.playModel,
      musicUrlList: state => state.musicUrlList,
      musicId: state => state.nowMusic.id,
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      value () {
        return this.value1;
      }
    }),
    mounted () {
      this.getLyric(this.id)
      console.log(this.lyric)
    },
    // 导航进入评论页面后，隐藏底部音乐控制器
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.dispatch('changeControllerStatus', false)
      })
    },
    // 导航离开评论页面后，显示底部音乐控制器
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('changeControllerStatus', true)
      next()
    },
    // 监测路由变化，变化则更新歌词
    watch: {
      $route: function () {
        this.getLyric(this.id)
      }
    },
    methods: {
      changePlayModel (ind) {
        this.toast = true
        this.playModel = [false, false, false]
        this.playModel[ind] = true
        this.$store.dispatch('genghuanPlayModel', ind)
        if (ind === 0) {
          this.playType = '单曲循环'
        } else if (ind === 1) {
          this.playType = '循环'
        } else if (ind === 2) {
          this.playType = '随机'
        }
        // 消息提示
        Toast({
          message: this.playType,
          position: 'bottom',
          duration: 1000, //持续时间
        });
      },
      play (bol) {
        const audio = document.querySelector('#audio')
        if (!this.$store.state.isPlaying) {
          audio.play()
        } else {
          audio.pause()
        }
        this.$store.dispatch('changePlayStatus', bol)
      },
      prew () {
        let ind = 0
        // 获得下一首歌曲的id
        let id = 0
        if (this.playModelNum === 0 || this.playModelNum === 2) {
          // 如果是歌曲的第一首，则ind为音乐列表长度减一，以便下次取到的是最后一首
          ind = this.$store.state.nowMusic.ind === 0 ? this.$store.state.musicUrlList.length - 1 : this.$store.state.nowMusic.ind - 1
          id = this.$store.state.musicUrlList[ind].id
        } else {
          ind = Math.floor(Math.random() * this.$store.state.musicUrlList.length)
          id = this.$store.state.musicUrlList[ind].id
        }
        console.log(this.$store.state.musicUrlList[ind].name)
        console.log(ind)
        // 由于获取的歌单，没有歌曲的url，需要先ajax请求url，再发送
        this.$http.get(`http://localhost:5000/song/url?id=${id}`)
          .then((res) => {
            // 下一首歌曲的url
            const url = res.data.data[0].url
            const {name, artists, imgUrl} = this.$store.state.musicUrlList[ind]
            const nextObj = {
              id,
              ind: ind,
              nowMusicUrl: url,
              nowName: name,
              nowArtists: artists,
              nowImgurl: imgUrl
            }
            this.$router.replace({path: `/music/${id}`})
            this.$store.dispatch('changePlayStatus', true)
            this.$store.dispatch('changeMusic', nextObj)
          })
      },
      next () {
        let ind = 0
        // 获得下一首歌曲的id
        let id = 0
        if (this.playModelNum === 0 || this.playModelNum === 2) {
          // 如果是歌曲的最后一首，则ind为0，以便下次取到的是第一首
          ind = this.$store.state.nowMusic.ind === this.$store.state.musicUrlList.length - 1 ? 0 : this.$store.state.nowMusic.ind + 1
          id = this.$store.state.musicUrlList[ind].id
        } else {
          ind = Math.floor(Math.random() * this.$store.state.musicUrlList.length)
          id = this.$store.state.musicUrlList[ind].id
        }
        console.log(this.$store.state.musicUrlList[ind].name)
        // 由于获取的歌单，没有歌曲的url，需要先ajax请求url，再发送
        console.log(ind)
        this.$http.get(`http://localhost:5000/song/url?id=${id}`)
          .then((res) => {
            // 下一首歌曲的url
            const url = res.data.data[0].url
            const {name, artists, imgUrl} = this.$store.state.musicUrlList[ind]
            const nextObj = {
              id,
              ind: ind,
              nowMusicUrl: url,
              nowName: name,
              nowArtists: artists,
              nowImgurl: imgUrl
            }
            this.$router.replace({path: `/music/${id}`})
            this.$store.dispatch('changePlayStatus', true)
            this.$store.dispatch('changeMusic', nextObj)
          })
      },
      getComment () {
        console.log('go comment')
        let obj = {
          name: this.musicName,
          artists: this.artists,
          musicpic: this.imgUrl
        }
        this.$store.dispatch('saveCommentHeader', obj)
        this.$store.dispatch('saveCommentType', 0)
        this.$router.push({path: `/comment/${this.$store.state.nowMusic.id}`})
      },
      getLyric (id) {
        /*eslint-disable */
        const dateReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
        this.$http.get(`http://localhost:5000/lyric?id=${id}`)
          .then((res) => {
            this.lyric = res.data.lrc.lyric
            // 获得的歌词是一个字符串，类似'[00:00:00] 歌词第一句/n[00:01:01] 歌词第二句/n'这种
            // 切割成一个数组，数组的每一项包含对应的时间和歌词
            const lyrics = this.lyric.split('\n')
            // 定义一个空数组，用来存放歌词，数组的每一项都是一个对象，对象包含时间属性和歌词属性
            for (var [ind, lyric] of lyrics.entries()) {
              // 正则匹配，获得包含时间的字符串，
              const eachtime = lyric.match(dateReg)
              var min = eachtime ? eachtime[0].slice(1, 3) : undefined 
              var sec = eachtime ? eachtime[0].slice(4, 6) : undefined
              // 将包含时间的字符串替换点，获得对应每一项的歌词
              const eachlyric = lyric.replace(dateReg, "").trim()
              this.arr[ind] = {
                date: eachtime,
                currentMin: min,
                currentSec: sec,
                lyric: eachlyric
              }
            }
          })
      },
      back () {
        this.$router.go(-1)
      },
      hi (value) {
        const currentTime = (value * this.fullTime) / 100
        const currentMin = Math.floor(currentTime / 60).toString().padStart(2, '0')
        const currentSec = Math.floor(currentTime % 60).toString().padStart(2, '0')
        const obj = { currentTime, currentMin, currentSec, value1: value }
        // 改变播放器进度
        const audio = document.querySelector('#audio')
        audio.currentTime = currentTime
        this.$store.dispatch('changeCurrent', obj)
      },
      closeBottomSheet () {
        this.bottomSheet = false
      },
      openBottomSheet () {
        this.bottomSheet = true
      },
      changeMusic (ind, id) {
        console.log(ind)
        this.$http.get(`http://localhost:5000/song/url?id=${id}`)
          .then((res) => {
            // 下一首歌曲的url
            const url = res.data.data[0].url
            const {name, artists, imgUrl} = this.musicUrlList[ind]
            const Obj = {
              id,
              ind: ind,
              nowMusicUrl: url,
              nowName: name,
              nowArtists: artists,
              nowImgurl: imgUrl
            }
            this.$router.push({path: `/music/${id}`})
            this.$store.dispatch('changePlayStatus', true)
            this.$store.dispatch('changeMusic', Obj)
          })
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @mixin element-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .music-audio-wrap {
    .mask {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      background-color: #444;
      .music-bg {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: 100%;
        width: 100%;
        filter: blur(20px);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: -2;
      }
    }
    > header {
      display: flex;
      height: 60px;
      .header-iconback {
        width: 33px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff9e8;
      }
      .header-title {
        flex: 1;
        @include element-center;
        .header-music-name {
          font-size: 14px;
          color: #fff9e8;
        }
        .header-music-artists {
          font-size: 12px;
          color: #665a3b;
        }
      }
    }
    .bar-line {
      display: block;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: radial-gradient(#d3d3d3 -90%,transparent 100%);
    }
    .music-main {
      .music-main-stick {
        display: block;
        height: 70px;
        margin: 0 auto;
        margin-top: -2px;
        margin-bottom: -2px;
      }
      .music-main-pic {
        background: url(../../assets/imgs/cd_wrapper.png);
        background-size: cover;
        margin: 0 auto;
        width: 240px;
        height: 240px;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: rotate 25s linear infinite;
        // animation-play-state: paused;
        img {
          width: 66%;
          margin: 0 auto;
          border-radius: 50%;
        }
      }
    }
    .music-section-icon {
      display: flex;
      width: 80%;
      margin: 35px auto 24px;
      color: #fff;
      font-size: 24px;
      > span {
        flex: 1;
        text-align: center;
      }
    }
    .music-section-time {
      display: flex;
      width: 80%;
      margin: 0 auto;
      color: #fff;
      .slider {
        margin-left: 11px;
        margin-right: 11px;
      }
    }
    .lyric-content {
      height: 14px;
      width: 100%;
      text-align: center;
    }
    .music-section-contro {
      display: flex;
      color: #fff;
      margin: 25px 0;
      height: 60px;
      line-height: 60px;
      > span {
        flex: 1;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
      }
      .icon-play,
      .icon-pause {
        font-size: 24px;
      }
    }
  }
  @keyframes rotate {
    0%{ 
      transform:rotate(0deg);
    } 100%{
      transform:rotate(360deg);
    }
  }
</style>
