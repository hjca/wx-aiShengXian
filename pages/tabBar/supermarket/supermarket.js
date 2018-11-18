import ajaxData from '../../../utils/ajaxResquer/ajaxData.js';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:'',       //菜单数据列表
    flag:0 ,             //菜单下标
    shopList:''       //商品列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 获取闪送超市菜单数据
    ajaxData('/flashSupermarket/menuList', function (result) {
      that.setData({
        menuList:result.data.menuList
      })
      that.getMenuData(result.data.menuList[0].menuId);
    }, function () { });
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
  // 点击菜单
  chooseMenu(event){
    this.setData({
      flag:event.currentTarget.dataset.index
    })
  },
  // 请求响应菜单数据
  getMenuData(menuId){
    let that = this;
    ajaxData('/menu/shopList', function (result) {
      that.setData({
        shopList:result.data.list
      })
    }, function () { }, null, { menuId: menuId});
  },
  // 添加购物
  addShopCart(evt){
    app.addShopCart(evt.currentTarget.dataset.item);
  }
})