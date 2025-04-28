import { formatPrice } from '../../utils/util'
Component({
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function (newVal) {
        console.log('newVal', newVal)
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
      console.log('data', this.data.product.id, this.data.product.type)
      this.triggerEvent('cardtap', {
        id: this.data.product.id,
        type: this.data.product.type,
        name: this.data.product.name,
        description: this.data.product.description
      })
    }
  }
})
