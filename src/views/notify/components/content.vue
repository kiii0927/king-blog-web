<template>
    <div
        class="notify-container"
        ref="notify_container"
        v-loading="loading"
        element-loading-background="transparent"
    >
        <div class="notify-content" v-if="contentlList.length" v-show="!loading">
            <template v-for="(item, index) in contentlList">
                <div :class="itemClass" :key="item.id || item.source">
                    <div class="left-box">
                        <img v-lazy="item.avatar" />
                    </div>
                    <div class="center-box">
                        <div class="line-1">
                            <span class="name-field">
                                <a :title="item.name || item.replyUsername">
                                    {{ item.name || item.replyUsername }}
                                </a>
                            </span>

                            <span v-if="isReply">回复了你的评论</span>
                            <span v-if="isLike">赞了我的评论</span>
                        </div>
                        <div class="line-2">
                            <span class="reply" v-if="isReply">{{ item.replyContent }}</span>
                        </div>
                        <div class="line-3">
                            <span class="time-field">{{ item.time }}</span>
                            <div class="action-field">
                                <template v-if="isReply">
                                    <button class="action-button">
                                        <svg-icon icon-class="reply" class="action-icon" />
                                        回复
                                    </button>
                                    <button class="action-button">
                                        <svg-icon icon-class="like" class="action-icon" />
                                        点赞
                                    </button>
                                    <button class="action-button node-button">
                                        <svg-icon icon-class="del" class="action-icon" />
                                        删除该通知
                                    </button>
                                </template>
                                <template v-if="isLike">
                                    <button class="action-button node-button">
                                        <svg-icon icon-class="del" class="action-icon" />
                                        删除该通知
                                    </button>
                                    <button class="action-button node-button">
                                        <svg-icon icon-class="not" class="action-icon" />
                                        不再通知
                                    </button>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="right-box">
                        <p class="text-box">{{ item.originalContent }}</p>
                    </div>
                </div>
                <div class="divider" :key="index" />
            </template>
        </div>
        <el-empty :image-size="250" v-show="!loading" v-else></el-empty>
    </div>
</template>

<script>
export default {
    name: 'SlotContent',
    props: {
        isReply: {
            type: Boolean,
            default: false,
        },
        isLike: {
            type: Boolean,
            default: false,
        },
        isAttention: {
            type: Boolean,
            default: false,
        },
        contentlList: {
            type: Array,
            default: () => {
                return [];
            },
            required: true,
        },
        itemClass: {
            type: String,
            default: 'reply-item',
        },
    },
    data() {
        return {
            loading: true,
        };
    },
    watch: {
        contentlList: {
            immediate: true,
            handler(val) {
                this.$nextTick(() => {
                    if (val.length <= 0) {
                        this.$refs.notify_container?.style.setProperty('--progress', '0px');
                    } else
                        val.length >= 7
                            ? this.$refs.notify_container?.style.setProperty('--progress', '16px')
                            : this.$refs.notify_container?.style.setProperty('--progress', '8px');

                    setTimeout(() => {
                        this.loading = false;
                    }, 1000);
                });
            },
        },
    },
};
</script>

<style lang="scss" scoped>
@mixin base-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    padding-top: 24px;
    padding-bottom: 24px;
    position: relative;
    cursor: pointer;

    &:hover {
        & .node-button {
            display: inline-block !important;
        }
    }

    .right-box {
        min-width: 60px;
        margin: -7px 0;
        max-height: 4.3em;

        .text-box {
            width: 60px;
            height: 60px;
            color: #999;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            font-size: 14px;
            // line-height: 15px;
            line-height: 1.2rem;
        }
    }

    .center-box {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;

        .line-3 {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -ms-flex-direction: row;
            flex-direction: row;
            -webkit-box-pack: start;
            -ms-flex-pack: start;
            justify-content: flex-start;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            color: #999;
            font-size: 12px;
            line-height: 22px;
            user-select: none;

            .time-field {
                margin: 0 15px 0 0;
            }

            .action-field {
                .action-icon {
                    width: 16px;
                    height: 15px;
                    vertical-align: text-bottom;
                }

                .node-button {
                    display: none;

                    svg {
                        fill: none;
                        stroke: currentcolor;
                    }
                }

                .action-button {
                    cursor: pointer;
                    margin-right: 14px;
                    color: inherit;
                }

                button {
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
                    outline: 0;
                    padding: 0;
                    margin: 0;
                    border: 0;
                    background-color: transparent;
                }
            }
        }

        .line-2 {
            margin-bottom: 10px;
            margin-right: 14px;
            font-size: 14px;
            color: #222;
            line-height: 18px;
            overflow: hidden;
            display: -webkit-box;
            max-height: 2.6em;

            .reply {
                text-overflow: ellipsis;
                word-break: break-word;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }

        .line-1 {
            // color: #505050;
            color: #222;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: row;
            flex-direction: row;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-bottom: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            font-size: 14px;
            line-height: 15px;
            max-height: 4.3em;
            user-select: none;

            .name-field {
                margin-right: 8px;
                font-weight: bold;
                cursor: pointer;
            }
        }
    }

    .left-box {
        width: 60px;
        height: 46px;
        -ms-flex-negative: 0;
        // flex-shrink: 0;
        cursor: pointer;

        img {
            width: 46px;
            height: 100%;
            border-radius: 50%;
            transition: 0.3s;

            &:hover {
                transform: scale(1.1);
            }
        }
    }
}

.notify-container {
    --progress: 8px;
    width: calc(100% + var(--progress));
    height: calc(100vh - 66px);
    overflow-y: auto;

    .notify-content {
        // padding: 24px 16px;
        padding: 24px 16px 0 16px;
        margin-right: 8px;
        margin-bottom: 20px;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
        box-sizing: border-box;
        .divider {
            &:last-child {
                display: none;
            }

            display: block;
            width: calc(100% - 44px);
            height: 1px;
            border-bottom: 1px solid #e5e9ef;
            position: relative;
            left: 60px;
        }

        .reply-item:first-child,
        .like-item:first-child {
            padding-top: 0;
        }
        .reply-item:last-child,
        .like-item:last-child {
            padding-bottom: 0;
        }

        .like-item {
            &:hover {
                & .action-button {
                    display: inline-block !important;
                }
            }
            .action-button {
                display: none;
            }
        }

        .reply-item,
        .like-item {
            @include base-item;
        }
    }
}
</style>
