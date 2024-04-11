// pages/search/search.ts productSearch
import {
  likeList,
  likeAdd,
  likeDelete,
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
    this.getShopList()
  },
  nextPage(){
    if(this.data.isEnd){
      this.getShopList()
    }
  },
  goDetails(e){
    var xxxx = e.currentTarget.dataset.details
    console.log(JSON.stringify(xxxx),'xxxx')
    wx.navigateTo({url:'../shopDetails/shopDetails?details=' + JSON.stringify(xxxx)})
  },

  getShopList(){
    likeList({
      page:this.data.page,
      page_size:this.data.pageSize,
    }).then( res => {
      console.log(res,'收藏列表')
      this.setData({
        shopList:[...this.data.shopList,...res.data],
        page:this.data.page+1,
        isEnd:res.data.length<5?false:true
      })
    })
  },
  shoucang(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要取消收藏？',
      success (res) {
        if (res.confirm) {
          likeDelete({
            standard_product_unit_id:e.currentTarget.dataset.details
          }).then(res=>{
            console.log(res.code)
            if(res.code == 200){
              wx.showToast({
                title: '取消收藏',
              })
              that.setData({
                shopList:[],
                page:0,
                isEnd:true
              })
              that.getShopList()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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