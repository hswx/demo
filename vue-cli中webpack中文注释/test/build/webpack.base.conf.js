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
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
