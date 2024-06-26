// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
import {
  bannerList, shopList,addShopCart,shopDetails,receiveCouponList,addCoupon,zuijinStation,categoryList
} from '../../request/api.js'
Page({
  data: {
    bannerList:[],
    shopList:[],
    headerHeight:'',
    allShopDetails:null,
    klqCoupon:[],
    adrDetails: {
      province:'',
      city:'',
      district:'',
      address:'',
      longitude:'',
      latitude:''
    },
    station:null,
    fenLeiList:null,
    StorageDW:null,
    isEnd:true,
    page:0,
    pageSize:10
  },
  onLoad: function (option) {
    var that = this
    this.setData({
      headerHeight:app.globalData.titleHeight,
      capsuleObj:app.globalData.capsuleObj
    })
    this.getFenlei()

  },
  tiaozhuan(e){
    var type = e.currentTarget.dataset.type
    var content = e.currentTarget.dataset.content
    console.log(type,'type')
    if(type == '4'){
      wx.navigateTo({
        url: '../vip/vip'
      })
    }else if(type == '3'){
      wx.setStorage({
        key: 'param',
        data: {
          id : e.currentTarget.dataset.content,
          index : e.currentTarget.dataset.index,
        },
        success: function() {
          wx.switchTab({
            url: '../classify/classify'
          });
        }
      });
    }
  },
  goVip(){
    wx.navigateTo({
      url: '../vip/vip'
    })
  },
  goSearch(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
 
  goCheckAdr(){
    wx.navigateTo({
      url: '../adrList/adrList?isCheckAdr=0&isIndex=0'
    })
  },
  getFenlei(){
    console.log('123')
    categoryList({
      parent_id:0
    }).then(res=>{
      this.setData({
        fenLeiList:res.data
      })
    })
  },
  goFenlei(e){
    console.log(e.currentTarget.dataset.id,'e.currentTarget.dataset.id')
    wx.setStorage({
      key: 'param',
      data: {
        id : e.currentTarget.dataset.id,
        index : e.currentTarget.dataset.index,
      },
      success: function() {
        wx.switchTab({
          url: '../classify/classify'
        });
      }
    });
  },
  getAdrFjZzz(){
    console.log(this.data.adrDetails)
    this.setData({
      adrDetails:this.data.adrDetails
    })
    this.getZuijinStation()
  },
  getZuijinStation(){
    console.log(this.data.adrDetails,'this.data.adrDetails')
    var sdata = this.data.adrDetails
    var myPromise =  new Promise((resolve,reject)=>{
      if(this.data.StorageDW){
        console.log("有经纬度")
        resolve()
      }else{
        console.log("没有经纬度，0.5s后再次执行")
        setTimeout(() => {
          this.getZuijinStation()
        }, 500)
      }
    })
    
    myPromise.then(res=>{
      console.log(this.data.StorageDW,'成功获取经纬度并获取中转站')
      console.log(sdata,'sdata')
      console.log(this.data.StorageDW,'this.data.StorageDW')
      zuijinStation({
        province:sdata.province ? sdata.province : this.data.StorageDW.address_component.province,
        city:sdata.city ? sdata.city : this.data.StorageDW.address_component.city,
        district:sdata.district ? sdata.district : this.data.StorageDW.address_component.district,
        longitude:sdata.longitude ? sdata.longitude : this.data.StorageDW.location.lng,
        latitude:sdata.latitude ? sdata.latitude : this.data.StorageDW.location.lat
      }).then(res=>{
        console.log(res,'res')
        this.setData({
          station:res.data,
          now_zzid:res.data.transfer_station_id
        })
        app.globalData.zzId = res.data.transfer_station_id
        wx.setStorageSync('zzId', res.data.transfer_station_id)
        wx.setStorageSync('zzInfo', res.data)
        this.getShopList(res.data.transfer_station_id)
      })
    })
  },
  goUse(){
    wx.navigateTo({
      url: '../receiveCoupon/receiveCoupon'
    })
  },
  getReceiveCouponList(){
    receiveCouponList({
      shop_id:0,
      page:0,
      page_size:100
    }).then(res=>{
      console.log(res.data,'可领优惠券')
      this.setData({
        klqCoupon:res.data
      })
      // this.getAddCoupon()
    })
  },
  getAddCoupon(){
    let couList = this.data.klqCoupon
    console.log(couList,'couList')
    couList.forEach(item => {
      console.log(item.coupon_id,'couList')
      addCoupon({
      coupon_id:item.coupon_id
      }).then(res=>{
        console.log(res,'领取优惠券成功')
      })
    });
    
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
          current_price:this.data.allShopDetails.price,
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
  getBannerList(){
    bannerList().then( res => {
      console.log(res,'轮播图列表')
      this.setData({
        bannerList:res.data,
      })
    })
  },
  getShopList(e){
    wx.showLoading({
      title:'加载中...'
    })
    shopList({
      transfer_station_id:this.data.now_zzid,
      page:this.data.page,
      page_size:this.data.pageSize
    }).then( res => {
      console.log(res,'商品列表')
      // this.setData({
      //   shopList:res.data,
			// })
				this.setData({
					page:this.data.page+1,
					shopList: [...this.data.shopList,...res.data],
					isEnd:res.data.length<10?false:true
				})
      wx.hideLoading()
    })   
  },
  goDetails(e){
    var xxxx = e.currentTarget.dataset.details
    console.log(JSON.stringify(xxxx),'xxxx')
    wx.navigateTo({url:'../shopDetails/shopDetails?details=' + encodeURIComponent(JSON.stringify(xxxx))})
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  // authClose(){
  //   setTimeout(() => {
  //     if(this.data.StorageDW && this.data.noInventory){
  //       this.goChoose()
  //     }
  //   }, 1000);
  // },
  getRequest(){
    wx.showLoading({
      title: '获取定位中',
    })
    console.log(app.globalData,'this.data.StorageDW')
		var dingwei = app.globalData.location
    this.setData({
      StorageDW:dingwei
    })
    console.log(dingwei,'dingweidingweidingweidingweidingweidingweidingweidingwei')
    if(dingwei){
      this.getBannerList()
      this.getZuijinStation()
      this.getReceiveCouponList()
      this.setData({
        'adrDetails.detail_address':app.globalData.location.address
      })
      wx.hideLoading()
    }else{
      setTimeout(res=>{
        this.getRequest()
      },1000)
    }
    
  },
  onShow() {
    var that = this
    var hd = wx.getStorageSync('hd')
    wx.setTabBarBadge({
      index: 2,
      text: hd.toString()
		});
		this.setData({
			shopList:[]
		})
		wx.getSetting({
      success:res=>{
        if (!res.authSetting['scope.userLocation']) {
          console.log('没有开启定位')
          console.log(that.data.noInventory,1)
          that.setData({
            noInventory:true
          })
          app.isLocation()
          console.log(that.data.noInventory,2)
        }else{
          console.log('已开启定位')
          that.setData({
            noInventory:false
          })
          that.getRequest()
          app.isLocation()
        }
      }
    })
    
    return
    console.log(this.data.StorageDW,'this.data.StorageDW1')
    if(!this.data.StorageDW){
      console.log(this.data.StorageDW,'this.data.StorageDW2')
      this.setData({
        noInventory:true
      })
      // app.isLocation()
    }else{
      this.getBannerList()
      this.getZuijinStation()
      this.getReceiveCouponList()
    }
    // setTimeout(res=>{
    //   console.log(this.data.StorageDW,'this.data.StorageDW8')
    //   this.setData({
    //     noInventory:!this.data.StorageDW
    //   })
    // },1000)
    
  },
    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.isEnd){
      this.getShopList()
    }
  },
})
