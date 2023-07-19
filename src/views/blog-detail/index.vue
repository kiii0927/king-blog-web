<template>
    <div class="blogdetail" @click="handleEmoji" v-if="blogs">
        <!-- <Waveform :isShow="isWaveformShow" /> -->
        <!-- v-if="!isWaveformShow" -->
        <div class="blogdetail__container">
            <transition
                v-on:enter="enter"
                v-on:leave="leave"
                v-on:after-enter="afterEnter"
                appear
                v-bind:css="false"
            >
                <div class="blogdetail-bg">
                    <img :src="bgimg" />
                </div>
            </transition>

            <transition
                name="animate__animated animate__bounce"
                enter-active-class="animate__fadeInUpBig"
                leave-active-class="animate__fadeOutDown"
                mode="in-out"
                v-on:after-enter="afterEnter2"
            >
                <div class="blogdetail-content" v-show="view">
                    <LeftVue :show="otherShow" />

                    <div class="bdc__container">
                        <!-- header -->
                        <ContenHeader :headers="headers" v-if="isMount" />

                        <!-- md -->
                        <div
                            v-highlight
                            v-html="article"
                            class="markdown-body"
                            ref="article"
                            style="margin-bottom: 80px"
                        ></div>

                        <!-- comment -->
                        <Comment v-if="isMount" />
                    </div>

                    <RightVue :article="article" />
                </div>
            </transition>

            <transition
                name="animate__animated animate__bounce"
                mode="in-out"
                enter-active-class="animate__bounceInRight"
            >
                <div
                    class="break-page"
                    @click="handleBackPage"
                    title="点击回到上一页"
                    v-show="otherShow"
                >
                    <i class="el-icon-arrow-left"></i>
                </div>
            </transition>

            <transition
                name="animate__animated animate__bounce"
                mode="in-out"
                enter-active-class="animate__fadeIn"
            >
                <footer class="bottom-deck" v-show="otherShow"></footer>
            </transition>

            <BacktopVue v-if="view" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LeftVue from './BlogLeft.vue';
import RightVue from './BlogRight.vue';

import 'highlight.js/styles/github.css';
// 其他元素使用 github 的样式
import 'github-markdown-css/github-markdown.css';

export default {
    name: 'BlogDetail',
    components: {
        LeftVue,
        RightVue,
        ContenHeader: () => import('./ContenHeader.vue'),
        Waveform: () => import('@/components/Waveform'), // 波形切换组件
        Comment: () => import('./comment/index.vue'), // 评论组件
        BacktopVue: () => import('@/components/Backtop.vue'), // 返回顶部组件
    },
    data() {
        return {
            view: false, // 控制返回顶部组件显示 or 隐藏
            isWaveformShow: true, // 控制波形切换组件显示 or 隐藏
            otherShow: false,
            article: '',
            bgimg: '',
            headers: {},
            isMount: false, // 控制文章头部组件显示 or 隐藏
        };
    },
    // beforeDestroy() {
    //   // Object.assign(this._data, this.$options.data());
    // },
    created() {
        this.$store.dispatch('blog/getBlogDetail', this.$route.params.id).then(response => {
            if (response) {
                this.bgimg = this.blogs?.firstPicture;
                this.headers = {
                    tag: this.blogs?.name,
                    title: this.blogs?.title,
                    views: this.blogs?.views,
                    comments: this.blogs?.comments,
                    createTime: this.blogs?.createTime,
                    type: this.blogs?.type,
                };
                var MarkdownIt = require('markdown-it'),
                    md = new MarkdownIt();
                var result = md.render(this.blogs?.content);
                this.article = result;
            }
        });
    },
    mounted() {},
    methods: {
        handleEmoji() {
            this.$bus.$emit('closeEmoji');
        },
        handleBackPage() {
            this.$router.back();
        },
        /* transition methods */
        enter(el, done) {
            // let dh = this.$refs.blog.offsetHeight;
            const tl = new TimelineMax({
                onComplete: done,
            });

            tl.set(el, {
                y: window.innerWidth * 1.5,
                scale: 0.8,
                transformOrigin: '50% 50%',
            });

            tl.to(el, 0.5, {
                y: 0,
                ease: Power4.easeOut,
            });

            tl.to(el, 1, {
                scale: 1,
                ease: Power4.easeOut,
            });
        },
        afterEnter() {
            this.$nextTick(() => {
                this.view = true;
            });
        },
        leave(el, done) {
            TweenMax.to(el, 1, {
                y: window.innerHeight * -1.5,
                ease: Power4.easeOut,
                onComplete: done,
            });
            this.view = false;
        },
        afterEnter2(el) {
            this.$nextTick(() => {
                this.otherShow = true;
                this.isMount = true;
            });
        },
    },
    computed: {
        ...mapGetters('blog', ['blogs']),
    },
};
</script>

<style scoped>
.blogdetail {
    position: relative;
    width: 100%;
    height: 100%;
}
.blogdetail__container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0px 400px;
    box-sizing: border-box;
}

.blogdetail-bg {
    position: fixed;
    top: 0;
    right: 0;
    width: calc(100% - 200px);
    height: 100%;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    overflow: hidden;
}

.blogdetail-bg:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    transition: all 0.6s;
    background: rgba(220, 212, 212, 0.54);
}

.blogdetail-bg img {
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0.5;
}

.blogdetail-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 80px;
}

.blogdetail-content .bdc__container {
    width: 48%;
    margin: 0 60px;
    /* background-color: var(--color-canvas-default); */
    background-color: var(--color-canvas-subtle);
    padding: 30px 40px 15px 40px;
    border-radius: 20px;
}

.blogdetail .break-page {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 800;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background: #fff;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    color: #394048;
    cursor: pointer;
    user-select: none;
    transition: all 0.25s;
    box-shadow: 0 2px 10px #00000040;
}

.blogdetail .break-page:hover {
    width: 80px;
}

.blogdetail .break-page > i {
    padding-left: 2px;
    font-size: 30px;
}

.blogdetail .bottom-deck {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    z-index: 3;
    background: url(~@/assets/sketch-bottom.png) repeat center bottom;
    transform: rotateX(180deg);
    background-size: auto 100%;
}
</style>

<style scoped lang="scss">
/* markdown 高亮 */
::v-deep .hljs-name {
    color: #22863a;
}

::v-deep .hljs-attr {
    color: #6f42c1;
}

::v-deep .hljs-keyword {
    color: red;
}

::v-deep .hljs-string {
    color: #eaeaeb;
}

::v-deep .markdown-body {
    background-color: transparent;
    /* min-height: 525px; */
}

::v-deep .markdown-body .hljs {
    overflow: visible !important;
}

::v-deep .hljs-meta .hljs-string,
::v-deep .hljs-regexp,
::v-deep .hljs-string {
    color: #5f87b5 !important;
}

::v-deep .markdown-body .highlight pre::before,
::v-deep .markdown-body pre::before {
    content: '1\A 2\A 3\A 4\A 5\A 6\A 7\A 8\A 9\A 10\A 11\A 12\A 13\A 14\A 15\A 16\A 17\A 18\A 19\A 20\A 21\A 22\A 23\A 24\A 25\A 26\A 27\A 28\A 29\A 30\A 31\A 32\A 33\A 34\A 35\A 36\A 37\A 38\A 39\A 40\A 41\A 42\A 43\A 44\A 45\A 46\A 47\A 48\A 49\A 50\A 51\A 52\A 53\A 54\A 55\A 56\A 57\A 58\A 59\A 60\A 61\A 62\A 63\A 64\A 65\A 66\A 67\A 68\A 69\A 70\A 71\A 72\A 73\A 74\A 75\A 76\A 77\A 78\A 79\A 80\A 81\A 82\A 83\A 84\A 85\A 86\A 87\A 88\A 89\A 90\A 91\A 92\A 93\A 94\A 95\A 96\A 97\A 98\A 99\A 100\A 101\A 102\A 103\A 104\A 105\A 106\A 107\A 108\A 109\A 110\A 111\A 112\A 113\A 114\A 115\A 116\A 117\A 118\A 119\A 120\A 121\A 122\A 123\A 124\A 125\A 126\A 127\A 128\A 129\A 130\A 131\A 132\A 133\A 134\A 135\A 136\A 137\A 138\A 139\A 140\A 141\A 142\A 143\A 144\A 145\A 146\A 147\A 148\A 149\A 150\A 151\A 152\A 153\A 154\A 155\A 156\A 157\A 158\A 159\A 160\A 161\A 162\A 163\A 164\A 165\A 166\A 167\A 168\A 169\A 170\A 171\A 172\A 173\A 174\A 175\A 176\A 177\A 178\A 179\A 180\A 181\A 182\A 183\A 184\A 185\A 186\A 187\A 188\A 189\A 190\A 191\A 192\A 193\A 194\A 195\A 196\A 197\A 198\A 199\A 200\A 201\A 202\A 203\A 204\A 205\A 206\A 207\A 208\A 209\A 210\A 211\A 212\A 213\A 214\A 215\A 216\A 217\A 218\A 219\A 220\A 221\A 222\A 223\A 224\A 225\A 226\A 227\A 228\A 229\A 230\A 231\A 232\A 233\A 234\A 235\A 236\A 237\A 238\A 239\A 240\A 241\A 242\A 243\A 244\A 245\A 246\A 247\A 248\A 249\A 250\A 251\A 252\A 253\A 254\A 255\A 256\A 257\A 258\A 259\A 260\A 261\A 262\A 263\A 264\A 265\A 266\A 267\A 268\A 269\A 270\A 271\A 272\A 273\A 274\A 275\A 276\A 277\A 278\A 279\A 280\A 281\A 282\A 283\A 284\A 285\A 286\A 287\A 288\A 289\A 290\A 291\A 292\A 293\A 294\A 295\A 296\A 297\A 298\A 299\A 300\A 301\A 302\A 303\A 304\A 305\A 306\A 307\A 308\A 309\A 310\A 311\A 312\A 313\A 314\A 315\A 316\A 317\A 318\A 319\A 320\A 321\A 322\A 323\A 324\A 325\A 326\A 327\A 328\A 329\A 330\A 331\A 332\A 333\A 334\A 335\A 336\A 337\A 338\A 339\A 340\A 341\A 342\A 343\A 344\A 345\A 346\A 347\A 348\A 349\A 350\A 351\A 352\A 353\A 354\A 355\A 356\A 357\A 358\A 359\A 360\A 361\A 362\A 363\A 364\A 365\A 366\A 367\A 368\A 369\A 370\A 371\A 372\A 373\A 374\A 375\A 376\A 377\A 378\A 379\A 380\A 381\A 382\A 383\A 384\A 385\A 386\A 387\A 388\A 389\A 390\A 391\A 392\A 393\A 394\A 395\A 396\A 397\A 398\A 399\A 400\A 401\A 402\A 403\A 404\A 405\A 406\A 407\A 408\A 409\A 410\A 411\A 412\A 413\A 414\A 415\A 416\A 417\A 418\A 419\A 420\A 421\A 422\A 423\A 424\A 425\A 426\A 427\A 428\A 429\A 430\A 431\A 432\A 433\A 434\A 435\A 436\A 437\A 438\A 439\A 440\A 441\A 442\A 443\A 444\A 445\A 446\A 447\A 448\A 449\A 450\A 451\A 452\A 453\A 454\A 455\A 456\A 457\A 458\A 459\A 460\A 461\A 462\A 463\A 464\A 465\A 466\A 467\A 468\A 469\A 470\A 471\A 472\A 473\A 474\A 475\A 476\A 477\A 478\A 479\A 480\A 481\A 482\A 483\A 484\A 485\A 486\A 487\A 488\A 489\A 490\A 491\A 492\A 493\A 494\A 495\A 496\A 497\A 498\A 499\A';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    overflow: hidden;
    background: #4f4f50;
    color: #999;
    width: 30px;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
}

::v-deep .markdown-body .highlight pre,
::v-deep .markdown-body pre {
    position: relative;
    padding: 22px 25px 22px 40px !important;
    overflow: hidden !important;
    border-radius: 12px !important;
    background-color: #282c34 !important;
}

::v-deep .markdown-body pre code,
::v-deep .markdown-body pre tt {
    color: #eaeaeb;
    font-size: 16px;
}
</style>

<style>
.markdown-body p {
    font-size: 18px;
    font-weight: 500;
}

.markdown-body li {
    list-style-type: disc;
}
</style>
