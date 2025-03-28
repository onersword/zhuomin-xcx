import { formatPrice } from '../../utils/util'
Component({
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function (newVal) {
        if (newVal) {
          // 将时间戳转换为格式化的时间字符串
          const formattedPrice = formatPrice(newVal.price)

          this.setData({
            product: {
              ...newVal,
              price: formattedPrice
            }
          })
        }
      }
    },
  },
  data: {
    product: {}
  },

  methods: {
    onTap() {
      this.triggerEvent('cardtap', {
        id: this.data.item.id,
        type: this.data.type
      })
    }
  }
})
