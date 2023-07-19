<template>
    <div class="left-box">
        <div class="pl-list">
            <p class="pl-list__z">—— 收到 {{ extras.total }} 条评论 ——</p>
            <MessageListBox :isReply.sync="isReplyBox" :replyInfo.sync="replyInfo" />
            <Toast :show.sync="isShowToast" :duration="2000" text="请先关闭当前回复框~" />
        </div>
        <!-- 分页 -->
        <div class="pl-pagination" v-if="pages > 1">
            <!-- v-show="total > 0"  hide-on-single-page -->
            <Pagination
                :total="total"
                :layout="layout"
                :pager-count="5"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="pagination"
            />
        </div>

        <div class="go-login" title="点击登录" @click="goLogin" v-if="!token">
            <!-- <div class="text">未登录，可通过qq留言~</div> -->
            <div class="text">未登录，点击可进行登录~</div>
        </div>

        <CommentBox />

        <ReplyBox :isReplyBox.sync="isReplyBox" :replyInfo="replyInfo" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'LeftBox',
    components: {
        MessageListBox: () => import('./MessageListBox.vue'),
        Pagination: () => import('@/components/Pagination'), // secondary package based on el-pagination
        CommentBox: () => import('./CommentBox.vue'),
        ReplyBox: () => import('./ReplyBox.vue'),
        Toast: () => import('@/components/Toast/index.vue'),
    },
    data() {
        return {
            isShowToast: false,
            isReplyBox: false,
            replyInfo: {},
            layout: 'prev, pager, next, jumper',
            listQuery: {
                page: 1,
                limit: 5,
            },
        };
    },
    computed: {
        ...mapGetters(['token']),
        ...mapGetters('barrage', ['pages', 'total', 'extras']),
    },
    created() {
        this.getList();
    },
    methods: {
        pagination(val) {
            this.listQuery = val;
            this.getList();
        },
        getList() {
            this.$store.commit('barrage/SET_LOADING', true);
            this.$store
                .dispatch('barrage/getBarrage', {
                    currentPage: this.listQuery.page,
                    pageSize: this.listQuery.limit,
                })
                .finally(() => {
                    setTimeout(() => {
                        this.$store.commit('barrage/SET_LOADING', false);
                    }, 1000);
                });
        },
        /* go Login */
        goLogin() {
            this.$router.push('/login');
        },
    },
};
</script>

<style lang="scss" scoped>
.left-box {
    width: 75%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 6px;
    margin-right: 15px;
    box-sizing: border-box;

    .pl-list {
        position: relative;
        padding: 0 64px;
        box-sizing: border-box;

        .pl-list__z {
            text-align: center;
            padding-top: 32px;
            font-weight: 700;
        }
    }
    .pl-pagination {
        display: flex;
        justify-content: center;
    }

    .go-login {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 40px 0;

        .text {
            text-align: center;
            vertical-align: middle;
            width: 80%;
            height: 34px;
            line-height: 34px;
            background: #eee;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
        }
    }
}
</style>
