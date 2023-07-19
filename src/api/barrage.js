import request from '@/utils/request';

/**
 * @description save barrage
 * @param {Object} data request params
 * @param {String} type comment | reply
 * @returns res
 */
export function say({ data, type }) {
    return request({
        url: `/barrage/say/${type}`,
        method: 'post',
        data,
    });
}

/**
 * @description query barrage
 * @param {*} params request params
 * @returns res
 */
export function query(params) {
    return request({
        url: '/barrage/page-query',
        method: 'get',
        params,
    });
}

/**
 * @description 获取弹幕(滑动模块)
 * @param {*} params limit params
 * @returns res
 */
export function memorial(params) {
    return request({
        url: '/barrage/get-memorial',
        method: 'get',
        params,
    });
}
