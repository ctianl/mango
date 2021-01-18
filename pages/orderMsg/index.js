// pages/orderMsg/index.js
var API = require('../../utils/api.js')
var {
    log
} = console

import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //订单信息
        id: '',
        good_id: '',
        order_sn: '',
        time: '',
        delivery_pay: '',
        actually_pay: '',
        all_sumPrice: '',
        status: '',
        address_name: '',
        address_phone: '',
        address_area: '',
        address_detail: '',
        good_list: [],
        sumNumber: ''
    },
    toGoodMsg:function(e){
        var good_id=e.currentTarget.dataset.good_id
        wx.navigateTo({
          url: `/pages/good-msg/index?id=${good_id}`,
        })
    },
    //去支付
    toPay: function () {
        var that = this
        log('付款')

        that.setData({
            showChoosePay: true
        })
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
    confirm: function () {
        var that = this
        //获取订单ID
        var id = that.data.id

        Dialog.confirm({
                title: '操作提示',
                message: '是否已收货？',
            })
            .then(() => {
                // on confirm

                //发送请求，确认收货
                API.ajax('confirmTakeDelivery', {
                    id
                }, function (res) {
                    if (res.status == 200) {
                        wx.showToast({
                            title: res.data.msg,
                            duration: 2000
                        })
                        //返回order list
                        setTimeout(() => {
                            wx.reLaunch({
                                url: '/pages/order/index',
                              })
                        
                        }, 2000)
                    }
                })
            })
            .catch(() => {
                // on cancel
                //无操作
            });
    },
    //取消订单
    del: function () {
        var that = this
        //获取订单ID
        var id = that.data.id
        Dialog.confirm({
                title: '操作提示',
                message: '确定要取消该订单吗？',
            })
            .then(() => {
                // on confirm

                //发送请求，删除此订单
                API.ajax('delOrder', {
                    id
                }, function (res) {
                    if (res.status == 200) {
                        wx.showToast({
                            title: res.data.msg,
                            duration: 2000
                        })
                        //返回order list
                        setTimeout(() => {
                            wx.reLaunch({
                                url: '/pages/order/index',
                              })
                        }, 2000)

                    }
                })
            })
            .catch(() => {
                // on cancel
                //无操作
            });
    },
    cancel:function(){
        var that = this
        //获取订单ID
        var id = that.data.id
        Dialog.confirm({
                title: '操作提示',
                message: '确定要取消该订单吗？',
            })
            .then(() => {
                // on confirm

                API.ajax('cancelOrder', {
                    id
                }, function (res) {
                    if (res.status == 200) {
                        wx.showToast({
                            title: res.data.msg,
                            duration: 2000
                        })
                        //返回order list
                        setTimeout(() => {
                            wx.reLaunch({
                                url: '/pages/order/index',
                              })
                        }, 2000)

                    }
                })
            })
            .catch(() => {
                // on cancel
                //无操作
            });
    },
    comment: function () {
        var id = this.data.id
        wx.navigateTo({
            url: `/pages/comment/index?id=${id}`,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var id = options.id
        // var id = 1
        API.ajax('getOrderMsg', {
            id
        }, function (res) {
            if (res.status == 200) {
                var msg = res.data.msg
                log(msg)
                that.setData({
                    id: msg.id,
                    good_id: msg.good_id,
                    order_sn: msg.order_sn,
                    time: msg.time,
                    delivery_pay: msg.delivery_pay,
                    actually_pay: msg.actually_pay,
                    status: msg.status,
                    address_name: msg.address_name,
                    address_phone: msg.address_phone,
                    address_area: msg.address_area,
                    address_detail: msg.address_detail,
                    good_list: msg.good_list,
                    all_sumPrice: msg.all_sumPrice,
                    sumNumber: msg.sumNumber
                })
            }
        })
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

})