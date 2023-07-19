<template>
    <div class="slot-pl-list__t">
        <slot :messages="messages">
            <el-empty description="no data"></el-empty>
        </slot>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'MessageContentSlot',
    computed: {
        ...mapGetters('barrage', ['messageList', 'loading']),
        messages() {
            return {
                loading: this.loading,
                list: this.messageList || [],
            };
        },
    },
};
</script>

<style lang="scss" scoped></style>
