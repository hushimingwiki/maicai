import { post, postFile } from './request.js'

///pay/recharge_notifytest  测似接口
// export const notifytest = (params) => post('pay/recharge_notifytest',params);
///pay/pay_notifytest
export const payNotifytest = (params) => post('pay/pay_notifytest',params);
// 微信登陆
export const userLogin = (params) => post('account/login',params);
 
// 获取二维码 /invite/qr_code_xcx
export const inviteQrCode = (params) => post('invite/qr_code_xcx',params);

// 微信支付Pay/WXPay(int UserId, int Type, String OpenId, String OrderNumber)
export const WXPay = (params) => post('pay/wx_pay', params);

//获取用户钱包user_wallet/get
export const wallet = (params) => post('user_wallet/get',params);

//获取钱包明细user_wallet_record/list
export const userWalletRecord = (params) => post('user_wallet_record/list',params);
//获取用户信息/user/get
export const getUserInfo = (params) => post('user/get', params);

//修改用户信息 /user/update
export const updateUserInfo = (params) => post('user/update', params);
//y余额充值pay/wx_recharge
export const recharge = (params) => post('pay/wx_recharge',params);

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
//取消订单/order/cancel
export const orderCancel = (params) => post('order/cancel',params);
////order/confirm_receipt确认收货

export const orderConfirm = (params) => post('order/confirm_receipt',params);
///order/get_freight_price获取运费

export const orderGetFreightPrice = (params) => post('order/get_freight_price',params);

///分类获取商品standard_product_unit/category_search
export const categorySearch = (params) => post('standard_product_unit/category_search',params);

///standard_product_unit/search 搜索
export const productSearch = (params) => post('standard_product_unit/search',params);

//获取购物车数量 /shop_car/get_count
export const shopCarNum = (params) => post('shop_car/get_count',params);

//评论 /standard_product_unit_comment/add
export const GoodsComment = (params) => post('standard_product_unit_comment/add',params);
//评论列表 /standard_product_unit_comment/list
export const CommentList = (params) => post('standard_product_unit_comment/list',params);

//二级分销邀请列表 /invite/list
export const inviteList = (params) => post('invite/list',params);

//获取时间列表 /order/get_appointment_delivery_time
export const appointment = (params) => post('order/get_appointment_delivery_time',params);

//添加收藏  /like/add
export const likeAdd = (params) => post('like/add',params);

//删除收藏 /like/delete
export const likeDelete = (params) => post('like/delete',params);

//获取收藏列表
export const likeList = (params) => post('like/list',params);