const app = getApp()
// import QQMapWX from '/utils/qqmap-wx-jssdk.min.js'
Page({

	/**
   * 页面的初始数据
   */
	data: {
		location: {
			latitude: 40.040415,
			longitude: 116.273511
		},
		isShowScale: false,
		isShowCompass: false,
		isShowPosition: true,
    showActionSheet: false,
    markers:null
  },
  onLoad(options) {
  
      console.log(app.globalData.location.location,'location')
    
    this.setData({
      'location.latitude':app.globalData.location.location.lat,
      'location.longitude':app.globalData.location.location.lng,
    })
  },
	onChangeShowScale (event) {
		this.setData({
			isShowScale: event.detail.value
		});
	},

	// 激活指南针
	onChangeShowCompass (event) {
		this.setData({
			isShowCompass: event.detail.value
		});
	},
	onShareAppMessage: function () {
		return {
			title: '腾讯位置服务示例中心'
		};
	}
});
