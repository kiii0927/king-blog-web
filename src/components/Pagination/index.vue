<template>
    <div :class="{ hidden: hidden }" class="pagination-container">
        <el-pagination
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            :layout="layout"
            :page-sizes="pageSizes"
            :total="total"
            v-bind="$attrs"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
        <br />
    </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to';

export default {
    name: 'Pagination',
    props: {
        total: {
            required: true,
            type: Number,
        },
        page: {
            type: Number,
            default: 1,
        },
        limit: {
            type: Number,
            default: 20,
        },
        pageSizes: {
            type: Array,
            default() {
                return [5, 10, 20, 30];
            },
        },
        /**
         * 注: 这里不在props里接收`pager-count`值,则是通过`透传 Attributes`传递给 `el-pagination`组件.
         *    你可以打印看看该属性的值(this.$attrs).
         */
        /*  可选值: 大于等于 5 且小于等于 21 的奇数
        pagerCount: {
            type: Number,
            default: 7,
        }, */
        layout: {
            type: String,
            // default: 'total, sizes, prev, pager, next, jumper',
            default: 'prev, pager, next, ->, total, sizes, jumper',
        },
        background: {
            type: Boolean,
            default: true,
        },
        autoScroll: {
            type: Boolean,
            default: true,
        },
        hidden: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        currentPage: {
            get() {
                return this.page;
            },
            set(val) {
                this.$emit('update:page', val);
            },
        },
        pageSize: {
            get() {
                return this.limit;
            },
            set(val) {
                this.$emit('update:limit', val);
            },
        },
    },
    methods: {
        handleSizeChange(val) {
            if (this.autoScroll) {
                scrollTo(0, 100);
            }
            this.$emit('pagination', { page: this.currentPage, limit: val });
        },
        handleCurrentChange(val) {
            if (this.autoScroll) {
                scrollTo(0, 100);
                // scrollSmoothTo(0);
            }
            this.$emit('pagination', { page: val, limit: this.pageSize });
        },
    },
};
</script>

<style scoped>
.pagination-container {
    background: #fff;
    margin-top: 40px;
}
.pagination-container.hidden {
    display: none;
}
</style>
