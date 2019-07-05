<template>
    <div class="commentsum">
        <div class="submitcomment">
            <img src="../assets/imgs/touxiang.jpg" class="avatar">
            <textarea class="text" placeholder="评论" type="textarea" rows="3" v-model="valuecomment"></textarea>
            <mu-button class="commentbut"  round color="primary">评论</mu-button>
        </div>
        <div class="all-comment">
            <div class="type" v-if="hotcomment.length != 0">精彩评论</div>
            <div v-for="item in hotcomment" :key="item.user.userId" class="each-comment">
                <div class="each-comment-avatar" @click="goUser(item.user.userId)">
                    <img v-lazy="item.user.avatarUrl">
                </div>
                <div class="each-comment-msg">
                    <div class="each-comment-nickname">
                        {{item.user.nickname}}
                    </div>
                    <div class="each-comment-time">
                        <div class="time">
                            {{new Date(item.time).getMonth() + 1}}月{{new Date(item.time).getDate()}}日
                        </div>
                        <div class="comment-likeicon">
                            {{item.likedCount}}
                            <span class="icon-zan"></span>
                        </div>
                    </div>
                    <div class="each-comment-content">
                        {{item.content}}
                    </div>
                </div>
            </div>
        </div>
         <div class="all-comment">
            <div class="type" v-if="comment.length != 0">最新评论</div>
            <div v-for="(item,index) in comment" :key="index" class="each-comment">
                <div class="each-comment-avatar" @click="goUser(item.user.userId)">
                    <img v-lazy="item.user.avatarUrl">
                </div>
                <div class="each-comment-msg">
                    <div class="each-comment-nickname">
                        {{item.user.nickname}}
                    </div>
                    <div class="each-comment-time">
                        <div class="time">
                            {{new Date(item.time).getMonth() + 1}}月{{new Date(item.time).getDate()}}日
                        </div>
                        <div class="comment-likeicon">
                            {{item.likedCount}}
                            <span class="icon-zan"></span>
                        </div>
                    </div>
                    <div class="each-comment-content">
                        {{item.content}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            valuecomment:'',
        };
    },
    components: {
        
    },
    //接收自定义组件的传值
    props: {

        comment:{
            type:Array
        },
        // 热门评论
        hotcomment:{
            type:Array
        }
    },
    methods: {
        // 点击头像跳转到评论者详情页
        goUser(id){
            this.$router.push({path:`/userHome/${id}`});
        }
    }
};
</script>

<style scoped>
.commentsum{
    background: #F9FAFC;
}
.submitcomment{
    margin-top: 10px;
    height: 50px;
    position: relative;
}  
.submitcomment .avatar{
    display: block;
    width: 50px;
    height:50px;
    border-radius: 50%;
}
.submitcomment .text{
    display: block;
    position: absolute;
    left: 50px;
    top: 0;
    width: 85%;
}
.commentbut{
    display: block;
    position: absolute;
    right: 10px;
    top: 80px;
}
.all-comment{
    top: 70px;
    position: relative;
    background: #F9FAFC;
}
.all-comment .type {
    font-size: 16px;
    color: #666;
    height: 30px;
    line-height: 30px;
    background-color: #F9FAFC;
    padding: 0 5px;
    text-align: left;
    margin-bottom: 5px;
}
.each-comment{
    display: flex;
    padding: 0 10px;
    margin-bottom: 20px;
}
.each-comment-avatar {
    width: 40px;
    height: 40px;
    text-align: center;
}
.each-comment-avatar img{
    width: 40px;
    height:40px;
    border-radius: 50%;
}
.each-comment-msg {
    flex: 1;
    border-bottom: 1px solid #F9FAFC;
    padding-left: 10px;
}
.each-comment-nickname {
    font-size: 12px;
    text-align: left;
}
.each-comment-time{
    font-size: 12px;
    position: relative;
}
.each-comment-time .time{
    text-align: left;
}
.comment-likeicon{
    position: absolute;
    right: 10px;
    bottom: 5px;
}
.each-comment-content{
    font-size: 12px;
    text-align: left;
}

</style>
