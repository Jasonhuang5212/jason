// 全局配置文件
var debug = false,
  testApiUrl = 'https://devapp1.qhwrong.com/Index/', // 测试
  prodApiUrl = 'https://xydky.qhwrong.com/Index/', //生产
  baseApiUrl = debug ? testApiUrl : prodApiUrl;
var testPublicParam = {//测试
    app_id                          : '12',//app id
    app_version_id                  : '19',//app 版本 id
    app_name_en                     : 'jiedaihua20180926',//app 名称
    install_source_channel_id       : '2',//推广渠道id 1安卓 2苹果 3H5
    app_platform                    : '2',//注册来源平台 1安卓 2苹果 3H5
    platform                        : '2',//注册来源平台 1安卓 2苹果 3H5
  },
  prodPublicParam = {//生产
    app_id                          : '7',//app id
    app_version_id                  : '73',//app 版本 id
    app_name_en                     : 'jiedaihua20180926',//app 名称
    install_source_channel_id       : '2',//推广渠道id 1安卓 2苹果 3H5
    app_platform                    : '2',//注册来源平台 1安卓 2苹果 3H5
    platform                        : '2',//注册来源平台 1安卓 2苹果 3H5
  },
  basePublicParam = debug ? testPublicParam : prodPublicParam;



var config = {
  debug: debug,
  baseURL : baseApiUrl,
  baseParam: basePublicParam,//公共参数
  url: {
    //验证码
    sendSms: "Public/sendSms",
    //密码登录
    passwordlogin: "User/login",
    //设置密码
    setPassword: "User/setPassword",
    //用户注册、手机验证码登录
    phonelogin: "User/userReg",
    //首页数据
    getProductIndexList: "Product/getProductIndexList",
    //getProductIndexList: "Product/getProductIndexListNew",
    //获取热门推荐列表
    getProductRecommend: "Product/getProductRecommend",
    //获取收藏列表
    getUserCollectProductRecord: "Product/getUserCollectProductRecord",
    //产品详情
    getProductDetail: "Product/getProductDetail",
    //用户操作日志
    userOperationRecord: "User/user_operation_record",
    //贷款类型列表
    getProductLoanType: "Product/getProductLoanType",
    //列表页接口 【+筛选】
    getProductTotalListNew: "Product/getProductTotalListNew",
    //用户须知
    regNotice: "Index/regNotice",
    //隐私条例
    privacy: "Index/privacy",
    //添加收藏
    setCollect: "Product/setCollect",
    //取消收藏
    cancelCollect: "Product/cancelCollect",
    //用户申请记录
    getUserApplyRecord: "Product/getUserApplyRecord",




  },
};
export {
  config
}
