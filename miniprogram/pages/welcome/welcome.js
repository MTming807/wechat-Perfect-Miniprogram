Page(
  {
    onTap:function(){
      //三种路由api
      
      // wx.redirectTo({
      //   url: '../posts/posts',
      // })//跳转页面标准写法
      //wx.navigateTo有返回按钮，因为onhide
      //wx.redirectTo无返回按钮，因为onunload

      //如果有tab栏，必须用switchtab
      wx.switchTab({//默认先跳哪个页面
        url: '../posts/posts',
      })
    }
  }
)