// pages/home/home.js
const app = getApp()
const local_url = "http://localhost:9903"
const remote_url = "http://121.36.225.155:9903"
const local_debug = false

function getUrl() {
    return local_debug ? local_url : remote_url
}

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userName: '用户名',
        userAvatar: 'https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/avatar/avatar-v2/1.png',
        userInfo: '身份',
        loginPmt: "登录",

        didLogin: app.globalData.didLogin,

        userId: 0,
        sessionKey: "",
        detailInfo: "",
    },

    doLogin: function (c) {
        wx.request({
            url: getUrl() + '/auth/session',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                code: c,
                isTutor: app.globalData.isTutor
            },
            success: (res) => {
                console.log(res)
                if (res.data.success) {
                    app.globalData.didLogin = true
                    this.setData({
                        didLogin: true,
                        loginPmt: "成功",
                        userInfo: "身份：" + (app.globalData.isTutor ? "家教" : "家长"),
                        sessionKey: res.data.session_key,
                    })
                }
            }
        })
    },

    testLogin: function () {
        wx.login({
            success: (res) => {
                console.log(res);
                if (res.code) {
                    this.doLogin(res.code);
                    console.log(res.code);
                }
            }
        })
    },

    testProfile: function () {
        wx.getUserProfile({
            desc: 'desc',
            success: res => {
                console.log(res);
                this.setData({
                    userAvatar: res.userInfo.avatarUrl,
                    userName: res.userInfo.nickName,
                })
                
                wx.request({
                    url: getUrl() + '/user/wxinfo',
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        userID: this.data.userId,
                        encryptedData: res.encryptedData,
                        sessionKey: this.data.sessionKey,
                        iv:res.iv,
                    },
                    success: (res) => {
                        console.log(res)
                    }
                })
            },
        })
    }
})