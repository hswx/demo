'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'
// 设置环境变量为生产

const ora = require('ora')
// 控制台实现loading动画效果的插件
const rm = require('rimraf')
// node 中执行
// rm -rf命令的工具
const path = require('path')
// node处理路径的模块
const chalk = require('chalk')
// 可以在控制台中输出指定颜色的文字
const webpack = require('webpack')
// 引入webpack模块
const config = require('../config')
// 引入../config/index.js的相关配置
const webpackConfig = require('./webpack.prod.conf')
// 引入./webpack.prod.conf的相关配置

const spinner = ora('building for production...')
spinner.start()
// 创建一个带有相关内容的loading图像并开始播放

// 通过rimraf删除配置中制定的相关静态目录的内容
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err // 如果删除出现异常则抛出异常
  // 删除成功之后开始根据./webpack.prod.conf的相关配置执行webpack打包
  webpack(webpackConfig, (err, stats) => {
    spinner.stop() // webpack程序执行完之后停止loading播放
    if (err) throw err // 如果打包出现异常则抛出异常

    // 控制台输出相关信息
    process.stdout.write(stats.toString({
      colors: true, // 输出信息中使用颜色
      modules: false, // 不输出构建模块相关信息
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false, // 不输出chunk相关信息
      chunkModules: false // 不将构建模块信息添加到 chunk 信息中
    }) + '\n\n')

    if (stats.hasErrors()) {
      // 检查webpack编译期间是否出现错误
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
      // 如果编译期间出现错误，则打印相关信息，并退出当前进程
    }

    // 打包没有任何问题的情况下，控制台打印如下相关提示
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
