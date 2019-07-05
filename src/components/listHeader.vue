<template>
  <header class="list-content-header">
    <list-title :title="data.name"></list-title>
    <div class="list-desc">
        <!-- 推荐歌单头像、播放量-->
      <div class="list-pic">
        <img :src="pic">
        <div class="icon-playCount">
          <span class="icon-earphone"></span>
          <span v-if="data.playCount > 100000">
            {{Math.floor(data.playCount/10000)}}万
          </span>
          <span v-else>
            {{data.playCount}}
          </span>
        </div>
      </div>
      <!-- 推荐歌单创建者头像和昵称-->
      <div class="list-msg">
        <h3>{{data.name}}</h3>
        <div>
          <img :src="creator.avatarUrl">
          <span @click="goUser(creator.userId)">{{creator.nickname}} ></span>
        </div>
      </div>
    </div>
    <!-- 收购、评论、分享、下载 -->
    <div class="listData">
      <div>
        <div>
          <span class="icon-collection"></span>
        </div>
        {{data.subscribedCount}}
      </div>
      <div @click="goComment(data.id)">
        <div>
          <span class="icon-comment"></span>
        </div>
        {{data.commentCount}}
      </div>
      <div>
        <div>
          <span class="icon-share"></span>
        </div>
        {{data.shareCount}}
      </div>
      <div>
        <div>
          <span class="icon-download"></span>
        </div>
        下载
      </div>
    </div>
  </header>
</template>

<script>
import listTitle from './listTitle'

  export default {
    // 父组件向子组件传递数据
    props: {
      data: {
        type: Object,
        required: true
      },
      creator: {
        type: Object
      }
    },
    computed: {
      pic () {
        return this.data.coverImgUrl || this.data.picUrl
      }
    },
    components: {
      listTitle, //在template中使用了list-title

    },
    methods: {
       goComment () {
        let obj = {
          name: this.data.name,
          artists: [{name: this.creator.nickname}],
          musicpic: this.data.coverImgUrl
        }
        this.$store.dispatch('saveCommentHeader', obj)
        this.$store.dispatch('saveCommentType', 1)
        this.$router.push({name: 'comment'})
      },
      goUser (id) {
        console.log(id)
        this.$router.push({path: `/userHome/${id}`})
      }
    }
  }
</script>

<style scoped>
  .list-content-wrap {
    font-size: 16px;
    
  }
.list-content-header {
    background-color: #df2d2d;
    color: #fff;
}
 /* 收购、评论、分享、下载 */
.listData {
    display: flex;
    height: 70px;
    align-items: center;
}
.listData div {
    flex: 1;
    text-align: center;
    cursor: pointer;
    font-size: 13px;
}
/* .icon {
    width: 5px;
    height: 5px;
}
.icon-up {
    height: 3px;
    width: 3px;
} */
/* .list-content-index {
    text-align: center;
}
.list-content-up {
    font-size: 16px;
    text-align: center;
}
  .list-content-music {
    display: flex;
  }
  .list-content-left {
    width: 10px;
    padding: 5px;
    color: #475669
  }
  .list-content-right {
    flex: 1;
    margin-right: 0.2rem;
    border-bottom: 1px solid #475669;
    padding: 0.1rem 0;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .list-content-right-artists {
    width: 100%;
    font-size: 16px;
    color: #475669;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  */
  /* 推荐歌单创建者头像和昵称 */
.list-desc {
    display: flex;
} 
.list-desc .list-pic {
    width: 40%;
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
}
.list-msg h3 {
    font-size: 15px;
    font-weight:800; 
    margin-bottom: 5px;
}
.list-msg img {
    width: 30px;
    border-radius: 50%;
}
.list-msg span{
    font-size: 12px;
}
</style>
