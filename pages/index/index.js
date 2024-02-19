// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()

Page({
  data: {
    banner:[
      {picture:'../../image/banner1.jpg'},
      {picture:'../../image/banner2.jpg'},
    ],
    dataList:[
      {image:'../../image/sc1.jpg',title:'【霜打菜】崇民松花菜500g一份',biaoqiao:'松脆鲜嫩|适合清炒|可做干锅',jiage:'￥7.5一份'},
      {image:'../../image/sc2.jpg',title:'【霜打菜】崇民松花菜500g一份',biaoqiao:'松脆鲜嫩|适合清炒|可做干锅',jiage:'￥7.5一份'},
      {image:'../../image/sc3.jpg',title:'【霜打菜】崇民松花菜500g一份',biaoqiao:'松脆鲜嫩|适合清炒|可做干锅',jiage:'￥7.5一份'},
      {image:'../../image/sc4.jpg',title:'【霜打菜】崇民松花菜500g一份',biaoqiao:'松脆鲜嫩|适合清炒|可做干锅',jiage:'￥7.5一份'},
      {image:'../../image/sc1.jpg',title:'【霜打菜】崇民松花菜500g一份',biaoqiao:'松脆鲜嫩|适合清炒|可做干锅',jiage:'￥7.5一份'},
      {image:'../../image/sc2.jpg',title:'【霜打菜】崇民松花菜500g一份',biaoqiao:'松脆鲜嫩|适合清炒|可做干锅',jiage:'￥7.5一份'},
      {image:'../../image/sc3.jpg',title:'【霜打菜】崇民松花菜500g一份',biaoqiao:'松脆鲜嫩|适合清炒|可做干锅',jiage:'￥7.5一份'},
      {image:'../../image/sc4.jpg',title:'【霜打菜】崇民松花菜500g一份',biaoqiao:'松脆鲜嫩|适合清炒|可做干锅',jiage:'￥7.5一份'},
    ],
    headerHeight:''
  },
  onLoad: function () {
    this.setData({
      headerHeight:app.globalData.titleHeight
    })
    console.log(this.data.headerHeight)
  console.log('index',app.globalData.capsuleObj)
  console.log('index',app.globalData.titleHeight)
    
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
