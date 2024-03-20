import { post, postFile } from './request.js'


// 微信登陆
export const userLogin = (params) => post('account/login',params);
 
// 微信支付Pay/WXPay(int UserId, int Type, String OpenId, String OrderNumber)
export const WXPay = (params) => post('pay/wx_pay', params);

//获取用户信息/user/get
export const getUserInfo = (params) => post('user/get', params);

//轮播图
export const bannerList = (params) => post('banner/list',params);
///transfer_station/get_closest获取最近的中转站
export const zuijinStation = (params) => post('transfer_station/get_closest',params);
////transfer_station/list_nearby获取最近的中转站
export const fujinStation = (params) => post('transfer_station/list_nearby',params);
//首页商品列表
export const shopList = (params) => post('standard_product_unit/recommend',params);

///category/list获取分类列表
export const categoryList = (params) => post('category/list',params);

//加入购物车
export const addShopCart = (params) => post('shop_car/add',params);
//修改购物车
export const updateShopCart = (params) => post('shop_car/update',params);
//删除购物车
export const deleteShopCart = (params) => post('shop_car/delete',params);
// 获取商品详情  默认取第[0]个商品standard_product_unit/get
export const shopDetails = (params) => post('standard_product_unit/get',params);

///shop_car/list 获取购物车列表
export const shopCartList = (params) => post('shop_car/list',params);

///coupon/list获取优惠券列表
export const queryCouponList = (params) => post('user_coupon/list',params);

///user_coupon/add 领取优惠券
export const addCoupon = (params) => post('user_coupon/add',params);

///coupon/list  可获取的优惠券列表
export const receiveCouponList = (params) => post('coupon/list',params);

///user_delivery_address/add 添加收货地址
export const addAddress = (params) => post('user_delivery_address/add',params);
//获取地址列表/user_delivery_address/list
export const addressList = (params) => post('user_delivery_address/list',params);
//删除收货地址
export const deleteAddress = (params) => post('user_delivery_address/delete',params);
//修改收获地址/user_delivery_address/update
export const updateAddress = (params) => post('user_delivery_address/update',params);

///order/add新增订单
export const addOrder = (params) => post('order/add',params);
export const cancelOrder = (params) => post('order/cancel',params);
//确认订单
export const confirmReceipt = (params) => post('order/confirm_receipt',params);
//订单列表
export const orderList = (params) => post('order/list',params);