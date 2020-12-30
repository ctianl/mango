// pages/cart/index.js
const app = getApp()
var API = require('../../utils/api.js')
var {
    log
} = console

Page({
    data: {
        //tab
        active: 0,

        id: '',
        name: '',
        number: '',
        type: '',
        price: '',
        img: '',
        hasAddress: false,
        addressMsg: {},
        addressId: '',

        coupon_msg: '无优惠券可用',
        postage: '0.00',

        radio: '',
        icon: {
            normal: '',
            active: '/images/check (8).png',
        },

    },
    //radio
    onChange(event) {
        this.setData({
            radio: event.detail,
        });
    },

    onClick(event) {
        const {
            name
        } = event.currentTarget.dataset;
        this.setData({
            radio: name,
        });
    },

    tabChange(event) {
        this.setData({
            active: event.detail.index
        })
    },
    toAddress: function () {
        var that = this
        //有地址 到 收货地址
        var {
            id,
            name,
            price,
            img,
            number,
            type,active
        } = that.data

        // log('获取当前路由信息')


        //携带当前订单信息
        wx.navigateTo({
            url: `/pages/address/index?id=${id}&name=${name}&number=${number}&type=${type}&price=${price}&img=${img}&active=${active}`,
        })

    },

    chooseAddress: function () {
        var that = this
        var arr = []
        //获取地址
        API.ajax('getAddressList', {}, function (res) {
            if (res.status == 200) {
                var list = res.data.list
                if (list.length == 0) {
                    //页面 新增收货地址
                    wx.navigateTo({
                        url: '/pages/addAddress/index',
                    })
                } else {
                    //页面 地址列表选择
                    wx.navigateTo({
                        url: '/pages/address/index',
                    })
                }

            }
        })

    },

    //不要用onShow
    onLoad: function (options) {

        //先假设 ⭐
        // var options = {
        //     id: "2",
        //     name: "热门人气套餐|豪华房含双早，额外",
        //     number: "2",
        //     type: "2388元丽丝阁2晚+双早+旅拍+接送机+赠200元水疗代金",
        //     price: "0.02",
        //     img: "https://riyugo.com/i/2020/12/18/rcxbyu.png"
        // }

        log(options)

        var {
            id,
            name,
            number,
            type,
            price,
            img,
            active
        } = options


        var that = this
        that.setData({
            id,
            name,
            number,
            type,
            price,
            img,active
        })


        //先获取地址ID
        API.ajax('addressIdMsg', {}, function (res) {
            if (res.status == 200) {
                that.setData({
                    addressId: res.data.id,
                })

                //获取地址
                API.ajax('getAddress', {
                    id: that.data.addressId
                }, function (res) {
                    if (res.status == 200) {
                        log(res)
                        that.setData({
                            hasAddress: true,
                            addressMsg: res.data.address[0]
                        })
                    }
                })
            }
        })


    }
})