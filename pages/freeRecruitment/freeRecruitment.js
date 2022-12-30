// pages/freeRecruitment/freeRecruitment.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectorVisible: false,
    selectedProvince: null,
    selectedCity: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onTabsChange(event) {
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },

  onTabsClick(event) {
    console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
  },
  // 显示组件
  showSelector() {
    this.setData({
      selectorVisible: true,
    });
  },

  // 当用户选择了组件中的城市之后的回调函数
  onSelectCity(e) {
    console.log(e.detail);
    const { province, city } = e.detail;
    this.setData({
      selectedProvince: province,
      selectedCity: city,
    });
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