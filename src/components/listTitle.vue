<template>
  <div class="title-wrap">
    <span @click="back" class="title-backicon">
      <span class="icon-Left-arrow"></span>
    </span>
    <span class="title-msg">
      <span>{{title}}</span>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
    },
    methods: {
      back () {
        this.$router.go(-1);//点击返回上一页
      }
    }
  }
</script>

<style lang="scss">
  .title-wrap {
    display: flex;
    background-color: #df2d2d;
    color: #fff;
    .title-backicon {
      line-height: 45px;
      text-align: center;
      width: 45px;
      height: 45px;
      font-size: 12px;
    }
    .title-msg {
      flex: 1;
      font-size: 12px;
      line-height: 45px;
      text-align: left;
      overflow: hidden;
      text-overflow:ellipsis;/*让用户知道，这里的内容隐藏了部分,在后面添加上省略号*/
      white-space: nowrap;/* 每一行li的内容不允许换行 */

    }
  }
</style>
