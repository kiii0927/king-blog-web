<template>
    <transition
        name="animate__animated animate__bounce"
        mode="out-in"
        enter-active-class="animate__fadeIn"
        leave-active-class="animate__fadeOut"
        v-on:before-enter="beforeEnter"
        v-on:after-leave="afterLeave"
    >
        <div class="dialog" v-if="isShow">
            <div class="dialog__contain" v-clickoutside="onClickOutside">
                <div class="dialog__contain-title">提示</div>
                <div class="dialog__contain-msg">
                    {{ message }}
                </div>
                <div class="dialog__contain-btngroup">
                    <input type="button" value="取消" @click.stop="onClickOutside" />
                    <input type="button" value="确实" @click.stop="onConfirm" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'MyDialog',
    props: {
        message: {
            type: String,
            default: '确认修改吗？',
        },
        MethodName: {
            type: String,
            require: true,
            default: 'onSubmit',
        },
    },
    data() {
        return {
            isShow: false,
            isCommit: true,
        };
    },
    created() {
        this.$bus.$on('handleShowDialog', param => {
            this.isShow = true;
            this.isCommit = param;
        });
    },
    /* watch: {
        isShow(val) {
            if (val) {
                this.disabledScroll();
            } else {
                this.enableScroll();
            }
        },
    }, */
    methods: {
        onConfirm() {
            this.$bus.$emit(this.MethodName);
            this.isShow = false;
        },
        onClickOutside(event) {
            this.isShow = false;
        },
        beforeEnter(el) {
            this.$store.commit('common/SET_Z_INDEX', false);
        },
        afterLeave(el) {
            this.$nextTick(() => this.isCommit && this.$store?.commit('common/SET_Z_INDEX', true));
        },
        // disabledScroll() {
        //     document.body.style.overflow = 'hidden';
        // },
        // enableScroll() {
        //     document.body.style.overflow = 'auto';
        // },
    },
};
</script>

<style scoped lang="scss">
.dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #0006;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    animation-duration: 0.5s;

    .dialog__contain {
        position: relative;
        width: 360px;
        height: 170px;
        top: 0;
        opacity: 1;
        background-color: #fff;
        border-radius: 14px;
        overflow: hidden;
        transform: scale(0.6);
        animation: 0.4s Mydialog ease forwards;
        user-select: none;

        .dialog__contain-btngroup {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 40px;
            border-top: 1px solid #eee;

            & > input:first-child {
                border-right: 1px solid #eee;
                color: #555;
            }

            & > input:last-child {
                color: #f05671;
            }

            & > input[type='button'] {
                font-size: 14px;
                width: 50%;
                height: 100%;
                letter-spacing: 4px;
                display: inline-block;
                background: none;
                border: none;
                transition: all 0.4s ease;
                box-sizing: border-box;
                cursor: pointer;
            }
        }

        .dialog__contain-msg {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: calc(100% - 66px);
            padding: 16px;
            font-size: 16px;
            color: #555;
            box-sizing: border-box;
        }

        .dialog__contain-title {
            display: flex;
            width: 100%;
            height: 30px;
            justify-content: center;
            align-items: flex-end;
            font-size: 18px;
            color: #666;
            font-weight: 600;
        }
    }
}

@keyframes Mydialog {
    to {
        transform: scale(1);
    }
}
</style>
