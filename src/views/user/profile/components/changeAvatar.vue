<template>
    <div class="avatar-cropper">
        <div class="avatar-cropper-contain">
            <span class="_close el-icon-close" @click.stop="handleClose"></span>
            <p class="_title">头像上传</p>
            <div class="_aside" @click.stop="handleAvatarDialog">
                <span>确定</span>
            </div>
            <MyDialog message="确定修改头像吗？" MethodName="onUpdateAvatar"></MyDialog>
            <div class="_cropper">
                <input
                    type="file"
                    name="file"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    ref="file"
                    @change="handleAddFile($event)"
                />
                <img :src="avatar" v-if="!item.src" name="1111" />
                <img :src="item.src" v-else name="222" />
            </div>
            <div class="_tip">
                *单击圆选择图片，选择后，鼠标滚轮缩放图片，左键按住可拖动图片位置
            </div>
            <div class="_tools">
                <span @click="handleMiddlefile">重新上传</span>
                <ul>
                    <li class="el-icon-refresh-right" title="旋转"></li>
                    <li class="el-icon-refresh" title="重置缩放"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChangeAvatar',
    data() {
        return {
            clickUpdate: false,
            file: null,
            item: {},
        };
    },
    props: {
        avatar: {
            type: String,
            require: true,
            default: 'https://img.wwery.com/Sugar/GbdeNndT.jpg',
        },
        token: {
            type: String,
            require: true,
            default: '',
        },
    },
    components: {
        MyDialog: () => import('@/components/MyDialog.vue'),
    },
    created() {
        this.$bus.$on('onUpdateAvatar', this.handleChangeAvatar);
    },
    beforeMount() {
        this.$store.commit('common/SET_Z_INDEX', false);
    },
    destroyed() {
        this.$store.commit('common/SET_Z_INDEX', true);
    },
    methods: {
        handleClose() {
            this.$parent.changeAvatar = false;
        },
        handleAvatarDialog() {
            if (!this.file) {
                this.$notify.warning({
                    title: '警告',
                    message: '请先更换头像！',
                    duration: 2000,
                });
                return;
            }
            this.clickUpdate = true;
            this.$bus.$emit('handleShowDialog', false);
        },
        /* 更换头像 */
        handleChangeAvatar() {
            let formData = new FormData();
            formData.append('file', this.file);
            const obj = {
                file: formData,
                token: this.token,
            };
            this.$store.dispatch('user/updateAvatar', obj).then(response => {
                if (response) {
                    if (response) {
                        this.$notify({
                            title: '成功',
                            message: '修改成功~',
                            type: 'success',
                            duration: 3000,
                        });
                        this.$nextTick(() => {
                            this.handleClose();
                        });
                    } else {
                        this.$notify({
                            title: '失败',
                            message: '修改失败！',
                            type: 'error',
                            duration: 3000,
                        });
                    }
                }
            });
        },
        handleMiddlefile() {
            this.$refs.file?.click();
        },
        /* 处理更换头像 */
        handleAddFile(event) {
            this.file = this.$refs.file?.files[0] || event.target.files[0];
            // console.log(this.file);
            const item = {
                name: this.file.name,
                size: this.file.size,
                file: this.file,
            };
            const isLt2M = this.file?.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                this.$notify.error({
                    title: '失败',
                    message: '上传失败!',
                    duration: 2000,
                });
                this.file = null;
                return;
            }
            // let _this = this;
            this.html5Reader(this.file, item);
            this.item = item;
        },
        /* 将图片文件转成BASE64格式 */
        html5Reader(file, item) {
            const reader = new FileReader();
            reader.onload = e => {
                // console.log(e.target?.result);
                this.$set(item, 'src', e.target?.result);
            };
            reader.readAsDataURL(file);
        },
    },
};
</script>

<style lang="scss" scoped>
.avatar-cropper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    z-index: 111;

    ._tools {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 16px;
        box-sizing: border-box;
        margin: 16px 0;

        ul {
            li {
                display: inline-flex;
                width: 30px;
                height: 30px;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                margin: 0 2px;
                color: #606266;
                cursor: pointer;
            }
        }

        span {
            color: #008b8b;
            font-size: 14px;
            cursor: pointer;
        }
    }

    ._tip {
        margin: 10px 16px 0;
        font-size: 12px;
        color: #777;
        text-align: center;
    }

    ._cropper {
        position: relative;
        width: 300px;
        height: 300px;
        border: 4px solid var(--marked-color);
        border-radius: 50%;
        overflow: hidden;
        background: #def;

        input[name='file'] {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
            z-index: 3;
        }

        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            // opacity: 0;
            max-width: 100%;
        }
    }

    .avatar-cropper-contain {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 340px;
        min-height: 400px;
        background: #fff;
        border-radius: 8px;

        ._aside {
            position: absolute;
            right: -20px;
            top: 20%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-end;
            width: 40px;
            background: #fff;
            border-radius: 18px;
            overflow: hidden;
            z-index: -1;
            transition: all 0.25s;
            border: 2px solid #fff;
            background: var(--marked-color);
            user-select: none;

            span {
                margin-left: 2px;
                padding: 14px 10px;
                color: #fff;
                cursor: pointer;
            }

            &:hover {
                transform: translate(30px);
                box-shadow: 0 0 10px var(--marked-color);
            }
        }

        ._title {
            margin: 20px 0;
            font-size: 18px;
            font-weight: 600;
        }

        ._close {
            position: absolute;
            right: 8px;
            top: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            color: #000;
            cursor: pointer;
            transition: all 0.25s;
            font-size: 22px;
        }
    }
}

/* 
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;


*/
</style>
