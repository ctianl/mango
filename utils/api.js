let API_HOST = "http://mango.com/";
let DEBUG = true; //切换数据入口
var Mock = require('../utils/mock.js')
var {
    log
} = console

var cart_list = []

/
//订单列表
wx.setStorageSync('orderList', JSON.stringify([{
    id: 1,
    order_sn: '2020122253549799',
    time: '2020-12-22 14:35:01',
    name: '网红化妆包女便携大容量高级感简约软萌治愈系防水收纳袋洗漱包',
    good_list: [{
        good_id: 1,
        name: '网红化妆包女便携大容量高级感简约软萌治愈系防水收纳袋洗漱包',
        number: 10,
        price: 11.8,
        sumPrice: 118,
        type: '抱抱白熊',
        img: "https://static1.cxy61.com/bcgame_face2face/1/752c5784d719c129c3e67bc8c8a8f42d_n.png-182x187",
    }, {
        good_id: 3,
        number: 3,
        price: 18.8,
        type: '紫色',
        sumPrice: 56.4,
        name: '少女心可爱毛绒化妆包便携ins风日系大容量化妆品收纳包袋',
        img: "https://static1.cxy61.com/bcgame_face2face/1/cf7a20738f0deb1068c6a0b38f4ae073_n.png-274x280",
    }, {
        good_id: 4,
        number: 2,
        price: 3.2,
        type: '橙色女孩',
        size: '18*21cm',
        sumPrice: 56.4,
        name: 'ins风礼品纸袋礼物礼袋手提少女简约包装袋子伴手礼礼盒',
        img: "https://static1.cxy61.com/bcgame_face2face/1/56ad6daeb2c3943f0850e495ffe6f0a0_c.png-209x206",
    }],
    all_sumPrice: 174.4,
    sumNumber: 13,
    delivery_pay: 0,
    actually_pay: 174.4,
    address_name: '小兔子',
    address_phone: 13425514150,
    address_area: '北京市 北京市 东城区',
    address_detail: '幸福花园',
    status: 1,
}, {
    id: 2,
    order_sn: '2020122253552101',
    time: '2020-12-23 11:20:45',
    name: '少女心可爱毛绒化妆包便携ins风日系大容量化妆品收纳包袋',
    good_list: [{
        good_id: 3,
        number: 3,
        price: 18.8,
        type: '紫色',
        sumPrice: 56.4,
        name: '少女心可爱毛绒化妆包便携ins风日系大容量化妆品收纳包袋',
        img: "https://static1.cxy61.com/bcgame_face2face/1/cf7a20738f0deb1068c6a0b38f4ae073_n.png-274x280",
    }],
    all_sumPrice: 56.4,
    sumNumber: 3,
    delivery_pay: 8,
    actually_pay: 64.4,
    address_name: '小兔子',
    address_phone: 13425514150,
    address_area: '北京市 北京市 东城区',
    address_detail: '幸福花园',
    status: 2
}, {
    id: 3,
    order_sn: '2020122253549799',
    time: '2020-12-22 14:35:01',
    name: '简约ins风活页笔记本子大学生文具夹环可拆卸少女心b5可爱线圈本',
    good_list: [{
        good_id: 5,
        number: 1,
        name: '简约ins风活页笔记本子大学生文具夹环可拆卸少女心b5可爱线圈本',
        price: 8.7,
        sumPrice: 8.7,
        img: 'https://static1.cxy61.com/bcgame_face2face/1/f57394d4f6a691bb6f366c1a6bde087f_a.jpg-1079x1440',
    }, ],
    sumNumber: 1,
    all_sumPrice: 8.7,
    delivery_pay: 0,
    actually_pay: 8.7,
    address_name: '小兔子',
    address_phone: 13425514150,
    address_area: '北京市 北京市 东城区',
    address_detail: '幸福花园',
    status: 3,
}, {
    id: 4,
    order_sn: '2020122253552101',
    time: '2020-12-23 11:20:45',
    name: '手账本简约ins风少女心精致可爱日记记事网格本笔记本子',
    good_list: [{
        good_id: 7,
        name: '手账本简约ins风少女心精致可爱日记记事网格本笔记本子',
        number: 5,
        price: 16,
        sumPrice: 80,
        img: 'https://static1.cxy61.com/bcgame_face2face/1/855512a3e0126fb41704fa807cc02a84_e.jpg-800x800',
    }, ],
    sumNumber: 5,
    all_sumPrice: 80,
    delivery_pay: 8,
    actually_pay: 88,
    address_name: '小兔子',
    address_phone: 13425514150,
    address_area: '北京市 北京市 东城区',
    address_detail: '幸福花园',
    status: 4
}, {
    id: 5,
    name: 'ins傻瓜相机女小礼物实用的潜水胶卷相机学生款迷你复古胶片可换',
    order_sn: '2020122253552101',
    time: '2020-12-23 11:20:45',
    good_list: [{
        good_id: 10,
        name: 'ins傻瓜相机女小礼物实用的潜水胶卷相机学生款迷你复古胶片可换',
        number: 2,
        price: 23.8,
        sumPrice: 47.6,
        img: 'https://static1.cxy61.com/bcgame_face2face/1/6740b004c9c1783f46db13c71f312b28_j.jpg-750x1000',
    }, ],
    sumNumber: 2,
    all_sumPrice: 47.6,
    delivery_pay: 0,
    actually_pay: 47.6,
    address_name: '小兔子',
    address_phone: 13425514150,
    address_area: '北京市 北京市 东城区',
    address_detail: '幸福花园',
    status: 5
}, {
    id: 6,
    order_sn: '2020122253549799',
    time: '2020-12-22 14:35:01',
    name: '网红化妆包女便携大容量高级感简约软萌治愈系防水收纳袋洗漱包',
    good_list: [{
        good_id: 1,
        name: '网红化妆包女便携大容量高级感简约软萌治愈系防水收纳袋洗漱包',
        number: 10,
        price: 11.8,
        sumPrice: 118,
        type: '抱抱白熊',
        img: "https://static1.cxy61.com/bcgame_face2face/1/752c5784d719c129c3e67bc8c8a8f42d_n.png-182x187",
    }, {
        good_id: 3,
        number: 3,
        price: 18.8,
        type: '紫色',
        sumPrice: 56.4,
        name: '少女心可爱毛绒化妆包便携ins风日系大容量化妆品收纳包袋',
        img: "https://static1.cxy61.com/bcgame_face2face/1/cf7a20738f0deb1068c6a0b38f4ae073_n.png-274x280",
    }, {
        good_id: 4,
        number: 2,
        price: 3.2,
        type: '橙色女孩',
        size: '18*21cm',
        sumPrice: 56.4,
        name: 'ins风礼品纸袋礼物礼袋手提少女简约包装袋子伴手礼礼盒',
        img: "https://static1.cxy61.com/bcgame_face2face/1/56ad6daeb2c3943f0850e495ffe6f0a0_c.png-209x206",
    }],
    all_sumPrice: 174.4,
    sumNumber: 13,
    delivery_pay: 0,
    actually_pay: 174.4,
    address_name: '小兔子',
    address_phone: 13425514150,
    address_area: '北京市 北京市 东城区',
    address_detail: '幸福花园',
    status: 2,
}, ]))

//拼团订单列表

//订单状态 status
//1 待付款
//2 拼团中
//3 待发货
//4 待收货
//5 退款中
//6 已完成
// wx.setStorageSync('groupOrderList', JSON.stringify([{
//         id: 1,
//         order_sn: '2021010499571001',
//         time: '2021-01-04 19:01:48',
//         status: 1,
//         good_name: '网红化妆包女便携大容量高级感简约软萌治愈系防水收纳袋洗漱包',
//         good_id: 1,
//         //数量
//         number: '1',
//         //单价
//         single_price: 11.8,
//         //总价
//         sum_price: 11.8,
//         //配送费用
//         delivery_price: '0',
//         //实际费用
//         actual_price: 11.8,
//         address_name: '陈小狗',
//         address_phone: '1341774515',
//         address_area: '北京市 北京市 东城区',
//         address_detail: '幸福花园',
//         img: 'https://static1.cxy61.com/bcgame_face2face/1/3c114bdbc6434c23af4ac0fb09779874_x.jpg-750x1000'
//     },
//     {
//         id: 2,
//         order_sn: '2021010499571001',
//         good_id: 3,
//         time: '2021-01-04 19:01:48',
//         status: 1,
//         good_name: '少女心可爱毛绒化妆包便携ins风日系大容量化妆品收纳包袋',
//         number: '2',
//         single_price: 18.8,
//         sum_price: 37.6,
//         delivery_price: '0',
//         actual_price: 37.6,
//         address_name: '陈小狗',
//         address_phone: '1341774515',
//         address_area: '北京市 北京市 东城区',
//         address_detail: '幸福花园',
//         img: 'https://static1.cxy61.com/bcgame_face2face/1/b70441118df2b3e8c29ef3bb5b3fc2a5_d.jpg-800x800'
//     }, {
//         id: 3,
//         order_sn: '2021010499571001',
//         time: '2021-01-04 19:01:48',
//         status: 3,
//         good_id: 6,
//         good_name: '少女心笔记本子B5韩国可爱超萌ins风简约大学生车线软面抄',
//         number: 3,
//         single_price: 7.9,
//         sum_price: 23.7,
//         delivery_price: 4,
//         actual_price: 27.7,
//         address_name: '陈小狗',
//         address_phone: '1341774515',
//         address_area: '北京市 北京市 东城区',
//         address_detail: '幸福花园',
//         img: 'https://static1.cxy61.com/bcgame_face2face/1/90a5eb831b058fa598ed895deda4794e_i.jpg-750x1000'
//     }, {
//         id: 4,
//         order_sn: '2021010499571001',
//         time: '2021-01-04 19:01:48',
//         status: 4,
//         good_id: 8,
//         good_name: '小麻薯mini活页手账本迷你可爱便携少女心手帐本小笔记本子随身',
//         number: '10',
//         single_price: 12.8,
//         sum_price: 128,
//         delivery_price: '0',
//         actual_price: 128,
//         address_name: '陈小狗',
//         address_phone: '1341774515',
//         address_area: '北京市 北京市 东城区',
//         address_detail: '幸福花园',
//         img: 'https://static1.cxy61.com/bcgame_face2face/1/98ae61b124ca775274f283a92efc061f_z.jpg-750x1000'
//     }, {
//         id: 5,
//         order_sn: '2021010499571001',
//         time: '2021-01-04 19:01:48',
//         status: 5,
//         good_id: 10,
//         good_name: 'ins傻瓜相机女小礼物实用的潜水胶卷相机学生款迷你复古胶片可换',
//         number: 1,
//         single_price: 23.8,
//         sum_price: 23.8,
//         delivery_price: '0',
//         actual_price: 23.8,
//         address_name: '陈小狗',
//         address_phone: '1341774515',
//         address_area: '北京市 北京市 东城区',
//         address_detail: '幸福花园',
//         img: 'https://static1.cxy61.com/bcgame_face2face/1/6740b004c9c1783f46db13c71f312b28_j.jpg-750x1000'
//     }, {
//         id: 6,
//         order_sn: '2021010499571001',
//         time: '2021-01-04 19:01:48',
//         status: 6,
//         good_name: '网红笔筒ins创意时尚可爱儿童学生宿舍桌面大容量旋转文具收纳盒',
//         number: '1',
//         single_price: 8.72,
//         good_id: 14,
//         sum_price: 8.72,
//         delivery_price: 8,
//         actual_price: 16.72,
//         address_name: '陈小狗',
//         address_phone: '1341774515',
//         address_area: '北京市 北京市 东城区',
//         address_detail: '幸福花园',
//         img: 'https://static1.cxy61.com/bcgame_face2face/1/f968fc5879190f3b311a806a6f9bd6ae_p.jpg-750x1000'
//     }
// ]))

//普通 商品 列表
//分类， type
//11 收纳
//22 手账 
//33 数码周边
//44 文具
wx.setStorageSync('goodList', JSON.stringify([{
    good_id: 1,
    type: 13,
    big_type: 11,
    hot: false,
    name: '网红化妆包女便携大容量高级感简约软萌治愈系防水收纳袋洗漱包',
    img: 'https://static1.cxy61.com/bcgame_face2face/1/1470d9186106969bae0261a1a0a6d1de_b.jpg-750x1000',
    head_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/3c114bdbc6434c23af4ac0fb09779874_x.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/1470d9186106969bae0261a1a0a6d1de_b.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/0010466f123987d579043571a0072870_r.jpg-750x1000'],
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/3c114bdbc6434c23af4ac0fb09779874_x.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/1470d9186106969bae0261a1a0a6d1de_b.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/0010466f123987d579043571a0072870_r.jpg-750x1000'],
    price: 14.8,
    sale: 264,
    stock: 119,
    //是否有分类选择
    isChooseType: true,
    types: [{
        type_id: 1,
        name: '抱抱白熊',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/752c5784d719c129c3e67bc8c8a8f42d_n.png-182x187',
    }, {
        type_id: 2,
        name: '抱抱棕熊',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/c1f577f2b5fc68c5c0cbc02a64b5adba_s.png-185x186',
    }, {
        type_id: 3,
        name: '萌白熊头',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/0e2f0b48e3fb8b946f47e955e97462b3_z.png-187x188',
    }, {
        type_id: 4,
        name: '棕白熊头',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/917245dbed005fc137949cd3827569ba_u.png-182x184',
    }],
    new: false,
    discount: 11.8,
}, {
    good_id: 2,
    type: 13, //收纳
    big_type: 11,
    hot: true,
    name: '少女心化妆包高级感可爱便携小号旅行ins韩国防水大容量收纳包',
    img: 'https://static1.cxy61.com/bcgame_face2face/1/3849180c26f006036b29e53ef91cb1d4_c.jpg-750x1000',
    head_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/3849180c26f006036b29e53ef91cb1d4_c.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/73032fd9fc14e773f725905acc9ff79f_j.jpg-750x1000'],
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/3849180c26f006036b29e53ef91cb1d4_c.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/73032fd9fc14e773f725905acc9ff79f_j.jpg-750x1000'],
    price: 24.8,
    sale: 202,
    stock: 119,
    //是否有分类选择
    isChooseType: true,
    types: [{
        type_id: 1,
        name: '粉色小号',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/29831172d004f8cadddb71d12c8f9931_y.png-333x334',
    }, {
        type_id: 2,
        name: '粉色大号',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/8d641431ce344066266dc6ca843045c3_d.png-338x344',
    }, {
        type_id: 3,
        name: '黄色小号',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/046b35e071b41147e87ba0227acb1f87_v.png-341x344',
    }, {
        type_id: 4,
        name: '黄色大号',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/9e0f3df56ae2c751c21e27c097bfeed5_z.png-340x340',
    }],
    discount: 19.8,
    new: false,

}, {
    good_id: 3,
    type: 13, //收纳
    big_type: 11,
    hot: false,
    name: '少女心可爱毛绒化妆包便携ins风日系大容量化妆品收纳包袋',
    img: 'https://static1.cxy61.com/bcgame_face2face/1/b70441118df2b3e8c29ef3bb5b3fc2a5_d.jpg-800x800',
    head_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/b70441118df2b3e8c29ef3bb5b3fc2a5_d.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/98562e73fdae661b8d506408082122e9_a.jpg-800x800'],
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/b70441118df2b3e8c29ef3bb5b3fc2a5_d.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/98562e73fdae661b8d506408082122e9_a.jpg-800x800'],
    price: 23.5,
    sale: 219,
    stock: 119,
    //是否有分类选择
    isChooseType: true,
    types: [{
        type_id: 1,
        name: '紫色',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/cf7a20738f0deb1068c6a0b38f4ae073_n.png-274x280',
    }, {
        type_id: 2,
        name: '粉色',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/a79f50d836f5c3d56f93be95ccdd584b_b.png-275x279',
    }],
    discount: 18.8,
    new: false,

}, {
    good_id: 4,
    type: 12, //收纳
    hot: false,
    name: 'ins风礼品纸袋礼物礼袋手提少女简约包装袋子伴手礼礼盒',
    img: 'https://static1.cxy61.com/bcgame_face2face/1/6dd71485661570bdd3980c8dc9b1771f_g.jpg-800x800',
    head_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/6dd71485661570bdd3980c8dc9b1771f_g.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/fe6b9dbea7ce7406246efb231adb27b7_n.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/a5e2b8c6270a33320680c8d167b3a3fa_n.jpg-800x800'],
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/6dd71485661570bdd3980c8dc9b1771f_g.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/fe6b9dbea7ce7406246efb231adb27b7_n.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/a5e2b8c6270a33320680c8d167b3a3fa_n.jpg-800x800'],
    price: 4,
    sale: 333,
    stock: 112,
    //是否有分类选择
    isChooseType: true,
    types: [{
        type_id: 1,
        name: '晚安',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/5adf8970c4e98d2e734807fa7af32b59_p.png-142x146',
    }, {
        type_id: 2,
        name: '条形兔子',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/f10b0652a3f07bdeb79b97e4f665e632_k.png-204x208',
    }, {
        type_id: 3,
        name: '条形女孩',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/c19fe16f72a0c03f97d3e8e76ec1724b_x.png-205x207',
    }, {
        type_id: 4,
        name: '条形小熊',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/c19fe16f72a0c03f97d3e8e76ec1724b_x.png-202x206',
    }, {
        type_id: 5,
        name: '橙色女孩',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/56ad6daeb2c3943f0850e495ffe6f0a0_c.png-209x206',
    }, {
        type_id: 6,
        name: '绿色小熊',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/39ae10016fddfb470dba29ee6fec2f1e_p.png-205x208',
    }, {
        type_id: 7,
        name: '黄色小熊',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/1d4f02921e4306842a28bede7af306b7_t.png-204x207',
    }, {
        type_id: 8,
        name: '出游',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/d83a853b70739c5a718c9cd6bca1a0d8_r.png-144x146',
    }],
    //第二个分类
    isChooseSize: true,
    sizes: [{
        id: 1,
        name: '18*21cm'
    }, {
        id: 2,
        name: '20.5*18cm'
    }],
    discount: 3.2,
    new: false,

}, {
    good_id: 5,
    type: 45,
    big_type: 44,
    hot: true,
    name: '简约ins风活页笔记本子大学生文具夹环可拆卸少女心b5可爱线圈本',
    img: 'https://static1.cxy61.com/bcgame_face2face/1/f57394d4f6a691bb6f366c1a6bde087f_a.jpg-1079x1440',
    head_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/f57394d4f6a691bb6f366c1a6bde087f_a.jpg-1079x1440', 'https://static1.cxy61.com/bcgame_face2face/1/b9cd1f98f4500e75440e1f47e9749da0_u.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/985feda1e03f0c911f4179144ac4ebba_z.jpg-750x1000'],
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/f57394d4f6a691bb6f366c1a6bde087f_a.jpg-1079x1440', 'https://static1.cxy61.com/bcgame_face2face/1/b9cd1f98f4500e75440e1f47e9749da0_u.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/985feda1e03f0c911f4179144ac4ebba_z.jpg-750x1000'],
    price: 8.8,
    sale: 26,
    stock: 350,
    isChooseType: false,
    discount: 8.7,
    new: false,

}, {
    good_id: 6,
    type: 45, //手账
    big_type: 44,
    hot: false,
    name: '少女心笔记本子B5韩国可爱超萌ins风简约大学生车线软面抄',
    img: 'https://static1.cxy61.com/bcgame_face2face/1/90a5eb831b058fa598ed895deda4794e_i.jpg-750x1000',
    head_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/90a5eb831b058fa598ed895deda4794e_i.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/0a4ce041075155f63dbae7ec6dde5764_h.jpg-750x1000'],
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/90a5eb831b058fa598ed895deda4794e_i.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/0a4ce041075155f63dbae7ec6dde5764_h.jpg-750x1000'],
    price: 9.9,
    sale: 142,
    stock: 350,
    isChooseType: false,
    single_intro: '笔记本',
    discount: 7.9,
    new: true,

}, {
    good_id: 7,
    type: 45, //手账
    big_type: 22,
    hot: true,
    name: '手账本简约ins风少女心精致可爱日记记事网格本笔记本子',
    img: 'https://static1.cxy61.com/bcgame_face2face/1/855512a3e0126fb41704fa807cc02a84_e.jpg-800x800',
    head_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/855512a3e0126fb41704fa807cc02a84_e.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/90234d923b9996ede549de946ddcd4c1_x.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/94f1411f0344fb8912eebd0ede9b25b1_u.jpg-800x800'],
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/855512a3e0126fb41704fa807cc02a84_e.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/90234d923b9996ede549de946ddcd4c1_x.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/94f1411f0344fb8912eebd0ede9b25b1_u.jpg-800x800'],
    price: 22.5,
    sale: 17,
    stock: 350,
    isChooseType: false,
    discount: 16,
    new: false,

}, {
    good_id: 8,
    type: 23, //手账
    big_type: 44,
    hot: true,
    name: '小麻薯mini活页手账本迷你可爱便携少女心手帐本小笔记本子随身',
    img: 'https://static1.cxy61.com/bcgame_face2face/1/98ae61b124ca775274f283a92efc061f_z.jpg-750x1000',
    head_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/98ae61b124ca775274f283a92efc061f_z.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/3a0896f8c9a3327f0abb56d111da9a25_q.jpg-750x1000'],
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/98ae61b124ca775274f283a92efc061f_z.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/3a0896f8c9a3327f0abb56d111da9a25_q.jpg-750x1000'],
    price: 16,
    sale: 97,
    stock: 350,
    isChooseType: false,
    new: true,
    single_intro: '手账本',
    discount: 12.8,
}, {
    good_id: 9,
    type: 34, //周边
    big_type: 33,
    hot: false,
    name: '32g创意U盘可爱女生卡通学生优盘个性电脑手机两用大容量',
    img: 'https://static1.cxy61.com/bcgame_face2face/1/51d84eb59ade6e6b1223146c876aa0d1_p.jpg-800x800',
    head_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/51d84eb59ade6e6b1223146c876aa0d1_p.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/b21d906f64789ffb5c7f9ae80d278c17_y.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/236acee96964027bd8bb07ee59b5ffca_f.jpg-800x800'],
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/51d84eb59ade6e6b1223146c876aa0d1_p.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/b21d906f64789ffb5c7f9ae80d278c17_y.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/236acee96964027bd8bb07ee59b5ffca_f.jpg-800x800'],
    price: 37.3,
    sale: 876,
    stock: 398,
    isChooseType: false,
    discount: 29.8,
    new: false,
    //是否有分类选择
    isChooseType: true,
    types: [{
        type_id: 1,
        name: '好事发生',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/48d7188ad99c2772a27e246aa38d9bd4_l.png-337x339',
    }, {
        type_id: 2,
        name: '眨眼女孩',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/245a694afc00a32cd848f818d3548134_s.png-337x341',
    }, {
        type_id: 3,
        name: '小姐姐',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/ddfbfffd6e9062376702c84f49e4ed57_h.png-339x338',
    }, {
        type_id: 4,
        name: '呆萌女孩',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/56ad6daeb2c3943f0850e495ffe6f0a0_c.png-340x340',
    }],
    //第二个分类
    isChooseSize: true,
    isChooseSizeName: '套餐类型',
    sizes: [{
        id: 1,
        name: '官方标配'
    }],
}, {
    good_id: 10,
    type: 35, //周边
    big_type: 33,
    hot: false,
    name: 'ins傻瓜相机女小礼物实用的潜水胶卷相机学生款迷你复古胶片可换',
    img: 'https://static1.cxy61.com/bcgame_face2face/1/6740b004c9c1783f46db13c71f312b28_j.jpg-750x1000',
    head_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/6740b004c9c1783f46db13c71f312b28_j.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/a12f4494f6295470a06e67246b7a16b6_h.jpg-750x1000'],
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/6740b004c9c1783f46db13c71f312b28_j.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/a12f4494f6295470a06e67246b7a16b6_h.jpg-750x1000'],
    price: 29.8,
    sale: 35,
    stock: 398,
    isChooseType: false,
    discount: 23.8,
    new: false,

}, {
    good_id: 13,
    type: 46, //文具
    big_type: 44,
    hot: true,
    name: '双头荧光笔糖果彩色标记笔粗划重点细头笔学生用记号笔手账笔文具',
    img: 'https://static1.cxy61.com/bcgame_face2face/1/62a0f6326f3c291fd6ea5d60d1855e66_h.jpg-800x800',
    head_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/62a0f6326f3c291fd6ea5d60d1855e66_h.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/4bf3da731ab9c308d9801efd137d3284_u.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/11f61985f6f77d42a26c9fa3b715ba0f_o.jpg-800x800'],
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/62a0f6326f3c291fd6ea5d60d1855e66_h.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/4bf3da731ab9c308d9801efd137d3284_u.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/11f61985f6f77d42a26c9fa3b715ba0f_o.jpg-800x800'],
    price: 2.2,
    sale: 45,
    stock: 119,
    isChooseType: false,
    discount: 1.8,
    new: false,

}, {
    good_id: 14,
    type: 12, //文具
    big_type: 44,
    hot: true,
    name: '网红笔筒ins创意时尚可爱儿童学生宿舍桌面大容量旋转文具收纳盒',
    img: 'https://static1.cxy61.com/bcgame_face2face/1/f968fc5879190f3b311a806a6f9bd6ae_p.jpg-750x1000',
    head_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/f968fc5879190f3b311a806a6f9bd6ae_p.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/898aaa3f3fa31d2a4b04657d64b93368_u.jpg-750x1000'],
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/f968fc5879190f3b311a806a6f9bd6ae_p.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/898aaa3f3fa31d2a4b04657d64b93368_u.jpg-750x1000'],
    price: 9,
    sale: 27,
    stock: 119,
    isChooseType: false,
    discount: 8.72,
    single_intro: '旋转笔筒',
    new: true,

}]))

//拼团 商品 列表 
wx.setStorageSync('group', JSON.stringify([{
    type: 11,
    good_id: '1',
    good_name: '网红化妆包女便携大容量高级感简约软萌治愈系防水收纳袋洗漱包',
    //size人团
    size: 2,
    now_people: 0,
    good_price: 11.8,
    now_price: 9.8,
    img: 'https://static1.cxy61.com/bcgame_face2face/1/3c114bdbc6434c23af4ac0fb09779874_x.jpg-750x1000',
    intro: '',
    good_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/3c114bdbc6434c23af4ac0fb09779874_x.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/1470d9186106969bae0261a1a0a6d1de_b.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/0010466f123987d579043571a0072870_r.jpg-750x1000'],
    //库存
    stock: 119,
    //是否有分类选择
    isChooseType: true,
    types: [{
        type_id: 1,
        name: '抱抱白熊',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/752c5784d719c129c3e67bc8c8a8f42d_n.png-182x187',
    }, {
        type_id: 2,
        name: '抱抱棕熊',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/c1f577f2b5fc68c5c0cbc02a64b5adba_s.png-185x186',
    }, {
        type_id: 3,
        name: '萌白熊头',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/0e2f0b48e3fb8b946f47e955e97462b3_z.png-187x188',
    }, {
        type_id: 4,
        name: '棕白熊头',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/917245dbed005fc137949cd3827569ba_u.png-182x184',
    }],
    show: true,
    single_intro: '收纳袋',
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/3c114bdbc6434c23af4ac0fb09779874_x.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/1470d9186106969bae0261a1a0a6d1de_b.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/0010466f123987d579043571a0072870_r.jpg-750x1000'],
}, {
    good_id: 3,
    type: 11,
    good_name: '少女心可爱毛绒化妆包便携ins风日系大容量化妆品收纳包袋',
    //size人团
    size: 2,
    now_people: 34,
    good_price: 18.8,
    now_price: 16.8,
    single_intro: '毛绒化妆包',
    //是否有分类选择
    isChooseType: true,
    types: [{
        type_id: 1,
        name: '紫色',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/cf7a20738f0deb1068c6a0b38f4ae073_n.png-274x280',
    }, {
        type_id: 2,
        name: '粉色',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/a79f50d836f5c3d56f93be95ccdd584b_b.png-275x279',
    }],
    img: 'https://static1.cxy61.com/bcgame_face2face/1/b70441118df2b3e8c29ef3bb5b3fc2a5_d.jpg-800x800',
    intro: '15天退货 免费送装 无忧质保 破损包赔 免费上门 退货运费险',
    good_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/b70441118df2b3e8c29ef3bb5b3fc2a5_d.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/98562e73fdae661b8d506408082122e9_a.jpg-800x800'],
    stock: 119,
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/b70441118df2b3e8c29ef3bb5b3fc2a5_d.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/98562e73fdae661b8d506408082122e9_a.jpg-800x800'],

}, {
    type: 11,
    good_id: 4,
    good_name: 'ins风礼品纸袋礼物礼袋手提少女简约包装袋子伴手礼礼盒',
    //size人团
    size: 2,
    show: true,
    single_intro: '礼物礼袋',
    now_people: 4,
    good_price: 3.2,
    now_price: 2.8,
    img: 'https://static1.cxy61.com/bcgame_face2face/1/6dd71485661570bdd3980c8dc9b1771f_g.jpg-800x800',
    intro: '海量新品 潮流穿搭 玩趣互动',
    good_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/6dd71485661570bdd3980c8dc9b1771f_g.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/fe6b9dbea7ce7406246efb231adb27b7_n.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/a5e2b8c6270a33320680c8d167b3a3fa_n.jpg-800x800'],
    stock: 112,
    //是否有分类选择
    isChooseType: true,
    types: [{
        type_id: 1,
        name: '晚安',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/5adf8970c4e98d2e734807fa7af32b59_p.png-142x146',
    }, {
        type_id: 2,
        name: '条形兔子',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/f10b0652a3f07bdeb79b97e4f665e632_k.png-204x208',
    }, {
        type_id: 3,
        name: '条形女孩',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/c19fe16f72a0c03f97d3e8e76ec1724b_x.png-205x207',
    }, {
        type_id: 4,
        name: '条形小熊',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/c19fe16f72a0c03f97d3e8e76ec1724b_x.png-202x206',
    }, {
        type_id: 5,
        name: '橙色女孩',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/56ad6daeb2c3943f0850e495ffe6f0a0_c.png-209x206',
    }, {
        type_id: 6,
        name: '绿色小熊',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/39ae10016fddfb470dba29ee6fec2f1e_p.png-205x208',
    }, {
        type_id: 7,
        name: '黄色小熊',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/1d4f02921e4306842a28bede7af306b7_t.png-204x207',
    }, {
        type_id: 8,
        name: '出游',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/d83a853b70739c5a718c9cd6bca1a0d8_r.png-144x146',
    }],
    //第二个分类
    isChooseSize: true,
    sizes: [{
        id: 1,
        name: '18*21cm'
    }, {
        id: 2,
        name: '20.5*18cm'
    }],
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/6dd71485661570bdd3980c8dc9b1771f_g.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/fe6b9dbea7ce7406246efb231adb27b7_n.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/a5e2b8c6270a33320680c8d167b3a3fa_n.jpg-800x800'],
}, {
    type: 44,
    good_id: 5,
    good_name: '简约ins风活页笔记本子大学生文具夹环可拆卸少女心b5可爱线圈本',
    //size人团
    size: 4,
    show: true,
    now_people: 3,
    good_price: 8.7,
    now_price: 6.7,
    img: 'https://static1.cxy61.com/bcgame_face2face/1/f57394d4f6a691bb6f366c1a6bde087f_a.jpg-1079x1440',
    intro: '',
    single_intro: '线圈本',
    good_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/f57394d4f6a691bb6f366c1a6bde087f_a.jpg-1079x1440', 'https://static1.cxy61.com/bcgame_face2face/1/b9cd1f98f4500e75440e1f47e9749da0_u.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/985feda1e03f0c911f4179144ac4ebba_z.jpg-750x1000'],
    stock: 112,
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/f57394d4f6a691bb6f366c1a6bde087f_a.jpg-1079x1440', 'https://static1.cxy61.com/bcgame_face2face/1/b9cd1f98f4500e75440e1f47e9749da0_u.jpg-750x1000', 'https://static1.cxy61.com/bcgame_face2face/1/985feda1e03f0c911f4179144ac4ebba_z.jpg-750x1000'],
}, {
    type: 22,
    good_id: 7,
    good_name: '手账本简约ins风少女心精致可爱日记记事网格本笔记本子',
    //size人团
    size: 2,
    show: true,
    now_people: 17,
    good_price: 16,
    now_price: 14.8,
    img: 'https://static1.cxy61.com/bcgame_face2face/1/855512a3e0126fb41704fa807cc02a84_e.jpg-800x800',
    intro: '',
    single_intro: '笔记本',
    good_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/855512a3e0126fb41704fa807cc02a84_e.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/90234d923b9996ede549de946ddcd4c1_x.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/94f1411f0344fb8912eebd0ede9b25b1_u.jpg-800x800'],
    stock: 112,
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/855512a3e0126fb41704fa807cc02a84_e.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/90234d923b9996ede549de946ddcd4c1_x.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/94f1411f0344fb8912eebd0ede9b25b1_u.jpg-800x800'],
}, {
    type: 33,
    good_id: 9,
    good_name: '32g创意U盘可爱女生卡通学生优盘个性电脑手机两用大容量',
    //size人团
    size: 2,
    show: true,
    now_people: 14,
    good_price: 29.8,
    now_price: 26.8,
    img: 'https://static1.cxy61.com/bcgame_face2face/1/236acee96964027bd8bb07ee59b5ffca_f.jpg-800x800',
    intro: '',
    single_intro: 'U盘',
    //是否有分类选择
    isChooseType: true,
    types: [{
        type_id: 1,
        name: '好事发生',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/48d7188ad99c2772a27e246aa38d9bd4_l.png-337x339',
    }, {
        type_id: 2,
        name: '眨眼女孩',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/245a694afc00a32cd848f818d3548134_s.png-337x341',
    }, {
        type_id: 3,
        name: '小姐姐',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/ddfbfffd6e9062376702c84f49e4ed57_h.png-339x338',
    }, {
        type_id: 4,
        name: '呆萌女孩',
        img: 'https://static1.cxy61.com/bcgame_face2face/1/56ad6daeb2c3943f0850e495ffe6f0a0_c.png-340x340',
    }],
    //第二个分类
    isChooseSize: true,
    isChooseSizeName: '套餐类型',
    sizes: [{
        id: 1,
        name: '官方标配'
    }],
    good_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/51d84eb59ade6e6b1223146c876aa0d1_p.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/b21d906f64789ffb5c7f9ae80d278c17_y.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/236acee96964027bd8bb07ee59b5ffca_f.jpg-800x800'],
    stock: 112,
    intro_imgs: ['https://static1.cxy61.com/bcgame_face2face/1/51d84eb59ade6e6b1223146c876aa0d1_p.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/b21d906f64789ffb5c7f9ae80d278c17_y.jpg-800x800', 'https://static1.cxy61.com/bcgame_face2face/1/236acee96964027bd8bb07ee59b5ffca_f.jpg-800x800'],
}]))

//所有优惠券 列表
wx.setStorageSync('couponsList', JSON.stringify([{
    discount: 0.9, //0.9折
    condition: 100, //满100.00元可用
    name: '9折优惠券',
    time: '领券三天内有效',
    status: '1',
    type: 'discount',
    id: 1
}, {
    discount: 6,
    condition: 20, //满20.00元可用
    name: '6元优惠券',
    time: '2020-01-01~2020-12-31',
    status: '2',
    type: 'rebate',
    id: 2
}, {
    discount: 0.8, //0.8折
    condition: 50, //满50.00元可用
    name: '8折优惠券',
    time: '2020-01-01~2020-12-31',
    status: '1',
    type: 'discount',
    id: 4
}, {
    discount: 0.9, //0.9折
    condition: 100, //满100.00元可用
    name: '9折优惠券',
    time: '领券三天内有效',
    status: '3',
    type: 'discount',
    id: 3
}, ]))

//我的优惠券 列表
//三种类型
//1 未使用
//2 已使用
//3 已过期
wx.setStorageSync('myCouponsList', JSON.stringify([{
    discount: 10,
    condition: 50,
    name: '10元优惠券',
    time: '领券三天内有效',
    status: '1',
    type: 'rebate',
    id: 5
}, {
    discount: 30,
    condition: 200,
    name: '30元优惠券',
    time: '领券七内有效',
    status: '1',
    type: 'rebate',
    id: 6
}, {
    discount: 0.9,
    condition: 100,
    name: '9折优惠券',
    time: '领券三天内有效',
    status: '2',
    type: 'discount',
    id: 1
}, {
    discount: 6,
    condition: 10,
    name: '6元优惠券',
    time: '2020-01-01~2020-12-31',
    status: '2',
    type: 'rebate',
    id: 2
}, {
    discount: 5,
    condition: 50,
    name: '5元优惠券',
    time: '2020-01-01~2020-12-31',
    status: '3',
    type: 'rebate',
    id: 4
}, {
    discount: 0.9,
    condition: 100,
    name: '9折优惠券',
    time: '领券三天内有效',
    status: '1',
    type: 'discount',
    id: 3
}, ]))

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
            //获取首页头部广告
            var res = {
                status: 200,
                data: {
                    name: 'MANGO TOURS',
                    imgs: ['https://static1.cxy61.com/bcgame_face2face/1/1104bdb05863ae4dcdc6dec65074c475_s.jpg-1080x1439', 'https://static1.cxy61.com/bcgame_face2face/1/2d14a2b616401789750ff735c87f97db_v.jpg-750x1000']
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
                    isShowBenefit: false
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
        } else if (url == "delCartGood") {
            //删除购物车的商品
            //要求上传的是一个数组
            var {
                list
            } = data

            log(list)

            var cart_list = JSON.parse(wx.getStorageSync('cart_list'))

            cart_list = cart_list.filter(e => {
                return !list.includes(e.good_id)
            })

            wx.setStorageSync('cart_list', JSON.stringify(cart_list))

            var res = {
                status: 200,
                data: {
                    msg: '删除成功'
                }
            }
        } else if (url == "addCart") {
            //加入购物车
            //获取商品ID和类型和数量
            var {
                good_id
            } = data
            var cart_list = wx.getStorageSync('cart_list') == null || wx.getStorageSync('cart_list') == '' ? [] : JSON.parse(wx.getStorageSync('cart_list'))

            // var list = cart_list.filter(e => {
            //     return e.good_id != good_id
            // })
            // cart_list = list
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
            var good_id = data.good_id

            log(id)

            var list = JSON.parse(wx.getStorageSync('goodList'))

            list = list.filter(e => {
                return e.good_id == good_id
            })
            log(list)
            var res = {
                status: 200,
                msg: list[0]
            }
            // var res = {
            //     status: 200,
            //     data: {
            //         head_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
            //         name: '超值特惠丨有效护理按模套餐',
            //         price: 2200,
            //         sale: 52,
            //         stock: 59,
            //         intro_imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=744411103,1545292604&fm=26&gp=0.jpg'],
            //         isChooseType: true,
            //         types: [{
            //             id: 1,
            //             name: '2388元丽丝阁2晚+双早+旅拍+接送机+赠200元水疗代金',
            //             isChoose: true
            //         }, {
            //             id: 2,
            //             name: '2388元丽丝阁2晚+双早+接送机',
            //             isChoose: false
            //         }]
            //     }
            // }

        } else if (url == "getGoodList") {
            //get
            if (method == 'get') {
                var {
                    type,
                    sort_type,
                    keyword,
                    hot
                } = data

                log(data)
                log(type)
                //sort_type 列表排序依据
                //keyword 搜索关键词

                //sort_type：
                //normal 综合
                //sale 销量
                //price_to_low 价格从高到低
                //price_to_high 价格从低到高


                var list = JSON.parse(wx.getStorageSync('goodList'))

                //是否爆款
                if (hot == 'true') {
                    log('这')
                    list = list.filter(e => {
                        return e.hot == true
                    })
                }


                if (type == 0) {
                    //全部
                } else if (type == 11 || type == 22 || type == 33 || type == 44) {
                    log('yinggai')
                    list = list.filter(e => {
                        return e.big_type == type
                    })
                    log(list)
                } else {
                    list = list.filter(e => {
                        return e.type == type
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
                        return new RegExp(keyword).test(e.name)
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
        } else if (url == 'getNewGood') {
            log()
            var list = JSON.parse(wx.getStorageSync('goodList'))
            list = list.filter(e => {
                return e.new == true
            })
            var res = {
                status: 200,
                data: {
                    list
                }
            }
        } else if (url == 'indexSortList') {
            var res = {
                status: 200,
                data: {
                    sort_list: [
                        //11 收纳
                        //22 手账 
                        //33 数码周边
                        //44 文具
                        {
                            id: 11,
                            name: '收纳',
                            img: 'https://static1.cxy61.com/bcgame_face2face/1/3c114bdbc6434c23af4ac0fb09779874_x.jpg-750x1000',
                            types: [{
                                id: 12,
                                name: '收纳盒',
                                img: 'https://static1.cxy61.com/bcgame_face2face/1/f968fc5879190f3b311a806a6f9bd6ae_p.jpg-750x1000'
                            }, {
                                id: 13,
                                name: '收纳包',
                                img: 'https://static1.cxy61.com/bcgame_face2face/1/3c114bdbc6434c23af4ac0fb09779874_x.jpg-750x1000'
                            }]
                            // img:'/images/公文包 (1).png'
                        },
                        {
                            id: 22,
                            name: '手账',
                            img: 'https://static1.cxy61.com/bcgame_face2face/1/f57394d4f6a691bb6f366c1a6bde087f_a.jpg-1079x1440',
                            types: [{
                                id: '23',
                                name: '手账本',
                                img: 'https://static1.cxy61.com/bcgame_face2face/1/f57394d4f6a691bb6f366c1a6bde087f_a.jpg-1079x1440'
                            }]
                            // img:'/images/书本 (1).png'
                        },
                        {
                            id: 33,
                            name: '周边',
                            img: 'https://static1.cxy61.com/bcgame_face2face/1/51d84eb59ade6e6b1223146c876aa0d1_p.jpg-800x800',
                            types: [{
                                id: '34',
                                name: '电子设备',
                                img: 'https://static1.cxy61.com/bcgame_face2face/1/236acee96964027bd8bb07ee59b5ffca_f.jpg-800x800'
                            }, {
                                id: '35',
                                name: '小玩具',
                                img: 'https://static1.cxy61.com/bcgame_face2face/1/6740b004c9c1783f46db13c71f312b28_j.jpg-750x1000'
                            }]
                        },
                        {
                            id: 44,
                            name: '文具',
                            img: 'https://static1.cxy61.com/bcgame_face2face/1/62a0f6326f3c291fd6ea5d60d1855e66_h.jpg-800x800',
                            types: [{
                                id: '45',
                                name: '本子',
                                img: 'https://static1.cxy61.com/bcgame_face2face/1/f57394d4f6a691bb6f366c1a6bde087f_a.jpg-1079x1440'
                            }, {
                                id: '46',
                                name: '笔',
                                img: 'https://static1.cxy61.com/bcgame_face2face/1/62a0f6326f3c291fd6ea5d60d1855e66_h.jpg-800x800'
                            }]
                            // img:'/images/红色笔 (1).png'
                        },
                    ],
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
            var {
                token
            } = data
            if (token == '' || token == null) {
                var res = {
                    status: 401,
                    data: {
                        msg: '请登录'
                    }
                }
            } else {
                //获取地址列表

                //获取本地数据
                var list = wx.getStorageSync('addressList') == '' || wx.getStorageSync('addressList') == null ? [] : JSON.parse(wx.getStorageSync('addressList'))

                if (list.length == 0) {

                    var res = {
                        status: 200,
                        data: {
                            list: []
                        }
                    }
                } else {
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
            }

        } else if (url == 'delAddress') {
            //删除地址
            var {
                id,
                token
            } = data

            if (token == '' || token == null) {
                var res = {
                    status: 401,
                    data: {
                        msg: '请登录'
                    }
                }
            } else {
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
            var {
                token
            } = data
            if (token == '' || token == null) {
                var res = {
                    status: 401,
                    data: {
                        msg: '请登录',
                    }
                }
            } else {

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
            }


        } else if (url == 'getOrderList') {
            var {
                id,
                token
            } = data

            //全部 0
            //待付款 1
            //待发货 2
            //待收货 3
            //待评价 4
            //已完成 5
            //退款   6

            if (token == '' || token == null) {
                var res = {
                    status: 401,
                    data: {
                        msg: '请登录'
                    }
                }
            } else {
                var list = wx.getStorageSync('orderList') == '' || wx.getStorageSync('orderList') == null ? [] : JSON.parse(wx.getStorageSync('orderList'))


                if (id == 0) {

                } else {
                    list = list.filter(e => {
                        return e.status == id
                    })
                }

                var res = {
                    status: 200,
                    data: {
                        list
                    }
                }
            }

            // 输出结果
            // console.log(JSON.stringify(res, null, 2))
        } else if (url == 'getOrderNumber') {
            var {
                token
            } = data
            log(token)

            if (token == '' || token == null) {
                var res = {
                    status: 401,
                    data: {
                        msg: '请登录'
                    }
                }
            } else {
                //个人中心页面 获取订单数量

                var list = wx.getStorageSync('orderList') == '' || wx.getStorageSync('orderList') == null ? [] : JSON.parse(wx.getStorageSync('orderList'))
                var wait_pay_number = 0 //待付款 1
                var wait_get_number = 0 //待收货 3
                var refund_number = 0 //退款 6
                list.forEach(e => {
                    if (e.status == 1) {
                        wait_pay_number = wait_pay_number + 1
                    } else if (e.status == 3) {
                        wait_get_number = wait_get_number + 1
                    } else if (e.status == 6) {
                        refund_number = refund_number + 1
                    }
                })

                //返回
                var res = {
                    status: 200,
                    data: {
                        wait_pay_number,
                        wait_get_number,
                        refund_number
                    }
                }
            }


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
            //这是待付款状态下的取消订单
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
        } else if (url == "cancelOrder") {
            //这是待发货状态下的取消订单
            var {
                id
            } = data

            var list = JSON.parse(wx.getStorageSync('orderList'))
            list = list.map(e => {
                if (e.id == id) {
                    e.status = 6
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
                    msg: '已提交取消订单申请'
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
        } else if (url == "addComment") {
            var {
                id,
                rate_value,
                comment,
                imgList
            } = data

            //处理
            log(data)

            //修改指定的订单状态
            var list = JSON.parse(wx.getStorageSync('orderList'))
            list = list.map(e => {
                if (e.id == id) {
                    e.status = 5
                    return e
                } else {
                    return e
                }
            })
            wx.setStorageSync('orderList', JSON.stringify(list))

            var res = {
                status: 200,
                data: {
                    msg: '发表成功'
                }
            }
        } else if (url == "getCouponsList") {
            var {
                token
            } = data
            if (token == '' || token == null) {
                var res = {
                    status: 401,
                    data: {
                        msg: '请登录'
                    }
                }
            } else {
                var list = JSON.parse(wx.getStorageSync('couponsList'))
                var res = {
                    status: 200,
                    data: {
                        list
                    }
                }
            }

        } else if (url == "getCoupon") {
            //领取优惠券
            var {
                id,
                token
            } = data
            if (token == '' || token == null) {
                var res = {
                    status: 401,
                    data: {
                        msg: '请登录'
                    }
                }
            } else {
                var list = JSON.parse(wx.getStorageSync('couponsList'))
                var add = list.filter(e => {
                    //一个
                    return e.id == id
                })

                //同时还要改变 我的优惠券 列表
                var myCouponsList = JSON.parse(wx.getStorageSync('myCouponsList'))
                add[0]['status'] = 1
                myCouponsList.push(...add)
                log(myCouponsList)
                wx.setStorageSync('myCouponsList', JSON.stringify(myCouponsList))


                list = list.map(e => {
                    if (e.id == id) {
                        e.status = 3
                        return e
                    } else {
                        return e
                    }
                })



                wx.setStorageSync('couponsList', JSON.stringify(list))

                //重新返回新的列表
                var res = {
                    status: 200,
                    data: {
                        list
                    }
                }
            }

        } else if (url == "getMyCouponsList") {
            var {
                status,
                token
            } = data
            //status

            if (token == '' || token == null) {
                var res = {
                    status: 401,
                    data: {
                        msg: '请登录'
                    }
                }
            } else {
                var list = JSON.parse(wx.getStorageSync('myCouponsList'))
                list = list.filter(e => {
                    return e.status == status
                })

                var res = {
                    status: 200,
                    data: {
                        list
                    }
                }
            }

        } else if (url == 'getMyCouponsNumber') {
            var {
                token
            } = data
            if (token == '' || token == null) {
                var res = {
                    status: 401,
                    data: {
                        msg: '请登录'
                    }
                }
            } else {
                //个人中心 获取优惠券数量（未使用的）
                var list = JSON.parse(wx.getStorageSync('myCouponsList'))
                list = list.filter(e => {
                    return e.status == 1
                })
                var res = {
                    status: 200,
                    data: {
                        length: list.length
                    }
                }
            }

        } else if (url == "getMoney") {
            var {
                token
            } = data

            if (token == '' || token == null) {
                var res = {
                    status: 401,
                    data: {
                        msg: '请登录'
                    }
                }
            } else {
                //获取钱包余额
                var res = {
                    status: 200,
                    data: {
                        msg: 0
                    }
                }
            }


        } else if (url == "getGroupOrderList") {
            //获取拼团订单

            var {
                status
            } = data

            log(status)


            var list = wx.getStorageSync('groupOrderList') == '' || wx.getStorageSync('groupOrderList') == null ? [] : JSON.parse(wx.getStorageSync('groupOrderList'))

            if (status == 0) {
                //全部
            } else {
                list = list.filter(e => {
                    return e.status == status
                })
            }
            var res = {
                status: 200,
                data: {
                    list
                }
            }
        } else if (url == 'cancelGroupOrder') {
            var {
                id
            } = data
            //取消拼团订单
            var list = JSON.parse(wx.getStorageSync('groupOrderList'))
            list = list.map(e => {
                if (e.id == id) {
                    //订单状态变成退款中
                    e.status = 5
                    return e
                } else {
                    return e
                }
            })
            wx.setStorageSync('groupOrderList', JSON.stringify(list))
            var res = {
                status: 200,
                data: {
                    msg: '成功取消'
                }
            }
        } else if (url == 'delGroupOrder') {
            var {
                id
            } = data
            //删除拼团订单
            var list = JSON.parse(wx.getStorageSync('groupOrderList'))
            list = list.filter(e => {
                return e.id !== id
            })
            wx.setStorageSync('groupOrderList', JSON.stringify(list))
            var res = {
                status: 200,
                data: {
                    msg: '成功取消'
                }
            }
        } else if (url == 'confirmGroupOrder') {
            var {
                id
            } = data
            //拼团订单 确认收货
            var list = JSON.parse(wx.getStorageSync('groupOrderList'))
            list = list.map(e => {
                if (e.id == id) {
                    //订单状态变成已完成
                    e.status = 6
                    return e
                } else {
                    return e
                }
            })
            wx.setStorageSync('groupOrderList', JSON.stringify(list))
            var res = {
                status: 200,
                data: {
                    msg: '确认收货成功'
                }
            }
        } else if (url == 'getGroupOrderMsg') {
            //获取拼团订单详情
            var {
                id
            } = data
            var list = JSON.parse(wx.getStorageSync('groupOrderList'))
            var msg = list.filter(e => {
                return e.id == id
            }) //msg 是一个数组
            var res = {
                status: 200,
                data: {
                    msg: msg[0]
                }
            }
        } else if (url == 'getGroupType') {
            //获取拼团列表中的分类
            var res = {
                status: 200,
                data: {
                    types: [{
                            type: 0,
                            name: '全部'
                        },
                        {
                            type:11,
                            name: '收纳'
                        },
                        {
                            type: 22,
                            name: '手账'
                        },
                        {
                            type: 33,
                            name: '数码周边'
                        },
                        {
                            type: 44,
                            name: '文具'
                        },
                    ]
                }
            }
        } else if (url == 'getGroup') {
            var {
                type
            } = data



            var list = JSON.parse(wx.getStorageSync('group'))

            if (type == 0) {
                //全部  不用筛选
            } else {
                list = list.filter(e => {
                    return e.type == type
                })
            }
            var res = {
                status: 200,
                data: {
                    list
                }
            }
        } else if (url == 'getGroupGoodMsg') {
            var {
                id
            } = data
            log(id)
            var list = JSON.parse(wx.getStorageSync('group'))
            var item = list.filter(e => {
                return e.good_id == id
            })
            log(item)
            var res = {
                status: 200,
                data: {
                    msg: item[0]
                }
            }
        } else if (url == 'getPaymentPara') {
            //获取code、order_id、token
            //传入订单id
            var {
                code,
                order_id,
                token
            } = data

            if (token == '' || token == null) {
                var res = {
                    status: 401,
                    data: {
                        msg: '请登录'
                    }
                }
            } else {
                var deal_amount = 0
                var orderList = JSON.parse(wx.getStorageSync('orderList'))
                orderList.forEach(e => {
                    if (e.id == order_id) {
                        deal_amount = e.actually_pay
                    }
                })
                var res = {
                    status: 200,
                    data: {

                        data: {
                            "deal_amount": deal_amount,
                            "serial_id": "16105172941691610517719",
                            "openid": "oVGbN4q4nbrLz4D-eu4_GX1xl1GM",
                            "attach": "payorder",
                            "state": 1,
                            "timeStamp": "1610517719",
                            "nonceStr": "KkfRTLuVAgqeNjlmiASliVKDOFSBruQn",
                            "signType": "MD5",
                            "package": "prepay_id=wx13140159525945494aa81aa8d893480000",
                            "paySign": "00ABD8C20D4B8FC21A738F7458820008",
                            "out_trade_no": "16105172941691610517719"
                        }
                    }
                }
            }


        }



        fn(res);
    }
}
module.exports = {
    ajax: ajax
}