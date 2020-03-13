// pages/movies/m.js
var util = require('../../utils/utils.js')
var app = getApp();//拿到app.js中的全局app
Page({
  // restfull api json

  /**
   * 页面的初始数据
   */
  data: {//如果这里不写，初始化时找不到这三个变量，数据绑定就找不到值，所以要给对象空值
    zhengzaireying:{},
    jijiangshangying:{},
    top250:{},
    searchresult:{},
    containershow:true,
    searchpannelshow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var zhengzaireyingurl = "https://douban.uieee.com/v2/movie/in_theaters"
    // var jijiangshangyingurl = "https://douban.uieee.com/v2/movie/coming_soon"
    // var top250url = "https://douban.uieee.com/v2/movie/top250"
    //上面提取全局变量https://douban.uieee.com到app.js中（顶上var app = getApp();//拿到app.js中的全局app）
    var zhengzaireyingurl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3"//这一页显示3个，找API属性，这里代表第0页的三个js对象数据（默认20）
    var jijiangshangyingurl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3"
    var top250url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3"
    //加载时发送三次请求，异步，顺序不定
    this.getmovielistdata(zhengzaireyingurl,"zhengzaireying","正在热映");//引号里的参数与data里的一致，为了防止异步不知道哪个对哪个，传相应key到getmovielistdata()
    this.getmovielistdata(jijiangshangyingurl,"jijiangshangying","即将上映");
    this.getmovielistdata(top250url,"top250","Top250");
  },

  getmovielistdata:function(url,settedKey,moviekind){
    //开始发送请求时显示加载框
    wx.showLoading({
      title: '加载中',
    })

    var that = this;
    wx.request({
      url: url,
      header:{
        "content-type":"json"
      },

      success:function(res){
        console.log("获取数据请求发送成功");//请求成功（结果未知），这里拿到数据
        that.receivedoubandata(res.data,settedKey,moviekind);
        //隐藏加载框
        wx.hideLoading();
      },
      fail:function(error){
        console.log("连接失败");//连接断开
        //隐藏加载框
        wx.hideLoading();
      }
    })
  },

  receivedoubandata:function(moviesdouban,settedKey,moviekind){//moviesdouban接收的数据
    var movies = [];
    for(var idx in moviesdouban.subjects){
      var subject = moviesdouban.subjects[idx];//获取对象里的哪个对象？
      var title = subject.title;//一个对象里的title字段
      
      if(title.length>=6){
        title = title.substring(0,6)+"...";
      }
      //以下开始数据绑定
      var temp = {
        stars:util.convertToStarsArray(subject.rating.stars),//拿到了stars
        title:title,
        average:subject.rating.average,
        coverageurl:subject.images.large,
        movieid:subject.id
      };

      movies.push(temp);
    }
    //动态改变，原因如下
    //一切的起因是onload中异步请求，总共三个，那么这里如果用个静态值接收，你不知道最后一个接受的是哪个
    //因此要现在data中写上放各自值的对象，再在请求函数里加入传入参数settedKey，意义是区分获取的是哪类数据
    //最后是这里要创建一个空js对象来接收对应的readydata[settedKey]
    //再到前端wxml里，把请求函数后面的参数写到相应的位置
    var readydata = {};
    readydata[settedKey]={
      moviekind:moviekind,
      movies:movies
    }
    // readydata[settedKey] = movies;
    this.setData(readydata);
  },

  onmoretap:function(event){
    var moviekind = event.currentTarget.dataset.moviekind;//第二步：拿到moviekind
    wx.navigateTo({//第三步：?传递特定参数
      url: '../movies/more/more?moviekind='+moviekind,
    })
  },

  onbindfocus:function(event){
    // 获取了焦点之后要更新焦点（页面做交换），数据绑定
    this.setData({//下面两个变量在data中被初始化
      containershow:false,//原来的页面隐藏
      searchpannelshow:true//xx和搜索页面出来
    })
  },
  oncancelimgtap:function(event){
    this.setData({
      containershow:true,
      searchpannelshow:false,
      searchresult:{}
    })
  },
  onbindconfirm:function(event){//调用搜索api
    wx.showLoading({
      title: '加载中',
    })
    var text = event.detail.value;//获取用户输入的要搜索的值
    console.log("用户搜索："+ text);
    var searchurl="http://t.talelin.com/v2/movie/search?q="+text;
    this.getmovielistdata(searchurl,"searchresult","");//发送请求，第二个参数放search结果
    //绑定searchresult
    wx.hideLoading();
  },

  onmoviedetailtap:function(event){
    console.log(event);
    var movieid = event.currentTarget.dataset.movieid;//拿到点击事件的id
    console.log(movieid);
    wx.navigateTo({
      url: '/pages/movies/movie-detail/movie-detail?id='+movieid,//去wxml里绑定
    })//获取在detail.js的onload
    console.log(movieid);
  },

})