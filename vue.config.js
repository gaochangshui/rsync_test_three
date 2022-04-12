const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const defaultSettings = require('./src/settings.js')
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
const name = defaultSettings.title || 'vue Admin Template'
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  devServer: {
    // host: 'localhost',
    port: 8000, // 端口号
    proxy: {
      //配置自动启动浏览器
      "/actionapi": {
        target: "https://code.trechina.cn/gitlabmanager",
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          '^/actionapi': '/actionapi'
        }
      }
    }
  },
  chainWebpack: config => {
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/assets/icons')) //处理svg目录（根据你建的文件路径）
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
})
