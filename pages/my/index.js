// pages/my/index.js
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
        isLogin: false,

        username: '',
        head_img: '',
        notoken_head_img: '/images/notoken.png',

        // 账户余额
        remain_data:'0',
        coupon_data:'0'
    },

    bindGetUserInfo: function (e) {
        log(e)
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            //插入登录的用户的相关信息到数据库
            
            wx.showLoading({
                title: '登录中……',
            })
            wx.login({
                success: res => {
                  //获取code
                  //发送接口
                  //携带code 和 用户信息
                  var code=res.code
                  var username=e.detail.userInfo.nickName
                  var avatarUrl=e.detail.userInfo.avatarUrl
                  //发送请求 获取用户信息
                  API.ajax('login', {
                      code,username,avatarUrl
                  }, function (res) {
                      log(res)
                    if (res.status == 200) {
                        //保存用户数据
                        //获取了token
                        wx.setStorageSync('token', res.data.token)
                        log(wx.getStorageSync('token'))
                        wx.setStorageSync('username', res.data.userInfo.userName)
                        wx.setStorageSync('head_img', res.data.userInfo.head_img)
                        //获取返回的用户信息
                        var userInfo=res.data.userInfo
                        log(userInfo)
                        wx.hideLoading()
                        that.setData({
                            isLogin:true,
                            username:userInfo.userName,
                            head_img:userInfo.head_img
                        })
                        wx.showToast({
                            icon: 'none',
                            title: res.data.msg,
                            duration: 2000
                          })
                    }
                  })
                }
              })

            // wx.request({
            //     url: app.globalData.urlPath + 'user/add',
            //     data: {
            //         openid: getApp().globalData.openid,
            //         nickName: e.detail.userInfo.nickName,
            //         avatarUrl: e.detail.userInfo.avatarUrl,
            //         province: e.detail.userInfo.province,
            //         city: e.detail.userInfo.city
            //     },
            //     header: {
            //         'content-type': 'application/json'
            //     },
            //     success: function (res) {
            //         //从数据库获取用户信息
            //         that.queryUsreInfo();
            //         console.log("插入小程序登录用户信息成功！");
            //     }
            // });
            //授权成功后，跳转进入小程序首页
            // wx.switchTab({
            //     url: '/pages/index/index'
            // })
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                    }
                }
            })
        }
    },
    //获取用户信息接口
    queryUsreInfo: function () {
        wx.request({
            url: app.globalData.urlPath + 'user/userInfo',
            data: {
                openid: app.globalData.openid
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res.data);
                getApp().globalData.userInfo = res.data;
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this
        //查看是否有token
    
        log(wx.getStorageSync('token'))
        if(wx.getStorageSync('token')){
            that.setData({
                isLogin:true,
                username:wx.getStorageSync('username'),
                head_img:wx.getStorageSync('head_img')
            })
        }

        // var that = this;
        // // 查看是否授权
        // wx.getSetting({
        //     success: function (res) {
        //         log(res)
        //         if (res.authSetting['scope.userInfo']) {
        //             wx.getUserInfo({
        //                 success: function (res) {
        //                     //从数据库获取用户信息
        //                     that.queryUsreInfo();
                        
        //                 }
        //             });
        //         }
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