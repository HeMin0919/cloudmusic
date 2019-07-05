<template>
  <div>
    <div v-for="item in albums" :key="item.id" @click="toAlbumMsg(item.id)" class="each-album">
      <div class="each-album-pic">
        <img v-lazy="item.blurPicUrl" alt="">
      </div>
      <div class="each-album-msg">
        <h3>
          {{item.name}}
        </h3>
        <p>
          {{item.artist.name}}
        </p>
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
        albums: [],
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
        this.albums = []
        this.fetchData()
      }
    },
    methods: {
      toAlbumMsg (id) {
        this.$router.push({path: `/album/${id}`})
      },
      fetchData () {
        const offset = this.albums.length
        this.loading = true
        var val = this.$route.query.val;
         // 搜索  type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
        this.$http.get(`http://localhost:5000/search?keywords=${val}&type=10&limit=15&offset=${offset}`)
          .then((res) => {
            this.data = res.data.result.albums
            for (let album of res.data.result.albums) {
              this.albums.push(album)
            }
            this.loading = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .each-album {
    display: flex;
  }
.each-album-pic {
    width: 50px;
    height: 50px;
    padding: 5px;
}
.each-album-pic img {
    width: 100%;
    height: 100%;
}
.each-album-msg {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #F9FAFC;
    margin-left: 5px;
    
}
.each-album-msg h3 {
    padding-top: 5px;
    margin-bottom: 5px;
    font-size: 12px;
    font-weight: 400;
}
.each-album-msg p {
    font-size: 12px;
    color: #999;
    margin-bottom: 5px;
}
</style>
