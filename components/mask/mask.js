// components/mask/mask.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value:false,
    }
  },
  
  // 监听
  observers: {
    'show': function () {
      if(this.properties.show){
        this.show()
        this.setData({
          value: this.properties.show
        })
      }else{
        this.hide()
        setTimeout(() => {
          this.setData({
            value: this.properties.show
          })
        }, 500)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value:false,
    ani:null,//动画
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show(){
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      });
      animation.opacity(1).step()
      this.setData({
        ani: animation.export()
      })
      this.properties.show = true
    },
    hide(){
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      });
      animation.opacity(0).step()
      this.setData({
        ani: animation.export()
      })
      this.properties.show = false
    }
  }
})
