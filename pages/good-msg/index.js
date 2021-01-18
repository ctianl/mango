//index.js
//获取应用实例
const app = getApp()
var API = require('../../utils/api.js')
var {
  log
} = console
var token = wx.getStorageSync('token')

Page({
  data: {
    showLogin: false,
    isShowTop: false,
    //商品id
    id: '',
    //swiper
    autoplay: false,
    interval: 10000,

    sum: '',
    currentIndex: 1,
    popShow: false,
    showNav:true,

    step: 1,
    showStepNumber: 0,

    isChooseType: false,
    isChooseSize: false,
    types: [],
    //默认第一个的
    chooseType: '',

    info: 0,
    share_show: false,
    actions: [{
        name: '生成商品海报',
        id: 1
      },
      {
        name: '发送给朋友',
        id: 2,
        openType: 'share',
      },
      {
        name: '取消',
        id: 3
      },
    ],
    sharePicShow: false,
    canvasHidden: false,

    //打开单独的商品图片
    showImg: false,
    'showItemName': '',
    'showItemImg': '',


    naviList: [{
      img: '/images/homewhite.png',
      path: '/pages/index/index'
    }, {
      img: '/images/searchwhite.png',
      path: '/pages/sort/index'
    }, {
      img: '/images/cartwhite.png',
      path: '/pages/cart/index'
    }, {
      img: '/images/mywhite.png',
      path: '/pages/my/index'
    }]

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
    var detail = event.detail
    if (detail.id == 1) {
      //商品海报

      //弹框
      this.setData({
        share_show: false,
        sharePicShow: true
      })

      log('商')
    } else if (detail.id == 2) {
      //发送好友
      log('好友')
    } else if (detail.id == 3) {
      this.setData({
        share_show: false
      })
    }

  },
  //应该监听page的scroll
  onPageScroll: function (e) {
    var scrollTop = e.scrollTop
    if (scrollTop > 450) {
      this.setData({
        isShowTop: true
      })
    } else {
      this.setData({
        isShowTop: false
      })
    }
  },
  //回到顶部
  toTop: function () {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  openPic: function (e) {
    var name = e.currentTarget.dataset.name
    var img = e.currentTarget.dataset.img
    this.setData({
      showItemImg: img,
      showItemName: name,
      showImg: true
    })

  },
  closeImg: function () {
    this.setData({
      showImg: false
    })
  },
  //点击 保存图片
  savePic: function (e) {
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
    var good_id = options.id
    // var good_id = 4

    //购物车数量
    var cart_list = wx.getStorageSync('cart_list') == null || wx.getStorageSync('cart_list') == '' ? [] : JSON.parse(wx.getStorageSync('cart_list'))
    var cart_num = cart_list.length
    log(cart_num)
    that.setData({
      info: cart_num
    })

    // var id = 2
    that.setData({
      id: good_id
    })
    API.ajax('getGoodMsg', {
      good_id
    }, function (res) {
      //这里既可以获取模拟的res
      if (res.status == 200) {
        //编辑types
        var chooseType
        // if ('types' in res.data) {
        //   res.data.types.forEach(type => {
        //     if (type.isChoose == true) {
        //       //记录id
        //       chooseType = type.name
        //     }
        //   })
        // }
        log(res)
        that.setData({
          topImg: res.msg.head_imgs[0],
          head_imgs: res.msg.head_imgs,
          name: res.msg.name,
          price: res.msg.price,
          sale: res.msg.sale,
          stock: res.msg.stock,
          intro_imgs: res.msg.intro_imgs,
          sum: res.msg.head_imgs.length,
          isChooseType: res.msg.isChooseType,
          isChooseSize: res.msg.isChooseSize,
          types: res.msg.types,
          sizes: res.msg.sizes,
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

  //选择尺寸
  chooseSize: function (e) {
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name

    this.data.sizes.forEach(type => {
      if (type.id == id) {
        type.isChoose = true
      } else {
        type.isChoose = false
      }
    })
    this.setData({
      sizes: this.data.sizes,
      chooseSize: name,
    })
  },

  //选择类型
  chooseType: function (e) {
    var id = e.currentTarget.dataset.type_id
    var name = e.currentTarget.dataset.name
    var img = e.currentTarget.dataset.img

    log(this.data.types)
    this.data.types.forEach(type => {
      if (type.type_id == id) {
        type.isChoose = true
      } else {
        type.isChoose = false
      }
    })
    this.setData({
      types: this.data.types,
      chooseType: name,
      topImg: img
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
    //是否登录
    if (token == '' || token == null) {
      this.setData({
        showLogin: true
      })
    } else {
      //获取步进器的值
      //加入购物车成功
      var that = this

      //发送请求

      that.setData({
        popShow: false,
        showNav:true

      })

      //获取商品ID 名称 类型 数量 价格
      var data = {
        good_id: that.data.id,
        number: that.data.step,
        type: that.data.chooseType,
        size: that.data.chooseSize,
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
    }


  },
  //立即购买
  quick_buy: function () {
    //是否登录
    if (token == '' || token == null) {
      this.setData({
        showLogin: true
      })
    } else {
      //订单确认
      var that = this
      var {
        id,
        name,
        price
      } = that.data
      var number = that.data.step
      var type = that.data.chooseType
      var size = that.data.chooseSize


      var img = that.data.head_imgs[0]

      //携带商品名称 数量 价格 
      log(id)
      log(name)
      log(price)
      log(number)
      log(img)
      log(type)
      log(size)

      var pass = false

      //假如有类型/尺寸，应该判断用户是否选择了
      if (this.data.isChooseSize == true && this.data.chooseSize == undefined || this.data.isChooseSize == true && this.data.chooseSize == '') {
        log('请选择尺寸')
        wx.showToast({
          icon: 'none',
          title: '请选择尺寸',
        })
      } else if (this.data.isChooseType == true && this.data.chooseType == undefined || this.data.isChooseType == true && this.data.chooseType == '') {
        wx.showToast({
          icon: 'none',
          title: '请选择类别',
        })
      } else {
        pass = true
      }


      wx.setStorageSync('cartGood', JSON.stringify([{
        good_id: id,
        number,
        type,
        size,
        name,
        price,
        img
      }])) // [{good_id，number，type，name，price，img}]

      if (pass == true) {
        wx.setStorageSync('order_type', 'common')
        wx.navigateTo({
          url: `/pages/confirm/index`,
        })
      }
    }


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
      popShow: !this.data.popShow,
      showNav:!this.data.showNav,
    })
  },
  onClose() {
    this.setData({
      popShow: false,
      showNav:true,

    })
  },
  onCloseLogin: function () {
    wx.showModal({
      title: '操作提示',
      content: '拒绝授权则无法使用小程序',
      showCancel: false,
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {}
      }
    })
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
          var code = res.code
          var username = e.detail.userInfo.nickName
          var avatarUrl = e.detail.userInfo.avatarUrl
          //发送请求 获取用户信息
          API.ajax('login', {
            code,
            username,
            avatarUrl
          }, function (res) {
            log(res)
            if (res.status == 200) {
              //保存用户数据
              //获取了token
              wx.setStorageSync('token', res.data.token)

              token = res.data.token
              wx.setStorageSync('username', res.data.userInfo.userName)
              wx.setStorageSync('head_img', res.data.userInfo.head_img)
              //获取返回的用户信息
              wx.hideLoading()

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

    }
  },

})