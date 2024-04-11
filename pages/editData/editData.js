// pages/editData/editData.js
const app = getApp()
import { postFile } from '../../request/request'
import { 
  updateUserInfo,
  getUserInfo
} from '../../request/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    imgName:null,
    cWidth: 2000,
    cHeight:2000,
    mapCtx:{},
    imgFiles:[],
    compressImgs:[],
    avatarUrl:''
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    console.log(avatarUrl)
    this.setData({
      avatarUrl,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var str = app.globalData.userInfo.picture;
    var index = str.lastIndexOf("\/");  
    str  = str.substring(index + 1, str.length);
    console.log(str)
    this.setData({
      userInfo:app.globalData.userInfo,
      imgName:str
    })
    console.log(app.globalData.userInfo)
  },

  formSubmit(e) {
    if(!e.detail.value.nickname){
      wx.showToast({
        title: '请填写昵称',
      })
      return
    }
    console.log(this.data.avatarUrl)
    if(this.data.avatarUrl){
      postFile({type:3},this.data.avatarUrl).then(ress=>{
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(ress,"reeeeeeeeee")
        updateUserInfo({
          nickname:e.detail.value.nickname,
          picture:ress.data
        }).then(res=>{
          console.log(res)
          wx.showToast({
            title: '保存成功',
          })
          this.HquserInfo()
        })
      })
    }else{
      updateUserInfo({
        nickname:e.detail.value.nickname,
       
      }).then(res=>{
        console.log(res)
        wx.showToast({
          title: '保存成功',
        })
        this.HquserInfo()
      })
    }
     
   
    

  },
  //获取用户信息
  HquserInfo() {
    getUserInfo().then(res => {
      console.log(res,'用户信息')
      if (res.code == 200) {
        app.globalData.userInfo = res.data
        app.globalData.userAuth = true
        this.setData({
          userInfo:res.data
        })
      }
    })
  },
  // 拍照图片
  img_w_show(e){
    var that =this
    let maxSize = 128;
    let dWidth = wx.getSystemInfoSync().windowWidth;
    console.log(dWidth);
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.navigateTo({
          url: `/pages/avatar-cropper/index?url=${res.tempFilePaths[0]}`,
        })
        // that.compressImg(res.tempFilePaths[0])
      }
    })
  },

  //压缩
  compressImg(e,s){
    var compreeSize = s?s:50
    console.log(e,1111111111111111111111111111111111111)
    var that =this
    wx.compressImage({
      src: e,
      quality:s?compreeSize/2:compreeSize,
      success:function(img){
        console.log(img)
        wx.getFileInfo({
          filePath:img.tempFilePath,
          success:function(imgdata){
            var imgsize = imgdata.size/1024
            console.log('压缩后：'+imgdata.size/1024+'kb')
            if(imgsize>256){
              wx.showToast({
                title: '图片过大'+imgsize,
              })
              setTimeout(()=>{
                that.compressImg(img.tempFilePath,compreeSize)
              },5000)
              
              console.log(img.tempFilePath,22222222222222222222222222222222222222222)
            
            }else{
              wx.navigateTo({
                url: `/pages/avatar-cropper/index?url=${img.tempFilePath}`,
              })
            }
          }
  
        })
        
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */


  onShow: function () {
      if(app.globalData.avatar){
        console.log(12333)
        var str = 'userInfo.picture' 
        this.setData({
          userInfo:app.globalData.userInfo,
          imgName:app.globalData.avatarName,
          [str]:app.globalData.avatar
        })
      }  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})