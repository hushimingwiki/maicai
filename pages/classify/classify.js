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
    scroll: true, //是否允许右侧内容滚动
    array: ['菜品', '原材料'],
    useHeight: '',
    current: '0',
    rightList: [],
    flAllOpen: 1,
    categoryList: [],
    twoCategoryList: [],
    threeCategoryList: [],
    headerHeight: '',
    isCheck: '-1',
    isCheckTwo: '0',
    isCheckThree: '0',
    shopList: [],
    activeIndex: 0,
    flId: null,
    page: 0,
    pageSize: 10,
    isEnd: true,
    category_3_id:0,
    isOnonLoad:false
  },

  changeAllOpen(e) {
    this.setData({
      flAllOpen: e.currentTarget.dataset.ao
    })
  },
  goSearch(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  jrShopCart(e) {
    shopDetails({
      standard_product_unit_id: e.currentTarget.dataset.details
    }).then(res => {
      console.log(res, '获取商品详情')
      this.setData({
        allShopDetails: res.data,
        zdId:this.data.zzId
      })
      addShopCart({
        user_id: '',
        standard_product_unit_id:this.data.allShopDetails.standard_product_unit_id,
        current_price:this.data.allShopDetails.price,
        quantity: 1
      }).then(res => {
        console.log(res, '加入购物车')
        var hd = wx.getStorageSync('hd')
        wx.setStorageSync('hd', Number(hd) + 1)
        wx.setTabBarBadge({
          index: 2,
          text: (Number(hd) + 1).toString()
        });
        wx.showToast({
          title: '加入购物车成功，我在购物车等你哦',
          icon: 'none',
          duration: 1500
        })
      })
    })
  },
  goDetails(e) {
    var xxxx = e.currentTarget.dataset.details
    console.log(JSON.stringify(xxxx), 'xxxx')
    wx.navigateTo({
      url: '../shopDetails/shopDetails?details=' + encodeURIComponent(JSON.stringify(xxxx))
    })
  },
  /**
   * 选择搜索类型
   */
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   isCheck:'-1'
    // })

  },
  // 获取一级分类列表
  getCategoryList() {
    // wx.showLoading({
    //   title:'加载中...'
    // })
    categoryList({
      parent_id: 0
    }).then(res => {
      console.log(res, '一级分类列表')
      res.data.forEach((item,index) => {
        if(item.category_id == this.data.flId){
          // this.setData({
          //   isCheck:index
          // })
          return
        } 
      });
      this.setData({
        shopList: [],
        page: 0,
        isEnd: true,
        categoryList: res.data,
      })
      
      this.getTwoCategoryList(res.data[0].category_id)
    })
  },
  // 选择一级分类事件
  selectFlOne(e) {
    var ind = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    this.setData({
      isCheck: ind,
      shopList: [],
      page: 0,
      isEnd: true
    })
    this.getTwoCategoryList(id)
  },
  // 获取二级分类列表
  getTwoCategoryList(e) {
    categoryList({
      parent_id: this.data.flId ? this.data.flId : e
    }).then(res => {
      console.log(res, '二级分类列表')
      this.setData({
        twoCategoryList: res.data,
        flId:null
      })
      // wx.setStorageSync('param', null)
      this.getThreeCategoryList(res.data[0].category_id,res.data[0].name)
    })
  },
  // 选择二级分类列表
  bindSelectLeft(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    this.setData({
      isCheckTwo: index,
      shopList: [],
      page: 0,
      isEnd: true
    })
    this.getThreeCategoryList(id,name)
  },
  //获取三级分类
  getThreeCategoryList(e,n) {
    console.log(n,'nnnnnnnn')
    categoryList({
      parent_id: e
    }).then(res => {
      console.log(res, '三级分类列表')
      if(n == "推荐"){
        console.log("推荐")
        this.setData({
          threeCategoryList: res.data,
          now3flId: ''
        })
      }else{
        this.setData({
          threeCategoryList: res.data,
          now3flId: res.data[0].category_id
        })
      }
      this.getShopList()
    })
  },
  // 切换三级分类
  selectFlThree(e) {
    console.log(e, 'eee')
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    this.setData({
      isCheckThree: index,
      flAllOpen: 1,
      now3flId: id,
      page: 0,
      isEnd: true,
      shopList:[]
    })
    console.log(2)
    this.getShopList(id)
  },
  getShopList(e) {
    categorySearch({
      transfer_station_id: this.data.zdId,
      category_3_id: this.data.isCheck=='-1' ? '' : this.data.now3flId,
      page: this.data.page,
      page_size: this.data.pageSize
    }).then(res => {
      console.log(res, '商品列表')
      console.log(this.data.isCheck)
      if(res.code=='200'){
        this.setData({
          page: this.data.page + 1,
          shopList: [...this.data.shopList, ...res.data],
          isEnd: res.data.length < 10 ? false : true
        })
        wx.hideLoading()
      }else{
        wx.hideLoading()
        wx.showToast({
          title: res.msg,
          icon:'error'
        })
      }
      
    })
  },
  nextPage() {
    console.log(3)
    if (this.data.isEnd) {
      this.getShopList()
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
    var that = this
		var upPageData = wx.getStorageSync('param')
		this.setData({
			zdId :  app.globalData.zzId,
		})
    if(upPageData){
      console.log('有缓存index',upPageData)
      that.setData({
        flId: upPageData.id,
        isCheck:upPageData.index
      })
      that.getCategoryList()
    }else{
      this.setData({
        isCheck:'-1'
      })
      console.log('mei 有缓存index')
      that.getCategoryList()
    }
    wx.getSystemInfo({
      success(res) {
        that.setData({
          useHeight: res.windowHeight
        })
      }
    })
    console.log(app.globalData.capsuleObj, 'app.globalData.capsuleObj')
    this.setData({
      headerHeight: app.globalData.titleHeight,
      statusBarHeight: app.globalData.statusBarHeight,
      capsuleObj: app.globalData.capsuleObj,
      

    })
    var hd = wx.getStorageSync('hd')
    wx.setTabBarBadge({
      index: 2,
      text: hd.toString()
    });
    return
    console.log(this.data.zdId,app.globalData.zzId,'zz')
    if(this.data.zdId != app.globalData.zzId){
      console.log("切换了站点")
      this.setData({
        zdId :  app.globalData.zzId
      })
      console.log(4)
      if(!this.data.isOnonLoad){
        this.getShopList()
      }
      
    }else if(this.data.zdId == app.globalData.zzId && !this.data.isOnonLoad){
      this.getShopList()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
    wx.setStorageSync('param', null)
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