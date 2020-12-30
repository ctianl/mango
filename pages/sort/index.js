//index.js
//获取应用实例
const app = getApp()
var API = require('../../utils/api.js')
var {
  log
} = console

Page({
  data: {
    list:[]

  },
  search:function(){
      wx.navigateTo({
        url: '/pages/good-list/index',
      })
  },
  clickSortItem:function(e){
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/good-list/index?id=${id}`,
    })
  },
  onLoad:function(){
      var that=this
      //获取分类
      API.ajax('searchSortList', {}, function (res) {
        if (res.status == 200) {
          //设置购物车数量
            that.setData({
                list:res.data.list
            })
        
        }
      })
  }
})
