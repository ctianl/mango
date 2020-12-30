let API_HOST = "http://mango.com/";
let DEBUG = true; //切换数据入口
var Mock = require('../utils/mock.js')
var {
    log
} = console

var cart_list = []

//购物车商品数量
var cart_sum = wx.getStorageSync('cart_sum')

function ajax(url = '', data = {}, fn, method = "get", header = {}) {
    if (!DEBUG) {
        wx.request({
            url: config.API_HOST + data,
            method: method ? method : 'get',
            data: {},
            header: header ? header : {
                "Content-Type": "application/json"
            },
            success: function (res) {
                fn(res);
            }
        });
    } else {
        // 模拟数据

        //判断哪一个接口

        //登录接口
        if (url == 'login') {
            //获取用户的code和username
            var {
                code,
                username,
                avatarUrl
            } = data

            //对code和username进行判断

            //返回数据

            var res = {
                status: 200,
                data: {
                    msg: '登录成功',
                    //默认
                    token: 'n3hr4u3rh7843r74',
                    //返回用户信息
                    userInfo: {
                        userName: username,
                        head_img: avatarUrl
                    }
                }
            }
        } else if (url == 'indexHotelMsg') {
            //获取首页酒店广告
            var res = {
                status: 200,
                data: {
                    name: '三亚亚特兰蒂斯酒店',
                    imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg']
                }
            }

        } else if (url == 'code') {
            //获取粉丝群二维码图片
            var res = {
                status: 200,
                data: {
                    img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'
                }
            }

        } else if (url == 'isShowBenefit') {
            //是否显示粉丝福利群
            var res = {
                status: 200,
                data: {
                    isShowBenefit: true
                }
            }
        } else if (url == "getCartMsg") {
            //获取购物车信息
            var res = {
                status: 200,
                data: {
                    list: wx.getStorageSync('cart_list') == null || wx.getStorageSync('cart_list') == '' ? [] : JSON.parse(wx.getStorageSync('cart_list'))

                }
            }
        } else if (url == "addCart") {
            //加入购物车
            //获取商品ID和类型和数量
            var {
                good_id
            } = data
            var cart_list = wx.getStorageSync('cart_list') == null || wx.getStorageSync('cart_list') == '' ? [] : JSON.parse(wx.getStorageSync('cart_list'))

            var list = cart_list.filter(e => {
                return e.good_id != good_id
            })
            cart_list = list
            cart_list.push(data)
            log(cart_list)
            var cart_num = cart_list.length

            wx.setStorageSync('cart_list', JSON.stringify(cart_list))
            var res = {
                status: 200,
                data: {
                    msg: '加入购物车成功',
                    //还返回一个购物车数量
                    cart_num
                }
            }
        } else if (url == "getGoodMsg") {
            //获取商品详情
            var id = data.id
            if (id == 1) {
                var res = {
                    status: 200,
                    data: {
                        head_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
                        name: '与你相伴，丰盈时光|行政客服',
                        price: 0.01,
                        sale: 2,
                        stock: 119,
                        intro_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
                        isChooseType: false
                    }
                }
            } else if (id == 2) {
                var res = {
                    status: 200,
                    data: {
                        head_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
                        name: '热门人气套餐|豪华房含双早，额外',
                        price: 0.02,
                        sale: 12,
                        stock: 59,
                        intro_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
                        isChooseType: true,
                        types: [{
                            id: 1,
                            name: '2388元丽丝阁2晚+双早+旅拍+接送机+赠200元水疗代金',
                            isChoose: true
                        }, {
                            id: 2,
                            name: '2388元丽丝阁2晚+双早+接送机',
                            isChoose: false
                        }]
                    }
                }
            } else if (id == 3) {
                var res = {
                    status: 200,
                    data: {
                        head_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
                        name: '优惠特选套餐|标准房含双早',
                        price: 2,
                        sale: 2,
                        stock: 119,
                        intro_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
                        isChooseType: false
                    }
                }
            } else if (id == 4) {
                var res = {
                    status: 200,
                    data: {
                        head_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
                        name: '与你相伴，丰盈时光|行政客服',
                        price: 0.01,
                        sale: 2,
                        stock: 119,
                        intro_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
                        isChooseType: true,
                        types: [{
                            id: 1,
                            name: '2388元丽丝阁2晚+双早+旅拍+接送机+赠200元水疗代金',
                            isChoose: true
                        }, {
                            id: 2,
                            name: '2388元丽丝阁2晚+双早+接送机',
                            isChoose: false
                        }]
                    }
                }
            } else if (id == 5) {
                var res = {
                    status: 200,
                    data: {
                        head_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
                        name: '雅典娜厅',
                        price: 3499,
                        sale: 4,
                        stock: 119,
                        intro_imgs: ['/images/ad_img2.png'],
                        isChooseType: false
                    }
                }
            } else if (id == 6) {
                var res = {
                    status: 200,
                    data: {
                        head_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
                        name: '多功能会议室',
                        price: 3999,
                        sale: 8,
                        stock: 119,
                        intro_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
                        isChooseType: false
                    }
                }
            } else if (id == 7) {
                var res = {
                    status: 200,
                    data: {
                        head_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
                        name: '三亚海棠湾亚特兰蒂斯度假区七彩晶单人自主午餐',
                        price: 342,
                        sale: 14,
                        stock: 119,
                        intro_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
                        isChooseType: true,
                        types: [{
                            id: 1,
                            name: '2388元丽丝阁2晚+双早+旅拍+接送机+赠200元水疗代金',
                            isChoose: true
                        }, {
                            id: 2,
                            name: '2388元丽丝阁2晚+双早+接送机',
                            isChoose: false
                        }]
                    }
                }
            } else if (id == 8) {
                var res = {
                    status: 200,
                    data: {
                        head_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
                        name: '超值特惠丨有效护理按模套餐',
                        price: 2200,
                        sale: 52,
                        stock: 59,
                        intro_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
                        isChooseType: true,
                        types: [{
                            id: 1,
                            name: '2388元丽丝阁2晚+双早+旅拍+接送机+赠200元水疗代金',
                            isChoose: true
                        }, {
                            id: 2,
                            name: '2388元丽丝阁2晚+双早+接送机',
                            isChoose: false
                        }]
                    }
                }
            }

        } else if (url == "getGoodList") {
            //get
            if (method == 'get') {
                var {
                    type,
                    sort_type,
                    keyword,
                    hot
                } = data
                log(hot)
                //type 区分类型 如住宿/会议室/餐厅等
                //sort_type 列表排序依据
                //keyword 搜索关键词

                //sort_type：
                //normal 综合
                //sale 销量
                //price_to_low 价格从高到低
                //price_to_high 价格从低到高

                //全部数据
                var list = [{
                    img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                    title: '与你相伴,丰盈时光行政客房',
                    price: 2200,
                    sale: 10,
                    intro: '',
                    discount: '1800',
                    id: 1,
                    type: 1,
                    hot: false,
                }, {
                    img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                    title: '热门人气套餐|豪华房含双早，额外|限时优惠，欲购从速 ',
                    price: 1688,
                    sale: 16,
                    intro: '限时优惠',
                    discount: '',
                    id: 2,
                    type: 1,
                    hot: true,


                }, {
                    img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                    title: '优惠特选套餐|标准房含双早',
                    price: 1168,
                    sale: 3,
                    intro: '',
                    discount: '',
                    id: 3,
                    type: 1,
                    hot: false,


                }, {
                    img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                    title: '优雅高级大床房 | 与君同行',
                    price: 2900,
                    sale: 21,
                    intro: '',
                    discount: '2500',
                    id: 4,
                    type: 1,
                    hot: true,


                }, {
                    img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                    title: '雅典娜厅',
                    price: 3499,
                    sale: 4,
                    intro: '',
                    discount: '',
                    id: 5,
                    type: 2,
                    hot: false,

                }, {
                    img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                    title: '多功能会议室',
                    price: 3999,
                    sale: 8,
                    intro: '',
                    discount: '',
                    id: 6,
                    type: 2,
                    hot: hot,


                }, {
                    img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                    title: '三亚海棠湾亚特兰蒂斯度假区七彩晶单人自主午餐',
                    price: 342,
                    sale: 14,
                    intro: '',
                    discount: '',
                    id: 7,
                    type: 3,
                    hot: true,

                }, {
                    img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                    title: '超值特惠丨有效护理按模套餐',
                    price: 2200,
                    sale: 52,
                    intro: '',
                    discount: '',
                    id: 8,
                    type: 5,
                    hot: true,

                }]

                //是否爆款
                if (hot == 'true') {
                    log('这')
                    list = list.filter(e => {
                        return e.hot == true
                    })
                }

                if (type == 1) {
                    //住宿
                    //使用已有的数据
                    //过滤
                    list = list.filter(e => {
                        return e.type == 1
                    })


                } else if (type == 2) {
                    //会议室
                    list = list.filter(e => {
                        return e.type == 2
                    })
                } else if (type == 3) {
                    //餐厅
                    list = list.filter(e => {
                        return e.type == 3
                    })

                } else if (type == 4) {
                    //健身房
                    list = list.filter(e => {
                        return e.type == 4
                    })
                } else if (type == 5) {
                    //优惠专区
                    list = list.filter(e => {
                        return e.type == 5
                    })

                }


                if (sort_type == 'normal') {} else if (sort_type == 'sale') {
                    //销量从高到低
                    list = list.sort(function (a, b) {
                        return b.sale - a.sale
                    })
                } else if (sort_type == 'price_to_low') {
                    list = list.sort(function (a, b) {
                        return a.price - b.price
                    })
                } else if (sort_type == 'price_to_high') {
                    list = list.sort(function (a, b) {
                        return b.price - a.price
                    })
                }

                //查看是否有搜索关键词
                if (keyword == '' || keyword == undefined || keyword == null) {} else {
                    // 使用过滤
                    list = list.filter(e => {
                        return new RegExp(keyword).test(e.title)
                    })
                }

                var res = {
                    status: 200,
                    data: {
                        list
                    }
                }
            }

            //post
        } else if (url == 'indexSortList') {
            var res = {
                status: 200,
                data: {
                    sort_list: [
                        //原来
                        {
                            id: 1,
                            name: '住宿',
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                        }, {
                            id: 2,
                            name: '会议室',
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'
                        }, {
                            id: 3,
                            name: '餐厅',
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'
                        }, {
                            id: 4,
                            name: '高端专区',
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'
                        },
                        //新
                        {
                            id: 5,
                            name: '爆款套餐',
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                        }, {
                            id: 6,
                            name: '房型预订',
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'
                        }, {
                            id: 7,
                            name: '舌尖美食',
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'
                        }, {
                            id: 8,
                            name: '拼团互动',
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'
                        },
                    ],
                }
            }
        } else if (url == 'getItemMsg') {
            //获取分类的信息
            //获取上传的data数据
            var {
                id
            } = data
            //根据id返回列表
            if (id == 1) {
                //住宿
                var res = {
                    status: 200,
                    data: {
                        name: '住宿',
                        list: [{
                            img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                            name: '与你相伴，丰盈时光|行政客服',
                            price: 2288
                        }, {
                            img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                            name: '特色主题套餐|[印象]频道主题套房',
                            price: 2488
                        }, {
                            img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                            name: '热门人气套餐|豪华房含双早，额外',
                            price: 1688
                        }, {
                            img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                            name: '优选特惠套餐|标准房含双早',
                            price: 168
                        }]
                    }
                }

            } else if (id == 2) {
                //会议室
                var res = {
                    status: 200,
                    data: {
                        name: '会议室',
                        list: [{
                            img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                            name: '维也纳厅',
                            price: 19888,
                            introduce: '456平方米 500人'
                        }, {
                            img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                            name: '多莉丝厅',
                            price: 3888,
                            introduce: '50平方米 45人'

                        }, {
                            img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                            name: '雅典娜厅',
                            price: 49888,
                            introduce: '970平方米 1100人'
                        }]
                    }
                }

            } else if (id == 3) {
                //餐厅
                var res = {
                    status: 200,
                    data: {
                        name: '餐厅',
                        list: [{
                                img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                                name: '阁楼咖啡厅|周末自助午餐',
                                price: 368
                            }, {
                                img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                                name: '阁楼咖啡厅|周末自助午餐',
                                price: 388
                            }, {
                                img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                                name: '阁楼咖啡厅|周末自助午餐',
                                price: 408
                            }, {
                                img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                                name: '阁楼咖啡厅|周末自助午餐',
                                price: 448
                            },
                            {
                                img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                                name: '美食屋|特色风味海苔盐焗虾',
                                price: 48
                            }
                        ]
                    }
                }

            } else if (id == 4) {
                //高端专区
                var res = {
                    status: 200,
                    data: {
                        name: '高端专区',
                        list: [{
                            img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                            name: '与你相伴，丰盈时光|行政客服',
                            price: 2288
                        }, {
                            img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                            name: '浪漫主题定制房',
                            price: 2488
                        }, {
                            img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                            name: '热门人气套餐|豪华房含双早，额外',
                            price: 1688
                        }, {
                            img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                            name: '优选特惠套餐|标准房含双早',
                            price: 168
                        }]
                    }
                }

            }

        } else if (url == 'indexAllMsg') {
            var res = {
                status: 200,
                data: {

                    all_msg: [{
                        name: '住宿套餐',
                        list: [{
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                            title: '与你相伴,丰盈时光行政客房',
                            price: 2200,
                            id: 1
                        }, {
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                            title: '热门人气套餐|豪华房含双早，额外',
                            price: 1688,
                            id: 2
                        }, {
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                            title: '优惠特选套餐|标准房含双早',
                            price: 1168,
                            id: 3
                        }, {
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                            title: '与你相伴,丰盈时光行政客房',
                            price: 2200,
                            id: 4
                        }]
                    }, {
                        name: '每周特惠',
                        list: [{
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                            title: '阁楼咖啡厅|周末自助午餐',
                            price: 368,
                            id: 5
                        }, {
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                            title: '阁楼咖啡厅|周末自助午餐',
                            price: 388,
                            id: 6
                        }, {
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                            title: '阁楼咖啡厅|周末自助午餐',
                            price: 408,
                            id: 7
                        }, {
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                            title: '阁楼咖啡厅|周末自助午餐',
                            price: 448,
                            id: 8
                        }]
                    }, {
                        name: '人气点心',
                        list: [{
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                            title: '美食屋|下午茶精选榴莲酥小方蛋糕',
                            price: 48,
                            id: 9
                        }, {
                            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                            title: '美食屋|下午茶精选榴莲酥小方蛋糕',
                            price: 48,
                            id: 10
                        }]
                    }]
                }
            }
        } else if (url == 'addAddress') {
            //本地保存这个数据
            //应该要有一个id
            wx.setStorageSync('address', JSON.stringify(data))

            //添加到地址列表
            if (wx.getStorageSync('addressList') == '' || wx.getStorageSync('addressList') == null) {
                var list = []
                data.id = 1
                list.push(data)
                wx.setStorageSync('addressList', JSON.stringify(list))
            } else {
                var list = JSON.parse(wx.getStorageSync('addressList'))
                if (list.length == 0) {
                    data.id = 1
                } else {
                    data.id = list[list.length - 1].id + 1
                }
                list.push(data)
                wx.setStorageSync('addressList', JSON.stringify(list))
            }

            var res = {
                status: 200,
                data: {
                    msg: '添加成功'
                }
            }
        } else if (url == 'getAddress') {

            //获取addressList中的指定id
            var {
                id
            } = data

            log(id)
            if (wx.getStorageSync('addressList') == '' || wx.getStorageSync('addressList') == null) {
                //无收货地址
                var res = {
                    status: 400,
                    data: {
                        msg: '无配送地址'
                    }
                }
            } else {
                var list = JSON.parse(wx.getStorageSync('addressList'))
                var address = list.filter(ele => {
                    return ele != null
                })
                address = address.filter(ele => {
                    return ele.id == id
                })
                //可能为空
                if (address.length == 0) {
                    var res = {
                        status: 400,
                        data: {
                            msg: '无配送地址'
                        }
                    }
                } else {
                    var res = {
                        status: 200,
                        data: {
                            address
                        }
                    }
                }

            }


        } else if (url == 'getAddressList') {
            //获取地址列表

            //获取本地数据
            if (wx.getStorageSync('addressList') == '' || wx.getStorageSync('addressList') == null) {
                var res = {
                    status: 400,
                    data: {
                        msg: '无配送地址'
                    }
                }
            } else {
                var list = JSON.parse(wx.getStorageSync('addressList'))
                //去掉null
                list = list.filter(ele => {
                    return ele != null
                })
                var res = {
                    status: 200,
                    data: {
                        list
                    }
                }
            }
        } else if (url == 'delAddress') {
            //删除地址
            var {
                id
            } = data

            //遍历
            var list = JSON.parse(wx.getStorageSync('addressList'))

            list = list.filter(ele => {
                return ele.id != id
            })

            //改变本地数据
            wx.setStorageSync('addressList', JSON.stringify(list))

            var res = {
                status: 200,
                data: {
                    list
                }
            }
        } else if (url == 'editAddress') {
            //编辑地址
            log(data)

            var {
                id,
                name,
                phone,
                address,
                area,
                value
            } = data

            //遍历
            var list = JSON.parse(wx.getStorageSync('addressList'))

            list = list.map(ele => {
                if (ele.id == id) {
                    ele.name = name
                    ele.phone = phone
                    ele.area = area
                    ele.value = value
                    ele.address = address
                    return ele
                } else {
                    return ele
                }
            })

            //改变本地数据
            wx.setStorageSync('addressList', JSON.stringify(list))

            var res = {
                status: 200,
                data: {
                    msg: '编辑成功',
                    list
                }
            }
        } else if (url == 'addressIdMsg') {
            //判断是get(获取) 还是 post(修改)
            if (method == 'get') {
                log('get')
                //获取地址id
                var id = wx.getStorageSync('addressId')
                var res = {
                    status: 200,
                    data: {
                        id
                    }
                }
            } else if (method == 'post') {
                //获取id
                var {
                    id
                } = data
                wx.setStorageSync('addressId', id)
                var res = {
                    status: 200,
                    data: {
                        msg: '选择成功'
                    }
                }
            }

        } else if (url == 'searchSortList') {
            var res = {
                status: 200,
                data: {
                    list: [{
                        id: 1,
                        name: '住宿',
                        img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg',
                    }, {
                        id: 2,
                        name: '会议室',
                        img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'
                    }, {
                        id: 3,
                        name: '餐厅',
                        img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'
                    }, {
                        id: 4,
                        name: '健身房',
                        img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'
                    }, {
                        id: 5,
                        name: '优惠专区',
                        img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'
                    }],
                }
            }
        } else if (url == 'getOrderList') {
            var {
                id
            } = data
            //全部 0
            //待付款 1
            //待发货 2
            //待收货 3
            //待评价 4

            wx.setStorageSync('orderList', JSON.stringify([{
                id: 1,
                good_id: 1,
                order_sn: '2020122253549799',
                time: '2020-12-22 14:35:01',
                good_list: [{
                        name: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
                        number: 10,
                        price: 0.02,
                        sumPrice: 2,
                        img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                    },
                    {
                        name: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
                        number: 10,
                        price: 0.02,
                        sumPrice: 2,
                        img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                    }
                ],
                all_sumPrice: 4,
                sumNumber:20,
                delivery_pay: 0,
                actually_pay: 4,
                address_name: '小兔子',
                address_phone: 13425514150,
                address_area: '北京市 北京市 东城区',
                address_detail: '幸福花园',
                status: 1,
            }, {
                id: 2,
                good_id: 2,
                order_sn: '2020122253552101',
                time: '2020-12-23 11:20:45',
                good_list: [{
                    number: 12,
                    price: 100,
                    sumPrice: 1200,
                    name: 'ewewe',
                    img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                }],
                all_sumPrice: 1200,
                sumNumber:12,
                delivery_pay: 8,
                actually_pay: 1208,
                address_name: '小兔子',
                address_phone: 13425514150,
                address_area: '北京市 北京市 东城区',
                address_detail: '幸福花园',
                status: 2
            }, {
                id: 3,
                good_id: 3,
                order_sn: '2020122253549799',
                time: '2020-12-22 14:35:01',
                good_list: [{
                    number: 3,
                    name: '商品名称',
                    price: 0.02,
                    sumPrice: 0.06,
                    img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                }, {
                    number: 3,
                    name: '商品名称',
                    price: 0.02,
                    sumPrice: 0.06,
                    img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                }, {
                    number: 3,
                    name: '商品名称',
                    price: 0.02,
                    sumPrice: 0.06,
                    img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                }],
                sumNumber:6,
                all_sumPrice: 0.18,
                delivery_pay: 0.01,
                actually_pay: 0.19,
                address_name: '小兔子',
                address_phone: 13425514150,
                address_area: '北京市 北京市 东城区',
                address_detail: '幸福花园',
              
                status: 3,
            }, {
                id: 4,
                good_id: 4,
                order_sn: '2020122253552101',
                time: '2020-12-23 11:20:45',
                good_list:[{
                    name: 'ewewe',
                    number: 5,
                    price: 100,
                    sumPrice: 500,
                    img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                },{
                    name: 'ewewe',
                    number: 5,
                    price: 100,
                    sumPrice: 500,
                    img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg",
                }],
                sumNumber:10,
                all_sumPrice: 1000,
                delivery_pay: 0,
                actually_pay: 1500,
                address_name: '小兔子',
                address_phone: 13425514150,
                address_area: '北京市 北京市 东城区',
                address_detail: '幸福花园',
                status: 4
            }]))
            var list = JSON.parse(wx.getStorageSync('orderList'))
            if (id == 0) {

            } else if (id == 1) {
                list = list.filter(e => {
                    return e.status == 1
                })
            } else if (id == 2) {
                list = list.filter(e => {
                    return e.status == 2
                })
            } else if (id == 3) {
                list = list.filter(e => {
                    return e.status == 3
                })
            } else if (id == 4) {
                list = list.filter(e => {
                    return e.status == 4
                })
            }
            var res = {
                status: 200,
                data: {
                    list
                }
            }

            // 输出结果
            // console.log(JSON.stringify(res, null, 2))
        } else if (url == 'getOrderMsg') {
            //获取指定的订单信息
            var {
                id
            } = data
            var list = JSON.parse(wx.getStorageSync('orderList'))
            var msg = list.filter(e => {
                return e.id == id
            }) //msg 是一个数组
            msg = msg[0]
            var res = {
                status: 200,
                data: {
                    msg,
                }
            }

        } else if (url == "getPayCode") {
            //获取微信支付 二维码
            var res = {
                status: 200,
                data: {
                    img: '/images/payCode.jpg'
                }
            }

        } else if (url == "delOrder") {
            var {
                id
            } = data

            var list = JSON.parse(wx.getStorageSync('orderList'))
            list = list.filter(e => {
                return e.id != id
            })

            log(list)
            //保存
            wx.setStorageSync('orderList', JSON.stringify(list))

            var res = {
                status: 200,
                data: {
                    msg: '取消成功'
                }
            }
        } else if (url == "confirmTakeDelivery") {
            //确认收货
            var {
                id
            } = data

            var list = JSON.parse(wx.getStorageSync('orderList'))
            list = list.map(e => {
                if (e.id == id) {
                    e.status = 4
                    return e
                } else {
                    return e
                }
            })

            log(list)
            //保存
            wx.setStorageSync('orderList', JSON.stringify(list))

            var res = {
                status: 200,
                data: {
                    msg: '已确认'
                }
            }
        }
        fn(res);

    }
}
module.exports = {
    ajax: ajax
}