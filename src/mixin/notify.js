export default {
    methods: {
        $_notify_info(msg) {
            this.$notify({
                title: '提示',
                message: msg,
                type: 'info'
            });
        },
        $_notify_success(msg) {
            this.$notify({
                title: '成功',
                message: msg,
                type: 'success'
            });
        },
        $_notify_warning(msg) {
            this.$notify({
                title: '警告',
                message: msg,
                type: 'warning'
            });
        },
        $_notify_error(msg) {
            this.$notify({
                title: '错误',
                message: msg,
                type: 'error'
            });
        }
    }
}