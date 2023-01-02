// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)


        // // 登录
        // wx.login({
        //     success: loginRes => {
        //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //     }

        // })
    },

    globalData: {
        user_id: 1,
        id: "",
        //location为具体地址
        //address=location,latitude,longtitude
        location: "",
        address: "",
        isTutor: false,
    },

    doLogin: function (callback) {
        let that = this;
        wx.login({
            success: function (loginRes) {
                console.log(loginRes, "loginRes");
                if (loginRes.code) {
                    /*
                     * @desc: 获取用户信息 期望数据如下
                     *
                     * @param: userInfo       [Object]
                     * @param: rawData        [String]
                     * @param: signature      [String]
                     * @param: encryptedData  [String]
                     * @param: iv             [String]
                     **/
                    wx.getUserInfo({
                        withCredentials: true, // 非必填, 默认为true

                        success: function (infoRes) {
                            console.log("infoRes:", infoRes);
                            // 请求服务端的登录接口
                            wx.request({
                                url: "http://121.36.225.155:9903/auth/login",
                                method: "POST",
                                data: {
                                    authType: 1, //1代表微信端登录
                                    code: loginRes.code, // 临时登录凭证
                                    rawData: infoRes.rawData, // 用户非敏感信息
                                    signature: infoRes.signature, // 签名
                                    encryptedData: infoRes.encryptedData, // 用户敏感信息
                                    iv: infoRes.iv, // 解密算法的向量
                                    token: wx.getStorageSync("loginFlag"),
                                },

                                success: function (res) {
                                    console.log("login success:", res);
                                    res = res.data;
                                    if (res.success) {
                                        that.globalData.userInfo = res.module.userInfo;
                                        console.log(
                                            "globalData.userInfo",
                                            that.globalData.userInfo
                                        );
                                        wx.setStorageSync("userInfo", res.module.userInfo);
                                        wx.setStorageSync("loginFlag", res.module.token);
                                        if (callback) {
                                            callback();
                                        }
                                    } else {
                                        console.log(res.errMsg);
                                    }
                                },

                                fail: function (error) {
                                    // 调用服务端登录接口失败
                                    console.log("调用接口失败");
                                    console.log(error);
                                },
                            });
                        },

                        fail: function (error) {
                            console.log(error);
                            // 获取 userInfo 失败，去检查是否未开启权限
                            wx.hideLoading();
                            console.log("调用request接口失败");
                            console.log(error);
                        },
                    });
                } else {
                    // 获取 code 失败
                    console.log("登录失败");
                    console.log("调用wx.login获取code失败");
                }
            },

            fail: function (error) {
                // 调用 wx.login 接口失败
                console.log("接口调用失败");
                console.log(error);
            },
        });
    },
})