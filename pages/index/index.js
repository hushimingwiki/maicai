// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
import {
  bannerList, shopList,
} from '../../request/api.js'
Page({
  data: {
    bannerList:[],
    shopList:[],
    headerHeight:''
  },
  onLoad: function () {
    this.setData({
      headerHeight:app.globalData.titleHeight
    })
    console.log(this.data.headerHeight)
  console.log('index',app.globalData.capsuleObj)
  console.log('index',app.globalData.titleHeight)
    this.getBannerList()
    this.getShopList()
  },
  getBannerList(){
    bannerList().then( res => {
      console.log(res,'轮播图列表')
      this.setData({
        bannerList:res.data,
      })
    })
  },
  getShopList(){
    shopList().then( res => {
      console.log(res,'商品列表')
      this.setData({
        shopList:res.data,
      })
    })   
  },
  goDetails(e){
    var xxxx = e.currentTarget.dataset.details
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
