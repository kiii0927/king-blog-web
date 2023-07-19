<template>
    <!-- emoji -->
    <transition name="fade" v-on:after-leave="afterLeave">
        <!-- 下面一行代码写不写都一样,因为该函数只要可以进来 `isEmoji` 就是为 true. 该函数主要为了防止冒泡!!! -->
        <div
            class="emoji-editor"
            :class="{ 'reply-box__info-emoji-editor': isActive }"
            v-show="isEmoji"
            @click.stop="isEmoji = true"
        >
            <div class="emoji-editor__contain" :style="styleObject">
                <div
                    class="emoji-editor__contain-item"
                    v-for="(emoji, index) in emojis"
                    :key="index"
                >
                    <!-- commentContent += e -->
                    <span v-for="(e, index) in emoji" :key="index" @click="handleChangeEmoji(e)">
                        {{ e }}
                    </span>
                </div>
            </div>

            <div class="emoji-editor__nav">
                <div
                    class="emoji-editor__nav-item"
                    :class="[active == index ? '_active' : '']"
                    @click="handelEmojiNav(index)"
                    v-for="(item, index) in emojisNav"
                    :key="index"
                >
                    {{ item }}
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'WebAppEmoji',
    props: {
        flag: {
            type: Number,
            require: true,
            default: 0,
        },
    },
    watch: {
        flag: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.isActive = true;
                } else {
                    this.isEmoji = false;
                }
            },
        },
    },
    data() {
        return {
            isActive: false,
            styleObject: {
                transform: 'translateX(0%)',
            },
            active: 0,
            isEmoji: false, // 是否显示表情
            emojis: require('@/mock/json/emoji.json'),
            emojisNav: require('@/mock/json/emoji_nav.json'),
        };
    },

    created() {
        this.$bus.$on('closeEmoji', () => (this.isEmoji = false));
        this.$bus.$on('changeEmojiShow', () => (this.isEmoji = true));
    },

    methods: {
        handleChangeEmoji(emoji) {
            !this.flag
                ? this.$bus.$emit('changeEmoji', emoji)
                : this.$bus.$emit('changeEmoji2', emoji);
        },
        handleEmoji() {
            this.isEmoji = true;
        },
        handelEmojiNav(index) {
            switch (index) {
                case 0:
                    this.styleObject.transform = 'translateX(0%)';
                    break;
                case 1:
                    this.styleObject.transform = 'translateX(-100%)';
                    break;
                case 2:
                    this.styleObject.transform = 'translateX(-200%)';
                    break;
                case 3:
                    this.styleObject.transform = 'translateX(-300%)';
                    break;
                case 4:
                    this.styleObject.transform = 'translateX(-400%)';
                    break;
                case 5:
                    this.styleObject.transform = 'translateX(-500%)';
                    break;
                case 6:
                    this.styleObject.transform = 'translateX(-600%)';
                    break;
                case 7:
                    this.styleObject.transform = 'translateX(-700%)';
                    break;
            }
            this.active = index;
        },
        afterLeave(el) {
            this.$nextTick(() => {
                if (this.isActive) this.isActive = false;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.comment .reply-box__info-emoji-editor {
    bottom: 20px;
    right: 77px;
}

.emoji-editor {
    position: absolute;
    margin-top: 8px;
    width: 400px;
    overflow: hidden;
    background: #fff;
    border: 1px solid #e5e9ef;
    box-shadow: 0 11px 12px 0 rgb(106 115 133 / 30%);
    border-radius: 8px;
    user-select: none;
    box-sizing: border-box;
    z-index: 99;
}

.emoji-editor .emoji-editor__contain {
    width: 100%;
    box-sizing: border-box;
    /* 规定段落中的文本不进行换行 */
    white-space: nowrap;
    transition: all 0.3s ease-in-out;
}

.emoji-editor__contain .emoji-editor__contain-item {
    /* 将对象作为内联块级弹性伸缩盒显示 */
    display: inline-flex;
    /* flex-wrap 属性规定弹性项目是否应换行 */
    flex-wrap: wrap;
    height: 237px;
    max-height: 237px;
    overflow-y: auto;
    padding: 10px 0px 10px 20px;
    box-sizing: border-box;
}

.emoji-editor__contain .emoji-editor__contain-item span {
    display: inline-flex;
    width: 45px;
    height: 45px;
    align-items: center;
    justify-content: center;
    font-size: 23px;
    cursor: pointer;
}

.emoji-editor .emoji-editor__nav {
    width: 100%;
    background-color: #f4f4f4;
    display: flex;
    justify-content: space-between;
}

.emoji-editor__nav .emoji-editor__nav-item {
    font-size: 20px;
    padding: 8px;
    cursor: pointer;
}

.emoji-editor__nav-item._active {
    background-color: #fff;
}

.fade-enter-active {
    animation: scale-out-top 0.5s;
}

/* .fade-leave-active below version 2.1.8 */
.fade-leave-active {
    animation: scale-in-center 0.5s;
}

@keyframes scale-out-top {
    0% {
        -webkit-transform: scale(1.3);
        transform: scale(1.3);
        opacity: 0;
    }

    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes scale-in-center {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }

    100% {
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
        opacity: 0;
    }
}
</style>
