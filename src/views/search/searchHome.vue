<template>
  <div>
    <div class="search-wrap">
      <span class="icon-Left-arrow" @click="notSubmit()"></span>
      <input id="inp" 
        v-model="query"
        @keyup.enter="submit()" 
        autofocus="autofocus" 
        placeholder="音乐/视频/电台/用户">
    </div>
    <div class="hot-search">
      <h3>热门搜索</h3>
      <button v-for="(item,index) in hotSearch" :key="index" @click="submit(item.first)">{{item.first}}</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        query: '',
        hotSearch: []
      }
    },
    mounted(){
        this.getHotList()
    },
    methods: {
      submit: function (str) {
        if (str) {
          this.query = str
        }
        //将搜索的值传到searchResult页面
        this.$router.push({path: '/searchResult', query: { val: this.query }})
        this.query = ''
      },
      notSubmit: function () {
        this.$router.go(-1)
      },
      getHotList(){
          this.$http.get('http://localhost:5000/search/hot')
          .then(res=>{
              this.hotSearch = res.data.result.hots;
              console.log(this.hotSearch)
          })
      }
    }
  }
</script>

<style lang="css" scoped>
.search-wrap {
    display: flex;
    height: 45px;
    background-color: #df2d2d;
  }
.icon-Left-arrow {
    color: #fff;
    line-height: 45px;
    padding-right: 12px;
    margin-bottom: 5px;
}
input {
    flex: 1;
    text-decoration: none;
    border-style: none;
    border-bottom: 1px solid white;
    background-color: #df2d2d;
    margin-bottom: 5px;
    color: white;  
}
.search-wrap span {
    margin-left: 10px;
    font-size: 15px;
    align-self: center;
    cursor: pointer;
}
.hot-search {
    padding: 10px;
}
.hot-search h3 {
    font-size: 16px;
}
.hot-search button {
    background-color: white;
    border: 1px solid #666;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 20px;
    margin-bottom: 5px;
    margin-top: 5px;
}
</style>
