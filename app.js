// app.js
import {
  userLogin,
} from '/request/api.js'
const app = getApp()
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let capsuleObj = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: (res) => {
          console.log("==获取系统信息==");
          console.log(res,'res')
          var statusBarHeight = res.statusBarHeight; //顶部状态栏高度
          const tabbarHeight = ( res.screenHeight - res.windowHeight - res.statusBarHeight ) * res.pixelRatio
  
          this.globalData.tabbarHeight = tabbarHeight
          this.globalData.capsuleObj = capsuleObj;
          this.globalData.titleHeight = statusBarHeight + capsuleObj.height + (capsuleObj.top - statusBarHeight) * 2;
          this.globalData.statusBarHeight = statusBarHeight
      },
      failure() {
      }
    })
    if(!wx.getStorageSync('token')){
       this.getCode()
    }else{
      // await this.getCode()
      // await this.getUserInfo()
    }
  },
  getCode() {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '登录中',
      })
          wx.login({
            success: login => {
              console.log(login,'login')
              userLogin({
                type:1,
                parent_id:0,
                identification:login.code,
                sms_code:'',
                appid: 'wx9662daace8be7f13',
              }).then(async res => {
                console.log(res,'res.code')
                if(res.code==200){
                  wx.setStorageSync('token',res.data)
                  // wx.setStorageSync('userId', res.userId)
                  this.globalData.token = res.data
                  // this.globalData.userId = res.userId
                  
                  wx.hideLoading()
                }else{
                  console.log('登入失败',res)
                }
                resolve()
              })
            }
          })
    })
  },
  //成功
  success(msg) {
    wx.showToast({
      title: msg,
      duration: 2000,
      success: res => {
        setTimeout(() => {
          wx.hideToast()
          wx.hideLoading()
        }, 2000)
      }
    })
  }, 
  error(msg) {
    wx.showToast({
      title: msg,
      image: 'https://www.dnfc888.com/assets/close.png',
      duration: 2000,
      success: res => {
        setTimeout(() => {
          wx.hideToast()
          wx.hideLoading()
        }, 2000)
      }
    })
  },
  toast(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000,
      success: res => {
        setTimeout(() => {
          wx.hideToast()
          wx.hideLoading()
        }, 2000)
      }
    })
  }, 
  globalData: {
    token:'',
    userInfo: null,
    capsuleObj:'',
    titleHeight:'',
    tabbarHeight:'',
    statusBarHeight:'',
  }
})
