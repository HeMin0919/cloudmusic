<template>
  <div>
    <div v-for="item of allMV" :key="item.id" class="each-mv" @click="getMvUrl(item.id)">
      <div class="each-mv-left">
        <img v-if="item.cover" v-lazy="item.cover">
        <img v-if="item.imgurl" v-lazy="item.imgurl">
        <span class="each-mv-count">
          <span class="icon-video"></span>
          <span v-if="item.playCount > 100000">
            {{Math.floor(item.playCount/10000)}}万
          </span>
          <span v-else>
            {{item.playCount}}
          </span>
        </span>
      </div>
      <div class="each-mv-right">
        <div>{{item.name}}</div>
        <artists v-if="item.artists" :artists="item.artists"></artists>
        <div v-if="item.publishTime">{{item.publishTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      allMV: {
        type: Array
      }
    },
    methods: {
      getMvUrl (id) {
        this.$store.dispatch('getmvId', id)
        this.$router.replace({path: `/mv/${id}`})
      }
    }
  }
</script>

<style lang="css" scoped>
.each-mv {
    display: flex;
    padding-left: 5px;
    margin: 5px 0;
}
.each-mv-left {
    width: 130px;
    position: relative;
    color: #fff;
}
.each-mv-left img{
    width: 100%;
    height: 100%;
}
.each-mv-count {
    position: absolute;
    top: 1px;
    right: 1px;
    font-size: 12px;
}
.each-mv-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-left: 10px;
    border-bottom: 1px solid #EFF2F7;
}
.each-mv-right div:nth-child(1) {
    font-size: 16px;
    color: #000;
    padding-top: 5px;
}
.each-mv-right div:nth-child(2) {
    font-size: 12px;
    color: #999;
    padding-top: 5px;
}
</style>
