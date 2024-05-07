// pages/disDel/disDel.ts /user_wallet_record/list
import {
  userWalletRecord,withdrawal,vipInfo,tiXian,wallet
} from '../../request/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottomLift:0,
    dataList:[],
    vipInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
		this.setData({
      bottomLift: app.globalData.bottomLift,
      vipInfo:app.globalData.wallet,
    })
  },
  getUserWalletRecord(){
    userWalletRecord({
      type:5,
      status:0
    }).then(res=>{
      console.log(res,'ressss')
      if(res.data.length<1){
        wx.showToast({
          title: '暂无结算信息',
          icon:'none'
        })
        return
      }
      this.setData({
        dataList:res.data
      })
    })
  },
  tixian(){
    withdrawal({
      price:'1'
    }).then(res=>{
      console.log(res,'ressss')
    })
  },
  goTixian(){
    wx.navigateTo({
      url: '../applyWithdrawal/applyWithdrawal',
    })
  },
  getQianBao(){
    console.log(123)
    wallet().then(res=>{
      app.globalData.wallet = res.data
      this.setData({
        vipInfo:res.data,
      })
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