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

    newGoodList: [],

    //‘周六上新’ 定位
    bannerHeight: 0,
    scrollTop: 0,

    //拼单图片信息
    groupImg1: '',
    groupImg2: '',
    groupImg3: '',
    groupImg4: '',
    groupImg5: '',
    groupName1: '',
    groupName2: '',
    groupName3: '',
    groupName4: '',
    groupName5: '',
    groupItemId1: '',
    groupItemId2: '',
    groupItemId3: '',
    groupItemId4: '',
    groupItemId5: '',


  },

  //事件处理函数
  onChange(event) {
    this.setData({
      active: event.detail
    });
  },

  //进入粉丝群
  // enterFansGroup: function () {
  //   //进入一个二维码界面
  //   wx.navigateTo({
  //     url: '/pages/code/index',
  //   })
  // },

  //进入分类
  enterSortItemPage: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    log(id)
    wx.navigateTo({
      url: `/pages/good-list/index?hot=true&type=${id}`,
    })
  },
  //商品详情
  toGoodMsg: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/good-msg/index?id=${id}`,
    })
  },

  //进入拼单商品详情
  toGroupGood: function (e) {
    var good_id = e.currentTarget.dataset.id
    log(good_id)
    wx.navigateTo({
      url: `/pages/groupGoodMsg/index?id=${good_id}`,
    })
  },
  toGroupList: function (e) {
    wx.navigateTo({
      url: '/pages/group/index',
    })
  },
  /**
   * 监听滚动条
   */
  onPageScroll: function (e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },

  //生命周期函数
  onLoad: function () {
    var that = this

    // 获取.saturday高度
    wx.createSelectorQuery().select('.saturday').boundingClientRect((rect) => {
      log(rect)
      console.log('saturday', rect.top)
      this.setData({
        bannerHeight: rect.top
      })
    }).exec()

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
        // wx.setNavigationBarTitle({
        //   title: res.data.name
        // })
        that.setData({
          ad_img: res.data.imgs
        })
      }
    });

    //获取新品
    API.ajax('getNewGood', {}, function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      if (res.status == 200) {
        that.setData({
          newGoodList: res.data.list
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

    //获取拼单图片名称
    API.ajax('getGroup', {
      type: 0
    }, function (res) {
      //这里既可以获取模拟的res
      var list = res.data.list
      if (res.status == 200) {
        that.setData({
          groupImg1: list[3].img,
          groupImg2: list[1].img,
          groupImg3: list[0].img,
          groupImg4: list[5].img,
          groupImg5: list[4].img,
          groupName1: list[3].single_intro,
          groupName2: list[1].single_intro,
          groupName3: list[0].single_intro,
          groupName4: list[5].single_intro,
          groupName5: list[4].single_intro,
          groupItemId1: list[3].good_id,
          groupItemId2: list[1].good_id,
          groupItemId3: list[0].good_id,
          groupItemId4: list[5].good_id,
          groupItemId5: list[4].good_id,
        })
      }
    });


    //获取所有商品信息
    API.ajax('getGoodList', {
      type: 0
    }, function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      if (res.status == 200) {
        that.setData({
          all_msg: res.data.list
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