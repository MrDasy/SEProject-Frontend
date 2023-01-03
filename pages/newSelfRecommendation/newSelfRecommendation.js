// pages/newSelfRecommendation/newSelfRecommendation.js
const app = getApp()
const APIKEY = "6ae804ed98934e1490998a422c84d155";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    years: [
        { label: '所有年级', value: '所有年级' },
        { label: '小学', value: '小学' },
        { label: '一年级', value: '一年级' },
        { label: '二年级', value: '二年级' },
        { label: '三年级', value: '三年级' },
        { label: '四年级', value: '四年级' },
        { label: '五年级', value: '五年级' },
        { label: '六年级', value: '六年级' },
        { label: '初中', value: '初中' },
        { label: '初一', value: '初一' },
        { label: '初二', value: '初二' },
        { label: '初三', value: '初三' },
        { label: '高中', value: '高中' },
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
      parent_id:0,
      address:"",
      subject:"",
      description:"",
      teaching_mode:"",
      teaching_time:"",
      message:"",
  
      confirmBtn: { content: '确定', variant: 'base' },
      dialogKey: '',
      showTextAndTitle: false,

      videoUrl:"",
      poster:"",
      clickFlag:true //防重复点击 
  

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
   * 拍摄或选择视频并上传服务器
   */
  chooseVideo: function () {
    console.log("chooseVideo")
    this.setData({clickFlag: false})
 
    let that = this
    //1.拍摄视频或从手机相册中选择视频
    wx.chooseVideo({
      sourceType: ['album', 'camera'], // album 从相册选视频，camera 使用相机拍摄
      // maxDuration: 60, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
      camera: 'back',//默认拉起的是前置或者后置摄像头，默认back
      compressed: true,//是否压缩所选择的视频文件
      success: function(res){
        //console.log(res)
        let tempFilePath = res.tempFilePath//选择定视频的临时文件路径（本地路径）
        let duration = res.duration //选定视频的时间长度
        let size = parseFloat(res.size/1024/1024).toFixed(1) //选定视频的数据量大小
        // let height = res.height //返回选定视频的高度
        // let width = res.width //返回选中视频的宽度
        that.data.duration = duration
        if(parseFloat(size) > 100){
          that.setData({
            clickFlag: true,
            duration: ''
          })
          let beyondSize = parseFloat(size) - 100
          wx.showToast({
            title: '上传的视频大小超限，超出'+beyondSize+'MB,请重新上传',
            //image: '',//自定义图标的本地路径，image的优先级高于icon
            icon:'none'
          })
        }else{
          //2.本地视频资源上传到服务器
          that.uploadFile(tempFilePath)
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  /**
   * 将本地资源上传到服务器
   * 
   */
  uploadFile:function(tempFilePath){
    let that = this
    let third_session = wx.getStorageSync('third_session')
    wx.showLoading({
      title: '上传进度：0%',
      mask: true //是否显示透明蒙层，防止触摸穿透
    })
    const uploadTask = wx.uploadFile({
      url: 'http://192.168.0.77:8083/upload/uploadVideo',//开发者服务器地址
      filePath:tempFilePath,//要上传文件资源的路径（本地路径）
      name:'file',//文件对应key,开发者在服务端可以通过这个 key 获取文件的二进制内容
      // header: {}, // 设置请求的 header
      formData: {
        third_session: third_session
      }, // HTTP 请求中其他额外的 form data
      success: function(res){
        console.log("uploadFile",res)
        // success
        let data = JSON.parse(res.data)
        wx.hideLoading()
        if(data.returnCode == 200){
          that.setData({
            videoUrl: data.videoUrl,
            poster: data.imgUrl,
            duration: that.data.duration,
            clickFlag:true
          })
          wx.showToast({
            title: '上传成功',
            icon: 'success'
          })
        }else{
          that.setData({
            videoUrl: '',
            poster: '',
            duration: '',
            clickFlag:true
          })
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          })
        }
       
      },
      fail: function() {
        // fail
        wx.hideLoading()
        this.setData({
          videoUrl: '',
          poster: '',
          duration: '',
          clickFlag:true
        })
        wx.showToast({
          title: '上传失败',
          icon: 'none'
        })
      }
    })
    //监听上传进度变化事件
    uploadTask.onProgressUpdate((res) =>{
      wx.showLoading({
        title: '上传进度：'+res.progress+'%',
        mask: true //是否显示透明蒙层，防止触摸穿透
      })
      console.log("上传进度",res.progress)
      console.log("已经上传的数据长度，单位 Bytes:",res.totalBytesSent)
      console.log("预期需要上传的数据总长度，单位 Bytes:",res.totalBytesExpectedToSend)
    })
  },
  //保存数据库
  saveVideo(){
    //调用服务器保存视频信息接口
    
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