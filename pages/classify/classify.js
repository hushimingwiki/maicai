const app = getApp()
import {
  categoryList,
  shopList,
  shopDetails,
  addShopCart,
  categorySearch,
} from '../../request/api.js'
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
    flAllOpen:1,
    categoryList:[],
    twoCategoryList:[],
    threeCategoryList:[],
    headerHeight:'',
    isCheck:'0',
    isCheckTwo:'0',
    isCheckThree:'0',
    shopList:[],
    activeIndex:0,
    flId:null,
    page:0,
    pageSize:10
  },

  changeAllOpen(e){
    this.setData({
      flAllOpen : e.currentTarget.dataset.ao
    })
  },
  jrShopCart(e){
    shopDetails(
      {standard_product_unit_id:e.currentTarget.dataset.details}
    ).then( res => {
      console.log(res,'获取商品详情')
      this.setData({
        allShopDetails:res.data,
      })
      addShopCart({
        user_id:'',
        standard_product_unit_id:this.data.allShopDetails.standard_product_unit_id,
        stock_keeping_unit_id:this.data.allShopDetails.stockKeepingUnits[0].stock_keeping_unit_id,
        current_price:this.data.allShopDetails.stockKeepingUnits[0].price,
        quantity:1
      }).then( res => {
        console.log(res,'加入购物车')
        var hd = wx.getStorageSync('hd')
        wx.setStorageSync('hd', Number(hd)+1)
        wx.setTabBarBadge({
          index: 2,
          text: (Number(hd)+1).toString()
        });
        wx.showToast({title:'加入购物车成功，我在购物车等你哦',icon: 'none',duration: 1500})
      })
    })  
  },
  goDetails(e){
    var xxxx = e.currentTarget.dataset.details
    console.log(JSON.stringify(xxxx),'xxxx')
    wx.navigateTo({url:'../shopDetails/shopDetails?details=' + JSON.stringify(xxxx)})
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
  },
  // 获取一级分类列表
  getCategoryList(){
    
    categoryList(
      {parent_id:this.data.flId?this.data.flId:0}
    ).then( res => {
      console.log(res,'一级分类列表')
      this.setData({
        categoryList:res.data,
      })
      this.getTwoCategoryList(res.data[0].category_id)
    })  
  },
  // 选择一级分类事件
  selectFlOne(e){
    var ind = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    this.setData({
      isCheck : ind,
      shopList:[]
    })
    this.getTwoCategoryList(id)
  },
  // 获取二级分类列表
  getTwoCategoryList(e){
    categoryList(
      {parent_id:e}
    ).then( res => {
      console.log(res,'二级分类列表')
      this.setData({
        twoCategoryList:res.data,
      })
      this.getThreeCategoryList(res.data[0].category_id)
    })  
  },
  // 选择二级分类列表
 bindSelectLeft(e){
  console.log(e)
  let index = e.currentTarget.dataset.index;
  let id = e.currentTarget.dataset.id;
  this.setData({
    isCheckTwo:index,
    shopList:[]
  })
  this.getThreeCategoryList(id)
 },
 //获取三级分类
 getThreeCategoryList(e){
  categoryList(
    {parent_id:e}
  ).then( res => {
    console.log(res,'三级分类列表')
    this.setData({
      threeCategoryList:res.data,
    })
    this.getShopList(e)
  })  
},
// 切换三级分类
selectFlThree(e){
  console.log(e,'eee')
  let index = e.currentTarget.dataset.index;
  let id = e.currentTarget.dataset.id;
  this.setData({
    isCheckThree:index,
    flAllOpen : 1
  })
  this.getShopList(id)
},
getShopList(e){
  categorySearch({
    transfer_station_id:app.globalData.zzId,
    category_3_id:e,
    page:this.data.page,
    page_size:this.data.pageSize
  }).then( res => {
    console.log(res,'商品列表')
    this.setData({
      shopList:res.data,
    })
  })   
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
    var hd = wx.getStorageSync('hd')
    wx.setTabBarBadge({
      index: 2,
      text: hd.toString()
    });
    var that = this
    wx.getStorage({
      key: 'param',
      success: function(res) {
        console.log(res.data,'res.data')
        that.setData({
          flId:res.data
        })
        that.getCategoryList()
      },fail:res=>{
        that.getCategoryList()
      }
    });
    wx.getSystemInfo({
      success(res) {
        that.setData({
          useHeight:res.windowHeight
        })
      }
    })
    console.log(app.globalData.capsuleObj,'app.globalData.capsuleObj')
    this.setData({
      headerHeight:app.globalData.titleHeight,
      statusBarHeight:app.globalData.statusBarHeight,
      capsuleObj:app.globalData.capsuleObj,
    })
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
