<template>
    <div class="comment">
        <CommentSend />
        <CommentList />
        <template v-if="next">
            <div class="noMore" style="cursor: pointer" v-show="!icon" @click.stop="loadMore">
                点击查看更多
                <i
                    style="margin-left: 4px; animation: float 2s linear infinite"
                    class="el-icon-arrow-down"
                ></i>
            </div>
            <div class="noMore" v-show="icon">
                加载中
                <i style="margin-left: 4px" class="el-icon-loading"></i>
            </div>
        </template>
        <!-- <div class="noMore" v-else style="cursor: not-allowed;">没有更多了</div> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CommentSend from './CommentSend.vue';
import CommentList from './CommentList.vue';

export default {
    name: 'Comment',
    components: {
        CommentSend,
        CommentList,
    },
    data() {
        return {
            flag: 0, // 0 一级评论展示 1 回复评论展示  控制 emoji
            icon: false,
            page: {
                currentPage: 1,
                pageSize: 5,
            },
        };
    },
    methods: {
        loadMore() {
            this.icon = true;
            this.page.currentPage += 1;
            setTimeout(() => {
                this.$store
                    .dispatch('comment/selectLoadMore', {
                        bid: this.$route.params.id,
                        page: this.page,
                    })
                    .then(res => (this.icon = false));
            }, 1000);
        },
    },
    computed: {
        ...mapGetters('comment', ['total', 'pages', 'next']),
    },
};
</script>

<style scoped>
.comment {
    width: 100%;
    height: fit-content;
}

.comment .noMore {
    text-align: center;
    color: #999;
    user-select: none;
}
</style>

<style>
.el-textarea__inner {
    resize: none;
    border-radius: 6px;
    font-size: 16px;
    background: #f4f5f7;
}

.el-textarea__inner:focus {
    background-color: #fff;
}
</style>
