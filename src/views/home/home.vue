<template>
  <div class="home-wrap">
    <div class="home-headerwrap">
      <header class="home-header">
        <div @click="showLibrary">
          <span class="icon-cloudmusic"></span>
        </div>
        <div @click="mine">
          <span class="icon-my"></span>
        </div>
        <div @click="search">
          <span class="icon-search_home"></span>
        </div>
      </header>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    methods: {
      showLibrary(){
        this.$router.push({name:'musicLibrary'})
      },
      mine () {
        this.$router.push({path: '/user'})
      },
      search () {
        this.$router.push({path: '/searchHome'})
      }
    }
  }
</script>

<style lang="css" scoped>
 .home-wrap {
    width: 100%;
    height: 100%;
    font-size: 16px;
 }
.home-wrap .home-headerwrap {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
 }
 .home-header {
    display: flex;
    height: 60px;
    line-height: 60px;
    font-size: 30px;
    background-color: #df2d2d;
  }
.home-header > div {
  flex: 1;
  text-align: center;
  cursor: pointer;
  color: #fff;
  }
.icon {
  height: 30px;
  width: 30px;
  }
</style>
