//index.js
//获取应用实例
const app = getApp()
var API = require('../../utils/api.js')
var {
  log
} = console

Page({
  data: {
    //商品id
    id: '',

    //swiper
    autoplay: false,
    interval: 10000,

    sum: '',
    currentIndex: 1,
    popShow: false,

    step: 1,
    showStepNumber: 0,

    isChooseType: false,
    types: [],
    //默认第一个的
    chooseType: '',

    info: 0,
    share_show: false,
    actions: [{
        name: '生成商品海报',
        id:1
      },
      {
        name: '发送给朋友',
        id:2,
        openType: 'share',
      },
      {
        name: '取消',
        id:3
      },
    ],
    sharePicShow:false,
    canvasHidden:false,


  },
  //点击分享
  share: function () {
    this.setData({
      share_show: true
    })
  },
  closeShare: function () {
    this.setData({
      sharePicShow: false
    })
  },

  onSelectShare: function (event) {
    var detail=event.detail
    if(detail.id==1){
      //商品海报
      
      //弹框
      this.setData({
        share_show: false,
        sharePicShow:true
      })

      log('商')
    }else if(detail.id==2){
      //发送好友
      log('好友')
    }else if(detail.id==3){
      this.setData({
        share_show: false
      })
    }

  },
  //点击 保存图片
  savePic:function(e){
    var img_url = e.currentTarget.dataset.url;
    log(e)
    log(img_url)
    this.setData({
      sharePicShow: false
    })

    log(111)
    //  首先获取图片信息，得到图片的路径；
        wx.getImageInfo({
          src: img_url,
          success(res) {
            log(res)
    //  然后使用saveImageToPhotosAlbum保存图片到本地，到这会询问用户是否打开相册权限；如果他允许即保存成功；
            wx.saveImageToPhotosAlbum({
              filePath: res.path,
              success(e) {
                wx.showToast({
                  title: '保存成功',
                  icon: 'none',
                  duration: 2000
                })
              },
              fail(e) {
    //  如果他不允许，图片保存失败，我们使用getSetting获取用户授权信息，如果用户没有允许writePhotosAlbum权限，
    //  使用openSetting打开授权页，让客户手动打开授权，即可成功保存图片；
                wx.getSetting({
                  success(res) {
                    if (!res.authSetting["scope.writePhotosAlbum"]) {
                      wx.showModal({
                        title: '警告',
                        content: '请打开相册权限，否则无法保存图片到相册',
                        success(res) {
                          if (res.confirm) {
                            wx.openSetting({
                              success(res) {
                                console.log(res)
                              }
                            })
                          } else if (res.cancel) {
                            wx.showToast({
                              title: '取消授权',
                              icon: "none",
                              duration: 2000
                            })
                          }
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        })
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  //生命周期函数
  onLoad: function (options) {
    var that = this
    var id = options.id
    // var id = 1

    //购物车数量
    var cart_list = wx.getStorageSync('cart_list') == null || wx.getStorageSync('cart_list') == '' ? [] : JSON.parse(wx.getStorageSync('cart_list'))
    var cart_num = cart_list.length
    log(cart_num)
    that.setData({
      info: cart_num
    })

    // var id = 2
    that.setData({
      id
    })
    API.ajax('getGoodMsg', {
      id
    }, function (res) {
      //这里既可以获取模拟的res
      if (res.status == 200) {
        //编辑types
        var chooseType
        if ('types' in res.data) {
          res.data.types.forEach(type => {
            if (type.isChoose == true) {
              //记录id
              chooseType = type.name
            }
          })
        }
        that.setData({
          head_imgs: res.data.head_imgs,
          name: res.data.name,
          price: res.data.price,
          sale: res.data.sale,
          stock: res.data.stock,
          intro_imgs: res.data.intro_imgs,
          sum: res.data.head_imgs.length,
          isChooseType: res.data.isChooseType,
          types: res.data.types,
          chooseType
        })
      }
    });
  },
  stepChange: function (event) {
    this.setData({
      step: event.detail
    })

  },

  //选择类型
  chooseType: function (e) {
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.data.types.forEach(type => {
      if (type.id == id) {
        type.isChoose = true
      } else {
        type.isChoose = false
      }
    })
    this.setData({
      types: this.data.types,
      chooseType: name
    })
  },
  //联系客服
  chat: function () {
    wx.navigateTo({
      url: '/pages/chat/index',
    })
  },

  //进入购物车
  cart: function () {

    wx.switchTab({
      url: '/pages/cart/index',
    })
  },

  //加入购物车
  enter_cart: function () {
    //获取步进器的值
    //加入购物车成功
    var that = this


    //发送请求

    that.setData({
      popShow: false,

    })

    //获取商品ID 名称 类型 数量 价格
    var data = {
      good_id: that.data.id,
      number: that.data.step,
      type: that.data.chooseType,
      name: that.data.name,
      price: that.data.price,
      img: that.data.head_imgs[0]
    }

    //发送请求
    API.ajax('addCart', data, function (res) {
      if (res.status == 200) {
        //设置购物车数量
        log(res)
        that.setData({
          info: res.data.cart_num
        })
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000
        })
      }
    })


  },
  //立即购买
  quick_buy: function () {
    //订单确认
    var that = this
    var {
      id,
      name,
      price
    } = that.data
    var number = that.data.step
    var type = that.data.chooseType
    var img = that.data.head_imgs[0]

    //携带商品名称 数量 价格 
    log(id)
    log(name)
    log(price)
    log(img)
    log(type)

    wx.navigateTo({
      url: `/pages/confirm/index?id=${id}&name=${name}&number=${number}&type=${type}&price=${price}&img=${img}&active=0`,
    })
  },

  swiperChange(e) {
    let current = e.detail.current;
    this.setData({
      currentIndex: current + 1
    })

  },
  chooseNumber: function () {
    //弹出
    this.setData({
      popShow: !this.data.popShow
    })
  },
  onClose() {
    this.setData({
      popShow: false
    })
  },


})