Page({

  /**
   * 页面的初始数据
   */
  data: {
    scroll:true, //是否允许右侧内容滚动
    index: 0,
    array: ['菜品', '原材料'],
    useHeight:'',
    current:'0',
    leftList:[
      {id:'0',text:'蔬菜豆菇'},{id:'1',text:'新鲜水果'},{id:'2',text:'鲜肉蛋禽'},
      {id:'3',text:'水产海鲜'},{id:'4',text:'乳品烘焙'},{id:'5',text:'方便速食'},
      {id:'6',text:'粮油调品'},{id:'7',text:'零食酒水'},{id:'8',text:'生活超市'},
      {id:'9',text:'火锅到家'}
    ],
    rightFl:[
      {id:'0',text:'蔬菜'},{id:'1',text:'豆菇'},{id:'2',text:'叶子菜'},
      {id:'3',text:'茄子'},{id:'4',text:'玉米'},{id:'5',text:'黄牙白'},
    ],
    rightList:[],
    flAllOpen:1
  },
  changeAllOpen(e){
    this.setData({
      flAllOpen : e.currentTarget.dataset.ao
    })
  },
  addShopCart(){
    console.log('maopao')
  },
  goDetails(){
    wx.navigateTo({url:'../shopDetails/shopDetails'})
  },
  /**
   * 选择搜索类型
   */
  bindPickerChange(e){
    this.setData({
      index:e.detail.value
    })
  },
  /**
   * 左侧点击事件
  */
  bindSelectLeft(e){
    let index = e.currentTarget.dataset.id;
    this.setData({
      current:index
    })
    this.getDataList(index);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          useHeight:res.windowHeight
        })
      }
    })
    this.getDataList(0);

  },
  // 数据初始化
  getDataList(e){
    let list1 = [
      {code:'0',text:'彩食鲜菠菜 270g/份',img:'../../image/ca1.jpg',price:'10.0'},
      {code:'0',text:'云南昆明 有机水果胡萝卜 1.5kg/份',img:'../../image/ca2.jpg',price:'10.0'},
      {code:'0',text:'彩食鲜菠菜 270g/份',img:'../../image/ca1.jpg',price:'10.0'},
      {code:'0',text:'云南昆明 有机水果胡萝卜 1.5kg/份',img:'../../image/ca2.jpg',price:'10.0'},
      {code:'0',text:'彩食鲜菠菜 270g/份',img:'../../image/ca1.jpg',price:'10.0'},
      {code:'0',text:'云南昆明 有机水果胡萝卜 1.5kg/份',img:'../../image/ca2.jpg',price:'10.0'},
      {code:'0',text:'彩食鲜菠菜 270g/份',img:'../../image/ca1.jpg',price:'10.0'},
      {code:'0',text:'云南昆明 有机水果胡萝卜 1.5kg/份',img:'../../image/ca2.jpg',price:'10.0'},
      {code:'0',text:'彩食鲜菠菜 270g/份',img:'../../image/ca1.jpg',price:'10.0'},
    ];
    let list2 = [
      {code:'3',text:'夫妻肺片'},{code:'4',text:'夫妻肺片'},{code:'5',text:'夫妻肺片'},
      {code:'0',text:'夫妻肺片'},{code:'1',text:'夫妻肺片'},{code:'2',text:'夫妻肺片'},
      {code:'3',text:'夫妻肺片'},{code:'4',text:'夫妻肺片'},{code:'5',text:'夫妻肺片'}
    ]
    if(e==0){
      this.setData({
        rightList:list1,
        scroll:true
      })
    }else if(e==2){
      this.setData({
        rightList:list2,
        scroll:true
      })
    }else{
      this.setData({
        rightList:[],
        scroll:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取当前设备可用高度
    
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
