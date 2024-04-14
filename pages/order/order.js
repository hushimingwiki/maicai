// pages/order/order.ts
const app = getApp()
import {
  addressList,
  WXPay,
  addOrder,
  payNotifytest,
  orderGetFreightPrice,
  appointment
} from '../../request/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice: 0,
    originPrice:0,
    adrDetails: null,
    // multiArray: [['明天'], ['06:00-06:30', '06:30-07:00', '07:00-07:30', '07:30-08:00', '08:00-08:30', '08:30-09:00', '09:00-09:30', '09:30-10:00', '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00']],
    multiArray: [
      
    ],
    multiIndex: [0, 0, 0],
    cartShop: null,
    couponDetails: {
      price:0
    },
    cCafterList: null,
    Yunfei:0,
    couponPrice:0,
    allJianShu:0,
    nowDate:null,
    switch1Checked:false,
    switch2Checked:false,
    note:'',
    unable_contact:'',
    nowDidian:'',
		today:0,
		jintian:null,
		mingtian:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
		this.getDate()
    this.getAppointment()
    // console.log(options, 'options')
    var cartShop = JSON.parse(decodeURIComponent(options.data))
    // console.log(cartShop, 'cartShop')
    var afterList = []
    cartShop.forEach(item => {
      console.log(item,'item.standardProductUnit.shop_id')
      if(afterList.length > 0){
        afterList.forEach(itemm=>{
          console.log(itemm,'itemmitemm')
          if(item.standardProductUnit.shop_id == itemm.shop_id){
            // console.log(afterList,'匹配到相同店铺')
            var obj = {
              standard_product_unit_id: item.standardProductUnit.standard_product_unit_id,
              quantity: item.quantity
            }
            itemm.data.push(obj)
          }else{
            // console.log(afterList,'不是相同店铺')
          }
        })
      }else{
        // console.log('没有数据')
        var obj = {
          shop_id: item.standardProductUnit.shop_id,
          user_coupon_id: '',
          data: [{
            standard_product_unit_id: item.standardProductUnit.standard_product_unit_id,
            quantity: item.quantity
          }]
        }
        afterList.push(obj)
      }
      console.log(item,'item')
      this.setData({
        allJianShu : Number(this.data.allJianShu) + Number(item.quantity)
      })
     
    })
    this.setData({
      tabbarHeight: app.globalData.tabbarHeight,
      cartShop: cartShop,
      totalPrice: options.price,
      originPrice: options.price,
      cCafterList: afterList,
      bottomLift: app.globalData.bottomLift,
    })
    this.getAddressList()
    
	},
	noUseCoupon(){
		this.setData({
			couponDetails:{
				price:0
			}
		})
		this.couponAfterPrice()
	},
  setNote(e){
    console.log(e.detail.value)
    this.setData({
      note:e.detail.value
    })
  },
  switch1Change(e){
    this.setData({
      switch1Checked:e.detail.value
    })
  },
  switch2Change(e){
    if(!e.detail.value){
      this.setData({
        unable_contact:''
      })
    }
    this.setData({
      switch2Checked:e.detail.value
    })
  },
  seletDidian(e){
    console.log(e,'eee')
    this.setData({
      unable_contact:e.currentTarget.dataset.value,
      nowDidian:e.currentTarget.dataset.index
    })
  },
  getAppointment(){
    var data = []
    appointment().then(res=>{
      console.log(res)
      data[0] = [this.data.jintian,this.data.mingtian]
      data[1] = res.data[0]
      console.log(data)
      this.setData({
        allData:res.data,
        multiArray:data,
        nowDate:res.data[0][0]
      })
    })
  },
  //orderGetFreightPrice
  getYunfei(){
    function padZero(number) {
      return number < 10 ? '0' + number : number.toString();
    }
    
    orderGetFreightPrice({
      user_delivery_address_id: this.data.adrDetails.user_delivery_address_id, //收货地址id
      transfer_station_id: app.globalData.zzId, //中转站 自提点id 如果自取一定需要
      delivery_type: '1', //配送类型 0立即配送 1预约配送
      appointment_delivery_time: this.data.jintian + ' ' + this.data.nowDate.slice(0,-9), //预约配送时间 自取时间
      data: JSON.stringify(this.data.cCafterList) //json数组 [{"shop_id":1,"user_coupon_id":1,data:[{"stock_keeping_unit_id":1,"quantity":1}]}]
    }).then(res=>{
      console.log(res.data,'运费')
      this.setData({
        Yunfei:res.data[0],
        totalPrice:(Number(res.data[0]) + Number(this.data.originPrice) + Number(this.data.couponDetails.price)).toFixed(2),
      })
    })
  },
  createOrder() {
    // var date = new Date().toLocaleDateString().replace(/\//g, '-')
    function padZero(number) {
      return number < 10 ? '0' + number : number.toString();
    }
    var formattedDate
    if(this.data.today == 0){
      formattedDate = this.data.jintian
    }else{
      formattedDate = this.data.mingtian
    }
    addOrder({
      user_delivery_address_id: this.data.adrDetails.user_delivery_address_id, //收货地址id
      transfer_station_id: wx.getStorageSync('zzId'), //中转站 自提点id 如果自取一定需要
      delivery_type: '1', //配送类型 0立即配送 1预约配送
      appointment_delivery_time: formattedDate + ' ' +this.data.nowDate.slice(0,-9), //预约配送时间 自取时间
      data: JSON.stringify(this.data.cCafterList), //json数组 [{"shop_id":1,"user_coupon_id":1,data:[{"stock_keeping_unit_id":1,"quantity":1}]}]
      phone_contact:this.data.switch1Checked == true ? 1 : 0,
      note:this.data.note,
      unable_contact:this.data.unable_contact
    }).then(res => {
      if (res.code != 200) {
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      } else {
        // this.wxPayTest(res.data[0].pay_order_number)
        var hd = wx.getStorageSync('hd')
        wx.setStorageSync('hd', Number(hd) - this.data.allJianShu)
        wx.setTabBarBadge({
          index: 2,
          text: (Number(hd) - this.data.allJianShu).toString()
        });
        app.wxPay(res.data[0].pay_order_number)
      }
    })
  },
  //test订单生成
  wxPayTest(e){
    payNotifytest({
      pay_order_number: e,
    }).then(res=>{
      wx.redirectTo({
        url: '/pages/success/success?type=1',
      })
    })
  },

  couponAfterPrice() {
    var dataa = this.data.cCafterList
    dataa.forEach(item => {
      item.user_coupon_id = this.data.couponDetails.user_coupon_id
    })
    // console.log(dataa, 'dataadataadataadataadataadataadataadataadataadataadataadataa')
    // console.log(this.data.originPrice, 'dataadataadataadataadataadataadataadataadataadataadataadataa')
    // console.log(this.data.couponDetails.price, 'dataadataadataadataadataadataadataadataadataadataadataadataa')
    // console.log(this.data.Yunfei, 'dataadataadataadataadataadataadataadataadataadataadataadataa')

    this.setData({
      totalPrice: (Number(this.data.originPrice) - Number(this.data.couponDetails.price) + Number(this.data.Yunfei)).toFixed(2),
      cCafterList: dataa,
      couponPrice: this.data.couponDetails.price
    })
  },
  goCoupon() {
    console.log(this.data.cartShop[0].standardProductUnit.shop_id, 'this.data.cartShop[0].standardProductUnit.shop_id')
    wx.navigateTo({
      url: '../coupon/coupon?price=' + this.data.originPrice + '&shopId=' + this.data.cartShop[0].standardProductUnit.shop_id
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log('picker发送选择改变，携带值为', this.data.allData[e.detail.value[0]][e.detail.value[1]])
    this.setData({
      multiIndex: e.detail.value,
      // distributionTime: e.detail.value
      nowDate : this.data.allData[e.detail.value[0]][e.detail.value[1]]
    })

  },
  bindMultiPickerColumnChange(e) {
    console.log(e,'e')
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if(e.detail.column==0){
      if(e.detail.value == 0){
        console.log(0)
        var data = []
        data[0] = [this.data.jintian,this.data.mingtian]
        data[1] = this.data.allData[0]
        this.setData({
          multiArray:data,
          today:0
        })
      }else{
        console.log(1)
        var data = []
        data[0] = [this.data.jintian,this.data.mingtian]
        data[1] = this.data.allData[1]
        this.setData({
          multiArray:data,
          today:1
        })
      }
    }
  },
  getAddressList() {
    addressList({
      page: '0',
      page_size: '100'
    }).then(res => {
      var newlist = res.data.map(item => {
        if (item.default_address == 1) {
          return item
        }
      }).filter(Boolean).concat();
      // if(newlist.length>=1){
      //   newlist = res.data[2]
      // }else{
      //   newlist 
      // }
      console.log(newlist, 'newlist')
      this.setData({
        adrDetails: newlist[0]
      })
      this.getYunfei()
    })
  },
  goCheckAdr() {
    wx.navigateTo({
      url: '../adrList/adrList?isCheckAdr=0'
    })
	},
	getDate(){
		var today
		var tomorrw
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
		const day = currentDate.getDate().toString().padStart(2, '0');
		today = year + '-' + month + '-' + day;
		const day2 = (currentDate.getDate() + 1).toString().padStart(2, '0');
		tomorrw = year + '-' + month + '-' + day2;
		console.log(today,tomorrw)
		this.setData({
			jintian:today,
			mingtian:tomorrw
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