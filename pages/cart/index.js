// pages/cart/index.js
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
    isEdit: true,
    good_list: [],

    result: [],

    checked: false,
    sum_price: 0,

    //全选时，array
    fullArr: [],
    matchPrice: {}

  },
  //全选 
  onRadioChange(event) {
    var that = this
    //点击后
    var result = event.detail
    log(result)
    if (result == false) {
      that.setData({
        result: [],
        sum_price: 0
      })
      log(that.data.result)
    } else {
      //全选
      var sum_price=0

      var good_list=that.data.good_list
      good_list.forEach(e=>{
        sum_price+=e.price*e.number
      })

      //同时计算总额
      that.setData({
        result: that.data.fullArr,
        sum_price: Number(sum_price).toFixed(2)
      })
      log(that.data.result)
    }
    this.setData({
      checked: event.detail,
    });
  },
  //选择商品
  onCheckboxChange: function (event) {
    log(event.detail)
    var good_list=this.data.good_list
    var sum_price=0 
    var result = event.detail
    result.forEach(id => {
      good_list.forEach(e=>{
        if(e.good_id==id){
          sum_price += e.number*e.price
        }
      })
  })
    this.setData({
      sum_price:Number(sum_price).toFixed(2),
      result,
    });
  },
  // 步进器改变
  onStepChange(event) {
    //假如都选了， 全选打勾
    //都没有选，  全选取消打勾
    var id = event.currentTarget.dataset.id
    var num = event.detail


    var sum_price = Number(0)

    var result = this.data.result //[] 商品id
    log(result)

    var good_list = this.data.good_list
    good_list = good_list.map(e => {
      if (e.good_id == id) {
        e.number = num
      }
      return e
    })

    this.setData({
      good_list
    })
    var sum_price=Number(0)
    log(this.data.good_list)
    result.forEach(id => {
        good_list.forEach(e=>{
          if(e.good_id==id){
            sum_price += e.number*e.price
          }
        })
    })
    //重新计算购物车商品总价

    this.setData({
      result,
      sum_price:Number(sum_price).toFixed(2)
    });
  },
  toShop:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  edit: function () {
    //开始编辑
    this.setData({
      isEdit: !this.data.isEdit
    })

  },
  finish: function () {
    //完成
    this.setData({
      isEdit: !this.data.isEdit
    })

    //重新计算商品总价
    // var sum_price = Number(0)
    // var result = this.data.result

    // result.forEach(e => {
    //   sum_price = Number(Number(sum_price) + Number(this.data.matchPrice[e])).toFixed(2)
    // })

    this.setData({
      sum_price:0,
      checked:false
    })
  },
  toCompute: function () {
    //不止一个商品
    //数据比较多，这里用本地储存数据

    //要判断是否选择了商品

    var result = this.data.result
    if(result.length==0){
      wx.showToast({
        title: '请先选择商品',
        icon:'none'
      })
    }else{

      var good_list = this.data.good_list

      //然后筛选
      good_list = good_list.filter(e => {
        return result.includes(e.good_id)
      })
  
      log(good_list)
  
      wx.setStorageSync('cartGood', JSON.stringify(good_list))
  
      wx.navigateTo({
        url: `/pages/confirm/index`,
      })
    }

  },
  toGoodMsg: function (e) {
    //进入商品详情
    log(e)
    var id = e.currentTarget.dataset.id
    log(id)
    wx.navigateTo({
      url: `/pages/good-msg/index?id=${id}`,
    })
  },
  delGood: function (e) {
    //删除商品
    //获取打勾的商品id
    var list = this.data.result
    var that = this

    //应该先判断数组是否有元素
    if (list.length == 0) {
      wx.showToast({
        title: '请先勾选商品',
        icon: 'none'
      })
    } else {
      API.ajax('delCartGood', {
        list
      }, function (res) {
        //这里既可以获取模拟的res
        if (res.status == 200) {
          // wx.showToast({
          //   title: res.data.msg,
          // })

          //重新获取购物车数据
          that.getCart()

        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */

  //获取购物车列表
  getCart: function () {
    var that = this
    var matchPrice = {}
    API.ajax('getCartMsg', {}, function (res) {
      //这里既可以获取模拟的res
      if (res.status == 200) {
        var list = res.data.list
        log(list)
        var arr = []
        var sumPrice = 0
        if (list.length > 0) {
          list.forEach(e => {
            arr.push(e.good_id)
            sumPrice += e.number * e.price
            matchPrice[e.good_id] = e.number * e.price
          })
          that.setData({
            fullArr: arr,
            sumPrice,
            matchPrice: matchPrice
          })
        }
        that.setData({
          good_list: list
        })
      }
    });

  },

  onShow: function () {
    var that = this
    that.getCart()
  }

})