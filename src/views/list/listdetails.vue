<template>
    <div>
        <mu-circular-progress :size="90" color="red" v-if="loding" class="loding"/>
        <div class="list-content-wrap" v-else>
            <list-header :data="data" :creator="creator"></list-header>
            <music-list :songs="data.tracks"></music-list>
        </div>
    </div>
</template>

<script>
import listHeader from '../../components/listHeader'
import musicList from '../../components/musicList'
export default {
    data() {
        return {
            data: '',
            creator: '',
            loding: true
        };
    },
    components: {
        listHeader,
        musicList
    },
    props: {
        
    },
    mounted () {
      let id = this.$route.params.id;
      //获取歌单详情
      this.$http.get(`http://localhost:5000/top/list?idx=${id}`)
      .then((res) => {
          this.data = res.data.playlist;//歌单中的全部信息
          this.tracks = res.data.playlist.tracks; //歌单中的歌曲信息
          this.creator = res.data.playlist.creator;//歌单创建者信息
          this.loding = false;
        })
    },
};
</script>

<style scoped>
.loding {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }    
</style>
