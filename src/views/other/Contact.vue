<template>
    <div class="contact">
        <div class="contact-envelope">
            <div class="contact-envelope-head"></div>
            <div class="contact-envelope-paper">
                <h2>’留 言</h2>
                <p>描述你的问题，我将尽力解决~</p>
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
                    <el-form-item prop="content">
                        <el-input
                            type="textarea"
                            rows="3"
                            placeholder="请输入内容"
                            v-model.lazy="ruleForm.content"
                            show-word-limit
                            maxlength="100"
                        ></el-input>
                    </el-form-item>
                    <el-form-item class="contact-box-inner" prop="nickname">
                        <el-input
                            placeholder="昵称"
                            v-model.lazy="ruleForm.nickname"
                            show-word-limit
                            maxlength="8"
                        ></el-input>
                    </el-form-item>
                    <el-form-item class="contact-box-inner" prop="email">
                        <el-input placeholder="邮箱" v-model.lazy="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item prop="title">
                        <el-input
                            placeholder="标题"
                            v-model.lazy="ruleForm.title"
                            show-word-limit
                            maxlength="20"
                        ></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top: 16px">
                        <!-- <input type="button" value="发表" @click="handlePublish('ruleForm')" /> -->
                        <el-button @click="handleSubmit('ruleForm')">发表</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="contact-envelope-body"></div>
        </div>
    </div>
</template>

<script>
import notify from '@/mixin/notify';
import { debounce } from 'lodash';
export default {
    name: 'Contact',
    mixins: [notify],
    data() {
        return {
            ruleForm: {
                content: '',
                nickname: '',
                email: '',
                title: '',
            },
            rules: {
                content: [{ required: true, message: '请输入邮件内容', trigger: 'blur' }],
                nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
                ],
                title: [{ required: true, message: '请输入邮件标题', trigger: 'blur' }],
            },
        };
    },
    methods: {
        handleSubmit(formName) {
            this.$refs[formName]?.validate(valid => {
                if (valid) {
                    this.handlePublish();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        // 处理邮箱发送
        handlePublish: debounce(function () {
            // this.$notify_info("开发中");
            this.$API?.user
                ?.leaveWord(this.ruleForm)
                .then(resopnse => {
                    this.$notify_success('发送成功');
                    this.handleClear();
                })
                .catch(error => {
                    this.$notify_error('发送失败');
                    console.warn(error);
                });
        }, 500),

        // 处理清除
        handleClear() {
            (this.ruleForm.content = ''),
                (this.ruleForm.title = ''),
                (this.ruleForm.email = ''),
                (this.ruleForm.nickname = '');
        },
    },
};
</script>

<style scoped lang="scss">
::v-deep .el-form-item__content {
    text-align: center;
}

::v-deep .el-form-item {
    margin-bottom: 24;
}

::v-deep .el-button {
    width: 118px;
    height: 32px;
    background-color: #666;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>

<style scoped>
.contact {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    background: url(https://www.adicw.cn/assets/contact-bg.d29f59aa.jpg) center/cover;
}

.contact .contact-envelope {
    position: relative;
    width: 530px;
    height: 576px;
    transform: scale(1.2);
    overflow: hidden;
}

.contact .contact-envelope .contact-envelope-head {
    position: absolute;
    top: 28px;
    width: 100%;
    height: 316px;
    background: url(https://www.adicw.cn/assets/envelope-head.b81bfcfb.png);
    transition: all 0.4s ease;
}

.contact .contact-envelope .contact-envelope-paper {
    position: absolute;
    top: 222px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 490px;
    height: 206px;
    box-sizing: border-box;
    padding: 16px;
    border-radius: 4px;
    border: 1px solid #eee;
    box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
    overflow: hidden;
    background-color: #fff;
    transition: all 0.6s;
}

.contact .contact-envelope .contact-envelope-body {
    position: absolute;
    top: 212px;
    width: 100%;
    height: 260px;
    background: url(https://www.adicw.cn/assets/envelope-body.a455a96b.png);
    transition: all 0.4s ease;
}

.contact .contact-envelope .contact-envelope-paper p {
    font-size: 12px;
    margin: 10px 0;
}

.contact .contact-envelope .contact-envelope-paper .contact-box-inner {
    display: inline-block;
    box-sizing: border-box;
    width: 50%;
    /* margin: 24px 0; */
}

.contact .contact-envelope .contact-envelope-paper > div:nth-of-type(2) {
    padding-right: 8px;
}

.contact .contact-envelope .contact-envelope-paper > input,
.contact .contact-envelope .contact-envelope-paper > button {
    position: relative;
    left: 50%;
    margin-top: 15px;
    width: 118px;
    height: 32px;
    display: block;
    background-color: #666;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transform: translateX(-50%);
}

/* hover */
.contact .contact-envelope:hover .contact-envelope-head,
.contact .contact-envelope:hover .contact-envelope-body {
    transform: translateY(115px);
}

.contact .contact-envelope:hover .contact-envelope-paper {
    transform: translateY(-220px);
    height: 440px;
}
</style>
