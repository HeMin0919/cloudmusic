<template>
    <div class="list-content-wrap">
        <mu-circular-progress :size="80" color="red" v-if="loding" class="loding"/>
        <div v-else>
            <!-- 页面传数据给组件 data传到组件的数据 -->
            <list-header :data="data" :creator="creator"></list-header>
            <music-list :songs="tracks"></music-list>
        </div>
    </div>
</template>

<script>
// 将data和creator传给listHeader
import listHeader from '../../components/listHeader'
import musicList from '../../components/musicList'
export default {
    data() {
        return {
            loding: true,
            id: '',
            tracks: [],
            data: '',
            creator: '',
        };
    },
    components: { //注册组件
        listHeader,//在template中使用了list-header
        musicList,
    },
    // 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
    created() {
        
    },
    // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
    mounted() {
        this.id = this.$route.params.id
        //获取歌单详情
        this.$http.get(`http://localhost:5000/playlist/detail?id=${this.id}`)
        .then((res) => {
            this.data = res.data.playlist;//歌单中的全部信息
            this.tracks = res.data.playlist.tracks; //歌单中的歌曲信息
            this.creator = res.data.playlist.creator;//歌单创建者信息
            this.loding = false;
        })
        
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
}    
</style>
