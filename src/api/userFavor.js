/* user api */
import request from '@/utils/request';

/**
 * @description 查询文章收藏是否已存在
 * @param {*} param
 * @returns
 */
export function selExist(params) {
    return request({
        url: '/user-favor/selExist',
        method: 'get',
        params
    });
}

/**
 * @description 保存用户收藏的文章信息
 * @param {*} data
 * @returns
 */
export function saveFavor(data) {
    return request({
        url: '/user-favor/save',
        method: 'post',
        data,
    });
}

/**
 * @description 通过用户ID获取用户收藏的文章
 * @param {*} uId
 * @returns
 */
export function selAll(identify) {
    return request({
        url: '/user-favor/selectAll',
        method: 'get',
        params: { identify },
    });
}

/**
 * @description delete
 * @param {*} data
 * @returns
 */
export function deleteFavor(data) {
    return request({
        url: '/user-favor/delete',
        method: 'delete',
        data,
    });
}
