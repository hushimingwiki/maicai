// pages/customerList/customerList.ts 
import {
	inviteList
} from '../../request/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEnd:true,
    customerList:[],
		page:0,
		pageSize:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
		this.getInviteList()
	},
	getInviteList(){
		inviteList({
			target_user_id:app.globalData.userInfo.user_id,
			page:this.data.page,
			page_size:this.data.pageSize
		}).then(res=>{
      console.log(res)
      // res.data = [
      //   {name:'张无忌',time:'2024-03-31',price:'99.9'},
      //   {name:'赵敏',time:'2024-03-31',price:'99.9'},
      //   {name:'周芷若',time:'2024-03-31',price:'99.9'},
      //   {name:'周芷若',time:'2024-03-31',price:'99.9'},
      //   {name:'周芷若',time:'2024-03-31',price:'99.9'},
      //   {name:'赵敏',time:'2024-03-31',price:'99.9'},
      //   {name:'赵敏',time:'2024-03-31',price:'99.9'},
      //   {name:'赵敏',time:'2024-03-31',price:'99.9'},
      //   {name:'赵敏',time:'2024-03-31',price:'99.9'},
      //   {name:'赵敏',time:'2024-03-31',price:'99.9'}
      // ]
	
      this.setData({
        page:this.data.page+1,
        customerList: [...this.data.customerList,...res.data],
        isEnd:res.data.length<10?false:true
      })
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
    if(this.data.isEnd){
      this.getInviteList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    
  }
})