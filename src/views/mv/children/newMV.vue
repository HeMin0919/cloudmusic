<template>
  <div class="mv-library">
    <div v-for="item of mvList" :key="item.id" class="each-mv-wrap" @click="playMV(item.id)">
      <img v-lazy="item.cover">
      <div class="each-mv-count">
        <span class="icon-video"></span>
        {{item.playCount}}
      </div>
      <div class="each-mv-msg">
        <div class="each-mv-artists">
            {{item.name}}-
            <span v-for="(artists, index) in item.artists" :key="index">
              {{artists.name}}
              <span v-if="index < (item.artists.length - 1)">/</span>
            </span>
        </div>
      </div>
      <div class="box"></div>
    </div>
    <!-- 底部滚动刷新，数据重复 -->
    <mu-infinite-scroll 
      :loadingText="loadingText" 
      :loading="loading" 
      @load="fetchData"/>
  </div>
</template>

<script>
  import artists from '../../../components/artists'
  import MugenScroll from 'vue-mugen-scroll'
  export default {
    data () {
      return {
        mvList: [],
        loading: false,
        loadingText: '努力加载中...'
      }
    },
    components: {
      MugenScroll,
      artists
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      playMV (id) {
        this.$store.dispatch('getmvId', id)
        this.$router.push({path: `/mv/${id}`})
      },
      fetchData () {
        const offset = this.mvList.length
        this.loading = true
        // 获取 最新mv 排行
        this.$http.get(`http://localhost:5000/mv/first?limit=20&offset=${offset}`)
        .then((res) => {
          for (let mv of res.data.data) {
            this.mvList.push(mv)
          }
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.mv-library .each-mv-wrap {
    position: relative;
    margin-top: 5px;
}
.each-mv-wrap  img {
    width: 100%;
}
.each-mv-count {
    position: absolute;
    top: 2px;
    right: 2px;
    color: #fff;
    z-index: 1000;
}
.each-mv-msg {
    position: absolute;
    bottom: 2px;
    left: 2px;
    color: #fff;
    z-index: 1000;
}
.each-mv-artists {
    font-size: 12px;
    display: flex;  
    margin-left: 5px;   
}
.box{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background: black;
    opacity:0.2;
    z-index: 999
}
</style>
