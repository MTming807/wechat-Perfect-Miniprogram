// pages/movies/more/more.js
var app = getApp();//拿到app.js中的全局app
var util = require('../../../utils/utils.js');//现在才明白../代表回退到上级文件夹

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:{},//数据绑定别忘了，在callback里
    navigatetitle:{},//中间变量，用于传递 moviekind导航栏动态标题
    requestUrl:"",
    totalCount:0,
    isempty:true//movies里是否为空
  },
 
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var moviekind = options.moviekind;//第四步：获取到从mv.js中onmoretap()传入的moviekind参数（用户点的哪个类型数据）
    console.log(moviekind+" 更多");
    this.data.navigatetitle = moviekind;

    var dataurl = "";
    switch(moviekind){//判断拿到的是什么关键词，表示用户点了哪个按钮
      case "正在热映":
        dataurl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataurl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "Top250":
        dataurl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataurl;//data作为中间变量传递

    util.http(dataurl,this.callBack);//调用公共方法里的http请求数据
    wx.hideLoading();
  },

  callBack:function(moviesdouban){//这时moviesdouban里已存放了获取到的数据，但还要再分析
    // console.log(moviesdouban);
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

      movies.push(temp);//已经被分好类，不需要考虑异步问题
    }

    var totalmovies={};
    if(!this.data.isempty){//前面有数据了
      totalmovies = this.data.movies.concat(movies);//把新数据和前面的数据合并
    }
    else{
      totalmovies = movies;//第一次拿到数据
      this.data.isempty = false;//已经不是空的了，改标志
    }
    this.data.totalCount += 20;//成功绑定之后+20
    this.setData({//执行数据绑定
      movies:totalmovies
    });

    //为什么在more.wxml里面能传入数据？因为在onload被加载moviekind->dataurl->http->callBack->moviesdouban->temp->movies
    wx.hideNavigationBarLoading();//上拉加载更多动画结束
    wx.stopPullDownRefresh();//停止下拉刷新
  },

 //onload->onshow->onready动态导航条要在onready里写，这时页面已经渲染完成
  onReady: function(event){
    wx.setNavigationBarTitle({
      title: this.data.navigatetitle,
    })
  },

  // onscrolllower:function(event){//来自grid-template的onscrolllower加载更多，变化的是序号
  //   // console.log("加载更多数据");
  //   var nexturl = this.data.requestUrl + "?start="+this.data.totalCount + "&count=20";//在onload中赋值
  //   util.http(nexturl,this.callBack);//下一个20条,仅仅到这里只能不断刷新20条，不能追加
  //   wx.showNavigationBarLoading();//上拉加载更多动画开始
  // },

  onReachBottom:function(event){
    var nexturl = this.data.requestUrl + "?start="+this.data.totalCount + "&count=20";//在onload中赋值
    util.http(nexturl,this.callBack);//下一个20条,仅仅到这里只能不断刷新20条，不能追加
    wx.showNavigationBarLoading();//上拉加载更多动画开始
  },

  onPullDownRefresh: function(event) {
    var refreshurl = this.data.requestUrl+"?start=0&count=20";
    //刷新前，之前的所有数据要置空
    this.data.movies={};
    this.data.isempty=true;
    util.http(refreshurl,this.callBack);
  },

  onmoviedetailtap: function (event) {
    console.log("123123123")
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  }
})