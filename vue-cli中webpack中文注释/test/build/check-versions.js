'use strict'
const chalk = require('chalk')
// 可以在控制台中输出指定颜色的文字
const semver = require('semver')
// 版本控制插件
const packageConfig = require('../package.json')
// 获取package.json的内容
const shell = require('shelljs')
// 执行shell命令的插件

function exec (cmd) { // 创建子进程执行相关命令
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    // process node全局变量，描述当前node进程相关信息
    // semver.clean(data) 去除版本号中无效信息，这里去掉版本号中的v字符
    versionRequirement: packageConfig.engines.node
    // package.json中定义的所需node版本
  }
]

if (shell.which('npm')) {
  // 检查系统中是否存在这个命令，返回命令可执行文件的地址
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    // 创建子进程获取npm的版本号，这里没有v字符，所以也就不用semver来处理版本号
    versionRequirement: packageConfig.engines.npm
    // package.json中定义的所需npm版本
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    // 比对node及npm的当前版本号和所需版本号
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      // semver.satisfies(version, range) 如果版本version符合版本规则range，则返回true
      // 比如semver.satisfies(4.0.0, >=3.0.0)返回的是true
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
      // 这里如果当前版本号不符合所需版本号的规则，就定义一段报错信息存入数组
      // 当前版本号用红色，所需版本号用绿色
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }
    //在控制台打印报错信息

    console.log()
    process.exit(1)
    // 如果版本号不符合规则，就以1作为状态码结束当前进程，打包结束
  }
}
