<template>
  <div>
    <music-list :songs="hotSongs"></music-list>
  </div>
</template>

<script>
  import musicList from '../../../components/musicList'
  export default {
    data () {
      return {
        hotSongs: []
      }
    },
    components: {
      musicList
    },
    mounted () {
      // 获得歌手部分信息和热门歌曲
      var id= this.$route.params.id;
      this.$http.get(`http://localhost:5000/artists?id=${id}`)
        .then((res) => {
          this.hotSongs = res.data.hotSongs; //热门歌曲
        })
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
