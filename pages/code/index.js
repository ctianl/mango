const app = getApp()
var API = require('../../utils/api.js')

Page({
  data: {
    img:''
  },
  onLoad:function(){
      var that=this
      //获取二维码图片
      API.ajax('code', {}, function (res) {
        //这里既可以获取模拟的res
        console.log(res)
        if (res.status == 200) {
          that.setData({
            img: res.data.img
          })
        }
      });
  }
})