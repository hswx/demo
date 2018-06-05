'use strict'
const utils = require('./utils')
// 获取工具js文件
const config = require('../config')
// 获取../config/index.js文件
const isProduction = process.env.NODE_ENV === 'production'
// 是否是生产环境
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap
// 读取生产环境和开发环境下sourceMap的配置

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    // cssloader打包的时候是否开启sourceMap
    extract: isProduction
    // 是否将css提取到单独的文件中
  }),
  cssSourceMap: sourceMapEnabled,
  // 是否开启sourceMap
  cacheBusting: config.dev.cacheBusting,
  //  配合devtool，当给文件名插入新的hash导致缓存被清除时是否生成souce maps
  transformToRequire: {
    // 把html标签中引用的资源变成require引入
    // 比如图片<img :src="test"> 需要通过let test = require('xxx')
    // 可以直接写成<img src="xxx">
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
