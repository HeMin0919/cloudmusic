<template>
  <div>
    <div v-for="item in data" :key="item.userId" @click="toUser(item.userId)" class="each-user">
      <div class="each-user-left">
        <img v-lazy="item.avatarUrl">
      </div>
      <div class="each-user-right">
        <h3 class="each-user-name">
          {{item.nickname}}
          <span>{{item.gender}}</span>
        </h3>
        <p class="each-user-msg">{{item.signature}}</p>
      </div>
    </div>
    <mu-infinite-scroll 
      :loadingText="loadingText" 
      :loading="loading" 
      @load="fetchData"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        data: [],
        loading: false,
        loadingText: '努力加载中...'
      }
    },
    mounted () {
      this.fetchData()
    },
    // 计算当前搜索的值
    computed: {
      query () {
        return this.$route.query.val
      }
    },
    // query变化重新搜索
    watch: {
      query () {
        this.data = []
        this.fetchData()
      }
    },
    methods: {
      toUser (id) {
        this.$router.push({path: `/userHome/${id}`})
      },
      fetchData () {
        const offset = this.data.length
        this.loading = true
        var val = this.$route.query.val;
        this.$http.get(`http://localhost:5000/search?keywords=${val}&type=1002&limit=15&offset=${offset}`)
          .then((res) => {
            for (let user of res.data.result.userprofiles) {
              this.data.push(user)
            }
            this.loading = false
          })
      }
    }
  }
</script>

<style lang="css" scoped>
.each-user {
    display: flex;
}
.each-user-left {
    width: 55px;
    padding: 5px;
}
.each-user-left img {
    width: 100%;
    border-radius: 50%;
}
.each-user-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #F9FAFC;
    padding-left: 5px;
    padding-top: 5px;
}
.each-user-name {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 5px;
}
.each-user-msg {
    font-size: 12px;
    color: #666;
    margin-bottom: 5px;
}
</style>
