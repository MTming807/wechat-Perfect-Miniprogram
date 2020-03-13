//用于存放公共方法

function convertToStarsArray(stars) {
  var num = stars.toString().substring(0,1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

function http(url,callBack){//要在more.js调用，callBack中存了获取的数据
  wx.request({
    url: url,
    header:{
      "content-type":"json"
    },
    success:function(res){
      callBack(res.data);//请求成功（结果未知），这里拿到数据
    },
    fail:function(error){
      console.log("连接失败")//连接断开
    }
  })
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {//引用方法
  convertToStarsArray: convertToStarsArray,
  http:http,
  convertToCastString:convertToCastString,
  convertToCastInfos:convertToCastInfos
}