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

        isTutor: app.globalData.isTutor,

        popShow: false,
    },

    onShow() {
        this.updateInfo()
    },

    switchIdentity: function () {
        this.setData({
            isTutor: !this.data.isTutor,
        })
        app.globalData.isTutor = this.data.isTutor
        this.updateInfo()
        this.hideDialogue()
    },

    showDialogue:function () {
        this.setData({popShow:true})
    },

    hideDialogue:function(){
        this.setData({popShow:false})
    },

    updateInfo: function () {
        this.setData({
            userInfo: "身份：" + (app.globalData.isTutor ? "家教" : "家长"),
            userName: app.globalData.userName,
            userAvatar: app.globalData.userAvatar,
        })
    },
})