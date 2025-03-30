const { formatPrice } = require('../../utils/util')
Page({
  data: {
    product: {},
    currentId: 1,
    type: 'normal',
    otherInfo: {
      title: '专业陪诊服务',
      description: '专业陪诊全程代办服务，全程协助开单、预约检查、陪同检查、领取报告、报告解读等（本服务不含医院诊疗费）不含医院收取检查费（预估2000-2500元左右）；',
      price: 499,
      duration: '次'
    },
    productInfo: {
      1: {
        title: '家庭医生套餐 基础版',
        price: '4,999',
        duration: '1年',
        services: [
          {
            title: '家庭医生健康管理基础套餐（含）',
            subServices: [
              {
                title: '健康咨询',
                frequency: '无限次',
                description: '包括常见疾病咨询、日常饮食咨询、就医分诊咨询、日常用药咨询、门诊报告解读等（无限次，仅限本人使用，子女可代替咨询）'
              },
              {
                title: '健康评估',
                frequency: '1次',
                description: '建立并维护连续、动态的电子健康档案，并根据健康档案制定管理计划及年度体检方案（仅限本人使用）'
              },
              {
                title: '私享会所服务',
                description: '免费使用经渡会所的如下服务：运动和健身场所；健康教育和讲座；康复和理疗讲座；微压氧舱体验'
              }
            ]
          },
          {
            title: '一站式就医服务（含）上海各大三甲医院',
            subServices: [
              {
                frequency: '2次',
                descriptions: [
                  '诊前一对一专人沟通，全面了解就诊需求；精准分诊，针对性推荐医生；并协助门诊预约安排；',
                  '全程导医陪诊、代办就诊手续，包括挂号、缴费、检查预约，排队配药等，并协助医生沟通病情，记录注意事项；',
                  '诊后定期随访跟踪，指导后续健康维护；'
                ]
              }
            ]
          }
        ]
      },
      2: {
        title: '家庭医生套餐 升级版',
        price: '8,999',
        duration: '1年',
        services: [
          {
            title: '家庭医生健康管理基础套餐（含）',
            subServices: [
              {
                title: '健康咨询',
                frequency: '无限次',
                description: '包括常见疾病咨询、日常饮食咨询、就医分诊咨询、日常用药咨询、门诊报告解读等（无限次，仅限本人使用，子女可代替咨询）'
              },
              {
                title: '健康评估',
                frequency: '1次',
                description: '建立并维护连续、动态的电子健康档案，并根据健康档案制定管理计划及年度体检方案（仅限本人使用）'
              },
              {
                title: '私享会所服务',
                description: '免费使用经渡会所的如下服务：运动和健身场所；健康教育和讲座；康复和理疗讲座；微压氧舱体验'
              }
            ]
          },
          {
            title: '一站式就医服务（含）上海各大三甲医院',
            frequency: '2次',
            subServices: [
              {
                descriptions: [
                  '诊前一对一专人沟通，全面了解就诊需求；精准分诊，针对性推荐医生；并协助门诊预约安排；',
                  '全程导医陪诊、代办就诊手续，包括挂号、缴费、检查预约，排队配药等，并协助医生沟通病情，记录注意事项；',
                  '诊后定期随访跟踪，指导后续健康维护；'
                ]
              }
            ]
          },
          {
            title: '肿瘤早筛+肠道菌群检测',
            frequency: '1次',
            subServices: [
              {
                description: '常见肿瘤遗传风险基因检测以及全面评估肠道微生态健康及相关疾病风险，并给与相应饮食指导。'
              }
            ]
          },
          {
            title: '专享疗愈服务',
            frequency: '1次',
            subServices: [
              {
                description: '定点山野疗愈度假机构-湖州廿杏度假村两天一晚定制化疗愈套餐1份，慈溪出发2小时可达，高达10000个/cm³以上负氧离子含量，专属健康管家服务，定制健康饮食和活动，全家可享。'
              }
            ]
          }
        ]
      },
      3: {
        title: '家庭医生套餐 企业版',
        price: '5,000',
        duration: '1年',
        services: [
          {
            title: '家庭医生健康管理基础套餐（含）',
            subServices: [
              {
                title: '健康咨询',
                frequency: '无限次',
                description: '包括常见疾病咨询、日常饮食咨询、就医分诊咨询、日常用药咨询、门诊报告解读等（无限次，仅限本人使用，子女可代替咨询）'
              }
            ]
          },
          {
            title: '一站式就医服务-上海各大三甲医院（三选一）',
            frequency: '1次',
            subServices: [
              {
                descriptions: [
                  '诊前一对一专人沟通，全面了解就诊需求；精准分诊，针对性推荐医生；并协助门诊预约安排；',
                  '全程导医陪诊，代办就诊手续，包括挂号、缴费、检查预约、排队配药等，并协助与医生沟通病情，记录注意事项；',
                  '诊后定期随访跟踪，指导后续健康维护；'
                ]
              }
            ]
          },
          {
            title: '体检服务（三选一）',
            frequency: '1次',
            subServices: [
              {
                description: '结合您的健康评估结果，为您制定年度体检方案，并提供慈溪民营医院基础体检服务1人次。体检服务包含相应体检套餐检查费用，并会为您进行体检报告的解读，指导后续健康维护。'
              }
            ]
          },
          {
            title: '专享疗愈服务（三选一）',
            frequency: '1次',
            subServices: [
              {
                description: '定点山野疗愈度假机构-湖州廿杏度假村两天一晚定制化疗愈套餐1份，慈溪出发2小时可达，高达10000个/cm³以上负氧离子含量，专属健康管家服务，定制健康饮食和活动，全家可享。'
              }
            ]
          }
        ]
      }
    }
  },

  onLoad(options) {
    console.log('Received options:', options); // 调试日志

    // 确保 type 参数正确设置
    const type = options.type === '0' ? 'other' : 'normal';
    let currentId = 1;

    // 只在 normal 类型时设置 currentId
    if (options.type) {
      currentId = Number(options.type);
    }

    this.setData({
      type,
      currentId,
      product: {
        id: options.id,
        name: options.name,
        description: options.description,
        price: options.price,
        formatPrice: formatPrice(options.price),
        unit: options.unit
      }
    });
  },

  // Contact button handler
  handleContact(options) {
    console.log('handleContact', this.data.product)
    wx.openCustomerServiceChat({
      corpId: 'ww62badfd0b511d2ad',
      extInfo: {
        url: 'https://work.weixin.qq.com/kfid/kfccbe26094fa4bca51',
      },
      sendMessageTitle: '购买套餐: ' + this.data.product.name,
      // sendMessagePath: '/pages/connectUs/connectUs',
      // showMessageCard: true,
      success: () => {
        console.log('打开客服聊天界面成功, success')
      },
      fail: () => {
        console.log('打开客服聊天界面失败')
      }
    })
  }
})
