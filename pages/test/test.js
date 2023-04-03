const app = getApp()

Page({
    data: {
        info: 'Tap Here',
    },
    onTap(e) {
        console.log(e, '测试结果')
    }
})