Page({
  data: {
    recordDate: '2025-04-25',
    name: '',
    gender: '',
    nationality: '',
    birthDate: '',
    occupations: ['医生', '教师', '工程师', '公务员', '销售', '学生', '自由职业', '其他'],
    occupationIndex: -1,
    phone: '',
    address: '',
    idNumber: '',
    emergencyContact: '',
    emergencyPhone: '',
    maritalStatus: '',
    // 医疗保险类型
    insuranceTypes: ['医保'],
    insuranceOptions: [{
      value: '医保', checked: false
    }, {
      value: '自费', checked: false
    }, {
      value: '商保', checked: false
    }, {
      value: '其他', checked: false
    }],
    // 健康信息
    height: '',
    weight: '',
    waistline: '',
    bloodTypes: ['A型', 'B型', 'AB型', 'O型'],
    bloodTypeIndex: -1,
    rhTypes: ['Rh阳性', 'Rh阴性'],
    rhTypeIndex: -1,
    pulse: '',
    medication: '无',
    medicationDetail: '',
    // 过敏史
    allergyHistory: ['无'],
    allergyOptions: ['无', '头孢菌素', '海鲜', '坚果', '青霉素', '磺胺类药物', '花粉', '牛奶', '其他'],
    // 既往史
    medicalHistory: ['无'],
    medicalHistoryOptions: [
      '无', '糖尿病', '高血压', '高血脂', '高尿酸', '冠心病',
      '脑卒中', '恶性肿瘤', '慢性阻塞性肺疾病', '乙肝',
      '心律失常', '甲状腺疾病', '肾脏疾病', '胃肠道疾病',
      '精神疾病', '过敏史', '脂肪肝', '胆结石', '肝脾肿', '其他'
    ],
    // 住院史
    hospitalizationHistory: '',
    // 生活习惯
    smokingHistory: ['无'],
    smokingOptions: ['无', '长期吸烟', '长期饮酒', '戒烟戒酒史'],

    // 运动习惯
    exerciseHabits: ['基本不运动'],
    exerciseOptions: ['基本不运动', '每日步行', '长跑', '游泳', '登山', '其他'],

    // 饮食习惯
    dietaryHabits: ['三餐规律'],
    dietaryOptions: ['三餐规律', '清淡', '偏咸', '辛辣', '喜甜食', '口味偏重', '应酬多', '三餐不规律', '其他'],

    // 睡眠质量
    sleepQuality: ['一般'],
    sleepQualityOptions: ['好', '一般', '差', '失眠无', '失眠有', '鼾症无', '鼾症有'],

    // 睡眠时间
    sleepHours: '7',
  },

  onLoad: function (options) {
    // 页面加载时的初始化
  },

  // 日期选择器变化事件
  onDateChange: function (e) {
    this.setData({
      recordDate: e.detail.value
    });
  },

  // 姓名输入事件
  onNameInput: function (e) {
    this.setData({
      name: e.detail.value
    });
  },

  // 性别选择事件
  onGenderSelect: function (e) {
    const gender = e.currentTarget.dataset.gender;
    this.setData({
      gender: gender
    });
  },

  // 国籍/籍贯输入事件
  onNationalityInput: function (e) {
    this.setData({
      nationality: e.detail.value
    });
  },

  // 出生日期选择事件
  onBirthDateChange: function (e) {
    this.setData({
      birthDate: e.detail.value
    });
  },

  // 职业选择事件
  onOccupationChange: function (e) {
    this.setData({
      occupationIndex: e.detail.value
    });
  },

  // 手机号码输入事件
  onPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },

  // 地址输入事件
  onAddressInput: function (e) {
    this.setData({
      address: e.detail.value
    });
  },

  // 获取位置信息
  getLocation: function () {
    const that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              that.chooseLocation();
            },
            fail() {
              wx.showToast({
                title: '请授权位置信息',
                icon: 'none'
              });
            }
          });
        } else {
          that.chooseLocation();
        }
      }
    });
  },

  chooseLocation: function () {
    const that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          address: res.address
        });
      },
      fail: function () {
        wx.showToast({
          title: '获取位置失败',
          icon: 'none'
        });
      }
    });
  },

  // 身份证号/护照号输入事件
  onIdNumberInput: function (e) {
    this.setData({
      idNumber: e.detail.value
    });
  },

  // 紧急联系人输入事件
  onEmergencyContactInput: function (e) {
    this.setData({
      emergencyContact: e.detail.value
    });
  },

  // 紧急联系人电话输入事件
  onEmergencyPhoneInput: function (e) {
    this.setData({
      emergencyPhone: e.detail.value
    });
  },

  // 婚姻状况选择事件
  onMaritalStatusSelect: function (e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      maritalStatus: status
    });
  },

  // 保险类型选择事件
  onInsuranceTypeSelect: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const items = this.data.insuranceOptions
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }

    this.setData({
      insuranceOptions: items
    })
  },

  // 身高输入事件
  onHeightInput: function (e) {
    this.setData({
      height: e.detail.value
    });
  },

  // 体重输入事件
  onWeightInput: function (e) {
    this.setData({
      weight: e.detail.value
    });
  },

  // 腰围输入事件
  onWaistlineInput: function (e) {
    this.setData({
      waistline: e.detail.value
    });
  },

  // 血型选择事件
  onBloodTypeChange: function (e) {
    this.setData({
      bloodTypeIndex: e.detail.value
    });
  },

  // Rh血型选择事件
  onRhTypeChange: function (e) {
    this.setData({
      rhTypeIndex: e.detail.value
    });
  },

  // 脉搏输入事件
  onPulseInput: function (e) {
    this.setData({
      pulse: e.detail.value
    });
  },

  // 用药情况选择事件
  onMedicationSelect: function (e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      medication: status
    });

    if (status === '无') {
      this.setData({
        medicationDetail: ''
      });
    }
  },

  // 用药情况详情输入事件
  onMedicationDetailInput: function (e) {
    this.setData({
      medicationDetail: e.detail.value
    });
  },

  // 过敏史选择事件
  onAllergySelect: function (e) {
    const type = e.currentTarget.dataset.type;
    const types = [...this.data.allergyHistory];
    const index = types.indexOf(type);

    if (type === '无' && index === -1) {
      // 如果选择了"无"，则清空其他选项
      this.setData({
        allergyHistory: ['无']
      });
    } else if (type !== '无') {
      // 如果选择了其他选项，确保移除"无"
      const noIndex = types.indexOf('无');
      if (noIndex > -1) {
        types.splice(noIndex, 1);
      }

      // 切换当前选项
      if (index > -1) {
        types.splice(index, 1);
      } else {
        types.push(type);
      }

      this.setData({
        allergyHistory: types
      });
    }
  },

  // 既往史选择事件
  onMedicalHistorySelect: function (e) {
    const type = e.currentTarget.dataset.type;
    const types = [...this.data.medicalHistory];
    const index = types.indexOf(type);

    if (type === '无' && index === -1) {
      // 如果选择了"无"，则清空其他选项
      this.setData({
        medicalHistory: ['无']
      });
    } else if (type !== '无') {
      // 如果选择了其他选项，确保移除"无"
      const noIndex = types.indexOf('无');
      if (noIndex > -1) {
        types.splice(noIndex, 1);
      }

      // 切换当前选项
      if (index > -1) {
        types.splice(index, 1);
      } else {
        types.push(type);
      }

      this.setData({
        medicalHistory: types
      });
    }
  },

  // 住院史输入事件
  onHospitalizationHistoryInput: function (e) {
    this.setData({
      hospitalizationHistory: e.detail.value
    });
  },

  // 吸烟饮酒史选择事件
  onSmokingHistorySelect: function (e) {
    const type = e.currentTarget.dataset.type;
    const types = [...this.data.smokingHistory];
    const index = types.indexOf(type);

    if (type === '无' && index === -1) {
      // 如果选择了"无"，则清空其他选项
      this.setData({
        smokingHistory: ['无']
      });
    } else if (type !== '无') {
      // 如果选择了其他选项，确保移除"无"
      const noIndex = types.indexOf('无');
      if (noIndex > -1) {
        types.splice(noIndex, 1);
      }

      // 切换当前选项
      if (index > -1) {
        types.splice(index, 1);
      } else {
        types.push(type);
      }

      this.setData({
        smokingHistory: types
      });
    }
  },

  // 运动习惯选择事件
  onExerciseHabitSelect: function (e) {
    const type = e.currentTarget.dataset.type;
    const types = [...this.data.exerciseHabits];
    const index = types.indexOf(type);

    if (type === '基本不运动' && index === -1) {
      // 如果选择了"基本不运动"，则清空其他选项
      this.setData({
        exerciseHabits: ['基本不运动']
      });
    } else if (type !== '基本不运动') {
      // 如果选择了其他选项，确保移除"基本不运动"
      const noIndex = types.indexOf('基本不运动');
      if (noIndex > -1) {
        types.splice(noIndex, 1);
      }

      // 切换当前选项
      if (index > -1) {
        types.splice(index, 1);
      } else {
        types.push(type);
      }

      this.setData({
        exerciseHabits: types
      });
    }
  },

  // 饮食习惯选择事件
  onDietaryHabitSelect: function (e) {
    const type = e.currentTarget.dataset.type;
    const types = [...this.data.dietaryHabits];
    const index = types.indexOf(type);

    // 三餐规律和三餐不规律是互斥的
    if (type === '三餐规律' && index === -1) {
      // 移除三餐不规律
      const irregularIndex = types.indexOf('三餐不规律');
      if (irregularIndex > -1) {
        types.splice(irregularIndex, 1);
      }
    } else if (type === '三餐不规律' && index === -1) {
      // 移除三餐规律
      const regularIndex = types.indexOf('三餐规律');
      if (regularIndex > -1) {
        types.splice(regularIndex, 1);
      }
    }

    // 切换当前选项
    if (index > -1) {
      types.splice(index, 1);
    } else {
      types.push(type);
    }

    this.setData({
      dietaryHabits: types
    });
  },

  // 睡眠质量选择事件
  onSleepQualitySelect: function (e) {
    const type = e.currentTarget.dataset.type;
    const types = [...this.data.sleepQuality];
    const index = types.indexOf(type);

    // 处理互斥选项
    if (type === '好' || type === '一般' || type === '差') {
      // 这三个选项互斥，一次只能选一个
      types.length = 0; // 清空当前选项
      types.push(type);
    } else {
      // 处理失眠、鼾症的互斥情况
      if (type === '失眠无') {
        const oppositeIndex = types.indexOf('失眠有');
        if (oppositeIndex > -1) {
          types.splice(oppositeIndex, 1);
        }
      } else if (type === '失眠有') {
        const oppositeIndex = types.indexOf('失眠无');
        if (oppositeIndex > -1) {
          types.splice(oppositeIndex, 1);
        }
      } else if (type === '鼾症无') {
        const oppositeIndex = types.indexOf('鼾症有');
        if (oppositeIndex > -1) {
          types.splice(oppositeIndex, 1);
        }
      } else if (type === '鼾症有') {
        const oppositeIndex = types.indexOf('鼾症无');
        if (oppositeIndex > -1) {
          types.splice(oppositeIndex, 1);
        }
      }

      // 切换当前选项
      if (index > -1) {
        types.splice(index, 1);
      } else {
        types.push(type);
      }
    }

    this.setData({
      sleepQuality: types
    });
  },

  // 睡眠时间输入事件
  onSleepHoursInput: function (e) {
    this.setData({
      sleepHours: e.detail.value
    });
  },

  // 表单验证
  validateForm: function () {
    const {
      recordDate, name, gender, nationality, birthDate,
      occupationIndex, phone, idNumber,
      emergencyContact, emergencyPhone, maritalStatus,
      insuranceTypes,
      exerciseHabits, dietaryHabits, sleepQuality, sleepHours
    } = this.data;

    if (!recordDate) {
      this.showError('请选择建档日期');
      return false;
    }
    if (!name) {
      this.showError('请输入姓名');
      return false;
    }
    if (!gender) {
      this.showError('请选择性别');
      return false;
    }
    if (!nationality) {
      this.showError('请输入国籍/籍贯');
      return false;
    }
    if (!birthDate) {
      this.showError('请选择出生日期');
      return false;
    }
    if (occupationIndex < 0) {
      this.showError('请选择职业');
      return false;
    }
    if (!phone) {
      this.showError('请输入手机号码');
      return false;
    }
    if (phone.length !== 11) {
      this.showError('请输入有效的手机号码');
      return false;
    }
    if (!idNumber) {
      this.showError('请输入身份证号/护照号');
      return false;
    }
    if (!emergencyContact) {
      this.showError('请输入紧急联系人/关系');
      return false;
    }
    if (!emergencyPhone) {
      this.showError('请输入紧急联系人电话');
      return false;
    }
    if (emergencyPhone.length !== 11) {
      this.showError('请输入有效的紧急联系人电话');
      return false;
    }
    if (!maritalStatus) {
      this.showError('请选择婚姻状况');
      return false;
    }

    if (insuranceTypes.length === 0) {
      this.showError('请选择至少一种医疗保险类型');
      return false;
    }

    if (exerciseHabits.length === 0) {
      this.showError('请选择至少一项运动习惯');
      return false;
    }

    if (dietaryHabits.length === 0) {
      this.showError('请选择至少一项饮食习惯');
      return false;
    }

    if (sleepQuality.length === 0) {
      this.showError('请选择睡眠质量');
      return false;
    }

    if (!sleepHours) {
      this.showError('请输入睡眠时间');
      return false;
    }

    return true;
  },

  showError: function (message) {
    wx.showToast({
      title: message,
      icon: 'none'
    });
  },

  // 提交表单
  submitForm: function () {
    if (!this.validateForm()) {
      return;
    }

    const data = [];

    data.push({
      label: '医疗保险类型',
      value: this.data.insuranceTypes.filter(item => item.checked).join(',')
    })
    console.log('data', data)


    // 准备提交的数据
    const formData = {
      basicInfo: {
        recordDate: this.data.recordDate,
        name: this.data.name,
        gender: this.data.gender,
        nationality: this.data.nationality,
        birthDate: this.data.birthDate,
        occupation: this.data.occupationIndex >= 0 ? this.data.occupations[this.data.occupationIndex] : '',
        phone: this.data.phone,
        address: this.data.address,
        idNumber: this.data.idNumber,
        emergencyContact: this.data.emergencyContact,
        emergencyPhone: this.data.emergencyPhone,
        maritalStatus: this.data.maritalStatus,
        insuranceTypes: this.data.insuranceTypes
      },
      healthInfo: {
        height: this.data.height,
        weight: this.data.weight,
        waistline: this.data.waistline,
        bloodType: this.data.bloodTypeIndex >= 0 ? this.data.bloodTypes[this.data.bloodTypeIndex] : '',
        rhType: this.data.rhTypeIndex >= 0 ? this.data.rhTypes[this.data.rhTypeIndex] : '',
        pulse: this.data.pulse,
        medication: this.data.medication,
        medicationDetail: this.data.medicationDetail,
        allergyHistory: this.data.allergyHistory,
        medicalHistory: this.data.medicalHistory,
        hospitalizationHistory: this.data.hospitalizationHistory
      },
      lifeStyle: {
        smokingHistory: this.data.smokingHistory,
        exerciseHabits: this.data.exerciseHabits,
        dietaryHabits: this.data.dietaryHabits,
        sleepQuality: this.data.sleepQuality,
        sleepHours: this.data.sleepHours
      }
    };

    // 提交数据
    wx.showLoading({
      title: '保存中',
    });

    console.log('提交的表单数据:', formData);

    // 这里添加实际的数据提交逻辑
    // setTimeout(() => {
    //   wx.hideLoading();
    //   wx.showToast({
    //     title: '保存成功',
    //     icon: 'success',
    //     duration: 2000,
    //     success: () => {
    //       // 返回上一页或跳转到其他页面
    //       setTimeout(() => {
    //         wx.navigateBack();
    //       }, 2000);
    //     }
    //   });
    // }, 1500);
  }
})  