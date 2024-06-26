const app = getApp()
import {
  shopDetails,
  addShopCart,
  CommentList,
  likeAdd,
  likeDelete,
  likeList
} from '../../request/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: [
      {
        image:'https://tencent.file.caiduohui.com/assets/xq-1.png'
      },
      {
        image:'https://tencent.file.caiduohui.com/assets/xq-1.png'
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
    Comment:null,
    isShoucang:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var sid = options.shopId
    var xxxx = options.details?JSON.parse(decodeURIComponent(options.details)):'' // 先decode再把字符串转数组
    // let cd = xxxx.base_attribute.filter(item => item.name == '产地')
    // console.log(cd[0].value[0])
    var vipIn = wx.getStorageSync('vip')
    this.setData({
      shopId:sid?sid:xxxx.standard_product_unit_id,
      shopDetails: xxxx,
      // candi:cd[0].value[0],
      bottomLift: app.globalData.bottomLift,
      vipInfo:vipIn
    })
    this.getShopDetails()
    
	},
	goVip(){
		wx.navigateTo({
			url: '../vip/vip',
		})
	},
	getVip(){
		getApp().getCode()
		var as =  wx.getStorageSync('vip')
    console.log(as,'asss')
    this.setData({
      vipInfo:as
    })
	},
  shoucang(){
    if(!this.data.isShoucang){
      likeAdd({
        standard_product_unit_id:this.data.allShopDetails.standard_product_unit_id
      }).then(res=>{
        console.log(res.code)
        if(res.code == 200){
          wx.showToast({
            title: '收藏成功',
          })
          this.setData({
            isShoucang:true
          })
        }
      })
    }else{
      likeDelete({
        standard_product_unit_id:this.data.allShopDetails.standard_product_unit_id
      }).then(res=>{
        console.log(res.code)
        if(res.code == 200){
          wx.showToast({
            title: '取消收藏',
          })
          this.setData({
            isShoucang:false
          })
        }
      })
    }
  },
  goCommentList(){
    wx.navigateTo({
      url: '../commentList/commentList?obj=' + JSON.stringify(this.data.allShopDetails),
    })
  },
  chakan(e){
    console.log(e.currentTarget.dataset.img,'eeeeeeeeeeeeeee')
    wx.previewImage({
      current: e.currentTarget.dataset.img[0], // 当前显示图片的http链接
      urls: e.currentTarget.dataset.img, // 需要预览的图片http链接列表
      success:res=>{
        console.log('成功',res)
      },
      fail:err=>{
        console.log('失败',err)
      }
    })
  },
  getShopDetails(){
    console.log(this.data.shopId,'this.data.shipIdthis.data.shipIdthis.data.shipId')
    shopDetails(
      {standard_product_unit_id:this.data.shopId}
    ).then( res => {
      console.log(res,'获取商品详情')
      this.setData({
        allShopDetails:res.data,
        isShoucang:res.data.like
      })
      this.getCommentList()
    })  
  },
  jrShopCart(e){
    addShopCart({
      user_id:'',
      standard_product_unit_id:this.data.allShopDetails.standard_product_unit_id,
      current_price:this.data.allShopDetails.price,
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
		return {
			title: this.data.shopDetails.name,
			path: '/pages/shopDetails/shopDetails?shopId=' + this.data.shopId,
			imageUrl: this.data.shopDetails.pictures[0]
		}
  }
})