<template>
    <div class="home-content__center" ref="homeMain">
        <div class="request-list__content">
            <transition-group
                tag="div"
                name="animate__animated animate__bounce"
                enter-active-class="animate__bounceInDown"
            >
                <div class="study-lg-card" v-for="(item, index) in blogList" :key="index">
                    <div class="study-lg-card_cover">
                        <img v-lazy="item.firstPicture || firstPicture" />
                        <p>
                            <span>{{ item.name }}</span>
                            <a>{{ item.title }}</a>
                        </p>
                        <div>
                            <p>
                                {{ item.description }}
                            </p>
                        </div>
                    </div>
                    <div class="study-lg-card_footer">
                        <ul>
                            <li>
                                <i class="el-icon-date"></i>
                                <span>{{ item.createTime | formatTime }}</span>
                            </li>
                            <li>
                                <i class="el-icon-chat-dot-round"></i>
                                <span>{{ item.comments || 0 }}条评论</span>
                            </li>
                            <li>
                                <i class="el-icon-view"></i>
                                <span>{{ item.views }}次阅读</span>
                            </li>
                        </ul>
                        <div class="_read" @click="handleRead(item.id)">
                            <a>点击阅读</a>
                            <i class="el-icon-sunrise-1"></i>
                        </div>
                    </div>
                </div>
            </transition-group>
            <p v-if="loading">
                加载中
                <i style="margin-left: 4px" class="el-icon-loading"></i>
            </p>
            <p v-if="noMore && !loading">没有更多了</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { debounce } from 'lodash';
// import { scrollSmoothTo } from '@/utils';
export default {
    name: 'HomeMain',
    data() {
        return {
            firstPicture: 'https://img.wwery.com/Sugar/jEakrwwB.png',
            page: {
                currentPage: 1,
                pageSize: 2,
            }, // 分页
            loading: false,
            noMore: false,
        };
    },
    beforeMount() {
        this.handleInit();
    },
    methods: {
        handleInit() {
            this.$store.dispatch('blog/getAllAndPage', this.page);
        },
        // 滚动加载数据内容
        load: debounce(function () {
            // this.blogList.length + 1 >= this.total
            if (this.blogList.length >= this.total) {
                window.removeEventListener('scroll', this.handleScroll);
                this.loading = false;
                this.noMore = true;
            } else {
                let scrollTop =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop ||
                    window.pageYOffset;
                let dh = this.$refs.homeMain?.clientHeight;
                if (scrollTop > dh - 200) {
                    setTimeout(() => {
                        this.loading = false;
                        this.page.currentPage += 2;
                        this.handleInit();
                        // scrollSmoothTo(scrollTop + 400);
                    }, 500);
                }
            }
        }, 800),
        // 点击阅读
        handleRead(id) {
            /* this.$router.push({
              name: "BlogDetail",
              params: {
                id,
              },
            }); */
            this.$router.push(`/detail/${id}`);
            // this.$API.blog.updateViews(id);
        },
        handleScroll() {
            this.loading = true;
            this.load();
        },
    },
    computed: {
        ...mapGetters('blog', ['blogList', 'pages', 'total']),
    },
    watch: {
        $route: {
            immediate: true,
            handler(newVla, oldVal) {
                if (newVla.name !== 'Home') {
                    window.removeEventListener('scroll', this.handleScroll);
                } else {
                    this.$nextTick(() => {
                        window.addEventListener('scroll', this.handleScroll);
                    });
                }
            },
        },
    },
    beforeDestroy() {
        Object.assign(this._data, this.$options.data());
    },
};
</script>

<style scoped lang="scss"></style>
