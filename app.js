// app.js

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
      },
      failure() {
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    capsuleObj:'',
    titleHeight:'',
    tabbarHeight:''
  }
})
