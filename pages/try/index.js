//index.js
//获取应用实例
const app = getApp()
var API = require('../../utils/api.js')
var {
    log
} = console

Page({
    data: {
        itemList: '',
        another: [{
            itemTitleMain: "one",
            mainPicsUrl: ["https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2972743467,129165969&fm=26&gp=0.jpg", "https://riyugo.com/i/2020/12/18/revous.png", "https://riyugo.com/i/2020/12/18/rer23f.png"]
        }, {
            itemTitleMain: "two",
            mainPicsUrl: ["https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3117692641,2151606631&fm=26&gp=0.jpg", "https://riyugo.com/i/2020/12/18/reuxlm.png"]
        }]

    },

})