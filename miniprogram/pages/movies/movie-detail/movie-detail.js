// pages/movies/movie-detail/movie-detail.js
var app = getApp();
var util = require('../../../utils/utils.js');
Page({
  data: {
    movie:{}
  },

  onLoad: function (options) {
    //首先要从点击电影获取电影id
    var movieid = options.id;//要用？后面的变量，拿到跳转前的页面的参数
    var detailurl = app.globalData.doubanBase + "/v2/movie/subject/"+movieid;
    util.http(detailurl,this.receivedoubandata);
  },

  receivedoubandata:function(data){
    if(!data){//如果空，啥都不做
      return
    }
    var director={
      avatar:"",
      name:"",
      id:""
    }
    if(data.directors[0]!=null){
      if(data.directors[0].avatars!=null){//中间隔了个东西，空.x会报错
        director.avatar=data.directors[0].avatars.large
      }
      director.name=data.directors[0].name;
      director.id=data.directors[0].id;
    }//判空不报错
    //数据处理
    var movie={
      movieimg:data.images?data.images.large:"",//海报 如果空，返回空字符串
      country:data.countries[0],//国家
      title:data.title,
      originaltitle:data.original_title,//别名
      wishcount:data.wish_count,//想看
      commentcount:data.comments_count,//评论
      year:data.year,
      genres:data.genres.join("、"),//类型
      stars:util.convertToStarsArray(data.rating.stars),//处理星星组件
      score:data.rating.average,//评分
      director:director,//上面处理过的js对象
      casts:util.convertToCastString(data.casts),//演员
      castsinfo:util.convertToCastInfos(data.casts),
      summary:data.summary//简介
    }
    // console.log(movie);
    this.setData({
      movie:movie
    })
  }

})