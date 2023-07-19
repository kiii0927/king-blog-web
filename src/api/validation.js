/* validation js */
import request from '@/utils/request';
import { getCookie } from '@/utils/cookie';

/**
 * @description 检测邮箱是否存在
 * @param {*} email
 * @returns
 */
export function emailIsExist(email) {
    return request({
        url: `/validation/email/${email}`,
        method: 'get',
    });
}

/**
 * @description 通过用户名检测该用户是否存在
 * @param {*} username 用户名
 * @returns r
 */
export function userIsExist(username) {
    return request({
        url: '/validation/user',
        method: 'get',
        params: { username },
    });
}

/**
 * @description 检测邮箱验证码是否合法
 * @param {*} params
 * @returns
 */
export function checkEmailCode(params) {
    return request({
        url: '/validation/emailCode',
        method: 'post',
        data: params,
    });
}

/**
 * @description 检测图片验证码是否合法
 * @param {*} params
 * @returns
 */
export function checkImgCode(params) {
    return request({
        url: '/validation/imgCode',
        method: 'get',
        params,
    });
}

/**
 * @description 校验QQ号码是否存在
 * @param {*} param
 * @returns
 */
export function validQQIsExist(param) {
    return request({
        url: '/validation/validQQ',
        method: 'get',
        params: { qq: param },
    });
}

/**
 *  @description 校验手机号码是否存在
 * @param {*} param
 * @returns
 */
export function validPhoneIsExist(phone) {
    return request({
        url: '/validation/validPhone',
        method: 'get',
        params: { phone },
    });
}
