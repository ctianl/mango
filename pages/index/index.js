//index.js
//获取应用实例
const app = getApp()
var API = require('../../utils/api.js')
var {
  log
} = console

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    // swiper图片
    autoplay: false,
    interval: 10000,

    isShowBenefit: false,
    //首页大图
    ad_img: '',

    //⭐ 要弄到接口请求
    sort_list: [],

    all_msg: [],


  },

  //事件处理函数
  onChange(event) {
    this.setData({
      active: event.detail
    });
  },

  //进入粉丝群
  enterFansGroup: function () {
    //进入一个二维码界面
    wx.navigateTo({
      url: '/pages/code/index',
    })
  },

  //进入分类
  enterSortItemPage: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    if (id > 0 && id < 5) {
      //前四个
      wx.navigateTo({
        url: `/pages/sort-item/index?id=${id}`,
      })
    }else if(id==5){
      //爆款套餐 至商品列表
      wx.navigateTo({
        url: `/pages/good-list/index?hot=true`,
      })
    }else if(id==6){
      //房型预订 
    }else if(id==7){
      //舌尖美食 至商品列表
      wx.navigateTo({
        url: `/pages/good-list/index?id=3`,
      })
    }else if(id==8){
      //拼团互动
    }

  },
  //商品详情
  toGoodMsg: function (e) {
    var id = e.currentTarget.dataset.id
    //只有住宿套餐，才进入商品详情
    if (id < 5) {
      wx.navigateTo({
        url: `/pages/good-msg/index?id=${id}`,
      })
    }

  },



  //生命周期函数
  onLoad: function () {
    var that = this

    //是否显示福利
    API.ajax('isShowBenefit', {}, function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      if (res.status == 200) {
        that.setData({
          isShowBenefit: res.data.isShowBenefit
        })
      }
    });

    //获取首页头部图片和navbartitle信息
    API.ajax('indexHotelMsg', {}, function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      if (res.status == 200) {
        //设置 
        wx.setNavigationBarTitle({
          title: res.data.name
        })
        that.setData({
          ad_img: res.data.imgs
        })
      }
    });

    //获取分类
    API.ajax('indexSortList', {}, function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      if (res.status == 200) {
        that.setData({
          sort_list: res.data.sort_list
        })
      }
    });

    //获取各分类图片信息
    API.ajax('indexAllMsg', {}, function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      if (res.status == 200) {
        that.setData({
          all_msg: res.data.all_msg
        })
      }
    });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})