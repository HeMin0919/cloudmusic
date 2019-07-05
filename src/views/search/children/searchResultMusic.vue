<template>
  <div>
    <music-list :songs="songs" :indShow="false" :playallShow="false"></music-list>  
    <mu-infinite-scroll 
      :loadingText="loadingText" 
      :loading="loading" 
      @load="fetchData"/>
  </div>
</template>

<script>
  import musicList from '../../../components/musicList'
  export default {
    data () {
      return {
        songs: [],
        loading: false,
        loadingText: '努力加载中...'
      }
    },
    components: {
      musicList
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
        this.songs = []
        this.fetchData()
      }
    },
    methods: {
      fetchData () {
        const offset = this.songs.length
        this.loading = true
        var val = this.$route.query.val;
        // 搜索  type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
        this.$http.get(`http://localhost:5000/search?keywords=${val}&type=1&offset=${offset}`)
          .then((res) => {
            // this.songs = res.data.result.songs
            for (let song of res.data.result.songs) {
              this.songs.push(song)
            }
            this.loading = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
.each-music {
    display: flex;
    margin-left: 5px;
    border-bottom: 1px solid #F9FAFC;
    padding: 5px 0;
}
.each-music-msg {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.each-music-msg h3 {
    font-size: 12px;
    font-weight: 400;
}
.each-music-artists {
    display: flex;
}
.each-music-more {
    width: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.more-msg-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: black;
    opacity:0.2;
}
.more-msg {
    animation: myfirst 0.2s ease-in;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #F9FAFC;
    z-index: 9999;
}
.songs-wrap {
    overflow: hidden;
}
@keyframes myfirst {
    0% {height: 0;}
    100% {height: 20px;}
}

</style>
