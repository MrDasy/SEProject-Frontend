// pages/freeRecruitmentDetail/freeRecruitmentDetail.js
const citySelector = requirePlugin('citySelector');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:116.40400,
    latitude:39.92800,
    mapId: "map" ,
    confirmBtn: { content: '确定', variant: 'base' },
    dialogKey: '',
    showText: false,
    showMultiText: false,
    showTextAndTitle: false,
    showMultiTextAndTitle: false,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  handleBack() {
    console.log('go back');
  },
  route() {
    console.log('route');
    wx.navigateTo({
      url: '../routePlanning/routePlanning'
    })
  },
  moveTolocation: function () {
    //mapId 就是你在 map 标签中定义的 id
    let Id = this.data.mapId
    var mapCtx = wx.createMapContext(Id);
    mapCtx.moveToLocation();
  },
  showDialog(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ [key]: true, dialogKey: key });
  },

  closeDialog() {
    const { dialogKey } = this.data;
    this.setData({ [dialogKey]: false });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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