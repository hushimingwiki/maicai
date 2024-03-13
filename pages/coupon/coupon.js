
import {
  queryCouponList
} from '../../request/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getCouponList()
  },
  getCouponList(){
    queryCouponList({
      shop_id:'',
      expire:'0',
      use:'0',
      page:'0',
      page_size:'100'
    }).then( res => {
      console.log(res,'优惠券列表')
      this.setData({
        couponList:res.data
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