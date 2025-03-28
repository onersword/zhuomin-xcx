
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
      wx.navigateTo({
        url: '/pages/healthTips/healthTips'
      })
    },

    goFiles() {
      wx.navigateTo({
        url: '/pages/healthFile/healthFile'
      })
    }

  },


}); 