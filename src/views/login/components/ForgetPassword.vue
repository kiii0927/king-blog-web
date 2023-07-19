<template>
    <div class="forgetpassword">
        <!-- style="margin-top: calc(50vh - 150px);" -->
        <el-dialog title="重置密码" :visible.sync="dialogFormVisible" top="calc(50vh - 150px)" width="500px">

            <!-- 第一步 -->
            <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInLeft"
                leave-active-class="animate__fadeOutLeft" v-on:after-leave="afterLeave">
                <el-form :model="form" ref="ruleForm1" v-if="active === 0">
                    <!-- 邮箱 -->
                    <el-form-item :label-width="formLabelWidth" prop="email" :rules="[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]">
                        <el-input v-model="form.email" placeholder="请输入注册的邮箱" autofocus
                            @keyup.enter.native="handleAutoFocus('password')" />
                    </el-form-item>
                    <!-- 验证码 -->
                    <el-form-item :label-width="formLabelWidth" prop="code"
                        :rules="{ required: true, message: '请输入验证码', trigger: 'blur' }">
                        <el-input v-model="form.code" placeholder="请输入验证码" maxlength="4">
                            <template slot="append">
                                <img :src="image" ref="code" @click="handleImgCode" title="看不清？点击切换" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <!-- btn -->
                    <el-form-item :label-width="formLabelWidth">
                        <button type="button" class="reset-pwd-btn" :class="{ _shake: flag }"
                            @click="handleAction('ruleForm1')">
                            <i v-if="loading" class="el-icon-loading"></i>
                            <template v-else>
                                下一步
                            </template>
                        </button>
                    </el-form-item>
                </el-form>
            </transition>

            <!-- 第二步 -->
            <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInRight"
                leave-active-class="animate__fadeOutRight" v-on:after-leave="afterLeave2">
                <el-form :model="form" ref="ruleForm2" :rules="rules" v-if="active === 1">
                    <el-form-item :label-width="formLabelWidth" prop="pass">
                        <el-input v-model="form.pass" placeholder="请输入新的密码" show-password autofocus
                            @keyup.enter.native="handleAutoFocus('checkPass')" />
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth" prop="checkPass">
                        <el-input v-model="form.checkPass" placeholder="请再次输入密码" show-password ref="checkPass" />
                    </el-form-item>
                    <!-- btn -->
                    <el-form-item :label-width="formLabelWidth">
                        <button type="button" class="reset-pwd-btn" @click="handleAction('ruleForm2')"
                            :class="{ _shake: flag }">
                            <i v-if="loading" class="el-icon-loading"></i>
                            <template v-else>
                                修改
                            </template>
                        </button>
                    </el-form-item>
                </el-form>
            </transition>
        </el-dialog>
    </div>
</template>

<script>
import { debounce } from 'lodash';
import { checkImgCode } from '@/api/validation'
import { checkPass } from "@/utils/validate";
import { mapGetters } from 'vuex';

export default {
    name: 'ForgetPassword',
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (checkPass(value) != 2) {
                this.$notify.info({
                    title: '消息',
                    message: '密码长度大于6，并且包含数字和字母或特殊字符',
                    duration: 1000 * 7
                });
                this.$nextTick(() => document.querySelector('.el-notification').style.zIndex = '20002');
                callback(new Error('密码不合法'));
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            dialogFormVisible: true,
            form: {
                email: '',
                code: '',
                pass: '',
                checkPass: '',
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            },
            loading: false,
            active: 0,
            flag: false,
            formLabelWidth: '8px',
            // codeImg: "",
        };
    },
    created() {
        this.handleImgCode();
    },
    computed: {
        ...mapGetters('imgCode', ['code', 'image']),
    },
    methods: {
        // 处理图片验证码
        async handleImgCode() {
            // this.codeImg = await this.$API.user?.getImgCode();
            this.$store.dispatch("imgCode/getImgCode");
        },

        // 获取焦点
        handleAutoFocus(elName) {
            if (!elName) {
                throw new Error("`elName` is not defined");
            }
            this.$nextTick(() => {
                this.$refs[elName]?.focus();
            });
        },

        // 处理行为
        handleAction(formName) {
            if (!this.loading) {
                this.handleValidate(formName);
            }
        },

        // 处理表单验证
        handleValidate: debounce(function (formName) {
            this.$refs[formName]?.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.flag = false;
                    if (!this.active) {
                        // 校验验证码
                        const flag = this.form.code.toLocaleLowerCase() === this.code;
                        if (flag) {
                            // 校验邮箱
                            const obj = {
                                email: this.form.email || '',
                                // code: this.form.code || ''
                            }
                            checkImgCode(obj).then(res => {
                                this.active = -1;
                            }).catch(err => {
                                this.form.code = '';
                                this.handleImgCode();
                                console.error(err);
                            }).finally(() => {
                                this.loading = false;
                            });
                        } else {
                            this.loading = false;
                            this.form.code = '';
                            this.$message({
                                showClose: true,
                                message: '验证码不正确',
                                type: 'error',
                                duration: 5 * 1000
                            });
                            this.handleImgCode();
                        }
                    } else {
                        this.handleSumbit();
                    }
                } else {
                    this.loading = false;
                    this.flag = true;
                    setTimeout(() => this.flag = false, 820);
                    return false;
                }
            });
        }, 3 * 100),

        // 处理提交
        handleSumbit() {
            const obj = {
                email: this.form.email,
                password: this.form.pass
            }
            this.$API.user?.resetPassword(obj).then(res => {
                this.$notify({
                    title: '成功',
                    message: res.message || '操作成功',
                    type: 'success'
                });
                this.dialogFormVisible = false;
                this.$parent.isForgetPwd = false;
                // this.active = 0;
            }).catch(err => {
                console.error(err);
            }).finally(() => this.loading = false);
        },

        /* 离开后 */
        afterLeave(el) {
            this.active = 1;
        },
        afterLeave2() {
            this.active = 0;
        }
    },
};
</script>

<style lang="scss" scoped>
.forgetpassword {
    .reset-pwd-btn {
        // width: 452px;
        width: 100%;
        padding: 12px 0;
        background: #f56c6c;
        border: none;
        outline: none;
        color: #fff;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
        font-size: 16px;
        cursor: pointer;
    }

    ::v-deep .el-form-item__error {
        padding-left: 15px;
    }

    ::v-deep .el-dialog {
        border-radius: 18px;
    }

    ::v-deep .el-input__inner,
    ::v-deep .el-input-group__append {
        border: none;
        border-bottom: 1px solid #eee;
        font-size: 15px !important;

        &::placeholder {
            color: #000;
        }
    }

    ::v-deep .el-dialog__title {
        font-weight: 550;
    }

    ::v-deep .el-dialog__body {
        padding: 20px;
        box-sizing: border-box;
        overflow: hidden;
    }

    ::v-deep .el-input-group__append {
        background: none;
        color: #000;
        cursor: pointer;
    }

    ::v-deep .el-form-item:has(.reset-pwd-btn) {
        margin-bottom: 0;
    }
}
</style>