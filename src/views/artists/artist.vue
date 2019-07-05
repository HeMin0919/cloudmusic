 <template>
  <div>
    <mu-circular-progress :size="80" color="red" v-if="loding" class="loding"/>
    <div>
      <header class="artist-header">
        <list-title :title="data.artist.name"></list-title>
        <img v-lazy="data.artist.picUrl">
      </header>
      <div class="artist-router">
        <router-link :to="{name: 'artistHotmusic'}" replace>
          热门50
        </router-link>
        <router-link :to="{name: 'artistAlbum'}" replace>
          专辑{{data.artist.albumSize}}
        </router-link>
        <router-link :to="{name: 'artistMV'}" replace>
          MV
        </router-link>
        <router-link :to="{name: 'artistMsg'}" replace>
          歌手信息
        </router-link>
      </div>
    </div>
    <keep-alive>
     <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import listTitle from '../../components/listTitle'
  export default {
    data () {
      return {
        data: {
          loding: true,
          artist: {
            name: '',
            img1v1Url: ''
          }
        }
      }
    },
    components: {
      listTitle
    },
    watch: {
      $route (to, from) {
        // 通过观察id是否变化，来进行数据更新，同时保证是在artist页面内的id变化
        if ((to.params.id !== from.params.id) && to.name === 'artistHotmusic') {
          console.log('歌手id变化')
          this.ajax()
        }
      }
    },
    mounted () {
      this.ajax()
    },
    methods: {
      ajax () {
        //   获取歌手单曲
        this.$http.get(`http://localhost:5000/artists?id=${this.$route.params.id}`)
          .then((res) => {
            this.data = res.data;
            this.loding = false;
          })
      }
    }
  }
</script>

<style lang="css" scoped>
.loding {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.artist-header {
  /* height: 305px; */
}
.artist-header img {
  /* display: block; */
  width: 100%;
  width: 100%;
}
.artist-router {
  display: flex;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}
.artist-router a{
  flex: 1;
  text-align: center;
  color: #666;
}
.artist-router .router-link-active {
  color: #df2d2d;
  text-decoration: none;
  border-bottom: 2px solid #df2d2d;
}
</style>
