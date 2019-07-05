<template>
  <div class="mv-library">
    <div v-for="(item, index) of mvList" :key="item.id" class="each-mv-wrap" @click="playMV(item.id)">
      <img v-lazy="item.cover">
      <div class="each-mv-count">
        <span class="icon-video"></span>
        {{item.playCount}}
      </div>
      <div class="each-mv-msg">
        <div class="each-mv-ind" :class="{top: index < 3}">
          {{index + 1}}
          <div class="each-mv-name">{{item.name}}</div>
        </div>
        <div class="each-mv-artists">
          
          <artists :artists="item.artists" fontcolor="#fff"></artists>
        </div>
      </div>
      <div class="box"></div>
    </div>
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
        // 获取 mv 排行
        this.$http.get(`http://localhost:5000/top/mv?limit=10&offset=${offset}`)
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
.each-mv-ind {
    font-size: 27px;
    font-size: 27px;
    text-align: left;
    margin-left: 5px;
}
.each-mv-name{
    color: #fff;
    font-size: 14px;
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
.top {
    color: #df2d2d;
}
</style>
