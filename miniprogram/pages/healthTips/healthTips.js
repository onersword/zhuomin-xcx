const {request}= require('../../utils/request')

Page({
  data: {
    title: '健康小结',
    statusBarHeight: 0,
    tips: [
      {
        createTime: '2025.1.16 14:25',
        content: '包括常见疾病咨询、日常饮食咨询、就医分诊咨询、日常用药咨询、门诊报告解读等（无限次，仅限本人使用，子女可代替咨询）'
      },
      {
        createTime: '2025.1.16 14:25',
        content: '包括常见疾病咨询、日常饮食咨询、就医分诊咨询、日常用药咨询、门诊报告解读等（无限次，仅限本人使用，子女可代替咨询）'
      },
      {
        createTime: '2025.1.16 14:25',
        content: '包括常见疾病咨询、日常饮食咨询、就医分诊咨询、日常用药咨询、门诊报告解读等（无限次，仅限本人使用，子女可代替咨询）'
      },
      {
        createTime: '2025.1.16 14:25',
        content: '包括常见疾病咨询、日常饮食咨询、就医分诊咨询、日常用药咨询、门诊报告解读等（无限次，仅限本人使用，子女可代替咨询）'
      },
      {
        createTime: '2025.1.16 14:25',
        content: '包括常见疾病咨询、日常饮食咨询、就医分诊咨询、日常用药咨询、门诊报告解读等（无限次，仅限本人使用，子女可代替咨询）'
      },
      {
        createTime: '2025.1.16 14:25',
        content: '包括常见疾病咨询、日常饮食咨询、就医分诊咨询、日常用药咨询、门诊报告解读等（无限次，仅限本人使用，子女可代替咨询）'
      },
      {
        createTime: '2025.1.16 14:25',
        content: '包括常见疾病咨询、日常饮食咨询、就医分诊咨询、日常用药咨询、门诊报告解读等（无限次，仅限本人使用，子女可代替咨询）'
      },
      {
        createTime: '2025.1.16 14:25',
        content: '包括常见疾病咨询、日常饮食咨询、就医分诊咨询、日常用药咨询、门诊报告解读等（无限次，仅限本人使用，子女可代替咨询）'
      },
      {
        createTime: '2025.1.16 14:25',
        content: '包括常见疾病咨询、日常饮食咨询、就医分诊咨询、日常用药咨询、门诊报告解读等（无限次，仅限本人使用，子女可代替咨询）'
      },
      {
        createTime: '2025.1.16 14:25',
        content: '包括常见疾病咨询、日常饮食咨询、就医分诊咨询、日常用药咨询、门诊报告解读等（无限次，仅限本人使用，子女可代替咨询）'
      },
      {
        createTime: '2025.1.16 14:25',
        content: '包括常见疾病咨询、日常饮食咨询、就医分诊咨询、日常用药咨询、门诊报告解读等（无限次，仅限本人使用，子女可代替咨询）'
      }








    ]
  },
  onLoad() {
    console.log('healthTips onLoad')
    this.setData({
      title: this.options.title || '健康小结'
    })
    
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight
    })

    // 如果需要从服务器获取数据，可以取消注释下面这行
    // this.getTips()
  },

  async getTips () {
    const data = await request({
      path: '/api/notes',
      method: 'GET',
    })
    console.log('tips', data)
    this.setData({
      tips: data.data
    })

  },
  handleBack() {
    wx.navigateBack({
      delta: 1
    })
  }
})  