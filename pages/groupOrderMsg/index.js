// pages/groupOrderMsg/index.js
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
        id:'',
        good_id:'',
        order_sn:'',
        time: '',
        status: '',
        number:'',
        single_price: '' ,
        sum_price:'' ,
        delivery_price:'' ,
        actual_price:'',
        address_name: '',
        address_phone: '',
        address_area:'',
        address_detail: '',
        img:'',
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
                API.ajax('confirmGroupOrder', {
                    id
                }, function (res) {
                    if (res.status == 200) {
                        wx.showToast({
                            title: res.data.msg,
                            duration: 2000
                        })
                        //返回order list
                        setTimeout(() => {
                            wx.navigateTo({
                                url: '/pages/groupOrder/index',
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
                API.ajax('delGroupOrder', {
                    id
                }, function (res) {
                    if (res.status == 200) {
                        wx.showToast({
                            title: res.data.msg,
                            duration: 2000
                        })
                        //返回order list
                        setTimeout(() => {
                            wx.navigateTo({
                                url: '/pages/groupOrder/index',
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
    cancel: function () {
        var that = this
        //获取订单ID
        var id = that.data.id
        Dialog.confirm({
                title: '操作提示',
                message: '确定要取消该订单吗？',
            })
            .then(() => {
                // on confirm

                API.ajax('cancelGroupOrder', {
                    id
                }, function (res) {
                    if (res.status == 200) {
                        wx.showToast({
                            title: res.data.msg,
                            duration: 2000
                        })
                        //返回order list
                        setTimeout(() => {
                            wx.navigateTo({
                                url: '/pages/groupOrder/index',
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
    toGoodMsg:function(){
        //去 商品详情
        var good_id=this.data.good_id
        wx.navigateTo({
          url: `/pages/good-msg/index?id=${good_id}`,
        })
    },
    // comment: function () {
    //     var id = this.data.id
    //     wx.navigateTo({
    //         url: `/pages/comment/index?id=${id}`,
    //     })
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var id = options.id
        // log(id)
        // var id = 1
        API.ajax('getGroupOrderMsg', {
            id
        }, function (res) {
            if (res.status == 200) {
                var msg = res.data.msg
                log(msg)
                that.setData({
                    id: msg.id,
                    order_sn: msg.order_sn,
                    time: msg.time,
                    good_id:msg.good_id,
                    status: msg.status,
                    good_name:msg.good_name,
                    number: msg.number,
                    single_price: Number(msg.single_price).toFixed(2) ,
                    sum_price:Number(msg.sum_price).toFixed(2) ,
                    delivery_price:Number(msg.delivery_price).toFixed(2) ,
                    actual_price:Number(msg.actual_price).toFixed(2) ,
                    address_name: msg.address_name,
                    address_phone: msg.address_phone,
                    address_area: msg.address_area,
                    address_detail: msg.address_detail,
                    img: msg.img,
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