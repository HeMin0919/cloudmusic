<template>
  <div class="mv-details-wrap">
    <div class="mv-details-header">
      {{name}}
    </div>
    <div class="mv-details-msg">
      <div class="mv-details-arts">
        歌手：
        <span v-for="(artist, index) in artists" :key="index" @click="goArtist(artist.id)">
            {{artist.name}}
            <span v-if="index < (artists.length - 1)">/</span>
        </span>
      </div>
      <div class="mv-details-count">
        播放：{{playCount}}次
      </div>
    </div>
    <div class="mv-details-time">
      发行时间: {{publishTime}}
    </div>
    <div class="mv-details-desc">
      简介: {{desc}}
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        artistName: '',
        artists: [],
        playCount: '',
        subCount: '',
        publishTime: '',
        desc: ''
      }
    },
    activated () {
      var id = this.$route.params.id;
      // 获取 mv 数据
      this.$http.get(`http://localhost:5000/mv/detail?mvid=${id}`).then((res) => {
        this.MVURL = res.data.data.brs[1080]; //获取 mv 播放地址
        this.name = res.data.data.name; //MV名字
        this.artistName = res.data.data.artistName; //歌手姓名
        this.artists = res.data.data.artists; //歌手id和姓名
        this.playCount = res.data.data.playCount; //播放量
        this.publishTime = res.data.data.publishTime; //发行时间
        this.desc = res.data.data.desc; //MV简介
      })
    },
    methods: {
      goArtist (id) {
        console.log(id)
        this.$router.push({path: `/artist/${id}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
 .mv-details-wrap {
    padding: 0 5px;
    color: #333;
 }
.mv-details-header {
    margin-top: 5px;
    font-size: 14px;
    text-align: left;
    color: #df2d2d;
}
.mv-details-msg {
    margin-top: 5px;
    display: flex;
    font-size: 12px;
    color: #999;
    text-align: left;
}
.mv-details-arts {
    color: #0c73c2;
    border-right: 1px solid #999;
    width: 50%;
}
.mv-details-count {
    padding-left: 25px;
}
.mv-details-time {
    color: #999;
    font-size: 12px;
    margin-top: 5px;
    text-align: left;
}
.mv-details-desc {
    font-size: 12px;
    margin-top: 5px;
    color: #999;
    text-align: left;
}
</style>
