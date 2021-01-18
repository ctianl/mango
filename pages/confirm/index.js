// pages/cart/index.js
const app = getApp()
var API = require('../../utils/api.js')
var token = wx.getStorageSync('token')
var {
    log
} = console

function add0(m) {
    return m < 10 ? '0' + m : m
}

function dateFormat(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

function formatSn(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + add0(m) + add0(d) + add0(h) + add0(mm) + add0(s);
}
Page({
    data: {
        activeNames: ['1'],


        //tab
        active: 0,

        good_list: [],

        sum_price: 0,
        sum_number: 0,
        order_sum_price: 0,

        hasAddress: false,
        addressMsg: {},
        addressId: '',

        coupon_msg: '无优惠券可用',
        postage: 4,

        radio: '',
        couponRadio: 0,

        icon: {
            normal: '',
            active: '/images/check (8).png',
        },

        myCouponList: [],

        show: false,
        animation: 'slide-up',

        chooseCoupon: '不使用优惠券',

    },
    submitOrder: function () {
        //应该判断，这是普通订单还是拼团订单
        var type = wx.getStorageSync('order_type') //common group
        var that = this

        if (type == 'common') {
            //只要点击确认订单，那么这就是一个待支付订单
            log(JSON.parse(wx.getStorageSync('cartGood')))
            var good_list = JSON.parse(wx.getStorageSync('cartGood'))
            good_list.forEach(good => {
                good['good_id'] = good['id']
            })
            //时间戳转换
            var time = dateFormat(Date.parse(new Date()))
            var order_sn = formatSn(Date.parse(new Date())) + '01'

            var address = wx.getStorageSync('address')==''||wx.getStorageSync('address')==null?[]:JSON.parse(wx.getStorageSync('address'))
            var {
                name: address_name,
                phone: address_phone,
                area: address_area,
                address: address_detail
            } = address


            //调用一个接口，返回一个订单id

            var orderList =wx.getStorageSync('orderList')==''||wx.getStorageSync('orderList')==null?[]: JSON.parse(wx.getStorageSync('orderList'))
            //获取最后一个订单的id
            var lastId = orderList.length==0?1: orderList[orderList.length - 1].id
            var tempOrder = {
                id: lastId + 1,
                order_sn,
                time,
                good_list,
                //商品总金额
                all_sumPrice: that.data.sum_price,
                //共多少件商品
                sumNumber: that.data.sum_number,
                //运费
                delivery_pay: that.data.postage,
                //订单总金额
                actually_pay: that.data.order_sum_price,
                address_name,
                address_phone,
                address_area,
                address_detail,
                status: 1,
            }

            orderList.push(tempOrder)
            wx.setStorageSync('orderList', JSON.stringify(orderList))


            //提交订单
            //判断是否选择了支付方式
            if (this.data.hasAddress == false) {
                wx.showToast({
                    title: '请选择配送地址',
                    icon: 'none'
                })
            } else if (this.data.radio == '') {
                wx.showToast({
                    title: '请选择支付方式',
                    icon: 'none'
                })
            } else {
                log('提交订单')

                //没有服务器，使用不了wx.requestPayment() 
                //直接进入订单列表
                wx.reLaunch({
                    url: '/pages/order/index',
                  })

                // wx.login({
                //     success: function (res) {
                //         //获取code
                //         var code = res.code
                //         //当前 订单id
                //         var order_id = lastId + 1

                //         //获取requestPayment的参数
                //         // API.ajax('getPaymentPara', {
                //         //     token,
                //         //     code,
                //         //     order_id
                //         // }, function (dres) {
                //         //     var data=dres.data.data
                //         //     if (dres.status == 200) {
                //         //         wx.requestPayment({
                //         //             'timeStamp': data.timeStamp,
                //         //             'nonceStr': data.nonceStr,
                //         //             'package': data.package,
                //         //             'signType':data.signType,
                //         //             'paySign': data.paySign,
                //         //             'success': function (res) {
                //         //                 log(res)
                //         //             },
                //         //             'fail': function (res) {
                //         //                 log(res)
                //         //             },
                //         //         })
                //         //     }
                //         // })


                //     }
                // })

            }
        } else if (type == 'group') {
            //只要点击确认订单，那么这就是一个待支付订单
            log(JSON.parse(wx.getStorageSync('cartGood')))
            var good_list = JSON.parse(wx.getStorageSync('cartGood'))
            good_list.forEach(good => {
                good['good_id'] = good['id']
            })
            var msg=good_list[0]
            //时间戳转换
            var time = dateFormat(Date.parse(new Date()))
            var order_sn = formatSn(Date.parse(new Date())) + '01'

            var address =wx.getStorageSync('address')==''||wx.getStorageSync('address')==null?[]: JSON.parse(wx.getStorageSync('address'))
            var {
                name: address_name,
                phone: address_phone,
                area: address_area,
                address: address_detail
            } = address

            //调用一个接口，返回一个订单id

            var groupOrderList =wx.getStorageSync('groupOrderList')==''||wx.getStorageSync('groupOrderList')==null?[]: JSON.parse(wx.getStorageSync('groupOrderList'))
            //获取最后一个订单的id
            var lastId = groupOrderList.length==0?1: groupOrderList[groupOrderList.length - 1].id
            var tempOrder = {
                id: lastId,
                order_sn,
                time,
                status: 1,
                good_name: msg.name,
                good_id:msg.good_id,
                //数量
                number: msg.name,
                //单价
                single_price: msg.price,
                //总价
                sum_price: that.data.sum_price,
                //配送费用
                delivery_price: that.data.postage,
                //实际费用
                actual_price:that.data.order_sum_price,
                address_name,
                address_phone,
                address_area,
                address_detail,
                img: msg.img
            }


            groupOrderList.push(tempOrder)
            wx.setStorageSync('groupOrderList', JSON.stringify(groupOrderList))

            //提交订单
            //判断是否选择了支付方式
            if (this.data.hasAddress == false) {
                wx.showToast({
                    title: '请选择配送地址',
                    icon: 'none'
                })
            } else if (this.data.radio == '') {
                wx.showToast({
                    title: '请选择支付方式',
                    icon: 'none'
                })
            } else {
                log('提交订单')
                wx.reLaunch({
                    url: '/pages/groupOrder/index',
                })

            }
        }


    },
    collapse: function () {
        log('click')
        if (this.data.show == false||this.data.show == 'false') {
            log(1)
            this.setData({
                show: true,
                animation: 'slide-down'
            })
        } else {
            log(2)
            this.setData({
                show: false,
                animation: 'slide-down'
            })
        }
    },
    //radio
    onChange(event) {
        log(event.currentTarget.dataset)
        this.setData({
            radio: event.detail,
        });
    },
    onCouponChange2(event) {

    },
    onClick(event) {
        const {
            name
        } = event.currentTarget.dataset;
        this.setData({
            radio: name,
        });
    },
    onClickRadio: function (event) {
        log(event.currentTarget.dataset)
        log('radio click')
    },
    onCouponClick(event) {
        const {
            name,
            type,
            condition,
            discount,
            coupon_name
        } = event.currentTarget.dataset;

        //要获取 1、优惠券类型 2、使用条件 3、优惠值

        log(type)
        log(condition)
        log(discount)

        var sum_price = this.data.sum_price
        if (type == 'discount') {
            //打折
            sum_price = sum_price * discount
        } else if (type == 'rebate') {
            //满减
            sum_price = sum_price - discount
        } else {
            //不使用优惠券
            sum_price = sum_price
        }

        this.setData({
            couponRadio: name,
            order_sum_price: Number(Number(sum_price) + Number(this.data.postage)).toFixed(2),
            chooseCoupon: coupon_name
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
            type,
            active
        } = that.data

        // log('获取当前路由信息')

        //携带当前订单信息
        wx.navigateTo({
            url: `/pages/address/index?id=${id}&name=${name}&number=${number}&type=${type}&price=${price}&img=${img}&active=${active}`,
        })

    },

    chooseAddress: function () {
        log('为啥没有反应')
        //获取地址
        API.ajax('getAddressList', {
            token
        }, function (res) {
            log(res)
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
    onShow: function () {
        var that = this
        token = wx.getStorageSync('token')
        //先获取地址ID
        API.ajax('addressIdMsg', {
            token
        }, function (res) {
            log(res)
            if (res.status == 200) {
                that.setData({
                    addressId: res.data.id,
                })
                //获取地址
                API.ajax('getAddress', {
                    id: that.data.addressId
                }, function (res) {
                    log(res)
                    if (res.status == 200) {
                        log(res)
                        that.setData({
                            hasAddress: true,
                            addressMsg: res.data.address[0]
                        })
                    } else if (res.status == 400) {
                        //无配送地址
                        that.setData({
                            hasAddress: false,
                        })
                    }
                })
            }
        }, 'get')
    },
    //不要用onShow
    onLoad: function (options) {
        var that = this
        //使用了本地储存数据
        var good_list = JSON.parse(wx.getStorageSync('cartGood'))

        var sum_price = 0
        var sum_number = 0


        log(good_list)

        //获取总的商品数量，和总价格
        good_list.forEach(e => {
            sum_price += Number(e.price * e.number),
                sum_number += e.number
        })

        that.setData({
            good_list,
            sum_price: Number(sum_price).toFixed(2),
            sum_number,
            order_sum_price: Number(Number(sum_price) + Number(that.data.postage)).toFixed(2),
        })


        //订单总金额 商品总金额+配送费用

        log(that.data.order_sum_price)

        //获取我的优惠券
        API.ajax('getMyCouponsList', {
            //未使用的优惠券
            token,
            status: 1
        }, function (res) {
            log(res)
            if (res.status == 200) {
                res.data.list.unshift({
                    id: 0,
                    name: '不使用优惠券',
                    condition: 0
                })
                that.setData({
                    myCouponList: res.data.list,
                })
                log(that.data.myCouponList)
            }
        })




    }
})