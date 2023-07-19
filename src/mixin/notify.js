export default {
    methods: {
        $notify_info(msg) {
            this.$notify({
                title: '提示',
                message: msg,
                type: 'info',
            });
        },
        $notify_success(msg) {
            this.$notify({
                title: '成功',
                message: msg,
                type: 'success',
            });
        },
        $notify_warning(msg) {
            this.$notify({
                title: '警告',
                message: msg,
                type: 'warning',
            });
        },
        $notify_error(msg) {
            this.$notify({
                title: '错误',
                message: msg,
                type: 'error',
            });
        },
    },
};
