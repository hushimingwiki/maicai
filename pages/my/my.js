// pages/my/my.js  /user_wallet/get
import {
  wallet,queryCouponList
} from '../../request/api.js'
import { updateBaseURL } from '../../request/request.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qianbao:null,
    userInfo:null,
    yhqNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      headerHeight:app.globalData.titleHeight,
      userInfo:app.globalData.userInfo
    })
    
    this.getYhqNum()
  },
  goEditData(){
    wx.navigateTo({
      url: '../editData/editData'
    })
  },
  getYhqNum(){
    queryCouponList({
      expire:"0",
      page:'0',
      page_size:'100'
    }).then(res=>{
      console.log(res)
      console.log('共'+res.data.length+'张优惠券')
      this.setData({
        yhqNum:res.data.length
      })
    })
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
  goVip(){
    wx.navigateTo({
      url: '../vip/vip'
    })
  },
  goDistribution(){
    wx.navigateTo({
      url: '../distribution/distribution'
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
  goTeam(){
    wx.navigateTo({
      url: '../team/team'
    })
  },
  goLike(){
    wx.navigateTo({
      url: '../like/like'
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
    
    this.setData({
      userInfo:app.globalData.userInfo
    })
    var hd = wx.getStorageSync('hd')
    wx.setTabBarBadge({
      index: 2,
      text: hd.toString()
    });
    this.getWallet()
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