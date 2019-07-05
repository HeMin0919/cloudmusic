<template>
    <div class="library-wrap">
        <div class="library-navwrap">
            <header class="library-header">
                <router-link :to="{name: 'personalAdvice'}">个性推荐</router-link>
                <router-link :to="{name: 'songList'}">歌单</router-link>
                <router-link :to="{name: 'list'}">排行榜</router-link>
            </header>
        </div>
        <router-view></router-view>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            
        };
    },
    created(){
            
        }
    
};
</script>

<style scoped>
.library-wrap{
    font-size: 16px;
}
.library-wrap .library-navwrap {
    position: fixed;
    top: 60px;
    width: 100%;
    z-index: 999;
}
.library-wrap .library-navwrap .library-header{
    display: flex;
    height: 46px;
    line-height: 46px;
    background-color: #fcfdfd;
    color: #666;
    font-size: 14px;
}
.library-header a{
    flex: 1;
    color: #666;
    line-height: 46px;
    text-align: center;
}
/* 激活时由底边框 */
/* router-link-active 表示当前路由被激活的时候，添加的属性 */
.router-link-active {
    color:blue;
    text-decoration: none;
    border-bottom: 2px solid #df2d2d;
} 


</style>
