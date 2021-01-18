// pages/address/index.js
const app = getApp()
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
        hasAddress: false,
        list: [],

        radio: '1',

        editViewShow: false,
        containerShow: true
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
            id: event.detail,
            token
        }, function (res) {
            if (res.status == 200) {
                wx.navigateBack({
                    delta: 0,
                })

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


        log('有问题？')
        //进入 编辑收货地址

        //也要改顶部标题
        wx.setNavigationBarTitle({
            title: '编辑收货地址',
        })

        this.setData({
            editViewShow: true,
            containerShow: false,
            addressId: id
        })
        //获取地址
        var that = this
        API.ajax('getAddress', {
            id
        }, function (res) {
            if (res.status == 200) {
                that.setData({
                    addressMsg: res.data.address[0],
                    name: res.data.address[0].name,
                    phone: res.data.address[0].phone,
                    area: res.data.address[0].area,
                    address: res.data.address[0].address,
                    value: res.data.address[0].value

                })
                log(that.data.addressMsg)
            }
        })


        // wx.navigateTo({
        //   url: `/pages/editAddress/index?id=${id}`,
        // })
    },
    get: function () {
        var that = this
        wx.chooseLocation({
            success: function (res) {
                that.setData({
                    address: ''
                })
                that.setData({
                    address: res.address + res.name
                })
            }
        })
    },
    save: function () {
        var {
            name,
            phone,
            address
        } = this.data
        var that = this

        if (name == '' || name == null) {
            //手机号不符合要求
            wx.showToast({
                icon: 'none',
                title: '收货人不能为空',
                duration: 2000
            })
        } else if (phone == '' || phone == null) {

            wx.showToast({
                icon: 'none',
                title: '手机号不能为空',
                duration: 2000
            })
        } else if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(phone))) {
            wx.showToast({
                icon: 'none',
                title: '手机号格式不符合要求',
                duration: 2000
            })
        } else if (address == '' || address == null) {
            wx.showToast({
                icon: 'none',
                title: '请输入收货地址',
                duration: 2000
            })
        } else {
            //发送请求
            //保存地址
            //包括id
            var data = {
                id: that.data.addressId,
                name,
                phone,
                address
            }
            API.ajax('editAddress', data, function (res) {
                if (res.status == 200) {
                    //设置购物车数量
                    wx.showToast({
                            title: res.data.msg,
                            icon: 'success',
                            duration: 2000
                        }) /
                        setTimeout(() => {
                            //重新获取收货地址
                            //也要改顶部标题
                            wx.setNavigationBarTitle({
                                title: '收货地址',
                            })
                            that.getAddress()
                            that.setData({
                                editViewShow: false,
                                containerShow: true
                            })
                        }, 2000);
                }
            })
        }
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
                        id,
                        token
                    }, function (res) {
                        if (res.status == 200) {
                            //获取新的列表，
                            that.setData({
                                list: res.data.list
                            })

                            //还应该判断 长度
                            if (res.data.list.length == 0) {
                                that.setData({
                                    hasAddress: false
                                })
                            }
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

        var address_id = wx.getStorageSync('addressId')
        that.setData({
            radio: address_id
        })

        log(options)

    },

    //获取收货地址
    getAddress: function () {
        var that = this
        token = wx.getStorageSync('token')
        //获取地址
        API.ajax('getAddressList', {
            token
        }, function (res) {
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


    onShow: function () {
        this.getAddress()
    },


})