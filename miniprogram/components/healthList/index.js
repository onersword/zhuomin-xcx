
Component({
  properties: {
    obj: {
      type: Object,
      value: {},
      observer: function (newObj) {

        this.setData({
          data: newObj
        })
      }
    }
  },

  data: {
    data: []
  },

  methods: {
    onItemTap(e) {
      console.log('-- dataset', e.currentTarget.dataset);

      const { index } = e.currentTarget.dataset;
    },
    goNotes() {
      // 跳转到 healthRecord 页面并传递健康小结 tab id (index: 2)
      getApp().globalData = getApp().globalData || {};
      getApp().globalData.healthRecordParams = {
        tabId: 2
      };
      
      wx.switchTab({
        url: '/pages/healthRecords/healthRecords'
      });
    },

    goFiles() {
      // 跳转到 healthRecord 页面并传递检查报告 tab id (index: 1)
      getApp().globalData = getApp().globalData || {};
      getApp().globalData.healthRecordParams = {
        tabId: 1
      };
      
      wx.switchTab({
        url: '/pages/healthRecords/healthRecords'
      });
    }

  },


}); 