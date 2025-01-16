interface NavigationBarProperties {
  title: string;
  back: boolean;
  color: string;
  background: string;
}

Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    back: {
      type: Boolean,
      value: false
    },
    color: {
      type: String,
      value: '#000000'
    },
    background: {
      type: String,
      value: '#ffffff'
    }
  },

  data: {
    statusBarHeight: 0,
    ios: false
  },

  lifetimes: {
    attached() {
      const systemInfo = wx.getSystemInfoSync();
      const ios = !!(systemInfo.system.toLowerCase().search('ios') + 1);
      
      this.setData({
        statusBarHeight: systemInfo.statusBarHeight,
        ios
      });
    }
  },

  methods: {
    back() {
      wx.navigateBack({
        delta: 1
      });
    }
  }
});
