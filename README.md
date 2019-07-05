### 项目介绍

> 基于 vue 开发的音乐播放器，界面模仿网易云音乐，数据是真实的网易云音乐的数据，利用[Binaryify](https://github.com/Binaryify/NeteaseCloudMusicApi)提供的node.js版接口！感谢Binaryify大佬！

### 技术栈

vue2.6 + vuex + vue-router + axios + ES6/7 + sass + flex + MuseUI

### 已实现功能

- [x] 首页轮播图
  - [ ] 轮播图详情（未做）
- [ ] 私人FM
- [x] 每日歌曲推荐 -- 登录后可访问
- [x] 云音乐热歌榜
- [x] 推荐歌单
  - [x] 获取全部歌单（更多），歌单详情，播放歌单中的音乐，查看歌单评论

- [x] 最新专辑
  - [x] 获取最新专辑（更多），专辑详情，播放专辑中的音乐，查看专辑评论
- [x] 推荐MV
  - [x] 获取mv排行榜和最新mv 
  - [x] 播放MV，查看mv评论，相似mv 
- [x] 音乐播放
  - [x] 播放和暂停音乐，播放歌单全部音乐
  - [x] 上一首，下一首，快进，快退，滚动歌词
  - [x] 列表循环 ，随机播放，单曲循环
- [x] 个人中心
  - [x] 登录，查看用户个人信息
- [x] 搜索
  - [x] 获取热门搜索，搜索单曲，专辑，歌手，歌单，MV，电台，用户 

- [x]  查看歌手信息，包括单曲，专辑，mv，介绍，相似歌手
- [x] 懒加载

### 部分效果图





### 项目本地运行

##### 安装后台服务器

```bash
git clone https://github.com/zhixuanziben/MusicApi.git  

cd MusicApi

npm install

node app.js (PS:Binaryify大佬的默认端口是3000。由于冲突，本项目需要将app.js中的端口改为5000)
```

##### 安装vue项目

```bash
git clone https://github.com/HeMin0919/cloudmusic.git  

cd cloudmusic

npm install

npm run dev (在浏览器访问本项目，端口默认8080)
```
