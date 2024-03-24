// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
import {
  bannerList, shopList,addShopCart,shopDetails,receiveCouponList,addCoupon,zuijinStation
} from '../../request/api.js'
Page({
  data: {
    bannerList:[],
    shopList:[],
    headerHeight:'',
    allShopDetails:null,
    klqCoupon:[],
    adrDetails: null,
    station:null
  },
  onLoad: function () {
    this.setData({
      headerHeight:app.globalData.titleHeight,
      capsuleObj:app.globalData.capsuleObj
    })
    // console.log(this.data.headerHeight)
    // console.log('globalData',app.globalData)
    // console.log('globalData',app.globalData.adrInfo)
    // console.log('globalData',app.globalData.capsuleObj)
    setTimeout(() => {
      this.getZuijinStation()
    }, 500)
    this.getBannerList()
    
    this.getReceiveCouponList()
    
  },
 
 
  goCheckAdr(){
    wx.navigateTo({
      url: '../adrList/adrList?isCheckAdr=0&isIndex=0'
    })
  },
  getAdrFjZzz(){
    console.log(this.data.adrDetails)
    this.setData({
      adrDetails:this.data.adrDetails
    })
    this.getZuijinStation()
  },
  getZuijinStation(){
    var sdata = this.data.adrDetails
    console.log(app.globalData,'app.globalData')
    console.log(app.globalData.location,'app.globalData.location')
    console.log(app.globalData.location.location,'app.globalData.location.location')
    var myPromise =  new Promise((resolve,reject)=>{
      if(app.globalData.location){
        console.log("有经纬度")
        resolve()
      }else{
        console.log("没有经纬度，0.5s后再次执行")
        setTimeout(() => {
          this.getZuijinStation()
        }, 500)
      }
    })
    
    myPromise.then(res=>{
      console.log(app.globalData.location,'成功获取经纬度并获取中转站')
      
      zuijinStation({
        province:sdata ? sdata.province : app.globalData.location.address_component.province,
        city:sdata ? sdata.city : app.globalData.location.address_component.city,
        district:sdata ? sdata.district : app.globalData.location.address_component.district,
        longitude:sdata ? sdata.longitude : app.globalData.location.location.lng,
        latitude:sdata ? sdata.latitude : app.globalData.location.location.lat
      }).then(res=>{
        console.log(res,'res')
        this.setData({
          station:res.data
        })
        app.globalData.zzId = res.data.transfer_station_id
        this.getShopList(res.data.transfer_station_id)
      })
    })
  },
  goUse(){
    wx.navigateTo({
      url: '../coupon/coupon'
    })
  },
  getReceiveCouponList(){
    receiveCouponList({
      shop_id:0,
      page:0,
      page_size:100
    }).then(res=>{
      console.log(res.data,'可领优惠券')
      this.setData({
        klqCoupon:res.data
      })
      this.getAddCoupon()
    })
  },
  getAddCoupon(){
    let couList = this.data.klqCoupon
    console.log(couList,'couList')
    couList.forEach(item => {
      console.log(item.coupon_id,'couList')
      addCoupon({
      coupon_id:item.coupon_id
      }).then(res=>{
        console.log(res,'领取优惠券成功')
      })
    });
    
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
  getBannerList(){
    bannerList().then( res => {
      console.log(res,'轮播图列表')
      this.setData({
        bannerList:res.data,
      })
    })
  },
  getShopList(e){
    shopList({
      transfer_station_id:e
    }).then( res => {
      console.log(res,'商品列表')
      this.setData({
        shopList:res.data,
      })
    })   
  },
  goDetails(e){
    var xxxx = e.currentTarget.dataset.details
    console.log(JSON.stringify(xxxx),'xxxx')
    wx.navigateTo({url:'../shopDetails/shopDetails?details=' + JSON.stringify(xxxx)})
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
})
