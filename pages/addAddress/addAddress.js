// pages/addAddress/addAddress.ts
import {
  addAddress,
} from '../../request/api.js'
const app = getApp()
const chooseLocation = requirePlugin('chooseLocation');
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      name:'',
      phone_number:'',
      address:'',
      detail_address:'',
      province:'',
      city:'',
      district:'',
    },
    noInventory:null,
    data:true,
  },
  goChoose(){
    //腾讯插件
    const key = '2T7BZ-YB5AJ-3XFF7-KE66C-J4646-2RFCF'; //使用在腾讯位置服务申请的key
    const referer = '菜多惠'; //调用插件的app的名称
    let address = app.globalData.location.location
    const location = JSON.stringify({
      latitude: address.lat,
      longitude: address.lng
    });
    const category = '小区';

    wx.navigateTo({
      url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
    });
    return
    //自作地图
    wx.navigateTo({
      url: '/pages/selectLocation/selectLocation',
    })
  },
  goSelectAdr(){
    if(!app.globalData.location){
      app.isLocation()
      // wx.navigateTo({
      //   url: '../selectAdr/selectAdr'
      // })
      this.goChoose()
      return
    }else{
      this.goChoose()
      // wx.navigateTo({
      //   url: '../selectAdr/selectAdr'
      // })
    }
  },
  //位置提示框关闭
  authClose(){
    setTimeout(() => {
      if(app.globalData.location && this.data.noInventory){
        this.goChoose()
      }
    }, 1000);
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(this.data.formData)
    console.log(this.data.formData.city)
    console.log(this.data.formData.district)
    var that = this
    // return
    if(e.detail.value.name && e.detail.value.phone_number && e.detail.value.address && e.detail.value.detail_address){
      const phoneReg = /^1[345789]\d{9}/;
      if(!phoneReg.test(e.detail.value.phone_number)){
        wx.showToast({
          title: '请填正确手机号',
          icon: 'none'
        })
      }else{
        addAddress({
          name:e.detail.value.name,
          phone_number:e.detail.value.phone_number,
          address:e.detail.value.address,
          detail_address:e.detail.value.detail_address,
          default_address:e.detail.value.default_address == false ? "0" : "1",
          province:that.data.formData.province,
          city:that.data.formData.city,
          district:that.data.formData.district,
          latitude:that.data.formData.latitude,
          longitude:that.data.formData.longitude,
        }).then(res=>{
          if(res.code == 200){
            wx.showToast({
              title: '添加成功',
              icon:'success'
            })
            wx.navigateBack();
          }else{
            wx.showToast({
              title: res.msg,
              icon:'fail'
            })
          }
        })
      }
    }else{
      wx.showToast({
        title: '请完善数据',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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
    const location = chooseLocation.getLocation();
    console.log(location,'locationlocation')
      if(!app.globalData.location){
        app.isLocation()
      }
      if(location){
        this.setData({
          'formData.province':location.province,
          'formData.city':location.city,
          'formData.district':location.district,
          'formData.address':location.address,
          'formData.detail_address':location.name,
          'formData.longitude':location.longitude,
          'formData.latitude':location.latitude,
        })
      }
        
        console.log(this.data.formData)
      
      
      
    this.setData({
      noInventory:!app.globalData.location
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

  }
})