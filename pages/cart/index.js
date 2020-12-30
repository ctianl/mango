// pages/cart/index.js
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
      isEdit:true,
      good_list:[],

      result: [],

      checked: false,
      sum_price:'',

      //全选时，array
      fullArr:[]

    },
    //全选 
    onRadioChange(event) {
      var that=this
      log(that.data.result)
      //点击后
      var result=event.detail
      if(result==true){
        //全选
        that.setData({
          result:that.data.fullArr
        })
      }else {
        that.setData({
          result:[]
        })
      }
      this.setData({
        checked: event.detail,
      });
    },

    //选择商品
    // 复选框
    onChange(event) {
      //假如都选了， 全选打勾
      //都没有选，  全选取消打勾

      log(this.data.fullArr)
      this.setData({
        result: event.detail,
      });
    },

    edit:function(){
      //开始编辑
      this.setData({
        isEdit:!this.data.isEdit
      })

    },
    finish:function(){
      //完成
      this.setData({
        isEdit:!this.data.isEdit
      })
    },
    toGoodMsg:function(e){
      //进入商品详情
      log(e)
      var id=e.currentTarget.dataset.id
      log(id)
      wx.navigateTo({
        url: `/pages/good-msg/index?id=${id}`,
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow:function(){
      var that=this

      API.ajax('getCartMsg', {}, function (res) {
        //这里既可以获取模拟的res
        if (res.status == 200) {
          var list=res.data.list
          var arr=[]
          if(list.length>0){
            list.forEach(e=>{
              arr.push(e.good_id)
            })
            that.setData({
              fullArr:arr
            })
          }
          that.setData({
            good_list:list
          })
        }
      });

    
    }

})