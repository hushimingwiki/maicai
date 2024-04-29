// pages/team/team.ts
import {
  teamGet,
} from '../../request/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTuanzhang:'1',
    rankingList:[
      {
        mc:'1',picture:'https://tencent.file.caiduohui.com/picture/20240414094833660000001.jpeg',name:'朱元璋',price:'999'
      },
      {
        mc:'2',picture:'https://tencent.file.caiduohui.com/picture/20240414094833660000001.jpeg',name:'朱棣',price:'888'
      },
      {
        mc:'3',picture:'https://tencent.file.caiduohui.com/picture/20240414094833660000001.jpeg',name:'朱高炽',price:'777'
      },
      {
        mc:'4',picture:'https://tencent.file.caiduohui.com/picture/20240414094833660000001.jpeg',name:'朱詹基',price:'666'
      },
      {
        mc:'5',picture:'https://tencent.file.caiduohui.com/picture/20240414094833660000001.jpeg',name:'朱祁镇',price:'555'
      },
      {
        mc:'6',picture:'https://tencent.file.caiduohui.com/picture/20240414094833660000001.jpeg',name:'朱见深',price:'444'
      },
      {
        mc:'7',picture:'https://tencent.file.caiduohui.com/picture/20240414094833660000001.jpeg',name:'李世民',price:'333'
      },
      {
        mc:'8',picture:'https://tencent.file.caiduohui.com/picture/20240414094833660000001.jpeg',name:'李隆基',price:'222'
      },
      {
        mc:'9',picture:'https://tencent.file.caiduohui.com/picture/20240414094833660000001.jpeg',name:'赵匡胤',price:'111'
      },
      {
        mc:'10',picture:'https://tencent.file.caiduohui.com/picture/20240414094833660000001.jpeg',name:'赵光义',price:'6'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo:app.globalData.userInfo
    })
    this.getTeam()
  },
  getTeam(){
    teamGet().then(res=>{
      console.log(res)
    })
  },
  goTeamMem(){
    wx.navigateTo({
      url: '/pages/teamMembers/teamMembers',
    })
  },
  gouYaoqing(){
    wx.navigateTo({
      url: '/pages/yaoQing/yaoQing',
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
    console.log(app.globalData.userInfo, 'app.globalData.userInfo')
		return {
			title: app.globalData.userInfo.nickname + '邀请你加入红花会',
			path: '/pages/index/index?parentId=' + app.globalData.userInfo.user_id,
			imageUrl: 'https://tencent.file.caiduohui.com/picture/20240414094833660000001.jpeg'
		}
  }
})