<template>
  <div>
    <header class="user-header" 
      :style="{'background-image':'url(' + userMsg.backgroundUrl + '?param=500y500' + ')'}">
      <span class="icon-Left-arrow" @click="back"></span>
      <div class="user-msg-wrap">
        <img v-lazy="userMsg.avatarUrl">
        <p>
          {{userMsg.nickname}}
          <span>{{userMsg.gender}}</span>
        </p>
        <p v-if="userMsg.expertTags">音乐达人: {{userMsg.expertTags.join('~')}}</p>
      </div>
      <div class="mask"></div>
    </header>
    <div class="user-nav">
      <div :class="{'user-nav-pointer': playlistShow}" @click="changNav(true)">音乐</div>
      <div :class="{'user-nav-pointer': !playlistShow}" @click="changNav(false)">关于TA</div>
    </div>
    <div v-show="playlistShow"  v-for="item of playlist" :key="item.id" class="each-playlist" @click="goPlaylist(item.id)">
      <div class="each-playlist-img">
        <img v-lazy="item.coverImgUrl">
      </div>
      <div class="each-playlist-msg">
        <p class="playlist-name">{{item.name}}</p>
        <p class="playlist-msg">{{item.trackCount}}首, 播放{{item.playCount}}次</p>
      </div>
    </div>
    <div v-show="!playlistShow">
      <div v-if="userMsg.expertTags" class="each-msg">
        <h3>认证信息</h3>
        <p>
          {{userMsg.expertTags.join('~')}}
        </p>
      </div>
      <div v-if="userMsg.birthday" class="each-msg">
        <h3>个人信息</h3>
        <p>
          年龄：{{new Date(userMsg.birthday).getFullYear()}}.{{new Date(userMsg.birthday).getMonth() + 1}}.{{new Date(userMsg.birthday).getDate()}}
        </p>
      </div>
      <div v-if="userMsg.signature" class="each-msg">
        <h3>个人介绍</h3>
        <p>
          {{userMsg.signature}}
        </p>
      </div>
    </div>
  </div>  
</template>

<script>
  export default {
    data () {
      return {
        playlist: [],
        userMsg: {
          expertTags: []
        },
        playlistShow: true
      }
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        var id = this.$route.params.id;
        // 获取用户歌单
        this.$http.get(`http://localhost:5000/user/playlist?uid=${id}`)
          .then((res) => {
            this.playlist = res.data.playlist
            for (var list of res.data.playlist) {
              if (list.creator.userId) {
                this.userMsg = list.creator
                return
              }
            }
          })
      },
      goPlaylist (id) {
        this.$router.push({path: `/playlist/${id}`})
      },
      changNav (bol) {
        this.playlistShow = bol
      },
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="css" scoped>
.user-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    text-align: center;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(0.6px);
    color: #fff;
}
.icon-Left-arrow {
    position: absolute;
    left: 5px;
    top: 5px;
}
.user-msg-wrap{
    font-size: 14px;
}
.user-msg-wrap img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: #666;
    opacity: 0.5;
}
.user-nav {
    display: flex;
    height: 35px;
    line-height: 35px;
}
.user-nav div{
    flex: 1;
    text-align: center;
}
.user-nav-pointer {
    color: #df2d2d;
    border-bottom: 2px solid #df2d2d;  
}
.each-playlist {
    display: flex;
}
.each-playlist-img {
    width: 70px;
    padding: 5px;
}
.each-playlist-img img{
    width: 100%;
    border-radius: 5px;
}
.each-playlist-msg {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-left: 5px;
    padding-top: 12px;
    border-bottom: 1px solid #F9FAFC;
}
.playlist-name {
    font-size: 12px;
    margin-bottom: 5px;
}
.playlist-msg {
    color: #666;
    font-size: 12px;
}
.each-msg {
    margin-bottom: 5px;
    padding-left: 3px;
    text-align: left;
}
.each-msg h3{
    font-size: 14px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.87)
}
.each-msg p{
    color: #444;
    font-size: 14px;
}
</style>
