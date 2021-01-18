// pages/wallet/index.js
var API = require('../../utils/api.js')
var {log}=console
var token = wx.getStorageSync('token')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        money:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this
        //获取钱包
        API.ajax('getMoney', {
            token
        }, function (res) {
            log(res)
            if (res.status == 200) {
                that.setData({
                    money:res.data.msg.toFixed(2)
                })
            }
        })
    },

})