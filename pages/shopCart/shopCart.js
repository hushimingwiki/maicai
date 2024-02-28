// pages/shopCart/shopCart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatList:[
      {image:'../../image/ca1.jpg',name:'彩食鲜菠菜 270g/份',price:'6.8',num:"1"},
      {image:'../../image/ca2.jpg',name:'云南昆明 有机水果胡萝卜 1.5kg/份',price:'6.8',num:'2'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      tabbarHeight:app.globalData.tabbarHeight
    })
  },
  goOrder(){
    wx.navigateTo({url:'../order/order'})
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