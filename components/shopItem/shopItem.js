// components/shopItem/shopItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shopInfo:{
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _addShopCart(){
      this.triggerEvent("addShopCart",this.data.shopInfo);
    }
  }
})
