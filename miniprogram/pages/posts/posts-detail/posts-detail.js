// pages/posts/posts-detail/posts-detail.js
//把posts-data数据拿过来
var posts_content = require('../../../data/posts-data.js')

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    // musicplayingflag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postid = options.id; //id就是posts.js ?后面的变量
    this.data.currentpostid = postid;
    var postdetaildata = posts_content.postList[postid];//取postList下面的属性postid

    this.setData({//这里面必须是个对象
      postdetaildata
    })
    // console.log("从posts.js拿到的postid = " + postid + " postdetaildata绑定posts-data.js里对应postid的数据");
    // console.log(postdetaildata);

    //同步缓存   在调试器的storage查看，这个缓存会一直都在（用户不主动清除）
    // wx.setStorageSync('key', "1234");
    // wx.setStorageSync('key',{//设置成js对象
    //   game:"1234",
    //   ssss:"fwefwe"
    // })

    //postscollected是用来存放collect_key的大数组
    var postscollected = wx.getStorageSync('collect_key')//初始化收藏图片缓存
    //如果有postscollected，把下标为postid的拿出来给collectflag
    if(postscollected){
      var collectflag = postscollected[postid];
      //如果有collectflag，做数据绑定
      if(collectflag){
        this.setData({
          collected:collectflag//绑定collectflag到collected，collected位于图片切换位置
        })
      }
    }
    else{//如果没有postscollected，先创建一个大集合，再往里填元素，初始为false，并设置相应缓存
      var postscollected = {};
      postscollected[postid] = false ;
      wx.setStorageSync('collect_key', postscollected);//将第一次点的初始化为false
    }

    var playflag = wx.getStorageSync('music_key')
    if(playflag){
      this.setData({
        played:playflag
      })
    }
    else{
      var playflag = false;
      wx.setStorageSync('music_key', playflag);
    }
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
    
  oncollectiontap:function(event){
    var postscollected = wx.getStorageSync('collect_key');//拿到缓存里的大集合
    
    var collectflag = postscollected[this.data.currentpostid];// 如何拿到onload中的postid？用data{}
    console.log(collectflag);
    collectflag = !collectflag;//取反操作
    postscollected[this.data.currentpostid] = collectflag;//更新是否收藏的缓存值
    
    wx.setStorageSync('collect_key', postscollected);//更新整体collectkey缓存
    this.setData({//更新数据绑定，实现图片切换
      collected:collectflag
    })
    // wx.removeStorageSync('key')//删除缓存
    // wx.clearStorageSync()//清除所有缓存
    //缓存上限不能超过10MB
    //八种方法，同步异步*setgetremoveclear

    //为什么说同步不行再考虑异步？因为异步存在函数嵌套的问题，异步success再套一个，如果一个出问题就很难排查错误
    //同步缓存缺点是什么？必须要等同步setStorageSync所有代码执行完才会向下执行，因此如果时间长可能会卡ui
    //*需要业务解耦时必须要用异步缓存，否则能同步就同步

    //下面两个小组件也可以写成函数，通过函数内写var that = this 然后success内嵌函数内调用that.showModal()
    //showToast:function(collectflag,postscollected){}
    wx.showToast({//最常见的交互组件之一，一个会自动消失的小黑弹窗
      title: collectflag?'收藏成功':'取消收藏',
      icon: collectflag?'success':'loading',
      duration: collectflag?1400:700
      // success:function(){//可以往里加成功后的逻辑

      // }
    })

  //   wx.showModal({//最常见的交互组件之一，不会消失带确认的小弹窗
  //     title:'收藏',
  //     content:'是否收藏该笔记？',
  //     showCancel:true,
  //     cancelText:'不，谢谢',
  //     confirmColor:'#405f80',
  //     cancelColor: 'cancelColor'
  // })
  },

  onsharetap:function(event){
      var itemList = [
        '分享给微信好友',
        '分享到朋友圈',
        '分享给QQ好友'
      ]

      wx.showActionSheet({
        itemList: itemList,
        success:function(res){
          // res.cancel//用户点击了取消按钮
          // res.tapIndex//数组元素序号，从0开始
          wx.showModal({
            title:'用户'+ itemList[res.tapIndex],
            content: '目前还无法实现分享。'
          })
        }
      })
    },

    onmusictap:function(event){
      var playflag = wx.getStorageSync('music_key')
      playflag = !playflag
      wx.setStorageSync('music_key', playflag)
      this.setData({
        played:playflag
      })

      if(playflag){
        wx.showToast({
          title: "你假装放了音乐",
          icon: 'success',
          duration: 700
        })
      }
      else{
        wx.showToast({
          title: "假装音乐被暂停",
          icon: 'success',
          duration: 700
        })
      }


      // if(musicplayingflag){
      //   wx.playBackgroundAudio({
      //     dataUrl: '',
      //     title:'',
      //     coverImgUrl:''
      //   })
      //   musicplayingflag=true
      // }
      // else{
      //   wx.pauseBackgroundAudio({
      //     complete: (res) => {},
      //   })
      // }

    }
})