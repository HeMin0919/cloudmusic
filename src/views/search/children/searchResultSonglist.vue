<template>
  <div>
    <div v-for="item in songlists" :key="item.id" @click="toSonglistsMsg(item.id)" class="each-songlist">
      <div class="each-songlist-pic">
        <img v-lazy="item.coverImgUrl" alt="">
      </div>
      <div class="each-songlist-right">
        <h3 class="each-songlist-name">{{item.name}}</h3>
        <div class="each-songlist-msg">
          {{item.trackCount}}首
          by
          {{item.creator.nickname}},
          播放{{item.playCount}}次
        </div>
    </div>
    </div>
    <mu-infinite-scroll 
      :loadingText="loadingText" 
      :loading="loading" 
      @load="fetchData"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        songlists: [],
        loading: false,
        loadingText: '努力加载中...'
      }
    },
    mounted () {
      this.fetchData()
    },
    // 计算当前搜索的值
    computed: {
      query () {
        return this.$route.query.val
      }
    },
    // query变化重新搜索
    watch: {
      query () {
        this.songlists = []
        this.fetchData()
      }
    },
    methods: {
      toSonglistsMsg (id) {
        this.$router.push({path: `/playlist/${id}`})
      },
      fetchData () {
        const offset = this.songlists.length
        this.loading = true
        var val = this.$route.query.val;
         // 搜索  type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
        this.$http.get(`http://localhost:5000/search?keywords=${val}&type=1000&limit=15&offset=${offset}`)
          .then((res) => {
            this.data = res.data.result.playlists
            for (let songlist of res.data.result.playlists) {
              this.songlists.push(songlist)
            }
            this.loading = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .each-songlist {
    display: flex;
  }
.each-songlist-pic {
    width: 60px;
    height: 60px;
    padding: 5px;
}
.each-songlist-pic img {
    width: 100%;
    height: 100%;
}
.each-songlist-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #F9FAFC;
}
.each-songlist-name {
    font-size: 13px;
    font-weight: 400;
}
.each-songlist-msg {
    font-size: 12px;
    color: #666;
}
</style>
