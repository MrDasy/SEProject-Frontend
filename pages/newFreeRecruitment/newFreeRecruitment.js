// pages/newFreeRecruitment/newFreeRecruitment.js
const app = getApp()
const APIKEY = "6ae804ed98934e1490998a422c84d155";
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

    location:"",
    price: '',
    priceError: false,

    parent_id:0,
    address:"",
    subject:"",
    salary:"",
    description:"",
    teaching_mode:"",
    teaching_time:"",
    message:"",

    confirmBtn: { content: '确定', variant: 'base' },
    dialogKey: '',
    showTextAndTitle: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  handleBack() {
    console.log('go back');
  },
  showDialog(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ [key]: true, dialogKey: key });
  },

  closeDialog() {
    const { dialogKey } = this.data;
    this.setData({ [dialogKey]: false });
  },
  // 学科、授课方式选择
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
      "subject":e.detail.label[0]+e.detail.label[1],
    });
    console.log("subject="+this.data.subject);
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



  //选择定位
  selectLocation() {
    var that = this
    wx.chooseLocation({
      success(res) {
        app.globalData.address=res.address+","+res.latitude + "," + res.longitude,
        app.globalData.location=res.address,
        // console.log(res)
        that.setData({
          location: app.globalData.location,
          address:app.globalData.address,
        })
        console.log("address="+that.data.address)
        console.log("description="+that.data.description)
      }
      , fail() {
        wx.getLocation({
          type: 'gcj02',
          fail() {
            wx.showModal({
              title: '获取地图位置失败',
              content: '为了给您提供准确的天气预报服务,请在设置中授权【位置信息】',
              success(mRes) {
                if (mRes.confirm) {
                  wx.openSetting({
                    success: function (data) {
                      if (data.authSetting["scope.userLocation"] === true) {
                        that.selectLocation()
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'none',
                          duration: 1000
                        })
                      }
                    }, fail(err) {
                      console.log(err)
                      wx.showToast({
                        title: '唤起设置页失败，请手动打开',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
  },

// 输入薪资
  onPriceInput(e) {
    const { priceError } = this.data;
    const isNumber = /^\d+(\.\d+)?$/.test(e.detail.value);
    if (priceError === isNumber) {
      this.setData({
        priceError: !isNumber,
      });
    }
    this.setData({ 'salary': e.detail.value })
    console.log("salary="+this.data.salary)
  },

// 填写简介
InputDecrip: function (e) {
  this.setData({ 'description': e.detail.value })
  console.log("description="+this.data.description)
},

//输入授课方式
InputMode: function (e) {
  this.setData({ 'teaching_mode': e.detail.value })
  console.log("teaching_mode="+this.data.teaching_mode)
},

//输入授课时间
InputTime: function (e) {
  this.setData({ 'teaching_time': e.detail.value })
  console.log("teaching_time="+this.data.teaching_time)
},


new_recruitment(e){
    wx.request({
      url: 'http://121.36.225.155:9903/recruitment',
      method:'Post',
      data:{
        "parent_id":app.globalData.user_id,
        "address":this.data.address,
        "subject":this.data.subject,
        "salary":this.data.salary,
        "description":this.data.description,
        "teaching_mode":this.data.teaching_mode,
        "teaching_time":this.data.teaching_time,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:res=>{
        console.log("招聘信息提交成功",res.data)
        console.log(this.data.address)
        console.log(this.data.subject)
        console.log(this.data.salary)
        console.log(this.data.description)
        console.log(this.data.teaching_mode)
        console.log(this.data.teaching_time)
        if (res.data.status == "success") {
            this.setData({'message':"提交成功"}),
            this.showDialog(e)
          } else {
            this.setData({'message':"提交失败"})
            this.showDialog(e)
          }
      }
    })
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