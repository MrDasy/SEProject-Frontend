// pages/freeRecruitmentDetail/freeRecruitmentDetail.js
const app = getApp()
const citySelector = requirePlugin('citySelector');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // longitude:location[2],
    // latitude:location[1],
    mapId: "map" ,
    confirmBtn: { content: '确定', variant: 'base' },
    dialogKey: '',
    showText: false,
    showMultiText: false,
    showTextAndTitle: false,
    showMultiTextAndTitle: false,

    address:"",
    description:"",
    parent_id:1,
    salary:"",
    subject:"",
    teaching_mode:"",
    teaching_time:"",

    // str="jpg|bmp|gif|ico|png", 
    // arr=str.split(","),
    location:[],
    name:"",
    phone_number:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.get_recruitment()
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

   // 获取招聘列表
   get_recruitment(){
    wx.request({
      url: 'http://121.36.225.155:9903/recruitment',
      data:{
        "filter":"recruitment_id",
        // "filter":"id",
        "location":null,
        "subject":null,
        "id":app.globalData.id,
      },
      method:'Get',
      success:res=>{
        var e=res.data.data
        console.log("招聘详情请求成功",e)
        this.setData({
          'address':e.address,
          'description':e.description,
          'parent_id':e.parent_id,
          'salary':e.salary,
          'subject':e.subject,
          'teaching_mode':e.teaching_mode,
          'teaching_time':e.teaching_time,
          'location':e.address.split(","),
        })
        console.log("this.data.parent_id=",this.data.parent_id.toString())
      }
    })
    this.get_parentinfo()
  },

  // 获取家长信息
  get_parentinfo(){
    wx.request({
    //   url: 'http://121.36.225.155:9903/parents/'+this.data.parent_id.toString(),
      url: 'http://121.36.225.155:9903/parents/1',
      method:'Get',
      success:res=>{
        var e=res.data.data
        console.log(this.data.parent_id.toString(),"家长信息请求成功",e)
        this.setData({
          'name':e.real_name,
          'phone_number':e.phone_number
        })
        // console.log(this.data.name)
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