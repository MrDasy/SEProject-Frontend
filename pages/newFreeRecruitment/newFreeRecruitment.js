// pages/newFreeRecruitment/newFreeRecruitment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    years: [
      { label: '一年级', value: '一年级' },
      { label: '二年级', value: '二年级' },
      { label: '三年级', value: '三年级' },
      { label: '四年级', value: '四年级' },
      { label: '五年级', value: '五年级' },
      { label: '六年级', value: '六年级' },
      { label: '初一', value: '初一' },
      { label: '初二', value: '初二' },
      { label: '初三', value: '初三' },
      { label: '高一', value: '高一' },
      { label: '高二', value: '高二' },
      { label: '高三', value: '高三' },
    ],
    seasons: [
      { label: '语文', value: '语文' },
      { label: '数学', value: '数学' },
      { label: '英语', value: '英语' },
      { label: '物理', value: '物理' },
      { label: '化学', value: '化学' },
      { label: '历史', value: '历史' },
      { label: '地理', value: '地理' },
      { label: '政治', value: '政治' },
      { label: '生物', value: '生物' },
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  handleBack() {
    console.log('go back');
  },
  // 学科选择
  onColumnChange(e) {
    console.log('picker pick:', e);
  },

  onPickerChange(e) {
    const { key } = e?.currentTarget?.dataset;
    const { value } = e.detail;

    console.log('picker change:', e.detail.label[0]);
    this.setData({
      [`${key}Visible`]: false,
      [`${key}Value`]: value,
      [`${key}Text`]: value.join(' '),
      "filter":"all",
      "subject":e.detail.label[0]+e.detail.label[1],
    });
    console.log("subject="+this.data.subject);
    this.get_recruitment()
  },

  onPickerCancel(e) {
    const { key } = e?.currentTarget?.dataset;
    console.log(e, '取消');
    console.log('picker1 cancel:');
    this.setData({
      [`${key}Visible`]: false,
    });
  },

  onSeasonPicker() {
    this.setData({ 
      dateVisible: true ,
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