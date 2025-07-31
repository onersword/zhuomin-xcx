import { formatPrice } from '../../utils/util'
Component({
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function (newVal) {
        console.log('newVal', newVal)
        if (newVal) {

          this.setData({
            product: {
              ...newVal,
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
        id: this.data.product.id,
        name: this.data.product.name,
        description: this.data.product.description
      })
    }
  }
})
