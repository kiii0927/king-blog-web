<template>
    <div class="notify-reply">
        <!-- <p class="notify-reply__title">回复我的</p>
        <el-divider /> -->
        <ReplyTitle title="回复我的" />

        <NotifyContent
            :contentlList="replyList"
            :isReply="true"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
            infinite-scroll-immediate="false"
        />
    </div>
</template>

<script>
import { arrObjUnique } from '@/utils';
import { mapGetters } from 'vuex';
export default {
    name: 'NotifyReply',
    components: {
        ReplyTitle: () => import('@/views/notify/components/head.vue'),
        NotifyContent: () => import('@/views/notify/components/content.vue'),
    },

    data() {
        return {
            forbidden: false,
            replyList: [],
            // 请求参数
            params: {
                topic: 'reply',
                lastId: new Date().getTime(),
                offset: 0,
            },
        };
    },

    beforeMount() {
        !this.$parent.dots?.reply && this.getReplyMessage();
    },

    activated() {
        // console.log('reply activated...');
        if (this.$parent.dots?.reply) {
            (this.params.lastId = new Date().getTime()),
                (this.params.offset = 0),
                this.getReplyMessage(),
                this.$store.commit('message/SET_DOTS_SINGLE', { name: 'reply', data: false });
        }
    },
    /* deactivated() {
        console.log('reply deactivated...');
    }, */
    computed: {
        ...mapGetters(['uId']),
        ...mapGetters('message', ['scrollResult', 'noMore']),

        disabled() {
            return this.noMore || this.forbidden;
        },
    },

    methods: {
        getReplyMessage() {
            this.$store
                .dispatch('message/getMessage', {
                    uId: this.uId,
                    type: 'user',
                    paramObj: this.params,
                })
                .then(response => {
                    const { data } = response;
                    if (data && data.list) {
                        // 合并(去重)数组
                        this.replyList = arrObjUnique(
                            [...this.replyList, ...data.list] || this.replyList.concat(data.list)
                        );
                        this.params.lastId = data.minTime;
                        // if (!this.params.lastId) {
                        //     this.params.lastId = new Date().getTime();
                        // }
                        this.params.offset = data.offset;
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.forbidden = true;
                });
        },
        load() {
            // console.log('load...');
            setTimeout(() => {
                this.getReplyMessage();
            }, 100);
        },
    },
    /* beforeRouteEnter(to, from, next) {
        next(vm => {

        });
    }, */
    beforeDestroy() {
        Object.assign(this._data, this.$options.data());
    },
};
</script>

<style lang="scss" scoped>
.notify-reply {
    width: 100%;
}
</style>
