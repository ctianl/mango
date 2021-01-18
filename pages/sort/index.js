//index.js
//获取应用实例
const app = getApp()
var API = require('../../utils/api.js')
var {
  log
} = console

Page({
  data: {
    list:[],
    showList:[],
    activeKey: 0,
    
    active:0,
    ind:0,
    id:0

  },

  changeItem:function(e){
    log('?')
    var that=this
    var id=e.currentTarget.dataset.id
    that.setData({
      id,
      ind:e.currentTarget.dataset.index
    })
    log(id)
    that.data.list.forEach(e=>{
      if(e.id==id){
        that.setData({
          showList:e.types
        })
        log(that.data.showList)
      }
    })
  },
  search:function(){
      //默认看到全部
      wx.navigateTo({
        url: '/pages/good-list/index?type=0',
      })
  },

  toSpec:function(e){
    var id=e.currentTarget.dataset.id
    //进入列表
    wx.navigateTo({
      url: `/pages/good-list/index?id=${id}`,
    })

  },
  onLoad:function(){
      var that=this
      //获取分类
      API.ajax('indexSortList', {}, function (res) {
        if (res.status == 200) {
          log(res.data.sort_list)
          //设置购物车数量
          res.data.sort_list.unshift({
            id:0,
            name: '全部',
            types:[{
              id:0,
              name:'全部',
              img:'https://static1.cxy61.com/bcgame_face2face/1/2d14a2b616401789750ff735c87f97db_v.jpg-750x1000'
            }]
          })
          log(res.data.sort_list)

            that.setData({
                list:res.data.sort_list,
                showList:res.data.sort_list[0].types
            })
            log(that.data.list)
        
        }
      })
  }
})
