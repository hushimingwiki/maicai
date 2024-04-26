// 
import {
	recharge,vipInfo
} from '../../request/api.js'

const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		headerHeight: '',
    isBig: 1,
    bottomLift: app.globalData.bottomLift,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.setData({
      headerHeight: app.globalData.titleHeight,
      
		})
	},
	goPay(e) {
		// let pages = getCurrentPages(); //获取上一个页面信息栈(a页面)
		// let prevPage = pages[pages.length - 2] //给上一页面的tel赋值
		// wx.navigateBack({
    //   delta: 1,
    //   success: function (e) { // 成功的回调
    //     if (prevPage == undefined || prevPage == null) return;
    //     prevPage.aa(); // 调用A页面的方法, 并将值传过去
    //   }
    // })
    // return
    var that = this
		console.log(this.data.price)
		recharge({
			type: '1',
			flag: this.data.isBig,
			price: '',
			openid: app.globalData.userInfo.openid
		}).then(res => {
			console.log(res)
			if (res.code == 200) {
				wx.requestPayment({
					timeStamp: res.data.timeStamp,
					nonceStr: res.data.nonceStr,
					package: res.data.packageVal,
					signType: res.data.signType,
					paySign: res.data.paySign,
					success: res => {
						// that.getWallet()
						// wx.redirectTo({
						//   url: '/pages/success/success?type=1',
            // })
            vipInfo().then(res=>{
              wx.setStorageSync('vip', res.data)
            })
						let pages = getCurrentPages(); //获取上一个页面信息栈(a页面)
						let prevPage = pages[pages.length - 2] //给上一页面的tel赋值
						if(prevPage.route == 'pages/shopDetails/shopDetails'){
							wx.navigateBack({
								delta: 1,
								success: function (e) { // 成功的回调
									if (prevPage == undefined || prevPage == null) return;
									prevPage.getVip(); // 调用A页面的方法, 并将值传过去
								}
							})
						}else if(prevPage.route == 'pages/my/my'){
							wx.navigateBack({
								delta: 1,
								success: function (e) { // 成功的回调
                  if (prevPage == undefined || prevPage == null) return;
                  setTimeout(res=>{
                    prevPage.getVip(); // 调用A页面的方法, 并将值传过去
                  },1000)
									
								}
							})
						}else if(prevPage.route == 'pages/order/order'){
              wx.navigateBack({
								delta: 1,
								success: function (e) { // 成功的回调
									if (prevPage == undefined || prevPage == null) return;
									prevPage.aa(); // 调用A页面的方法, 并将值传过去
								}
							})
            }
						
					},
					fail(err) {
						console.log('pay fail', err)
						wx.showToast({
							title: '取消支付',
							icon: 'none'
						})
					}
				})
			} else {
				app.error(res.data)
			}
		})
	},
	checkVipType(e) {
		this.setData({
			isBig: e.currentTarget.dataset.index
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