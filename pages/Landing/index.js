
const app = getApp()
Page({
    signin() { //登录事件
        if (app.globalData.didLogin) {
            wx.switchTab({
                url: '../freeRecruitment/freeRecruitment'
            })
        } else {
            app.doLogin()
        }
    },

    signup() { //注册事件
        wx.navigateTo({
            url: '../signUp/signUp'
        })
    },

    onLoad: function(){
        wx.login({
            success: (res) => {
                if (res.code) {
                    app.getSession(res.code)
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.animated = wx.createAnimation({
            duration: 2000,
            timingFunction: 'ease-out'
        })
        this.animated1 = wx.createAnimation({
            duration: 2000,
            timingFunction: 'ease'
        })
        this.animated.translateY(125).step()
        this.animated.opacity(0.9).step()
        this.animated1.translateY(50).step()
        this.animated1.opacity(0.9).step()
        this.setData({
            animated: this.animated.export(),
            animated1: this.animated1.export()
        })
    },
})