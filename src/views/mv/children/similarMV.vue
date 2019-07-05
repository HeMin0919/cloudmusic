<template>
  <div>
    <mv-list :allMV="allMV"></mv-list>
  </div>
</template>

<script>
  import mvList from '../../../components/mvList'
  export default {
    data () {
      return {
        allMV: []
      }
    },
    components: {
      mvList
    },
    activated () {
        var id = this.$route.params.id;
        // 获取相似 mv
        this.$http.get(`http://localhost:5000/simi/mv?mvid=${id}`)
        .then((res) => {
            this.allMV = res.data.mvs;
        })
    }
  }
</script>

<style lang="scss" scoped>
</style>
