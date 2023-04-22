// app.js
App({
    local_url: "http://localhost:9903",
    remote_url: "http://121.36.225.155:9903",
    local_debug: false,

    globalData: {
        user_id: -1,
        id: "",
        //location为具体地址
        //address=location,latitude,longtitude
        location: "",
        address: "",

        isTutor: true, //是否是家教
        didLogin: false,
        userName: '用户名',
        userAvatar: 'https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/avatar/avatar-v2/1.png',
    },

    apiUrl: function () { //获取api地址
        return this.local_debug ? this.local_url : this.remote_url
    },

    apiUrl: function (path) {
        return (this.local_debug ? this.local_url : this.remote_url) + path
    },

    getSession: function (c) {
        wx.request({
            url: this.apiUrl('/auth/session'),
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

    doLogin: function () {
        if (this.globalData.didLogin)
            return
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
    },
})