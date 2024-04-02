// app.js
import Dialog from 'components/locationAuth/window.js'
import {
  userLogin,
  getUserInfo,
  WXPay,
  shopCarNum
} from '/request/api.js'
import QQMapWX from '/utils/qqmap-wx-jssdk.min.js'
const app = getApp()
App({
  async onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let capsuleObj = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: (res) => {
        console.log("==获取系统信息==");
        console.log(res, 'res')
        var statusBarHeight = res.statusBarHeight; //顶部状态栏高度
        const tabbarHeight = (res.screenHeight - res.windowHeight - res.statusBarHeight) * res.pixelRatio

        this.globalData.tabbarHeight = tabbarHeight
        this.globalData.capsuleObj = capsuleObj;
        this.globalData.titleHeight = statusBarHeight + capsuleObj.height + (capsuleObj.top - statusBarHeight) * 2;
        this.globalData.statusBarHeight = statusBarHeight
      },
      failure() {}
    })
    if (!wx.getStorageSync('token')) {
      this.getCode()
    } else {
      await this.getCode()
      await this.getUserInfo()
    }
    // this.getLocation()
   
  },
  async getUserInfo() {
    let that = this
    await getUserInfo({
      // UserId: !this.globalData.userId?wx.getStorageSync('userId'):this.globalData.userId,
      token: !this.globalData.token ? wx.getStorageSync('token') : this.globalData.token
    }).then(res => {
      console.log(res, '用户信息用户信息用户信息用户信息用户信息用户信息用户信息用户信息用户信息用户信息用户信息')
      // if(res.data.nickName == '微信用户'){
      //   wx.showModal({
      //     title: '提示',
      //     content: '为了更好的体验菜多惠小程序，请尽快填写您的微信和头像',
      //     success: function (res) {
      //       if (res.confirm) {//这里是点击了确定以后
      //         wx.navigateTo({
      //           url: '/pages/editData/editData',
      //         })
      //       } else {//这里是点击了取消以后

      //       }
      //     } 
      //   })
      // }
      if (res.code == 200) {
        this.globalData.userInfo = res.data
        this.globalData.userAuth = true
        this.getShopCarNum()
        // that.InitJG()
      }
    })
  },
  getShopCarNum(){
    shopCarNum().then(res=>{
      console.log(res.data,'购物车数量')
      wx.setStorageSync('hd', res.data)
      wx.setTabBarBadge({
        index: 2,
        text: res.data
      });
    })
  },
  getCode() {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '登录中',
      })
      wx.login({
        success: login => {
          console.log(login, 'login')
          userLogin({
            type: 1,
            parent_id: 0,
            identification: login.code,
            sms_code: '',
            appid: 'wx9662daace8be7f13',
          }).then(async res => {
            console.log(res, 'res.code')
            if (res.code == 200) {
              wx.setStorageSync('token', res.data)
              // wx.setStorageSync('userId', res.userId)
              this.globalData.token = res.data
              // this.globalData.userId = res.userId
              this.getUserInfo()
              wx.hideLoading()
            } else {
              console.log('登入失败', res)
            }
            resolve()
          })
        }
      })
    })
  },
  // 确认有没有定位权限
  isLocation() {
    console.log('isLocation3')
    wx.getSetting({
      success: res => {
        //如果没有定位权限
        if (!res.authSetting['scope.userLocation']) {
          console.log(res, 'reeeeeeeeeee')
          if (this.globalData.location) {
            return
          }
          Dialog.show()
          this.getLocation()
        } else {
          console.log(this.globalData.location,'location4')
          Dialog.cancel()
          if (this.globalData.location) {
            return
          }
          this.getLocation()
        }
      },fail:res=>{
        console.log(res,'resssssssssssssss')
      }
    })
  },
  //下单的微信支付
  wxPay(e) {
    WXPay({
      pay_order_number: e,
      multiple_order_prompt: 0,
      openid:this.globalData.userInfo.openid
    }).then(res => {
      if (res.code == 200) {
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.packageVal,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: res => {
            // wx.requestSubscribeMessage({
            //   tmplIds: ['veHPQugnhfu3a7IlDPW49R96R6Qsz6crK0oAV2K5uY4', 'jLY31VL2yeFgkwrVxguV8L5XTjUkGoVkqYiB1pBFDgg'],
            //   success(res) {
            //     console.log(res)
            //   }
            // })
            wx.redirectTo({
              url: '/pages/success/success?type=1',
            })
          },fail (err) {
            console.log('pay fail', err)
            wx.showToast({
              title: '订单已生产',
            })
            let pages = getCurrentPages(); //获取上一个页面信息栈(a页面)
            let prevPage = pages[pages.length - 2] //给上一页面的tel赋值
            console.log(prevPage,'prevPageprevPage``````````')
            if(prevPage.route == 'pages/orderList/orderList'){

            }else{
              wx.navigateBack({
                delta: 1,
                success: function (e) { // 成功的回调
                  if (prevPage == undefined || prevPage == null) return;
                  prevPage.getShopCartList(); // 调用A页面的方法, 并将值传过去 
                }
              }); //关闭当前页面，返回上一个页面
            }
          }
        })
      } else {
        app.error(res.data)
      }
    })
  },
  //获取定位
  getLocation(callback) {
    let that = this
    return new Promise((resolve, reject) => {
      if (this.globalData.location) {
        resolve()
      }
      wx.getLocation({
        success: res => {
          console.log(res, 'resssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
          let map = new QQMapWX({
            key: '2T7BZ-YB5AJ-3XFF7-KE66C-J4646-2RFCF'
          })
          console.log(map, 'map')
          map.reverseGeocoder({

            location: res ? `${res.latitude+','+res.longitude}` : null,
            success: res => {
              console.log(res, '这里设置了定位')
              this.globalData.location = res.result
              wx.setStorage({
                data: res.result,
                key: 'area',
              })
              resolve()
              return res.result
            },
            fail: res => {
              console.log(res, 'zxc111')
            }

          })
        },
        fail: res => {
          console.log(res, '错误原因')
          wx.getSetting({
            success: res => {
              console.log(res)
              //如果没有定位权限
              if (!res.authSetting['scope.userLocation'] && !this.globalData.location) {
                Dialog.show()
              } else {
                Dialog.cancel()
                clearTimeout(modal)
                var modal = setTimeout(() => {
                  wx.showModal({
                    title: '无法获取定位',
                    content: '请确定打开了微信的位置服务并同意定位授权',
                    confirmText: '查看教程',
                    success: res => {
                      if (res.confirm) {
                        // wx.navigateTo({
                        //   url: '/pages/app1/app?url=https://guangwang.jxcbcj.com/jiaocheng',
                        // })
                      }
                    }
                  })
                }, 1000);
              }
            }
          })
          reject()
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
      duration: 2000,
      success: res => {
        setTimeout(() => {
          wx.hideToast()
          wx.hideLoading()
        }, 2000)
      }
    })
  },
  //打开加载中
  loading() {
    wx.showLoading({
      mask: true,
      title: '加载中',
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
    token: '',
    userInfo: null,
    capsuleObj: '',
    titleHeight: '',
    tabbarHeight: '',
    statusBarHeight: '',
    location: null,
    userAuth: null,
    wallet:null
  }
})