// 
import {
  recharge,wallet
} from '../../request/api.js'
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
      {price:0.01}
    ],
    currIndex:0,
    price:1000,
    myYe:'00.00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      headerHeight:app.globalData.titleHeight,
      statusBarHeight:app.globalData.statusBarHeight,
      capsuleObj:app.globalData.capsuleObj,
      myYe:app.globalData.wallet.balance
    })
  },
  getWallet(){
    wallet().then(res=>{
      app.globalData.wallet = res.data
      this.setData({
        myYe:res.data.balance
      })
    })
  },
  chongzhi(e){
    console.log(this.data.price)
    recharge({
      type:'0',
      flag:'',
      price:this.data.price,
      openid:app.globalData.userInfo.openid
    }).then(res=>{
      console.log(res)
      if(res.code == 200){
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.packageVal,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: res => {
            this.getWallet()
            wx.redirectTo({
              url: '/pages/success/success?type=1',
            })
          },fail (err) {
            console.log('pay fail', err)
            wx.showToast({
              title: '取消支付',
              icon:'none'
            })
            // let pages = getCurrentPages(); //获取上一个页面信息栈(a页面)
            // let prevPage = pages[pages.length - 2] //给上一页面的tel赋值
            // wx.navigateBack({
            //   delta: 1,
            //   success: function (e) { // 成功的回调
            //     if (prevPage == undefined || prevPage == null) return;
            //     prevPage.getShopCartList(); // 调用A页面的方法, 并将值传过去
            //   }
            // }); //关闭当前页面，返回上一个页面
          }
        })
      }else {
        app.error(res.data)
      }
    })
  },
  checkPrice(e){
    console.log(e)
    this.setData({
      currIndex:e.currentTarget.dataset.index,
      price:e.currentTarget.dataset.price
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