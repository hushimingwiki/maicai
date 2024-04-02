// pages/orderDetail/orderDetail.js
const app = getApp()
import { GetOrderDetailInfo, orderCancel,addShopCart, orderConfirm } from '../../request/api.js'
Page({

  /**
   * 页面的初始数据 PayType  支付方式 1余额支付 2支付宝支付 3微信支付 4银行卡支付
                   Flag  1未付款 2已付款
   */
  data: {
    data:null,
    index:null,//上个页面的下标  改动数据时可以用到,
    flag:1,
   
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var optionData = JSON.parse(decodeURIComponent(options.obj))
    console.log(optionData)
    this.setData({
      data:optionData
    })
  },
  goGoodsComment(){
    console.log(JSON.stringify(this.data.data))
    wx.navigateTo({
      url: '/pages/comment/comment?data='+JSON.stringify(this.data.data),
    })
  },
  //查看支付详情
  goCheckPayRes(e){
    var obj = JSON.stringify(e.currentTarget.dataset.obj)
    wx.navigateTo({
      url: '/pages/PayRes/PayRes?obj='+encodeURIComponent(obj),
    })
  },
  //复制单号
  copyOrderNumber(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.value,
      success (res) {
        wx.getClipboardData({

        })
      }
    })
  },
  //获取订单
  getInfo(data){
    GetOrderDetailInfo({
      Token:app.globalData.token,
      Id:data?data.id:this.data.data.id
    }).then(res=>{
      console.log(res)
      this.setData({
        data:res.data
      })
    })
  },

  //取消订单
  cancelOrder(){
    console.log(this.data.data)
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认要取消该订单?',
      confirmColor:"#ff3b3b",
      success:res=>{
        if(res.confirm){
          orderCancel({
            order_id:that.data.data.order_id,
            multiple_order_prompt:0,
          }).then(res => {
            if(res.code==205){
              wx.showModal({
               title: '订单合并提示',
               content: '该商品是合并订单，是否一起取消？',
               showCancel: true,//是否显示取消按钮
               cancelText:"否",//默认是“取消”
               confirmText:"是",//默认是“确定”
               success: function (res) {
                  if (res.cancel) {
                     wx.showToast({
                       title: '已取消',
                     })
                  } else {
                     that.setData({
                      flag:2
                     })
                     that.cancelOrder1()
                  }
               },
              })
            }else if (res.code == 200) {
              // this.getInfo()
              this.changeLastPage()
            } else {
              app.error(res.msg)
            }
          })
        }
      }
    })
  },
  //无提示取消订单
  cancelOrder1(){
    CancelOrderInfo({
      Token: app.globalData.token,
      Id: this.data.data.id,
      Flag:this.data.flag
    }).then(res => {
      if (res.code == 200) {
        this.getInfo()
        this.changeLastPage()
      } else {
        app.error(res.msg)
      }
    })
  },
  //查看物流
  checkWuliu(){
    wx.navigateTo({
      url: '/pages/app/app?url=' + this.data.data.shipNumber,
    })
  },
  //去支付
  goPay(e){
    app.wxPay(this.data.data.pay_order_number)
  },

  //确认收货
  confirmOrder() {
    wx.showModal({
      title: '提示',
      content: '确认收到货物了吗？',
      confirmColor:'#ff3b3b',
      success: res => {
        if (res.confirm) {
          orderConfirm({
            order_id:this.data.data.order_id
          }).then(res => {
            if (res.code == 200) {
              // this.getInfo()
              this.changeLastPage()
              app.toast('操作成功')
            } else {
              app.error(res.msg)
            }
          })
        }
      }
    })
  },
  
  //再次购买
  buyAgain(){
    console.log(this.data.data)
    
    this.data.data.orderItems.forEach((item)=>{
      addShopCart({
        user_id:'',
        standard_product_unit_id:item.standard_product_unit_id,
        stock_keeping_unit_id:item.stock_keeping_unit_id,
        current_price:item.price,
        quantity:item.quantity
      }).then( res => {
        console.log(res,'加入购物车')
        wx.showToast({title:'加入购物车成功，我在购物车等你哦',icon: 'none',duration: 1500})
      })  
    })
    wx.switchTab({
      url: '../shopCart/shopCart',
    })
  },

  //售后
  afterSale(){
    app.callServer()
  },

  //改动上个页面的数据
  changeLastPage(){

    let prevPage = getCurrentPages()
    prevPage = prevPage[prevPage.length-2]
    prevPage.setData({
        list:[],
        page:0,
        isEnd:false
    })
    wx.navigateBack({
      delta: 1,
      success: function (e) { // 成功的回调
        if (prevPage == undefined || prevPage == null) return;
        prevPage.getList(); // 调用A页面的方法, 并将值传过去
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})