// pages/rollTest/rollTest.js
Page({
    data: {
        dataArray: [],
    },

    onLoad: function () {
        this.loadData();
    },

    loadData: function () {
        let newDataArray = [];
        let arrayLength = this.data.dataArray.length;
        for (let i = 0; i < 4; i++) {
            newDataArray.push({
                index: arrayLength + i,
            });
        }
        this.setData({
            dataArray: this.data.dataArray.concat(newDataArray),
        });
    },

    swiperChange: function (e) {
        let newIndex = e.detail.current;

        // 判断是否需要加载更多数据
        if (newIndex === this.data.dataArray.length - 2) {
            this.loadData();
        }
    },
});