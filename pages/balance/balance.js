// pages/balance/balance.ts
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceList:[
      {price:1000},
      {price:500},
      {price:200},
      {price:100},
      {price:50},
    ],
    currIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      headerHeight:app.globalData.titleHeight,
      statusBarHeight:app.globalData.statusBarHeight,
      capsuleObj:app.globalData.capsuleObj,
    })
  },
  checkPrice(e){
    console.log(e)
    this.setData({
      currIndex:e.currentTarget.dataset.index
    })
  },
  goBack(){
    wx.navigateBack(1)
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