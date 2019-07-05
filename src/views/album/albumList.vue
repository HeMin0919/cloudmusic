<template>
  <div>
    <list-title title="新碟上架"></list-title>
    <div class="all-album-wrap">
      <div v-for="item of albums" :key="item.id" @click="toAlbumMsg(item.id)" class="each-album">
        <img v-lazy="item.picUrl">
        <p class="each-album-name">
          {{item.name}}
        </p>
        <artists :artists="item.artists" class="each-album-artists"></artists>
      </div>
    </div>
    <mugen-scroll :handler="fetchData" :should-handle="!loading" :handleOnMount="false">
      loading...
    </mugen-scroll>
  </div>
</template>
<script>
  import listTitle from '../../components/listTitle.vue'
  import artists from '../../components/artists.vue'
  import MugenScroll from 'vue-mugen-scroll'
  export default {
    data () {
      return {
        albums: [],
        loading: false
      }
    },
    components: {
      listTitle,
      artists,
      MugenScroll
    },
    created() {
        this.fetchData ();
    },
    methods: {
      toAlbumMsg (id) {
        this.$router.push({path: `/album/${id}`})
      },
      fetchData () {
        const offset = this.albums.length
        this.loading = true
        // 最新专辑
        this.$http.get(`http://localhost:5000/album/newest?offset=${offset}&limit=20`).then((res) => {
          for (let album of res.data.albums) {
            this.albums.push(album)
          }
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.all-album-wrap{
  top: 5px;
  position: relative;
}
.each-album {
  width: 50%;
  display: inline-block;
  text-align: center;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  
}
.each-album img {
    width: 80%;
    border-radius: 5px;
}
.each-album-name {
    font-size: 12px;
    // overflow:hidden;
    // text-overflow:ellipsis;
    // white-space:nowrap;
}
// .each-album-artists {
//   // overflow:hidden;
//   // text-overflow:ellipsis;
//   // white-space:nowrap;
// }
</style>
