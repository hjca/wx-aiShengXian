// pages/shopCart/shopCart.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty:'1',         //1不为空，0为空
    shopList:''        //商品列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    console.log(app)
    app.globalData.shopListArr.length ?
      this.setData({
        isEmpty: 1,
        shopList:app.globalData.shopListArr
      }) :
      this.setData({
        isEmpty: 0
      });
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
  goBuyShop(){
    wx.switchTab({
      url:'/pages/tabBar/supermarket/supermarket'
    })
  },
  // 减
  numJian(evt){
    let item = evt.currentTarget.dataset.shopitem.shopNum;
    item == 1 ?
      wx.showToast({
        title: '最低为0',
        icon: "none"
      }) : item--;
  },
  // 加
  numAdd(){
    console.log("加")
  },
  // 进入地址列表
  showAddressList(){
    wx.navigateTo({
      url: '/address/addressList/addressList',
    })
  }
})