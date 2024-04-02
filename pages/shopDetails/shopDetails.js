const app = getApp()
import {
  shopDetails,
  addShopCart,
  CommentList
} from '../../request/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: [
      {
        image:'https://api.caiduohui.com:8080/assets/xq-1.png'
      },
      {
        image:'https://api.caiduohui.com:8080/assets/xq-1.png'
      }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    shopDetails:null,
    candi:'',
    allShopDetails:null,
    Comment:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var xxxx = JSON.parse(options.details) // 先decode再把字符串转数组
    console.log(xxxx,'xxxx')
    let cd = xxxx.base_attribute.filter(item => item.name == '产地')
    console.log(cd[0].value[0])
    console.log(xxxx,'xxxxxxxx')
    this.setData({
      shopDetails: xxxx,
      candi:cd[0].value[0]
    })
    this.getShopDetails()
    
  },
  goCommentList(){
    wx.navigateTo({
      url: '../commentList/commentList?obj=' + JSON.stringify(this.data.allShopDetails),
    })
  },
  getShopDetails(){
    shopDetails(
      {standard_product_unit_id:this.data.shopDetails.standard_product_unit_id}
    ).then( res => {
      console.log(res,'获取商品详情')
      this.setData({
        allShopDetails:res.data,
      })
      this.getCommentList()
    })  
  },
  jrShopCart(e){
    addShopCart({
      user_id:'',
      standard_product_unit_id:this.data.allShopDetails.standard_product_unit_id,
      stock_keeping_unit_id:this.data.allShopDetails.stockKeepingUnits[0].stock_keeping_unit_id,
      current_price:this.data.allShopDetails.stockKeepingUnits[0].price,
      quantity:1
    }).then( res => {
      console.log(res,'加入购物车')
      var hd = wx.getStorageSync('hd')
      console.log(hd)
      wx.setStorageSync('hd', Number(hd)+1)
      
      wx.showToast({title:'加入购物车成功，我在购物车等你哦',icon: 'none',duration: 1500})
    })
},
goShopCart(){
  wx.switchTab({
    url: '../shopCart/shopCart',
  })
},
getCommentList(){
  console.log(this.data.allShopDetails,'this.data.allShopDetails')
  CommentList({
    standard_product_unit_id:this.data.allShopDetails.standard_product_unit_id,
    stock_keeping_unit_id:this.data.allShopDetails.stockKeepingUnits[0].stock_keeping_unit_id,
    self_comment:'0',
    page:0,
    page_size:1
  }).then(res=>{
    console.log(res,'评论第一条')
    this.setData({
      Comment:res.data[0]
    })
    console.log(this.data.Comment)
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