// pages/my/my.js  /user_wallet/get
import {
  wallet,
} from '../../request/api.js'
import { updateBaseURL } from '../../request/request.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qianbao:null,
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      headerHeight:app.globalData.titleHeight,
      userInfo:app.globalData.userInfo
    })
    
    this.getWallet()
  },
  updataUrl(){
    updateBaseURL()
  },
  getWallet(){
    wallet().then(res=>{
      app.globalData.wallet = res.data
      this.setData({
        qianbao:res.data,
      })
    })
  },
  goOrderList(e){
    wx.navigateTo({
      url: '../orderList/orderList?tab=' + e.currentTarget.dataset.tab
    })
  },
  goCoupon(){
    wx.navigateTo({
      url: '../coupon/coupon'
    })
  },
  goBalance(){
    wx.navigateTo({
      url: '../balance/balance'
    })
  },
  goScore(){
    wx.showToast({
      title: '未开发',
      icon:'none'
    })
  },
  goAdrList(){
    wx.navigateTo({
      url: '../adrList/adrList'
    })
  },
  goSetting(){
    wx.navigateTo({
      url: '../setting/setting'
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