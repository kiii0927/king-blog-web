<template>
    <div class="userprofile">
        <em>点击相应信息进行修改</em>
        <div class="userprofile-avatar" @click.stop="handleChangeAvater">
            <img :src="users.avatar" />
            <p>更换头像</p>
        </div>
        <ChangeAvatar
            :avatar="users.avatar"
            :token="users.token"
            v-if="changeAvatar"
        ></ChangeAvatar>
        <input type="button" class="userprofile-btn-sub" @click="handleUpdate" value="修改" />
        <MyDialog message="确认修改吗？" MethodName="onSubmit" v-if="clickUpdate"></MyDialog>
        <h3>
            账号信息
            <span>*不可修改</span>
        </h3>
        <div class="userprofile-group">
            <b>账号</b>
            <div class="userprofile-group-msg">
                {{ users.id }}
            </div>
        </div>
        <div class="userprofile-group">
            <b>权限</b>
            <div class="userprofile-group-msg">
                {{ users.permission !== 'admin' ? '普通用户' : '管理员' }}
            </div>
        </div>
        <div class="userprofile-group">
            <b>邮箱</b>
            <div class="userprofile-group-msg">
                {{ users.email }}
            </div>
        </div>
        <div class="userprofile-group">
            <b>注册时间</b>
            <div class="userprofile-group-msg">
                {{ users.createTime | formatTime }}
            </div>
        </div>

        <h3>基本信息</h3>
        <div class="userprofile-group">
            <b>昵称</b>
            <div class="check-input">
                <input
                    type="text"
                    placeholder="请输入昵称"
                    :class="{ 'input-error': tips[0].value }"
                    @input="handleValidNickName"
                    maxlength="8"
                    v-model.trim="userInfo.nickname"
                />
                <i :class="[tips[0].value ? 'el-icon-circle-close' : 'el-icon-circle-check']"></i>
                <p v-if="tips[0].value">{{ tips[0].value }}</p>
            </div>
        </div>
        <div class="userprofile-group">
            <b>性别</b>
            <el-radio-group v-model.number="userInfo.gender" size="medium">
                <el-radio-button label="0">女</el-radio-button>
                <el-radio-button label="1">男</el-radio-button>
                <el-radio-button label="-1">保密</el-radio-button>
            </el-radio-group>
        </div>
        <div class="userprofile-group">
            <b>年龄</b>
            <div class="check-input">
                <input
                    type="number"
                    placeholder="请输入年龄"
                    :class="{ 'input-error': tips[1].value }"
                    @input="handleValidAge"
                    v-model.trim.number="userInfo.age"
                    maxlength="3"
                    oninput="if(value.length>3)value=value.slice(0,3)"
                />
                <i :class="[tips[1].value ? 'el-icon-circle-close' : 'el-icon-circle-check']"></i>
                <p v-if="tips[1].value">{{ tips[1].value }}</p>
            </div>
        </div>
        <div class="userprofile-group">
            <b>个人主页</b>
            <div class="check-input">
                <input
                    type="text"
                    placeholder="请输入个人主页"
                    :class="{ 'input-error': tips[2].value }"
                    @input="handleValidHome"
                    v-model.trim="userInfo.home"
                    maxlength="32"
                />
                <i :class="[tips[2].value ? 'el-icon-circle-close' : 'el-icon-circle-check']"></i>
                <p v-if="tips[2].value">{{ tips[2].value }}</p>
            </div>
        </div>
        <div class="userprofile-group">
            <b>职业信息</b>
            <div class="check-input">
                <input
                    type="text"
                    placeholder="请输入职业信息"
                    v-model.trim="userInfo.occupation"
                    maxlength="32"
                />
                <i class="el-icon-circle-check"></i>
            </div>
        </div>

        <h3>联系方式</h3>
        <div class="userprofile-group">
            <b>手机号码</b>
            <div class="check-input">
                <input
                    type="number"
                    placeholder="请输入手机号码"
                    @input="handleValidPhone"
                    :class="{ 'input-error': tips[3].value }"
                    oninput="if(value.length>11)value=value.slice(0,11)"
                    maxlength="11"
                    v-model.trim="userInfo.phone"
                />
                <i :class="[tips[3].value ? 'el-icon-circle-close' : 'el-icon-circle-check']"></i>
                <p v-if="tips[3].value">{{ tips[3].value }}</p>
            </div>
        </div>
        <div class="userprofile-group">
            <b>腾讯QQ</b>
            <div class="check-input">
                <input
                    type="number"
                    placeholder="请输入QQ号码"
                    @blur="handleValidQQ"
                    oninput="if(value.length>10)value=value.slice(0,10)"
                    :class="{ 'input-error': tips[4].value }"
                    maxlength="10"
                    v-model.trim="userInfo.tencentQQ"
                />
                <i :class="[tips[4].value ? 'el-icon-circle-close' : 'el-icon-circle-check']"></i>
                <p v-if="tips[4].value">{{ tips[4].value }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { isEqual, debounce } from 'lodash';
import { isEmpty, validAge, isExternal, validPhone } from '@/utils/validate';
import { validQQIsExist, validPhoneIsExist } from '@/api/validation';
export default {
    name: 'UserProfile',
    data() {
        return {
            valid: true,
            originalInfo: {},
            userInfo: {
                nickname: '', // 用户
                age: undefined, // 年龄
                phone: '', // 电话号码
                gender: -1, // 性别
                home: '', // 个人主页
                occupation: '', // 职业
                tencentQQ: '', // qq
            },
            tips: [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
            changeAvatar: false,
            clickUpdate: false,
        };
    },
    components: {
        MyDialog: () => import('@/components/MyDialog.vue'),
        ChangeAvatar: () => import('./components/changeAvatar.vue'),
    },
    computed: {
        ...mapGetters(['users']),
        ...mapState('userInfo', ['UserInfo']),
    },
    watch: {
        UserInfo: {
            immediate: true,
            handler(newVal, oldVal) {
                if (!newVal.id) {
                    this.userInfo.nickname = this.users.username;
                } else {
                    this.userInfo = { ...newVal };
                    this.originalInfo = { ...this.userInfo };
                }
            },
        },
        changeAvatar(val) {
            if (val) {
                this.disabledScroll();
            } else {
                this.enableScroll();
            }
        },
    },
    created() {
        this.$bus.$on('onSubmit', this.onSubmit);
    },
    beforeMount() {
        !this.$parent.isLoad && this.getUserInfo();
    },
    activated() {
        this.$parent.isLoad && this.getUserInfo();
    },

    methods: {
        getUserInfo() {
            this.$store.dispatch('userInfo/getUserInfo', this.users.token || this.$parent.token);
        },
        /* 处理更换头像 */
        handleChangeAvater() {
            // console.log("处理更换头像");
            this.changeAvatar = true;
        },
        handleValidNickName() {
            if (isEmpty(this.userInfo.nickname)) {
                this.tips[0].value = '*昵称不能为空';
                this.valid = false;
            } else {
                this.valid = true;
                this.tips[0].value = '';
            }
        },
        handleValidAge() {
            if (!this.userInfo.age) {
                this.tips[1].value = '*年龄不能为空';
                this.valid = false;
            } else if (validAge(this.userInfo.age)) {
                this.tips[1].value = '*年龄不合法, 年龄应在1-100之间';
                this.valid = false;
            } else {
                this.valid = true;
                this.tips[1].value = '';
            }
        },
        handleValidHome() {
            if (!isEmpty(this.userInfo.home) && !isExternal(this.userInfo.home)) {
                this.tips[2].value = '*主页链接不合法';
                this.valid = false;
            } else {
                this.valid = true;
                this.tips[2].value = '';
            }
        },
        handleValidPhone() {
            if (isEmpty(this.userInfo.phone)) {
                this.tips[3].value = '*手机号码不能为空';
                this.valid = false;
            } else if (!validPhone(this.userInfo.phone)) {
                this.tips[3].value = '*手机号码不合法';
                this.valid = false;
            } else if (this.userInfo.phone !== this.originalInfo.phone) {
                this.sendValidRequest(0).then(response => {
                    if (response.code !== 200) {
                        this.tips[3].value = '*该手机号码已存在';
                        this.valid = false;
                    } else {
                        this.tips[3].value = '';
                        this.valid = true;
                    }
                });
            } else {
                this.tips[3].value = '';
                this.valid = true;
            }
        },
        handleValidQQ() {
            if (this.userInfo.tencentQQ === this.originalInfo.tencentQQ) return;
            this.sendValidRequest(1).then(response => {
                if (response.code !== 200) {
                    this.tips[4].value = '*该QQ号码已存在';
                    this.valid = false;
                } else {
                    this.tips[4].value = '';
                    this.valid = true;
                }
            });
        },
        // 处理修改基本信息
        handleUpdate: debounce(function () {
            // true 表示没修改  false 修改过了
            if (isEqual(this.userInfo, this.originalInfo)) {
                this.$notify({
                    title: '警告',
                    message: '表单未做任何修改！',
                    type: 'warning',
                });
                this.validation();
                return;
            }
            this.clickUpdate = true;
            this.$bus.$emit('handleShowDialog', true);
        }, 500),
        validation() {
            this.handleValidNickName();
            this.handleValidAge();
            this.handleValidHome();
            this.handleValidPhone();
            return this.valid;
        },
        // 提交修改函数
        onSubmit() {
            if (this.validation()) {
                let obj = { ...this.userInfo };
                let qq = obj.tencentQQ;
                delete obj.tencentQQ;
                // see: https://cloud.tencent.com/developer/article/1959729?from=15425
                obj = Object.defineProperty(obj, 'tencent_qq', {
                    value: qq,
                    writable: true,
                    enumerable: true,
                    configurable: true,
                });
                this.$store
                    .dispatch('userInfo/update', obj)
                    .then(response => {
                        if (response) {
                            this.$notify({
                                title: '成功',
                                message: '修改成功~',
                                type: 'success',
                            });
                        } else {
                            this.$notify({
                                title: '失败',
                                message: '修改失败！',
                                type: 'error',
                            });
                        }
                    })
                    .catch(error => {
                        console.warn(error);
                    });
            } else {
                this.$notify({
                    title: '警告',
                    message: '请检查表单完整性！',
                    type: 'warning',
                });
            }
        },
        // 发送验证请求
        async sendValidRequest(val) {
            let result;
            if (val) {
                result = await validQQIsExist(this.userInfo.tencentQQ);
            } else {
                result = await validPhoneIsExist(this.userInfo.phone);
            }
            return result;
        },
        disabledScroll() {
            /**
             * 解决隐藏滚动条页面大小放生变化
             *  - innerWidth 浏览器窗口的宽度,包含滚动条
             *  - clientWidth 文档根元素的宽度,不包含滚动条
             */
            let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = scrollbarWidth + 'px';
            document.body.style.overflow = 'hidden';
        },
        enableScroll() {
            document.body.style.paddingRight = ''; // 解决隐藏滚动条页面大小放生变化
            document.body.style.overflow = 'auto';
        },
    },
    beforeRouteLeave(to, from, next) {
        // this.enableScroll();
        this.changeAvatar = false;
        next(true);
    },
    beforeDestroy() {
        Object.assign(this._data, this.$options.data());
        this.$bus.$off('onSubmit');
    },
};
</script>

<style scoped lang="scss">
@mixin base-avater {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.userprofile {
    position: relative;
    width: 100%;
    background: #fff;
    padding: 40px 30px 20px;
    border-radius: 20px;
    z-index: 2;

    .userprofile-group {
        margin: 10px 0;
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid #e6e9f0;
        width: 100%;
        height: -webkit-fit-content;
        height: fit-content;

        .el-radio-group {
            margin-bottom: 10px;
        }

        .check-input {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            height: 40px;
            margin-bottom: 30px;
            background: #f4f4f4;
            border-radius: 5px;

            input {
                flex: 1;
                height: 100%;
                color: #495057;
                border: none;
                padding: 0 10px;
                box-sizing: border-box;
                font-size: 1rem;
                line-height: 1.5;
                outline: none;
                transition: all 0.5s;
                background: transparent;

                // 去除末尾的箭头
                &[type='number'] {
                    &::-webkit-outer-spin-button,
                    &::-webkit-inner-spin-button {
                        appearance: none;
                    }
                }

                &:focus {
                    border: 1px solid #ee5757;
                    box-shadow: 0 0 3px #ee5757;
                }

                &.input-error {
                    border: 1px solid #ee5757;
                    box-shadow: 0 0 3px #ee5757;
                }
            }

            i.el-icon-circle-check {
                color: green;
            }

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 20px;
                height: 37px;
                position: absolute;
                right: 6px;
                top: 0;

                &.el-icon-circle-close {
                    color: red;
                }

                &.el-icon-circle-check {
                    color: green;
                }
            }

            p {
                position: absolute;
                left: 0;
                bottom: -24px;
                min-height: 20px;
                font-size: 14px;
                color: var(--marked-color);
            }
        }

        b {
            user-select: none;
            display: flex;
            align-items: center;
            width: 120px;
            height: 40px;
        }

        .userprofile-group-msg {
            width: 100%;
            display: flex;
            align-items: center;
        }
    }

    .userprofile-avatar {
        position: absolute;
        top: -140px;
        left: 0;
        right: 0;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;
        background: #def;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;

        img {
            @include base-avater();
        }

        ::v-deep .el-avatar {
            img {
                @include base-avater();
            }
        }

        p {
            color: #fff;
            z-index: 3;
            opacity: 0;
        }

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 2;
        }

        &:hover {
            &:before {
                opacity: 1;
            }

            p {
                opacity: 1;
            }
        }
    }

    .userprofile-btn-sub {
        position: absolute;
        right: 20px;
        top: 20px;
        display: block;
        width: 76px;
        height: 28px;
        border-radius: 44px;
        font-size: 14px;
        background: #ee5757;
        border: none;
        color: #fff;
        cursor: pointer;
    }

    h3 {
        border-left: 3px solid #009688;
        margin-top: 60px;
        margin-bottom: 20px;
        text-indent: 10px;
        user-select: none;

        span {
            font-size: 12px;
            color: #999;
        }
    }
}

::v-deep .el-radio-button {
    .el-radio-button__inner {
        border-radius: 0;
    }

    .el-radio-button__inner {
        color: #000000;
    }

    .el-radio-button__inner:hover {
        color: inherit;
    }
}

::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background: transparent;
    border-color: #000000;
    box-shadow: -1px 0 0 0 #000000;
}
</style>
