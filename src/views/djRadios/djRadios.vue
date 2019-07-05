<template>
    <div class="list-content-wrap">
        <list-title title="电台频道"></list-title>
        <mu-circular-progress :size="80" color="red" v-if="loding" class="loding"/>
        <div v-else>
            <div class="each-Radio">
                <div class="each-Radio-pic">
                    <img v-lazy="picUrl" alt="">
                </div>
                <div class="each-Radio-msg">
                    <h3>{{djname}}</h3>
                    <p>简介：{{desc}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import listTitle from '../../components/listTitle.vue'
export default {
    data() {
        return {
            loding: true,
            data: [],
            djname:'',
            picUrl:'',
            desc:''
        };
    },
    components: {
      listTitle
    },
    // 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
    created() {
        
    },
    // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
    mounted() {
        var id = this.$route.params.id
        console.log(id);
        //获取歌单详情
        this.$http.get(`http://localhost:5000/dj/detail?rid=${id}`)
        .then((res) => {
            this.data = res.data.djRadio; //电台信息
            this.djname = this.data.name;
            this.picUrl = this.data.picUrl;
            this.desc = this.data.desc;
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

.each-Radio-pic {
    width: 100%;
    height: 100%;
    padding: 5px;
}
.each-Radio-pic img {
    width: 100%;
    height: 100%;
}
.each-Radio-msg {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #F9FAFC;
    margin-left: 5px;
    
}
.each-Radio-msg h3 {
    padding-top: 5px;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 700;
}
.each-Radio-msg p {
    font-size: 12px;
    color: #999;
    margin-bottom: 5px;
}   
</style>
