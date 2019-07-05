<template>
  <div>
    <comment :hotcomment="hotcomment" :comment="comments"></comment>
    <mu-infinite-scroll 
      :loadingText="loadingText" 
      :loading="loading" 
      @load="fetchData"/>
  </div>
</template>

<script>
  import comment from '../../../components/comment.vue'
  export default {
    data () {
      return {
        total: '',
        comments: [],
        hotcomment: [],
        loading: false,
        loadingText: '努力加载中...'
      }
    },
    components: {
      comment
    },
    mounted () {
      this.fetchData();
    },
    methods: {
      fetchData () {
        const offset = this.comments.length;
        this.loading = true;
        var id = this.$route.params.id;
        // 传入音乐 id 和 limit 参数 , 可获得该 mv 的所有评论 ( 不需要 登录 )
        this.$http.get(`http://localhost:5000/comment/mv?id=${id}&limit=20&offset=${offset}`)
        .then((res) => {
          this.total = res.data.total; //获取评论数
          // 因为如果offset不是0的话，返回的数据就没有hotcomment了，所以要进行判断
          this.hotcomment = res.data.hotComments || this.hotcomment; //热门评论
          for (let comment of res.data.comments) {
            this.comments.push(comment);
          }
          this.loading = false;
        })
      }
    }
  }
</script>

<style>
  
</style>
