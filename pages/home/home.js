// pages/home/home.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userName: '用户名',
        userAvatar: 'https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/avatar/avatar-v2/1.png',
        userInfo: '身份',
        didLogin: app.globalData.didLogin,
        loginPmt: "登录测试", 
    },

    doLogin: function(c) {
        wx.request({
            url: 'http://121.36.225.155:9903/auth/login',
            method: 'GET',
            data: {
                code: c,
                isTutor: app.globalData.isTutor
            },
            success: (res) => {
                app.globalData.didLogin = true
                this.setData({
                    didLogin: true,
                    loginPmt: "成功",
                })
                console.log(res)
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

    testProfile: function() {
        wx.getUserProfile({
            desc: 'desc',
            success: res => {
                console.log(res);
                this.setData({
                    userAvatar: res.userInfo.avatarUrl,
                    userName: res.userInfo.nickName,
                    userInfo: "身份："+ (app.globalData.isTutor?"家教":"家长"),
                })
            },
        })
    }
})