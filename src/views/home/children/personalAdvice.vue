<template>
    <div >
         <div class="swipe-img">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="img in imgs" :key="img.targetId">
                <a :href="img.url"><img :src="img.pic"></a>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="personal-header">
        <!-- 私人FM -->
        <div class="personal-header-fm select">
            <div class="personal-icon">
                <span class="icon-radio icon"></span>
            </div>
            <span class="personal-text">私人FM</span>
        </div>
        <!-- 每日歌曲推荐 -->
        <div @click="recommendSongs" class="personal-header-songs select">
            <div class="personal-icon">
               <span class="personal-date">{{new Date().getDate()}}</span>
            </div>
            <span class="personal-text">每日歌曲推荐</span>
        </div>
        <!-- 云音乐热歌榜 -->
        <div @click="goHotList" class="personal-header-hot select">
            <div class="personal-icon">
                <span class="icon-Leaderboard icon"></span>
            </div>
            <span class="personal-text">云音乐热歌榜</span>
        </div>
    </div>
        <!-- 推荐歌曲 -->
        <div class="advice-songList-wrap session">
            <div class="advice-header">
                <span class="advice-title"><i class="icon icon-Dailypush"></i>推荐歌单</span>
                <span class="advice-more"  @click="moreSong">更多<i class="icon icon-Rightclick"></i></span>
            </div>
             <div class="advice-songList-box">
                <div v-for="list in songList" :key="list.id" @click="goListContent(list.id)"  class="advice-songList">
                    <img v-lazy="list.picUrl" alt="">
                    <span class="advice-songList-count">
                        <i class="icon-earphone"></i>
                        <span v-if="list.playCount > 100000">{{Math.floor(list.playCount/10000)}}万
                    </span>
                    <span v-else>{{list.playCount}}</span>
                    </span>
                    <div>{{list.name}}</div>
                </div>
            </div> 
        </div> 
        <!-- 最新专辑 -->
        <div class="advice-songList-new session">
            <div class="advice-header">
                <span class="advice-title"><i class="icon icon-album"></i>最新专辑</span>
                <span @click="moreAlbum">更多<i class="icon icon-Rightclick"></i></span>
            </div>
            <div class="each-new-music-wrap">
                <div v-for="pro in newAlbums" :key="pro.id" @click="toAlbumMsg(pro.id)" class="each-new-music">
                    <img v-lazy="pro.picUrl" alt="">
                    <div class="each-new-music-name">{{pro.name}}</div>
                    <div class="each-new-music-artists">
                         <span v-for="(artists, index) in pro.artists" :key="index">
                            {{artists.name}}
                            <span v-if="index < (pro.artists.length - 1)">/</span>
                        </span>
                    </div>
                </div>
            </div> 
        </div>
        <!-- 推荐MV -->
         <div class="advice-songList-wrap session">
            <div class="advice-header">
                <span class="advice-title"><i class="icon icon-video"></i>推荐MV</span>
                <span class="advice-more" @click="moreMV">更多<i class="icon icon-Rightclick"></i></span>
            </div>
             <div class="advice-songList-box">
                <div v-for="item in MVList" :key="item.id" @click="getMvUrl(item.id)" class="advice-songList">
                    <img v-lazy="item.picUrl" alt="">
                    <span class="advice-songList-count">
                        <i class="icon-earphone"></i>
                        <span v-if="item.playCount > 100000">{{Math.floor(item.playCount/10000)}}万
                    </span>
                    <span v-else>{{item.playCount}}</span>
                    </span>
                    <div class="each-new-music-name">{{item.name}}</div>
                    <span class="each-mv-artists" v-for="(artists, index) in item.artists" :key="index">{{artists.name}}<span v-if="index < (item.artists.length - 1)">/</span></span>
                </div>
            </div> 
        </div> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgs:[],//轮播图列表
            songList:[],//推荐歌单列表
            newAlbums:[], //最新专辑列表
            MVList:[], //推荐MV列表
        };
    },
    created() {
        //轮播图列表
        this.$http.get('http://localhost:5000/banner?type=2')
        .then(res=>{
            console.log(res.data.banners);
            this.imgs = res.data.banners;
        })
        .catch(err=>{
            console.log(err);
        })
        //获取推荐歌单列表
        this.$http.get('http://localhost:5000/personalized')
        .then(res=>{
            console.log(res.data.result);
            this.songList = res.data.result;
        })
        .then(err=>{
            console.log(err);
        });
        // 获取最新专辑列表，限制6条
        this.$http.get('http://localhost:5000/top/album?offset=0&limit=6')
        .then(res=>{
            console.log(res.data.albums);
            this.newAlbums = res.data.albums;
        })
        .then(err=>{
            console.log(err);
        });
        // 获取推荐MV列表
        this.$http.get('http://localhost:5000/personalized/mv')
        .then(res=>{
            console.log(res.data.result);
            this.MVList = res.data.result;
        })
        .then(err=>{
            console.log(err);
        });
        
    },
    methods: {
        // 跳转到每日歌曲推荐
        recommendSongs () {
            this.$router.push({path: `/recommendSongs`})
        },
        // 跳转到云音乐热歌榜详情
        goHotList () {
            this.$router.push({path: '/listContent/1'})
        },
        // 跳转到歌单详情
        goListContent(ind){
            console.log(`/playList/${ind}`);
            this.$router.push({path: `/playList/${ind}`});
        },
        // 更多推荐歌单
        moreSong () {
            this.$router.push({path: '/musicLibrary/songList'})
        },
        // 跳转到专辑
        toAlbumMsg (id) {
            this.$router.push({path: `/album/${id}`});
        },
        // 更多推荐专辑
        moreAlbum () {
            this.$router.push({path: '/albumList'})
        },
        // 跳转到MV
        getMvUrl (id) {
            this.$store.dispatch('getmvId', id)
            this.$router.push({path: `/mv/${id}`})
        },
        // 更多MV
        moreMV () {
            this.$router.push({path: '/mvList'})
        }
    }
    
};
</script>

<style scoped>
/*轮播图样式*/
.library-wrap .swipe-img{
    height:200px; 
    top: 105px;
    position: relative;
}
.mint-swipe img {
    height: 100%;
    width: 100%;
    /* transform: scale(0.95);  */
}
/* 私人FM */
.personal-header {
    /* position: relative; */
    margin-top: 110px;
    display: flex;
    height: 100%;
 }
.personal-header .select {
    flex: 1;
    /* flex-grow: 1; 
    flex-direction:column;
    justify-content:center;
    text-align: center; */
    color: #333;
    border-bottom: 1px solid #d9dbdc;
}
.personal-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 5px;
    border: 2px solid #ce3d3e;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.personal-header .personal-icon .icon {
    font-size: 30px;
    color: #ce3d3e;
}
.personal-header .personal-date{
    font-size: 20px;
    color: #ce3d3e;
    text-align: center;
}
.personal-header .personal-text{
    display: block;
    font-size: 14px;
    text-align: center;
}
 /* 推荐歌单 */
.advice-songList-wrap {
    padding: 0 5px;
    /* position: absolute; */
    /* top: 100px; */
    margin-top: 5px;
    
}
.session {
    padding: 0 10px;
  }
.advice-header{
    display: flex;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    border-bottom:none;
    margin-bottom: 5px;
    justify-content: space-between;
}
.icon{
    font-size:14px;
    height: 20px;
    line-height: 20px;
}
 /* 推荐歌单列表 */
.advice-songList-box {
    display: flex;
    justify-content: space-between;  /* 两端对齐，项目之间的间隔都相等。*/
    flex-wrap: wrap;  /* 换行，第一行在上方。*/
} 
.advice-songList {
    width: 48.5%;
    position: relative;
    margin-bottom: 10px;
    font-size: 10px;
}
.advice-songList img {
    width: 100%;
    overflow: hidden;
    border: 1px solid #E5E9F2;
}
.advice-songList-count {
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
} 

/* .advice-songList-new{
    position: relative;
}
.advice-songList-new .advice-header{
    position: absolute;
    left: 0;
    top: 50px;
    display: flex;
} */
 /* 最新专辑 */
.each-new-music-wrap {
    display: flex;
    justify-content: space-between;  /* 两端对齐，项目之间的间隔都相等。*/
    flex-wrap: wrap;  /* 换行，第一行在上方。*/
} 
.each-new-music-wrap .each-new-music{
    width: 32%;
    margin-bottom: 5px;
}
.each-new-music-wrap img{
    width: 100%;
    border: 1px solid #E5E9F2;
}
.each-new-music-name,.each-new-music-artists{
    font-size: 12px;
    overflow: hidden;
    text-overflow:ellipsis;/*让用户知道，这里的内容隐藏了部分,在后面添加上省略号*/
    white-space: nowrap;/* 每一行li的内容不允许换行 */
}
.each-new-music-artists,.each-mv-artists{
    color: #999999;
}
</style>
