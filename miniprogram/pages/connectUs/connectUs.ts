Page({
  data: {
    
  },

  onLoad() {
    
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        }) 
    }
  },

  onReady() {
    
  },

  onHide() {
    
  },

  onUnload() {
    
  }
}) 