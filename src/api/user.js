/* user api */
import request from '@/utils/request';

/**
 * @description 发送邮箱验证码
 * @param {*} mail
 * @returns
 */
export function SendEmailCode(mail) {
    return request({
        url: `/user/email/${mail}`,
        method: 'get',
    });
}

/**
 * @description 用户留言
 * @param {*} data
 * @returns
 */
export function leaveWord(data) {
    return request({
        url: '/user/leaveWord',
        method: 'post',
        data,
    });
}

/**
 * @description 根据token获取用户信息
 * @param {*} token
 * @returns
 */
export function getUserInfo(token) {
    return request({
        url: '/user/getUserInfo',
        method: 'get',
        params: { token },
    });
}

/**
 * @description 用户注册
 * @param {*} data
 * @returns
 */
export function register(data) {
    return request({
        url: '/user/register',
        method: 'post',
        data,
    });
}

/**
 * @description 是否已登录
 * @param {*} jwt
 * @returns
 */
export function isLogin(jwt) {
    return request({
        url: '/user/isLogin',
        method: 'get',
        params: { jwt },
    });
}

/**
 * @description 获取用户唯一标识
 * @returns
 */
export function getIdentify() {
    return request({
        url: '/user/getIdentify',
        method: 'get',
    });
}

/**
 * @description 用户登录
 * @param {*} data
 * @returns
 */
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data,
    });
}

/**
 * @description 第三方登录API
 * @param {*} type
 * @returns
 */
export function oauthlogin(type) {
    return request({
        url: `/oauth/render/${type}`,
        method: 'get',
    });
}

/**
 * @description 上传头像
 * @param {*} file
 * @param {*} token
 * @returns
 */
export function uploadAvatar(file, token) {
    return request({
        url: '/upload/avatar',
        method: 'post',
        params: { token },
        data: file,
        headers: { 'Content-Type': 'multipart/form-data' },
    });
}

/**
 * @description 获取图片验证码
 * @returns
 */
export function getImgCode() {
    return request({
        url: '/user/getImgCode',
        method: 'get',
    });
}

/**
 * @description 重置用户密码
 * @param {*} data
 */
export function resetPassword(data) {
    return request({
        url: '/user/resetPwd',
        method: 'put',
        data,
    });
}
