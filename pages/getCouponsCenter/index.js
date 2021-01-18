// pages/getCouponsCenter/index.js
var API = require('../../utils/api.js')
var token = wx.getStorageSync('token')

var {
    log
} = console
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //type : discount折扣券 rebate满减券
        //status：1可立即领取 2已过期 3已领取 4已使用
        list: []
    },
    getCoupon: function (e) {
        var that = this
        var id = e.currentTarget.dataset.id
        API.ajax('getCoupon', {
            id,token
        }, function (res) {
            if (res.status == 200) {
                log(res.data.list)
                var list = res.data.list.map(e => {
                    log(isNaN(e.discount))
                    if (e.type == 'rebate') {
                        e.discount = isNaN(e.discount) == true ? e.discount : Number(e.discount).toFixed(2)
                    }else{
                        e.discount+='折'
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
        token = wx.getStorageSync('token')

        API.ajax('getCouponsList', {
            token
        }, function (res) {
            if (res.status == 200) {
                var list = res.data.list.map(e => {
                    log(isNaN(e.discount))
                    if (e.type == 'rebate') {
                        e.discount = isNaN(e.discount) == true ? e.discount : Number(e.discount).toFixed(2)
                    }else{
                        e.discount+='折'
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