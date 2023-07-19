/* vue.config.js */

const path = require('path');
const defaultSettings = require('./src/settings.js');

// 定义resolve方法，获取绝对路径
function resolve(dir) {
    return path.join(__dirname, dir);
}

const name = defaultSettings.title || 'WebApp'; // page title

module.exports = {
    lintOnSave: false, //关闭语法检查
    assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    devServer: {
        port: 9027, // 端口号
        open: true,
        overlay: {
            warnings: false,
            errors: true,
        },
        // 配置代理
        proxy: {
            '/api': {
                //表示拦截以/api开头的请求路径
                target: `http://${defaultSettings.serverSide}`, // 后端端口地址
                changeOrigin: true, //是否开启跨域
                ws: true, // 用于支持websocket; 默认true
                pathRewrite: { '^/api': '' }, // 重写api，把api变成空字符，因为我们真正请求的路径是没有api的
                /* pathRewrite: {
                    '^/api': '', // 重写api，把api变成空字符，因为我们真正请求的路径是没有api的
                }, */
            },
            // '/message': {
            //     target: 'http://localhost:2304',
            //     changeOrigin: true,
            //     ws: true,
            //     pathRewrite: { '^/message': '/v1' },
            // },
        },
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        },
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
                include: 'initial',
            },
        ]);

        // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete('prefetch');

        // set svg-sprite-loader
        // 配置svg默认规则排除icons目录中svg文件处理
        config.module.rule('svg').exclude.add(resolve('src/icons')).end();

        // 新增icons规则，设置svg-sprite-loader处理icons目录中svg文件
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            })
            .end();

        // config.module
        //     .rule('md')
        //     .test(/\.md$/)
        //     .use('html-loader')
        //     .loader('html-loader')
        //     .end()
        //     .use('markdown-loader')
        //     .loader('markdown-loader')
        //     .end();
    },
};
