<template>
    <div class="comment-list">
        <h3 style="color: var(--color-text-default)">评论列表</h3>
        <div class="comment-lisi-item" v-for="item in commentList" :key="item.id">
            <img v-lazy="item.avatar" />
            <div class="comment-lisi-item-contain">
                <h3>
                    {{ item.username }}
                    <template v-if="item.adminComment">
                        <svg-icon icon-class="up" style="font-size: 1.5em" />
                    </template>
                </h3>
                <!-- <div class="comment-lisi-item-text markdown-body" v-highlight
          v-html="$options.filters.strToMarkdown(item.content)">
        </div> -->
                <!-- $options.methods.strToHtml(item.content) -->
                <p class="comment-lisi-item-text" v-html="strToHtml(item.content)" />
                <!-- {{ item.content }} -->
                <!-- </p> -->
                <span>
                    {{ item.createTime }}
                    <a @click.stop="replyComment(item)" title="回复" v-if="replyDisabled(item)">
                        回复
                    </a>
                </span>
                <!-- 回复列表 -->
                <ul class="comment-list-item-child" v-if="item.replyList.length">
                    <li
                        v-for="child in item.replyList"
                        :key="child.id"
                        class="comment-list-item-child__list"
                    >
                        <img v-lazy="child.avatar" />
                        <div class="comment-list-item-child__list-content">
                            <span style="color: #6d757a">
                                <b>{{ child.username }}</b>
                                <template v-if="child.adminComment">
                                    <svg-icon icon-class="up" style="font-size: 1.5em" />
                                </template>
                            </span>
                            <span style="color: var(--color-text-muted)">&nbsp;回复&nbsp;</span>
                            <b style="color: #47a1de">@{{ child.replyUsername }}</b>
                            <span style="color: var(--color-fg-default)">
                                ：{{ child.content }}
                            </span>
                        </div>
                        <!-- replyHide -->
                        <span>
                            {{ child.createTime }}
                            <a
                                v-if="replyDisabled(child)"
                                title="回复"
                                @click.stop="replyComment(child)"
                            >
                                回复
                            </a>
                        </span>
                    </li>
                    <div class="more-reply" v-if="item.isHasMoreReply">
                        <span @click.stop="handleMoreReply(item)" v-show="!item.loadingMoreReply">
                            点击查看更多回复
                            <i
                                style="margin-left: 4px; animation: float 2s linear infinite"
                                class="el-icon-arrow-down"
                            ></i>
                        </span>
                        <span v-show="item.loadingMoreReply">
                            正在加载中
                            <i style="margin-left: 4px" class="el-icon-loading"></i>
                        </span>
                    </div>
                </ul>
            </div>
        </div>
        <!-- 回复评论框 -->
        <!-- v-if="isReplyBox" -->
        <commentReplyBox
            v-if="isReplyBox"
            :isShow="isShow"
            :replyContent="replyContent"
            :replyUsername="username"
        />
    </div>
</template>

<script>
import notify from '@/mixin/notify';
import { mapGetters } from 'vuex';
import { debounce } from 'lodash';
// import 'highlight.js/styles/github.css';
// 其他元素使用 github 的样式
// import 'github-markdown-css/github-markdown.css';

export default {
    name: 'CommentList',
    components: {
        commentReplyBox: () => import('./commentReplyBox.vue'),
    },
    mixins: [notify],
    // filters: {
    //     /**
    //      * @description 字符串转Markdown
    //      * @param {*} str
    //      * @returns Markdown
    //      */
    //     strToMarkdown(str) {
    //         let MarkdownIt = require('markdown-it'),
    //             md = new MarkdownIt();
    //         return md.render(str);
    //     },
    // },
    data() {
        return {
            username: '',
            isReplyBox: false,
            isShow: false,
            parentCommentId: undefined,
            commentId: undefined,
            replyContent: {},
        };
    },
    beforeMount() {
        this.$store.dispatch('comment/select', {
            bid: this.$route.params.id,
            page: this.$parent.page,
        });
    },
    methods: {
        /**
         * 将url连接转为a标签
         *  1 获取到url字符串
         *  2 转为a标签
         */
        strToHtml(v) {
            let reg =
                /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
            let str = v.match(reg);
            return v.replace(reg, `<a href="${str}" target="_blank">${str}</a>`);
        },
        replyDisabled(item) {
            // console.log(item);
            // this.uId !== 0
            return this.uId && item?.userId != this.uId;
        },
        // 回复函数
        replyComment(comments) {
            // 第一种方式, 滚动到评论内容进行回复评论
            // this.$bus.$emit("replyComment", comments);
            // 第二种方式, 升起一个新的回复评论框
            /* if (!this.isReplyBox) {
                this.isReplyBox = true;
                // 第一次点击 $no $emit 未能监听到
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$bus.$emit('produceReplyContent', {
                            receiverId: comments.userId,
                            originalContent: comments.content,
                        });
                    }, 100);
                });
            } else {
                this.$nextTick(() => {
                    this.$bus.$emit('produceReplyContent', {
                        receiverId: comments.userId,
                        originalContent: comments.content,
                    });
                });
            } */

            (this.isReplyBox = true),
                (this.replyContent = {
                    receiverId: comments.userId,
                    originalContent: comments.content,
                }),
                (this.commentId = comments.commentId),
                (this.parentCommentId = comments.id),
                (this.username =
                    comments?.nickname || comments?.childNickname || comments?.username),
                (this.isShow = true);
            // console.log(comments);
        },
        /* 处理查看更多回复 */
        handleMoreReply: debounce(function (item) {
            item.loadingMoreReply = true;
            // 拿到数组最后一个元素的创建时间
            let dateTime = item.replyList?.at(-1)?.createTime;
            setTimeout(() => {
                this.$store
                    .dispatch('comment/selectMoreReply', {
                        commentId: item.commentId,
                        pageSize: 10,
                        dateTime,
                    })
                    .then(response => {
                        if (response) {
                            item.loadingMoreReply = false;
                        }
                    });
            }, 800);
        }, 100),
    },
    computed: {
        ...mapGetters('comment', ['commentList', 'total', 'pages']),
        ...mapGetters(['uId']),
    },
};
</script>

<style scoped>
.comment-list {
    width: 100%;
    overflow: hidden;
    padding: 15px;
    margin-top: 40px;
    box-sizing: border-box;
}

.comment-lisi-item {
    width: 100%;
    margin-top: 20px;
    overflow: hidden;
    border-bottom: 1px solid #eee;
}

.comment-lisi-item > img {
    cursor: pointer;
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.comment-lisi-item .comment-lisi-item-contain {
    float: right;
    padding-bottom: 12px;
    width: calc(100% - 65px);
    box-sizing: border-box;
}

.comment-lisi-item-contain > h3 {
    color: var(--color-text-muted);
    font-weight: 600;
}

.comment-lisi-item-contain .comment-lisi-item-text {
    font-size: 16px;
    line-height: 25px;
    color: var(--color-fg-default);
}

.comment-lisi-item-contain > span {
    color: #99a2aa;
    font-size: 14px;
}

.comment-lisi-item-contain > span > a {
    margin-left: 10px;
    cursor: pointer;
}

.comment-lisi-item-contain .comment-list-item-child {
    width: 100%;
    padding-top: 6px;
    box-sizing: border-box;
}

.comment-list-item-child .more-reply {
    font-size: 13px;
    font-weight: 400;
    color: #9499a0;
    cursor: pointer;
}

.comment-list-item-child .more-reply > span {
    /* text-indent: 8px; */
    padding-left: 8px;
}

.comment-list-item-child .comment-list-item-child__list {
    margin: 12px 0px;
    width: 100%;
}

.comment-list-item-child .comment-list-item-child__list:last-child {
    margin: 0;
}

.comment-list-item-child__list img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    vertical-align: top;
    margin-right: 8px;
    cursor: pointer;
    display: inline-block;
}

.comment-list-item-child__list .comment-list-item-child__list-content {
    display: inline-block;
    width: fit-content;
    margin-top: 4px;
}

.comment-list-item-child__list > span {
    margin-top: 5px;
    font-size: 14px;
    display: block;
    color: #99a2aa;
}

.comment-list-item-child__list > span > a {
    margin-left: 10px;
    cursor: pointer;
}
</style>

<style>
.comment-lisi-item-contain .comment-lisi-item-text > a:hover {
    text-decoration: underline;
}
</style>
