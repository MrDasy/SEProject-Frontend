// pages/uploadTest/uploadTest.js
const app = getApp()
var qiniuUploader = require("../../libs/qiniuUploader.js")

function initQiniu() {
    var options = {
        region: 'ECN',
        uptoken: '',
        uptokenURL: 'http://121.36.225.155:9903/test/uptoken',
        uptokenFunc: function () {
            return qiniuUploadToken;
        },
        domain: 'http://space.skyezhou.cn',
        shouldUseQiniuFileName: true
    };
    // 将七牛云相关配置初始化进本sdk
    qiniuUploader.init(options);
}

Page({
    data: {
        videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        imageProgress: {},
    },
    chooseVideo() {
        var that = this
        initQiniu()
        wx.chooseMedia({
            count: 1,
            mediaType: ['video'],
            sourceType: ['album'],
            success(res) {
                var file = res.tempFiles[0]
                console.log(file.tempFilePath)
                console.log(file.size)
                qiniuUploader.upload(file.tempFilePath, (res) => {
                        console.log('file url is: ' + res.fileURL);
                        that.setData({
                            'videoUrl': res.fileURL
                        });
                    }, (error) => {
                        console.error('error: ' + JSON.stringify(error));
                    },
                    null,
                    (progress) => {
                        that.setData({
                            'imageProgress': progress
                        });
                        console.log('上传进度', progress.progress);
                        console.log('已经上传的数据长度', progress.totalBytesSent);
                        console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend);
                    }, cancelTask => {}
                );
            }
        })
    },
})