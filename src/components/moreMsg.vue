<template>
  <div class="more-msg">
    <div class="more-msg-name">
      歌曲:{{msg.name}}
    </div>
    <div class="each-msg" @click="next(msg)">
      <span class="icon-next"></span>
      <div>下一首播放</div>
    </div>
    <div class="each-msg" @click="collection(msg.id)">
      <span class="icon-collection"></span>
      <div>收藏到歌单</div>
    </div>
    <div class="each-msg" @click="toComment(msg.id)">
      <span class="icon-comment"></span>
      <div>评论</div>
    </div>
    <div class="each-msg" @click="toArtist(msg.artists[0].id)">
      <span class="icon-mine"></span>
      <div class="each-msg-artist">
        歌手：<artists :artists="artist"></artists>
      </div>   
    </div>
    <div class="each-msg" @click="toAlbum(msg.album.id)">
      <span class="icon-album"></span>
      <div>
        专辑：{{album.name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      msg: {
        type: Object
      }
    },
    computed: {
      artist () {
        return this.msg.artists || this.msg.ar
      },
      album () {
        return this.msg.album || this.msg.al
      }
    },
    methods: {
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
      collection (id) {
        this.$http.get(`http://localhost:5000/playlist/tracks?op=add&pid=495727117&tracks=${id}`)
          .then((res) => {
            console.log(res.data)
            this.$emit('hidden')
          })
      },
      toComment (id) {
        this.$store.dispatch('saveCommentType', 0)
        this.$router.push({path: `/comment/${id}`})
      },
      toArtist (id) {
        this.$router.push({path: `/artist/${id}`})
      },
      toAlbum (id) {
        this.$router.push({path: `/album/${id}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
.more-msg-name {
    height: 15px;
    line-height: 15px;
    font-size: 12px;
    margin-left: 12px;
  }
.each-msg {
    display: flex;
    height: 15px;
    line-height: 15px;
    font-size: 12px;
    margin: 10px 0;
  }
.each-msg span {
  color: red;
  width: 10px;
  text-align: center;
  line-height: 10px;
}
.each-msg span  div {
  flex: 1;
  border-bottom: 1px solid #666;
}
.each-msg-artist {
  display: flex;
}
</style>
