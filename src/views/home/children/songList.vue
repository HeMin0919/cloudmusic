<template>
    <div class="songList">
        <h2 class="list-type">全部歌单</h2>
        <div class="allCategory">
           <ul v-for="(item,index) in songCategory" :key="item.id">
                <li :class="index===currentIndex?'active':''" @click="typeName(index,item.name)">
                    <!-- <router-link :to="{name:'category', query: {name:item.name,ind:index}}">{{item.name}}</router-link> -->
                {{item.name}}
                </li>
           </ul>
        </div> 
        
        <div class="all-songlist-wrap" >
            <div v-for="(item,index) in tabMain" :key="index" :v-show="currentIndex==index" @click="goListContent(item.id)" class="each-songlist-wrap"  >
                <div class="img-wrap">
                    <img v-lazy="item.coverImgUrl" :key="item.coverImgUrl"  alt="">
                    <span class="user-icon"><span class="icon-my"></span>{{item.creator.nickname}}</span>
                    <span class="earphone-icon">
                        <span class="icon-earphone"></span>
                        <span v-if="item.playCount > 100000">
                            {{Math.floor(item.playCount/10000)}}万
                        </span>
                        <span v-else>{{item.playCount}}</span>
                    </span>
                </div>
                <div class="">{{item.name}}</div>
            </div>
        </div>  
    </div>
    
</template>

<script>
export default {
    data() {
        return {
             songCategory:[], //歌单分类
             currentIndex:0,
             tagname:'',
             tabMain: [],
        };
    },
    created() {
        // console.log(this.tagname);
        //热门歌单分类
        this.$http.get('http://localhost:5000/playlist/catlist')
        .then(res=>{
            console.log(res.data.sub);
            this.songCategory = res.data.sub.slice(0,64); //获取前64条数据
        })
        .catch(err=>{
            console.log(err);
        })
        //歌单 ( 网友精选碟 )order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
        this.$http.get('http://localhost:5000/top/playlist')
        .then(res=>{
            console.log(res.data.playlists);
            this.tabMain = res.data.playlists;
        })
        .catch(err=>{
            console.log(err);
        })
        
    },
    methods: {
        typeName(index,name) {
            this.currentIndex = index;
            this.tagname = name;
            console.log(this.currentIndex);
            console.log(this.tagname);
            this.$http.get(`http://localhost:5000/top/playlist?cat=${this.tagname}`)
            .then(res=>{
                console.log(res.data.playlists);
                this.tabMain = res.data.playlists;
            })
            .catch(err=>{
                console.log(err);
            })
        },
        goListContent (ind) {
        console.log(`/playList/${ind}`)
        this.$router.push({path: `/playList/${ind}`})
      }
    }
};
</script>

<style scoped>
.songList{
    margin-top: 105px;
    display: flex;
   
}
.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    background: transparent;
    border:none;
}
.allCategory{
    background-color: #f5f4f4;
    top: 135px;
    position: absolute;
}
.allCategory ul{
    padding-left: 2px;
    /* display: inline-block; */
}
.allCategory ul li{
    list-style-type: none;
    font-size: 14px;
    padding: 15px 6px;
}
.list-type {
    position: absolute;
    margin: 5px;
    padding-left: 3px;
    font-size: 12px;
    color: #494949;
    border-left: 4px solid #ea4558;
}
.active{
    color: #df2d2d;
}
.all-songlist-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 30px 15px 5px 100px;
}

.all-songlist-wrap .each-songlist-wrap {
    width: 49%;
    margin-bottom: 5px;
    font-size: 10px;
    text-overflow:ellipsis;/*让用户知道，这里的内容隐藏了部分,在后面添加上省略号*/
}
.img-wrap {
    position: relative;
}
.img-wrap img {
    width: 100%;
    overflow: hidden;
    border: 1px solid #E5E9F2;
}
.user-icon {
    position: absolute;
    left: 5px;
    bottom: 5px;
    color: #fff;
}
.earphone-icon {
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 12px;
    color: #fff;
}
.fade-enter-active,.fade-leave-active{
    transition: all 3s;
    opacity: 0.3;
}
.fade-enter,.fade-leave-to{
    opacity: 1;
}
</style>
