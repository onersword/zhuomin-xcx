Component({
  properties: {
    selected: {
      type: Number,
      value: 0
    }
  },

  data: {
    selected: 0,

    list: [
      {
        pagePath: "/pages/index/index",
        text: "健康管理",
        iconPath: "/images/guanli.png",
        selectedIconPath: "/images/guanli_active.png"
      },
      {
        pagePath: "/pages/healthRecords/healthRecords",
        text: "健康档案",
        iconPath: "/images/dangan.png",
        selectedIconPath: "/images/dangan_active.png"
      },
      {
        pagePath: "/pages/product/product",
        text: "卓敏产品",
        iconPath: "/images/chanping.png",
        selectedIconPath: "/images/chanping_active.png"
      },
      {
        pagePath: "/pages/connectUs/connectUs",
        text: "联络客服",
        iconPath: "/images/kefu.png",
        selectedIconPath: "/images/kefu_active.png"
      }
    ]
  },

  methods: {
    switchTab(e: WechatMiniprogram.TouchEvent) {

      // if (this.data.selected !== dataset.index) {
      //   const url = dataset.path.startsWith('/') ? dataset.path : '/' + dataset.path;
      //   console.log('switchTab to:', url);
      //   wx.switchTab({
      //     url,
      //     fail: (err) => {
      //       console.error('switchTab failed:', err);
      //     }
      //   });
      // }
      const data = e.currentTarget.dataset
      console.log('data', data);
      
      const url = data.path
      wx.switchTab({url})
    }
  }
}); 