// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

<<<<<<< HEAD
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
      
    })
  },
  
  globalData: {
    userInfo: null,
    id:"",

    //location为具体地址
    //address=location,latitude,longtitude
    location:"",
    address:"",
  }
})
=======
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }

        })
    },

    globalData: {
        userInfo: null,
        id: "",
        isTutor: false,
    }
})
>>>>>>> 2a47133d2201c1c269e0dd313b12114ea0a45ce7
