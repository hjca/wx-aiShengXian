import ajaxData from '../../../utils/ajaxResquer/ajaxData.js';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperParams:{
      "indicatorDots":true,     //是否显示面板指示点
      "autoplaySwiper":true,      //是否自动切换
      "intervalTime":2500,       //自动切换时间间隔
      "circular":true,             //是否衔接滑动
      "indicatorColor":"rgb(255,255,255)"
    },
    swiperData:'',           //轮播图数据
    dayDataClassify:"",           //天天便利中的数据
    milkbreadLists:""         //牛奶面包数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 获取用户信息
    app.getUserInfo((userInfo) => {
    });

    // 请求轮播图数据
    ajaxData('/index/indexSwiper',function(result){
      that.setData({
        swiperData: result.data.list
      })
    },function(){},null,null,null,false);

    // 分类数据
    ajaxData('/index/storeClassify', function (result) {
      that.setData({
        dayDataClassify: result.data
      })
    }, function () { }, null, null, null, false);

    // 获取牛奶面包数据
    // 分类数据
    ajaxData('/milkbread', function (result) {
      that.setData({
        milkbreadLists:result.data
      })
    }, function () { }, null, null, null, false);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },
  addShopCart(evt){
    app.addShopCart(evt.currentTarget.dataset.item);
  }
})