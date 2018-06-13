'use strict'
const utils = require('./utils') // 工具函数
const webpack = require('webpack') // webpack工具
const config = require('../config') // 引入../config/index.js文件
const merge = require('webpack-merge') // 用于合并webpack配置对象
const path = require('path') // node中path模块
const baseWebpackConfig = require('./webpack.base.conf')
// 引入./webpack.base.conf.js相关配置
const CopyWebpackPlugin = require('copy-webpack-plugin')
// webpack资源拷贝插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 处理html文件的webpack插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 在终端打印webpack错误信息的插件
const portfinder = require('portfinder')
// 查找当前机器上开放端口的工具

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
// 获取当前环境变量中配置的host和端口号

// 合并./webpack.base.conf.js中以及当前文件中的webpack配置
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    // 指定dev环境下的css样式处理loader配置
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool, // 开发环境下的sourcemap配置

  // these devServer options should be customized in /config/index.js
  // 开发环境服务器配置
  devServer: {
    clientLogLevel: 'warning', // 客户端控制台显示的信息级别
    historyApiFallback: {
      // 路由使用history模式下的相关配置
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
        // 这里把所有404的路径都重定向到index.html页面
      ],
    },
    hot: true, // 启用webpack模块热替换，这样就页面就不要刷新了
    contentBase: false, // since we use CopyWebpackPlugin.
    // 告诉服务器提供静态内容的位置，由于使用了CopyWebpackPlugin，不采用这个配置
    compress: true, // 是否启用gzip压缩
    host: HOST || config.dev.host, // 配置服务器host
    port: PORT || config.dev.port, // 配置服务器端口
    open: config.dev.autoOpenBrowser, // 是否自动代开浏览器
    overlay: config.dev.errorOverlay // 是否全屏弹窗的形式显示编译过程中的错误
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,  // url的访问路径前缀
    proxy: config.dev.proxyTable, // dev服务器的代理配置
    quiet: true, // necessary for FriendlyErrorsPlugin
    // 除了初始启动服务器的信息之外任何信息都不会打印到控制台
    // （将会通过FriendlyErrorsPlugin打印）
    watchOptions: { // 监视文件改动
      poll: config.dev.poll, // 是否启用轮询
    }
  },
  plugins: [
    new webpack.DefinePlugin({ // 创建一个在编译时可以配置的全局常量
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    // 模块热替换插件
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息，生产不需要
    new webpack.NoEmitOnErrorsPlugin(),
    // webpack 在编译出现错误时跳过输出阶段。这样可以确保输出资源不会包含错误
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      // 通过模板生成html文件
      filename: 'index.html',
      // 生成的html文件名，路径相对于output.path
      template: 'index.html',
      // 依赖的html模板，路径相对于context
      inject: true
      // 生成的script标签放在html文件的body元素底部
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      // 复制静态资源
      {
        from: path.resolve(__dirname, '../static'),
        // 要拷贝的源目录
        to: config.dev.assetsSubDirectory,
        // 要拷贝的目标目录
        ignore: ['.*']
        // 忽略.*文件
      }
    ])
  ]
})
// 通过portfinder查询配置的端口是否被占用，找到可用的端口
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  // 获取配置的端口
  portfinder.getPort((err, port) => {
    // 查询端口号是否可用
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port // 设置全局变量的端口号，给e2e测试用
      // add port to devServer config
      devWebpackConfig.devServer.port = port // 设置dev服务器的端口号

      // Add FriendlyErrorsPlugin
      // 能够更好在终端输出webapck运行的信息
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: { // 编译成功的提示
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors // 有错误时是否弹出错误提示
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
      // 返回promise，参数为dev环境的webpack配置
    }
  })
})
