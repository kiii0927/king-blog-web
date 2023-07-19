/* user-info api */
import request from '@/utils/request';

/**
 * @description 根据用户ID获取用户信息
 * @param {*} token
 * @returns
 */
export function selectUserInfo(token) {
    return request({
        url: `/user-info/getUserinfo/${token}`,
        method: 'get',
    });
}

/**
 * @description 修改用户信息
 * @param {*} data
 * @returns
 */
export function updateUserInfo(data) {
    return request({
        url: '/user-info/update',
        method: 'put',
        data,
    });
}
