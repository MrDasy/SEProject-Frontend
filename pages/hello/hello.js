// pages/hello/hello.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    signin() {
        console.log('route');
        wx.switchTab({
            url: '../freeRecruitment/freeRecruitment'
        })
    },
    signup() {
        console.log('route');
        wx.navigateTo({
            url: '../signUp/signUp'
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

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})