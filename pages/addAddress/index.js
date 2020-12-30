//index.js
//获取应用实例
const app = getApp()
var API = require('../../utils/api.js')
var {
  log
} = console

import areaList from '../../utils/area'

log(areaList)

Page({
  data: {
    hasAddress: false,
    name: '',
    phone: '',
    area: "",
    addressMsg: {},

    showArea: false,
    areaList,
  },
  save: function () {
    var {
      name,
      phone,
      area,
      address,value
    } = this.data

    if (name == '' || name == null) {
      //手机号不符合要求
      wx.showToast({
        icon: 'none',
        title: '收货人不能为空',
        duration: 2000
      })
    } else if (phone == '' || phone == null) {

      wx.showToast({
        icon: 'none',
        title: '手机号不能为空',
        duration: 2000
      })
    } else if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(phone))) {
      wx.showToast({
        icon: 'none',
        title: '手机号格式不符合要求',
        duration: 2000
      })
    } else if (area == '' || area == null) {
      //弹出 选择地区
      this.setData({
        showArea: true
      })
    } else if (address == '' || address == null) {
      wx.showToast({
        icon: 'none',
        title: '详细地址不能为空',
        duration: 2000
      })
    } else {
      //发送请求
      //保存地址
      var data = {
        name,
        phone,
        area,
        address,
        value
      }
      API.ajax('addAddress', data, function (res) {
        if (res.status == 200) {
          //设置购物车数量
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          //回到订单确认
          setTimeout(() => {

            //⭐应重新打开这个界面 需要重新获取地址信息
            wx.navigateBack({
              delta: 1
            })
          }, 2000);
        }
      })
    }
  },
  showArea: function () {
    this.setData({
      showArea: !this.data.showArea
    })
  },
  confirm: function (e) {
    //获取value
    var value=e.detail.values[2].code
    var arr = e.detail.values
    var province = arr[0].name
    var city = arr[1].name
    var area = arr[2].name
    this.setData({
      showArea: false,
      area: province + ' ' + city + ' ' + area,
      value
    })

  },
  cancel: function (e) {
    this.setData({
      showArea: false
    })
  },
  onLoad: function (options) {
    var that = this
    //获取地址
    API.ajax('addressIdMsg', {}, function (res) {
      if (res.status == 200) {
        that.setData({
          addressId: res.data.id
        })
        API.ajax('getAddress', {
          id: that.data.addressId
        }, function (res) {
          if (res.status == 200) {
            that.setData({
              hasAddress: true,
              addressMsg: res.data.address
            })

          }
        })
      }
    })

  }
})