// pages/shopCart/shopCart.js 
import {
  shopCartList,
  addShopCart,
  updateShopCart,
  deleteShopCart
} from '../../request/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFirst : 1,
    shopList:[],
    selectAllStatus:true,
    sunm:0,
    totalPrice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      tabbarHeight:app.globalData.tabbarHeight
    })
    
  },
  getShopCartList(e){
    shopCartList({
      page:'0',
      page_size:'100'
    }).then( res => {
      res.data.forEach((item) => {
        item.check = true
      }) 
      this.setData({
        shopList:res.data
      })
      this.countPrice()
    })
  },
  checkShop(e,s){
    console.log(s,'ssssss')
    var index = e.currentTarget.dataset.index
    var list = this.data.shopList;
    
    list[index].check = !list[index].check;
    
    for (var i = list.length - 1; i >= 0; i--) {
      console.log(list[i].check,'list[i].check')
      if (!list[i].check) {
         this.data.selectAllStatus = false;
         break;
      }else{
         this.data.selectAllStatus = true;
      }
    }
    this.setData({
      shopList: list,
      selectAllStatus: this.data.selectAllStatus
    })
    this.countPrice()
  },

  selectAll:function(e){
    // 全选ICON默认选中
     let selectAllStatus = this.data.selectAllStatus;
     console.log( selectAllStatus," selectAllStatus")
     // true  -----   false
     selectAllStatus = !selectAllStatus;
     // 获取商品数据
     let list = this.data.shopList;
     console.log( list,"  this.data.list")
     // 循环遍历判断列表中的数据是否选中
     for (let i = 0; i < list.length; i++) {
       list[i].check = selectAllStatus;
     }
    
     // 页面重新渲染
     this.setData({
       selectAllStatus: selectAllStatus,
       shopList: list
     });
     // 计算金额方法
     this.countPrice();

 },
  //计算价格
  countPrice() {
  let list = this.data.shopList;
  let total = 0;
  let sunlu = 0
  for (let i = 0; i < list.length; i++) {
    if (list[i].check === true) {
      total += list[i].quantity * list[i].stockKeepingUnit.price;
      sunlu += Number(list[i].quantity);
      list[i].totalPrice = total
    }
  }
  wx.setStorageSync('shopping',list)
  this.setData({
    sunm:sunlu,
    totalPrice: total.toFixed(2)
  });
},
  jrShopCart(e){
    var xxxx = e.currentTarget.dataset.details
    var data = this.data.shopList
    var index = e.currentTarget.dataset.index
    addShopCart({
      standard_product_unit_id:xxxx.stockKeepingUnit.standard_product_unit_id,
      stock_keeping_unit_id:xxxx.stockKeepingUnit.stock_keeping_unit_id,
      current_price:xxxx.stockKeepingUnit.price,
      quantity:1
    }).then( res => {
      console.log(res,'加入购物车')
      data[index].quantity = Number(xxxx.quantity)+1
      this.setData({
        shopList:data
      })
      this.countPrice()
    })
  },
  delShopCart(e){
    var xxx = e.currentTarget.dataset.details
    var data = this.data.shopList
    var index = e.currentTarget.dataset.index
    if(xxx.quantity > 1){
      updateShopCart({
        shop_car_id:xxx.shop_car_id,
        quantity:xxx.quantity - 1
      }).then( res => {
        console.log(res,'购物车数量减少')
        data[index].quantity = xxx.quantity-1
        this.setData({
          shopList:data
        })
        this.countPrice()
        
      })
    }else{
      this.deleteCartShop(e)
    }
    
  },
  updateCart(e){
    var data = this.data.shopList
    var index = e.currentTarget.dataset.index
    updateShopCart({
      shop_car_id:e.currentTarget.dataset.id,
      quantity:e.detail.value
    }).then( res => {
      console.log(res,'购物车数量增多')
      data[index].quantity = e.detail.value
      this.setData({
        shopList:data
      })
      this.countPrice()
    })
  },
  deleteCartShop(e){
    deleteShopCart({
      shop_car_id:e.currentTarget.dataset.details.shop_car_id,
    }).then( res => {
      console.log(res,'删除购物车商品')
      this.getShopCartList()
      this.countPrice()
    })
  },
  goOrder(){
    console.log(this.data.shopList)
    var shopdata = this.data.shopList
    var newList = shopdata.map(item=>{
      if(item.check == true){
        return item
      }
    }).filter(Boolean).concat();
    
 
    wx.navigateTo({url:'../order/order?data=' + JSON.stringify(newList) + '&price=' + this.data.totalPrice})
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
    this.getShopCartList()
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