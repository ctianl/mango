Component({
    properties: {

        list:{
            type:Array,
            value: [],
        },
        naviImg:{
            type:String,
            value:''
        }
    },

    data: {
        // 这里是一些组件内部数据
        isShow:false,
        animationData:{}
    },

    methods: {
        show:function(){
            this.setData({
                isShow:!this.data.isShow
            })

        },
        toPath:function(e){
            var path=e.currentTarget.dataset.path
            wx.reLaunch({
              url: path,
            })
        },

    }

})