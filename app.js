// app.js
const local_url = "http://localhost:9903"
const remote_url = "http://121.36.225.155:9903"
const local_debug = false

function getUrl() {
    return local_debug ? local_url : remote_url
}

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

        isTutor: true, //是否是家教
        didLogin: false,
        sessionKey: "",
        userName: '用户名',
        userAvatar: 'https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/avatar/avatar-v2/1.png',
    },

    getSessionKey: function (c) {
        wx.request({
            url: getUrl() + '/auth/session',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                code: c,
                isTutor: this.globalData.isTutor
            },
            success: (res) => {
                console.log(res)
                if (res.data.success) {
                    this.globalData.sessionKey = res.data.session_key
                }
            }
        })
    },
    
    getSessionCode: function () {
        wx.login({
            success: (res) => {
                console.log(res);
                if (res.code) {
                    console.log(res.code);
                    this.getSessionKey(res.code)
                }
            }
        })
    },

    doLogin: function () {
        if (this.globalData.didLogin)
            return
        if (this.globalData.sessionKey == "") {
            this.getSessionCode()
        } else {
            console.log(this.globalData.sessionKey)
            wx.getUserProfile({
                desc: 'desc',
                success: res => {
                    console.log(res);
                    this.globalData.userAvatar = res.userInfo.avatarUrl
                    this.globalData.userName = res.userInfo.nickName
                    this.globalData.didLogin = true
                    wx.switchTab({
                        url: '../home/home'
                    })
                },
            })
        }
    },
})

