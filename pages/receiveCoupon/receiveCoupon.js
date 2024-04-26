import {
  receiveCouponList,addCoupon
} from '../../request/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getReceiveCouponList()
  },
  getReceiveCouponList(){
    receiveCouponList({
      shop_id:0,
      page:0,
      page_size:100
    }).then(res=>{
      console.log(res.data,'可领优惠券')
      this.setData({
        klqCoupon:res.data
      })
    })
  },
  getAddCoupon(e){
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    
      addCoupon({
      coupon_id:id
      }).then(res=>{
        if(res.code == '200'){
          wx.showToast({
            title: '领取成功',
          })
        }else{
          wx.showToast({
            title: res.msg,
            icon:'none'
          })
        }
        
        this.getReceiveCouponList()
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