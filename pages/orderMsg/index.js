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
        all_sumPrice:'',
        status: '',
        address_name: '',
        address_phone: '',
        address_area: '',
        address_detail: '',
        good_list:[],
        sumNumber:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        // var id=options.id
        var id = 1
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
                    good_list:msg.good_list,
                    all_sumPrice:msg.all_sumPrice,
                    sumNumber:msg.sumNumber
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