var app = getApp()
import {
	inviteQrCode
} from '../../request/api.js'
import {
	postFile
} from '../../request/request'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: null,
		publicizeModel: false,
		show: false, //控制显示海报的弹窗的变量
		imageShow: false, //控制海报显示的变量
		url: '', //海报路径
		qr_code: '', //二维码路径
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		console.log('走入onShow')
		this.setData({
			userInfo: app.globalData.userInfo
		})
	},
	goCustomerList() {
		wx.navigateTo({
			url: '../customerList/customerList',
		})
	},
	showPublicizeModel() {
		this.setData({
			publicizeModel: true
		})
		// this.handleSharp()
		this.getInviteQrCode()
	},
	cancel() {
		this.setData({
			publicizeModel: false
		})
	},
	getInviteQrCode() {
		wx.showLoading({
			title: '生成分享海报中...',
		})
		inviteQrCode({
			scene: app.globalData.userInfo.user_id
		}).then(res => {
			this.setData({
				base64url: 'data:image/png;base64,' + res.data
			})
			this.handleSharp()
		})
	},
	handleSharp() {
		//这是控制显示海报的弹窗控件
		this.data.show = true
		
		//this 重新赋值 因为下面的函数中this指针会改变
		const that = this
		//获取canvas的dome节点
		const query = wx.createSelectorQuery().in(this)
		query
			.select('#myCanvas')
			.fields({
				node: true,
				size: true,
			})
			.exec((res) => {
					console.log(res, 'res')
					//#region  获取节点,设置像素
					const canvas = res[0].node
					const ctx = canvas.getContext('2d')
					//  绘制前,先清空上一次的绘制
					ctx.clearRect(0, 0, canvas.width, canvas.height)
					//获取设备像素比
					const dpr = wx.getSystemInfoSync().pixelRatio
					canvas.width = 450 * dpr
					canvas.height = 632 * dpr
					ctx.scale(dpr, dpr)

					wx.getImageInfo({
						src: 'https://api.caiduohui.com:8080/assets/haibao-bg.png',
						success(res) {
							console.log(res, 'pppz')
							//获取二维码的图片路径
							// that.handleQrcode()
							//#region 创建图片对象

							const img = canvas.createImage()
							img.src = res.path
							//#endregion
							let p = new Promise((resolve, reject) => {

								img.onload = function () {
									var img1 = false
									var img2 = false
									//图片加载完通过drawImage绘制上去
									ctx.drawImage(img, 0, 0, 450, 632)
									//绘制放置海报内容盒子的函数
									// that.handleCanvas(50,100,100,100,50, ctx)
									//绘制放置海报内容的函数
									// that.handleCanvasText(ctx, '这是内容', 40, 336, 24, '#000000')
									that.handleCanvasText(ctx, that.data.userInfo.nickname, 100, 580, 24, '#ffffff')
									//绘制放置二维码的图片对象
									const img_qrcode = canvas.createImage()
									img_qrcode.src = that.data.base64url
									img_qrcode.onload = function () {
										ctx.drawImage(img_qrcode, 100, 110, 250, 250)
										img1=true
									}

									const img_avatar = canvas.createImage()
									img_avatar.src = that.data.userInfo.picture
									img_avatar.onload = function () {
										var x = 30,
											y = 540,
											w = 60,
											h = 60,
											r = 30

										ctx.save();
										ctx.beginPath();
										ctx.moveTo(x + r, y);
										ctx.arcTo(x + w, y, x + w, y + h, r);
										ctx.arcTo(x + w, y + h, x, y + h, r);
										ctx.arcTo(x, y + h, x, y, r);
										ctx.arcTo(x, y, x + w, y, r);
										ctx.lineWidth = 1; //线条的宽度
										ctx.strokeStyle = "red"; //线条的颜色
										ctx.stroke();
										ctx.clip();
										ctx.drawImage(img_avatar, x, y, w, h);
										ctx.restore();
										ctx.closePath();
										img2=true
									}
									var interval = setInterval(res=>{
										console.log(img1,img2,'定时')
										if(img1 && img2){
											clearInterval(interval);
											resolve("图片加载成功");
										}
									},1000)
								};
								img.onerror = function () {
									console.log(img1,img2,'1444')
									reject("图片加载失败");
								};
							});
							p.then(success => {
								//生成临时路径的api 方便通过image在页面显示和下载
								wx.canvasToTempFilePath({
									x: 0,
									y: 0,
									width: 450,
									height: 632,
									destWidth: 450 * dpr,
									destHeight: 632 * dpr,
									canvasId: 'myCanvas',
									canvas: canvas,
									success(res) {
										console.log('海报临时路径为：', res.tempFilePath)
										that.setData({
											url: res.tempFilePath,
											imageShow: true
										})

										//关闭loading
										wx.hideLoading()
									},
									fail(res) {
										console.error(res)
									},
								})
							})
							return
							img.onload = () => {
								//图片加载完通过drawImage绘制上去
								ctx.drawImage(img, 0, 0, 450, 632)
								//绘制放置海报内容盒子的函数
								// that.handleCanvas(50,100,100,100,50, ctx)
								//绘制放置海报内容的函数
								// that.handleCanvasText(ctx, '这是内容', 40, 336, 24, '#000000')
								that.handleCanvasText(ctx, that.data.userInfo.nickname, 100, 580, 24, '#ffffff')
								//绘制放置二维码的图片对象
								const img_qrcode = canvas.createImage()
								img_qrcode.src = that.data.base64url
								img_qrcode.onload = function () {
									ctx.drawImage(img_qrcode, 100, 110, 250, 250)
								}

								const img_avatar = canvas.createImage()
								img_avatar.src = that.data.userInfo.picture
								img_avatar.onload = function () {
									var x = 30,
										y = 540,
										w = 60,
										h = 60,
										r = 30

									ctx.save();
									ctx.beginPath();
									ctx.moveTo(x + r, y);
									ctx.arcTo(x + w, y, x + w, y + h, r);
									ctx.arcTo(x + w, y + h, x, y + h, r);
									ctx.arcTo(x, y + h, x, y, r);
									ctx.arcTo(x, y, x + w, y, r);
									ctx.lineWidth = 1; //线条的宽度
									ctx.strokeStyle = "red"; //线条的颜色
									ctx.stroke();
									ctx.clip();
									ctx.drawImage(img_avatar, x, y, w, h);
									ctx.restore();
									ctx.closePath();
								}
								//生成临时路径的api 方便通过image在页面显示和下载
								wx.canvasToTempFilePath({
									x: 0,
									y: 0,
									width: 450,
									height: 632,
									destWidth: 450 * dpr,
									destHeight: 632 * dpr,
									canvasId: 'myCanvas',
									canvas: canvas,
									success(res) {
										console.log('海报临时路径为：', res.tempFilePath)
										that.setData({
											url: res.tempFilePath,
											imageShow: true
										})

										//关闭loading
										wx.hideLoading()
									},
									fail(res) {
										console.error(res)
									},
								})
							}

						},
						fail(err) {
							console.error('获取背景图片信息失败:', err)
						}
					})
				}

			)
	},

	handleCanvas(x, y, w, h, r, ctx) {
		// 设置填充色
		ctx.rect(20, 550, 80, 80)
		ctx.fillStyle = '#000'
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(x + r, y);
		ctx.arcTo(x + w, y, x + w, y + h, r);
		ctx.arcTo(x + w, y + h, x, y + h, r);
		ctx.arcTo(x, y + h, x, y, r);
		ctx.arcTo(x, y, x + w, y, r);
		ctx.lineWidth = 1; //线条的宽度
		ctx.strokeStyle = "red"; //线条的颜色
		ctx.stroke();
		ctx.clip();
		ctx.createImage('https://api.caiduohui.com:8080/picture/20240403214856210000001.jpg', x, y, w, h);
		ctx.restore();
		ctx.closePath();
		ctx.fill()
	},
	handleCanvasText(ctx, text, x, y, size, color) {
		ctx.font = `${size}px Arial`
		ctx.fillStyle = color
		ctx.fillText(text, x, y)
		return
		let newText = text
		let chr = newText.split('')
		let temp = ''
		let row = []
		ctx.font = `${size}px Arial`
		ctx.fillStyle = color
		for (var a = 0; a < chr.length; a++) {
			if (ctx.measureText(temp).width < 542) {
				temp += chr[a]
			} else {
				a-- //这里添加了a-- 是为了防止字符丢失，效果图中有对比
				row.push(temp)
				temp = ''
			}
		}
		row.push(temp)
		if (row.length > 3) {
			var rowCut = row.slice(0, 3)
			var rowPart = rowCut[2]
			var test = ''
			var empty = []
			for (var a = 0; a < rowPart.length; a++) {
				if (ctx.measureText(test).width < 220) {
					test += rowPart[a]
				} else {
					break
				}
			}
			empty.push(test)
			var group = empty[0] + '...' //这里只显示两行，超出的用...表示
			rowCut.splice(2, 1, group)
			row = rowCut
		}
		for (var b = 0; b < row.length; b++) {
			ctx.fillText(row[b], x, y + b * (size + 10))
		}
	},
	downImage() {
    console.log(this.data.url,'this.data.url')
		postFile({type:4},this.data.url).then(res => {
			console.log(res,'进入wx.previewImage')
			wx.previewImage({
				current: 'https://api.caiduohui.com:8080/tmp_picture/' + res.data, // 当前显示图片的http链接
				urls: ['https://api.caiduohui.com:8080/tmp_picture/' + res.data], // 需要预览的图片http链接列表
			})
		})

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
		console.log(app.globalData.userInfo, 'app.globalData.userInfo')
		return {
			title: app.globalData.userInfo.nickname + '邀请你加入菜多惠',
			path: '/pages/index/index?parentId=' + app.globalData.userInfo.user_id,
			imageUrl: 'https://api.caiduohui.com:8080/assets/logo.png'
		}
	}
})