# cloudmusic

> A Vue.js project

#### vue-lazyload插件（懒加载）

使用

```javascript
npm install vue-lazyload --save

//注册插件
import vueLazyload from 'vue-lazyload'
Vue.use(vueLazyload);

//在需要懒加载的图片上
<img v-lazy="imgUrl">
```

![1561427730973](C:\Users\GXP300\AppData\Roaming\Typora\typora-user-images\1561427730973.png)

运行端口号为8083

![1561427797238](C:\Users\GXP300\AppData\Roaming\Typora\typora-user-images\1561427797238.png)

api端口为5000

![1561427848425](C:\Users\GXP300\AppData\Roaming\Typora\typora-user-images\1561427848425.png)

跨域设置

###### vue this.$store.dispatch("updateCartCount", 1)

dispatch：含有异步操作，例如向后台提交数据，写法： this.$store.dispatch('mutations方法名',值)

commit：同步操作，写法：this.$store.commit('mutations方法名',值)

#### 组件之间的数据传递

**一、父组件向子组件传递数据**

在 Vue 中，可以使用 props 向子组件传递数据。

##### 需要注意的是

1. prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意间修改了父组件的状态，来避免应用的数据流变得难以理解。
2. 每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop。如果你这么做了，Vue 会在控制台给出警告。



**二、子组件向父组件传递数据**

可通过`emit` 将数据传递给父组件，父组件监听事件的触发`($on)`，子组件手动触发事件($emit)。



```vue
//father.vue
<template>
  // 父组件监听listenChild事件，执行getChildData方法，并且拿到传递过来的数据(@是v-on的简写)
  <child-component @listenToChild='getChildData'></child-component>
</template>

<script>
import child from 'child.vue';
export default {
  name: "father",
  methods: {
    getChildData (val) {
      console.log(`子组件传递过来的数据: ${val}`); // hello
    }
  },
  components: {
    'child-component': child
  }
}
</script>
```



```vue
//child.vue
<template>
  <div class='child'></div>
</template>

<script>
export default {
  name: "child",
  created () {
    // 在需要的传递数据的时候调用sendData方法，这里模拟调用
    this.sendData();
  },
  methods: {
    sendData () {
      this.$emit('listenToChild', 'hello');
    }
  }
}
</script>
```



**三、兄弟组件传递数据**

 可以用过一个vue实例Bus作为媒介，要相互通信的兄弟组件之中，都引入Bus，之后通过分别调用Bus事件触发`$emit` 和监听`$on` 来实现组件之间的通信和参数传递。类似与子传父，只不过是利用一个新的vue示例作为媒介，而不是当前vue示例(this)

bus.js

```vue
import Vue from 'vue';
export default new Vue;
```

a.vue

```vue
<template>
  <div class='a'></div>
</template>

<script>
import Bus from 'bus.js' ;
export default {
  name: "a",
  created() {
    // 在需要的传递数据的时候调用sendData方法，这里模拟调用
    this.sendData();
  },
  methods: {
    sendData () {
      Bus.$emit('listenToA', 'hello');
    }
  }
}
</script>
```

b.vue

```vue
<template>
  <div class='b'></div>
</template>

<script>
import Bus from 'bus.js';
export default {
  name: "b",
  monted() {
    Bus.$on('listenToA', this.getAData);
  },
  methods: {
    getAData (val) {
      console.log(`a组件传递过来的数据: ${val}`); // hello
    }
  }
}
</script>
```
## VUE底部滚动刷新 vue-mugen-scroll
## vue 调用视频播放插件 

[Vue-Video-Player](<https://surmon-china.github.io/vue-video-player/>)

// 1.全局引用
```javascript
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

Vue.use(VideoPlayer)
```
// 2.组件内引用
```vue
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

export default {
  components: {
    videoPlayer
  }
}
```
vue部分
```vue
<video-player  class="video-player vjs-custom-skin"
     ref="videoPlayer"
     :playsinline="true"
     :options="playerOptions"
></video-player>
```











## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
