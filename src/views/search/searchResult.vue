<template>
    <div>
        <div class="search-wrap">
            <span class="icon-Left-arrow" @click="back()"></span>
            <input id="inp" v-model="val" @keyup.enter="submit()" autofocus="autofocus" placeholder="音乐/视频/电台/用户">
        </div>
         <!-- replace在routre-link标签中添加后，页面切换时不会留下历史记录 -->
        <div class="resultType">
            <router-link :to="{path:'/searchResult/music',query:{val:val}}" replace>单曲</router-link>
            <router-link :to="{path:'/searchResult/albums',query:{val:val}}" replace>专辑</router-link>
            <router-link :to="{path:'/searchResult/artists',query:{val:val}}" replace>歌手</router-link>
            <router-link :to="{path:'/searchResult/songlist',query:{val:val}}" replace>歌单</router-link>
            <router-link :to="{path:'/searchResult/mvs',query:{val:val}}" replace>MV</router-link>
            <router-link :to="{path:'/searchResult/radio',query:{val:val}}" replace>电台</router-link>
            <router-link :to="{path:'/searchResult/users',query:{val:val}}" replace>用户</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            val:'',
        };
    },
    mounted() {
        //接收searchHome页面传过来的值
        this.val = this.$route.query.val;
        //带查询参数，变成 //searchResult/music?val=this.val
        this.$router.push({path:'/searchResult/music',query:{ val: this.val }})
    },
    methods: {
        back(){
            this.$router.go(-1);
        },
        submit () {
        console.log('submit')
        this.$router.replace({path: '/searchResult/music', query: { val: this.val }})
      }
    }
};
</script>

<style scoped>
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
    margin-bottom: 3px;
    color: white;  
} 
.resultType{
    display: flex;
    height: 35px;
}   
.resultType a{
    flex: 1;
    color: #666;
    line-height: 35px;
    text-align: center;
    font-size: 14px;
}
.router-link-active{
    color: #df2d2d;
    text-decoration: none;
    border-bottom: 2px solid #df2d2d;
}
.resultType div {
    flex: 1;
    text-align: center;
}
</style>
