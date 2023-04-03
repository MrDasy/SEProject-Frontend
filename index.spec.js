const automator = require('miniprogram-automator')
 
automator.launch({
  cliPath: '/Applications/wechatwebdevtools.app/Contents/MacOS/cli', // 工具 cli 位置，如果你没有更改过默认安装位置，可以忽略此项
  projectPath: '/Users/skyzhou/Documents/Workspace/SEProj/MP', // 项目文件地址
}).then(async miniProgram => {
  const page = await miniProgram.reLaunch('/pages/test/test')
  await page.waitFor(500)
  const element = await page.$('.user-motto')
  console.log(await element.attribute('class'))
  await element.tap()
 
  await miniProgram.close()
})