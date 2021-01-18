// pages/groupOrder/index.js
var API = require('../../utils/api.js')
var {
    log
} = console

Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        list: []
    },
    getOrder: function (status) {
        var that = this
        //获取拼团订单
        wx.showNavigationBarLoading()
        API.ajax('getGroupOrderList', {
            status
        }, function (res) {
            wx.hideNavigationBarLoading()
            log(res)
            if (res.status == 200) {
                var list = res.data.list
                list = list.map(e => {
                    e.actual_price = Number(e.actual_price).toFixed(2)
                    e.single_price = Number(e.single_price).toFixed(2)
                    e.delivery_price = Number(e.delivery_price).toFixed(2)
                    e.sum_price = Number(e.sum_price).toFixed(2)
                    return e
                })
                that.setData({
                    list
                })
            }
        })
    },
    toMsg: function (e) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/groupGoodMsg/index?id=${id}`,
        })
    },

    del: function (e) {
        var that = this
        //是否删除订单
        wx.showModal({
            title: '操作提示',
            content: "是否取消此订单？", //提示内容
            success(res) {
                if (res.confirm) {
                    //待付款 取消订单 即 删除订单
                    var id = e.currentTarget.dataset.id
                    API.ajax('delGroupOrder', {
                        id
                    }, function (res) {
                        if (res.status == 200) {
                            wx.showToast({
                                title: res.data.msg,
                                duration: 2000
                            })
                            //接着重新获取订单列表
                            setTimeout(() => {
                                var status = that.data.active
                                that.getOrder(status)
                            }, 2000)

                        }
                    })
                }
            }
        })
    },
    cancel: function (e) {
        var that = this
        //是否删除订单
        wx.showModal({
            title: '操作提示',
            content: "是否取消此订单？", //提示内容
            success(res) {
                if (res.confirm) {
                    //待发货 取消订单 
                    var id = e.currentTarget.dataset.id
                    API.ajax('cancelGroupOrder', {
                        id
                    }, function (res) {
                        if (res.status == 200) {
                            wx.showToast({
                                title: res.data.msg,
                                duration: 2000
                            })
                            //接着重新获取订单列表
                            setTimeout(() => {
                                var status = that.data.active
                                that.getOrder(status)
                            }, 2000)
                        }
                    })
                }
            }
        })

    },
    confirm: function (e) {
        var that = this
        //确认收货
        var id = e.currentTarget.dataset.id
        API.ajax('confirmGroupOrder', {
            id
        }, function (res) {
            if (res.status == 200) {
                wx.showToast({
                    title: res.data.msg,
                    duration: 2000
                })
                //接着重新获取订单列表
                setTimeout(() => {
                    var status = that.data.active
                    that.getOrder(status)
                }, 2000)

            }
        })
    },
    //tab 改变
    onChange(event) {
        var that = this
        var status
        var title = event.detail.title

        //修改active
        that.setData({
            active: event.detail.index
        })
        if (title == '全部') {
            status = 0
        } else if (title == '待付款') {
            status = 1
        } else if (title == '拼团中') {
            status = 2
        } else if (title == '待发货') {
            status = 3
        } else if (title == '待收货') {
            status = 4
        } else if (title == '退款中') {
            status = 5
        } else if (title == '已完成') {
            status = 6
        }
        that.getOrder(status)
    },
    openGroup: function () {
        wx.navigateTo({
            url: '/pages/group/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        //一开始 全部
        var status = 0
        that.getOrder(status)
    },


})