import {
  GoodsComment,
  TaskRecordAdd
} from '../../request/api.js'
import {
  postFile
} from '../../request/request'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImagesList: [],
    Score: 0,
    Content: '',
    Video: '',
    VideoName: '',
    pic:[],
    imageName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.data)
    this.setData({
      Data: JSON.parse(options.data)
    })
    console.log(this.data.Data)
    // this.getMainList()
  },
  //打分评星
  tap(e) {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    let index = e.currentTarget.dataset.index
    this.setData({
      Score: index
    })
  },
  //评论
  adInputChange: function (e) {
    let vue = e.detail.value
    this.setData({
      Content: vue
    })
  },
  delect(e){
    var index = e.currentTarget.dataset.index
    console.log(index)
    var imageList = this.data.pic
    imageList.splice(index,1)
    this.setData({
      pic : imageList
    })
  },
  //上传图片
  imgSelect() {
    console.log('123333333333333333333333333333333')
    let that = this
    var imageList = that.data.pic
    // 图片限制大小
    const fileLimit = 2 * 1024 * 1024
    console.log(444444444444444444)
    wx.chooseMedia({
      sizeType: ['original', 'compressed'],
      mediaType: 'image',
      count: 9,
      sourceType: ['album', 'camera'],
      success: async function (res) {
        let tempFiles = res.tempFiles
        if (tempFiles.length) {
          for (let i = 0; i < tempFiles.length; i++) {
            let filePath = tempFiles[i].tempFilePath
            const size = tempFiles[i].size / 1024 / 1024;
            that.setData({
              sizeBefore: size,
            })
            // 图片超过大小限制
            // 手动压缩
            filePath = await that.compressFile(filePath, i, tempFiles[i].size)
            
            var obj = {
              image:filePath
            }
            console.log(imageList,'imageListimageList')
            imageList.push(obj)
            console.log(imageList,'objobjobjobjobjobjobj')
            // 上传图片
            that.setData({
              pic: imageList
            });
            
            // 获取压缩后图片的信息，包括大小等
            wx.getFileSystemManager().getFileInfo({
              filePath: filePath,
              success: fileInfo => {
                that.setData({
                  compressSize: fileInfo.size / 1024 / 1024
                })
              },
              fail: err => {
                console.error('获取压缩后图片信息失败:', err);
              }
            });
          }
        }
      },fail:async function(err){
        console.log(err)
      }
    })
  },
  compressFile(src, i, size) {
    let that = this
    return new Promise((resolve) => {
      // 获取图片信息
      wx.getImageInfo({
        src,
        success: (img) => {
          let imgWidth = img.width
          let imgHeight = img.height
          //这段必看！！！！
          const windowWidth = wx.getSystemInfoSync().windowWidth;
          let imgRatio = imgHeight / imgWidth;
          that.setData({
            compressH: windowWidth * imgRatio
          })
          that.compressImage(src, size).then(res => {
            resolve(res)
          })
        },
        fail: () => {
          that.compressImage(src, size).then(res => {
            resolve(res)
          })
        }
      })
    })
  },
  compressImage(src, size) {
    let that = this
    return new Promise((resolve, reject) => {
      let quality = 100
      // ios因为自己有压缩机制，压缩到极致就不会再压，因此往小了写
      if (this.data.isIOS) {
        quality = 0.1
      } else {
        let temp = 30 - parseInt(size / 1024 / 1024)
        quality = temp < 10 ? 10 : temp
      }
      that.setData({
        quality: quality //测试后 ios 0.1  安卓压缩仅对jpg图片压缩
      })
      wx.compressImage({
        src, // 图片路径
        quality: 10, // 压缩质量
        success: function (res) {
          console.log('官方API压缩res', res, quality)

          resolve(res.tempFilePath)
        },
        fail: function (err) {
          resolve(src)
        }
      })
    })
  },
  //上传视频
  img_w_show() {
    var that = this
    wx.chooseMedia({
      mediaType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      // compressed: 'true',
      success(res) {
        var size = res.size / 1024 / 1024
        app.toast(size)
        if (size > 16) {
          app.toast('视频过大')
        }
        console.log(res)
        console.log(res.tempFilePath)
        console.log(size)
        wx.showLoading({
          title: '上传中...',
        })
        postFile(res.tempFilePath, app.globalData.token, 3, 17).then(ress => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          console.log(ress, "reeeeeeeeee")
          that.setData({
            Video: ress.data.url,
            VideoName: ress.data.name
          })
          wx.hideLoading()
        })
      }
    })
  },
  // 循环上传图片
  upDataImage(){
    if (!this.data.Score) {
      app.toast('请打分')
      return
    }
    if (!this.data.Content) {
      app.toast('请评论')
      return
    }
    
    
    console.log('33333333333333333333333333333333333333333333')
    var dataList = this.data.pic
    var that = this
    var count = 0;
    if (!that.data.pic) {
      app.toast('请上传至少一张图片')
      return
    }
    dataList.forEach((item, index, arr)=>{
      console.log(item.image)
      postFile(item.image).then(ress => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(ress, "reeeeeeeeee")
        that.setData({
          imageName: (that.data.imageName + ','+ ress.data).substr(1)
        })
        count++
        console.log(that.data.imageName,'imageName')
        if(count === arr.length){
          that.submit();
        }
        wx.hideLoading()
      })
    })
    
  },
  submit() {
    
    
    var dals = this.data.Data.orderItems
    var plList = []
    dals.forEach((item,index,arr)=>{
      var obj = {
        "standard_product_unit_id":item.standard_product_unit_id,
        "stock_keeping_unit_id":item.stock_keeping_unit_id,
        "star":this.data.Score,
        "content":this.data.Content,
        "pictures":this.data.imageName
      }
      plList.push(obj)
    })
    
    GoodsComment({
      order_id: this.data.Data.order_id,
      data:JSON.stringify(plList)
    }).then(res => {
      if (res.code == 200) {
        app.toast('上传成功')
        
        setTimeout(() => {
          wx.navigateBack({
            delta: 2,
          })
        }, 2000)
      } else {
        app.toast(res.msg)
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