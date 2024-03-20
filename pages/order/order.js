// pages/order/order.ts
const app = getApp()
import {
  addressList,
  WXPay,
  addOrder
} from '../../request/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice: 0,
    originPrice:0,
    adrDetails: null,
    // multiArray: [['明天'], ['06:00-06:30', '06:30-07:00', '07:00-07:30', '07:30-08:00', '08:00-08:30', '08:30-09:00', '09:00-09:30', '09:30-10:00', '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00']],
    multiArray: [
      ['明天'],
      ['11:30:00', '17:30:00']
    ],
    multiIndex: [0, 0, 0],
    cartShop: null,
    couponDetails: null,
    cCafterList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options, 'options')
    var cartShop = JSON.parse(options.data)
    // console.log(cartShop, 'cartShop')
    var afterList = []
    cartShop.forEach(item => {
      // console.log(item.stockKeepingUnit.shop_id,'item.stockKeepingUnit.shop_id')
      if(afterList.length > 0){
        afterList.forEach(itemm=>{
          // console.log(itemm,'itemmitemm')
          if(item.stockKeepingUnit.shop_id == itemm.shop_id){
            // console.log(afterList,'匹配到相同店铺')
            var obj = {
              stock_keeping_unit_id: item.stockKeepingUnit.stock_keeping_unit_id,
              quantity: item.quantity
            }
            itemm.data.push(obj)
          }else{
            // console.log(afterList,'不是相同店铺')
          }
        })
      }else{
        // console.log('没有数据')
        var obj = {
          shop_id: item.stockKeepingUnit.shop_id,
          user_coupon_id: '',
          data: [{
            stock_keeping_unit_id: item.stockKeepingUnit.stock_keeping_unit_id,
            quantity: item.quantity
          }]
        }
        afterList.push(obj)
      }

     
     
    })
    this.setData({
      tabbarHeight: app.globalData.tabbarHeight,
      cartShop: cartShop,
      totalPrice: options.price,
      originPrice: options.price,
      cCafterList: afterList
    })
    this.getAddressList()
  },
  createOrder() {
    // var date = new Date().toLocaleDateString().replace(/\//g, '-')
    function padZero(number) {
      return number < 10 ? '0' + number : number.toString();
    }
     
    // 使用示例
    var date = new Date();
    var tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    var year = tomorrow.getFullYear();
    var month = padZero(tomorrow.getMonth() + 1);
    var day = padZero(tomorrow.getDate());
     
    var formattedDate = year + '-' + month + '-' + day;
    // console.log(formattedDate);
    // console.log(this.data.adrDetails.user_delivery_address_id, 'this.data.adrDetails.user_delivery_address_id')
    // console.log(app.globalData.zzId, 'app.globalData.zzId')
    // console.log(formattedDate + ' ' + this.data.multiArray[1][this.data.multiIndex[1]], 'this.data.multiArray[1][multiIndex[1]]')
    // console.log(this.data.cartShop, 'this.data.cartShop')
    console.log(app.globalData.userInfo,'userinfo')
    addOrder({
      user_delivery_address_id: this.data.adrDetails.user_delivery_address_id, //收货地址id
      transfer_station_id: app.globalData.zzId, //中转站 自提点id 如果自取一定需要
      delivery_type: '1', //配送类型 0立即配送 1预约配送
      appointment_delivery_time: formattedDate + ' ' + this.data.multiArray[1][this.data.multiIndex[1]], //预约配送时间 自取时间
      data: JSON.stringify(this.data.cCafterList) //json数组 [{"shop_id":1,"user_coupon_id":1,data:[{"stock_keeping_unit_id":1,"quantity":1}]}]
    }).then(res => {
      if (res.code != 200) {
        wx.showToast({
          title: '创建订单失败',
        })
      } else {
        this.wxPay(res.data[0].pay_order_number)
      }
    })
  },
  //微信支付
  wxPay(e) {
    WXPay({
      pay_order_number: e,
      multiple_order_prompt: 0,
      openid:app.globalData.userInfo.openid
    }).then(res => {
      if (res.code == 200) {
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.packageVal,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: res => {
            // wx.requestSubscribeMessage({
            //   tmplIds: ['veHPQugnhfu3a7IlDPW49R96R6Qsz6crK0oAV2K5uY4', 'jLY31VL2yeFgkwrVxguV8L5XTjUkGoVkqYiB1pBFDgg'],
            //   success(res) {
            //     console.log(res)
            //   }
            // })
            wx.redirectTo({
              url: '/pages/success/success?type=1',
            })
          },fail (err) {
            console.log('pay fail', err)
            wx.showToast({
              title: '订单已生产',
            })
            let pages = getCurrentPages(); //获取上一个页面信息栈(a页面)
            let prevPage = pages[pages.length - 2] //给上一页面的tel赋值
            wx.navigateBack({
              delta: 1,
              success: function (e) { // 成功的回调
                if (prevPage == undefined || prevPage == null) return;
                prevPage.getShopCartList(); // 调用A页面的方法, 并将值传过去
              }
            }); //关闭当前页面，返回上一个页面
          }
        })
      } else {
        app.error(res.data)
      }
    })
  },
  couponAfterPrice() {
    var dataa = this.data.cCafterList
    dataa.forEach(item => {
      item.user_coupon_id = this.data.couponDetails.user_coupon_id
    })
    console.log(dataa, 'dataadataadataadataadataadataadataadataadataadataadataadataa')
    this.setData({
      totalPrice: this.data.originPrice - Number(this.data.couponDetails.price),
      cCafterList: dataa
    })
  },
  goCoupon() {
    console.log(this.data.cartShop[0].standardProductUnit.shop_id, 'this.data.cartShop[0].standardProductUnit.shop_id')
    wx.navigateTo({
      url: '../coupon/coupon?price=' + this.data.totalPrice + '&shopId=' + this.data.cartShop[0].standardProductUnit.shop_id
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
      // distributionTime: e.detail.value

    })
  },
  bindMultiPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
  },
  getAddressList() {
    addressList({
      page: '0',
      page_size: '100'
    }).then(res => {
      var newlist = res.data.map(item => {
        if (item.default_address == 1) {
          return item
        }
      }).filter(Boolean).concat();
      // if(newlist.length>=1){
      //   newlist = res.data[2]
      // }else{
      //   newlist 
      // }
      console.log(newlist, 'newlist')
      this.setData({
        adrDetails: newlist[0]
      })
    })
  },
  goCheckAdr() {
    wx.navigateTo({
      url: '../adrList/adrList?isCheckAdr=0'
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