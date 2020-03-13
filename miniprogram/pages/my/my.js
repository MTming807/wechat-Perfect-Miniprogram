// pages/profile/profile.js
Page({

  data: {
    info:{},
    userflag:false,
    t:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onGotUserInfo: function(event){
    console.log(event);
    wx.getUserInfo({
      fail: (res) => {
        console.log(res)
      },
      success: (result) => {
        var info = result.rawData
        // var temp = {
        //   name:result.rawData.setData
        // }//不是js对象，是个数组
        // console.log(info[0])
        this.setData({
          info:info,
          userflag:true
        })
      },
      withCredentials: true,
    })
  },
  
  oncleantap:function(event){
    wx.showLoading({
      title: '清理中',
    })
    wx.clearStorageSync();
    this.setData({
      info:{},
      userflag:false
    })
    wx.hideLoading();
    wx.showToast({
      title: '清理完成',
    })
  },

  bindTextAreaBlur:function(event){
    var text = event.detail.value;
    console.log(text)
  },
  ononon:function(event){
    wx.showToast({
      title: '谢谢你',
    })
  }
})