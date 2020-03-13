// pages/posts/posts.js
//可以从服务器获取数据
var posts_content = require('../../data/posts-data.js')//相对路径

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var posts_content =[{
    //   date: "Nov 1619",
    //   title: "这正是一只螃蟹",
    //     // 当获取的数据存在嵌套关系时，要用img.author_img形式
    //   imgsrc: "/images/avatar/1.png",
    //   avatar: "/images/post/crab.png",
    //   content:"只见他三下五除二就快速完成了网络的搭建。人们纷纷问英雄的名称，只见英雄往下压了压帽檐，低声说道：“别问，问就双绞线！”从此，网络管理员都爱上了双绞线，“曾经的真爱”10B5和10B2同轴电缆则被“弃之如敝屣”。",
    //   reading:"18",
    //   collection:"26",
    //   // wx:if是否隐藏在这里配置
    //   text_condition:"true"
    // },
    // {
    //   date: "Apr 6529",
    //   title: "王亚铭帅得一批",
    //   // 当获取的数据存在嵌套关系时，要用img.author_img形式
    //   imgsrc: "/images/avatar/2.png",
    //   avatar: "/images/wym.png",
    //   content: "帅就一个字，我只说一次",
    //   reading: "98632",
    //   collection: "106492",
    //   // wx:if是否隐藏在这里配置
    //   text_condition: "true"
    // }]
    // // 把上面的数据传到data，大小写区分！this.setData()
    // //这里的数组没有名字，post_content只是临时变量，需要有个对象

    //注意这里：写法已经更新：posts_key:顶上定义的变量.数据js出口中的postList
    this.setData({//这里面必须是个对象
      posts_key:posts_content.postList
    })
    //可以简写成this.setData({posts_content})  这是ES6写法
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onPostTap:function(event){
    var postid = event.currentTarget.dataset.postid;
    
    wx.navigateTo({
      // 传递特定的标签
      url: 'posts-detail/posts-detail?id=' + postid,
    })
    console.log("postid = " + postid);
  },

  onswipertap:function(event){
    //target和currentTarget区别
    //target当前点击的组件，currentTarget事件捕获的组件
    var postid = event.target.dataset.postid;
    wx.navigateTo({
      url: 'posts-detail/posts-detail?id=' + postid,
    })
  }
})