```tex
npm i vue-markdown-loader -D

npm i vue-loader vue-template-compiler -D

// 样式

npm i github-markdown-css -D

npm i highlight.js -D
```

在 vue.config.js 中配置：

```js
module.exports = {
    publicPath: './',

    chainWebpack: config => {
        config.module
            .rule('md')

            .test(/\.md/)

            .use('vue-loader')

            .loader('vue-loader')

            .end()

            .use('vue-markdown-loader')

            .loader('vue-markdown-loader/lib/markdown-compiler')

            .options({
                raw: true,
            });
    },
};
```

使用：

```vue
<template>
    <!-- class markdown-body 必须加，否则标签样式会出现问题 -->

    <div class="markdown-body">
        　　
        <markdown />
    </div>
</template>

<script>
// 引入 markdown 文件，引入后是一个组件，需要在 components 中注册

import markdown from 'xxxx.md';

// 代码高亮

import 'highlight.js/styles/github.css';

// 其他元素使用 github 的样式

import 'github-markdown-css';

export default {
    components: { markdown },
};
</script>
```

js 正则表达式获取字符串中的 URL 链接

```js
let str = 'Vue.js: https://cn.vuejs.org/';
let reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
console.log(str.match(reg)); // ['https://cn.vuejs.org/']
```
