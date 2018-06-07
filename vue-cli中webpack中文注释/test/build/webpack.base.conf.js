'use strict'
const path = require('path') // node文件路径处理工具
const utils = require('./utils') // ./utils.js中相关配置
const config = require('../config') // ../config/index.js中相关配置
const vueLoaderConfig = require('./vue-loader.conf') // ./vue-loader.conf.js中相关配置

function resolve (dir) {
  // 获取文件在系统中的绝对路径
  return path.join(__dirname, '..', dir)
}

// 使用eslint进行语法检测
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  // 检测以js和vue为后缀的文件
  loader: 'eslint-loader',
  enforce: 'pre',
  // 在babel-loader等其它loader对源码进行编译修改前进行检查
  include: [resolve('src'), resolve('test')],
  // 指定检查./../src和./../test目录下的js和vue文件
  options: {
    formatter: require('eslint-friendly-formatter'),
    // 编译后错误报告格式
    emitWarning: !config.dev.showEslintErrorsInOverlay
    // 将eslint报错显示为warning，true时会忽略eslint错误继续编译代码
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  // 指定解析入口起点(entry point)和 loader的基础目录，绝对路径，
  // 这里采用上层目录
  entry: {
    app: './src/main.js' // 入口文件路径
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js', // 输出的js文件名
    publicPath: process.env.NODE_ENV === 'production'
      // 配置最后开发/生产环境发布时静态资源所在的根目录
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // 定义要resolve的文件的扩展名
    alias: {
      // 定义路径别名
      'vue$': 'vue/dist/vue.esm.js',
      // 以vue结尾的路径会被转到vue/dist/vue.esm.js
      // 比如import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
      '@': resolve('src'),
      // @代表目录src
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      // 根据配置是否开启eslint代码校验
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
        // .vue文件使用vue-loader
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
        // 对src，test，node_modules/webpack-dev-server/client下的js文件使用babel-loader
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        // 对图片等资源文件使用url-loader，放在img目录下，并指明输出的命名规则
        loader: 'url-loader',
        options: {
          limit: 10000,
          // 10000字节以下的资源会被转成base64引用
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        // 对mp4等资源文件使用url-loader，放在media目录下，并指明输出的命名规则
        loader: 'url-loader',
        options: {
          limit: 10000,
          // 10000字节以下的资源会被转成base64引用
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        // 对字体文件使用url-loader，放在fonts目录下，并指明输出的命名规则
        loader: 'url-loader',
        options: {
          limit: 10000,
          // 10000字节以下的资源会被转成base64引用
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // 这些选项用于配置polyfill或mock某些node.js全局变量和模块。
  // 这可以使最初为nodejs编写的代码可以在浏览器端运行
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    // 这个配置是一个对象，其中的每个属性都是nodejs全局变量或模块的名称
    setImmediate: false,
    // false表示什么都不提供。如果获取此对象的代码，可能会因为获取不到此对象而触发ReferenceError错误
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    // 设置成empty则表示提供一个空对象
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
