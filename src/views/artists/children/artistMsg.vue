<template>
  <div>
    <section class="artist-msg-section">
      <h3>歌手简介</h3>
      <p>
        {{desc}}
      </p>
      <p>{{resNull}}</p>
    </section>
    <section v-for="item of intro" :key="item.id" class="artist-msg-section">
      <h3>{{item.ti}}</h3>
      <p>
        {{item.txt}}
      </p>
    </section>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        desc: '',
        intro: [],
        resNull: ''
      }
    },
    mounted () {
      // 获取歌手描述
      this.$http.get(`http://localhost:5000/artist/desc?id=${this.$route.params.id}`)
        .then((res) => {
          this.desc = res.data.briefDesc
          this.intro = res.data.introduction
          if (!res.data.briefDesc) {
            this.resNull = '该歌手还没有相关信息'
          }
        })
    }
  }
</script>

<style lang="css" scoped>
.artist-msg-section {
  padding: 5px;
  margin: 5px 0;
}
.artist-msg-section h3 {
  border-left: 3px solid red;
  padding-left: 5px;
  font-size: 16px;
  font-weight: 700;
}
.artist-msg-section p {
  color: #666;
  font-size: 14px;
}
</style>
