<template>
 <div id="app" class="app">
    <router-view :class="{'view-wrap': showController}"></router-view>
    <music-controller class="player" v-show="showController"></music-controller>
  </div>
</template>

<script>
import musicController from './components/musicController'
  export default {
    components: {
      musicController
    },
    computed: {
      showController () {
        return this.$store.state.isController;//子组件通过 this.$store 访问到,更新下 isController
      }
    }
  }
</script>

<style>
/* 在app.vue里我们全局引入这个文件，这样在其他页面就不需要引入了。 */
@import './assets/css/icon.css';
  .player {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #F9FAFC;  
  }
  .view-wrap {
    padding-bottom: 5px;
  }
  .loding {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
