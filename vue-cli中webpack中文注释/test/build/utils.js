'use strict'
const path = require('path')
// 引入node的path模块
const config = require('../config')
// 引入../config/index.js文件
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 将所有的入口 chunk(entry chunks)中的指定内容移动到独立的文件中
const packageConfig = require('../package.json')
// 引入package.json配置

exports.assetsPath = function (_path) {
  // 根据环境变量判断当前是否是生产环境，
  // 依此来输出静态资源的二级目录
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
  // path.json 使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径
  // path.posix 跨平台兼容
}

exports.cssLoaders = function (options) {
  // 输出cssLoader相关配置
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    // 处理css模块
    options: {
      sourceMap: options.sourceMap // sourcceMap配置
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    // 可以直接给css样式添加浏览器前缀
    options: {
      sourceMap: options.sourceMap // sourcceMap配置
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    // options中配置了使用postcss就使用cssloader和postcssloader，否则只用cssloader

    if (loader) {
      // 加载loader类型相对应的解析loader来解析loader类型的样式
      // 比如less，sass
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      // 是否把.vue文件中的样式单独提取出来合并成文件
      return ExtractTextPlugin.extract({
        use: loaders,
        // 采用loaders中配置的loader去编译样式
        fallback: 'vue-style-loader'
        // 用vue-style-loader提取.vue文件中的样式
      })
    } else {
      // 直接返回样式的相关处理loader配置
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    //  indentedSyntax: true  启用语法缩进
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  // 处理import方式导入的样式文件的打包
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  // 输出一个数组，保存了对不同后缀名的样式文件采用不同的loader
  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')
  // node-notifier是一个系统级通知插件
  // 可以用系统原生方法推送消息

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      // 推送信息
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
