'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: { // 开发环境

    // Paths
    assetsSubDirectory: 'static',
    // 编译后存放静态资源的二级目录
    assetsPublicPath: '/',
    // 配置最后生产环境静态资源所在的根目录
    // 具体用法看本文下面的build中的介绍
    proxyTable: {},
    //解决开发环境中的跨域问题
    /**
     '/api': {
          target: 'http://xxxxxx.com', // 接口的域名
       // secure: false,  // 如果是https接口，需要配置这个参数
          changeOrigin: true, // 是否跨域
          pathRewrite: {
           '^/api': '' // 重写接口
          }
      }
     */

    // Various Dev Server settings // 开发服务器设置
    host: 'localhost', // can be overwritten by process.env.HOST
    // 开发环境的host，可以用process.env.HOST重新设置
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // 端口号，可以用process.env.PORT重新设置
    // 如果端口号被占用，会重新使用一个新的端口
    autoOpenBrowser: true, // 是否自动打开浏览器
    errorOverlay: true,
    //是否开启错误覆盖，会在浏览器中覆盖一层背景显示错误内容
    notifyOnErrors: true, // 是否弹出通知存在错误
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    // webpack为我们提供的devserver是可以监控文件改动的
    // 但在有些情况下却不能工作，我们可以设置一个轮询（poll）来解决
    // 这里可以设置轮询时间（毫秒）

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true, // 开发环境是否使用eslint检查代码
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,
    // 设置打包代码时eslint的错误和警告是否显示在浏览器中

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',
    // 开发环境启用devtool中的cheap-module-eval-source-map形式生成sourceMap
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    // 配合devtool，当给文件名插入新的hash导致缓存被清除时是否生成souce maps

    cssSourceMap: true
    // 是否启用css的sourceMap
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    // 打包后入口html文件存放路径

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 打包之后资源存放的根目录
    assetsSubDirectory: 'static',
    // 编译后存放静态资源的二级目录
    assetsPublicPath: '/',
    // 配置最后生产环境静态资源所在的根目录
    // 可以改变此处的路径打包试试
    // index.html中原本引用的js路径是/a/b.js
    // assetsPublicPath配置为/test时
    // 引用的js路径变为/test/a/b.js

    /**
     * Source Maps
     */

    productionSourceMap: true, // 生产环境是否启用srouceMap
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    // 启用devtool中的source-map形式生成sourceMap
    // 此处是采用生成sourceMap文件的形式
    // 具体可以点击上面的url查看详细内容

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 默认关闭gzip因为许多流行的静态主机已经为你gzip压缩了
    // 所有的静态资源，在你设置这个参数为true前，
    // 你需要安装compression-webpack-plugin
    productionGzip: false, // 生产环境是否开启gzip压缩
    productionGzipExtensions: ['js', 'css'],
    // 需要进行gzip压缩的文件扩展名

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 运行带有额外参数的npm run build --report命令，
    // 以在构建完成后查看分析报告
    bundleAnalyzerReport: process.env.npm_config_report
    // 用于分析页面中加载的资源的依赖关系的工具
  }
}
