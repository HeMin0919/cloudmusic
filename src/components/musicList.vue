<template>
  <div class="music-list-wrap">
    <div>
        <!-- 播放全部 -->
      <div @click="playAllMusic" class="play-all" v-if="playallShow">
        <div class="play-all-icon">
          <span class="icon-play"></span>
        </div>
        <div class="play-all-msg">
          播放全部
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div v-for="(item, index) in songs" :key="item.id" class="each-music">
        <div class="each-music-index" v-if="indShow">{{index + 1}}</div>
        <div class="each-music-msg" @click="playMusic(item.id, index)">
          <div class="each-music-name">{{item.name}}</div>
          <div class="each-music-artists">
            <div v-if="item.artists">
              <span v-for="(artists, index) in item.artists" :key="index">{{artists.name}}<span v-if="index < (item.artists.length - 1)">/</span></span>
            - <span>{{item.album.name}}</span>
            </div>
            <div v-else>
              <span v-for="(artists, index) in item.ar" :key="artists.id">{{artists.name}}<span v-if="index < (item.ar.length - 1)">/</span></span>
            - <span>{{item.al.name}}</span>
            </div>
          </div>
        </div>
        <!-- 省略号：更多 -->
        <div class="each-music-more"  @click="openBottomSheet(item)">
          <span class="icon-bypass"></span>
        </div>
      </div>
    </div>

    <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
        <mu-list @itemClick="closeBottomSheet">
            <mu-sub-header>歌曲: {{msg.name}}</mu-sub-header>
            <mu-list-item>
                <mu-list-item-title @click="next(msg)">下一首播放</mu-list-item-title>
            </mu-list-item>
            <mu-list-item>
                <mu-list-item-title @click="collection(msg.id)">收藏到歌单</mu-list-item-title>
            </mu-list-item>
            <mu-list-item>
                <mu-list-item-title @click="toComment(msg.id)">评论</mu-list-item-title>
            </mu-list-item>
            <mu-list-item>
                <mu-list-item-title @click="toArtist(artist[0].id)">歌手:{{artists}}</mu-list-item-title>
            </mu-list-item>
            <mu-list-item>
                <mu-list-item-title @click="toAlbum(albums.id)">专辑:{{album}}</mu-list-item-title>
            </mu-list-item>
            <mu-list-item>
                <mu-list-item-title @click="toMV(mvid)" v-if="mvid">查看MV</mu-list-item-title>
            </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>

    <more-msg :msg="$store.state.moreMsg" class="more-msg" v-if="isShow" @hidden="hideMore"></more-msg>
  </div>
</template>

<script>
  import moreMsg from './moreMsg'
  export default {
    data () {
      return {
        isShow: false, 
        bottomSheet: false, //省略号更多选择
        artists: '',
        album: ''
      }
    },
    // 获取playList中传过来的信息
    props: {
        //歌单中的歌曲信息
      songs: {
        type: Array
      },
      indShow: {
        type: Boolean,
        default: true
      },
      playallShow: {
        type: Boolean,
        default: true
      }
    },
    components: {
      moreMsg
    },
    computed: {
      msg () {
        return this.$store.state.moreMsg; //获取state的值
      },
      artist () {
        return this.$store.state.moreMsg.artists || this.$store.state.moreMsg.ar;
      },
      albums () {
        return this.$store.state.moreMsg.album || this.$store.state.moreMsg.al;
      },
      mvid () {
        return this.$store.state.moreMsg.mvid || this.$store.state.moreMsg.mv;
      }
    },
    methods: {
      playAllMusic () {
        const {id} = this.songs[0]
        this.playMusic(id, 0, true, this.$store.state.musicUrlList.length)
        for (let song of this.songs) {
          let {id, mp3Url, name, album, al, artists, ar} = song
          let imgUrl
          // 由于专辑列表与排行榜的数据结构存在一点差距，所以需要判断数据结构，然后解构赋值
          if (album) {
            ({blurPicUrl: imgUrl} = album)
          } else {
            ({picUrl: imgUrl} = al)
          }
          let musicObj = {id, url: mp3Url, name, artists: artists || ar, imgUrl: imgUrl}
          this.$store.dispatch('getMusicList', musicObj);//含有异步操作，数据提交至 actions ，可用于向后台提交数据
        }
      },
      // id是音乐id，ind是即将播放的音乐在页面音乐列表的序列号，if add表示是否要添加这个即将播放的音乐到列表，len表示音乐仓库的长度
      playMusic (id, ind, ifAdd, len) {
        console.log(ind)
        console.log('播放')
        this.$http.get(`http://localhost:5000/song/url?id=${id}`)
          .then((res) => {
            console.log(ind)
            // 这个ind是页面音乐列表的序列
            if (this.songs[ind].album) {
              var artists = this.songs[ind].artists
              var imgUrl = this.songs[ind].album.blurPicUrl
            } else {
              imgUrl = this.songs[ind].al.picUrl
              artists = this.songs[ind].ar
            }
            console.log('长度')
            console.log(this.$store.state.musicUrlList.length)
            let nowInd = null
            if (len || len === 0) {
              nowInd = len
            } else {
              nowInd = this.$store.state.musicUrlList.length
            }
            console.log(len)
            console.log(nowInd)
            // 下面这个ind是当前播放音乐在音乐仓库的序列
            const obj1 = {
              id: this.songs[ind].id,
              ind: nowInd,
              nowMusicUrl: res.data.data[0].url,
              nowName: this.songs[ind].name,
              nowArtists: artists,
              nowImgurl: imgUrl
            }
            const obj2 = {
              imgUrl: imgUrl,
              id: id,
              url: res.data.data[0].url,
              name: this.songs[ind].name,
              artists: artists
            }
            this.$store.dispatch('changeMusic', obj1)
            this.$store.dispatch('changePlayStatus', true)
            this.$store.dispatch('changeControllerStatus', true)
            if (ifAdd) {
              return
            }
            this.$store.dispatch('pushMusic', obj2)
          })
      },
      showMore (obj) {
        this.$store.dispatch('getMoreMsg', obj)
        // this.isShow = !this.isShow
        console.log(this.isShow)
      },
      hideMore () {
        this.isShow = false
      },
      //   关闭更多
      closeBottomSheet () {
        this.bottomSheet = false
      },
      //   打开更多
      openBottomSheet (obj) {
        this.$store.dispatch('getMoreMsg', obj)
        const ar = this.msg.ar ? this.msg.ar : this.msg.artists
        let arr = []
        for (var item of ar) {
          arr.push(item.name)
        }
        this.artists = arr.join('/')
        this.album = this.msg.al ? this.msg.al.name : this.msg.album.name
        this.bottomSheet = true;
      },
      //   下一首播放
      next ({artists, id, name, album: {picUrl}, mp3Url}) {
        const ind = this.$store.state.nowMusic.ind
        const obj = {
          artists,
          id,
          imgurl: picUrl,
          name,
          url: mp3Url,
          ind
        }
        this.$store.dispatch('nextPlayMusic', obj)
        this.$emit('hidden')
      },
      //   收藏到歌单
      collection (id) {
        this.$http.get(`http://localhost:5000/playlist/tracks?op=add&pid=495727117&tracks=${id}`)
          .then((res) => {
            console.log(res.data)
            this.$emit('hidden')
          })
      },
      //  跳转到评论
      toComment (id) {
        this.$store.dispatch('saveCommentType', 0)
        this.$router.push({path: `/comment/${id}`})
      },
      //   跳转到歌手
      toArtist (id) {
        console.log(id)
        this.$router.push({path: `/artist/${id}`})
      },
      //   跳转到专辑
      toAlbum (id) {
        this.$router.push({path: `/album/${id}`})
      },
      //   跳转到MV
      toMV (id) {
        this.$router.push({path: `/mv/${id}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
.music-list-wrap .play-all{
    height: 50px;
    font-size: 16px;
    text-align: left;
    position: relative;
    color: #999;
    background-color: #f1f6f4;
    line-height: 50px;
}
.play-all-icon{
    margin-left: 15px;
}
.play-all-msg{
    position: absolute;
    left: 45px;
    top: 0;
}

.each-music {
    display: flex;
    height: 45px;
    font-size: 12px;
    text-align: center;
    background-color: #f1f6f4;
}
.each-music-index{
    line-height: 45px;
    margin-left: 15px;
    text-align: center;
    width: 15px;
    color: #999;
    font-size: 12px;
}
.each-music-msg {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid #e1e6e4;
}
.each-music-name {
    color: #343937;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    margin-left: 20px;
}
.each-music-artists {
    color: #a1a6a4;
    font-size: 12px;
    text-align: left;
    margin-left: 20px;
}
.each-music-more {
    color: #babfbd;
    line-height: 45px;
    border-bottom: 1px solid #e1e6e4;
    width: 20px;
    font-size: 12px;
}
</style>
