'use strict'
const path = require('path') // 引入path模块
const utils = require('./utils') // 引入工具包
const webpack = require('webpack') // 引入webpack模块
const config = require('../config') // ../config/index.js
const merge = require('webpack-merge') // webapck-merge配置合并插件
const baseWebpackConfig = require('./webpack.base.conf') // ./webpack.base.conf.js
const CopyWebpackPlugin = require('copy-webpack-plugin')
// webpack资源拷贝插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 处理html文件的webpack插件
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 将所有的入口 chunk(entry chunks)中的指定内容移动到独立的文件中
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩和优化（去重）css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 压缩js

// 判断是否时测试环境，获取环境变量
const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ // 设置样式loader
      sourceMap: config.build.productionSourceMap, // sourceMap配置
      extract: true, // 将css提取出来
      usePostCSS: true // 使用postcss处理样式
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  // 设置sourceMap处理方式

  output: {
    path: config.build.assetsRoot, // 指定解析入口起点(entry point)和 loader的基础目录，绝对路径，
    filename: utils.assetsPath('js/[name].[chunkhash].js'), // 输出文件名

    /**
     * 打包require.ensure方法中引入的模块，如果该方法中没有引入任何模块则不会生成任何chunk块文件
     *
     * 比如在main.js文件中,require.ensure([],function(require){alert(11);}),这样不会打包块文件
     * 只有这样才会打包生成块文件require.ensure([],function(require){alert(11);require('./greeter')})
     * 或者这样require.ensure(['./greeter'],function(require){alert(11);})
     * chunk的hash值只有在require.ensure中引入的模块发生变化,hash值才会改变
     * 注意:对于不是在ensure方法中引入的模块,此属性不会生效,只能用CommonsChunkPlugin插件来提取
     */
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({ // 创建一个在编译时可以配置的全局常量
      'process.env': env
    }),
    new UglifyJsPlugin({ // 压缩js
      uglifyOptions: {
        compress: {
          warnings: false // 不显示警告
        }
      },
      sourceMap: config.build.productionSourceMap, // 是否启用sourceMap
      parallel: true // 使用多进程并行运行和文件缓存来提高构建速度
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      // 生成文件的文件名
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      // 从所有额外的 chunk(additional chunk) 提取（默认情况下，它仅从初始chunk(initial chunk) 中提取）
      // 当使用 CommonsChunkPlugin 并且在公共 chunk 中有提取的 chunk（来自ExtractTextPlugin.extract）时，allChunks **必须设置为 true
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({ // 合并和优化css，默认css处理器cssProcessor是cssnano
      cssProcessorOptions: config.build.productionSourceMap // 是否需要sourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true } // 安全模式
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index, // 输出的html文件的名称
      template: 'index.html', // html文件模板
      inject: true, // script标签位于html文件的 body 底部
      minify: { // html压缩配置
        removeComments: true, // 删除注释
        collapseWhitespace: true, // 删除空格和换行
        removeAttributeQuotes: true // 删除html标签中属性的双引号
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
      // html中script标签的引用顺序，dependency表示按依赖关系排序
    }),
    // keep module.id stable when vendor modules does not change
    // 根据模块的相对路径生成一个四位数的hash作为模块id
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // webpack3新的特性，启用作用域提升，作用是让代码文件更小、运行的更快
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      // 提取第三方库和公共模块，避免首屏加载的bundle文件或者按需加载的bundle文件体积过大
      name: 'vendor', // 合并后的chunk名
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return ( // 把所有node_module目录下被引用的文件打包到一起
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // 把webpack的runtime代码和module manifest代码提取到manifest文件中，
    // 防止修改了代码但是没有修改第三方库文件导致第三方库文件也打包的问题
    new webpack.optimize.CommonsChunkPlugin({
      // 分离自己写的代码中的公共模块
      name: 'manifest',
      minChunks: Infinity // 当入口文件被引用>=三次时生效
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      // 解决children:true时合并到entry chunks自身时初始加载时间过长的问题。
      // async设为true时，commons chunk 将不会合并到自身，
      // 而是使用一个新的异步的commons chunk。当这个children chunk 被下载时，
      // 自动并行下载该commons chunk
      children: true, // 所有的子模块都会被打包
      minChunks: 3 // 当入口文件被引用>3次时生效
    }),

    // copy custom static assets
    // 从static目录下复制文件到配置的相关目录下
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*'] //  忽略.开头的文件
      }
    ])
  ]
})

if (config.build.productionGzip) { // 是否用gzip压缩
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({

      // asset： 目标资源名称。 [file] 会被替换成原始资源。
      // [path] 会被替换成原始资源的路径，
      // [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
      asset: '[path].gz[query]',
      algorithm: 'gzip', // 压缩算法
      test: new RegExp( // 所有匹配该正则的资源都会被处理。默认值是全部资源。
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240, // 只有大小大于该值的资源会被处理。单位是 bytes
      minRatio: 0.8 // 只有压缩率小于这个值的资源才会被处理
    })
  )
}

if (config.build.bundleAnalyzerReport) { // 是否输出打包分析报告
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
