// pages/refund/refund.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clList:[
      {value:1,name:'不退货，帮我申请退款'},
      {value:2,name:'帮我申请退款'},
    ],
    isSd:null,
    isCl:null,
    orderId:null,
    orderPrice:null,
    afterPrice:null,
    liyouInfo:null,
    isSdh:"1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      orderId:options.orderId,
      orderPrice:options.price
    })
  },
  inputLiyou(e){
    this.setData({
      liyouInfo: e.detail.value
    })
  },
  radioChange(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      isSdh:e.detail.value,
    })
  },
  radioChangeTwo(e){
    this.setData({
      isCl:e.detail.value
    })
  },
  inputJine(e){
    console.log(e.detail.value)
    this.setData({
      afterPrice: e.detail.value
    })
  },
  submit(){
    if(!this.data.liyouInfo){
      wx.showToast({
        title: '请输入您的问题',
        icon:'none'
      })
      return
    }else if(!this.data.isCl){
      wx.showToast({
        title: '请选择处理方式',
        icon:'none'
      })
      return
    }else if(this.data.isCl == 1 && this.data.afterPrice < 1){
      wx.showToast({
        title: '金额不能为0',
        icon:'none'
      })
      return
    }
    wx.showToast({
      title: '提交成功',
    })
    setTimeout(res=>{
      wx.navigateBack(1)
    },1000)
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})