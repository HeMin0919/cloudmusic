import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/home.vue'; //首页顶部图标，跳转到相应部分
import MusicLibrary from '../views/home/children/musicLibrary.vue' //首页过渡，跳转到相应的部分
import PersonalAdvice from '../views/home/children/personalAdvice.vue'; //轮播图列表、每日歌曲推荐、云音乐热歌榜、推荐歌单列表、最新专辑列表、推荐MV列表
import recommendSongs from '../views/list/recommendSongs.vue' //每日歌曲推荐
import SongList from '../views/home/children/songList.vue'; //歌曲详情列表
import List from '../views/list/list.vue'; //排行榜
import Listdetails from '../views/list/listdetails.vue'; //排行榜详情
import ListContent from '../views/list/listContent.vue'; //获取歌单详情
import playList from '../views/list/playList.vue'; //获取歌单详情
import Album from '../views/album/album.vue'; //最新专辑
import AlbumList from '../views/album/albumList.vue'; //获取专辑新碟上架详情页
import music from '../views/music/music.vue' //获取 音乐 数据，音乐播放页
import mvhome from '../views/mv/mvhome.vue'; // 获取 mv 数据，MV播放页
import mvList from '../views/mv/mvList.vue'; //MV频道首页，跳转到相应的mv部分
import mvdetails from '../views/mv/children/MVdetails.vue'; // 获取 mv 数据
import mvcomment from '../views/mv/children/mvComment.vue'; //mv 评论
import similarMV from '../views/mv/children/similarMV.vue'; // 获取相似 mv
import hotMV from '../views/mv/children/hotMV.vue'; // 获取 mv 排行
import newMV from '../views/mv/children/newMV.vue'; // 获取 最新mv 排行
import artist from '../views/artists/artist.vue'; // 获取歌手描述
import artistMsg from '../views/artists/children/artistMsg.vue'; //歌手信息
import artistAlbum from '../views/artists/children/artistAlbum.vue'; // 获取歌手专辑
import artistHotmusic from '../views/artists/children/artistHotmusic.vue'; //获得歌手的热门歌曲
import artistMV from '../views/artists/children/artistMV.vue'; // 获取歌手 mv
import comment from '../views/comment/comment.vue'; //评论
import userHome from '../views/user/userHome.vue'; //获取用户歌单
import user from '../views/user/user.vue'; //登录注册
import userInfo from '../views/user/userInfo.vue';//登录成功后用户信息
import djRadios from '../views/djRadios/djRadios.vue'; //电台详情
import SearchHome from '../views/search/searchHome.vue'; //搜索主页
import SearchResult from '../views/search/searchResult.vue'; //搜索显示结果页，跳转相应的搜索页面
import SearchResultMusic from '../views/search/children/searchResultMusic.vue';
import SearchResultAlbum from '../views/search/children/searchResultAlbum.vue';
import SearchResultArtist from '../views/search/children/searchResultArtist.vue';
import SearchResultMV from '../views/search/children/searchResultMV.vue';
import SearchResultRadio from '../views/search/children/searchResultRadio.vue';
import SearchResultSonglist from '../views/search/children/searchResultSonglist.vue';
import SearchResultUser from '../views/search/children/searchResultUser.vue';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: { name: 'personalAdvice' },
      children:[
        {
          path: 'musicLibrary',
          name: 'musicLibrary',
          component: MusicLibrary,
          children:[
            {
            path: 'personalAdvice',
            name: 'personalAdvice',
            component: PersonalAdvice,
            },
            {
            path: 'songList',
            name: 'songList',
            component: SongList,
            },
            {
            path: 'list',
            name: 'list',
            component: List,
            },
            
          ]
        }
      ]
    },
    {
      path: '/listContent/:id',
      name: 'listContent',
      component: ListContent,
      meta: { notKeepAlive: true } //用来缓存组件,避免多次加载相应的组件,减少性能消耗
    },
    {
      path: '/listdetails/:id',
      name: 'listdetails',
      component: Listdetails,
      meta: { notKeepAlive: true }
    },
    {
      path: '/recommendSongs',
      name: 'recommendSongs',
      component: recommendSongs
    },
    {
      path: '/playList/:id',
      name: 'playList',
      component: playList,
      meta: { notKeepAlive: true }
    },
    {
      path: '/music/:id',
      name: 'music',
      component: music,
      meta: { notKeepAlive: true }
    },
    // 专辑部分
     {
      path: '/album/:id',
      name: 'album',
      component: Album,
      meta: { notKeepAlive: true }
    },
    {
      path: '/albumList',
      name: 'albumList',
      component: AlbumList
    },
    // 歌手部分
    {
      path: '/artist/:id',
      name: 'artist',
      component: artist,
      meta: { notKeepAlive: true },
      children: [
        {
          path: '',
          redirect: 'artistHotmusic'
        },
        {
          path: 'artistMsg',
          name: 'artistMsg',
          component: artistMsg
        },
        {
          path: 'artistAlbum',
          name: 'artistAlbum',
          component: artistAlbum
        },
        {
          path: 'artistHotmusic',
          name: 'artistHotmusic',
          component: artistHotmusic
        },
        {
          path: 'artistMV',
          name: 'artistMV',
          component: artistMV
        }
      ]
    },
    // MV部分
    {
      path: '/mv/:id',
      name: 'mv',
      component: mvhome,
      redirect: { name: 'mvdetails' },
      meta: { notKeepAlive: true },
      children: [
        {
          path: 'mvdetails',
          name: 'mvdetails',
          component: mvdetails,
          meta: { notKeepAlive: true }
        },
        {
          path: 'mvcomment',
          name: 'mvcomment',
          component: mvcomment,
          meta: { notKeepAlive: true }
        },
        {
          path: 'similarMV',
          name: 'similarMV',
          component: similarMV,
          meta: { notKeepAlive: true }
        }
      ]
    },
    {
      path: '/mvList',
      name: 'mvList',
      component: mvList,
      redirect: { path: '/mvList/hotMv' },
      children: [
        {
          path: 'hotMV',
          name: 'hotMV',
          component: hotMV
        },
        {
          path: 'newMV',
          name: 'newMV',
          component: newMV
        }
      ]
    },
    //评论部分
    {
      path: '/comment/:id',
      name: 'comment',
      component: comment,
      meta: { notKeepAlive: true }
    },
    // 搜索部分
    {
      path: '/searchHome',
      name: 'searchHome',
      component: SearchHome,
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: SearchResult,
      redirect: { name: 'searchResultMusic' },
      meta: { notKeepAlive: true },
      children:[
        {
          path: 'music',
          name: 'searchResultMusic',
          component:SearchResultMusic,
          meta:{ notKeepAlive: true },
        },
        {
          path: 'albums',
          name: 'searchResultAlbum',
          component: SearchResultAlbum,
          meta: { notKeepAlive: true }
        },
        {
          path: 'artists',
          name: 'searchResultArtist',
          component: SearchResultArtist,
          meta: { notKeepAlive: true }
        },
        {
          path: 'mvs',
          name: 'searchResultMV',
          component: SearchResultMV,
          meta: { notKeepAlive: true }
        },
        {
          path: 'radio',
          name: 'searchResultRadio',
          component: SearchResultRadio,
          meta: { notKeepAlive: true }
        },
        {
          path: 'songlist',
          name: 'searchResultSonglist',
          component: SearchResultSonglist,
          meta: { notKeepAlive: true }
        },
        {
          path: 'users',
          name: 'searchResultUser',
          component: SearchResultUser,
          meta: { notKeepAlive: true }
        }]
    },
    //用户部分
    {
      path: '/userHome/:id',
      name: 'userHome',
      component: userHome
    },
    {
      path: '/user',
      name: 'user',
      component: user,
    },
    {
      path: '/userInfo/:id',
      name: 'userInfo',
      component: userInfo
    },
    //电台部分
    {
      path: '/djRadios/:id',
      name: 'djRadios',
      component: djRadios,
      meta: { notKeepAlive: true }
    },
  ]
})
