// pages/order/order.ts
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[
      {
        name:'彩食鲜菠菜 270g/份',
        guige:'1kg/份',
        num:'2份',
        image:'../../image/ca1.jpg',
        price:'12'
      },
      {
        name:'彩食鲜菠菜 270g/份',
        guige:'1kg/份',
        num:'2份',
        image:'../../image/ca2.jpg',
        price:'12'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log(app.globalData.tabbarHeight,'app.globalData.tabbarHeight')
    this.setData({
      tabbarHeight:app.globalData.tabbarHeight
    })
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