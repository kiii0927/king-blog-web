<template>
    <SlotMessageBox>
        <!-- <template slot-scope="{ messages }"> -->
        <template v-slot="{ messages: { loading, list } }">
            <el-skeleton style="width: 100%" :loading="loading" animated :count="5">
                <template slot="template">
                    <div style="padding: 14px">
                        <div
                            style="
                                display: flex;
                                align-items: center;
                                justify-items: space-between;
                                margin-top: 16px;
                                height: 16px;
                            "
                        >
                            <!-- <el-skeleton-item
                                variant="image"
                                style="
                                    width: 75px;
                                    height: 48px;
                                    border-radius: 50%;
                                    margin-right: 7px;
                                "
                            /> -->
                            <el-skeleton-item variant="text" style="margin-right: 16px" />
                            <el-skeleton-item variant="text" style="width: 30%" />
                        </div>
                    </div>

                    <div style="padding-left: 80px">
                        <div
                            style="
                                display: flex;
                                align-items: center;
                                justify-items: space-between;
                                height: 16px;
                            "
                        >
                            <el-skeleton-item variant="text" style="margin-right: 16px" />
                            <el-skeleton-item variant="text" style="width: 30%" />
                        </div>
                    </div>
                </template>

                <!-- start render -->
                <template>
                    <div class="pl-list__t" v-for="item in list" :key="item.barrageNo">
                        <div class="list-t__comment">
                            <div class="box-t">
                                <img v-lazy="item.avatar" />
                                <div class="text">
                                    <div class="text-name">
                                        <span>{{ item.username }}</span>
                                        <div class="ip">IP: {{ item.province }}</div>
                                    </div>
                                    <div class="text-time">
                                        {{ item.createTime | formatTimeAgo }}
                                    </div>
                                </div>
                                <div class="right">
                                    <span @click.stop="openReplyBox(item)">回复</span>
                                </div>
                            </div>
                            <div class="box-val">
                                <p class="val" v-html="item.message" />
                            </div>
                        </div>

                        <template v-if="item.children || item.replyList">
                            <div
                                class="list-t__reply"
                                v-for="child in item.children || item.replyList"
                                :key="child.barrageNo"
                            >
                                <div class="box-t">
                                    <img v-lazy="child.avatar" />
                                    <div class="text">
                                        <div class="text-name">
                                            <span>{{ child.replyUsername }}</span>
                                            <div class="ip">IP: {{ child.province }}</div>
                                        </div>
                                        <div class="text-time">
                                            {{ child.createTime | formatTimeAgo }}
                                        </div>
                                    </div>
                                    <div class="right">
                                        <span @click.stop="openReplyBox(child)">回复</span>
                                    </div>
                                </div>
                                <div class="box-val">
                                    <p class="val" v-html="child.message" />
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
            </el-skeleton>
        </template>
    </SlotMessageBox>
</template>

<script>
export default {
    name: 'MessageListBox',
    components: {
        SlotMessageBox: () =>
            import('@/views/other/barrage/components/slot/MessageContentSlot.vue'),
    },
    props: {
        isReply: {
            type: Boolean,
            default: false,
        },
        replyInfo: {
            type: Object,
            default: function () {
                return {};
            },
        },
    },

    methods: {
        openReplyBox(item) {
            if (this.isReply) {
                this.$parent.isShowToast = true;
            } else {
                this.$emit('update:isReply', true);
                this.$emit('update:replyInfo', {
                    commentId: item.commentId,
                    parentCommentId: item.barrageNo,
                    replyUsername: item.replyUsername || item.username,
                    replyEmail: item.email,
                });
                this.$parent.isShowToast = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/style/mixin.scss';
.pl-list__t {
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    .list-t__reply,
    .list-t__comment {
        @include base-pl-box;
    }

    .list-t__comment {
        .box-t {
            .right {
                font-weight: 300;
                color: #5f4cea;
            }
        }
    }

    .list-t__reply {
        padding-left: 50px;
        margin-top: 25px;

        .box-t {
            width: 95%;
            .right {
                font-weight: 100;
                font-size: 14px;
            }
        }
    }

    /* &:last-child {
        border-bottom: 0;
    } */
}
</style>
