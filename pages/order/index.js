// pages/order/index.js
var API = require('../../utils/api.js')
var {
    log
} = console

var token = wx.getStorageSync('token')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //订单状态
        //1 待付款
        //2 待发货
        //3 待收货
        //4 待评价
        //5 已完成
        //6 退款中

        active: 0,
        list: [],
        showChoosePay: false,
        codeImg: '',
        showPayCode: false

    },
    getOrderList: function (id) {
        var that = this
        wx.showNavigationBarLoading()
        API.ajax('getOrderList', {
            id,
            token
        }, function (res) {
            wx.hideNavigationBarLoading()
            log(res)
            if (res.status == 200) {
                that.setData({
                    list: res.data.list
                })
            }
        })
    },
    del: function (e) {
        var that = this
        //获取订单ID
        var id = e.currentTarget.dataset.id
        //是否删除订单
        wx.showModal({
            title: '操作提示',
            content: "是否取消此订单？", //提示内容
            success(res) {
                if (res.confirm) {
                    //发送请求，删除此订单
                    API.ajax('delOrder', {
                        id
                    }, function (res) {
                        if (res.status == 200) {
                            wx.showToast({
                                title: res.data.msg,
                            })
                            //重新加载列表数据
                            that.getOrderList(0)
                            // wx.showNavigationBarLoading()
                            // API.ajax('getOrderList', {
                            //     id: 0
                            // }, function (res) {
                            //     wx.hideNavigationBarLoading()
                            //     log(res)
                            //     if (res.status == 200) {
                            //         that.setData({
                            //             list: res.data.list
                            //         })
                            //     }
                            // })
                        }
                    })
                }
            }
        })

    },
    //取消
    cancel: function (e) {
        var that = this
        //获取订单ID
        var id = e.currentTarget.dataset.id

        //是否删除订单
        wx.showModal({
            title: '操作提示',
            content: "是否取消此订单？", //提示内容
            success(res) {
                if (res.confirm) {
                    //发送请求，删除此订单
                    API.ajax('cancelOrder', {
                        id
                    }, function (res) {
                        if (res.status == 200) {
                            wx.showToast({
                                title: res.data.msg,
                            })
                            //重新加载列表数据
                            that.getOrderList(0)

                            // wx.showNavigationBarLoading()
                            // API.ajax('getOrderList', {
                            //     id: 0
                            // }, function (res) {
                            //     wx.hideNavigationBarLoading()
                            //     log(res)
                            //     if (res.status == 200) {
                            //         that.setData({
                            //             list: res.data.list
                            //         })
                            //     }
                            // })
                        }
                    })
                }
            }
        })

    },
    //付款
    pay: function (e) {
        var that = this
        log('付款')

        that.setData({
            showChoosePay: true
        })

        //选择二维码支付还是余额支付

    },

    //选择微信支付
    wechat_pay: function () {
        var that = this
        log('wechat')
        //加载中

        wx.showLoading({
            title: '正在处理……',
            icon: 'none',
        })
        //发送请求
        // getPayCode

        API.ajax('getPayCode', {}, function (res) {
            wx.hideLoading()
            console.log('没有')
            if (res.status == 200) {
                //打开一个新的弹窗
                that.setData({
                    showPayCode: true,
                    codeImg: res.data.img,
                    //关闭
                    showChoosePay: false
                })
            }
        })


    },
    //选择余额支付
    balance_pay: function () {
        log('balance')
    },

    //关闭 选择支付方式 的弹出层
    onCloseChoosePay() {
        this.setData({
            showChoosePay: false
        });
    },
    onClosePayCode: function () {
        this.setData({
            showPayCode: false
        });
    },
    //确认收货
    confirm: function (e) {
        log('确认')
        var that = this
        log('取消')
        //获取订单ID
        var id = e.currentTarget.dataset.id

        wx.showModal({
            title: '操作提示',
            content: "是否已收货？", //提示内容
            success(res) {
                if (res.confirm) {
                    //发送请求，确认收货
                    API.ajax('confirmTakeDelivery', {
                        id
                    }, function (res) {
                        if (res.status == 200) {
                            wx.showToast({
                                title: res.data.msg,
                            })
                            //重新加载列表数据
                            that.getOrderList(0)

                            // wx.showNavigationBarLoading()
                            // API.ajax('getOrderList', {
                            //     id: 0
                            // }, function (res) {
                            //     wx.hideNavigationBarLoading()
                            //     log(res)
                            //     if (res.status == 200) {
                            //         that.setData({
                            //             list: res.data.list
                            //         })
                            //     }
                            // })
                        }
                    })
                }
            }
        })

    },

    //评价
    comment: function (e) {
        //携带商品信息  订单id
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/comment/index?id=${id}`,
        })

    },
    toMsg: function (e) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/orderMsg/index?id=${id}`,
        })
    },

    onChange(event) {
        var that = this
        var id
        var title = event.detail.title
        if (title == '全部') {
            id = 0
        } else if (title == '待付款') {
            id = 1
        } else if (title == '待发货') {
            id = 2
        } else if (title == '待收货') {
            id = 3
        } else if (title == '待评价') {
            id = 4
        } else if (title == '已完成') {
            id = 5
        } else if (title == '退款中') {
            id = 6
        }
        that.getOrderList(id)

        // wx.showNavigationBarLoading()
        // API.ajax('getOrderList', {
        //     id
        // }, function (res) {
        //     wx.hideNavigationBarLoading()
        //     log(res)
        //     if (res.status == 200) {
        //         that.setData({
        //             list: res.data.list
        //         })
        //     }
        // })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        token = wx.getStorageSync('token')

        var id
        //查看是否有id
        if ('id' in options) {
            id = options.id
            this.setData({
                active: id
            })
        } else {
            id = 0
        }

        var that = this
        //判断
        //全部 0
        //待付款 1
        //待发货 2
        //待收货 3
        //待评价 4

        //获取全部
        that.getOrderList(id)

        // wx.showNavigationBarLoading()
        // API.ajax('getOrderList', {
        //     id
        // }, function (res) {
        //     wx.hideNavigationBarLoading()
        //     log(res)
        //     if (res.status == 200) {
        //         that.setData({
        //             list: res.data.list
        //         })
        //     }
        // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})