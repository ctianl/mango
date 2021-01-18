// pages/group/index.js
var API = require('../../utils/api.js')
var {
    log
} = console

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        types: [],
        active: 0
    },

    toGoodMsg: function (e) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/groupGoodMsg/index?id=${id}`,
        })
    },
    getGroupOrder: function (type) {
        var that = this
        //获取订单
        API.ajax('getGroup', {
            type
        }, function (res) {
            if (res.status == 200) {
                var list = res.data.list
                list = list.map(e => {
                    e.good_price = Number(e.good_price).toFixed(2)
                    e.now_price = Number(e.now_price).toFixed(2)
                    return e
                })
                that.setData({
                    list
                })
            }
        })
    },
    //tab 改变
    onChange(event) {
        var that = this
        var title = event.detail.title
        var type
        //修改active

        //11 收纳
        //22 手账 
        //33 数码周边
        //44 文具
        that.setData({
            active: event.detail.index
        })
        if (title == '全部') {
            type = 0
        }
        else if (title == '收纳') {
            type = 11
        } else if (title == '手账') {
            type = 22
        } else if (title == '周边') {
            type = 33
        } else if (title == '文具') {
            type = 44
        }


        //重新获取
        that.getGroupOrder(type)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        //获取订单分类
        API.ajax('getGroupType', {}, function (res) {
            if (res.status == 200) {
                var types = res.data.types

                that.setData({
                    types
                })
            }
        })

        var type = 0
        that.getGroupOrder(type)

    },

})