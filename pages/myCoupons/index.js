// pages/myCoupons/index.js
var {
    log
} = console
var API = require('../../utils/api.js')

var token = wx.getStorageSync('token')


Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: []
    },
    tabClick: function (e) {
        var that = this
        // event.detail.name
        //获取
        var title = e.detail.title
        var obj = {
            '未使用': 1,
            '已使用': 2,
            '已过期': 3,
        }
        API.ajax('getMyCouponsList', {
            status: obj[title],
            token
        }, function (res) {
            if (res.status == 200) {
                log('get')
                var list = res.data.list.map(e => {
                    log(isNaN(e.discount))
                    if (e.type == 'rebate') {
                        e.discount = isNaN(e.discount) == true ? e.discount : Number(e.discount).toFixed(2)
                    } else {
                        e.discount += '折'
                    }
                    return e
                })
                that.setData({
                    list
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (options) {
        var that = this
        //默认获取未使用
        var status = 1
        token = wx.getStorageSync('token')

        API.ajax('getMyCouponsList', {
            status,
            token
        }, function (res) {
            log(res)
            if (res.status == 200) {
                log('get')
                var list = res.data.list.map(e => {
                    log(isNaN(e.discount))
                    if (e.type == 'rebate') {
                        e.discount = isNaN(e.discount) == true ? e.discount : Number(e.discount).toFixed(2)
                    } else {
                        e.discount += '折'
                    }
                    return e
                })

                that.setData({
                    list
                })
            }
        })
    },


})