Component({
  data: {
    selected: 0,

    list: [
      {
        pagePath: "/pages/index/index",
        text: "健康管理",
        iconPath: "/images/guanli.svg",
        selectedIconPath: "/images/guanli_active.svg"
      },
      {
        pagePath: "/pages/healthRecords/healthRecords",
        text: "健康档案",
        iconPath: "/images/dangan.svg",
        selectedIconPath: "/images/dangan_active.svg"
      },
      {
        pagePath: "/pages/product/product",
        text: "卓敏产品",
        iconPath: "/images/chanpin.svg",
        selectedIconPath: "/images/chanpin_active.svg"
      },
      {
        pagePath: "/pages/connectUs/connectUs",
        text: "联络客服",
        iconPath: "/images/kefu.svg",
        selectedIconPath: "/images/kefu_active.svg"
      }
    ]
  },

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url,
        success: function(res){
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            console.log('page', page);
            // page.onLoad();
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
      this.setData({
        selected: data.index
      })
    }
  }
}) 