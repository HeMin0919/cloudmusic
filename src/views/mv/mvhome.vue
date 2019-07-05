<template>
  <div>
    <list-title :title="name"></list-title>
    <video-player ref="videoPlayer"
                  class="video-player vjs-custom-skin"
                  :playsinline="true"
                  :options="playerOptions"
                  >
    </video-player>
    <div class="each-section-wrap">
      <router-link :to="{path: `/mv/${this.$route.params.id}/mvdetails`}" replace>详情</router-link>
      <router-link :to="{path: `/mv/${this.$route.params.id}/mvcomment`}" replace>评论</router-link>
      <router-link :to="{path: `/mv/${this.$route.params.id}/similarMV`}" replace>相关MV</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'
  import listTitle from '../../components/listTitle.vue'
  export default {
    data () {
      return {
        MVURL: '',
        name: '',
        playerOptions: {
          // component options
          height: '260',
          autoplay: false,//如果true,浏览器准备好时开始播放。
          // videojs options
          muted: true, // 默认情况下将会消除任何音频。
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],//播放速度
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          sources: [{
            type: 'video/mp4', // 类型
            src: ''
          }],
          poster: '' //封面地址
        }
      }
    },
    components: {
      listTitle,
      videoPlayer
    },
    mounted () {
      this.ajax();
      setTimeout(() => {
        this.playerOptions.muted = false;
      }, 2000);
    },
    computed: {
      mvid () {
        return this.$store.state.mvId;
      },
      player () {
        return this.$refs.videoPlayer.player;
      }
    },
    watch: {
      mvid () {
        this.ajax();
      }
    },
    // 导航进入mv页面后，隐藏底部音乐控制器
    beforeRouteEnter (to, from, next) {
      next(vm => {
        const audio = document.querySelector('#audio');
        audio.pause();
        vm.$store.dispatch('changePlayStatus', false);
        vm.$store.dispatch('changeControllerStatus', false);
      })
    },
    // 导航进入mv页面后，显示底部音乐控制器
    beforeRouteLeave (to, from, next) {
      if (this.$store.state.musicUrlList.length !== 0) {
        this.$store.dispatch('changeControllerStatus', true);
      }
      next();
    },
    methods: {
      ajax () {
        // 获取 mv 数据
        this.$http.get(`http://localhost:5000/mv/detail?mvid=${this.$route.params.id}`)
        .then((res) => {
          this.MVURL = res.data.data.brs[1080]; //获取 mv 播放地址
          this.playerOptions.sources[0].src = res.data.data.brs[1080]; //获取 mv 播放地址
          this.name = res.data.data.name;
          this.playerOptions.poster = res.data.data.cover;
          console.log(this.playerOptions.poster);
        })
      },
      goDetails () {
        this.$router.replace({path: `/mv/${this.$route.params.id}/mvdetails`});
      },
      goComment () {
        this.$router.replace({path: `/mv/${this.$route.params.id}/mvcomment`});
      },
      goSimilar () {
        this.$router.replace({path: `/mv/${this.$route.params.id}/similarMV`});
    }
    }
  }
</script>

<style lang="scss" scoped>
.each-section-wrap {
    display: flex;
    height: 45px;
    line-height: 45px;
}
.each-section-wrap a {
    flex: 1;
    justify-content: space-between;
    color: #666;
    line-height: 45px;
    text-align: center;
}
.router-link-active {
    color: #df2d2d;
    text-decoration: none;
    border-bottom: 2px solid #df2d2d;
}
</style>
