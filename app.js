// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },

    globalData: {
        user_id: 1,
        id: "",
        //location为具体地址
        //address=location,latitude,longtitude
        location: "",
        address: "",
        isTutor: false, //是否是家教
        didLogin: false,
    },
})