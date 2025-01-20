import { formatTime } from "../../utils/util";

Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer: function(newArray) {

        this.setData({
          data:newArray.map(item => {
            item.time = formatTime(new Date(item.time))
            return item;
          })
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
    }
  },

  // 将方法暴露给 wxml 使用
  wxs: {
    formatTime
  }
}); 