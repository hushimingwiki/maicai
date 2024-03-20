import {
  addressList,deleteAddress,
} from '../../request/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    startX: 0, // 开始坐标
    delIndex: -1, // 当前滑动的元素下标位置
    isCheckAdr:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      isCheckAdr:options.isCheckAdr
    })
    
  },
  checkAdr(e){
   
    if(this.data.isCheckAdr == 0){
      let pages = getCurrentPages(); //获取上一个页面信息栈(a页面)
      let prevPage = pages[pages.length - 2] //给上一页面的tel赋值
      console.log(prevPage,'prevPageprevPageprevPageprevPageprevPageprevPageprevPageprevPage')
      prevPage.setData({
        "adrDetails": e.currentTarget.dataset.item
      });
      wx.navigateBack(); //关闭当前页面，返回上一个页面

    }else{

    }
  },
  delItem(e){
    deleteAddress({
      user_delivery_address_id:e.currentTarget.dataset.id
    }).then(res=>{
      wx.showToast({
        title: '删除成功',
      })
    })
  },
  goUpdateAdr(e){
    var da = e.currentTarget.dataset.adr
    console.log(da,'eeeeeeeeeeeeeeeeeeeeeeeeeee')
    wx.navigateTo({
      url: '../updateAdr/updateAdr?adr=' + JSON.stringify(da),
    })
  },
  getAddressList(){
    addressList({
      page:'0',
      page_size:'100'
    }).then(res=>{
      res.data.forEach((item) => {
        item.xmove = 0
      }) 
      this.setData({
        dataList:res.data
      })
    })
  },
  handleDelete(e) {
    let { id } = e.currentTarget.dataset;
    console.log(id)
  },
  goAddAddress(){
    wx.navigateTo({
      url: '../addAddress/addAddress'
    })
  },
 
  
//手指触摸动作开始 记录起点X坐标
touchstart (e) {
  //开始触摸时 重置所有删除
  this.setData({
    startX: e.changedTouches[0].clientX,
    delIndex: -1
  })
},
//滑动事件处理
touchmove: function (e) {
  let self = this,
  index = e.currentTarget.dataset.index, //当前索引
  startX = self.data.startX, //开始X坐标
  touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
  delIndex = self.data.delIndex;
  if (touchMoveX > startX) {
    //右滑
    delIndex = -1
  } else {
    //左滑
   delIndex = index
  }
  self.setData({
    delIndex
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
    this.getAddressList()
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