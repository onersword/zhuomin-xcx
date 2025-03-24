Page({
  data: {
    products: [
      {
        id: 1,
        name: "家庭医生套餐 基础版",
        description: "家庭微压氧舱体验不限次数，缓解疲劳，改善睡眠，提升脏器功能。",
        price: 4999,
        duration: "1年",
        type: 1,
      },
      {
        id: 2,
        name: "家庭医生套餐 升级版",
        description: "家庭微压氧舱体验不限次数，缓解疲劳，改善睡眠，提升脏器功能。",
        price: 8999,
        duration: "1年",
        type: 2
      },
      {
        id: 3,
        name: "家庭医生套餐 企业版",
        description: "家庭微压氧舱体验不限次数，缓解疲劳，改善睡眠，提升脏器功能。",
        price: 5000,
        duration: "1年",
        type: 3
      }
    ],
    otherProducts: [
      {
        id: 101,
        name: "基因检测",
        description: "超早期肿瘤筛查（甲基化检测），全场景可量化表观及表观异常/超早期防癌，包括肺癌等...",
        price: 2800,
        duration: "1次",
        type: "medical"
      },
      {
        id: 102,
        name: "肠胃镜检查",
        description: "专业肠胃全程C管理，全程陪诊开单，预约检查、陪同检查、预约跟诊等（年度券不含...）",
        price: 5000,
        duration: "1次",
        type: "medical"
      },
      {
        id: 103,
        name: "肝脏专项检查",
        description: "包括肝功能检查、基础评估肝纤维化、（包含检查费及全程陪同、预约）",
        price: 5000,
        duration: "1次",
        type: "medical"
      },
      {
        id: 104,
        name: "心脑血管病专项检查",
        description: "到院CT&MR预约到陪同MRA检查（包含检查费及全程陪同、预约）",
        price: 5000,
        duration: "1次",
        type: "medical"
      },
      {
        id: 105,
        name: "营养管理",
        description: "营养师根据您的需求定制个性化营养解决方案，并通过日常饮食计划等方式，帮助客户调节正确的饮食",
        price: 6000,
        duration: "年度",
        type: "service"
      },
      {
        id: 106,
        name: "肠道菌群检测",
        description: "全面分析肠道菌群生态状况，并给出相应饮食建议",
        price: 1500,
        duration: "1次",
        type: "medical"
      },
      {
        id: 107,
        name: "肠道菌群诊疗",
        description: "个性化干预方案",
        price: 29800,
        duration: "1疗程",
        type: "medical"
      },
      {
        id: 108,
        name: "氧疗年卡",
        description: "家庭微压氧舱体验不限次数，缓解疲劳，改善睡眠，提升脏器功能",
        price: 5000,
        duration: "1年",
        type: "service"
      },
      {
        id: 109,
        name: "住院及手术",
        description: "已开入院单的助您住院住院，入院手续办理",
        price: 20000,
        duration: "1次",
        type: "medical"
      },
      {
        id: 110,
        name: "护理水",
        description: "全年护理水供应，改善干眼症、飞蚊症、见风流泪、黄斑病变等症状，缓解白内障形成",
        price: 1584,
        duration: "16瓶",
        type: "product"
      },
      {
        id: 111,
        name: "睡眠监测",
        description: "精密睡眠呼吸监察仪，评估夜间呼吸干扰指数等出现频率，并建立逐一呼吸方式",
        price: 99,
        duration: "1次",
        type: "medical"
      },
      {
        id: 112,
        name: "心电监测",
        description: "心电数据监测，可早期发现心律不齐、心律失常、心脏缺血等问题",
        price: 299,
        duration: "1次",
        type: "medical"
      },
      {
        id: 113,
        name: "定制鞋垫",
        description: "矫正足部形态，预防运动损伤，改善步态不和谐姿势，适用休闲人群、运动人群、职业人群、老年...",
        price: 499,
        duration: "1双",
        type: "product"
      },
      {
        id: 114,
        name: "3D打印鞋垫",
        description: "根据个人足部量化测定定制精确鞋垫",
        price: 699,
        duration: "1双",
        type: "product"
      }
    ]
  },

  // 添加价格格式化方法
  formatPrice: function(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },

  onLoad() {
    // 格式化 products 数组中的价格
    const formattedProducts = this.data.products.map(item => ({
      ...item,
      formattedPrice: this.formatPrice(item.price)
    }))

    // 格式化 otherProducts 数组中的价格
    const formattedOtherProducts = this.data.otherProducts.map(item => ({
      ...item,
      formattedPrice: this.formatPrice(item.price)
    }))

    this.setData({
      products: formattedProducts,
      otherProducts: formattedOtherProducts
    })

    // 后续接入 API 时使用此代码
    // wx.cloud.callContainer({
    //   path: '/api/products',
    //   header: {
    //     'X-WX-SERVICE': 'mr-lao',
    //     'content-type': 'application/json',
    //     'Authorization': 'Bearer ' + wx.getStorageSync('token')
    //   },
    //   method: 'GET',
    //   success: (res) => {
    //     this.setData({
    //       products: res.data.products
    //     })
    //   }
    // })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  }
}) 