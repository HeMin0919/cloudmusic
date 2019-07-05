<template>
    <div>
        <list-title title="个人中心"></list-title>
        <div v-if="logining">
            <router-view></router-view>
        </div>
        <div>
            <mt-field label="手机号" placeholder="请输入手机号" v-model="cellphone"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
            <mt-button type="primary" size="large" @click="login">登录</mt-button>
        </div>
    </div>
</template>

<script>
import listTitle from '../../components/listTitle'
import { Toast } from 'mint-ui'; //简短的消息提示框
export default {
    data() {
        return {
            logining:'false',
            cellphone:'', //手机号
            password:'',//密码
            id:'',
        };
    },
    components: {
        listTitle
    },
    methods: {
        login(){
        this.$http.get(`http://localhost:5000/login/cellphone?phone=${this.cellphone}&password=${this.password}`)
          .then(res=>{
              console.log(res.data);
              this.logining = true;
              this.id = res.data.account.id;
              if(res.data.code == 200){
                  this.$store.commit('SET_TOKEN', res.data.token)
                  this.$store.commit('GET_CELLPHONE', res.data.cellphone)
                  this.$router.push({path:`/userInfo/${this.id}`})
              }else{
                  // 消息提示
                  Toast({
                      message: '手机号或密码错误',
                      position: 'middle',
                      duration: 4000, //持续时间
                    });
                    console.log('error submit!!')
              }
          })
          .catch(err=>{
              console.log(err);
              // 消息提示
              Toast({
                  message: '手机号或密码错误',
                  position: 'middle',
                  duration: 4000, //持续时间
                });
              console.log('error submit!!')
          })
        },
        hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      }
    }
};
</script>

<style scoped>
 .error{
     color: red;
     font-size: 16px;
 }   
</style>
