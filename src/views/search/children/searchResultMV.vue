<template>
  <div class="result-mvs">
    <div v-for="item in mvs" :key="item.id" @click="toMv(item.id)" class="each-mv">
      <div class="each-mv-pic">
        <img v-lazy="item.cover">
        <p class="each-mv-duration">{{Math.floor(item.duration*0.001/60).toString().padStart(2, '0')}}:{{(item.duration*0.001%60).toString().padStart(2, '0')}}</p>
      </div>
      <div class="each-mv-msg">
        <span>{{item.name}}</span>
        <artists :artists="item.artists" class="artists"></artists>
      </div>
    </div>
  </div>
</template>

<script>
  import artists from '../../../components/artists'
  export default {
    data () {
      return {
        mvs: [],
      }
    },
    components: {
      artists
    },
    mounted () {
      this.fetchData()
    },
    // 计算当前搜索的值
    computed: {
      query () {
        return this.$route.query.val
      }
    },
    // query变化重新搜索
    watch: {
      query () {
        this.mvs = []
        this.fetchData()
      }
    },
    methods: {
      toMv (id) {
        this.$store.dispatch('getmvId', id)
        this.$router.push({path: `/mv/${id}`})
      },
      fetchData () {
        const offset = this.mvs.length
        var val = this.$route.query.val;
        this.$http.get(`http://localhost:5000/search?keywords=${val}&type=1004&limit=15&offset=${offset}`)
          .then((res) => {
            for (let mv of res.data.result.mvs) {
              this.mvs.push(mv)
            }
          })
      }
    }
  }
</script>

<style lang="css" scoped>
.result-mvs {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.each-mv {
    width: 49%;
    margin-bottom: 5px;
}
.each-mv-pic {
    position: relative;
}
.each-mv-pic img {
    width: 100%;
}
.each-mv-duration {
    position: absolute;
    bottom: 1px;
    left: 3px;
    color: #fff;
    font-size: 12px;
}
.each-mv-msg{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}      
.each-mv-msg  span {
    font-size: 14px;
}
.artists {
    font-size: 12px;
}
</style>
