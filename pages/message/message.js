// pages/message/message.js

Page({
    data: {
        isTutor: getApp().globalData.isTutor,
    },

    // 跳转到详情界面
    detail: function (id) {
        getApp().globalData.id = id.currentTarget.dataset.id,
            // console.log("app.globalData.id="+app.globalData.id);
            wx.navigateTo({
                url: '../messageDetail/messageDetail'
            })
    },

    onShow() {
        this.setData({
            isTutor: getApp().globalData.isTutor,
        })
    },
})