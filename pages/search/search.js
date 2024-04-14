// pages/search/search.ts productSearch
import {
  productSearch,shopDetails,addShopCart
} from '../../request/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    dizhi:null,
    page:0,
    pageSize:5,
    shopList:[],
    isEnd:true,
    allShopDetails:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var dingwei = wx.getStorageSync('area')
    console.log(dingwei)
    this.setData({
      dizhi:dingwei,
      zzId:app.globalData.zzId
    })
  },
  nextPage(){
    if(this.data.isEnd){
      this.getShopList()
    }
  },
  goDetails(e){
    var xxxx = e.currentTarget.dataset.details
    console.log(JSON.stringify(xxxx),'xxxx')
    wx.navigateTo({url:'../shopDetails/shopDetails?details=' + encodeURIComponent(JSON.stringify(xxxx))})
  },
  modify(){
    if(!this.data.name){
      return
    }
    this.setData({
      page:0,
      shopList:[]
    })
    this.getShopList()
  },
  getShopList(){
    productSearch({
      keyword:this.data.name,
      province:this.data.dizhi.address_component.province,
      city:this.data.dizhi.address_component.city,
      district:this.data.dizhi.address_component.district,
      page:this.data.page,
      page_size:this.data.pageSize,
      transfer_station_id:this.data.zzId
    }).then( res => {
      console.log(res,'搜索商品列表')
      this.setData({
        shopList:[...this.data.shopList,...res.data],
        page:this.data.page+1,
        isEnd:res.data.length<5?false:true
      })
    })
  },
  jrShopCart(e){
    shopDetails(
      {standard_product_unit_id:e.currentTarget.dataset.details}
    ).then( res => {
      console.log(res,'获取商品详情')
      this.setData({
        allShopDetails:res.data,
      })
      addShopCart({
        user_id:'',
        standard_product_unit_id:this.data.allShopDetails.standard_product_unit_id,
        stock_keeping_unit_id:this.data.allShopDetails.stockKeepingUnits[0].stock_keeping_unit_id,
        current_price:this.data.allShopDetails.stockKeepingUnits[0].price,
        quantity:1
      }).then( res => {
        console.log(res,'加入购物车')
        wx.showToast({title:'加入购物车成功，我在购物车等你哦',icon: 'none',duration: 1500})
      })
    })  
  },
  goShopCart(){
    wx.switchTab({
      url: '../shopCart/shopCart',
    })
  },
  changeContent (e){
      console.log(e.detail.value)
      this.setData({
          name:e.detail.value
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