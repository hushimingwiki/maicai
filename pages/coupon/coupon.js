import {
  queryCouponList
} from '../../request/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],
    totalPrice: 0,
    shopId: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      totalPrice: options.price,
      shopId: options.shopId,
    })
    this.getCouponList()
  },
  checkCoupon(e) {
    if (this.data.totalPrice > 0) {
      let pages = getCurrentPages(); //获取上一个页面信息栈(a页面)
      let prevPage = pages[pages.length - 2] //给上一页面的tel赋值
      prevPage.setData({
        "couponDetails": e.currentTarget.dataset.item
      });
      // prevPage.couponAfterPrice()
      wx.navigateBack({
        delta: 1,
        success: function (e) { // 成功的回调
          if (prevPage == undefined || prevPage == null) return;
          prevPage.couponAfterPrice(); // 调用A页面的方法, 并将值传过去
        }
      }); //关闭当前页面，返回上一个页面
    }
  },
  getCouponList() {
    queryCouponList({
      shop_id: '',
      expire: '0',
      use: '0',
      page: '0',
      page_size: '100'
    }).then(res => {
      console.log(res, '优惠券列表')
      this.setData({
        couponList: res.data
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