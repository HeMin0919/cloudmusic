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
          {{new Date(item.publishTime).getFullYear()}}.{{new Date(item.publishTime).getMonth() + 1}}.{{new Date(item.publishTime).getDate()}}
          歌曲{{item.size}}
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
    methods: {
      fetchData () {
        const offset = this.albums.length
        this.loading = true
        // 获取歌手专辑
        this.$http.get(`http://localhost:5000/artist/album?id=${this.$route.params.id}&limit=30&offset=${offset}`)
          .then((res) => {
            if (res.data.hotAlbums.length === 0) {
              this.loadingText = '已经加载所有数据'
              this.loading = false
              return
            }
            for (let album of res.data.hotAlbums) {
              this.albums.push(album)
            }
            this.loading = false
          })
      },
      toAlbumMsg (id) {
        this.$router.push({path: `/album/${id}`})
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
  border-bottom: 1px solid #999;
  margin-top: 5px;

}
.each-album-msg h3 {
  font-size: 14px;
  font-weight: 400;
  color: black;
  margin-bottom: 3px;
}
.each-album-msg p {
  font-size: 12px;
  color: #999;
  margin-bottom: 3px;
}
</style>
