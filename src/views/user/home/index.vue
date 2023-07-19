<template>
    <div id="user-home">
        <div class="user-home__block">
            <p>你的看板干干净净的(⊙o⊙)…</p>
            <!-- <input type="text" placeholder="你的看板干干净净的(⊙o⊙)…"> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserName',
    // props: {
    //     users: {
    //         type: Object,
    //         require: true,
    //         default: function () {
    //             return {};
    //         }
    //     }
    // }
};
</script>

<style scoped lang="scss">
#user-home {
    position: relative;
    width: 100%;
    padding: 20px 0;

    .user-home__block {
        padding: 6px;
        border: 1px solid #d0d7de;
        border-radius: 4px;
        height: 105px;

        p,
        input {
            color: #00000052;
            font-size: 14px;
            line-height: 12;
            user-select: none;
        }

        input {
            background: none;
            outline: none;
            border: none;
        }
    }
}
</style>
