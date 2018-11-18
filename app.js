let QQMapWX = require('utils/libs/qqmap-wx-jssdk.js');
let wxMap = new QQMapWX({
  key: 'REMBZ-VOIHX-5NQ4V-7WY4M-SL36J-IBFYR'
});

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    let that = this;
    //获取当前的地理位置
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation']) {
          that.reverseGeocoder();
        } else if (!res['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              that.reverseGeocoder();
            },
            fail() {
              console.log("失败")
            }, complete() { }
          })
        }
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    // this.reverseGeocoder();
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  },
  getUserInfo: function (cb) {
    let that = this;
    if (this.globalData.userInfo) {
      typeof cb == 'function' && cb(this.globalData.userInfo)
    } else {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                that.globalData.userInfo = res.userInfo;

                typeof cb == 'function' && cb(that.globalData.userInfo);

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
    }
  },
  // 经纬度逆解析
  reverseGeocoder() { 
    const that = this; 
    wx.showNavigationBarLoading();
    wx.getLocation({ 
      type: 'gcj02', 
      success: function (res) { 
        var latitude = res.latitude;
        var longitude = res.longitude;
        wxMap.reverseGeocoder({ 
          location: { 
            latitude: latitude, 
            longitude: longitude 
          }, 
          success: function (res) { 
            wx.hideNavigationBarLoading();
            res.result.address ?
              wx.setNavigationBarTitle({
                title: res.result.address
              }) : "定位失败";
          }
        }); 
      }
    }) 
  },
  globalData: {
    userInfo: null,   //用户信息
    shopListArr:[],
    shopCartNum:0     //购物车数量
  },

  // 数据整理
  resultDataHandle(item){
    // 循环数据
    for (let i of this.globalData.shopListArr) {

      if (item.shopId == i.shopId) {
        i.shopNum += 1;
        return;
      }
    }
  },

  // 添加购物车
  addShopCart(item){
    item["shopNum"] = 1;

    let resultArr = this.globalData.shopListArr.filter( (idx) => {
      return item.shopId == idx.shopId;
    } );

    resultArr.length ? 
      this.resultDataHandle(item) :
        this.globalData.shopListArr.push(item);

    this.globalData.shopListArr.length ? 
      wx.setTabBarBadge({
        index: 2,
        text: '' + (++this.globalData.shopCartNum),
      }) : wx.removeTabBarBadge({
        index: 2,
      })
  }
})
