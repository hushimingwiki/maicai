import {
  CommentList
} from '../../request/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:null,
    page:0,
    Comment:[],
    isEnd:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    console.log(option.obj,'option.obj')
    this.setData({
      dataList:JSON.parse(option.obj)
    })
    this.getCommentList()
  },
  getCommentList(){
    console.log(this.data.allShopDetails,'this.data.allShopDetails')
    CommentList({
      standard_product_unit_id:this.data.dataList.standard_product_unit_id,
      stock_keeping_unit_id:this.data.dataList.stockKeepingUnits[0].stock_keeping_unit_id,
      self_comment:'0',
      page:this.data.page,
      page_size:10
    }).then(res=>{
      console.log(res,'评论')
      this.setData({
        Comment:[...this.data.Comment,...res.data],
        page:this.data.page+1,
        isEnd:res.data.length<5?false:true
      })
      console.log(this.data.Comment)
    })
  },
  nextPage(){
    console.log('下一页')
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
    console.log(123)
    if(this.data.isEnd){
      this.getCommentList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})