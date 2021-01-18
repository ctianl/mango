// pages/comment/index.js
var API = require('../../utils/api.js')
var {
    log
} = console

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //订单id
        id: '',

        comment: '',
        good_img: '',
        good_name: '',
        rate_value: 5,
        rate_msg: '非常差',
        hasImgList: true,
        imgList: [],
        fileList: [{
                url: 'https://img.yzcdn.cn/vant/leaf.jpg',
                name: '图片1',
            },
            // Uploader 根据文件后缀来判断是否为图片文件
            // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
            {
                url: 'http://iph.href.lu/60x60?text=default',
                name: '图片2',
                isImage: true,
                deletable: true,
            },
        ],
    },
    //删除已选图片
    del: function (e) {
        var that = this
        var index = e.currentTarget.dataset.index
        //然后获取 该索引下的值
        var imgList = that.data.imgList
        var value = imgList[index]
        var list = imgList.filter(e => {
            return e !== value
        })
        that.setData({
            imgList: list
        })
    },
    chooseImg: function () {
        var that = this
        //要求最多添加八张
        if (that.data.imgList.length == 8) {
            wx.showToast({
                title: '只能上传8张图片',
            })
        } else {
            wx.chooseImage({

                success: function (res) {
                    log(res)
                    var tempFilePaths = res.tempFilePaths
                    log(tempFilePaths)
                    that.data.imgList.push(...tempFilePaths)
                    that.setData({
                        imgList: that.data.imgList,
                        hasImgList: true
                    })
                    //   wx.uploadFile({
                    //     url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
                    //     filePath: tempFilePaths[0],
                    //     name:"file",
                    //     formData:{
                    //       "user":"test"
                    //     },
                    //     success: function(res){
                    //       var data = res.data
                    //       //do something
                    //     }
                    //   })
                }
            })
        }

    },
    onRateChange: function (e) {
        log(e)
        var value = e.detail
        var obj = {
            1: '非常差',
            2: '差',
            3: '一般',
            4: '好',
            5: '非常好',
        }
        this.setData({
            rate_msg: obj[value],
            rate_value: value
        })
    },
    comment: function () {
        var that = this
        var {
            id,
            rate_value,
            comment,
            imgList
        } = that.data
        //判断是否填写评价
        if (comment == '' || comment == null) {
            wx.showToast({
                icon: 'none',
                title: '请填写评价',
            })
        } else {
            API.ajax('addComment', {
                id,
                rate_value,
                comment,
                imgList
            }, function (res) {
                if (res.status == 200) {
                    wx.showToast({
                        title: res.data.msg,
                        duration: 2000
                    })
                    setTimeout(() => {
                        wx.reLaunch({
                          url: '/pages/order/index',
                        })
                    }, 2000)
                }
            })
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        // 获取改商品的图片和名称
        var id = options.id
        that.setData({
            id
        })
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
                    // 显示第一个商品
                    good_name: msg.good_list[0].name,
                    good_img: msg.good_list[0].img
                })
            }
        })
    },


})