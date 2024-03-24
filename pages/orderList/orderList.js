// pages/myOrder/myOrder.js
const app =getApp()
import { CancelOrderInfo, confirmReceipt,orderList } from '../../request/api.js'
import { getTimeLeft } from "../../utils/dataTime.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer:null,
    tabIndex:0,
    touchTop:0,
    moveTop:0,
    loading:false,
    list:[
    ],
    page:0,
    isEnd:true,
    someData:'首页',
    ziPage:0,
    category:"首页",
    flag:1,
    datetimeTo:"",
    timeLeft:"",
    isOver:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tabIndex: options.tab ? options.tab:0
    })
    this.getList()
  },
  goGoodsComment(e){
    console.log(JSON.stringify(e.currentTarget.dataset.data))
    wx.navigateTo({
      url: '/pages/comment/comment?data='+JSON.stringify(e.currentTarget.dataset.data),
    })
  },
  countDown(e){
    var arr = this.data.time.split(/[- :]/);
    let nndate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
      nndate = Date.parse(nndate) //获取到的时间戳
      console.log(nndate)
    
    this.data.timer = setInterval(() => {
      this.setData({
        timeLeft: getTimeLeft(nndate)//使用了utils.getTimeLeft
      });
      if (this.data.timeLeft == "0天0时0分0秒") {
        this.setData({
          isOver:false
        })
        clearInterval(this.data.timer);
      }
    }, 1000);
  },
  //获取列表
  getList(){
    console.log(this.data.tabIndex,'1233333333333')
    app.loading()
    orderList({
      page: this.data.page,
      page_size: 5,
      order_status:this.data.tabIndex==0?"":this.data.tabIndex-1,
    }).then(res=>{
      if(res.code==200){
        this.setData({
          page:this.data.page+1,
          list: [...this.data.list,...res.data],
          isEnd:res.data.length<10?false:true
        })
        clearInterval(this.data.timer);
        this.data.timer = setInterval(() => {
          this.data.list.forEach((item)=>{
            if(item.flag==1){
              var arr = item.expireTime.split(/[- :]/);
              let nndate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
              nndate = Date.parse(nndate) //获取到的时间戳
              item.countDown = getTimeLeft(nndate)
              this.setData({
                list: this.data.list
              })
            }
          })
        },1000);
      
        

        
      }
      wx.hideLoading()
    })
  },

  //tab改变
  changeTab(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      tabIndex:index,
      isEnd:false,
      page:0,
      list:[]
    })
    this.getList()
  },

  //跳转详情
  JumpOrderDetail(e){
    var obj = JSON.stringify(e.currentTarget.dataset.obj)
    console.log(obj)
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?obj='+encodeURIComponent(obj),
    })
  },
  //确认收货
  confirmOrder(e){
    console.log(this.data.list)
    var that = this
    // return
    let index = e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '确认收到货物了吗？',
      confirmColor: '#ff3b3b',
      success:res=>{
        if(res.confirm){
          console.log(index)
          confirmReceipt({
            Token:app.globalData.token,
            OrderId:that.data.list[index].orderId
          }).then(res=>{
            if(res.code==200){
              that.data.list.splice(index,1)
              that.setData({
                list:that.data.list
              })
              app.toast('操作成功')
            }else{
              app.error(res.msg)
            }
          })
        }
      }
    })
  },



  

  //去支付
  goPay(e){
    let data = e.currentTarget.dataset.data
    console.log(data)
    if(data.city){
      wx.navigateTo({
        url: '/pages/payment/payment?order='+JSON.stringify(data),
      })
    }else{
      wx.navigateTo({
        url: '/pages/address/address?id='+data.orderId,
      })
    }
    
  },

  evaluate(e){
    let data = e.currentTarget.dataset.data
    wx.navigateTo({
      url: '/pages/evaluate/evaluate?obj='+JSON.stringify(data),
    })
  },
  //滚到底部
  scrollEnd(){
    if (!this.data.isEnd){
      this.getList()
    }
  },

  //售后
  afterSale(){
    app.callServer()
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
    console.log(321)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.isEnd){
      this.getList()
    }
  },    
})