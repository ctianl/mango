//index.js
//获取应用实例
const app = getApp()
var API = require('../../utils/api.js')
var {
    log
} = console

Page({
    data: {
        id:'',
        name:'',
        list:[]

    },
    onLoad: function (options) {
        var that=this
        log(options)
        var id = options.id
        that.setData({
            id
        })
        //发送请求
        //携带id参数
        API.ajax('getItemMsg', {
            id
        }, function (res) {
            //这里既可以获取模拟的res
            console.log(res)
            if (res.status == 200) {
                //还要设置navbarTitle
                wx.setNavigationBarTitle({
                    title: res.data.name
                  })
                that.setData({
                    name:res.data.name,
                    list: res.data.list
                })
            }
        });
    }
})