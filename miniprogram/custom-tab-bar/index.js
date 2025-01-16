Component({
  properties: {
    selected: {
      type: Number,
      value: 0
    }
  },

  data: {
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/images/guanli.png",
        selectedIconPath: "/images/guanli-active.png"
      },
      {
        pagePath: "/pages/healthRecords/healthRecords",
        text: "健康记录",
        iconPath: "/images/health.png",
        selectedIconPath: "/images/health-active.png"
      }
    ]
  },

  methods: {
    switchTab(e) {
      const dataset = e.currentTarget.dataset;
      const path = dataset.path;
      const index = dataset.index;
      
      if (this.data.selected !== index) {
        wx.switchTab({
          url: path
        });
      }
    }
  }
}); 