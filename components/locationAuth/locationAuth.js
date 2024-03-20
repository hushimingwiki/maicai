// components/locationAuth/locationAuth.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  // 监听
  observers: {
    'value':function(){
      let val = {}
      this.triggerEvent('change',this.data.value)
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //触发父组件关闭
    cancel(){
      this.setData({
        value:false
      })
    },
    // 取消
    close(){
      this.setData({
        value: false
      })
      this.triggerEvent('close')
    },
    show(){
      this.setData({
        value:true
      })
      setTimeout(()=>{
        wx.hideLoading()
      },1000)
    },
    //确认
    confirm(){
      // this.triggerEvent('submit')
    }
  }
})
