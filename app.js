// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },

    globalData: {
        userInfo: null,
        id: "",
        location: "",
        address: "",
        isTutor: true, //是否是家教
        didLogin: false,
    },
})