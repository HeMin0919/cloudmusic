<template>
<div>
  <div class="List">
    <div class="guanfang">
      <h2 class="list-type">官方榜</h2>
    </div>
    <div class="List-category">
      <b-card class="card-list"> 
        <b-media  v-for="(item,index) in Leaderboard" :key="item.id" @click="getListdetails(index)">
          <img :src="item.coverImgUrl" slot="aside" blank blank-color="#ccc" alt="placeholder">
          <span class="updateFrequency">{{item.updateFrequency}}</span>
          <div class="music-list">
            <ul  v-for="(sel,ind) in Leaderboard[index].tracks" :key="sel.id">
              <li><span>{{ind+1}}.</span>{{sel.first}}-{{sel.second}}<span></span></li>
            </ul>
          </div>
        </b-media>
      </b-card > 
    </div>
  </div>
  <div class="Global-list">
    <div class="Global">
      <h2 class="type">全球榜</h2>
    </div>
    <!-- 全球榜 -->
    <div class="advice-songList-new">
      <div class="each-new-music-wrap">
        <div v-for="(pro,index) in tracksList" :key="pro.id" @click="getGlobaldetails(index)" class="each-new-music">
          <img v-lazy="pro.coverImgUrl" alt="">
          <div class="each-new-music-artists">
            <span class="updateFrequency">{{pro.updateFrequency}}</span>
          </div>
          <div class="each-new-music-name"><span>{{pro.name}}</span></div>
        </div>
      </div> 
    </div>
  </div>

</div>
    
</template>

<script type="text/babel">
 
  export default {
    data() {
      return {
        Leaderboard:[],//排行榜
        tracksList:[], //全球榜
        trueInd:0,
      };
    },

    created() {
      //获取不同排行榜
        this.$http.get('http://localhost:5000/toplist/detail')
        .then(res=>{
            console.log(res.data.list);
            this.Leaderboard = res.data.list.slice(0,4); //获取前4条数据;
            this.tracksList = res.data.list.slice(5,14);
        })
        .catch(err=>{
            console.log(err);
        })
     
    },
    methods: {
      getListdetails(ind){
        if (ind == 0){
          this.trueInd=3;
        }else if(ind ==1){
          this.trueInd=0;
        }else if(ind ==2){
          this.trueInd =2;
        }else if(ind ==3){
          this.trueInd =1;
        }
        console.log( this.trueInd)
        this.$router.push({path: `/listdetails/${this.trueInd}`})
      },
      getGlobaldetails(ind){
        let id = ind + 4;
        this.$router.push({path: `/listdetails/${id}`})
      }
    }
  };
</script>

<style scoped>
 .List{
    margin-top: 105px;
    display: flex;
 } 
.list-type {
    margin: 5px;
    padding-left: 3px;
    font-size: 10px;
    color: #494949;
    border-left: 4px solid #ea4558;
}
.List-category{
    background-color: #f5f4f4;
    top: 130px;
    position: absolute;
}
.card-list{
  border: none;
  position: relative; /*子绝父相*/
}
.card-list img{
  width:90px;
  height:90px;
  border-radius: 5px;
}
.media{
  /* border-bottom: 1px solid #e4e4e4;  */
  padding-bottom: 3px;
}
.card-body{
  padding: 5px;
}
.music-list{
  margin-bottom: 5px;
  
}
.music-list ul {
  list-style-type: none;
  margin-left:10px;
  padding: 2px;
  margin-bottom: 6px;
  margin-top: 5px;
}
.music-list ul li{
  font-size: 10px;
  text-align: left;
}
.card-list .updateFrequency{
  font-size: 10px;
  position: absolute;
  left: 8px;
  margin-top: 73px;
  color: #fff;

}
/* 全球榜 */
.Global-list{
  position: absolute;
  top: 510px;
}
.advice-songList-new{
  margin-top: 25px;
}
.Global .type {
  position: absolute;
  margin: 5px;
  padding-left: 3px;
  font-size: 10px;
  color: #494949;
  border-left: 4px solid #ea4558;
}
.each-new-music-wrap {
  display: flex;
  justify-content: space-between;  /* 两端对齐，项目之间的间隔都相等。 */
  flex-wrap: wrap;  /* 换行，第一行在上方。 */
} 
.each-new-music-wrap .each-new-music{
  width: 33%;
  margin-bottom: 5px;
}
.each-new-music-wrap img{
  width: 100%;
  border: 1px solid #E5E9F2;
  border-radius: 5px;
}
.each-new-music-name span{
  font-size: 10px;
  text-align: left;
}
.each-new-music-artists{
  font-size: 10px;
  color: #fff;
  position: absolute;
  margin-top: -18px;
  margin-left: 5px;
}
</style>
