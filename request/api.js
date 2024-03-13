import { post, postFile } from './request.js'


// 微信登陆
export const userLogin = (params) => post('account/login',params);
 
// 微信支付Pay/WXPay(int UserId, int Type, String OpenId, String OrderNumber)
export const WXPay = (params) => post('Pay/WXPay', params);



//轮播图
export const bannerList = (params) => post('banner/list',params);

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