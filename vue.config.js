/* vue.config.js */

const path = require('path')
const defaultSettings = require('./src/settings.js')


// 定义resolve方法，获取绝对路径
function resolve(dir) {
    return path.join(__dirname, dir);
}

const name = defaultSettings.title || 'WebApp' // page title

module.exports = {
    lintOnSave: false, //关闭语法检查},
    devServer: {
        port: 9027, // 端口号
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
    },
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
    // 一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例
    // 允许对内部的 webpack 配置进行更细粒度的修改
    chainWebpack: config => {
        // it can improve the speed of the first screen, it is recommended to turn on preload
        config.plugin('preload').tap(() => [
            {
                rel: 'preload',
                // to ignore runtime.js
                // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: 'initial'
            }
        ])

        // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete('prefetch');

        // set svg-sprite-loader
        // 配置svg默认规则排除icons目录中svg文件处理
        config.module
            .rule("svg")
            .exclude.add(resolve("src/icons"))
            .end();

        // 新增icons规则，设置svg-sprite-loader处理icons目录中svg文件
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve("src/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options(
                {
                    symbolId: "icon-[name]"
                })
            .end();

        config.module
            .rule("md")
            .test(/\.md$/)
            .use("vue-loader")
            .loader("vue-loader")
            .end()
            .use("vue-markdown-loader")
            .loader("vue-markdown-loader/lib/markdown-compiler")
            .options({
                raw: true
            });
    },

    /*  chainWebpack: config => {
         config.module
             .rule("md")
             .test(/\.md$/)
             .use("vue-loader")
             .loader("vue-loader")
             .end()
             .use("vue-markdown-loader")
             .loader("vue-markdown-loader/lib/markdown-compiler")
             .options({
                 raw: true
             });
     }, */
}