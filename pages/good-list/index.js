// pages/good-list/index.js
const app = getApp()
var API = require('../../utils/api.js')
var {
  log
} = console

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //type 区分商品类型 如住宿/会议室/餐厅/健身房/优惠专区
    type: '',

    active: '综合',
    sort: 0,
    list: [],
    show_type: false,
    //当前的排序方式
    current_sort_type: '',
    keyword: ''
  },
  clickSort: function (e) {
    var that = this

    //如果是0 1 排序图标变暗
    var id = e.currentTarget.dataset.id
    var type = that.data.type
    that.setData({
      active: id,
    })

    if (id == '综合') {
      //综合
      that.setData({
        sort: 0,
        current_sort_type: 'normal'
      })
      //加载
      wx.showNavigationBarLoading()

      API.ajax('getGoodList', {
        type,
        sort_type: 'normal',
        keyword: that.data.keyword
      }, function (res) {
        //获取成功后 取消加载
        wx.hideNavigationBarLoading()
        if (res.status == 200) {
          log(res.data.list)
          that.setData({
            list: res.data.list
          })
        }
      })

    } else if (id == '销量') {
      //销量

      that.setData({
        sort: 0,
        current_sort_type: 'sale'

      })
      //加载
      wx.showNavigationBarLoading()

      //获取数据
      API.ajax('getGoodList', {
        type,
        //根据销量排序
        sort_type: 'sale',
        keyword: that.data.keyword

      }, function (res) {
        //获取成功后 取消加载
        wx.hideNavigationBarLoading()
        if (res.status == 200) {
          that.setData({
            list: res.data.list
          })
        }
      })

    } else if (id == '价格') {
      //价格

      if (that.data.sort == 0 || that.data.sort == 2) {
        that.setData({
          sort: 1,
          current_sort_type: 'price_to_low'

        })

        //获取数据
        API.ajax('getGoodList', {
          type,
          //根据价格排序 由高至低
          sort_type: 'price_to_low',
          keyword: that.data.keyword

        }, function (res) {
          //获取成功后 取消加载
          wx.hideNavigationBarLoading()
          if (res.status == 200) {
            that.setData({
              list: res.data.list
            })
          }
        })

      } else if (that.data.sort == 1) {
        that.setData({
          sort: 2,
          current_sort_type: 'price_to_high'

        })

        //获取数据
        API.ajax('getGoodList', {
          type,
          //根据价格排序 由低至高
          sort_type: 'price_to_high',
        keyword: that.data.keyword

        }, function (res) {
          //获取成功后 取消加载
          wx.hideNavigationBarLoading()
          if (res.status == 200) {
            that.setData({
              list: res.data.list
            })
          }
        })

      }
    }
  },

  // tab
  onChange(event) {
    //设置index
    this.setData({
      active: event.detail.index
    })

  },
  //商品详情
  toGoodMsg: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/good-msg/index?id=${id}`,
    })
  },
  search: function () {
    wx.showNavigationBarLoading()

    var that = this

    API.ajax('getGoodList', {
      type:that.data.type,
      sort_type: that.data.current_sort_type,
      keyword: that.data.keyword
    }, function (res) {
      //获取成功后 取消加载
      wx.hideNavigationBarLoading()
      if (res.status == 200) {
        log(res.data.list)
        that.setData({
          list: res.data.list
        })
      }
    })

  },
  changeSortType: function (e) {
    this.setData({
      show_type: !this.data.show_type
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.id
    var hot=options.hot
    log(options)
    // var type =1
    var that = this
    that.setData({
      type,
      current_sort_type: 'normal',
    })
    //发送请求，获取数据
    //还要把列表排序方式上传
    API.ajax('getGoodList', {
      type,
      sort_type: 'normal',
      hot,
      keyword:that.data.keyword
    }, function (res) {
      if (res.status == 200) {
        log(res.data.list)
        that.setData({
          list: res.data.list
        })
      }
    })
  },




})