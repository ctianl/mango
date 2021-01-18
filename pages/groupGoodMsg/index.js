//index.js
//获取应用实例
const app = getApp()
var API = require('../../utils/api.js')
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
var token = wx.getStorageSync('token')

var {
  log
} = console

Page({
  data: {
    showLogin: false,
    showRule: false,
    game_rule: [{
      step: 1,
      name: '选择商品'
    }, {
      step: 2,
      name: '开团/参团'
    }, {
      step: 3,
      name: '邀请好友'
    }, {
      step: 4,
      name: '人满成团'
    }],

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
    }],

    id: '',
    type: '',
    good_id: '',
    good_name: '',
    //size人团
    size: '',
    now_people: '',
    good_price: '',
    now_price: '',
    img: '',
    intro: '',
    head_imgs: [],
    intro_imgs: [],
    stock: '',

    show_price: '',


    isChooseType: false,
    isChooseSize: false,
    isChooseSizeName: '尺寸',
    chooseSize: "",
    types: [],
    //默认第一个的
    chooseType: '',

    //打开单独的商品图片
    showImg: false,
    'showItemName': '',
    'showItemImg': '',

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
  //应该监听page的scroll
  onPageScroll: function (e) {
    var scrollTop = e.scrollTop
    if (scrollTop > 550) {
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
  openPic: function (e) {
    log('打开图片')
    var name = e.currentTarget.dataset.name
    var img = e.currentTarget.dataset.img
    log(name)
    log(img)
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
  showRule: function () {
    this.setData({
      showRule: true
    })
    // //查看拼团规则
    // 
    // Dialog.alert({
    //   message: `开团:选择商品,点击"发起拼单"按钮,付款完成后即开团成功,就可以邀请小伙伴一起拼回啦；
    //   参团：进入朋友分享的页面，点击“立即参团”按钮，付款完成后参团成功,在有效时间内凑齐人数即成团，就可以等待收货；
    //   成团：在开团或参团成功后，点击“立即分享"将页面分享给好友,在有效时间内麦齐人数即成团，成团后商家开始发货；
    //   组团失败：在有效时间内未麦齐人数，即组团失败，组团失败后订单所付款将原路退回到支付账户。`,
    // })
    //   .then(() => {
    //     // on confirm
    //   })
  },
  onShow: function () {
    token = wx.getStorageSync('token')
  },
  //生命周期函数
  onLoad: function (options) {
    var that = this
    var id = options.id
    log(id)
    // var id = 9
    that.setData({
      id
    })
    API.ajax('getGroupGoodMsg', {
      id
    }, function (res) {
      log(res)
      //这里既可以获取模拟的res
      if (res.status == 200) {
        var msg = res.data.msg
        log(msg)

        //编辑types
        that.setData({
          topImg: msg.good_imgs[0],
          isChooseSizeName: msg.isChooseSizeName,
          id: msg.good_id,
          type: msg.type,
          good_id: msg.type,
          good_name: msg.good_name,
          //size人团
          size: msg.size,
          now_people: msg.now_people,
          //修改价格
          good_price: Number(msg.good_price).toFixed(2),
          now_price: Number(msg.now_price).toFixed(2),
          img: msg.img,
          intro: msg.intro,
          intro_imgs: msg.intro_imgs,
          sum: msg.good_imgs.length,
          head_imgs: msg.good_imgs,
          stock: msg.stock,
          isChooseType: msg.isChooseType,
          isChooseSize: msg.isChooseSize,
          types: msg.types,
          sizes: msg.sizes,
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
  //选择类型
  chooseType: function (e) {
    var id = e.currentTarget.dataset.type_id
    var name = e.currentTarget.dataset.name
    var img = e.currentTarget.dataset.img

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

  //进入首页
  home: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  confirm: function () {
    //判断是否登录了
    if (token == '' || token == null) {
      this.setData({
        showLogin: true
      })
    } else {
      //订单确认
      var {
        id,
        good_name,
        step,
        img,
        chooseType,
        chooseSize
      } = this.data
      log(this.data.id)

      var price
      //价格
      if (this.data.buy_type == 'single') {
        price = this.data.good_price
      } else if (this.data.buy_type == 'group') {
        price = this.data.now_price
      } else {
        price = this.data.now_price

      }

      var o = {
        id,
        name: good_name,
        number: step,
        type: chooseType,
        size: chooseSize,
        price,
        active: 0,
        img
      }
      wx.setStorageSync('cartGood', JSON.stringify([o]))

      //假如有类型/尺寸，应该判断用户是否选择了
      if (this.data.isChooseSize == true && this.data.chooseSize == undefined || this.data.isChooseSize == true && this.data.chooseSize == '') {
        log('请选择尺寸')
        wx.showToast({
          icon: 'none',
          title: '请选择尺寸',
        })
      } else if (this.data.isChooseType == true && this.data.chooseType == undefined || this.data.isChooseType == true && this.data.chooseType == '') {
        log('请选择类别')
        wx.showToast({
          icon: 'none',
          title: '请选择类别',
        })
      } else {
        wx.setStorageSync('order_type', 'group')
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
  chooseNumber: function (e) {
    var buy_type = e.currentTarget.dataset.type

    if (buy_type == 'single') {
      this.setData({
        show_price: this.data.good_price
      })
    } else if (buy_type == 'group') {
      this.setData({
        show_price: this.data.now_price
      })
    } else {
      //发起拼单的价格
      this.setData({
        show_price: this.data.now_price
      })
    }
    //弹出
    this.setData({
      popShow: !this.data.popShow,
      buy_type
    })
  },
  onClose() {
    this.setData({
      popShow: false
    })
  },


})