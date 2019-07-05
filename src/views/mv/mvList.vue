<template>
  <div>
    <list-title title="MV频道"></list-title>
    <!-- 跳转到相应的mv部分 -->
    <div class="mv-router">
      <router-link :to="{path: '/mvList/hotMv'}" replace>排行榜</router-link>
      <router-link :to="{path: '/mvList/newMv'}" replace>最新MV</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import listTitle from '../../components/listTitle.vue'
  export default {
    components: {
      listTitle
    }
  }
</script>

<style lang="scss" scoped>
.mv-router {
    display: flex;
}
.mv-router a {
    color: #666;
    width: 50%;
    text-align: center;
    height: 45px;
    line-height: 45px;
    font-size: 14px;
}
.router-link-active {
    color: #df2d2d;
    text-decoration: none;
    border-bottom: 2px solid #df2d2d;
}
</style>
