<template>
    <div class="time-line">
        <header>
            <template v-if="lineTexts.length > 0">
                <vue-typed-js
                    :strings="lineTexts"
                    :shuffle="true"
                    :loop="true"
                    :startDelay="300"
                    :typeSpeed="100"
                    :backSpeed="50"
                    @onComplete="doSmth()"
                >
                    <span class="typing"></span>
                </vue-typed-js>
            </template>
        </header>

        <div class="loading" v-if="loading" v-loading="loading"></div>

        <!-- timeline -->
        <section id="cd-timeline" class="cd-container">
            <!-- timeline-block -->
            <div class="cd-timeline-block" v-for="(item, index) in records" :key="index">
                <div class="cd-timeline-img cd-picture">
                    <img v-lazy="svgimgList[index]" />
                </div>
                <!-- cd-timeline-img -->
                <div class="cd-timeline-content">
                    <div class="cd-image">
                        <img v-lazy="item.firstPicture" />
                        <span>{{ item.title }}</span>
                    </div>
                    <p>{{ item.description }}</p>
                    <hr />
                    <el-tooltip class="item" effect="light" content="点击阅读" placement="top">
                        <a class="cd-read-more _click" @click="handleRead(item.id)">Read more</a>
                    </el-tooltip>
                    <span class="cd-date">{{ item.strCreateTime }}</span>
                </div>
            </div>

            <!-- year -->
            <!-- <div class="year">
                          {{ year }}
                        </div> -->
        </section>

        <footer>
            <el-pagination
                @current-change="handleCurrentChange"
                hide-on-single-page
                background
                layout="prev, pager, next"
                :total="total"
            />
        </footer>
    </div>
</template>

<script>
export default {
    name: 'TimeLine',
    data() {
        return {
            records: [],
            svgimgList: [
                'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-picture.svg',
                'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-movie.svg',
                'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-picture.svg',
                'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location.svg',
                'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-movie.svg',
                'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location.svg',
            ],
            lineTexts: [],
            // year: null,
            total: 0,
            pages: {
                currentPage: 1,
                pageSize: 6,
            },
            loading: false,
        };
    },
    watch: {
        records: {
            immediate: true,
            handler(val) {
                if (val.length > 0) {
                    this.$nextTick(() => {
                        this.initScroll();
                    });
                }
            },
        },
    },
    mounted() {
        this.handleInit();
        this.loadSentence();
    },
    methods: {
        initScroll() {
            var $timeline_block = $('.cd-timeline-block');
            var h = $timeline_block.height();

            //hide timeline blocks which are outside the viewport
            $timeline_block.each(function () {
                if ($(this).offset().top > $(window).scrollTop() + $(window).height()) {
                    $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
                }
                if ($(this).offset().top <= $(window).scrollTop() + $(window).height()) {
                    $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('bounce-in');
                }
            });

            //on scolling, show/animate timeline blocks when enter the viewport
            $(window).on('scroll', function () {
                $timeline_block.each(function () {
                    if (
                        $(this).offset().top <= $(window).scrollTop() + $(window).height() - 100 &&
                        $(this).find('.cd-timeline-img').hasClass('is-hidden')
                    ) {
                        $(this)
                            .find('.cd-timeline-img, .cd-timeline-content')
                            .removeClass('is-hidden')
                            .addClass('bounce-in');
                    }

                    if (
                        $(window).scrollTop() >= $(this).offset().top + $(window).height() - h ||
                        ($(this).offset().top >= $(window).scrollTop() + $(window).height() &&
                            $(this).find('.cd-timeline-img').hasClass('bounce-in'))
                    ) {
                        $(this)
                            .find('.cd-timeline-img, .cd-timeline-content')
                            .removeClass('bounce-in')
                            .addClass('is-hidden ');
                    }
                });
            });
        },
        loadSentence() {
            const jinrishici = require('jinrishici');
            this.lineTexts.length != 0 && this.lineTexts.splice(0, this.lineTexts.length);
            jinrishici.load(
                result => {
                    this.lineTexts = result.data.origin.content;
                },
                err => {
                    console.error(err);
                }
            );
        },
        doSmth() {
            this.loadSentence();
            // detail：https://github.com/Orlandster/vue-typed-js
        },
        handleInit() {
            this.$API.blog
                ?.archives(this.pages)
                .then(response => {
                    let { data, code, message } = response;
                    this.total = data.total - 0 || 0;
                    if (data.records?.length > 0) {
                        this.records = data.records;
                        // this.year = data.records?.ymd;
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.$message.error('查询失败,请重新尝试');
                });
        },
        // currentPage 改变时会触发
        handleCurrentChange(count) {
            this.loading = true;
            document.body.scrollIntoView({ behavior: 'smooth' });
            this.$nextTick(() => {
                this.pages.currentPage = count;
                this.handleInit();
            });
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },
        // 处理阅读
        handleRead(id) {
            this.$router.push(`/detail/${id}`);
        },
    },
};
</script>

<style scoped lang="scss">
/* .mark {
    height: 35px;
    margin-left: 5px;
    border-right: 2px solid white;
    animation: blink 0.6s step-end infinite;
}

@keyframes blink {
    from,
    to {
        border-color: transparent;
    }

    50% {
        border-color: white;
    }
} */

// .year {
//   position: absolute;
//   top: 0;
//   right: 0;
//   // font-size: xx-large;
//   font-size: 1.43rem;
//   color: rgba(60, 60, 67, 0.6);
// }

.loading {
    position: fixed;
    top: 0;
    width: calc(100% - 200px);
    height: 100vh;
    z-index: 100;

    // background-color: red;
}

footer {
    width: 100%;
    text-align: center;
    // margin-bottom: 20px;
}

::v-deep .el-pagination.is-background .btn-next,
::v-deep .el-pagination.is-background .btn-prev,
::v-deep .el-pagination.is-background .el-pager li {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    min-width: 40px;
    height: 40px;
    border-radius: 6px;
    line-height: 40px;
}
</style>

<style scoped lang="scss">
/* -------------------------------- 

Primary style

-------------------------------- */
a {
    color: #acb7c0;
    text-decoration: none;
}

.time-line {
    width: 100%;
    position: relative;
    height: max-content;
    min-height: 100vh;
    background-color: #e9f0f5;
    padding-bottom: 20px;
    // user-select: none;
}

/* -------------------------------- 

Modules - reusable parts of our design

-------------------------------- */
.cd-container {
    width: 90%;
    max-width: 1170px;
    margin: 0 auto;
}

.cd-container::after {
    content: '';
    display: table;
    clear: both;
}

/* -------------------------------- 

Main components 

-------------------------------- */
header {
    height: 200px;
    /* line-height: 200px; */
    text-align: center;
    background: #303e49;
    display: flex;
    align-items: center;
    justify-content: center;
}

header span,
::v-deep .typed-cursor {
    color: #ffffff;
    font-size: 1.125rem;
    font-weight: 500;
}

::v-deep .typed-cursor {
    margin-bottom: 4px;
}

@media only screen and (min-width: 1170px) {
    header {
        height: 300px;
    }

    header span,
    ::v-deep .typed-cursor {
        font-size: 1.5rem;
    }
}

#cd-timeline {
    position: relative;
    padding: 2em 0;
    margin-top: 2em;
    margin-bottom: 2em;
}

#cd-timeline::before {
    content: '';
    position: absolute;
    top: 0;
    left: 18px;
    height: 100%;
    width: 4px;
    background: #d7e4ed;
}

@media only screen and (min-width: 1170px) {
    #cd-timeline {
        margin-top: 3em;
        margin-bottom: 3em;
    }

    #cd-timeline::before {
        left: 50%;
        margin-left: -2px;
    }
}

.cd-timeline-block {
    position: relative;
    margin: 2em 0;
}

.cd-timeline-block::after {
    clear: both;
    content: '';
    display: table;
}

.cd-timeline-block:first-child {
    margin-top: 0;
}

.cd-timeline-block:last-child {
    margin-bottom: 0;
}

@media only screen and (min-width: 1170px) {
    .cd-timeline-block {
        margin: 4em 0;
    }

    .cd-timeline-block:first-child {
        margin-top: 0;
    }

    .cd-timeline-block:last-child {
        margin-bottom: 0;
    }
}

.cd-timeline-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 0 4px #ffffff, inset 0 2px 0 rgba(0, 0, 0, 0.08),
        0 3px 0 4px rgba(0, 0, 0, 0.05);
}

.cd-timeline-img img {
    display: block;
    width: 24px;
    height: 24px;
    position: relative;
    left: 50%;
    top: 50%;
    margin-left: -12px;
    margin-top: -12px;
}

.cd-timeline-img.cd-picture {
    background: #75ce66;
}

.cd-timeline-img.cd-movie {
    background: #c03b44;
}

.cd-timeline-img.cd-location {
    background: #f0ca45;
}

@media only screen and (min-width: 1170px) {
    .cd-timeline-img {
        width: 60px;
        height: 60px;
        left: 50%;
        margin-left: -30px;
        /* Force Hardware Acceleration in WebKit */
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }

    .cd-timeline-img.is-hidden {
        visibility: hidden;
    }

    .cd-timeline-img.bounce-in {
        visibility: visible;
        -webkit-animation: cd-bounce-1 0.6s;
        -moz-animation: cd-bounce-1 0.6s;
        animation: cd-bounce-1 0.6s;
    }
}

@-webkit-keyframes cd-bounce-1 {
    0% {
        opacity: 0;
        -webkit-transform: scale(0.5);
    }

    60% {
        opacity: 1;
        -webkit-transform: scale(1.2);
    }

    100% {
        -webkit-transform: scale(1);
    }
}

@-moz-keyframes cd-bounce-1 {
    0% {
        opacity: 0;
        -moz-transform: scale(0.5);
    }

    60% {
        opacity: 1;
        -moz-transform: scale(1.2);
    }

    100% {
        -moz-transform: scale(1);
    }
}

@keyframes cd-bounce-1 {
    0% {
        opacity: 0;
        -webkit-transform: scale(0.5);
        -moz-transform: scale(0.5);
        -ms-transform: scale(0.5);
        -o-transform: scale(0.5);
        transform: scale(0.5);
    }

    60% {
        opacity: 1;
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        -ms-transform: scale(1.2);
        -o-transform: scale(1.2);
        transform: scale(1.2);
    }

    100% {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
    }
}

.cd-timeline-content {
    position: relative;
    margin-left: 60px;
    background: #ffffff;
    border-radius: 0.5em;
    padding: 1em;
    box-shadow: 0 4px 4px #d7e4ed;
}

.cd-timeline-content:hover {
    box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
    outline: 1px solid #eee;
}

.cd-timeline-content::after {
    clear: both;
    content: '';
    display: table;
}

.cd-timeline-content .cd-image {
    position: relative;
    height: 220px;
}

.cd-timeline-content .cd-image span {
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #fff;
    font-size: 24px !important;
    font-weight: 300;
    padding: 25px;
}

.cd-timeline-content .cd-image {
    img {
        position: absolute;
        left: 0;
        top: 0;
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: 1s;
    }

    &:hover {
        img {
            object-position: right bottom;
        }
    }
}

.cd-timeline-content p,
.cd-timeline-content .cd-read-more,
.cd-timeline-content .cd-date {
    font-size: 13px;
    font-size: 0.8125rem;
}

.cd-timeline-content .cd-read-more,
.cd-timeline-content .cd-date {
    display: inline-block;
}

.cd-timeline-content p {
    margin: 1em 0;
    line-height: 1.5;
    height: 4.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.cd-timeline-content hr {
    margin: 1em 0;
    border: 0;
    border-top: 1px solid rgba(160, 160, 160, 0.2);
}

.cd-timeline-content .cd-read-more {
    float: right;
    padding: 0.8em 1em;
    background: linear-gradient(90deg, var(--blue-color), var(--light-color), var(--blue-color));
    background-size: 280%;
    -webkit-animation: glow 6s linear infinite;
    animation: glow 6s linear infinite;
    color: #ffffff;
    border-radius: 0.5em;
    cursor: pointer !important;
}

.cd-timeline-content .cd-date {
    float: left;
    padding: 0.8em 0;
    opacity: 0.7;
}

.cd-timeline-content::before {
    content: '';
    position: absolute;
    top: 16px;
    right: 100%;
    height: 0;
    width: 0;
    border: 7px solid transparent;
    border-right: 7px solid #ffffff;
}

@media only screen and (min-width: 768px) {
    .cd-timeline-content .cd-image span {
        font-size: 20px;
        font-size: 1.25rem;
    }

    .cd-timeline-content p {
        font-size: 16px;
        font-size: 1rem;
    }

    .cd-timeline-content .cd-read-more,
    .cd-timeline-content .cd-date {
        font-size: 14px;
        font-size: 0.875rem;
    }
}

@media only screen and (min-width: 1170px) {
    .cd-timeline-content {
        margin-left: 0;
        padding: 1.6em;
        width: 40%;
    }

    .cd-timeline-content::before {
        top: 24px;
        left: 100%;
        border-color: transparent;
        border-left-color: #ffffff;
    }

    .cd-timeline-content .cd-read-more {
        float: left;
    }

    .cd-timeline-content .cd-date {
        position: absolute;
        width: 100%;
        left: 122%;
        top: 6px;
        font-size: 16px;
        font-size: 1rem;
    }

    .cd-timeline-block:nth-child(even) .cd-timeline-content {
        float: right;
    }

    .cd-timeline-block:nth-child(even) .cd-timeline-content::before {
        top: 24px;
        left: auto;
        right: 100%;
        border-color: transparent;
        border-right-color: #ffffff;
    }

    .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-read-more {
        float: right;
    }

    .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-date {
        left: auto;
        right: 122%;
        text-align: right;
    }

    .cd-timeline-content.is-hidden {
        visibility: hidden;
    }

    /* cd-container */
    .cd-timeline-content.bounce-in {
        visibility: visible;
        -webkit-animation: cd-bounce-2 0.6s;
        -moz-animation: cd-bounce-2 0.6s;
        animation: cd-bounce-2 0.6s;
    }
}

@media only screen and (min-width: 1170px) {
    .cd-timeline-block:nth-child(even) .cd-timeline-content.bounce-in {
        -webkit-animation: cd-bounce-2-inverse 0.6s;
        -moz-animation: cd-bounce-2-inverse 0.6s;
        animation: cd-bounce-2-inverse 0.6s;
    }
}

@keyframes glow {
    to {
        background-position: 300%;
    }
}

@-webkit-keyframes cd-bounce-2 {
    0% {
        opacity: 0;
        -webkit-transform: translateX(-100px);
    }

    60% {
        opacity: 1;
        -webkit-transform: translateX(20px);
    }

    100% {
        -webkit-transform: translateX(0);
    }
}

@-moz-keyframes cd-bounce-2 {
    0% {
        opacity: 0;
        -moz-transform: translateX(-100px);
    }

    60% {
        opacity: 1;
        -moz-transform: translateX(20px);
    }

    100% {
        -moz-transform: translateX(0);
    }
}

@keyframes cd-bounce-2 {
    0% {
        opacity: 0;
        -webkit-transform: translateX(-100px);
        -moz-transform: translateX(-100px);
        -ms-transform: translateX(-100px);
        -o-transform: translateX(-100px);
        transform: translateX(-100px);
    }

    60% {
        opacity: 1;
        -webkit-transform: translateX(20px);
        -moz-transform: translateX(20px);
        -ms-transform: translateX(20px);
        -o-transform: translateX(20px);
        transform: translateX(20px);
    }

    100% {
        -webkit-transform: translateX(0);
        -moz-transform: translateX(0);
        -ms-transform: translateX(0);
        -o-transform: translateX(0);
        transform: translateX(0);
    }
}

@-webkit-keyframes cd-bounce-2-inverse {
    0% {
        opacity: 0;
        -webkit-transform: translateX(100px);
    }

    60% {
        opacity: 1;
        -webkit-transform: translateX(-20px);
    }

    100% {
        -webkit-transform: translateX(0);
    }
}

@-moz-keyframes cd-bounce-2-inverse {
    0% {
        opacity: 0;
        -moz-transform: translateX(100px);
    }

    60% {
        opacity: 1;
        -moz-transform: translateX(-20px);
    }

    100% {
        -moz-transform: translateX(0);
    }
}

@keyframes cd-bounce-2-inverse {
    0% {
        opacity: 0;
        -webkit-transform: translateX(100px);
        -moz-transform: translateX(100px);
        -ms-transform: translateX(100px);
        -o-transform: translateX(100px);
        transform: translateX(100px);
    }

    60% {
        opacity: 1;
        -webkit-transform: translateX(-20px);
        -moz-transform: translateX(-20px);
        -ms-transform: translateX(-20px);
        -o-transform: translateX(-20px);
        transform: translateX(-20px);
    }

    100% {
        -webkit-transform: translateX(0);
        -moz-transform: translateX(0);
        -ms-transform: translateX(0);
        -o-transform: translateX(0);
        transform: translateX(0);
    }
}
</style>
