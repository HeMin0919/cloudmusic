<template>
<div>
    <div class="title-wrap">
    <span @click="back" class="title-backicon">
      <span class="icon-Left-arrow"></span>
    </span>
    <span class="title-msg">
      <span>个人中心</span>
    </span>
  </div>
     <div class="each-Info">
        <div class="each-Info-pic">
            <img v-lazy="profile.avatarUrl" alt="">
        </div>
        <div class="each-Info-msg">
            <div class="Info-name">
                <h3>{{profile.nickname}}</h3>
            </div>
            <div class="InfoLove">
                <div class="Infonum">
                    <span>{{profile.eventCount}}</span>
                    <span>{{profile.follows}}</span>
                    <span>{{profile.followeds}}</span>
                </div>
                <div class="Infotext">
                    <span>动态</span>
                    <span>关注</span>
                    <span>粉丝</span>
                </div>
                <div class="Infosigna">
                    <p>个人介绍：{{profile.signature}}</p>
                </div>
            </div>
            
        </div>
    </div>
    
</div>
</template>

<script>
import listTitle from '../../components/listTitle'
export default {
    data() {
        return {
            userInfo:[],
            profile:[]
        };
    },
    components: {
        listTitle
    },
    mounted () {
      this.getInfo();  
    },
    methods: {
        getInfo(){
            var id = this.$route.params.id;
            console.log(id)
            this.$http.get(`http://localhost:5000/user/detail?uid=${id}`)
            .then(res=>{
                console.log(res.data);
                this.userInfo = res.data;
                this.profile = res.data.profile;
            })
        },
        back(){
            this.$router.push({name:'personalAdvice'})
        }
    }
};
</script>

<style scoped>
 .title-wrap {
    display: flex;
    background-color: #df2d2d;
    color: #fff;
 }
    .title-backicon {
      line-height: 45px;
      text-align: center;
      width: 45px;
      height: 45px;
      font-size: 12px;
    }
    .title-msg {
      flex: 1;
      font-size: 12px;
      line-height: 45px;
      text-align: left;
      overflow: hidden;
      text-overflow:ellipsis;/*让用户知道，这里的内容隐藏了部分,在后面添加上省略号*/
      white-space: nowrap;/* 每一行li的内容不允许换行 */

    }
.each-Info{
    margin: 5px;
}
.each-Info-pic{
    display: flex;
}
.each-Info-pic img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
}
.each-Info-msg{
    flex: 1;
}
.Info-name{
    margin-left: 15px;
}
.Info-name h3{
    font-size: 20px;
    font-weight: 700;
}
.Infonum,.Infotext{
    display: flex;
    width: 180px;
    color: #666;
}
.Infonum span{
    flex: 1;
    text-align: center;
    cursor: pointer;
    font-size: 24px;
}
.Infotext span{
    flex: 1;
    text-align: center;
    cursor: pointer;
    font-size: 12px;
}
.Infosigna{
    color: #666;
    margin-left: 15px;
    font-size: 14px;
}
</style>
