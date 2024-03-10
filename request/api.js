import { post, postFile } from './request.js'
// 图形验证码
export const getImgcode = (params) => post('Sys/UICode', params)

// 微信登陆
export const userLogin = (params) => post('Account/WXLogin',params);
 
// 微信支付Pay/WXPay(int UserId, int Type, String OpenId, String OrderNumber)
export const WXPay = (params) => post('Pay/WXPay', params);

// 普通登入
export const ptLogin = (params) => post('Account/Login',params);

//轮播图
export const bannerList = (params) => post('banner/list',params);

//首页商品列表
export const shopList = (params) => post('standard_product_unit/recommend',params);

///category/list获取分类列表
export const categoryList = (params) => post('category/list',params);

