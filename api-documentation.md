# API 文档

_云开发容器地址: BASE_URL_
`https://mr-lao-146870-5-1345362468.sh.run.tcloudbase.com/`

_小程序示例_

```
## 示例3
wx.cloud.callContainer({
  "config": {
    "env": "prod-8gvh8k8d1aeb0797"
  },
  "path": "/api/count",
  "header": {
    "X-WX-SERVICE": "mr-lao",
    "content-type": "application/json"
  },
  "method": "GET",
  "data": ""
})

# 登录
wx.login({
  success: res => {
    // 发送 res.code 到后台换取 openId, sessionKey, unionId
    // console.log(res)
    wx.request({
        url: 'https://mr-lao-146870-5-1345362468.sh.run.tcloudbase.com/api/login', // 你的后端 API
        method: 'POST',
        data: { code: res.code },
        success(response) {
          if (response.data.token) {
            wx.setStorageSync('token', response.data.token); // 存储 Token
            console.log("登录成功", response.data.token);
          } else {
            console.error("登录失败", response.data);
          }
        }
      });
  }
})

# 获取档案
wx.request({
  url: 'https://mr-lao-146870-5-1345362468.sh.run.tcloudbase.com/api/records',
  method: 'GET',
  success: res => {
    console.log(res)
  }
})

=> 
# status = 0, 未绑定手机号
{
    "userInfo": {
        "id": "a0dec35c-da0a-4ae4-b98c-86e2eda458f4",
        "wechatId": "oe_Lx6_ax-tfSk5n84igwadmM-lg",
        "name": "oe_Lx6_ax-tfSk5n84igwadmM-lg",
        "phoneNumber": null,
        "status": 0,
        "createdAt": "2025-03-23T14:36:36.000Z",
        "updatedAt": "2025-03-23T16:03:30.000Z"
    },
    "records": null
}
# status = 1, 已绑定手机号
{
    "userInfo": {
        "id": "a0dec35c-da0a-4ae4-b98c-86e2eda458f4",
        "wechatId": "oe_Lx6_ax-tfSk5n84igwadmM-lg",
        "name": "oe_Lx6_ax-tfSk5n84igwadmM-lg",
        "phoneNumber": "13.....4",
        "status": 1,
        "createdAt": "2025-03-23T14:36:36.000Z",
        "updatedAt": "2025-03-23T16:03:30.000Z"
    },
    "records": null
}

# 有档案信息
{
    "userInfo": {
        "id": "a0dec35c-da0a-4ae4-b98c-86e2eda458f4",
        "wechatId": "oe_Lx6_ax-tfSk5n84igwadmM-lg",
        "name": "oe_Lx6_ax-tfSk5n84igwadmM-lg",
        "phoneNumber": "13.....4",
        "status": 1,
        "createdAt": "2025-03-23T14:36:36.000Z",
        "updatedAt": "2025-03-23T16:03:30.000Z"
    },
    "records": {
        "医疗信息": {
            "关系": "配偶",
            "电话": "----",
            "职业": "退休",
            "出生日期": "1976-11-06",
            "医疗保险": "医保",
            "家庭地址": "----",
            "紧急联系人": "Sasa",
            "紧急联系人电话": "----",
            "身份证号/护照号": "3623***001X"
        },
        "档案信息": {
            "国籍": "中国",
            "姓名": "饶宇",
            "性别": "男",
            "电话": "----",
            "出生日期": "1976-11-06",
            "家庭地址": "----",
            "建档日期": "2025-01-02",
            "档案编号": "ZMCX2025001",
            "身份证号/护照号": "3623***001X"
        }
    }
}

# 绑定手机号
<button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">获取手机号</button>
getPhoneNumber (e) {
  console.log(e.detail.code)  // 动态令牌
  console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
  console.log(e.detail.errno)  // 错误码（失败时返回）
},


curl --location 'https://mr-lao-146870-5-1345362468.sh.run.tcloudbase.com/api/register' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVuaWQiOiJvZV9MeDZfYXgtdGZTazVuODRpZ3dhZG1NLWxnIiwiaWF0IjoxNzQyMzA1NDIxLCJleHAiOjE3NDI5MTAyMjF9.URfh54ikPrEz5DGofUQXAtmpga9Pi_xyHqm1tMsTujU' \
--data '{
    "code": "88e095fb4b3498ff1dbad064aa4f94dd2ddf182e55c313108ccd21fe8e45f947"
}'

# 已经上传档案，等待审核

curl --location 'https://mr-lao-146870-5-1345362468.sh.run.tcloudbase.com/api/users/a0dec35c-da0a-4ae4-b98c-86e2eda458f4/review' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVuaWQiOiJvZV9MeDZfYXgtdGZTazVuODRpZ3dhZG1NLWxnIiwiaWF0IjoxNzQyMzA1NDIxLCJleHAiOjE3NDI5MTAyMjF9.URfh54ikPrEz5DGofUQXAtmpga9Pi_xyHqm1tMsTujU'  
=>
{
  "code": 0,
  "message": "等待审核"
}

# 获取商品列表
curl --location 'https://mr-lao-146870-5-1345362468.sh.run.tcloudbase.com/api/products' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVuaWQiOiJvZV9MeDZfYXgtdGZTazVuODRpZ3dhZG1NLWxnIiwiaWF0IjoxNzQyMzA1NDIxLCJleHAiOjE3NDI5MTAyMjF9.URfh54ikPrEz5DGofUQXAtmpga9Pi_xyHqm1tMsTujU'

# 获取用户的商品列表
curl --location 'https://mr-lao-146870-5-1345362468.sh.run.tcloudbase.com/api/users/a0dec35c-da0a-4ae4-b98c-86e2eda458f4/products' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVuaWQiOiJvZV9MeDZfYXgtdGZTazVuODRpZ3dhZG1NLWxnIiwiaWF0IjoxNzQyMzA1NDIxLCJleHAiOjE3NDI5MTAyMjF9.URfh54ikPrEz5DGofUQXAtmpga9Pi_xyHqm1tMsTujU'

# 获取提醒事项
curl --location 'https://mr-lao-146870-5-1345362468.sh.run.tcloudbase.com/api/reminders' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVuaWQiOiJvZV9MeDZfYXgtdGZTazVuODRpZ3dhZG1NLWxnIiwiaWF0IjoxNzQyMzA1NDIxLCJleHAiOjE3NDI5MTAyMjF9.URfh54ikPrEz5DGofUQXAtmpga9Pi_xyHqm1tMsTujU'

# 获取档案
curl --location 'https://mr-lao-146870-5-1345362468.sh.run.tcloudbase.com/api/files' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVuaWQiOiJvZV9MeDZfYXgtdGZTazVuODRpZ3dhZG1NLWxnIiwiaWF0IjoxNzQyMzA1NDIxLCJleHAiOjE3NDI5MTAyMjF9.URfh54ikPrEz5DGofUQXAtmpga9Pi_xyHqm1tMsTujU'
```

## 认证相关

### 登录

- **路径**: `/api/login`
- **方法**: `POST`
- **描述**: 微信小程序登录接口
- **请求参数**:
  ```json
  {
    "code": "string" // 微信登录 code
  }
  ```
- **响应**:
  ```json
  {
    "token": "string", // JWT token
    "user": {
      "openid": "string",
      "unionid": "string" // 可选
    }
  }
  ```
- **错误响应**:
  - 400: 缺少必要的 code 参数
  - 500: 微信登录处理失败

### 绑定手机号

- **路径**: `/api/register`
- **方法**: `POST`
- **描述**: 用户注册手机号
- **请求头**: 需要携带 JWT token
- **请求参数**:
  ```json
  {
    "code": "string" // 微信获取手机号 code
  }
  ```
- **响应**:
  ```json
  {
    "wechatId": "string",
    "phoneNumber": "string"
  }
  ```
- **错误响应**:
  - 401: 未授权
  - 400: 注册手机号失败

## 业务相关

### 获取商品列表

- **路径**: `/api/products`
- **方法**: `GET`
- **描述**: 获取所有商品列表
- **请求头**: 需要携带 JWT token
- **响应**: 商品列表数组
- **错误响应**:
  - 401: 未授权

### 获取提醒事项

- **路径**: `/api/reminders`
- **方法**: `GET`
- **描述**: 获取当前用户的提醒事项列表
- **请求头**: 需要携带 JWT token
- **响应**: 提醒事项列表数组
- **错误响应**:
  - 401: 未授权
