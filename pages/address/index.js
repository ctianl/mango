// pages/address/index.js
const app = getApp()
var API = require('../../utils/api.js')
var {
    log
} = console


Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasAddress: false,
        list: [],

        radio: '1',

    },

    onChange(event) {
        var that = this
        that.setData({
            radio: event.detail,
        });

        //要返回订单确认页面
        //刷新

        //发送请求 修改地址ID
        API.ajax('addressIdMsg', {
            id: event.detail
        }, function (res) {
            if (res.status == 200) {
                //返回之前的订单确认页面
                var {
                    id,
                    name,
                    number,
                    type,
                    price,
                    img,
                    active
                } = that.data
                wx.navigateTo({
                    url: `/pages/confirm/index?id=${id}&name=${name}&number=${number}&type=${type}&price=${price}&img=${img}&active=${active}`,
                })
                log(wx.getStorageSync('addressId'))
            }

            //使用post才是修改
        }, 'post')
    },

    onClick(event) {
        const {
            name
        } = event.currentTarget.dataset;
        this.setData({
            radio: name,
        });
    },
    add: function (e) {
        //添加新地址
        //页面
        wx.navigateTo({
            url: '/pages/addAddress/index',
        })
    },
    edit: function (e) {
        //编辑
        var id = e.currentTarget.dataset.id

        //进入 编辑收货地址
        wx.navigateTo({
            url: `/pages/editAddress/index?id=${id}`,
        })

    },
    del: function (e) {
        var that = this
        //删除
        var id = e.currentTarget.dataset.id
        wx.showModal({
            content: '确定删除当前收货地址？',
            success(res) {
                if (res.confirm) {
                    //发送请求
                    API.ajax('delAddress', {
                        id
                    }, function (res) {
                        if (res.status == 200) {
                            //获取新的列表，
                            that.setData({
                                list: res.data.list
                            })
                        }
                    })
                } else if (res.cancel) {
                    //无操作
                }
            }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        //应该获取地址列表
        var {
            id,
            name,
            price,
            img,
            number,
            type,active
        } = options

        that.setData({
            id,
            name,
            price,
            img,
            number,
            type,active
        })

    },


    onShow: function () {
        var that = this
        //获取地址
        API.ajax('getAddressList', {}, function (res) {
            if (res.status == 200) {
                that.setData({
                    list: res.data.list
                })
                //应该判断list
                if (res.data.list.length == 0) {
                   
                } else {
                    that.setData({
                        hasAddress: true,
                    })
                }

            }
        })
    },


})