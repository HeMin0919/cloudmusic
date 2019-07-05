<template>
    <div class="list-content-wrap">
        <mu-circular-progress :size="80" color="red" v-if="loding" class="loding"/>
        <div v-else>
            <div class="header-wrap">
                <list-title title="专辑"></list-title>
                <div class="list-desc">
                    <!-- 专辑头像 -->
                    <div class="list-pic">
                        <img v-lazy="album.picUrl">
                    </div>
                    <!-- 专辑信息 -->
                    <div class="list-msg">
                        <h3>{{album.name}}</h3>
                        <p>歌手：
                            <span v-for="item in album.artists" :key="item.id" @click="goArtist(item.id)">
                                {{item.name}}
                            </span> >
                        </p>
                        <p>发行时间：{{(new Date(album.publishTime)).getFullYear()}}.{{(new Date(album.publishTime)).getMonth()+1}}.{{(new Date(album.publishTime)).getDate()}}</p>
                    </div>
                </div>
                <!-- 收购、评论、分享、下载 -->
                <div class="listData">
                    <div>
                        <div><span class="icon-collection"></span></div>
                        {{info.likedCount}}
                    </div>
                    <div @click="goComment(data.id)">
                        <div><span class="icon-comment"></span></div>
                        {{info.commentCount}}
                    </div>
                    <div>
                        <div><span class="icon-share"></span></div>
                        {{info.shareCount}}
                    </div>
                    <div>
                        <div><span class="icon-download"></span></div>
                        下载
                    </div>
                    </div>
                </div>
                <!-- 页面传数据给组件 data传到组件的数据 -->
        <music-list :songs="data.songs"></music-list>
        </div>
    </div>
</template>

<script>
// 将data和creator传给listHeader
import listTitle from '../../components/listTitle'
import musicList from '../../components/musicList'
export default {
    data() {
        return {
            loding: true,
            data: '',
            album: '',
            info: '',
        };
    },
    components: { //注册组件
        listTitle,
        musicList,
        
    },
    // 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
    created() {
        
    },
    // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
    mounted() {
        this.id = this.$route.params.id;
        //获取歌单详情
        this.$http.get(`http://localhost:5000/album/?id=${this.id}`)
        .then((res) => {
            this.data = res.data
            this.album = res.data.album
            this.info = res.data.album.info
            this.loding = false
        })
    },
    methods:{
        goComment () {
            let obj = {
                name: this.album.name,
                artists: this.album.artists,
                musicpic: this.album.picUrl
            }
            this.$store.dispatch('saveCommentHeader', obj)
            this.$store.dispatch('saveCommentType', 2)
            this.$router.push({name: 'comment'})
        },
        goArtist (id) {
            this.$router.push({path: `/artist/${id}`})
        }
    }
};
</script>

<style scoped>
.loding {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.list-content-wrap {
    font-size: 16px;
    top: 0;
    position: relative;
    background-color: #df2d2d;
} 
.list-content-header {
    background-color: #df2d2d;
    color: #fff;
}
 /* 收购、评论、分享、下载 */
.listData {
    display: flex;
    height: 50px;
    align-items: center;
    color: #fff;
}
.listData div {
    flex: 1;
    text-align: center;
    cursor: pointer;
    font-size: 13px;
}
  /* 推荐歌单创建者头像和昵称 */
.list-desc {
    display: flex;
    color: #fff;
} 
.list-desc .list-pic {
    width: 35%;
    margin: 10px;
    position: relative;
}
.icon-playCount{
    font-size: 12px;
    padding-top: 5px;
}
.list-pic img {
    width: 100%;
    border-radius: 0px;
}
.list-pic div {
    position: absolute;
    top: 0;
    right: 5px;
}
.list-msg {
    flex: 1;
    margin-top: 10px;
    text-align: left;
    padding-left: 10px;
}
.list-msg h3 {
    font-size: 16px;
    font-weight:700; 
    margin-bottom: 5px;
}
.list-msg p{
    font-size: 14px;
    margin: 0;
}  
</style>
