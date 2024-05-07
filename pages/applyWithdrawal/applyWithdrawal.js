import {
  withdrawal
} from '../../request/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jine:'',
    vipInfo:null,
    price:null
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
  allTixian(){
    console.log(123)
    this.setData({
      price:this.data.vipInfo.commission
    })
  },
  setPrice(e){
    console.log(e)
    this.setData({
      price:e.detail.value
    })
  },
  tixian(){
    if(this.data.price > 0){
      withdrawal({
        price:this.data.price
      }).then(res=>{
        // if(res.code == "201"){
        //   wx.showToast({
        //     title: res.msg,
        //     icon:'none'
        //   })
        // }
        if(res.code == "200"){
          wx.showToast({
            title: '提现成功',
          })
          setTimeout(()=>{
            let pages = getCurrentPages(); //获取上一个页面信息栈(a页面)
            let prevPage = pages[pages.length - 2] //给上一页面的tel赋值
            
            // prevPage.couponAfterPrice()
            wx.navigateBack({
              delta: 1,
              success: function (e) { // 成功的回调
                if (prevPage == undefined || prevPage == null) return;
                prevPage.getQianBao(); // 调用A页面的方法, 并将值传过去
              }
            }); //关闭当前页面，返回上一个页面
          },1000)

        }
      })
    }else{
      wx.showToast({
        title: '请输入金额',
        icon:'none'
      })
    }
    
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